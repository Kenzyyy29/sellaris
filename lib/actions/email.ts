import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendOTP(email: string, otp: string) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Kode OTP untuk Verifikasi Akun",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Verifikasi Akun Anda</h2>
          <p>Terima kasih telah mendaftar. Gunakan kode OTP berikut untuk verifikasi akun Anda:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
            ${otp}
          </div>
          <p>Kode ini akan kadaluarsa dalam 15 menit.</p>
          <p style="color: #6b7280; font-size: 14px;">Jika Anda tidak meminta kode ini, abaikan email ini.</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Gagal mengirim OTP");
    }
}