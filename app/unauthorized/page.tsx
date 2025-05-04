import UnauthorizedLayout from "@/components/layouts/pages/UnauthorizedLayout";
import {Suspense} from "react";

export default function UnauthorizedPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <UnauthorizedLayout />
  </Suspense>
 );
}
