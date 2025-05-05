import ForgotPasswordLayout from "@/components/layouts/pages/ForgotPasswordLayout";
import {Suspense} from "react";

export default function ForgotPasswordPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ForgotPasswordLayout />
  </Suspense>
 );
}
