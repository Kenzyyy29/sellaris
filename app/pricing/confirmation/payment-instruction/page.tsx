import PaymentInstructionLayout from "@/components/layouts/pages/PaymentInstructionLayout";
import {Suspense} from "react";

export default function PaymentInstructionPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <PaymentInstructionLayout />
  </Suspense>
 );
}
