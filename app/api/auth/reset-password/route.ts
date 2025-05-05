// app/api/auth/reset-password/route.ts
import {NextResponse} from "next/server";
import {
 collection,
 getDocs,
 query,
 where,
 updateDoc,
 doc,
} from "firebase/firestore";
import {firestore} from "@/lib/firebase/init";
import bcrypt from "bcryptjs";
import {FirebaseError} from "firebase/app";

export async function POST(request: Request) {
 try {
  const {token, password} = await request.json();

  // Input validation
  if (!token || !password) {
   return NextResponse.json(
    {status: false, message: "Token and password are required"},
    {status: 400}
   );
  }

  if (password.length < 6) {
   return NextResponse.json(
    {status: false, message: "Password must be at least 6 characters"},
    {status: 400}
   );
  }

  // Query with composite index
  const usersRef = collection(firestore, "users");
  const q = query(
   usersRef,
   where("resetToken", "==", token),
   where("resetTokenExpiry", ">", new Date())
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
   return NextResponse.json(
    {status: false, message: "Invalid or expired token"},
    {status: 400}
   );
  }

  // Update password
  const userDoc = snapshot.docs[0];
  const hashedPassword = await bcrypt.hash(password, 10);

  await updateDoc(doc(firestore, "users", userDoc.id), {
   password: hashedPassword,
   resetToken: null,
   resetTokenExpiry: null,
   updatedAt: new Date(),
  });

  return NextResponse.json({
   status: true,
   message: "Password has been reset successfully",
  });
 } catch (error) {
  console.error("Reset password error:", error);

  if (error instanceof FirebaseError && error.code === "failed-precondition") {
   return NextResponse.json(
    {
     status: false,
     message: "System is initializing. Please try again in a few minutes.",
    },
    {status: 503} // Service Unavailable
   );
  }

  return NextResponse.json(
   {
    status: false,
    message: error instanceof Error ? error.message : "Internal server error",
   },
   {status: 500}
  );
 }
}
