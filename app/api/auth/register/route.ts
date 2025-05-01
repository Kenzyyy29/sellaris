import connectToDB from "@/lib/utils/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendOTP } from "@/lib/actions/email";

export async function POST(request: Request) {
    try {
        await connectToDB();

        const { name, email, phone, password } = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "Email sudah terdaftar" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Create new user
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            otp,
            otpExpiry,
        });

        await newUser.save();

        // Send OTP email
        await sendOTP(email, otp);

        return NextResponse.json(
            { message: "Registrasi berhasil. Silakan lanjutkan ke langkah berikutnya." },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Terjadi kesalahan saat registrasi" },
            { status: 500 }
        );
    }
}