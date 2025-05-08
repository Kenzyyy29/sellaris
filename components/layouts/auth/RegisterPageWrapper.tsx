"use client";
import RegisterForm from "@/components/core/modal/RegisterForm";
import {useRouter} from "next/navigation";

export default function RegisterPageWrapper() {
 const {push} = useRouter();
 const handleRegisterComplete = () => {
  push("/dashboard");
 };
 return <RegisterForm onRegisterComplete={handleRegisterComplete} />;
}
