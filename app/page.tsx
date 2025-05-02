import HomePageLayout from "@/components/layouts/pages/HomePage";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "Sellaris - Solusi Bisnis yang Menyenangkan",
 description: "Platform manajemen bisnis dengan pengalaman visual memukau",
};

export default function Home() {
 return (
  <div>
   <HomePageLayout />
  </div>
 );
}
