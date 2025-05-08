"use client";

import {useMemo, useState} from "react";
import {motion} from "framer-motion";
import {FaSearch, FaCheck, FaTimes, FaTrash, FaEye} from "react-icons/fa";
import {SubscriptionTransaction, useSubscriptionTransactions} from "@/lib/hooks/useSubscriptionTransaction";
import DeleteTransactionModal from "./DeleteTransactionModal";
import { useRouter } from "next/navigation";

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

const formatDate = (date?: Date) => {
 if (!date) return "-";
 return new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
 }).format(date);
};

const formatCurrency = (value: number) => {
 return new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
 }).format(value);
};

export default function SubscriptionTransactions() {
 const {
  transactions,
  loading,
  error,
  confirmTransaction,
  rejectTransaction,
  fetchTransactions,
 } = useSubscriptionTransactions();

 const [searchTerm, setSearchTerm] = useState("");
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 const [selectedTransaction, setSelectedTransaction] =
  useState<SubscriptionTransaction | null>(null);
 const [isProcessing, setIsProcessing] = useState(false);
 const [activeTab, setActiveTab] = useState<
  "all" | "pending" | "completed" | "failed"
 >("all");
 const {push} = useRouter()

 const handleViewDetail = (transactionId: string) => {
  push(`/admin/webmaster/subscription/transactions/${transactionId}`);
 };

 const filteredTransactions = useMemo(() => {
  let filtered = transactions.filter(
   (txn) =>
    txn.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (activeTab !== "all") {
   filtered = filtered.filter((txn) => txn.status === activeTab);
  }

  return filtered;
 }, [transactions, searchTerm, activeTab]);

 const handleDeleteClick = (txn: SubscriptionTransaction | null) => {
  setSelectedTransaction(txn);
  setIsDeleteModalOpen(true);
 };

 const handleConfirmTransaction = async (id: string) => {
  setIsProcessing(true);
  try {
   await confirmTransaction(id);
   await fetchTransactions();
  } catch (error) {
   console.error("Confirm failed:", error);
  } finally {
   setIsProcessing(false);
  }
 };

 const handleRejectTransaction = async (id: string) => {
  setIsProcessing(true);
  try {
   await rejectTransaction(id);
   await fetchTransactions();
  } catch (error) {
   console.error("Reject failed:", error);
  } finally {
   setIsProcessing(false);
  }
 };

 const handleRefresh = async () => {
  setIsProcessing(true);
  try {
   await fetchTransactions();
  } catch (error) {
   console.error("Refresh failed:", error);
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
    <h1 className="text-3xl font-bold flex items-center">Transactions</h1>
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
       placeholder="Search transactions..."
       className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
      />
     </div>
     <button
      onClick={handleRefresh}
      disabled={isProcessing}
      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50">
      {isProcessing ? "Refreshing..." : "Refresh"}
     </button>
    </div>
   </motion.div>

   <motion.div
    variants={itemVariants}
    className="mb-4">
    <div className="flex space-x-2">
     <button
      onClick={() => setActiveTab("all")}
      className={`px-4 py-2 rounded-lg ${
       activeTab === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}>
      All
     </button>
     <button
      onClick={() => setActiveTab("pending")}
      className={`px-4 py-2 rounded-lg ${
       activeTab === "pending" ? "bg-yellow-600 text-white" : "bg-gray-200"
      }`}>
      Pending
     </button>
     <button
      onClick={() => setActiveTab("completed")}
      className={`px-4 py-2 rounded-lg ${
       activeTab === "completed" ? "bg-green-600 text-white" : "bg-gray-200"
      }`}>
      Completed
     </button>
     <button
      onClick={() => setActiveTab("failed")}
      className={`px-4 py-2 rounded-lg ${
       activeTab === "failed" ? "bg-red-600 text-white" : "bg-gray-200"
      }`}>
      Failed
     </button>
    </div>
   </motion.div>

   <motion.div
    variants={itemVariants}
    className="overflow-hidden">
    {loading ? (
     <div className="p-6 text-center">Loading transactions...</div>
    ) : filteredTransactions.length === 0 ? (
     <div className="p-6 text-center">
      {searchTerm
       ? "No transactions match your search"
       : "No transactions found"}
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
          User
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Package
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Amount
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Date
         </th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
         </th>
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        {filteredTransactions.map((txn, index) => (
         <tr
          key={txn.id}
          className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="font-medium text-gray-900">{index + 1}</div>
          </td>
          <td className="px-6 py-4">
           <div className="text-sm text-gray-900">
            {txn.userName || txn.userEmail || txn.userId}
           </div>
           <div className="text-sm text-gray-500">{txn.userEmail}</div>
          </td>
          <td className="px-6 py-4">
           <div className="text-sm font-medium text-gray-900">
            {txn.packageName}
           </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <div className="text-sm text-gray-900">
            {formatCurrency(txn.amount)}
           </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
             txn.status === "completed"
              ? "bg-green-100 text-green-800"
              : txn.status === "failed"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
            }`}>
            {txn.status}
           </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
           <div>Created: {formatDate(txn.createdAt)}</div>
           {txn.completedAt && (
            <div>Completed: {formatDate(txn.completedAt)}</div>
           )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
           {txn.status === "pending" && (
            <>
             <button
              onClick={() => handleConfirmTransaction(txn.id!)}
              disabled={isProcessing}
              className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition-colors"
              title="Confirm">
              <FaCheck className="text-lg" />
             </button>
             <button
              onClick={() => handleRejectTransaction(txn.id!)}
              disabled={isProcessing}
              className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
              title="Reject">
              <FaTimes className="text-lg" />
             </button>
            </>
           )}
           <button
            onClick={() => handleViewDetail(txn.id!)}
            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
            title="View Detail">
            <FaEye className="text-lg" />
           </button>
           <button
            onClick={() => handleDeleteClick(txn)}
            disabled={isProcessing}
            className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 transition-colors"
            title="Delete">
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

   <DeleteTransactionModal
    isOpen={isDeleteModalOpen}
    onClose={() => {
     setIsDeleteModalOpen(false);
     setSelectedTransaction(null);
    }}
    transaction={selectedTransaction}
    onDeleteSuccess={handleRefresh}
   />
  </motion.div>
 );
}
