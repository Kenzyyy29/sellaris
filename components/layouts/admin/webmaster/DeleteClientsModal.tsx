// /components/ConfirmModal.tsx
"use client";

import {FaExclamationTriangle, FaSpinner, FaTrash} from "react-icons/fa";

interface DeleteClientsModalProps {
 isOpen: boolean;
 onClose: () => void;
 onConfirm: () => void;
 isLoading: boolean;
 title: string;
 message: string;
}

export default function DeleteClientsModal({
 isOpen,
 onClose,
 onConfirm,
 isLoading,
 title,
 message,
}: DeleteClientsModalProps) {
 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
   <div className="bg-white rounded-lg p-6 max-w-md w-full">
    <div className="flex items-start">
     <div className="bg-red-100 p-3 rounded-full mr-4">
      <FaExclamationTriangle className="text-red-500 text-xl" />
     </div>
     <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2">{message}</p>
     </div>
    </div>
    <div className="mt-6 flex justify-end space-x-3">
     <button
      onClick={onClose}
      disabled={isLoading}
      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50">
      Cancel
     </button>
     <button
      onClick={onConfirm}
      disabled={isLoading}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center">
      {isLoading ? (
       <FaSpinner className="animate-spin mr-2" />
      ) : (
       <FaTrash className="mr-2" />
      )}
      Delete
     </button>
    </div>
   </div>
  </div>
 );
}
