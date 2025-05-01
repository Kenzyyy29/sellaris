"use client";
import LoginForm from "@/components/core/modal/LoginForm";
import {useSearchParams} from "next/navigation";
import {Suspense} from "react";

function LoginContent() {
 const searchParams = useSearchParams();
 const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

 return <LoginForm searchParams={{callbackUrl}} />;
}

export default function LoginPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <LoginContent />
  </Suspense>
 );
}
