import ResetPasswordLayout from "@/components/layouts/pages/ResetPasswordLayout";
import { Suspense } from "react";

export default function ResetPasswordPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ResetPasswordLayout />
  </Suspense>
 );
}