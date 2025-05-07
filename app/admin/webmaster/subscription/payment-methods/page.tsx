import PaymentMethodLayout from "@/components/layouts/admin/webmaster/PaymentMethodLayout";
import {Metadata} from "next";
import {Suspense} from "react";

export const metadata: Metadata = {
 title: "Payment Methods",
 description: "Payment Methods",
};

export default function PaymentMethodsPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <PaymentMethodLayout />
  </Suspense>
 );
}
