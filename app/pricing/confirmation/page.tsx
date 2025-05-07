import PricingConfirmationLayout from "@/components/layouts/pages/PricingConfirmationLayout";
import {Suspense} from "react";

export default function PricingConfirmationPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <PricingConfirmationLayout />
  </Suspense>
 );
}
