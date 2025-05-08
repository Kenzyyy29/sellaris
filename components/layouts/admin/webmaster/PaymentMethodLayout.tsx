"use client";

import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {
 FiPlus,
 FiEdit,
 FiTrash2,
 FiToggleLeft,
 FiToggleRight,
 FiCreditCard,
 FiDollarSign,
 FiSmartphone,
} from "react-icons/fi";
import {usePaymentMethods, PaymentMethod} from "@/lib/hooks/usePaymentMethod";
import {BsBank} from "react-icons/bs";
import DeletePaymentMethodModal from "./DeletePaymentMethodModal";
import Image from "next/image";
import AddPaymentMethodModal from "./AddPaymentMethodModal";
import EditPaymentMethodModal from "./EditPaymentMethodModal";

const PaymentMethodLayout   = () => {
 const {
  methods,
  loading,
  addMethod,
  updateMethod,
  toggleMethodStatus,
  deleteMethod,
 } = usePaymentMethods();

 const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [currentMethod, setCurrentMethod] = useState<PaymentMethod | null>(null);

 const [deleteModal, setDeleteModal] = useState({
  isOpen: false,
  methodId: "",
  methodName: "",
 });

 const [windowHeight, setWindowHeight] = useState(0);

 useEffect(() => {
  setWindowHeight(window.innerHeight);
  const handleResize = () => setWindowHeight(window.innerHeight);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
 }, []);

 const handleAddMethod = async (formData: Omit<PaymentMethod, "id">) => {
  try {
   await addMethod(formData);
   setIsAddModalOpen(false);
  } catch (error) {
   console.error("Error adding payment method:", error);
  }
 };

 const handleEditMethod = async (formData: Omit<PaymentMethod, "id">) => {
  if (!currentMethod) return;
  try {
   await updateMethod(currentMethod.id!, formData);
   setIsEditModalOpen(false);
   setCurrentMethod(null);
  } catch (error) {
   console.error("Error updating payment method:", error);
  }
 };

 const handleEdit = (method: PaymentMethod) => {
  setCurrentMethod(method);
  setIsEditModalOpen(true);
 };

 const handleDeleteClick = (id: string, name: string) => {
  setDeleteModal({
   isOpen: true,
   methodId: id,
   methodName: name,
  });
 };

 const confirmDelete = async () => {
  try {
   await deleteMethod(deleteModal.methodId);
   setDeleteModal({isOpen: false, methodId: "", methodName: ""});
  } catch (error) {
   console.error("Error deleting payment method:", error);
  }
 };

 const handleToggleStatus = async (id: string, isActive: boolean) => {
  try {
   await toggleMethodStatus(id, !isActive);
  } catch (error) {
   console.error("Error toggling payment method status:", error);
  }
 };

 const getMethodIcon = (type: string) => {
  switch (type) {
   case "bank":
    return <BsBank className="text-blue-500" />;
   case "e-wallet":
    return <FiSmartphone className="text-green-500" />;
   case "qris":
    return <FiCreditCard className="text-purple-500" />;
   default:
    return <FiDollarSign className="text-yellow-500" />;
  }
 };

 // Style untuk scrollbar custom
 const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;

 return (
  <div className="container mx-auto px-4 py-8">
   <style>{scrollbarStyles}</style>

   <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold text-gray-800">
     Manajemen Metode Pembayaran
    </h1>
    <motion.button
     whileHover={{scale: 1.05}}
     whileTap={{scale: 0.95}}
     onClick={() => setIsAddModalOpen(true)}
     className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
     <FiPlus /> Tambah Metode
    </motion.button>
   </div>

   {loading ? (
    <div className="flex justify-center items-center h-64">
     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
   ) : (
    <div className="bg-white rounded-lg shadow overflow-hidden">
     <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
        <tr>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Metode
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Informasi Akun
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Biaya
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
         </th>
         <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Aksi
         </th>
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        {methods.map((method) => (
         <motion.tr
          key={method.id}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
             {method.logoUrl ? (
              <Image
               className="h-10 w-10 rounded-full"
               src={method.logoUrl}
               alt={method.name}
               width={40}
               height={40}
              />
             ) : (
              getMethodIcon(method.type)
             )}
            </div>
            <div className="ml-4">
             <div className="text-sm font-medium text-gray-900">
              {method.name}
             </div>
             <div className="text-sm text-gray-500">{method.description}</div>
            </div>
           </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="text-sm text-gray-900">{method.accountName}</div>
           <div className="text-sm text-gray-500">{method.accountNumber}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="text-sm text-gray-900">
            {method.feeType === "fixed"
             ? `Rp ${method.fee.toLocaleString("id-ID")}`
             : `${method.fee}%`}
           </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <button
            onClick={() => handleToggleStatus(method.id!, method.isActive)}
            className="flex items-center">
            {method.isActive ? (
             <FiToggleRight className="h-6 w-6 text-green-500" />
            ) : (
             <FiToggleLeft className="h-6 w-6 text-gray-400" />
            )}
            <span className="ml-2 text-sm">
             {method.isActive ? "Aktif" : "Nonaktif"}
            </span>
           </button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
           <button
            onClick={() => handleEdit(method)}
            className="text-blue-600 hover:text-blue-900 mr-4">
            <FiEdit className="inline" />
           </button>
           <button
            onClick={() => handleDeleteClick(method.id!, method.name)}
            className="text-red-600 hover:text-red-900">
            <FiTrash2 className="inline" />
           </button>
          </td>
         </motion.tr>
        ))}
       </tbody>
      </table>
     </div>
    </div>
   )}

   <AddPaymentMethodModal
    isOpen={isAddModalOpen}
    onClose={() => setIsAddModalOpen(false)}
    onSubmit={handleAddMethod}
    windowHeight={windowHeight}
   />

   {currentMethod && (
    <EditPaymentMethodModal
     isOpen={isEditModalOpen}
     onClose={() => {
      setIsEditModalOpen(false);
      setCurrentMethod(null);
     }}
     onSubmit={handleEditMethod}
     initialData={currentMethod}
     windowHeight={windowHeight}
    />
   )}

   <DeletePaymentMethodModal
    isOpen={deleteModal.isOpen}
    onClose={() => setDeleteModal({...deleteModal, isOpen: false})}
    onConfirm={confirmDelete}
    methodName={deleteModal.methodName}
   />
  </div>
 );
};

export default PaymentMethodLayout ;
