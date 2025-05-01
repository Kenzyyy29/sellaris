import { register } from "@/lib/utils/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const req = await request.json();
    const res = await register(req);

    return NextResponse.json(
        {
            status: res.status,
            message: res.message,
            userId: res.userId, 
        },
        {
            status: res.statusCode,
        }
    );
}