import ClientsList from "@/components/layouts/admin/webmaster/ClientsList";
import {Metadata} from "next";
import {Suspense} from "react";

export const metadata: Metadata = {
 title: "Client Management",
 description: "Client Management",
};

export default function WebMasterClients() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ClientsList />
  </Suspense>
 );
}
