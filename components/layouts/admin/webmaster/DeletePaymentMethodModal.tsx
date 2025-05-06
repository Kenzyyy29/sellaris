import {motion, AnimatePresence} from "framer-motion";
import {FiAlertTriangle, FiTrash2, FiX} from "react-icons/fi";

interface DeletePaymentMethodModalProps {
 isOpen: boolean;
 onClose: () => void;
 onConfirm: () => void;
 methodName: string;
}

const DeletePaymentMethodModal = ({
 isOpen,
 onClose,
 onConfirm,
 methodName,
}: DeletePaymentMethodModalProps) => {
 return (
  <AnimatePresence>
   {isOpen && (
    <motion.div
     initial={{opacity: 0}}
     animate={{opacity: 1}}
     exit={{opacity: 0}}
     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
     onClick={onClose}>
     <motion.div
      initial={{scale: 0.9, y: 20}}
      animate={{scale: 1, y: 0}}
      exit={{scale: 0.9, y: 20}}
      className="bg-white rounded-lg shadow-xl w-full max-w-md"
      onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center border-b px-6 py-4">
       <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <FiAlertTriangle className="text-yellow-500" />
        Konfirmasi Penghapusan
       </h3>
       <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-500">
        <FiX className="h-6 w-6" />
       </button>
      </div>
      <div className="p-6">
       <p className="text-gray-700 mb-6">
        Apakah Anda yakin ingin menghapus metode pembayaran{" "}
        <span className="font-semibold">{methodName}</span>? Tindakan ini tidak
        dapat dibatalkan.
       </p>
       <div className="flex justify-end space-x-3">
        <button
         type="button"
         onClick={onClose}
         className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
         Batal
        </button>
        <button
         type="button"
         onClick={onConfirm}
         className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center gap-2">
         <FiTrash2 /> Hapus
        </button>
       </div>
      </div>
     </motion.div>
    </motion.div>
   )}
  </AnimatePresence>
 );
};

export default DeletePaymentMethodModal;
