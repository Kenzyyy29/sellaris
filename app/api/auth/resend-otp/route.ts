import { sendVerificationEmail } from "@/lib/actions/email";
import { getDocs, query, collection, where, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/init";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email } = await request.json();

    try {
        // Check if user exists in temp_users
        const q = query(
            collection(firestore, "temp_users"),
            where("email", "==", email)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return NextResponse.json(
                { status: false, message: "User not found or OTP expired" },
                { status: 400 }
            );
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

        // Update the OTP in temp_users
        await updateDoc(userDoc.ref, {
            otp,
            otp_expiry: otpExpiry,
        });

        // Send the new OTP
        await sendVerificationEmail(email, otp, userData.fullname);

        return NextResponse.json({
            status: true,
            message: "OTP resent successfully",
        });
    } catch (error) {
        console.error("Error resending OTP:", error);
        return NextResponse.json(
            { status: false, message: "Failed to resend OTP" },
            { status: 500 }
        );
    }
}