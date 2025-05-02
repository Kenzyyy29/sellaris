"use client"
import {
 FaChartLine,
 FaShieldAlt,
 FaMoneyBillWave,
 FaUsers,
 FaStore,
 FaQrcode,
 FaFileInvoiceDollar,
} from "react-icons/fa";
import Link from "next/link";
import {
 FadeIn,
 StaggerContainer,
 MotionDiv,
 MotionButton,
} from "@/components/AnimatedComponent";
import {FaArrowRightLong, FaRocket} from "react-icons/fa6";
import Image from "next/image";
import {motion} from "framer-motion";

const Brands = [
 {icon: <FaStore className="text-5xl text-blue-600" />, name: "Retail"},
 {icon: <FaQrcode className="text-5xl text-blue-600" />, name: "F&B"},
 {
  icon: <FaFileInvoiceDollar className="text-5xl text-blue-600" />,
  name: "Service",
 },
];

const Brands2 = [
 {icon: <FaUsers className="text-5xl text-blue-600" />, name: "Enterprise"},
 {icon: <FaChartLine className="text-5xl text-blue-600" />, name: "Startup"},
];

const HomePageLayout = () => {
 return (
  <div className="flex flex-col w-full overflow-x-hidden bg-gray-50">
   {/* Hero Section - Enhanced with floating elements and gradient */}
   <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden pt-24 xl:pt-40 2xl:pt-0">
    {/* Enhanced floating background elements */}
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
     <MotionDiv
      animate={{
       rotate: [0, 360],
       transition: {duration: 40, repeat: Infinity, ease: "linear"},
      }}
      className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-teal-200/30 to-blue-200/30 blur-lg"
     />
    </div>

    <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 z-10 px-6">
     <StaggerContainer className="flex flex-col justify-center lg:w-1/2">
      <FadeIn>
       <motion.div
        className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6 w-max"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.4}}>
        <FaRocket className="text-blue-600 text-xl" />
        <span className="text-sm font-medium text-gray-700">
         Platform Bisnis Masa Depan
        </span>
       </motion.div>
      </FadeIn>
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6">
        <span className="inline-block">Transformasi Digital</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-800">
         untuk Bisnis Anda
        </span>
       </h1>
      </FadeIn>
      <FadeIn>
       <p className="text-lg text-gray-600 leading-relaxed mb-8">
        Sellaris menyediakan solusi terintegrasi untuk mengelola seluruh
        operasional bisnis Anda dengan antarmuka yang intuitif dan pengalaman
        pengguna yang memukau.
       </p>
      </FadeIn>
      <FadeIn className="flex flex-col sm:flex-row gap-4 w-full mt-4">
       <MotionButton
        whileHover={{
         scale: 1.05,
         boxShadow: "0px 5px 15px rgba(16, 185, 129, 0.4)",
        }}
        whileTap={{scale: 0.95}}
        className="px-8 py-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">
        <Link
         href="/a"
         className="flex items-center justify-center gap-2">
         Mulai Sekarang <FaArrowRightLong />
        </Link>
       </MotionButton>
       <MotionButton
        whileHover={{scale: 1.05, backgroundColor: "#f9fafb"}}
        whileTap={{scale: 0.95}}
        className="px-8 py-4 border-2 border-gray-300 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all">
        <Link
         href="/a"
         className="flex items-center justify-center gap-2">
         Demo Produk
        </Link>
       </MotionButton>
      </FadeIn>
     </StaggerContainer>

     <MotionDiv
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8}}
      className="lg:w-1/2 flex justify-center relative group">
      {/* Enhanced Image Container with floating effect */}
      <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
       <Image
        src="/assets/1.png"
        alt="hero"
        width={350}
        height={350}
        className="object-cover w-full h-auto transition-all duration-500 group-hover:scale-105"
       />
      </div>

      {/* Floating Border Effect */}
      <div className="absolute -bottom-6 -left-6 w-[calc(100%+48px)] h-[calc(100%+48px)] border-4 border-blue-400/20 rounded-2xl z-0 transition-all duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>

      {/* Subtle Shadow */}
      <div className="absolute inset-0 bg-blue-400/10 rounded-2xl -z-10 translate-x-6 translate-y-6"></div>
     </MotionDiv>
    </div>
   </section>

   {/* Features Section - Enhanced Interactive Cards */}
   <section className="py-20 bg-white relative">
    <div className="container mx-auto px-6">
     <div className="flex flex-col lg:flex-row items-center gap-12">
      <MotionDiv
       initial={{opacity: 0, x: -100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2 relative group">
       <div className="relative z-10 overflow-hidden rounded-2xl">
        <Image
         src="/assets/2.png"
         alt="feature"
         width={800}
         height={700}
         className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
        />
       </div>
      </MotionDiv>

      <div className="lg:w-1/2">
       <MotionDiv
        initial={{opacity: 0, x: 100}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 0.8}}
        viewport={{once: true}}
        className="flex flex-col gap-10">
        <div>
         <motion.span
          className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{delay: 0.2}}>
          Fitur Unggulan
         </motion.span>
         <h1 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800">
          Lebih dari Sekedar{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-800">
           Software
          </span>
         </h1>
        </div>

        <div className="space-y-6">
         <MotionDiv
          whileHover={{y: -5, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)"}}
          className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-100/20 z-0"></div>
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white z-10">
           <FaChartLine className="text-2xl" />
          </div>
          <div className="z-10">
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Analisis Real-time
           </h3>
           <p className="text-gray-600">
            Dashboard interaktif dengan visualisasi data bisnis Anda secara
            real-time
           </p>
          </div>
         </MotionDiv>

         <MotionDiv
          whileHover={{y: -5, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)"}}
          className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-amber-100/20 z-0"></div>
          <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white z-10">
           <FaShieldAlt className="text-2xl" />
          </div>
          <div className="z-10">
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Keamanan Tier-1
           </h3>
           <p className="text-gray-600">
            Enkripsi end-to-end dan backup harian untuk perlindungan data bisnis
            Anda
           </p>
          </div>
         </MotionDiv>

         <MotionDiv
          whileHover={{y: -5, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)"}}
          className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 relative overflow-hidden">
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-emerald-100/20 z-0"></div>
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-white z-10">
           <FaMoneyBillWave className="text-2xl" />
          </div>
          <div className="z-10">
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Pembayaran Terintegrasi
           </h3>
           <p className="text-gray-600">
            Dukungan berbagai metode pembayaran termasuk QRIS, e-Wallet, dan
            kartu kredit
           </p>
          </div>
         </MotionDiv>
        </div>

        <MotionButton
         whileHover={{
          x: 5,
          scale: 1.05,
          boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.3)",
         }}
         className="self-start mt-4">
         <Link
          href="/a"
          className="flex items-center gap-2 text-blue-600 font-semibold hover:underline">
          Jelajahi Semua Fitur <FaArrowRightLong />
         </Link>
        </MotionButton>
       </MotionDiv>
      </div>
     </div>
    </div>
   </section>

   {/* Brands Section - Enhanced Floating Cards */}
   <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
     <MotionDiv
      animate={{
       x: [0, 100, 0],
       y: [0, 50, 0],
       transition: {duration: 15, repeat: Infinity, ease: "linear"},
      }}
      className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-blue-100/30 blur-xl"
     />
    </div>

    <div className="container mx-auto px-6 relative z-10">
     <StaggerContainer className="flex flex-col items-center text-center">
      <FadeIn>
       <motion.div
        className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}>
        Partner Terpercaya
       </motion.div>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800 mb-4">
        Digunakan oleh <span className="text-blue-600">Bisnis Terbaik</span>
       </h1>
       <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Bergabung dengan jaringan bisnis yang telah berkembang bersama Sellaris
       </p>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-5xl mx-auto">
       {[...Brands, ...Brands2].map((item, index) => (
        <MotionDiv
         key={index}
         initial={{opacity: 0, y: 50}}
         whileInView={{opacity: 1, y: 0}}
         transition={{duration: 0.5, delay: index * 0.1}}
         viewport={{once: true}}
         whileHover={{y: -10, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.05)"}}
         className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
         <MotionDiv
          whileHover={{scale: 1.1}}
          className="mb-4">
          {item.icon}
         </MotionDiv>
         <p className="mt-2 font-semibold text-gray-700">{item.name}</p>
        </MotionDiv>
       ))}
      </div>
     </StaggerContainer>
    </div>
   </section>

   {/* Testimonial Section - Enhanced 3D Card */}
   <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
     <MotionDiv
      animate={{
       x: [0, 100, 0],
       y: [0, 50, 0],
       rotate: [0, 360, 0],
       transition: {duration: 20, repeat: Infinity, ease: "linear"},
      }}
      className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-teal-500/20 blur-xl"
     />
     <MotionDiv
      animate={{
       x: [0, -80, 0],
       y: [0, -60, 0],
       rotate: [0, -360, 0],
       transition: {duration: 25, repeat: Infinity, ease: "linear"},
      }}
      className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-amber-300/10 blur-xl"
     />
    </div>

    <div className="container mx-auto px-6 relative z-10">
     <MotionDiv
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration: 0.8}}
      viewport={{once: true}}
      className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
       <motion.span
        className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-4"
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{delay: 0.2}}>
        Testimonial
       </motion.span>
       <h2 className="font-raleway font-bold text-4xl md:text-5xl mb-6">
        Cerita Sukses dari{" "}
        <span className="text-amber-300">Pelanggan Kami</span>
       </h2>
       <div className="w-20 h-1 bg-amber-300 mx-auto"></div>
      </div>

      <MotionDiv
       whileHover={{scale: 1.02}}
       className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl relative overflow-hidden">
       <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-teal-500/20"></div>
       <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-300/10"></div>

       <div className="relative z-10">
        <div className="flex items-center mb-8">
         <MotionDiv
          whileHover={{scale: 1.1}}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-2xl font-bold text-white mr-4 shadow-md">
          AS
         </MotionDiv>
         <div>
          <h4 className="font-bold text-xl">Ahmad Surya</h4>
          <p className="text-teal-100">Pemilik Restoran Chain</p>
          <div className="flex mt-1">
           {[...Array(5)].map((_, i) => (
            <svg
             key={i}
             className="w-4 h-4 text-amber-300"
             fill="currentColor"
             viewBox="0 0 20 20">
             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
           ))}
          </div>
         </div>
        </div>
        <p className="text-lg leading-relaxed mb-6 italic">
         &quot;Sellaris telah mengubah cara kami mengelola 5 cabang restoran.
         Dengan sistem terintegrasi, kami bisa memantau semua outlet dari satu
         dashboard. Fitur inventori otomatis menghemat 20 jam kerja per
         minggu!&quot;
        </p>
        <MotionDiv
         whileHover={{scale: 1.05}}
         className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
         <FaStore className="text-sm" />
         <span className="text-sm font-medium">Retail & F&B Solution</span>
        </MotionDiv>
       </div>
      </MotionDiv>
     </MotionDiv>
    </div>
   </section>

   {/* Pricing Section - Enhanced Animated Cards */}
   <section className="py-20 bg-white relative overflow-hidden">
    <div className="container mx-auto px-6">
     <div className="text-center max-w-2xl mx-auto mb-16">
      <motion.span
       className="inline-block bg-blue  -100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4"
       initial={{opacity: 0}}
       whileInView={{opacity: 1}}
       transition={{delay: 0.2}}>
       Harga Kompetitif
      </motion.span>
      <h2 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800 mb-4">
       Pilih Paket{" "}
       <span className="bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">
        Terbaik
       </span>
      </h2>
      <p className="text-gray-600">
       Solusi lengkap dengan harga yang terjangkau untuk bisnis segala ukuran
      </p>
     </div>

     <div className="flex flex-col lg:flex-row items-center gap-8">
      <MotionDiv
       initial={{opacity: 0, x: -100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2 relative group">
       <div className="relative z-10 overflow-hidden rounded-2xl">
        <Image
         src="/assets/3.png"
         alt="Pricing illustration"
         width={1000}
         height={1000}
         className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
        />
       </div>
      </MotionDiv>

      <MotionDiv
       initial={{opacity: 0, x: 100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2">
       <div className="flex flex-col gap-8">
        <MotionDiv
         whileHover={{
          scale: 1.02,
          y: -5,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
         }}
         transition={{duration: 0.3}}
         className="flex gap-4 items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 relative overflow-hidden">
         <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-100/20 z-0"></div>
         <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white z-10">
          <FaChartLine className="text-2xl" />
         </div>
         <div className="z-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
           Paket Starter
          </h3>
          <p className="text-gray-600 mb-2">
           Cocok untuk bisnis kecil dengan transaksi sederhana
          </p>
          <div className="flex items-center gap-2">
           <span className="text-2xl font-bold text-gray-800">Rp120.000</span>
           <span className="text-sm text-gray-500">/bulan</span>
          </div>
         </div>
        </MotionDiv>

        <MotionDiv
         whileHover={{
          scale: 1.02,
          y: -5,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
         }}
         transition={{duration: 0.3}}
         className="flex gap-4 items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 relative overflow-hidden">
         <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-amber-100/20 z-0"></div>
         <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white z-10">
          <FaShieldAlt className="text-2xl" />
         </div>
         <div className="z-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
           Paket Professional
          </h3>
          <p className="text-gray-600 mb-2">
           Solusi lengkap untuk bisnis yang sedang berkembang
          </p>
          <div className="flex items-center gap-2">
           <span className="text-2xl font-bold text-gray-800">Rp299.000</span>
           <span className="text-sm text-gray-500">/bulan</span>
          </div>
         </div>
        </MotionDiv>

        <MotionDiv
         whileHover={{
          scale: 1.02,
          y: -5,
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
         }}
         transition={{duration: 0.3}}
         className="flex gap-4 items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 relative overflow-hidden">
         <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-emerald-100/20 z-0"></div>
         <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-white z-10">
          <FaMoneyBillWave className="text-2xl" />
         </div>
         <div className="z-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
           Paket Enterprise
          </h3>
          <p className="text-gray-600 mb-2">
           Solusi khusus untuk bisnis besar dengan kebutuhan khusus
          </p>
          <div className="flex items-center gap-2">
           <span className="text-2xl font-bold text-gray-800">Rp899.000</span>
           <span className="text-sm text-gray-500">/bulan</span>
          </div>
         </div>
        </MotionDiv>

        <MotionButton
         whileHover={{
          scale: 1.05,
          boxShadow: "0px 5px 20px rgba(16, 185, 129, 0.3)",
         }}
         whileTap={{scale: 0.95}}
         className="px-8 py-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all">
         <Link
          href="/a"
          className="flex items-center justify-center gap-2">
          Bandingkan Paket <FaArrowRightLong />
         </Link>
        </MotionButton>
       </div>
      </MotionDiv>
     </div>
    </div>
   </section>

   {/* Enhanced CTA Section */}
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
       <motion.div
        className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-4"
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}>
        Mulai Sekarang
       </motion.div>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl mb-6">
        Siap <span className="text-amber-300">Bertransformasi</span>?
       </h1>
       <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
        Bergabung dengan ribuan bisnis yang telah mempercayakan operasional
        mereka kepada Sellaris.
       </p>
      </FadeIn>

      <FadeIn className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
       <MotionButton
        whileHover={{
         scale: 1.05,
         boxShadow: "0px 10px 25px rgba(255, 255, 255, 0.3)",
        }}
        whileTap={{scale: 0.95}}
        className="px-8 py-4 bg-white text-blue-600 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">
        Coba Gratis 14 Hari
       </MotionButton>
       <MotionButton
        whileHover={{scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)"}}
        whileTap={{scale: 0.95}}
        className="px-8 py-4 border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-all">
        Jadwalkan Demo
       </MotionButton>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>
  </div>
 );
};

export default HomePageLayout;
