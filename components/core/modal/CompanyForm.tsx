"use client";
import {motion} from "framer-motion";
import {useState} from "react";
import {
 FiBriefcase,
 FiMapPin,
 FiFileText,
 FiPhone,
 FiMail,
 FiArrowRight,
} from "react-icons/fi";

interface CompanyData {
 companyName: string;
 companyAddress: string;
 companyNPWP: string;
 companyPhone: string;
 companyEmail: string;
}

interface CompanyFormProps {
 onSubmit: (data: CompanyData) => void;
 initialData?: CompanyData;
}

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

const CompanyForm = ({onSubmit, initialData}: CompanyFormProps) => {
 const [formData, setFormData] = useState<CompanyData>(
  initialData || {
   companyName: "",
   companyAddress: "",
   companyNPWP: "",
   companyPhone: "",
   companyEmail: "",
  }
 );

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit(formData);
 };

 return (
  <div className="w-full max-w-md overflow-hidden">
   <div className="p-8">
    <motion.form
     onSubmit={handleSubmit}
     className="space-y-6"
     variants={containerVariants}
     initial="hidden"
     animate="visible">
     <motion.h2
      className="text-2xl font-bold text-center text-gray-800 mb-8"
      variants={itemVariants}>
      Data Perusahaan
     </motion.h2>

     <motion.div variants={itemVariants}>
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiBriefcase className="text-gray-400 text-lg" />
       </div>
       <motion.input
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        required
        placeholder="Nama Perusahaan"
        className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        whileFocus="focus"
        variants={inputFocusVariants}
       />
      </div>
     </motion.div>

     <motion.div variants={itemVariants}>
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiMapPin className="text-gray-400 text-lg" />
       </div>
       <motion.input
        name="companyAddress"
        value={formData.companyAddress}
        onChange={handleChange}
        required
        placeholder="Alamat Perusahaan"
        className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        whileFocus="focus"
        variants={inputFocusVariants}
       />
      </div>
     </motion.div>

     <motion.div variants={itemVariants}>
      <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiFileText className="text-gray-400 text-lg" />
       </div>
       <motion.input
        name="companyNPWP"
        value={formData.companyNPWP}
        onChange={handleChange}
        required
        placeholder="NPWP Perusahaan"
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
        name="companyPhone"
        value={formData.companyPhone}
        onChange={handleChange}
        required
        placeholder="Telepon Perusahaan"
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
        name="companyEmail"
        type="email"
        value={formData.companyEmail}
        onChange={handleChange}
        required
        placeholder="Email Perusahaan"
        className="pl-12 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        whileFocus="focus"
        variants={inputFocusVariants}
       />
      </div>
     </motion.div>

     <motion.div variants={itemVariants}>
      <motion.button
       type="submit"
       className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
       variants={buttonHoverVariants}
       whileHover="hover"
       whileTap="tap">
       <span>Lanjutkan</span>
       <motion.span
        animate={{x: [0, 5, 0]}}
        transition={{repeat: Infinity, duration: 1.5}}>
        <FiArrowRight className="text-lg" />
       </motion.span>
      </motion.button>
     </motion.div>
    </motion.form>
   </div>
  </div>
 );
};

export default CompanyForm;
