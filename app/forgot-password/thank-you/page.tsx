import ResetThankYou from "@/components/layouts/pages/ResetThankYou";
import {Suspense} from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "Reset Password Sellaris",
 description: "Platform manajemen bisnis dengan pengalaman yang memukau",
};

export default function ResetThankYouPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ResetThankYou />
  </Suspense>
 );
}
