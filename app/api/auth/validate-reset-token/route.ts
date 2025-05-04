import { NextResponse } from "next/server";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/init";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json(
                { status: false, message: "Token and password are required" },
                { status: 400 }
            );
        }

        // Validasi token
        const usersRef = collection(firestore, "users");
        const q = query(
            usersRef,
            where("resetToken", "==", token),
            where("resetTokenExpiry", ">", new Date())
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return NextResponse.json(
                { status: false, message: "Invalid or expired token" },
                { status: 400 }
            );
        }

        const userDoc = snapshot.docs[0];
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password dan hapus token reset
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
        return NextResponse.json(
            { status: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}