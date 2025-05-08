// components/RegistrationFlow.tsx
"use client";
import {useState} from "react";
import RegisterForm from "../../core/modal/RegisterForm";
import OtpVerification from "../../core/modal/OtpVerification";
import CompanyForm from "../../core/modal/CompanyForm";
import {useRouter} from "next/navigation";

export default function RegistrationFlow() {
 const [step, setStep] = useState<"register" | "otp" | "company">("register");
 const [email, setEmail] = useState("");
 const [userId, setUserId] = useState("");
 const router = useRouter();

 const handleRegisterComplete = (email: string, userId?: string) => {
  setEmail(email);
  if (userId) setUserId(userId);
  setStep("otp");
 };

 const handleOtpVerified = () => {
  setStep("company");
 };

 const handleCompanySubmit = async (companyData: any) => {
  try {
   const response = await fetch("/api/user/update-company", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     userId,
     companyData,
    }),
   });

   if (!response.ok) {
    throw new Error("Failed to save company data");
   }

   router.push("/dashboard");
  } catch (error) {
   console.error("Error saving company data:", error);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center p-4">
   <div className="w-full max-w-md">
    {step === "register" && (
     <RegisterForm
      onRegisterComplete={handleRegisterComplete}
      onOtpVerified={handleOtpVerified}
     />
    )}

    {step === "otp" && (
     <OtpVerification
      email={email}
      onVerificationSuccess={handleOtpVerified}
     />
    )}

    {step === "company" && <CompanyForm onSubmit={handleCompanySubmit} />}
   </div>
  </div>
 );
}
