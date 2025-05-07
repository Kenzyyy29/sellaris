import SubscriptionPackages from "@/components/layouts/admin/webmaster/SubscriptionPackages";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "Subscription Packages",
 description: "Subscription Packages",
};

export default function SubscriptionPackagesPage() {
 return <SubscriptionPackages />;
}
