import ForgotPasswordLayout from "@/components/layouts/pages/ForgotPasswordLayout";
import {Suspense} from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "Forgot Password Sellaris",
 description: "Platform manajemen bisnis dengan pengalaman yang memukau",
};

export default function ForgotPasswordPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ForgotPasswordLayout />
  </Suspense>
 );
}
