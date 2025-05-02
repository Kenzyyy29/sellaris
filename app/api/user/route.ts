import {NextResponse} from "next/server";
import {retrieveData} from "@/lib/utils/service";

export async function GET(request: Request) {
 try {
  const users = await retrieveData("users");
  return NextResponse.json(
   {status: true, statusCode: 200, data: users},
   {status: 200}
  );
 } catch (error) {
  return NextResponse.json(
   {status: false, statusCode: 500, message: "Internal Server Error"},
   {status: 500}
  );
 }
}
