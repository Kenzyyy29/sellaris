"use client";
import {motion} from "framer-motion";
import {useState} from "react";
import OtpVerification from "./OtpVerification";
import Link from "next/link";
import {
 FiUser,
 FiMail,
 FiPhone,
 FiLock,
 FiArrowRight,
 FiLoader,
} from "react-icons/fi";
import {BsShieldLock} from "react-icons/bs";
import { useRouter } from "next/navigation";

const itemVariants = {
 hidden: {opacity: 0, y: 20},
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

const containerVariants = {
 hidden: {opacity: 0},
 visible: {
  opacity: 1,
  transition: {
   staggerChildren: 0.1,
   delayChildren: 0.2,
  },
 },
};

const inputFocusVariants = {
 focus: {
  scale: 1.02,
  boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.4)",
  transition: {duration: 0.2},
 },
};

const buttonHoverVariants = {
 hover: {
  scale: 1.02,
  boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)",
 },
 tap: {
  scale: 0.98,
 },
};

export default function RegisterForm() {
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [email, setEmail] = useState("");
 const [showOtp, setShowOtp] = useState(false);
 const [acceptedTerms, setAcceptedTerms] = useState(false);
 const {push} = useRouter();

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const data = {
   fullname: formData.get("fullname") as string,
   email: formData.get("email") as string,
   phone: formData.get("phone") as string,
   password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
   setError("Email and password are required");
   setIsLoading(false);
   return;
  }

  try {
   const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
   });

   const result = await res.json();

   if (!res.ok) {
    throw new Error(result.message || "Registration failed");
   }

   setEmail(data.email);
   setShowOtp(true);
  } catch (error: unknown) {
   setError(
    error instanceof Error ? error.message : "An unknown error occurred"
   );
  } finally {
   setIsLoading(false);
  }
 };

const handleOTPVerificationSuccess = () => {
 setShowOtp(false);
 push("/dashboard");
};

 if (showOtp) {
  return (
   <OtpVerification
    email={email}
    onVerificationSuccess={handleOTPVerificationSuccess}
   />
  );
 }

 return (
  <div className=" w-full max-w-md overflow-hidden pt-24">
   <div className="p-8">
    <motion.form
     onSubmit={handleSubmit}
     className="space-y-6"
     variants={containerVariants}>
     <motion.div variants={itemVariants}>
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiUser className="text-gray-400 text-lg" />
       </div>
       <motion.input
        required
        name="fullname"
        type="text"
        placeholder="Nama Lengkap"
        className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        whileFocus="focus"
        variants={inputFocusVariants}
       />
      </div>
     </motion.div>

     <motion.div variants={itemVariants}>
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiMail className="text-gray-400 text-lg" />
       </div>
       <motion.input
        required
        name="email"
        type="email"
        placeholder="Alamat Email"
        className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        whileFocus="focus"
        variants={inputFocusVariants}
       />
      </div>
     </motion.div>

     <motion.div variants={itemVariants}>
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiPhone className="text-gray-400 text-lg" />
       </div>
       <motion.input
        required
        name="phone"
        type="tel"
        placeholder="Nomor Telepon"
        className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        whileFocus="focus"
        variants={inputFocusVariants}
       />
      </div>
     </motion.div>

     <motion.div variants={itemVariants}>
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiLock className="text-gray-400 text-lg" />
       </div>
       <motion.input
        required
        name="password"
        type="password"
        placeholder="Password"
        className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        whileFocus="focus"
        variants={inputFocusVariants}
       />
      </div>
     </motion.div>

     <motion.div
      variants={itemVariants}
      className="flex items-start">
      <motion.div
       className="flex items-center h-5"
       whileTap={{scale: 0.95}}>
       <input
        id="terms"
        name="terms"
        type="checkbox"
        checked={acceptedTerms}
        onChange={(e) => setAcceptedTerms(e.target.checked)}
        className="focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300 rounded"
       />
      </motion.div>
      <div className="ml-3 text-sm">
       <label
        htmlFor="terms"
        className="font-medium text-gray-700 flex items-start">
        <span>
         Saya menyetujui{" "}
         <Link
          href="/terms"
          className="text-blue-600 hover:text-blue-500 font-semibold">
          Syarat dan Ketentuan
         </Link>{" "}
         dan{" "}
         <Link
          href="/privacy"
          className="text-blue-600 hover:text-blue-500 font-semibold">
          Kebijakan Privasi
         </Link>
        </span>
       </label>
      </div>
     </motion.div>

     {error && (
      <motion.div
       className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center gap-2"
       initial={{opacity: 0, y: -10}}
       animate={{opacity: 1, y: 0}}
       exit={{opacity: 0}}>
       <BsShieldLock className="text-lg" />
       {error}
      </motion.div>
     )}

     <motion.div variants={itemVariants}>
      <motion.button
       type="submit"
       disabled={isLoading || !acceptedTerms}
       className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isLoading || !acceptedTerms ? "opacity-75 cursor-not-allowed" : ""
       }`}
       variants={buttonHoverVariants}
       whileHover={!isLoading && acceptedTerms ? "hover" : {}}
       whileTap={!isLoading && acceptedTerms ? "tap" : {}}>
       {isLoading ? (
        <>
         <motion.span
          animate={{rotate: 360}}
          transition={{duration: 1, repeat: Infinity, ease: "linear"}}>
          <FiLoader className="text-lg" />
         </motion.span>
         Memproses...
        </>
       ) : (
        <>
         <span>Mulai Sekarang</span>
         <motion.span
          animate={{x: [0, 5, 0]}}
          transition={{repeat: Infinity, duration: 1.5}}>
          <FiArrowRight className="text-lg" />
         </motion.span>
        </>
       )}
      </motion.button>
     </motion.div>
    </motion.form>

    <motion.div
     className="mt-8 text-center"
     variants={itemVariants}>
     <p className="text-sm text-gray-600">
      Sudah punya akun?{" "}
      <Link
       href="/auth/login"
       className="font-semibold text-blue-600 hover:text-blue-500 inline-flex items-center group">
       <span className="group-hover:underline">Masuk</span>
      </Link>
     </p>
    </motion.div>
   </div>
  </div>
 );
}
