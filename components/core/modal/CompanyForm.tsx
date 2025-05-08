"use client";
import {motion} from "framer-motion";
import {useState} from "react";
import {
 FiBriefcase,
 FiMapPin,
 FiFileText,
 FiPhone,
 FiMail,
} from "react-icons/fi";

interface CompanyData {
 companyName: string;
 companyAddress: string;
 companyNPWP: string;
 companyPhone: string;
 companyEmail: string;
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

const CompanyForm = ({onSubmit}: {onSubmit: (data: CompanyData) => void}) => {
 const [formData, setFormData] = useState<CompanyData>({
  companyName: "",
  companyAddress: "",
  companyNPWP: "",
  companyPhone: "",
  companyEmail: "",
 });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit(formData);
 };

 return (
  <motion.div
   initial={{opacity: 0, y: 20}}
   animate={{opacity: 1, y: 0}}
   className="bg-white p-6 rounded-lg shadow-md">
   <h2 className="text-xl font-bold mb-6 text-gray-800">Data Perusahaan</h2>
   <form
    onSubmit={handleSubmit}
    className="space-y-4">
    <div className="relative">
     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiBriefcase className="text-gray-400" />
     </div>
     <input
      name="companyName"
      value={formData.companyName}
      onChange={handleChange}
      required
      placeholder="Nama Perusahaan"
      className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
     />
    </div>

    <div className="relative">
     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiMapPin className="text-gray-400" />
     </div>
     <input
      name="companyAddress"
      value={formData.companyAddress}
      onChange={handleChange}
      required
      placeholder="Alamat Perusahaan"
      className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
     />
    </div>

    <div className="relative">
     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiFileText className="text-gray-400" />
     </div>
     <input
      name="companyNPWP"
      value={formData.companyNPWP}
      onChange={handleChange}
      required
      placeholder="NPWP Perusahaan"
      className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
     />
    </div>

    <div className="relative">
     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiPhone className="text-gray-400" />
     </div>
     <input
      name="companyPhone"
      value={formData.companyPhone}
      onChange={handleChange}
      required
      placeholder="Telepon Perusahaan"
      className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
     />
    </div>

    <div className="relative">
     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiMail className="text-gray-400" />
     </div>
     <input
      name="companyEmail"
      type="email"
      value={formData.companyEmail}
      onChange={handleChange}
      required
      placeholder="Email Perusahaan"
      className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
     />
    </div>

    <button
     type="submit"
     className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
     Lanjut ke Pembayaran
    </button>
   </form>
  </motion.div>
 );
};

export default CompanyForm;
