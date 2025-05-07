"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {app} from "@/lib/firebase/init";
import {FaCheckCircle, FaCopy, FaArrowLeft, FaCreditCard} from "react-icons/fa";
import Link from "next/link";
import {motion} from "framer-motion";

interface Transaction {
 id: string;
 packageId: string;
 packageName: string;
 amount: number;
 status: string;
 paymentMethod: string;
 createdAt: Date;
 userEmail: string;
 userName: string;
}

interface PaymentMethod {
 id: string;
 name: string;
 description: string;
 accountName: string;
 accountNumber: string;
 feeType: "fixed" | "percentage";
 fee: number;
 instructions?: string;
}

const firestore = getFirestore(app);

const PaymentInstructionLayout = () => {
 const searchParams = useSearchParams();
 const transactionId = searchParams.get("transactionId");
 const [transaction, setTransaction] = useState<Transaction | null>(null);
 const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const [_isCopied, setCopied] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
   if (!transactionId) return;

   try {
    setIsLoading(true);

    // Get transaction
    const transactionDoc = await getDoc(
     doc(firestore, "subscription_transactions", transactionId)
    );
    if (transactionDoc.exists()) {
     const transactionData = transactionDoc.data();
     const transaction = {
      id: transactionDoc.id,
      ...transactionData,
      createdAt: transactionData.createdAt?.toDate(),
     } as Transaction;
     setTransaction(transaction);

     // Get payment method
     const methodDoc = await getDoc(
      doc(firestore, "payment_methods", transactionData.paymentMethod)
     );
     if (methodDoc.exists()) {
      setPaymentMethod({
       id: methodDoc.id,
       ...methodDoc.data(),
      } as PaymentMethod);
     }
    }
   } catch (error) {
    console.error("Error fetching data:", error);
   } finally {
    setIsLoading(false);
   }
  };

  fetchData();
 }, [transactionId]);

 const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
   style: "currency",
   currency: "IDR",
   minimumFractionDigits: 0,
  }).format(price);
 };

 const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
 };

 if (isLoading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
   </div>
  );
 }

 if (!transaction || !paymentMethod) {
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
      href="/pricing"
      className="text-blue-600 hover:underline flex items-center justify-center">
      <FaArrowLeft className="mr-2" /> Kembali ke halaman pricing
     </Link>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-3xl mx-auto">
    <Link
     href="/pricing"
     className="flex items-center text-blue-600 mb-6">
     <FaArrowLeft className="mr-2" /> Kembali ke paket lainnya
    </Link>

    <motion.div
     initial={{opacity: 0, y: 20}}
     animate={{opacity: 1, y: 0}}
     className="bg-white rounded-xl shadow-md overflow-hidden">
     <div className="p-6 bg-green-50 border-b border-green-200">
      <div className="flex items-center">
       <FaCheckCircle className="text-green-500 text-2xl mr-3" />
       <h1 className="text-2xl font-bold text-green-800">
        Instruksi Pembayaran
       </h1>
      </div>
      <p className="mt-2 text-green-600">
       Silakan selesaikan pembayaran Anda untuk mengaktifkan langganan
      </p>
     </div>

     <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
         Detail Transaksi
        </h2>
        <div className="space-y-2">
         <p>
          <span className="font-medium">ID Transaksi:</span> {transaction.id}
         </p>
         <p>
          <span className="font-medium">Paket:</span> {transaction.packageName}
         </p>
         <p>
          <span className="font-medium">Total Pembayaran:</span>{" "}
          {formatPrice(transaction.amount)}
         </p>
         <p>
          <span className="font-medium">Status:</span>{" "}
          <span className="text-yellow-600 font-medium">
           Menunggu Pembayaran
          </span>
         </p>
        </div>
       </div>

       <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
         Metode Pembayaran
        </h2>
        <div className="flex items-start mb-4">
         <div className="bg-gray-100 p-3 rounded-lg mr-4">
          <FaCreditCard className="text-gray-600 text-xl" />
         </div>
         <div>
          <h3 className="font-medium text-gray-800">{paymentMethod.name}</h3>
          <p className="text-sm text-gray-600">{paymentMethod.description}</p>
         </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
         <h3 className="font-medium text-blue-800 mb-2">Informasi Rekening</h3>
         <div className="space-y-2">
          <div className="flex justify-between">
           <span className="text-gray-600">Nama Akun:</span>
           <span className="font-medium">{paymentMethod.accountName}</span>
          </div>
          <div className="flex justify-between">
           <span className="text-gray-600">Nomor Rekening:</span>
           <div className="flex items-center">
            <span className="font-medium mr-2">
             {paymentMethod.accountNumber}
            </span>
            <button
             onClick={() => handleCopy(paymentMethod.accountNumber)}
             className="text-blue-600 hover:text-blue-800"
             title="Salin">
             <FaCopy />
            </button>
           </div>
          </div>
          {paymentMethod.instructions && (
           <div className="mt-3 pt-3 border-t border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-1">
             Instruksi Tambahan:
            </h4>
            <p className="text-sm text-gray-600">
             {paymentMethod.instructions}
            </p>
           </div>
          )}
         </div>
        </div>
       </div>
      </div>

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
       <h3 className="font-medium text-yellow-800 mb-2">Penting!</h3>
       <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
        <li>Harap lakukan pembayaran dalam waktu 24 jam</li>
        <li>Setelah pembayaran, admin akan memverifikasi secara manual</li>
        <li>
         Anda akan menerima notifikasi email ketika pembayaran telah
         dikonfirmasi
        </li>
        <li>Simpan ID Transaksi Anda untuk referensi</li>
       </ul>
      </div>

      <div className="mt-6">
       <Link
        href="/dashboard"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Ke Dashboard Saya
       </Link>
      </div>
     </div>
    </motion.div>
   </div>
  </div>
 );
};

export default PaymentInstructionLayout;
