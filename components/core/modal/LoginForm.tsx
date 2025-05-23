"use client";
import {motion} from "framer-motion";
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FiMail, FiLock, FiArrowRight, FiLoader} from "react-icons/fi";
import {BsShieldLock} from "react-icons/bs";

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
  scale: 1.02,
  boxShadow: "0px 0px 10px rgba(59, 130, 246, 0.3)",
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

export default function LoginForm({
 searchParams,
}: {
 searchParams?: {callbackUrl: string};
}) {
 const {push} = useRouter();
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 const callbackUrl = searchParams?.callbackUrl || "/dashboard";

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const formData = new FormData(e.currentTarget as HTMLFormElement);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
   const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
    callbackUrl,
   });

   if (!res?.error) {
    push(callbackUrl);
   } else {
    setError("Email atau Password tidak valid");
   }
  } catch (err) {
   setError("Terjadi kesalahan tak terduga");
   console.error(err);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="max-w-md w-full overflow-hidden pt-20">
   <div className="p-8">
    {error && (
     <motion.div
      className="text-red-500 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center gap-2 mb-6"
      initial={{opacity: 0, y: -10}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0}}>
      <BsShieldLock className="text-lg" />
      {error}
     </motion.div>
    )}

    <motion.form
     onSubmit={handleLogin}
     className="space-y-6"
     variants={containerVariants}>
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
      className="text-right"
      variants={itemVariants}>
      <Link
       href="/forgot-password"
       className="text-sm text-blue-600 hover:text-blue-500 font-medium">
       Lupa password?
      </Link>
     </motion.div>

     <motion.div variants={itemVariants}>
      <motion.button
       type="submit"
       disabled={isLoading}
       className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isLoading ? "opacity-75 cursor-not-allowed" : ""
       }`}
       variants={buttonHoverVariants}
       whileHover={!isLoading ? "hover" : {}}
       whileTap={!isLoading ? "tap" : {}}>
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
         <span>Masuk Sekarang</span>
         <motion.span
          className="ml-1"
          animate={{x: [0, 3, 0]}}
          transition={{repeat: Infinity, duration: 2}}>
          <FiArrowRight />
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
      Belum punya akun?{" "}
      <Link
       href="/auth/register"
       className="font-semibold text-blue-600 hover:text-blue-500 inline-flex items-center group">
       <span className="group-hover:underline">Daftar</span>
      </Link>
     </p>
    </motion.div>
   </div>
  </div>
 );
}
