import {NextResponse} from "next/server";
import {retrieveData} from "@/lib/utils/service";

export async function GET() {
 try {
  const users = await retrieveData("users");
  return NextResponse.json(
   {status: true, statusCode: 200, data: users},
   {status: 200}
  );
 } catch (error: unknown) {
  console.error("Error retrieving users:", error);
  return NextResponse.json(
   {
    status: false,
    statusCode: 500,
    message: "Internal Server Error",
    error: error instanceof Error ? error.message : "Unknown error",
   },
   {status: 500}
  );
 }
}