"use client";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState, useEffect} from "react";
import {
 FiMenu,
 FiX,
 FiChevronDown,
 FiBriefcase,
 FiMail,
 FiBook,
 FiDollarSign,
 FiLayers,
} from "react-icons/fi";
import {FaHandshake, FaRocket} from "react-icons/fa";
import {BsFillLightningFill} from "react-icons/bs";
import SessionButton from "@/components/ui/SessionButton";

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

const menuVariants = {
 open: {
  opacity: 1,
  y: 0,
  transition: {
   staggerChildren: 0.1,
   delayChildren: 0.2,
  },
 },
 closed: {opacity: 0, y: -20},
};

export default function Navbar() {
 const pathname = usePathname();
 const [isOpen, setIsOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

 useEffect(() => {
  const handleScroll = () => {
   setScrolled(window.scrollY > 10);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 const navItems = [
  {
   name: "Tentang Kami",
   path: "/about",
   icon: <FaHandshake className="text-lg" />,
   submenu: null,
  },
  {
   name: "Fitur",
   path: "/features",
   icon: <BsFillLightningFill className="text-lg" />,
   submenu: [
    {
     path: "/features/analytics",
     name: "Analitik",
     icon: <FiLayers className="text-base" />,
    },
    {
     path: "/features/integrations",
     name: "Integrasi",
     icon: <FiLayers className="text-base" />,
    },
   ],
  },
  {
   name: "Harga",
   path: "/pricing",
   icon: <FiDollarSign className="text-lg" />,
   submenu: null,
  },
  {
   name: "Blog",
   path: "/blog",
   icon: <FiBook className="text-lg" />,
   submenu: null,
  },
  {
   name: "Karir",
   path: "/career",
   icon: <FiBriefcase className="text-lg" />,
   submenu: null,
  },
  {
   name: "Kontak",
   path: "/contact",
   icon: <FiMail className="text-lg" />,
   submenu: null,
  },
 ];

 const toggleSubmenu = (label: string) => {
  setActiveSubmenu(activeSubmenu === label ? null : label);
 };

 return (
  <motion.nav
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
   className={`fixed w-full z-50 py-3 ${
    scrolled
     ? "bg-gradient-to-br from-blue-600 to-blue-800 "
     : "bg-gradient-to-br from-blue-600 to-blue-800 backdrop-blur-sm"
   }`}>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
     {/* Logo/Brand */}
     <motion.div
      variants={itemVariants}
      className="flex-shrink-0 flex items-center"
      whileHover={{scale: 1.05}}>
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

     {/* Desktop Navigation */}
     <motion.div
      variants={itemVariants}
      className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
       <div
        key={item.path}
        className="relative">
        <div className="flex items-center">
         <Link
          href={item.path}
          className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
           pathname === item.path
            ? "bg-blue-800/50 text-white shadow-inner"
            : "text-blue-100 hover:bg-blue-700/50 hover:text-white"
          }`}
          onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}>
          {item.name}
          {item.submenu && (
           <FiChevronDown
            className={`ml-1 transition-transform ${
             activeSubmenu === item.name ? "rotate-180" : ""
            }`}
           />
          )}
         </Link>
        </div>

        {item.submenu && (
         <AnimatePresence>
          {activeSubmenu === item.name && (
           <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute left-0 mt-2 w-56 origin-top-left rounded-xl bg-blue-800 shadow-lg ring-1 ring-blue-900/50"
            onMouseLeave={() => setActiveSubmenu(null)}>
            <div className="py-1">
             {item.submenu.map((subItem) => (
              <motion.div
               key={subItem.path}
               variants={itemVariants}>
               <Link
                href={subItem.path}
                className={`block px-4 py-3 text-sm ${
                 pathname === subItem.path
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-700/50 hover:text-white"
                }`}>
                {subItem.name}
               </Link>
              </motion.div>
             ))}
            </div>
           </motion.div>
          )}
         </AnimatePresence>
        )}
       </div>
      ))}
     </motion.div>

     {/* Auth Section */}
     <motion.div
      variants={itemVariants}
      className="hidden md:flex items-center ml-4">
      <SessionButton />
     </motion.div>

     {/* Mobile Menu Button */}
     <motion.button
      className="md:hidden text-white p-2 rounded-lg hover:bg-blue-700/50"
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{scale: 1.1}}
      whileTap={{scale: 0.95}}>
      {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
     </motion.button>
    </div>
   </div>

   {/* Mobile Menu */}
   <AnimatePresence>
    {isOpen && (
     <motion.div
      initial={{opacity: 0, height: 0}}
      animate={{opacity: 1, height: "auto"}}
      exit={{opacity: 0, height: 0}}
      transition={{duration: 0.3}}
      className="md:hidden bg-gradient-to-b from-blue-700 to-blue-800 overflow-hidden">
      <div className="px-4 pt-2 pb-4 space-y-1">
       {navItems.map((item) => (
        <div key={item.path}>
         <div
          className="flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium text-blue-100 hover:bg-blue-700/50 hover:text-white"
          onClick={() =>
           item.submenu ? toggleSubmenu(item.name) : setIsOpen(false)
          }>
          <Link
           href={item.path}
           className="flex items-center flex-1">
           {item.name}
          </Link>
          {item.submenu && (
           <FiChevronDown
            className={`transition-transform ${
             activeSubmenu === item.name ? "rotate-180" : ""
            }`}
           />
          )}
         </div>

         {item.submenu && activeSubmenu === item.name && (
          <div className="pl-8 py-1 space-y-1">
           {item.submenu.map((subItem) => (
            <Link
             key={subItem.path}
             href={subItem.path}
             onClick={() => setIsOpen(false)}
             className={`block px-3 py-2 rounded-lg text-sm ${
              pathname === subItem.path
               ? "bg-blue-800 text-white"
               : "text-blue-100 hover:bg-blue-700 hover:text-white"
             }`}>
             {subItem.name}
            </Link>
           ))}
          </div>
         )}
        </div>
       ))}
       <div className="pt-2">
        <SessionButton
         mobile
         onClose={() => setIsOpen(false)}
        />
       </div>
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </motion.nav>
 );
}
