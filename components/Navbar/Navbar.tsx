"use client";
import FlyoutLink from "./FlyoutLink";
import Link from "next/link";
import Consultation from "./(PricingContent)/consultation";
import Service from "./(PricingContent)/service";
import Other from "./(PricingContent)/other";


const Navbar = () => {
 return (
  <header className="sticky z-10 top-0 flex p-6 justify-between bg-gray-950  text-bone px-56">
   <ul>
    <Link href="/">
     <img
      src="/logo.png"
      alt=""
      className="w-20 mt-1"
     />
    </Link>
   </ul>
   <ul className="flex space-x-10 hover:cursor-pointer ">
    <FlyoutLink FlyoutContent={Service}>Layanan</FlyoutLink>
    <Link href="/pricing">Harga</Link>
    <Link href="/">Tentang Kami</Link>
    <FlyoutLink FlyoutContent={Consultation}>Konsultasi</FlyoutLink>
    <FlyoutLink FlyoutContent={Other}>Lainnya</FlyoutLink>
   </ul>
   <button className="rounded-lg px-3 py-1 bg-bone ">
    <Link
     href="/login"
     className=" text-gray-950">
     Masuk
    </Link>
   </button>
  </header>
 );
};

export default Navbar;
