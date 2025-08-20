import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "anmolkothiyal2021@gmail.com",
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// In-memory store for OTPs (in production, use a database or Redis)
export const otpStore: Map<string, { otp: string; expires: number }> = new Map();
const OTP_VALIDITY = 5 * 60 * 1000; // 5 minutes
const ADMIN_EMAIL = "anmolkothiyal2021@gmail.com";

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
async function sendOtpEmail(otp: string) {
  const mailOptions = {
    from: `"Rakshit Tiffin Service" <${process.env.SMTP_USER || "anmolkothiyal2021@gmail.com"}>`,
    to: ADMIN_EMAIL,
    subject: "Your OTP for Admin Login",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Admin Login OTP</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="color: #555; line-height: 1.6;">
            Your One-Time Password (OTP) for admin login is:
          </p>
          <div style="background: #fff; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #ff6b35; margin: 0; font-size: 24px;">${otp}</h2>
          </div>
          <p style="color: #555; line-height: 1.6;">
            This OTP is valid for 5 minutes. Please do not share it with anyone.
          </p>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 14px;">
              Best regards,<br>
              <strong>Rakshit Tiffin Service Team</strong>
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function POST(_request: NextRequest) {
  try {
    const otp = generateOTP();
    const expires = Date.now() + OTP_VALIDITY;

    // Store OTP
    otpStore.set(ADMIN_EMAIL.toLowerCase(), { otp, expires });

    // Send OTP email
    const emailResult = await sendOtpEmail(otp);

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in OTP POST:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}