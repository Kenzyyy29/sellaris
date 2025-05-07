// next-auth.d.ts
import {DefaultSession, DefaultUser} from "next-auth";
import {JWT as DefaultJWT} from "next-auth/jwt";

declare module "next-auth" {
 interface Session {
  user?: {
   id: string;
   name?: string | null;
   email?: string | null;
   role?: string;
   companyData?: any; // Tambahkan ini
  } & DefaultSession["user"];
 }

 interface User extends DefaultUser {
  id: string;
  email: string;
  name: string;
  role: string;
  companyData?: any; // Tambahkan ini
 }
}

declare module "next-auth/jwt" {
 interface JWT extends DefaultJWT {
  id: string;
  email: string;
  name: string;
  role: string;
  companyData?: any; // Tambahkan ini
 }
}
