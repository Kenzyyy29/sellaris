import SubscriptionTransactions from "@/components/layouts/admin/webmaster/SubscriptionTransaction";
import {Metadata} from "next";
import {Suspense} from "react";

export const metadata: Metadata = {
 title: "Subscription Transactions",
 description: "Subscription Transactions",
};

export default function SubscriptionTransactionsPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <SubscriptionTransactions />
  </Suspense>
 );
}
