import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  fullname?: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Reset Password</h1>
          <p style="font-size: 16px;">Hi ${fullname},</p>
          <p style="font-size: 16px;">You requested to reset your password. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 14px; color: #6b7280;">Or copy and paste this link into your browser:</p>
          <p style="font-size: 14px; color: #6b7280; word-break: break-all;">${resetLink}</p>
          <p style="font-size: 14px; color: #6b7280;">This link will expire in 1 hour.</p>
          <p style="font-size: 14px; color: #6b7280;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};

export const sendVerificationEmail = async (
  email: string,
  code: string,
  fullname?: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Email Verification</h1>
          <p style="font-size: 16px;">Hi ${fullname},</p>
          <p style="font-size: 16px;">Thank you for registering. Please use the following verification code:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h2 style="margin: 0; font-size: 24px; letter-spacing: 2px;">${code}</h2>
          </div>
          <p style="font-size: 14px; color: #6b7280;">If you did not request this verification, please ignore this email.</p>
          <p style="font-size: 14px; color: #6b7280;">Best regards, Codevora Team.</p>
          <p style="font-size: 14px; color: #6b7280;">This code will expire in 24 hours.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendContactConfirmationEmail = async (
 email: string,
 name: string,
 subject: string,
 message: string
) => {
 try {
  const transporter = nodemailer.createTransport({
   service: process.env.EMAIL_SERVICE || "gmail",
   host: process.env.EMAIL_HOST,
   port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
   secure: process.env.EMAIL_SECURE === "true",
   auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
   },
  });

  const mailOptions = {
   from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
   to: email,
   subject: `Terima kasih atas pesan Anda - ${subject}`,
   html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Terima kasih telah menghubungi kami</h2>
          <p>Halo ${name},</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Kami telah menerima pesan Anda dengan detail berikut:</p>
            <p><strong>Subjek:</strong> ${subject}</p>
            <p><strong>Pesan:</strong></p>
            <blockquote style="border-left: 3px solid #ddd; padding-left: 15px; margin-left: 0; color: #555;">
              ${message}
            </blockquote>
          </div>
          
          <p>Tim kami akan meninjau pesan Anda dan menghubungi Anda secepatnya.</p>
          
          <p style="margin-top: 30px;">Salam hormat,</p>
          <p><strong>Tim Sellaris</strong></p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 0.8em; color: #64748b;">
            <p>Email ini dikirim secara otomatis. Mohon tidak membalas email ini.</p>
            <p>© ${new Date().getFullYear()} Sellaris. All rights reserved.</p>
          </div>
        </div>
      `,
  };

  await transporter.sendMail(mailOptions);
  return true;
 } catch (error) {
  console.error("Error sending contact confirmation email:", error);
  throw new Error("Failed to send contact confirmation email");
 }
};

export const sendContactNotificationEmail = async (
 name: string,
 email: string,
 subject: string,
 message: string
) => {
 try {
  const transporter = nodemailer.createTransport({
   service: process.env.EMAIL_SERVICE || "gmail",
   host: process.env.EMAIL_HOST,
   port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
   secure: process.env.EMAIL_SECURE === "true",
   auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
   },
  });

  const mailOptions = {
   from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
   to: process.env.EMAIL_RECEIVER,
   subject: `[Kontak Website] ${subject}`,
   html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Pesan Baru dari Form Kontak Website</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subjek:</strong> ${subject}</p>
            <p><strong>Pesan:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 0.9em; color: #64748b;">
            Pesan ini dikirim melalui form kontak website pada ${new Date().toLocaleString()}.
          </p>
        </div>
      `,
  };

  await transporter.sendMail(mailOptions);
  return true;
 } catch (error) {
  console.error("Error sending contact notification email:", error);
  throw new Error("Failed to send contact notification email");
 }
};