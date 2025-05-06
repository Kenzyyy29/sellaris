import {Metadata} from "next";
import LoginPageWrapper from "@/components/layouts/auth/LoginPageWrapper";

export const metadata: Metadata = {
 title: "Login Sellaris - Solusi Bisnis yang Menyenangkan",
 description: "Platform manajemen bisnis dengan pengalaman yang memukau",
};

export default function LoginPage() {
 return <LoginPageWrapper />;
}
