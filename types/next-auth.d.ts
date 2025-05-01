import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
        email: string;
        name: string;
        role: string;
        // fullname dihapus karena sudah menggunakan name
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        email: string;
        name: string;
        role: string;
    }
}