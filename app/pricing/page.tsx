import PricingPageLayout from "@/components/layouts/pages/PricingPageLayout";
import {Suspense} from "react";

export default function PricingPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <PricingPageLayout />
  </Suspense>
 );
}
