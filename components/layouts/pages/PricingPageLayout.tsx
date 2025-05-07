"use client";

import {motion} from "framer-motion";
import {
 FaCheck,
 FaStar,
 FaCrown,
 FaRocket,
 FaGem,
 FaBolt,
 FaShieldAlt,
} from "react-icons/fa";
import {SubscriptionPackage, useSubscriptionPackages} from "@/lib/hooks/useSubscriptionPackage";
import {useEffect, useState} from "react";
import Link from "next/link";

const PricingPageLayout = () => {
 const {packages, loading} = useSubscriptionPackages();
 const [activePackages, setActivePackages] = useState<SubscriptionPackage[]>([]);

 useEffect(() => {
  const filtered = packages.filter((pkg) => pkg.isActive);
  setActivePackages(filtered);
 }, [packages]);

 // Animasi
 const container = {
  hidden: {opacity: 0},
  visible: {
   opacity: 1,
   transition: {
    staggerChildren: 0.2,
   },
  },
 };

 const cardItem = {
  hidden: {y: 30, opacity: 0},
  visible: {
   y: 0,
   opacity: 1,
   transition: {
    type: "spring",
    stiffness: 120,
    damping: 12,
   },
  },
 };

 const getPackageTheme = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("starter"))
   return {
    bg: "from-slate-100 to-slate-200",
    text: "text-slate-800",
    button: "bg-slate-700 hover:bg-slate-800",
    icon: <FaStar className="text-slate-500" />,
    border: "border-slate-300",
    outline: "outline-slate-400",
   };
  if (lowerName.includes("professional"))
   return {
    bg: "from-blue-500 to-blue-600",
    text: "text-white",
    button: "bg-blue-600 hover:bg-blue-700",
    icon: <FaRocket className="text-blue-200" />,
    border: "border-blue-400",
    outline: "outline-blue-500",
   };
  if (lowerName.includes("enterprise"))
   return {
    bg: "from-amber-400 to-amber-500",
    text: "text-white",
    button: "bg-amber-600 hover:bg-amber-700",
    icon: <FaCrown className="text-amber-200" />,
    border: "border-amber-400",
    outline: "outline-amber-500",
   };
  return {
   bg: "from-gray-200 to-gray-300",
   text: "text-gray-800",
   button: "bg-gray-600 hover:bg-gray-700",
   icon: <FaGem className="text-gray-500" />,
   border: "border-gray-300",
   outline: "outline-gray-400",
  };
 };

 const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
   style: "currency",
   currency: "IDR",
   minimumFractionDigits: 0,
  }).format(price);
 };

 return (
  <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
   <div className="max-w-7xl mx-auto">
    {/* Header */}
    <motion.div
     initial={{opacity: 0, y: -20}}
     animate={{opacity: 1, y: 0}}
     transition={{duration: 0.6}}
     className="text-center mb-20">
     <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
      Pilihan Paket Langganan
     </h1>
     <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600">
      Temukan solusi tepat untuk kebutuhan bisnis Anda
     </p>
    </motion.div>

    {/* Pricing Cards */}
    {loading ? (
     <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
     </div>
    ) : (
     <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 items-stretch">
      {activePackages.map((pkg) => {
       const theme = getPackageTheme(pkg.name);
       const isRecommended = pkg.isRecommended;

       return (
        <div
         key={pkg.id}
         className="relative">
         {/* Recommended Ribbon */}
         {isRecommended && (
          <div className="absolute -top-3 -right-3 z-10">
           <div className="flex items-center justify-center bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg shadow-lg font-bold text-sm">
            <FaBolt className="mr-1" /> REKOMENDASI
           </div>
          </div>
         )}

         <motion.div
          variants={cardItem}
          whileHover={{y: -8}}
          className={`flex flex-col h-full border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
           theme.border
          } ${
           isRecommended ? `outline-4 ${theme.outline} outline-offset-2` : ""
          }`}>
          {/* Card Header */}
          <div className={`bg-gradient-to-r ${theme.bg} px-8 py-10`}>
           <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold ${theme.text}`}>{pkg.name}</h2>
            <div className="text-3xl">{theme.icon}</div>
           </div>

           <div className={`mt-6 flex items-end ${theme.text}`}>
            <span className="text-4xl font-extrabold">
             {formatPrice(pkg.price)}
            </span>
            <span className="ml-2 text-lg font-medium">
             /{pkg.durationType === "monthly" ? "bulan" : "tahun"}
            </span>
           </div>
          </div>

          {/* Card Body */}
          <div className="flex-grow bg-white px-8 py-8 flex flex-col">
           <div className="mb-8 flex-grow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
             Fitur Utama
            </h3>
            <ul className="space-y-3">
             {pkg.features.map((feature: string, index: number) => (
              <li
               key={index}
               className="flex items-start">
               <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
               <span className="ml-3 text-gray-700 line-clamp-2">
                {feature}
               </span>
              </li>
             ))}
            </ul>
           </div>
           {/* CTA Button */}
           // Replace the button in your pricing card with:
           <Link href={`/pricing/confirmation?packageId=${pkg.id}`}>
            <motion.button
             whileHover={{scale: 1.02}}
             whileTap={{scale: 0.98}}
             className={`w-full py-3 px-6 rounded-lg text-lg font-semibold text-white shadow-md transition-colors ${theme.button}`}>
             Mulai Sekarang
            </motion.button>
           </Link>
          </div>
         </motion.div>
        </div>
       );
      })}
     </motion.div>
    )}

    {/* Additional Info */}
    <motion.div
     initial={{opacity: 0}}
     animate={{opacity: 1}}
     transition={{delay: 0.5}}
     className="mt-16 text-center bg-white rounded-xl p-6 shadow-sm border border-gray-200">
     <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 mb-4">
      <FaShieldAlt className="mr-2" /> Garansi 30 Hari Uang Kembali
     </div>
     <p className="text-gray-600 max-w-2xl mx-auto">
      Tidak puas dengan layanan kami? Kami akan mengembalikan pembayaran Anda
      dalam 30 hari tanpa pertanyaan.
     </p>
    </motion.div>
   </div>
  </div>
 );
};

export default PricingPageLayout;
