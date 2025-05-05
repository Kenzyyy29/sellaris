"use client";
import {signOut} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";
import {
 FaUser,
 FaSignOutAlt,
 FaBoxes,
 FaMoneyBillWave,
 FaChartLine,
 FaServer,
 FaCog,
 FaWallet,
} from "react-icons/fa";
import {RiShieldKeyholeFill} from "react-icons/ri";
import {IoIosArrowDropright} from "react-icons/io";
import {MdDashboard} from "react-icons/md";
import {useState} from "react";
import {FaPencil} from "react-icons/fa6";

interface WebMasterSidebarProps {
 isMobile: boolean;
 sidebarOpen: boolean;
 setSidebarOpen: (open: boolean) => void;
}

const webmasterLinks = [
 {name: "Dashboard", path: "/admin/webmaster", icon: <MdDashboard />},
 {
  name: "Subscriptions",
  path: "/admin/webmaster/subscriptions",
  icon: <FaMoneyBillWave />,
  subItems: [
   {name: "Packages", path: "/admin/webmaster/subscriptions/packages"},
   {name: "Transactions", path: "/admin/webmaster/subscriptions/transactions"},
  ],
 },
 {
  name: "Clients",
  path: "/admin/webmaster/clients",
  icon: <FaUser />,
  subItems: [
   {name: "All Clients", path: "/admin/webmaster/clients"},
   {name: "Client Tickets", path: "/admin/webmaster/clients/tickets"},
  ],
 },
 {
  name: "Resources",
  path: "/admin/webmaster/resources",
  icon: <FaBoxes />,
  subItems: [
   {name: "Server Allocation", path: "/admin/webmaster/resources/servers"},
   {name: "API Keys", path: "/admin/webmaster/resources/api"},
  ],
 },
 {
  name: "Analytics",
  path: "/admin/webmaster/analytics",
  icon: <FaChartLine />,
 },
 {
  name: "Blog",
  path: "/admin/webmaster/blog",
  icon: <FaPencil />,
 },
 {
  name: "Payment Methods",
  path: "/admin/webmaster/payment-methods",
  icon: <FaWallet />,
 },
 {
  name: "System",
  path: "/admin/webmaster/system",
  icon: <FaServer />,
  subItems: [
   {name: "Logs", path: "/admin/webmaster/system/logs"},
   {name: "Maintenance", path: "/admin/webmaster/system/maintenance"},
  ],
 },
 {
  name: "Security",
  path: "/admin/webmaster/security",
  icon: <RiShieldKeyholeFill />,
 },
 {
  name: "Settings",
  path: "/admin/webmaster/settings",
  icon: <FaCog />,
 },
];

export default function WebMasterSidebar({
 isMobile,
 sidebarOpen,
 setSidebarOpen,
}: WebMasterSidebarProps) {
 const pathname = usePathname();
 const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
  {}
 );

 const toggleItemExpand = (path: string) => {
  setExpandedItems((prev) => ({
   ...prev,
   [path]: !prev[path],
  }));
 };

 const isActive = (path: string, exact: boolean = false) => {
  if (exact) {
   return pathname === path;
  }
  return (
   pathname.startsWith(path) &&
   (path === "/admin/webmaster" ? pathname === "/admin/webmaster" : true)
  );
 };

 const handleLinkClick = (path: string, hasSubItems: boolean) => {
  if (isMobile && !hasSubItems) {
   setSidebarOpen(false);
  }
 };

 return (
  <>
   <AnimatePresence>
    {(sidebarOpen || !isMobile) && (
     <motion.div
      initial={isMobile ? {x: -280} : {x: 0}}
      animate={isMobile ? {x: sidebarOpen ? 0 : -280} : {x: 0}}
      exit={{x: -280}}
      transition={{type: "spring", stiffness: 300, damping: 30}}
      className={`fixed left-0 top-0 h-full w-[280px] bg-gradient-to-br from-blue-600 to-blue-700 text-white p-5 flex flex-col rounded-r-xl shadow-xl z-40 ${
       isMobile && !sidebarOpen ? "hidden" : ""
      }`}>
      {/* Custom scrollbar styles */}
      <style
       jsx
       global>{`
       .sidebar-scroll {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.1);
        overflow-y: overlay;
       }
       .sidebar-scroll::-webkit-scrollbar {
        width: 6px;
        height: 6px;
       }
       .sidebar-scroll::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 3px;
        margin-top: 10px;
        margin-bottom: 10px;
       }
       .sidebar-scroll::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 0.1);
       }
       .sidebar-scroll::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 255, 255, 0.6);
       }
       .sidebar-scroll::-webkit-scrollbar-corner {
        background: transparent;
       }
      `}</style>

      <div className="flex flex-col w-full h-full">
       {/* Scrollable menu area */}
       <div className="flex-1 sidebar-scroll pr-1">
        <Link
         href="/"
         onClick={() => isMobile && setSidebarOpen(false)}>
         <h1
          className="text-3xl font-bold mb-8 italic text-white text-center"
          style={{fontFamily: "'Raleway', sans-serif"}}>
          SELLARIS
         </h1>
        </Link>

        <ul className="flex flex-col gap-2 w-full">
         {webmasterLinks.map((link) => (
          <li
           key={link.path}
           className="overflow-visible">
           <div className="flex flex-col">
            <Link
             href={link.path}
             className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700/50 transition-all ${
              isActive(link.path, link.path === "/admin/webmaster")
               ? "bg-blue-700 font-medium"
               : ""
             }`}
             onClick={(e) => {
              if (link.subItems) {
               e.preventDefault();
               toggleItemExpand(link.path);
              }
              handleLinkClick(link.path, !!link.subItems);
             }}>
             <span className="text-xl min-w-[24px] flex justify-center">
              {link.icon}
             </span>
             <span className="flex-1 text-left">{link.name}</span>
             {link.subItems && (
              <motion.span
               animate={{
                rotate: expandedItems[link.path] ? 90 : 0,
               }}>
               <IoIosArrowDropright />
              </motion.span>
             )}
            </Link>

            {link.subItems && expandedItems[link.path] && (
             <motion.ul
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: "auto"}}
              exit={{opacity: 0, height: 0}}
              className="ml-8 pl-3 border-l-2 border-blue-400/30">
              {link.subItems.map((subItem) => (
               <li
                key={subItem.path}
                className="py-1.5">
                <Link
                 href={subItem.path}
                 className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded hover:bg-blue-700/30 ${
                  pathname === subItem.path
                   ? "text-white font-medium"
                   : "text-white"
                 }`}
                 onClick={() => handleLinkClick(subItem.path, false)}>
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                 {subItem.name}
                </Link>
               </li>
              ))}
             </motion.ul>
            )}
           </div>
          </li>
         ))}
        </ul>
       </div>

       {/* Fixed footer */}
       <div className="w-full pt-4 pb-2">
        <motion.button
         onClick={() => signOut()}
         className="flex items-center gap-3 bg-blue-800 hover:bg-blue-600 text-white w-full py-2.5 px-4 rounded-lg cursor-pointer transition-colors"
         whileHover={{scale: 1.02}}
         whileTap={{scale: 0.98}}>
         <FaSignOutAlt />
         <span>Sign Out</span>
        </motion.button>
       </div>
      </div>
     </motion.div>
    )}
   </AnimatePresence>

   {/* Overlay for mobile */}
   {isMobile && sidebarOpen && (
    <div
     className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
     onClick={() => setSidebarOpen(false)}
    />
   )}
  </>
 );
}
