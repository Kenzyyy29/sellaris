import AuthLayoutWrapper from "@/components/layouts/auth/AuthLayoutWrapper";

export default function AuthLayout({children}: {children: React.ReactNode}) {
 return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}
