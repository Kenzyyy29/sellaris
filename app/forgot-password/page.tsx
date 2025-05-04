"use client";
import {motion} from "framer-motion";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FiMail, FiArrowRight, FiLoader} from "react-icons/fi";

export default function ForgotPasswordPage() {
 const router = useRouter();
 const [emailOrName, setEmailOrName] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
   const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({emailOrName}),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.message || "Failed to send reset link");
   }

   router.push("/forgot-password/thank-you");
  } catch (err) {
   setError(err.message || "Something went wrong");
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <motion.div
    className="bg-white w-full max-w-md overflow-hidden rounded-2xl shadow-xl border border-gray-100"
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.3}}>
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center">
     <h1 className="text-2xl font-bold text-white">Reset Password</h1>
     <p className="text-blue-100 mt-2">
      Masukkan email atau nama Anda untuk menerima link reset password
     </p>
    </div>

    <div className="p-8">
     {error && (
      <div className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-100 mb-6">
       {error}
      </div>
     )}

     <form
      onSubmit={handleSubmit}
      className="space-y-6">
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiMail className="text-gray-400 text-lg" />
       </div>
       <input
        required
        value={emailOrName}
        onChange={(e) => setEmailOrName(e.target.value)}
        type="text"
        placeholder="Email atau Nama"
        className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
       />
      </div>

      <button
       type="submit"
       disabled={isLoading}
       className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isLoading ? "opacity-75 cursor-not-allowed" : ""
       }`}>
       {isLoading ? (
        <>
         <FiLoader className="animate-spin text-lg" />
         Memproses...
        </>
       ) : (
        <>
         <span>Kirim Link Reset</span>
         <FiArrowRight />
        </>
       )}
      </button>
     </form>

     <div className="mt-8 text-center">
      <p className="text-sm text-gray-600">
       Ingat password Anda?{" "}
       <Link
        href="/auth/login"
        className="font-semibold text-blue-600 hover:text-blue-500">
        Masuk
       </Link>
      </p>
     </div>
    </div>
   </motion.div>
  </div>
 );
}
