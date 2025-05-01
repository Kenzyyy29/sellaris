import { login } from "@/lib/utils/service";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

interface ErrorResponse {
    message: string;
    status?: number;
}

export async function POST(request: Request) {
    const { email, callbackUrl } = await request.json();

    try {
        const user = await login({ email });

        if (!user) {
            return NextResponse.json(
                { status: false, message: "User not found" },
                { status: 404 }
            );
        }

        await signIn("credentials", {
            email,
            callbackUrl: callbackUrl || "/",
            redirect: false,
        });

        return NextResponse.json({
            status: true,
            message: "Login successful",
        });
    } catch (error) {
        const err = error as ErrorResponse;
        return NextResponse.json(
            { status: false, message: err.message || "Internal server error" },
            { status: err.status || 500 }
        );
    }
}