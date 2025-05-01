import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import connectToDB from "@/lib/utils/db";

export async function GET(request: Request) {
    try {
        await connectToDB();
        const users = await User.find({})
            .select("-password") 
            .lean();

        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to fetch users" },
            { status: 500 }
        );
    }
}

// DELETE /api/user - Delete a user (example of additional endpoint)
export async function DELETE(request: Request) {
    try {
        await connectToDB();
        const { email } = await request.json();

        // In a real app, add authorization checks here
        const result = await User.deleteOne({ email });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Failed to delete user" },
            { status: 500 }
        );
    }
}