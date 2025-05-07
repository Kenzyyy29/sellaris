"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {doc, getDoc, updateDoc, getFirestore} from "firebase/firestore";
import {app} from "@/lib/firebase/init";
import {
 FaArrowLeft,
 FaCheck,
 FaTimes,
} from "react-icons/fa";
import Link from "next/link";

const firestore = getFirestore(app);

interface Transaction {
 id: string;
 userId: string;
 packageId: string;
 packageName: string;
 amount: number;
 status: "pending" | "completed" | "failed";
 paymentMethod: string;
 createdAt: Date;
 completedAt?: Date;
 userEmail: string;
 userName: string;
 companyData?: unknown; // Replace with proper type if possible
}

interface Package {
 id: string;
 name: string;
 price: number;
 duration: number;
 durationType: "monthly" | "yearly";
}

interface PaymentMethod {
 id: string;
 name: string;
 accountName: string;
 accountNumber: string;
 feeType: "fixed" | "percentage";
 fee: number;
}

const TransactionDetailLayout = () => {
 const {id} = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
   null
  );
 const [isLoading, setIsLoading] = useState(true);
 const [isUpdating, setIsUpdating] = useState(false);

useEffect(() => {
 const fetchData = async () => {
  try {
   setIsLoading(true);

   // Get transaction
   const transactionDoc = await getDoc(
    doc(firestore, "subscription_transactions", id as string)
   );

   if (transactionDoc.exists()) {
    const transactionData = transactionDoc.data();
    // Ensure all required fields are present
    const completeTransaction: Transaction = {
     id: transactionDoc.id,
     userId: transactionData.userId || "",
     packageId: transactionData.packageId || "",
     packageName: transactionData.packageName || "",
     amount: transactionData.amount || 0,
     status: transactionData.status || "pending",
     paymentMethod: transactionData.paymentMethod || "",
     userEmail: transactionData.userEmail || "",
     userName: transactionData.userName || "",
     companyData: transactionData.companyData || null,
     createdAt: transactionData.createdAt?.toDate() || new Date(),
     completedAt: transactionData.completedAt?.toDate(),
    };
    setTransaction(completeTransaction);

    // Get package
    if (transactionData.packageId) {
     const packageDoc = await getDoc(
      doc(firestore, "subscription_packages", transactionData.packageId)
     );
     if (packageDoc.exists()) {
      const packageData = packageDoc.data();
      setPackageData({
       id: packageDoc.id,
       name: packageData.name || "",
       price: packageData.price || 0,
       duration: packageData.duration || 1,
       durationType: packageData.durationType || "monthly",
       // Add other package properties
      });
     }
    }

    // Get payment method
    if (transactionData.paymentMethod) {
     const methodDoc = await getDoc(
      doc(firestore, "payment_methods", transactionData.paymentMethod)
     );
     if (methodDoc.exists()) {
      const methodData = methodDoc.data();
      setPaymentMethod({
       id: methodDoc.id,
       name: methodData.name || "",
       accountName: methodData.accountName || "",
       accountNumber: methodData.accountNumber || "",
       feeType: methodData.feeType || "fixed",
       fee: methodData.fee || 0,
      });
     }
    }
   }
  } catch (error) {
   console.error("Error fetching data:", error);
  } finally {
   setIsLoading(false);
  }
 };

 fetchData();
}, [id]);

 const formatDate = (date?: Date) => {
    if (!date) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

 const handleUpdateStatus = async (status: "completed" | "failed") => {
    if (!transaction) return;
    
    try {
      setIsUpdating(true);
      await updateDoc(doc(firestore, "subscription_transactions", id as string), {
        status,
        completedAt: new Date(),
      });
      
      setTransaction({
        ...transaction,
        status,
        completedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

 if (isLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
   </div>
  );
 }

 if (!transaction) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-center p-6 max-w-md bg-red-50 rounded-lg">
     <h2 className="text-xl font-bold text-red-600 mb-2">
      Transaksi Tidak Ditemukan
     </h2>
     <p className="text-red-500 mb-4">
      Transaksi yang Anda cari tidak dapat ditemukan.
     </p>
     <Link
      href="/admin/webmaster/subscription/transactions"
      className="text-blue-600 hover:underline flex items-center justify-center">
      <FaArrowLeft className="mr-2" /> Kembali ke daftar transaksi
     </Link>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
   <div className="max-w-4xl mx-auto">
    <Link
     href="/admin/webmaster/subscription/transactions"
     className="flex items-center text-blue-600 mb-6">
     <FaArrowLeft className="mr-2" /> Kembali ke Daftar Transaksi
    </Link>

    <div className="bg-white shadow rounded-lg overflow-hidden">
     <div
      className={`px-6 py-4 ${
       transaction.status === "completed"
        ? "bg-green-100 border-b border-green-200"
        : transaction.status === "failed"
        ? "bg-red-100 border-b border-red-200"
        : "bg-yellow-100 border-b border-yellow-200"
      }`}>
      <div className="flex items-center justify-between">
       <h1 className="text-2xl font-bold text-gray-800">
        Detail Transaksi #{transaction.id}
       </h1>
       <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
         transaction.status === "completed"
          ? "bg-green-200 text-green-800"
          : transaction.status === "failed"
          ? "bg-red-200 text-red-800"
          : "bg-yellow-200 text-yellow-800"
        }`}>
        {transaction.status === "completed"
         ? "SELESAI"
         : transaction.status === "failed"
         ? "GAGAL"
         : "MENUNGGU"}
       </span>
      </div>
     </div>

     <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
         Informasi Transaksi
        </h2>
        <div className="space-y-3">
         <div className="flex justify-between">
          <span className="text-gray-600">Tanggal:</span>
          <span>{formatDate(transaction.createdAt)}</span>
         </div>
         <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span
           className={`font-medium ${
            transaction.status === "completed"
             ? "text-green-600"
             : transaction.status === "failed"
             ? "text-red-600"
             : "text-yellow-600"
           }`}>
           {transaction.status.toUpperCase()}
          </span>
         </div>
         {transaction.completedAt && (
          <div className="flex justify-between">
           <span className="text-gray-600">Tanggal Selesai:</span>
           <span>{formatDate(transaction.completedAt)}</span>
          </div>
         )}
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
         Informasi Paket
        </h2>
        {packageData ? (
         <div className="space-y-3">
          <div className="flex justify-between">
           <span className="text-gray-600">Nama Paket:</span>
           <span className="font-medium">{packageData.name}</span>
          </div>
          <div className="flex justify-between">
           <span className="text-gray-600">Harga:</span>
           <span>{formatPrice(packageData.price)}</span>
          </div>
          <div className="flex justify-between">
           <span className="text-gray-600">Durasi:</span>
           <span>
            {packageData.duration}{" "}
            {packageData.durationType === "monthly" ? "Bulan" : "Tahun"}
           </span>
          </div>
         </div>
        ) : (
         <p className="text-gray-500">Paket tidak ditemukan</p>
        )}
       </div>

       <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
         Informasi Pembayaran
        </h2>
        {paymentMethod ? (
         <div className="space-y-3">
          <div className="flex justify-between">
           <span className="text-gray-600">Metode:</span>
           <span className="font-medium">{paymentMethod.name}</span>
          </div>
          <div className="flex justify-between">
           <span className="text-gray-600">Nama Akun:</span>
           <span>{paymentMethod.accountName}</span>
          </div>
          <div className="flex justify-between">
           <span className="text-gray-600">Nomor Rekening:</span>
           <span>{paymentMethod.accountNumber}</span>
          </div>
          <div className="flex justify-between">
           <span className="text-gray-600">Biaya:</span>
           <span>
            {paymentMethod.feeType === "fixed"
             ? formatPrice(paymentMethod.fee)
             : `${paymentMethod.fee}%`}
           </span>
          </div>
          <div className="flex justify-between">
           <span className="text-gray-600">Total Dibayar:</span>
           <span className="font-medium">
            {formatPrice(transaction.amount)}
           </span>
          </div>
         </div>
        ) : (
         <p className="text-gray-500">Metode pembayaran tidak ditemukan</p>
        )}

        <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
         Informasi Pelanggan
        </h2>
        <div className="space-y-3">
         <div className="flex justify-between">
          <span className="text-gray-600">Nama:</span>
          <span>{transaction.userName || "-"}</span>
         </div>
         <div className="flex justify-between">
          <span className="text-gray-600">Email:</span>
          <span>{transaction.userEmail || "-"}</span>
         </div>
        </div>
       </div>
      </div>

      {transaction.status === "pending" && (
       <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
         Konfirmasi Transaksi
        </h2>
        <div className="flex space-x-4">
         <button
          onClick={() => handleUpdateStatus("completed")}
          disabled={isUpdating}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
          <FaCheck className="mr-2" />
          {isUpdating ? "Memproses..." : "Konfirmasi Pembayaran"}
         </button>
         <button
          onClick={() => handleUpdateStatus("failed")}
          disabled={isUpdating}
          className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
          <FaTimes className="mr-2" />
          {isUpdating ? "Memproses..." : "Tolak Pembayaran"}
         </button>
        </div>
       </div>
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default TransactionDetailLayout;
