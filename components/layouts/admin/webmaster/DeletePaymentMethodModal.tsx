// DeletePaymentMethodModal.tsx
"use client";

import {motion} from "framer-motion";
import {FiAlertTriangle} from "react-icons/fi";

interface DeletePaymentMethodModalProps {
 isOpen: boolean;
 onClose: () => void;
 onConfirm: () => void;
 isLoading: boolean;
 title: string;
 message: string;
}

export default function DeletePaymentMethodModal({
 isOpen,
 onClose,
 onConfirm,
 isLoading,
 title,
 message,
}: DeletePaymentMethodModalProps) {
 const handleOverlayClick = (e: React.MouseEvent) => {
  if (e.target === e.currentTarget) {
   onClose();
  }
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 z-50 overflow-y-auto">
   <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
    onClick={handleOverlayClick}
   />

   <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <motion.div
     initial={{scale: 0.95, opacity: 0}}
     animate={{scale: 1, opacity: 1}}
     exit={{scale: 0.95, opacity: 0}}
     className="inline-block align-bottom bg-white rounded-xl shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
     onClick={(e) => e.stopPropagation()}>
     <div className="px-6 py-6">
      <div className="sm:flex sm:items-start">
       <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <FiAlertTriangle className="h-6 w-6 text-red-600" />
       </div>
       <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <div className="mt-2">
         <p className="text-sm text-gray-500">{message}</p>
        </div>
       </div>
      </div>
     </div>
     <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
      <button
       type="button"
       disabled={isLoading}
       onClick={onClose}
       className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
       Cancel
      </button>
      <button
       type="button"
       disabled={isLoading}
       onClick={onConfirm}
       className={`px-4 py-2 rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
        isLoading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
       }`}>
       {isLoading ? "Deleting..." : "Delete"}
      </button>
     </div>
    </motion.div>
   </div>
  </div>
 );
}
