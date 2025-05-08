import {login} from "@/lib/utils/service";
import {compare} from "bcryptjs";
import {NextAuthOptions} from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {getFirestore} from "firebase/firestore";
import {app} from "@/lib/firebase/init";
import {doc, getDoc} from "firebase/firestore";

const firestore = getFirestore(app);

const authOptions: NextAuthOptions = {
 session: {
  strategy: "jwt",
  maxAge: 60 * 60, // 1 jam
 },
 secret: process.env.NEXTAUTH_SECRET!,
 providers: [
  CredentialsProvider({
   type: "credentials",
   name: "Credentials",
   credentials: {
    email: {label: "Email", type: "email"},
    password: {label: "Password", type: "password"},
   },
   async authorize(credentials) {
    if (!credentials?.email) {
     throw new Error("Email diperlukan");
    }

    const user = await login({email: credentials.email});
    if (!user) {
     throw new Error("User tidak ditemukan");
    }
    if (!credentials.password && user.verified) {
     return {
      id: user.id,
      email: user.email,
      name: user.fullname,
      role: user.role,
     };
    }
    if (credentials.password) {
     const passwordMatch = await compare(credentials.password, user.password);
     if (!passwordMatch) {
      throw new Error("Password salah");
     }
    }

    if (!user.verified) {
     throw new Error("Akun belum terverifikasi");
    }

    // Get company data from Firestore
    let companyData = null;
    const userDoc = await getDoc(doc(firestore, "users", user.id));
    if (userDoc.exists()) {
     companyData = userDoc.data().companyData;
    }

    return {
     id: user.id,
     email: user.email,
     name: user.fullname,
     role: user.role,
     companyData,
    };
   },
  }),
 ],
 callbacks: {
  async jwt({token, user}) {
   if (user) {
    token.id = user.id;
    token.role = user.role;
    token.companyData = user.companyData;
   }
   return token;
  },
  async session({session, token}) {
   if (session.user) {
    session.user.id = token.id;
    session.user.role = token.role;
    session.user.companyData = token.companyData;
   }
   return session;
  },
 },
 pages: {
  signIn: "/auth/login",
  error: "/auth/login",
 },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
