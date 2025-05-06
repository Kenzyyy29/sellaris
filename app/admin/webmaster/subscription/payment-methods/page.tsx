import PaymentMethodLayout from "@/components/layouts/admin/webmaster/PaymentMethodLayout";
import {Suspense} from "react";

export default function PaymentMethodsPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <PaymentMethodLayout />
  </Suspense>
 );
}
