import ResetThankYou from "@/components/layouts/pages/ResetThankYou";
import {Suspense} from "react";

export default function ResetThankYouPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ResetThankYou />
  </Suspense>
 );
}
