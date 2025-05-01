import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User";
import connectToDB from "@/lib/utils/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToDB();

                const user = await User.findOne({ email: credentials?.email });
                if (!user) return null

                const isValid = await bcrypt.compare(credentials?.password || "", user.password);
                if (!isValid) return null

                if (!user.isVerified) {
                    throw new Error("User is not verified");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role || "user"
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            } return session
        }
    }, pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }