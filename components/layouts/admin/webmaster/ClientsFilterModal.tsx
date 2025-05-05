"use client";

import {FaFilter, FaTimes, FaCalendarAlt} from "react-icons/fa";
import {motion} from "framer-motion";
import { useState } from "react";

interface FilterModalProps {
 isOpen: boolean;
 onClose: () => void;
 onApply: (filters: any) => void;
 filters: {
  sort: "newest" | "oldest" | "";
  verified: boolean | null;
 };
}

export default function ClientsFilterModal({
 isOpen,
 onClose,
 onApply,
 filters,
}: FilterModalProps) {
 const [localFilters, setLocalFilters] = useState(filters);

 if (!isOpen) return null;

 const handleApply = () => {
  onApply(localFilters);
  onClose();
 };

 const resetFilters = () => {
  setLocalFilters({
   sort: "",
   verified: null,
  });
 };

 return (
  <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   exit={{opacity: 0}}
   className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
   <motion.div
    initial={{y: 20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    className="bg-white rounded-lg p-6 max-w-md w-full">
    <div className="flex justify-between items-center mb-4">
     <h3 className="text-lg font-bold flex items-center">
      <FaFilter className="mr-2" /> Filter Clients
     </h3>
     <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700">
      <FaTimes />
     </button>
    </div>

    <div className="space-y-4">
     <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
       Urutkan berdasarkan:
      </label>
      <div className="flex space-x-2">
       <button
        onClick={() => setLocalFilters({...localFilters, sort: "newest"})}
        className={`px-3 py-2 text-sm rounded-md flex items-center ${
         localFilters.sort === "newest"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800"
        }`}>
        <FaCalendarAlt className="mr-2" /> Terbaru
       </button>
       <button
        onClick={() => setLocalFilters({...localFilters, sort: "oldest"})}
        className={`px-3 py-2 text-sm rounded-md flex items-center ${
         localFilters.sort === "oldest"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800"
        }`}>
        <FaCalendarAlt className="mr-2" /> Terlama
       </button>
      </div>
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
       Status Verifikasi:
      </label>
      <div className="flex space-x-2">
       <button
        onClick={() => setLocalFilters({...localFilters, verified: true})}
        className={`px-3 py-2 text-sm rounded-md ${
         localFilters.verified === true
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-800"
        }`}>
        Verified
       </button>
       <button
        onClick={() => setLocalFilters({...localFilters, verified: false})}
        className={`px-3 py-2 text-sm rounded-md ${
         localFilters.verified === false
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800"
        }`}>
        Unverified
       </button>
      </div>
     </div>
    </div>

    <div className="mt-6 flex justify-between">
     <button
      onClick={resetFilters}
      className="px-4 py-2 text-gray-700 hover:text-gray-900 text-sm">
      Reset Filter
     </button>
     <div className="space-x-3">
      <button
       onClick={onClose}
       className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
       Batal
      </button>
      <button
       onClick={handleApply}
       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
       Terapkan
      </button>
     </div>
    </div>
   </motion.div>
  </motion.div>
 );
}
