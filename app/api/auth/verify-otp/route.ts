import {verifyOTP} from "@/lib/utils/service";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
 const {email, otp} = await request.json();
 const result = await verifyOTP(email, otp);

 if (!result.status) {
  return NextResponse.json(
   {status: false, message: result.message},
   {status: 400}
  );
 }

 return NextResponse.json({
  status: true,
  message: result.message,
  user: {
   id: result.user?.id,
   email: result.user?.email,
   fullname: result.user?.fullname,
   role: result.user?.role || "member",
  },
 });
}
