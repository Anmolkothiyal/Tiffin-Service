import { NextRequest, NextResponse } from "next/server";

// Import otpStore from the OTP generation route
import { otpStore } from "../route";

const OTP_VALIDITY = 5 * 60 * 1000; // 5 minutes
const ADMIN_EMAIL = "anmolkothiyal2021@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const { otp } = await request.json();

    // Validate OTP input
    if (!otp || typeof otp !== "string") {
      return NextResponse.json(
        { success: false, error: "OTP is required" },
        { status: 400 }
      );
    }

    // Retrieve stored OTP for the hardcoded email
    const storedOtpData = otpStore.get(ADMIN_EMAIL.toLowerCase());

    if (!storedOtpData) {
      return NextResponse.json(
        { success: false, error: "No OTP found. Please request a new OTP." },
        { status: 400 }
      );
    }

    // Check if OTP has expired
    if (storedOtpData.expires < Date.now()) {
      otpStore.delete(ADMIN_EMAIL.toLowerCase());
      return NextResponse.json(
        { success: false, error: "OTP has expired" },
        { status: 400 }
      );
    }

    // Verify OTP
    if (storedOtpData.otp !== otp) {
      return NextResponse.json(
        { success: false, error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Clear OTP after successful verification
    otpStore.delete(ADMIN_EMAIL.toLowerCase());

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error in OTP verification:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : "Unknown error"
            : undefined,
      },
      { status: 500 }
    );
  }
}