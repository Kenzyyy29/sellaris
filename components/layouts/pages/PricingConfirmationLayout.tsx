"use client";

import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {usePricingConfirmation} from "@/lib/hooks/usePricingConfirmation";
import {
 FaCheck,
 FaArrowLeft,
 FaCreditCard,
 FaCircle,
} from "react-icons/fa";
import Link from "next/link";
import {motion} from "framer-motion";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {app} from "@/lib/firebase/init";
import {useSession} from "next-auth/react";
import RegisterForm from "@/components/core/modal/RegisterForm";
import CompanyForm from "@/components/core/modal/CompanyForm";

interface CompanyFormData {
 companyName: string;
 companyAddress: string;
 companyNPWP: string;
 companyPhone: string;
 companyEmail: string;
}

const firestore = getFirestore(app);

const PricingConfirmationLayout = () => {
  const {data: session, status: sessionStatus} = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");
  const {selectedPackage, paymentMethods, loading, error} =
   usePricingConfirmation(packageId || "");

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"payment" | "register" | "company">(
   "payment"
  );
  const [companyData, setCompanyData] = useState<CompanyFormData | null>(null);

  useEffect(() => {
   if (sessionStatus === "unauthenticated") {
    setStep("register");
   } else if (
    sessionStatus === "authenticated" &&
    !session?.user?.companyData
   ) {
    setStep("company");
   } else {
    setStep("payment");
   }
  }, [session, sessionStatus]);

  const formatPrice = (price: number) => {
   return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
   }).format(price);
  };

  const handlePaymentSelection = (methodId: string) => {
   setSelectedMethod(methodId);
  };

  const handleRegisterComplete = () => {
   setStep("company");
  };

  const handleCompanySubmit = async (data: CompanyFormData) => {
   try {
    const response = await fetch("/api/user/update-company", {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({
      userId: session?.user?.id,
      companyData: data,
     }),
    });

    if (!response.ok) throw new Error("Failed to save company data");

    setCompanyData(data);
    setStep("payment");
   } catch (err) {
    console.error("Error saving company data:", err);
   }
  };

  const handleSubmit = async () => {
   if (!selectedMethod || !selectedPackage) return;

   setIsSubmitting(true);
   try {
    const transactionData = {
     userId: session?.user?.id || "guest",
     packageId: selectedPackage.id,
     packageName: selectedPackage.name,
     amount: selectedPackage.price,
     status: "pending",
     paymentMethod: selectedMethod,
     createdAt: new Date(),
     userEmail: session?.user?.email || "guest@example.com",
     userName: session?.user?.name || "Guest User",
     companyData: companyData || session?.user?.companyData || null,
    };

    const transactionRef = await addDoc(
     collection(firestore, "subscription_transactions"),
     transactionData
    );

    router.push(
     `/pricing/confirmation/payment-instruction?transactionId=${transactionRef.id}`
    );
   } catch (err) {
    console.error("Error creating transaction:", err);
   } finally {
    setIsSubmitting(false);
   }
  };

  if (loading || sessionStatus === "loading") {
   return (
    <div className="min-h-screen flex items-center justify-center">
     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
   );
  }

  if (error) {
   return (
    <div className="min-h-screen flex items-center justify-center">
     <div className="text-center p-6 max-w-md bg-red-50 rounded-lg">
      <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
      <p className="text-red-500 mb-4">{error}</p>
      <Link
       href="/pricing"
       className="text-blue-600 hover:underline">
       Kembali ke halaman pricing
      </Link>
     </div>
    </div>
   );
  }

  if (!selectedPackage) {
   return (
    <div className="min-h-screen flex items-center justify-center">
     <div className="text-center p-6 max-w-md bg-yellow-50 rounded-lg">
      <h2 className="text-xl font-bold text-yellow-600 mb-2">
       Paket tidak ditemukan
      </h2>
      <p className="text-yellow-700 mb-4">
       Paket yang Anda cari tidak tersedia.
      </p>
      <Link
       href="/pricing"
       className="text-blue-600 hover:underline">
       Kembali ke halaman pricing
      </Link>
     </div>
    </div>
   );
  }

  if (step === "register") {
   return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
     <RegisterForm onRegisterComplete={handleRegisterComplete} />
    </div>
   );
  }

  if (step === "company") {
   return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
     <CompanyForm onSubmit={handleCompanySubmit} />
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
     <div className="p-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
       {session ? "Konfirmasi Langganan" : "Lengkapi Data Untuk Melanjutkan"}
      </h1>
      <p className="text-gray-600">
       {session
        ? "Review pesanan Anda sebelum melanjutkan pembayaran"
        : "Silakan lengkapi data diri dan perusahaan untuk melanjutkan"}
      </p>
     </div>

     <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
       Paket yang dipilih:
      </h2>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
       <div className="flex justify-between items-start">
        <div>
         <h3 className="font-bold text-lg text-blue-800">
          {selectedPackage.name}
         </h3>
         <p className="text-blue-600">{selectedPackage.description}</p>
        </div>
        <div className="text-right">
         <p className="font-bold text-blue-800 text-xl">
          {formatPrice(selectedPackage.price)}
         </p>
         <p className="text-sm text-blue-600">
          /{selectedPackage.durationType === "monthly" ? "bulan" : "tahun"}
         </p>
        </div>
       </div>
       <ul className="mt-4 space-y-2">
        {selectedPackage.features.map((feature, index) => (
         <li
          key={index}
          className="flex items-start">
          <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" />
          <span className="ml-2 text-gray-700">{feature}</span>
         </li>
        ))}
       </ul>
      </div>

      {/* Payment Methods */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
       Metode Pembayaran:
      </h2>
      <div className="space-y-4">
       {paymentMethods.map((method) => (
        <motion.div
         key={method.id}
         whileHover={{scale: 1.01}}
         onClick={() => handlePaymentSelection(method.id)}
         className={`border rounded-lg p-4 cursor-pointer transition-all ${
          selectedMethod === method.id
           ? "border-blue-500 bg-blue-50"
           : "border-gray-200 hover:border-blue-300"
         }`}>
         <div className="flex items-center">
          <div className="mr-4">
           {selectedMethod === method.id ? (
            <FaCheck className="text-blue-600 text-xl" />
           ) : (
            <FaCircle className="text-gray-300 text-xl" />
           )}
          </div>
          <div className="bg-gray-100 p-2 rounded-lg mr-4">
           <FaCreditCard className="text-gray-600 text-xl" />
          </div>
          <div className="flex-grow">
           <h3 className="font-medium text-gray-800">{method.name}</h3>
           <p className="text-sm text-gray-500">{method.description}</p>
          </div>
          <div className="text-right">
           <p className="text-sm text-gray-500">
            Biaya:{" "}
            {method.feeType === "fixed"
             ? formatPrice(method.fee)
             : `${method.fee}%`}
           </p>
          </div>
         </div>
        </motion.div>
       ))}
      </div>

      {/* Continue Button */}
      <div className="mt-8">
       <motion.button
        whileHover={{scale: selectedMethod ? 1.02 : 1}}
        whileTap={{scale: selectedMethod ? 0.98 : 1}}
        onClick={handleSubmit}
        disabled={!selectedMethod || isSubmitting}
        className={`w-full py-3 px-6 rounded-lg font-semibold shadow-md transition-colors ${
         selectedMethod
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}>
        {isSubmitting ? "Memproses..." : "Lanjutkan Pembayaran"}
       </motion.button>
      </div>
     </div>
    </motion.div>
   </div>
  </div>
 );
};

export default PricingConfirmationLayout;
