import {Metadata} from "next";
import RegisterPageWrapper from "@/components/layouts/auth/RegisterPageWrapper";

export const metadata: Metadata = {
 title: "Register Sellaris - Solusi Bisnis yang Menyenangkan",
 description: "Platform manajemen bisnis dengan pengalaman yang memukau",
};

export default function RegisterPage() {
 return <RegisterPageWrapper />;
}
