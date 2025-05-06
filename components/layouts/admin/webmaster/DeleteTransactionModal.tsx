"use client";

import {SubscriptionTransaction} from "@/lib/hooks/useSubscriptionTransaction";
import { useState } from "react";

interface DeleteTransactionModalProps {
 isOpen: boolean;
 onClose: () => void;
 transaction: SubscriptionTransaction | null;
 onDeleteSuccess: () => void;
}

export default function DeleteTransactionModal({
 isOpen,
 onClose,
 transaction,
 onDeleteSuccess,
}: DeleteTransactionModalProps) {
 const [isDeleting, setIsDeleting] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const handleDelete = async () => {
  if (!transaction?.id) return;

  setIsDeleting(true);
  setError(null);

  try {
   const response = await fetch("/api/webmaster/subscription/transactions", {
    method: "DELETE",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({id: transaction.id}),
   });

   const data = await response.json();

   if (!data.success) {
    throw new Error(data.message || "Failed to delete transaction");
   }

   onDeleteSuccess();
   onClose();
  } catch (err) {
   console.error("Delete error:", err);
   setError(
    err instanceof Error ? err.message : "Failed to delete transaction"
   );
  } finally {
   setIsDeleting(false);
  }
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <div className="bg-white rounded-lg p-6 max-w-md w-full">
    <h2 className="text-xl font-bold mb-4">Delete Transaction</h2>
    {error && <div className="mb-4 text-red-600">{error}</div>}
    <p className="mb-6">
     Are you sure you want to delete this transaction? This action cannot be
     undone.
    </p>
    <div className="flex justify-end space-x-4">
     <button
      onClick={onClose}
      disabled={isDeleting}
      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
      Cancel
     </button>
     <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
      {isDeleting ? "Deleting..." : "Delete"}
     </button>
    </div>
   </div>
  </div>
 );
}
