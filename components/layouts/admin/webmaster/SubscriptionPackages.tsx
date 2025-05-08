"use client";

import {useMemo, useState} from "react";
import {motion} from "framer-motion";
import {FaSearch, FaTrash, FaEdit, FaPlus} from "react-icons/fa";
import DeletePackageModal from "./DeletePackageModal";
import EditPackageModal from "./EditPackageModal";
import {
 SubscriptionPackage,
 useSubscriptionPackages,
} from "@/lib/hooks/useSubscriptionPackage";

const containerVariants = {
 hidden: {opacity: 0, y: 20},
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   staggerChildren: 0.1,
   delayChildren: 0.2,
  },
 },
};

const itemVariants = {
 hidden: {opacity: 0, y: -20},
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   type: "spring",
   stiffness: 100,
   damping: 10,
  },
 },
};

export default function SubscriptionPackagesPage() {
 const {
  packages,
  loading,
  error,
  addPackage,
  updatePackage,
  deletePackage,
  refresh,
 } = useSubscriptionPackages();

 const [searchTerm, setSearchTerm] = useState("");
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [selectedPackage, setSelectedPackage] =
  useState<SubscriptionPackage | null>(null);
 const [isProcessing, setIsProcessing] = useState(false);

 const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
   style: "currency",
   currency: "IDR",
   minimumFractionDigits: 0,
  }).format(value);
 };

 const filteredPackages = useMemo(() => {
  return packages.filter(
   (pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
 }, [packages, searchTerm]);

 const handleDeleteClick = (pkg: SubscriptionPackage | null) => {
  setSelectedPackage(pkg);
  setIsDeleteModalOpen(true);
 };

 const handleEditClick = (pkg: SubscriptionPackage | null) => {
  setSelectedPackage(pkg);
  setIsEditModalOpen(true);
 };

 const handleAddClick = () => {
  setSelectedPackage(null);
  setIsEditModalOpen(true);
 };

 const handleConfirmDelete = async () => {
  if (!selectedPackage?.id) return;

  setIsProcessing(true);
  try {
   await deletePackage(selectedPackage.id);
   await refresh();
  } catch (error) {
   console.error("Delete failed:", error);
  } finally {
   setIsProcessing(false);
   setIsDeleteModalOpen(false);
   setSelectedPackage(null);
  }
 };

 const handleSavePackage = async (packageData: SubscriptionPackage) => {
  setIsProcessing(true);
  try {
   if (packageData.id) {
    await updatePackage(packageData.id, packageData);
   } else {
    await addPackage(packageData);
   }
   await refresh();
   return {success: true};
  } catch (error) {
   console.error("Save failed:", error);
   return {success: false, error: "Failed to save package"};
  } finally {
   setIsProcessing(false);
  }
 };

 return (
  <motion.div
   className="container mx-auto px-4 py-8 text-gray-800"
   initial="hidden"
   animate="visible"
   variants={containerVariants}>
   <motion.div
    variants={itemVariants}
    className="mb-8">
    <h1 className="text-3xl font-bold flex items-center">Packages</h1>
    {error && <div className="mt-2 text-red-600">Error: {error}</div>}
   </motion.div>

   <motion.div
    variants={itemVariants}
    className="mb-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
     <div className="relative flex-grow max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
       <FaSearch className="text-gray-400" />
      </div>
      <input
       type="text"
       placeholder="Search packages by name or description..."
       className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
      />
     </div>
     <button
      onClick={handleAddClick}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      <FaPlus className="mr-2" /> Add Package
     </button>
    </div>
   </motion.div>

   <motion.div
    variants={itemVariants}
    className="overflow-hidden">
    {loading ? (
     <div className="p-6 text-center">Loading packages...</div>
    ) : filteredPackages.length === 0 ? (
     <div className="p-6 text-center">
      {searchTerm ? "No packages match your search" : "No packages found"}
     </div>
    ) : (
     <div className="overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
        <tr>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          #
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Nama Paket
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Harga
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Durasi
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Aksi
         </th>
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        {filteredPackages.map((pkg, index) => (
         <tr
          key={pkg.id}
          className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="font-medium text-gray-900">{index + 1}</div>
          </td>
          <td className="px-6 py-4">
           <div className="font-medium text-gray-900">
            {pkg.name}
            {pkg.isRecommended && (
             <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Rekomendasi
             </span>
            )}
           </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
           {formatCurrency(pkg.price)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
           {pkg.duration} {pkg.durationType === "monthly" ? "Bulan" : "Tahun"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
             pkg.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
            }`}>
            {pkg.isActive ? "Aktif" : "Nonaktif"}
           </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
           <button
            onClick={() => handleEditClick(pkg)}
            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
            title="Edit Paket">
            <FaEdit className="text-lg" />
           </button>
           <button
            onClick={() => handleDeleteClick(pkg)}
            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
            title="Hapus Paket">
            <FaTrash className="text-lg" />
           </button>
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>
    )}
   </motion.div>

   <DeletePackageModal
    isOpen={isDeleteModalOpen}
    onClose={() => {
     setIsDeleteModalOpen(false);
     setSelectedPackage(null);
    }}
    onConfirm={handleConfirmDelete}
    isLoading={isProcessing}
    title={`Delete ${selectedPackage?.name || "Package"}?`}
    message="Are you sure you want to delete this package? This action cannot be undone."
   />

   <EditPackageModal
    isOpen={isEditModalOpen}
    onClose={() => {
     setIsEditModalOpen(false);
     setSelectedPackage(null);
    }}
    packageData={selectedPackage}
    onSave={handleSavePackage}
    isProcessing={isProcessing}
   />
  </motion.div>
 );
}
