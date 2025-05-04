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