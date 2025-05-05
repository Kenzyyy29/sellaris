"use client";
import {motion} from "framer-motion";
import Link from "next/link";
import {FaRocket} from "react-icons/fa";

const containerVariants = {
 hidden: {opacity: 0, y: 20},
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   staggerChildren: 0.1,
   delayChildren: 0.2,
  },
 },
};

const itemVariants = {
 hidden: {opacity: 0, y: -20},
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   type: "spring",
   stiffness: 100,
   damping: 10,
  },
 },
};

export default function AuthLayoutWrapper({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <motion.div
   className="bg-white w-full"
   initial="hidden"
   animate="visible"
   variants={containerVariants}>
   <motion.div
    className="fixed bg-gradient-to-br from-blue-600 to-blue-800 py-6 text-center w-full overflow-hidden"
    initial={{opacity: 0, y: -20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}>
    <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-8">
     <motion.div
      variants={itemVariants}
      className="flex-shrink-0 flex items-center">
      <Link
       href="/"
       className="flex items-center group">
       <motion.div
        className="bg-white p-2 rounded-full shadow-lg mr-3 group-hover:rotate-12 transition-transform"
        whileHover={{scale: 1.1}}>
        <FaRocket className="text-blue-600 text-xl" />
       </motion.div>
       <span className="text-white font-bold text-2xl bg-clip-text bg-gradient-to-r from-blue-100 to-blue-300">
        SELLARIS
       </span>
      </Link>
      <motion.span
       className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-500 text-white"
       animate={{
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
       }}
       transition={{
        repeat: Infinity,
        duration: 2,
       }}>
       PRO
      </motion.span>
     </motion.div>
     <Link href="/contact">
      <span className="text-white">Kontak</span>
     </Link>
    </nav>
   </motion.div>
   <main className="flex items-center justify-center w-full min-h-[100dvh]">
    {children}
   </main>
  </motion.div>
 );
}
