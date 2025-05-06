import {Metadata} from "next";
import RegisterForm from "@/components/core/modal/RegisterForm";

export const metadata: Metadata = {
 title: "Register Sellaris - Solusi Bisnis yang Menyenangkan",
 description: "Platform manajemen bisnis dengan pengalaman yang memukau",
};

export default function RegisterPage() {
 return (
  <div>
   <RegisterForm />
  </div>
 );
}
