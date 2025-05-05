"use client";
import {
 FaEnvelope,
 FaPhone,
 FaMapMarkerAlt,
 FaClock,
 FaFacebook,
 FaTwitter,
 FaInstagram,
 FaLinkedin,
} from "react-icons/fa";
import {
 FadeIn,
 StaggerContainer,
 MotionDiv,
 MotionButton,
} from "@/components/AnimatedComponent";
import {motion} from "framer-motion";
import Link from "next/link";
import {FaArrowRightLong} from "react-icons/fa6";
import {useState} from "react";

interface ContactFormData {
 name: string;
 email: string;
 subject: string;
 message: string;
}
 interface FormSubmitStatus {
 success: boolean | null;
 message: string;
}

const ContactPage = () => {
 const [formData, setFormData] = useState<ContactFormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
 });
 const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
 const [submitStatus, setSubmitStatus] = useState<FormSubmitStatus>({
  success: null,
  message: "",
 });

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
  const {id, value} = e.target;
  setFormData((prev) => ({...prev, [id]: value}));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus({success: null, message: ""});

  try {
   const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });

   const data = await response.json();

   if (response.ok) {
    setSubmitStatus({
     success: true,
     message: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
    });
    // Reset form
    setFormData({
     name: "",
     email: "",
     subject: "",
     message: "",
    });
   } else {
    setSubmitStatus({
     success: false,
     message: data.error || "Gagal mengirim pesan. Silakan coba lagi.",
    });
   }
  } catch (error) {
   console.error("Error:", error);
   setSubmitStatus({
    success: false,
    message: "Terjadi kesalahan. Silakan coba lagi nanti.",
   });
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div className="flex flex-col w-full overflow-x-hidden bg-gray-50">
   {/* Hero Section */}
   <section className="relative flex items-center justify-center min-h-[50vh] bg-gradient-to-br from-blue-50 to-white overflow-hidden pt-24">
    <div className="absolute inset-0 overflow-hidden">
     <MotionDiv
      animate={{
       x: [0, 20, 0],
       y: [0, 15, 0],
       scale: [1, 1.2, 1],
       transition: {duration: 15, repeat: Infinity, ease: "linear"},
      }}
      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-100/50 blur-xl"
     />
     <MotionDiv
      animate={{
       x: [0, -30, 0],
       y: [0, -20, 0],
       scale: [1, 1.3, 1],
       transition: {duration: 20, repeat: Infinity, ease: "linear"},
      }}
      className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-teal-100/50 blur-xl"
     />
    </div>

    <div className="container mx-auto px-6 z-10">
     <StaggerContainer className="flex flex-col items-center text-center">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-800">
         Hubungi Kami
        </span>
       </h1>
       <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
        Tim kami siap membantu Anda dengan pertanyaan, masukan, atau permintaan
        informasi lebih lanjut.
       </p>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>

   {/* Contact Information */}
   <section className="py-20 bg-white relative">
    <div className="container mx-auto px-6">
     <div className="flex flex-col lg:flex-row gap-12">
      <MotionDiv
       initial={{opacity: 0, x: -100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2">
       <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="font-raleway font-bold text-3xl mb-8">
         Informasi Kontak
        </h2>

        <div className="space-y-6">
         <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-full">
           <FaEnvelope className="text-xl" />
          </div>
          <div>
           <h3 className="font-semibold text-lg mb-1">Email</h3>
           <p className="text-blue-100">info@sellaris.com</p>
           <p className="text-blue-100">support@sellaris.com</p>
          </div>
         </div>

         <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-full">
           <FaPhone className="text-xl" />
          </div>
          <div>
           <h3 className="font-semibold text-lg mb-1">Telepon</h3>
           <p className="text-blue-100">+62 21 1234 5678</p>
           <p className="text-blue-100">+62 812 3456 7890</p>
          </div>
         </div>

         <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-full">
           <FaMapMarkerAlt className="text-xl" />
          </div>
          <div>
           <h3 className="font-semibold text-lg mb-1">Alamat</h3>
           <p className="text-blue-100">Gedung Sellaris Tower</p>
           <p className="text-blue-100">Jl. Sudirman Kav. 52-53</p>
           <p className="text-blue-100">Jakarta Selatan 12190</p>
          </div>
         </div>

         <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-full">
           <FaClock className="text-xl" />
          </div>
          <div>
           <h3 className="font-semibold text-lg mb-1">Jam Operasional</h3>
           <p className="text-blue-100">Senin - Jumat: 08:00 - 17:00</p>
           <p className="text-blue-100">Sabtu: 08:00 - 14:00</p>
          </div>
         </div>

         <div className="pt-4">
          <h3 className="font-semibold text-lg mb-3">Media Sosial</h3>
          <div className="flex gap-4">
           <MotionButton
            whileHover={{scale: 1.1}}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all">
            <FaFacebook className="text-xl" />
           </MotionButton>
           <MotionButton
            whileHover={{scale: 1.1}}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all">
            <FaTwitter className="text-xl" />
           </MotionButton>
           <MotionButton
            whileHover={{scale: 1.1}}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all">
            <FaInstagram className="text-xl" />
           </MotionButton>
           <MotionButton
            whileHover={{scale: 1.1}}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all">
            <FaLinkedin className="text-xl" />
           </MotionButton>
          </div>
         </div>
        </div>
       </div>
      </MotionDiv>

      <MotionDiv
       initial={{opacity: 0, x: 100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2">
       <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        <h2 className="font-raleway font-bold text-3xl text-gray-800 mb-8">
         Kirim Pesan kepada Kami
        </h2>

        {submitStatus.message && (
         <div
          className={`mb-6 p-4 rounded-lg ${
           submitStatus.success
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
          }`}>
          {submitStatus.message}
         </div>
        )}

        <form
         className="space-y-6"
         onSubmit={handleSubmit}>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
           <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
           </label>
           <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Masukkan nama Anda"
           />
          </div>
          <div>
           <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
            Email
           </label>
           <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Masukkan email Anda"
           />
          </div>
         </div>

         <div>
          <label
           htmlFor="subject"
           className="block text-sm font-medium text-gray-700 mb-1">
           Subjek
          </label>
          <input
           type="text"
           id="subject"
           value={formData.subject}
           onChange={handleChange}
           required
           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
           placeholder="Subjek pesan Anda"
          />
         </div>

         <div>
          <label
           htmlFor="message"
           className="block text-sm font-medium text-gray-700 mb-1">
           Pesan
          </label>
          <textarea
           id="message"
           value={formData.message}
           onChange={handleChange}
           required
           rows={5}
           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
           placeholder="Tulis pesan Anda di sini..."></textarea>
         </div>

         <MotionButton
          whileHover={{
           scale: 1.02,
           boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.4)",
          }}
          whileTap={{scale: 0.98}}
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all ${
           isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}>
          {isSubmitting ? (
           <span className="flex items-center justify-center gap-2">
            <svg
             className="animate-spin h-5 w-5 text-white"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24">
             <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
             <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Mengirim...
           </span>
          ) : (
           "Kirim Pesan"
          )}
         </MotionButton>
        </form>
       </div>
      </MotionDiv>
     </div>
    </div>
   </section>

   {/* Map Section */}
   <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <div className="flex flex-col lg:flex-row items-stretch gap-12 px-6">
     <MotionDiv
      initial={{opacity: 0, x: 100}}
      whileInView={{opacity: 1, x: 0}}
      transition={{duration: 0.8}}
      viewport={{once: true}}
      className="lg:w-full bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-full">
       <div className="h-64 md:h-full bg-gray-200 relative">
        <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.82256141529419!3d-6.208741662717247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sSudirman%20Central%20Business%20District!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
         width="100%"
         height="100%"
         style={{border: 0}}
         allowFullScreen
         loading="lazy"
         className="absolute inset-0"
        />
       </div>
      </div>
     </MotionDiv>
     <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
       Kunjungi Kantor Kami
      </h3>
      <p className="text-gray-600 mb-4">
       Gedung Bisnis Tower Lt. 12, Jl. Sudirman Kav. 52-53, Jakarta Selatan
      </p>
      <MotionButton
       whileHover={{scale: 1.05}}
       whileTap={{scale: 0.95}}
       className="px-6 py-2 border-2 border-teal-500 text-teal-500 font-medium rounded-lg hover:bg-teal-50 transition-all">
       <Link
        href="https://maps.google.com?q=Gedung+Bisnis+Tower+Jakarta"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2">
        Petunjuk Arah <FaArrowRightLong />
       </Link>
      </MotionButton>
     </div>
    </div>
   </section>

   {/* FAQ Section */}
   <section className="min-h-[100dvh] pb-10 bg-white">
    <div className="container mx-auto px-6">
     <div className="text-center max-w-2xl mx-auto mb-12">
      <motion.span
       className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4"
       initial={{opacity: 0}}
       whileInView={{opacity: 1}}
       transition={{delay: 0.2}}>
       Pertanyaan Umum
      </motion.span>
      <h2 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800 mb-4">
       <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-800">
        FAQ
       </span>
      </h2>
      <p className="text-gray-600">
       Temukan jawaban untuk pertanyaan yang sering diajukan
      </p>
     </div>

     <div className="max-w-3xl mx-auto space-y-4">
      {[
       {
        question: "Bagaimana cara mendapatkan demo produk?",
        answer:
         "Anda dapat mengisi formulir permintaan demo di halaman produk kami atau langsung menghubungi tim penjualan kami melalui kontak yang tersedia.",
       },
       {
        question: "Berapa lama waktu respon untuk pertanyaan melalui email?",
        answer:
         "Kami berusaha merespon semua pertanyaan dalam waktu 24 jam pada hari kerja. Untuk pertanyaan mendesak, silakan hubungi nomor telepon layanan pelanggan kami.",
       },
       {
        question: "Apakah tersedia dukungan 24/7?",
        answer:
         "Untuk paket Enterprise, kami menyediakan dukungan 24/7. Paket lainnya mendapatkan dukungan selama jam operasional standar.",
       },
       {
        question: "Bagaimana cara mengajukan permintaan fitur baru?",
        answer:
         "Anda dapat mengirimkan permintaan fitur melalui formulir kontak kami atau mendiskusikannya langsung dengan account manager Anda jika Anda pelanggan berlangganan.",
       },
      ].map((item, index) => (
       <MotionDiv
        key={index}
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{delay: index * 0.1}}
        viewport={{once: true}}
        whileHover={{y: -2}}
        className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
         <h3 className="font-semibold text-lg text-gray-800 flex justify-between items-center">
          {item.question}
          <span className="text-blue-600 text-xl">+</span>
         </h3>
         <p className="mt-2 text-gray-600">{item.answer}</p>
        </div>
       </MotionDiv>
      ))}
     </div>
    </div>
   </section>

   {/* CTA Section */}
   <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
     <MotionDiv
      animate={{
       x: [0, 100, 0],
       y: [0, 50, 0],
       rotate: [0, 360, 0],
       transition: {duration: 20, repeat: Infinity, ease: "linear"},
      }}
      className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-blue-500/20 blur-xl"
     />
     <MotionDiv
      animate={{
       x: [0, -80, 0],
       y: [0, -60, 0],
       rotate: [0, -360, 0],
       transition: {duration: 25, repeat: Infinity, ease: "linear"},
      }}
      className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-white/10 blur-xl"
     />
    </div>

    <div className="container mx-auto px-6 relative z-10">
     <StaggerContainer className="flex flex-col items-center text-center">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl mb-6">
        Masih Ada Pertanyaan?
       </h1>
       <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
        Tim dukungan kami siap membantu Anda dengan pertanyaan atau kebutuhan
        khusus terkait solusi kami.
       </p>
      </FadeIn>

      <FadeIn className="flex flex-col sm:flex-row gap-4">
       <MotionButton
        whileHover={{
         scale: 1.05,
         boxShadow: "0px 10px 25px rgba(255, 255, 255, 0.3)",
        }}
        whileTap={{scale: 0.95}}
        className="px-8 py-4 bg-white text-blue-600 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">
        Hubungi Kami Sekarang
       </MotionButton>
       <MotionButton
        whileHover={{
         scale: 1.05,
         backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
        whileTap={{scale: 0.95}}
        className="px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-all">
        Kunjungi Pusat Bantuan
       </MotionButton>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>
  </div>
 );
};

export default ContactPage;
