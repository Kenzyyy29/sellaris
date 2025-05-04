"use client";
import {motion} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import {useState, useEffect} from "react";
import {FiLock, FiXCircle, FiLoader} from "react-icons/fi";

export default function ResetPasswordPage() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const token = searchParams.get("token");

 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
 const [tokenValid, setTokenValid] = useState<boolean | null>(null);

 // Validasi token saat komponen mount
 useEffect(() => {
  if (token) {
   validateToken();
  } else {
   setTokenValid(false);
  }
 }, [token]);

 const validateToken = async () => {
  try {
   const response = await fetch(
    `/api/auth/validate-reset-token?token=${token}`
   );
   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.message || "Invalid or expired token");
   }

   setTokenValid(true);
  } catch (err) {
   setError(err.message);
   setTokenValid(false);
  }
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (password !== confirmPassword) {
   setError("Passwords do not match");
   return;
  }

  if (password.length < 6) {
   setError("Password must be at least 6 characters");
   return;
  }

  setIsLoading(true);

  try {
   const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({token, password}),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
   }

   setSuccess(
    "Password has been reset successfully. You can now login with your new password."
   );
   setTimeout(() => {
    router.push("/auth/login");
   }, 3000);
  } catch (err) {
   setError(err.message || "Something went wrong");
  } finally {
   setIsLoading(false);
  }
 };

 if (tokenValid === null) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <FiLoader className="animate-spin text-4xl text-blue-500" />
   </div>
  );
 }

 if (!tokenValid) {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <motion.div
     className="bg-white w-full max-w-md overflow-hidden rounded-2xl shadow-xl border border-gray-100 text-center"
     initial={{opacity: 0, y: 20}}
     animate={{opacity: 1, y: 0}}
     transition={{duration: 0.3}}>
     <div className="bg-gradient-to-r from-red-600 to-red-500 p-8">
      <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-lg mx-auto">
       <FiXCircle className="text-red-600 text-3xl" />
      </div>
      <h1 className="text-2xl font-bold text-white mt-6">Invalid Token</h1>
     </div>

     <div className="p-8">
      <p className="text-gray-600 mb-6">
       {error ||
        "The password reset link is invalid or has expired. Please request a new one."}
      </p>

      <button
       onClick={() => router.push("/forgot-password")}
       className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
       Request New Reset Link
      </button>
     </div>
    </motion.div>
   </div>
  );
 }

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
      Create a new password for your account
     </p>
    </div>

    <div className="p-8">
     {error && (
      <div className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-100 mb-6">
       {error}
      </div>
     )}

     {success && (
      <div className="text-green-500 text-sm text-center p-3 bg-green-50 rounded-lg border border-green-100 mb-6">
       {success}
      </div>
     )}

     <form
      onSubmit={handleSubmit}
      className="space-y-6">
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiLock className="text-gray-400 text-lg" />
       </div>
       <input
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="New Password"
        className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
       />
      </div>

      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiLock className="text-gray-400 text-lg" />
       </div>
       <input
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm New Password"
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
        "Reset Password"
       )}
      </button>
     </form>
    </div>
   </motion.div>
  </div>
 );
}
