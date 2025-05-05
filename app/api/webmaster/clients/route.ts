// /app/api/webmaster/clients/route.ts
import {retrieveData} from "@/lib/utils/service";
import {NextResponse} from "next/server";
import {deleteDoc, doc, getFirestore} from "firebase/firestore";
import {app} from "@/lib/firebase/init";

const firestore = getFirestore(app);

interface User {
 id: string;
 fullname: string;
 email: string;
 phone?: string;
 password?: string;
 role: string;
 verified: boolean;
 otp?: string;
 otpExpiry?: Date;
 createdAt: Date | string;
 updatedAt: Date | string;
}

// Fungsi untuk memastikan data sesuai dengan interface User
function isUser(data: any): data is User {
 return (
  typeof data.id === "string" &&
  typeof data.fullname === "string" &&
  typeof data.email === "string" &&
  typeof data.role === "string" &&
  typeof data.verified === "boolean"
 );
}

export async function GET() {
 try {
  const users = await retrieveData("users");
  const validUsers = users.filter(isUser);
  const members = validUsers.filter((user) => user.role === "member");

  return NextResponse.json({
   status: true,
   statusCode: 200,
   message: "Success retrieve member data",
   data: members,
  });
 } catch (error) {
  console.error("Error fetching members:", error);
  return NextResponse.json({
   status: false,
   statusCode: 500,
   message: "Internal server error",
  });
 }
}

export async function DELETE(request: Request) {
 try {
  const {id} = await request.json();

  await deleteDoc(doc(firestore, "users", id));

  return NextResponse.json({
   status: true,
   statusCode: 200,
   message: "User deleted successfully",
  });
 } catch (error) {
  console.error("Error deleting user:", error);
  return NextResponse.json({
   status: false,
   statusCode: 500,
   message: "Failed to delete user",
  });
 }
}
