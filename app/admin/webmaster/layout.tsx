"use client";

import WebMasterSidebar from "@/components/layouts/admin/webmaster/WebMasterSidebar";
import {useEffect, useState} from "react";

export default function WebMasterLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const [isMobile, setIsMobile] = useState(false);
 const [sidebarOpen, setSidebarOpen] = useState(false);

 useEffect(() => {
  const handleResize = () => {
   const mobile = window.innerWidth < 1024;
   setIsMobile(mobile);
   if (!mobile) {
    setSidebarOpen(true);
   } else {
    setSidebarOpen(false);
   }
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
 }, []);

 return (
  <div className="flex min-h-screen bg-gray-50">
   {/* Mobile toggle button */}
   {isMobile && (
    <button
     onClick={() => setSidebarOpen(!sidebarOpen)}
     className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white lg:hidden shadow-lg"
     aria-label="Toggle sidebar">
     {sidebarOpen ? (
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-6 w-6"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor">
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
       />
      </svg>
     ) : (
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-6 w-6"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor">
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
       />
      </svg>
     )}
    </button>
   )}

   <WebMasterSidebar
    isMobile={isMobile}
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
   />

   <main
    className={`
          flex-1 p-4 md:p-6 transition-all duration-300 min-h-screen
          ${sidebarOpen && isMobile ? "ml-0" : ""}
          ${!isMobile ? "ml-[280px]" : ""}
        `}>
    <div className="max-w-full overflow-x-auto">{children}</div>
   </main>
  </div>
 );
}
