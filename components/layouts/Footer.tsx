"use client";
import {motion} from "framer-motion";
import Link from "next/link";
import {FiMail, FiGithub, FiTwitter} from "react-icons/fi";
import {FaRocket, FaHandshake} from "react-icons/fa";

const itemVariants = {
 hidden: {opacity: 0, y: 20},
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

export default function Footer() {
 const navItems = [
  {href: "/", label: "Beranda"},
  {href: "/features", label: "Fitur"},
  {href: "/pricing", label: "Harga"},
  {href: "/about", label: "Tentang Kami"},
  {href: "/contact", label: "Kontak"},
 ];

 const featureItems = [
  {href: "/features/analytics", label: "Analitik"},
  {href: "/features/integrations", label: "Integrasi"},
 ];

 return (
  <footer className="bg-gradient-to-br from-blue-800 to-blue-900 text-white pt-16 pb-8">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
     initial="hidden"
     animate="visible"
     variants={{
      visible: {
       transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
       },
      },
     }}
     className="grid grid-cols-1 md:grid-cols-4 gap-8">
     {/* Company Info */}
     <motion.div
      variants={itemVariants}
      className="space-y-4">
      <div className="flex items-center">
       <div className="bg-white p-2 rounded-full shadow-lg mr-3">
        <FaRocket className="text-blue-600 text-xl" />
       </div>
       <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-300">
        SELLARIS
       </span>
      </div>
      <p className="text-blue-200">
       Solusi modern untuk bisnis Anda. Memberikan pengalaman terbaik untuk
       pelanggan.
      </p>
      <div className="flex space-x-4">
       <a
        href="#"
        className="text-blue-200 hover:text-white transition-colors">
        <FiTwitter className="text-xl" />
       </a>
       <a
        href="#"
        className="text-blue-200 hover:text-white transition-colors">
        <FiGithub className="text-xl" />
       </a>
       <a
        href="#"
        className="text-blue-200 hover:text-white transition-colors">
        <FiMail className="text-xl" />
       </a>
      </div>
     </motion.div>

     {/* Quick Links */}
     <motion.div variants={itemVariants}>
      <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
      <ul className="space-y-2">
       {navItems.map((item) => (
        <li key={item.href}>
         <Link
          href={item.href}
          className="text-blue-200 hover:text-white transition-colors">
          {item.label}
         </Link>
        </li>
       ))}
      </ul>
     </motion.div>

     {/* Features */}
     <motion.div variants={itemVariants}>
      <h3 className="text-lg font-semibold mb-4">Fitur</h3>
      <ul className="space-y-2">
       {featureItems.map((item) => (
        <li key={item.href}>
         <Link
          href={item.href}
          className="text-blue-200 hover:text-white transition-colors">
          {item.label}
         </Link>
        </li>
       ))}
      </ul>
     </motion.div>

     {/* Newsletter */}
     <motion.div variants={itemVariants}>
      <h3 className="text-lg font-semibold mb-4">Berlangganan</h3>
      <p className="text-blue-200 mb-4">
       Dapatkan update terbaru langsung ke inbox Anda.
      </p>
      <div className="flex">
       <input
        type="email"
        placeholder="Email Anda"
        className="px-4 py-2 rounded-l-lg w-full focus:outline-none border border-blue-500 text-blue-200"
       />
       <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-r-lg transition-all">
        <FiMail />
       </button>
      </div>
     </motion.div>
    </motion.div>

    <motion.div
     variants={itemVariants}
     className="border-t border-blue-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
     <p className="text-blue-300 text-sm">
      © {new Date().getFullYear()} SELLARIS. All rights reserved.
     </p>
     <div className="flex space-x-6 mt-4 md:mt-0">
      <Link
       href="/privacy"
       className="text-blue-300 hover:text-white text-sm transition-colors">
       Kebijakan Privasi
      </Link>
      <Link
       href="/terms"
       className="text-blue-300 hover:text-white text-sm transition-colors">
       Syarat & Ketentuan
      </Link>
      <Link
       href="/contact"
       className="text-blue-300 hover:text-white text-sm transition-colors">
       Kontak Kami
      </Link>
     </div>
    </motion.div>
   </div>
  </footer>
 );
}
