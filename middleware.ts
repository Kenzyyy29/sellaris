import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

function mainMiddleware(request: NextRequest) {
    const res = NextResponse.next();

    // Anda bisa menambahkan header atau cookie global di sini jika diperlukan
    // Contoh:
    // res.headers.set('x-custom-header', 'value');

    return res;
}

// Daftar route yang membutuhkan proteksi/auth
const protectedRoutes = [
    "/dashboard",
    "/admin",
    "/admin/dashboard",
    "/admin/webmaster",
    "/member",
];

// Jika Anda ingin semua subpath juga diproteksi, gunakan:
// const protectedRoutes = [
//   "/dashboard",
//   "/admin/:path*",
//   "/member/:path*"
// ];

export default withAuth(mainMiddleware, protectedRoutes);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         * - login page
         * - register page
         * - unauthorized page
         */
        "/((?!api|_next/static|_next/image|favicon.ico|public|login|register|unauthorized).*)",
    ],
};