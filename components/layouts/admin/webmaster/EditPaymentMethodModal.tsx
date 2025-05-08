"use client";
import {AnimatePresence, motion} from "framer-motion";
import {FiX} from "react-icons/fi";
import {PaymentMethod} from "@/lib/hooks/usePaymentMethod";
import {useEffect, useState} from "react";

interface EditPaymentMethodModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSubmit: (formData: Omit<PaymentMethod, "id">) => void;
 initialData: PaymentMethod;
 windowHeight: number;
}

const EditPaymentMethodModal = ({
 isOpen,
 onClose,
 onSubmit,
 initialData,
 windowHeight,
}: EditPaymentMethodModalProps) => {
 const [formData, setFormData] = useState<Omit<PaymentMethod, "id">>({
  name: initialData.name,
  description: initialData.description,
  type: initialData.type,
  accountName: initialData.accountName,
  accountNumber: initialData.accountNumber,
  logoUrl: initialData.logoUrl,
  isActive: initialData.isActive,
  fee: initialData.fee,
  feeType: initialData.feeType,
  instructions: initialData.instructions || "",
 });

 useEffect(() => {
  setFormData({
   name: initialData.name,
   description: initialData.description,
   type: initialData.type,
   accountName: initialData.accountName,
   accountNumber: initialData.accountNumber,
   logoUrl: initialData.logoUrl,
   isActive: initialData.isActive,
   fee: initialData.fee,
   feeType: initialData.feeType,
   instructions: initialData.instructions || "",
  });
 }, [initialData]);

 const handleInputChange = (
  e: React.ChangeEvent<
   HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
 ) => {
  const {name, value} = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: value,
  }));
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit(formData);
 };

 return (
  <AnimatePresence>
   {isOpen && (
    <motion.div
     initial={{opacity: 0}}
     animate={{opacity: 1}}
     exit={{opacity: 0}}
     className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
     onClick={onClose}>
     <motion.div
      initial={{scale: 0.9, y: 20}}
      animate={{scale: 1, y: 0}}
      exit={{scale: 0.9, y: 20}}
      className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col"
      style={{maxHeight: `${windowHeight - 40}px`}}
      onClick={(e) => e.stopPropagation()}>
      <div className="flex-shrink-0 flex justify-between items-center border-b px-6 py-4">
       <h3 className="text-lg font-medium text-gray-900">
        Edit Metode Pembayaran
       </h3>
       <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-500">
        <FiX className="h-6 w-6" />
       </button>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar p-6">
       <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <label
           htmlFor="name"
           className="block text-sm font-medium text-gray-700 mb-1">
           Nama Metode
          </label>
          <input
           type="text"
           id="name"
           name="name"
           value={formData.name}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
           required
          />
         </div>
         <div>
          <label
           htmlFor="type"
           className="block text-sm font-medium text-gray-700 mb-1">
           Jenis Metode
          </label>
          <select
           id="type"
           name="type"
           value={formData.type}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
           required>
           <option value="bank">Bank Transfer</option>
           <option value="e-wallet">E-Wallet</option>
           <option value="qris">QRIS</option>
           <option value="other">Lainnya</option>
          </select>
         </div>
         <div>
          <label
           htmlFor="accountName"
           className="block text-sm font-medium text-gray-700 mb-1">
           Nama Pemilik Rekening
          </label>
          <input
           type="text"
           id="accountName"
           name="accountName"
           value={formData.accountName}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
           required
          />
         </div>
         <div>
          <label
           htmlFor="accountNumber"
           className="block text-sm font-medium text-gray-700 mb-1">
           Nomor Rekening/ID
          </label>
          <input
           type="text"
           id="accountNumber"
           name="accountNumber"
           value={formData.accountNumber}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
           required
          />
         </div>
         <div>
          <label
           htmlFor="logoUrl"
           className="block text-sm font-medium text-gray-700 mb-1">
           URL Logo (Opsional)
          </label>
          <input
           type="url"
           id="logoUrl"
           name="logoUrl"
           value={formData.logoUrl}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
           placeholder="https://example.com/logo.png"
          />
         </div>
         <div>
          <label
           htmlFor="feeType"
           className="block text-sm font-medium text-gray-700 mb-1">
           Jenis Biaya
          </label>
          <select
           id="feeType"
           name="feeType"
           value={formData.feeType}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
           <option value="fixed">Flat</option>
           <option value="percentage">Persentase</option>
          </select>
         </div>
         <div>
          <label
           htmlFor="fee"
           className="block text-sm font-medium text-gray-700 mb-1">
           Biaya
          </label>
          <input
           type="number"
           id="fee"
           name="fee"
           value={formData.fee}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
           required
           min="0"
           step={formData.feeType === "percentage" ? "0.1" : "1"}
          />
         </div>
         <div className="md:col-span-2">
          <label
           htmlFor="description"
           className="block text-sm font-medium text-gray-700 mb-1">
           Deskripsi
          </label>
          <input
           type="text"
           id="description"
           name="description"
           value={formData.description}
           onChange={handleInputChange}
           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
         </div>
         <div className="md:col-span-2">
          <label
           htmlFor="instructions"
           className="block text-sm font-medium text-gray-700 mb-1">
           Petunjuk Pembayaran (Opsional)
          </label>
          <textarea
           id="instructions"
           name="instructions"
           value={formData.instructions}
           onChange={handleInputChange}
           rows={3}
           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
         </div>
        </div>
        <div className="flex-shrink-0 border-t px-6 py-4">
         <div className="flex justify-end space-x-3">
          <button
           type="button"
           onClick={onClose}
           className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
           Batal
          </button>
          <button
           type="submit"
           className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
           Simpan Perubahan
          </button>
         </div>
        </div>
       </form>
      </div>
     </motion.div>
    </motion.div>
   )}
  </AnimatePresence>
 );
};

export default EditPaymentMethodModal;
