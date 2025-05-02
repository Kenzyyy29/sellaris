import Link from "next/link";

export default function AuthLayout({children}: {children: React.ReactNode}) {
 return (
  <div className="flex flex-col items-center justify-between min-h-[100dvh]">
   <header className="w-full py-4 px-10 flex justify-between items-center">
    <Link
     href="/"
     className="font-bold text-3xl bg-clip-text bg-gradient-to-br from-blue-500 to-blue-800 text-transparent italic"
     style={{fontFamily: `"Raleway", sans-serif`}}>
     SELLARIS
    </Link>
    <Link href="/contact">Kontak Kami</Link>
   </header>
   {children}
   <footer className="p-4">
    <p className="text-white text-sm">
     © {new Date().getFullYear()} SELLARIS. All rights reserved.
    </p>
   </footer>
  </div>
 );
}
