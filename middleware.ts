import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

function mainMiddleware(request: NextRequest) {
    const res = NextResponse.next();
    return res;
}

const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/admin/dashboard/path*",
    "/admin/webmaster:path*",
];

export default withAuth(mainMiddleware, protectedRoutes);

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|public|login|register|unauthorized).*)",
    ],
};