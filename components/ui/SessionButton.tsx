"use client";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FiUser, FiLogOut, FiGrid, FiChevronDown, FiLogIn} from "react-icons/fi";

const itemVariants = {
 hidden: {opacity: 0, y: 10},
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

const menuVariants = {
 open: {
  opacity: 1,
  y: 0,
  transition: {
   staggerChildren: 0.05,
   delayChildren: 0.1,
  },
 },
 closed: {opacity: 0, y: -10},
};

type SessionButtonProps = {
 mobile?: boolean;
 onClose?: () => void;
};

export default function SessionButton({
 mobile = false,
 onClose,
}: SessionButtonProps) {
 const {data: session} = useSession();
 const [menuOpen, setMenuOpen] = useState(false);
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
  setIsClient(true);
 }, []);

 const toggleMenu = () => {
  setMenuOpen(!menuOpen);
 };

 const handleItemClick = () => {
  setMenuOpen(false);
  onClose?.();
 };

 if (!isClient) {
  return (
   <div
    className={`${
     mobile ? "w-full" : "w-32"
    } h-10 bg-blue-600/20 rounded-xl animate-pulse"`}
   />
  );
 }

 if (session?.user) {
  return (
   <div className={`relative ${mobile ? "w-full" : ""}`}>
    {/* Main Button */}
    <motion.button
     className={`flex items-center gap-2 ${
      mobile
       ? "w-full justify-between px-5 py-3 bg-gradient-to-r from-blue-600/80 to-blue-700/80 rounded-xl"
       : "px-4 py-2 rounded-xl hover:bg-blue-600/20"
     } text-white font-medium transition-all`}
     onClick={toggleMenu}
     whileHover={{scale: 1.03}}
     whileTap={{scale: 0.97}}>
     <div className="flex items-center gap-2">
      <div className="bg-white p-1 rounded-full">
       <FiUser className="text-blue-600 text-sm" />
      </div>
      <span className="truncate max-w-[120px] font-medium">
       {session.user.name?.split(" ")[0] || "User"}
      </span>
     </div>
     <motion.span
      animate={{rotate: menuOpen ? 180 : 0}}
      transition={{duration: 0.2}}>
      <FiChevronDown className="text-sm opacity-80" />
     </motion.span>
    </motion.button>

    {/* Dropdown Menu */}
    <AnimatePresence>
     {menuOpen && (
      <motion.div
       initial="closed"
       animate="open"
       exit="closed"
       variants={menuVariants}
       className={`absolute ${
        mobile ? "left-0 right-0 mt-2" : "right-0 mt-2"
       } bg-white rounded-xl shadow-xl overflow-hidden z-50 min-w-[200px] border border-blue-100`}>
       <motion.div variants={itemVariants}>
        <Link
         href="/dashboard"
         className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-blue-50 transition-colors border-b border-blue-100"
         onClick={handleItemClick}>
         <FiGrid className="text-blue-600 text-lg" />
         <span>Dashboard</span>
        </Link>
       </motion.div>
       <motion.div variants={itemVariants}>
        <button
         onClick={() => {
          handleItemClick();
          signOut({callbackUrl: "/"});
         }}
         className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-blue-50 transition-colors">
         <FiLogOut className="text-blue-600 text-lg" />
         <span>Sign Out</span>
        </button>
       </motion.div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  );
 }

 return (
  <motion.div
   whileHover={{scale: 1.03}}
   whileTap={{scale: 0.97}}>
   <Link
    href="/auth/login"
    className={`flex items-center gap-2 ${
     mobile
      ? "w-full justify-center px-5 py-3 bg-gradient-to-r from-blue-600/80 to-blue-700/80 rounded-xl"
      : "px-4 py-2 rounded-xl hover:bg-blue-600/20"
    } text-white font-medium transition-all`}
    onClick={onClose}>
    <FiLogIn className="text-lg" />
    <span>Sign In</span>
   </Link>
  </motion.div>
 );
}
