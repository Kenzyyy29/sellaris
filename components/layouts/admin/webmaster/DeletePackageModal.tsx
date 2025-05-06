import {FC} from "react";

interface DeletePackageModalProps {
 isOpen: boolean;
 onClose: () => void;
 onConfirm: () => void;
 isLoading: boolean;
 title: string;
 message: string;
}

const DeletePackageModal: FC<DeletePackageModalProps> = ({
 isOpen,
 onClose,
 onConfirm,
 isLoading,
 title,
 message,
}) => {
 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-white rounded-lg p-6 max-w-md w-full">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="mb-6">{message}</p>
    <div className="flex justify-end gap-3">
     <button
      onClick={onClose}
      disabled={isLoading}
      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50">
      Cancel
     </button>
     <button
      onClick={onConfirm}
      disabled={isLoading}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50">
      {isLoading ? "Deleting..." : "Delete"}
     </button>
    </div>
   </div>
  </div>
 );
};

export default DeletePackageModal;
