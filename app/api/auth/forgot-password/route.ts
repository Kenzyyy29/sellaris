import { NextResponse } from "next/server";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/init";
import { sendPasswordResetEmail } from "@/lib/actions/email";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
    try {
        const { emailOrName } = await request.json();

        if (!emailOrName) {
            return NextResponse.json(
                { status: false, message: "Email or name is required" },
                { status: 400 }
            );
        }

        // Cari user berdasarkan email atau nama
        const usersRef = collection(firestore, "users");
        const q = query(
            usersRef,
            where("email", "==", emailOrName)
        );

        const snapshot = await getDocs(q);

        // Jika tidak ditemukan dengan email, coba cari dengan nama
        let userDoc = snapshot.docs[0];
        if (!userDoc) {
            const nameQuery = query(
                usersRef,
                where("fullname", "==", emailOrName)
            );
            const nameSnapshot = await getDocs(nameQuery);
            userDoc = nameSnapshot.docs[0];
        }

        if (!userDoc) {
            return NextResponse.json(
                { status: false, message: "User not found" },
                { status: 404 }
            );
        }

        const userData = userDoc.data();
        const resetToken = uuidv4();
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 jam dari sekarang

        // Update user dengan token reset
        await updateDoc(doc(firestore, "users", userDoc.id), {
            resetToken,
            resetTokenExpiry,
        });

        // Kirim email reset password
        await sendPasswordResetEmail(
            userData.email,
            resetToken,
            userData.fullname
        );

        return NextResponse.json({
            status: true,
            message: "Reset password link has been sent to your email",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { status: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}