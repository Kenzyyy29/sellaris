
import {NextResponse} from "next/server";
import {getFirestore} from "firebase/firestore";
import {app} from "@/lib/firebase/init";
import {doc, updateDoc} from "firebase/firestore";

const firestore = getFirestore(app);

export async function POST(request: Request) {
 try {
  const {userId, companyData} = await request.json();

  await updateDoc(doc(firestore, "users", userId), {
   companyData,
   updatedAt: new Date(),
  });

  return NextResponse.json({success: true});
 } catch (error) {
  console.error("Error updating company data:", error);
  return NextResponse.json(
   {success: false, error: "Failed to update company data"},
   {status: 500}
  );
 }
}
