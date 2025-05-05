import ContactPage from "@/components/layouts/pages/ContactPage";
import {Suspense} from "react";

export default function Contact() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ContactPage />
  </Suspense>
 );
}
