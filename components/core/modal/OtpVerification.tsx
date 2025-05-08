"use client";
import {motion} from "framer-motion";
import {signIn} from "next-auth/react";
import {useState, useRef, useEffect} from "react";
import {FiArrowRight, FiLoader, FiClock} from "react-icons/fi";
import {BsShieldLock} from "react-icons/bs";

interface OtpVerificationProps {
 email: string;
 onVerificationSuccess: () => void;
}

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
 hidden: {opacity: 0, y: 10},
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

const inputFocusVariants = {
 focus: {
  scale: 1.05,
  boxShadow: "0px 0px 10px rgba(59, 130, 246, 0.3)",
 },
};

export default function OtpVerification({
 email,
 onVerificationSuccess,
}: OtpVerificationProps) {
 const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
 const [activeInput, setActiveInput] = useState(0);
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [resendDisabled, setResendDisabled] = useState(true);
 const [resendTimer, setResendTimer] = useState(30);
 const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

 useEffect(() => {
  inputRefs.current[activeInput]?.focus();
 }, [activeInput]);

 useEffect(() => {
  if (resendTimer > 0) {
   const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
   return () => clearTimeout(timer);
  } else {
   setResendDisabled(false);
  }
 }, [resendTimer]);

 const setInputRef = (el: HTMLInputElement | null, index: number) => {
  inputRefs.current[index] = el;
 };

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number
 ) => {
  const value = e.target.value;
  if (isNaN(Number(value))) return;

  const newOtp = [...otp];
  newOtp[index] = value.substring(value.length - 1);
  setOtp(newOtp);

  if (value && index < 5) {
   setActiveInput(index + 1);
  }
 };

 const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
 ) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
   setActiveInput(index - 1);
  }
 };

 const handleResendOTP = async () => {
  setResendDisabled(true);
  setResendTimer(30);
  setError("");

  try {
   const response = await fetch("/api/auth/resend-otp", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({email}),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.message || "Failed to resend OTP");
   }
  } catch (err) {
   const error = err as Error;
   setError(error.message);
  }
 };

const handleSubmit = async () => {
 setIsLoading(true);
 setError("");

 try {
  const otpCode = otp.join("");
  const response = await fetch("/api/auth/verify-otp", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({email, otp: otpCode}),
  });

  const data = await response.json();

  if (!response.ok) {
   throw new Error(data.message || "Verification failed");
  }

  // Tambahkan signIn setelah verifikasi berhasil
  const signInResult = await signIn("credentials", {
   email,
   redirect: false,
  });

  if (signInResult?.error) {
   throw new Error(signInResult.error);
  }

  onVerificationSuccess();
 } catch (err) {
  const error = err as Error;
  setError(error.message);
  setOtp(new Array(6).fill(""));
  setActiveInput(0);
 } finally {
  setIsLoading(false);
 }
};

 return (
  <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   className=" w-full max-w-md overflow-hidden">
   <motion.div
    className=" p-8 text-center"
    initial={{opacity: 0, y: -20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}>
    <motion.h1
     className="text-2xl font-bold text-blue-700 mt-6"
     initial={{opacity: 0}}
     animate={{opacity: 1}}
     transition={{delay: 0.2}}>
     Verifikasi Keamanan
    </motion.h1>
    <motion.p
     className="text-blue-400 mt-2"
     initial={{opacity: 0}}
     animate={{opacity: 1}}
     transition={{delay: 0.3}}>
     Kode OTP telah dikirim ke <span className="font-semibold">{email}</span>
    </motion.p>
   </motion.div>

   <div className="p-8 text-gray-800">
    <motion.div
     className="space-y-6"
     variants={containerVariants}
     initial="hidden"
     animate="visible">
     <motion.div
      className="flex justify-center gap-2" // Mengurangi gap dari 3 ke 2
      variants={itemVariants}>
      {otp.map((_, index) => (
       <motion.div
        key={index}
        whileTap={{scale: 0.95}}
        variants={inputFocusVariants}
        whileFocus="focus">
        <input
         ref={(el) => setInputRef(el, index)}
         type="text"
         value={otp[index]}
         onChange={(e) => handleChange(e, index)}
         onKeyDown={(e) => handleKeyDown(e, index)}
         onFocus={() => setActiveInput(index)}
         maxLength={1}
         className={`w-12 h-12 text-2xl text-center border-2 rounded-xl focus:outline-none focus:ring-2 ${
          activeInput === index
           ? "border-blue-500 ring-blue-200"
           : "border-gray-300"
         }`} // Mengurangi ukuran dari w-14 h-14 ke w-12 h-12
         inputMode="numeric"
         pattern="[0-9]*"
        />
       </motion.div>
      ))}
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
       onClick={handleSubmit}
       disabled={isLoading || otp.join("").length !== 6}
       className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isLoading || otp.join("").length !== 6
         ? "opacity-75 cursor-not-allowed"
         : "hover:bg-blue-700"
       }`}
       whileHover={!isLoading && otp.join("").length === 6 ? {scale: 1.02} : {}}
       whileTap={!isLoading && otp.join("").length === 6 ? {scale: 0.98} : {}}>
       {isLoading ? (
        <>
         <motion.span
          animate={{rotate: 360}}
          transition={{duration: 1, repeat: Infinity, ease: "linear"}}>
          <FiLoader className="text-lg" />
         </motion.span>
         Memverifikasi...
        </>
       ) : (
        <>
         <span>Verifikasi Sekarang</span>
         <FiArrowRight className="text-lg" />
        </>
       )}
      </motion.button>
     </motion.div>

     <motion.div
      className="text-center text-sm text-gray-600 flex items-center justify-center gap-1"
      variants={itemVariants}>
      <span>Tidak menerima kode?</span>
      <button
       onClick={handleResendOTP}
       disabled={resendDisabled}
       className={`flex items-center gap-1 ${
        resendDisabled ? "text-gray-400" : "text-blue-600 hover:text-blue-500"
       }`}>
       {resendDisabled ? (
        <>
         <FiClock />
         <span>Kirim ulang ({resendTimer}s)</span>
        </>
       ) : (
        <span className="font-semibold">Kirim ulang</span>
       )}
      </button>
     </motion.div>
    </motion.div>
   </div>
  </motion.div>
 );
}
