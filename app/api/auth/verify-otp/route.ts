import  connectToDB  from "@/lib/utils/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        await connectToDB();

        const { email, otp } = await request.json();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        // Check if OTP matches and not expired
        if (user.otp !== otp || new Date() > new Date(user.otpExpiry)) {
            return NextResponse.json(
                { message: "OTP tidak valid atau sudah kadaluarsa" },
                { status: 400 }
            );
        }

        // Generate a temporary password for sign in
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Update user as verified
        await User.findOneAndUpdate(
            { email },
            {
                isVerified: true,
                otp: null,
                otpExpiry: null,
                password: hashedPassword, // Update password with the hashed temp password
            }
        );

        return NextResponse.json(
            { message: "Verifikasi berhasil", tempPassword },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Terjadi kesalahan saat verifikasi" },
            { status: 500 }
        );
    }
}