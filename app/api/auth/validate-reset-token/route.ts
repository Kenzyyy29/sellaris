import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "@/lib/firebase/init";

export async function GET(request: Request) {
 const {searchParams} = new URL(request.url);
 const token = searchParams.get("token");

 console.log("Token received:", token); // Debug

 if (!token) {
  return new Response(
   JSON.stringify({
    status: false,
    message: "Token is required",
   }),
   {
    status: 400,
    headers: {
     "Content-Type": "application/json",
    },
   }
  );
 }

 try {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("resetToken", "==", token));

  const snapshot = await getDocs(q);
  console.log("Snapshot size:", snapshot.size); // Debug

  if (snapshot.empty) {
   return new Response(
    JSON.stringify({
     status: false,
     valid: false,
     message: "Token not found",
    }),
    {status: 404}
   );
  }

  const userData = snapshot.docs[0].data();
  const now = new Date();
  const expiryDate = userData.resetTokenExpiry.toDate();

  console.log("Current time:", now);
  console.log("Expiry time:", expiryDate);

  if (now > expiryDate) {
   return new Response(
    JSON.stringify({
     status: false,
     valid: false,
     message: "Token expired",
    }),
    {status: 400}
   );
  }

  return new Response(
   JSON.stringify({
    status: true,
    valid: true,
    userId: snapshot.docs[0].id,
   }),
   {status: 200}
  );
 } catch (error) {
  console.error("Validation error:", error);
  return new Response(
   JSON.stringify({
    status: false,
    valid: false,
    message: "Internal server error",
   }),
   {status: 500}
  );
 }
}