"use client";
import RegisterForm from "@/components/core/modal/RegisterForm";
import {motion} from "framer-motion";

export default function RegisterPage() {
 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white py-12 px-4 sm:px-6 lg:px-8">
   <motion.div
    initial={{scale: 0.95, opacity: 0}}
    animate={{scale: 1, opacity: 1}}
    transition={{duration: 0.5}}
    className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
    <RegisterForm />
   </motion.div>
  </div>
 );
}
