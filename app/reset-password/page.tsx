import ResetPasswordLayout from "@/components/layouts/pages/ResetPasswordLayout";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
 title: "Reset Password Sellaris",
 description: "Platform manajemen bisnis dengan pengalaman yang memukau",
}

export default function ResetPasswordPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ResetPasswordLayout />
  </Suspense>
 );
}