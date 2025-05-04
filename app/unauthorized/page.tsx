"use client";
import {motion} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {BsShieldLock} from "react-icons/bs";
import {FiArrowRight} from "react-icons/fi";

export default function UnauthorizedPage() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const redirectTo = searchParams.get("redirectTo") || "/admin/dashboard";

 useEffect(() => {
  const timer = setTimeout(() => {
   router.push(redirectTo);
  }, 3000);

  return () => clearTimeout(timer);
 }, [router, redirectTo]);

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
   <motion.div
    className="bg-white w-full max-w-md overflow-hidden rounded-2xl shadow-xl border border-gray-100"
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}>
    <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center relative overflow-hidden">
     <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-lg">
      <BsShieldLock className="text-red-600 text-3xl" />
     </div>
     <h1 className="text-2xl font-bold text-white mt-6">Akses Ditolak</h1>
     <p className="text-red-100 mt-2">
      Anda tidak memiliki izin untuk mengakses halaman ini
     </p>
    </div>

    <div className="p-8 text-center">
     <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center gap-2 mb-6">
      <BsShieldLock className="text-lg" />
      Anda akan dialihkan dalam 3 detik
     </div>

     <button
      onClick={() => router.push(redirectTo)}
      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-md transition-all">
      <span>Kembali ke Dashboard</span>
      <FiArrowRight />
     </button>
    </div>
   </motion.div>
  </div>
 );
}
