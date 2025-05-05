import {NextResponse} from "next/server";
import {
 sendContactConfirmationEmail,
 sendContactNotificationEmail,
} from "@/lib/actions/email";

interface ContactFormData {
 name: string;
 email: string;
 subject: string;
 message: string;
}

export async function POST(request: Request) {
 try {
  const {name, email, subject, message}: ContactFormData = await request.json();

  // Validasi input
  if (!name || !email || !subject || !message) {
   return NextResponse.json({error: "Semua field harus diisi"}, {status: 400});
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   return NextResponse.json({error: "Format email tidak valid"}, {status: 400});
  }

  // Kirim email notifikasi ke admin
  await sendContactNotificationEmail(name, email, subject, message);

  // Kirim email konfirmasi ke pengguna
  await sendContactConfirmationEmail(email, name, subject, message);

  return NextResponse.json({message: "Pesan berhasil dikirim"}, {status: 200});
 } catch (error) {
  console.error("Error sending email:", error);
  return NextResponse.json(
   {error: "Terjadi kesalahan saat mengirim pesan"},
   {status: 500}
  );
 }
}
