import SubscriptionTransactions from "@/components/layouts/admin/webmaster/SubscriptionTransaction";
import { Suspense } from "react";

export default function SubscriptionTransactionsPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <SubscriptionTransactions />
  </Suspense>
 );
}
