import  connectToDB  from "@/lib/utils/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/actions/email";

export async function POST(request: Request) {
    try {
        await connectToDB();

        const { email } = await request.json();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Update user with new OTP
        await User.findOneAndUpdate(
            { email },
            {
                otp,
                otpExpiry,
            }
        );

        // Send new OTP email
        await sendOTP(email, otp);

        return NextResponse.json(
            { message: "OTP telah dikirim ulang" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Terjadi kesalahan saat mengirim ulang OTP" },
            { status: 500 }
        );
    }
}