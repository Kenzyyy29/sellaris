import ClientsList from "@/components/layouts/admin/webmaster/ClientsList";
import { Suspense } from "react";

export default function WebMasterClients() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ClientsList />
  </Suspense>
 );
}
