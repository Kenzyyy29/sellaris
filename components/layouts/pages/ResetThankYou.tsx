"use client";
import {motion} from "framer-motion";
import Link from "next/link";
import {FiCheckCircle, FiMail} from "react-icons/fi";

export default function ResetThankYou() {
 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <motion.div
    className="bg-white w-full max-w-md overflow-hidden rounded-2xl shadow-xl border border-gray-100 text-center"
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.3}}>
    <div className="bg-gradient-to-r from-green-600 to-green-500 p-8">
     <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-lg mx-auto">
      <FiCheckCircle className="text-green-600 text-3xl" />
     </div>
     <h1 className="text-2xl font-bold text-white mt-6">Permintaan Diterima</h1>
    </div>

    <div className="p-8">
     <div className="flex justify-center text-green-500 mb-6">
      <FiMail className="text-5xl" />
     </div>
     <h2 className="text-xl font-semibold text-gray-800 mb-2">
      Link Reset Password Telah Dikirim
     </h2>
     <p className="text-gray-600 mb-6">
      Kami telah mengirimkan link untuk mereset password Anda ke email yang
      terdaftar. Silakan cek inbox email Anda dan ikuti petunjuk yang diberikan.
     </p>

     <Link
      href="/auth/login"
      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
      Kembali ke Halaman Login
     </Link>
    </div>
   </motion.div>
  </div>
 );
}
