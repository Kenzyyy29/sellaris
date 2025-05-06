"use client";

import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
 FiPlus,
 FiEdit,
 FiTrash2,
 FiX,
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

const PaymentMethodLayout = () => {
 const {
  methods,
  loading,
  addMethod,
  updateMethod,
  toggleMethodStatus,
  deleteMethod,
 } = usePaymentMethods();

 const [isModalOpen, setIsModalOpen] = useState(false);
 const [currentMethod, setCurrentMethod] = useState<PaymentMethod | null>(null);
 const [formData, setFormData] = useState<Omit<PaymentMethod, "id">>({
  name: "",
  description: "",
  type: "bank",
  accountName: "",
  accountNumber: "",
  logoUrl: "",
  isActive: true,
  fee: 0,
  feeType: "fixed",
  instructions: "",
 });

 const [deleteModal, setDeleteModal] = useState({
  isOpen: false,
  methodId: "",
  methodName: "",
 });


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
   if (currentMethod) {
    await updateMethod(currentMethod.id!, formData);
   } else {
    await addMethod(formData);
   }
   setIsModalOpen(false);
   setCurrentMethod(null);
   setFormData({
    name: "",
    description: "",
    type: "bank",
    accountName: "",
    accountNumber: "",
    logoUrl: "",
    isActive: true,
    fee: 0,
    feeType: "fixed",
    instructions: "",
   });
  } catch (error) {
   console.error("Error saving payment method:", error);
  }
 };

 const handleEdit = (method: PaymentMethod) => {
  setCurrentMethod(method);
  setFormData({
   name: method.name,
   description: method.description,
   type: method.type,
   accountName: method.accountName,
   accountNumber: method.accountNumber,
   logoUrl: method.logoUrl,
   isActive: method.isActive,
   fee: method.fee,
   feeType: method.feeType,
   instructions: method.instructions || "",
  });
  setIsModalOpen(true);
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

 return (
  <div className="container mx-auto px-4 py-8">
   <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold text-gray-800">
     Manajemen Metode Pembayaran
    </h1>
    <motion.button
     whileHover={{scale: 1.05}}
     whileTap={{scale: 0.95}}
     onClick={() => setIsModalOpen(true)}
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

   <AnimatePresence>
    {isModalOpen && (
     <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={() => setIsModalOpen(false)}>
      <motion.div
       initial={{scale: 0.9, y: 20}}
       animate={{scale: 1, y: 0}}
       exit={{scale: 0.9, y: 20}}
       className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
       onClick={(e) => e.stopPropagation()}>
       <div className="flex justify-between items-center border-b px-6 py-4">
        <h3 className="text-lg font-medium text-gray-900">
         {currentMethod ? "Edit" : "Tambah"} Metode Pembayaran
        </h3>
        <button
         onClick={() => {
          setIsModalOpen(false);
          setCurrentMethod(null);
         }}
         className="text-gray-400 hover:text-gray-500">
         <FiX className="h-6 w-6" />
        </button>
       </div>
       <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Form fields tetap sama seperti sebelumnya */}
        </div>
        <div className="flex justify-end space-x-3 pt-4">
         <button
          type="button"
          onClick={() => {
           setIsModalOpen(false);
           setCurrentMethod(null);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Batal
         </button>
         <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {currentMethod ? "Simpan Perubahan" : "Tambah Metode"}
         </button>
        </div>
       </form>
      </motion.div>
     </motion.div>
    )}
   </AnimatePresence>

   <DeletePaymentMethodModal
    isOpen={deleteModal.isOpen}
    onClose={() => setDeleteModal({...deleteModal, isOpen: false})}
    onConfirm={confirmDelete}
    methodName={deleteModal.methodName}
   />
  </div>
 );
};

export default PaymentMethodLayout;
