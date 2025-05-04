import { getToken } from "next-auth/jwt";
import {
    NextFetchEvent,
    NextMiddleware,
    NextRequest,
    NextResponse,
} from "next/server";

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = []
) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // Handle auth pages (login/register) for authenticated users
        const isAuthPage = ["/auth/login", "/auth/register"].includes(pathname);
        if (isAuthPage && token) {
            const redirectPath =
                token.role === "admin" ? "/admin/webmaster" : "/admin/dashboard";
            return NextResponse.redirect(new URL(redirectPath, req.url));
        }

        if (pathname === "/dashboard") {
            if (!token) {
                return NextResponse.redirect(new URL("/auth/login", req.url));
            }
            const redirectPath =
                token.role === "admin" ? "/admin/webmaster" : "/admin/dashboard";
            return NextResponse.redirect(new URL(redirectPath, req.url));
        }

        // Handle dashboard redirect based on role
        if (pathname === "/admin") {
            if (!token) {
                return NextResponse.redirect(new URL("/auth/login", req.url));
            }
            const redirectPath =
                token.role === "admin" ? "/admin/webmaster" : "/admin/dashboard";
            return NextResponse.redirect(new URL(redirectPath, req.url));
        }

        if (pathname.startsWith("/admin/webmaster")) {
            if (!token || token.role !== "admin") {
                return NextResponse.redirect(new URL("/unauthorized", req.url));
            }
        }

        if (pathname.startsWith("/admin/dashboard")) {
            if (!token) {
                return NextResponse.redirect(new URL("/auth/login", req.url));
            }
            if (token.role === "admin") {
                return NextResponse.redirect(new URL("/admin/webmaster", req.url));
            }
            if (token.role !== "member") {
                return NextResponse.redirect(new URL("/unauthorized", req.url));
            }
        }

        // Handle protected routes
        const isProtectedRoute = requireAuth.some(
            (route) =>
                pathname.startsWith(route) || pathname === route.replace(/\/\*$/, "")
        );

        if (isProtectedRoute) {
            if (!token) {
                const url = new URL("/auth/login", req.url);
                url.searchParams.set("callbackUrl", encodeURI(pathname));
                return NextResponse.redirect(url);
            }
        }

        return middleware(req, next);
    };
}