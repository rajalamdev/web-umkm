import { useState, useEffect } from "react";
import Loading from "../loading";

interface OtpInputProps {
  email: string;
  setIsOtpVerified: React.Dispatch<React.SetStateAction<boolean>>;
  onVerify: (otp: string) => void;
  type: "register" | "forgot-password";
}

export default function OtpInput({
  email,
  setIsOtpVerified,
  onVerify,
  type,
}: OtpInputProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    // Auto-focus first input on mount
    document.getElementById("otp-0")?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Clear previous input and focus it
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }

    // Trigger verify when pressing Enter on last digit
    if (e.key === "Enter" && index === 5 && otp[5]) {
      handleVerify();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    // Verify OTP logic here
    setIsLoading(true);
    try {
      await onVerify(otpString);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        const errorMessage =
          data.meta?.validations?.email?.[0] || "Failed to resend OTP";
        throw new Error(errorMessage);
      }

      console.log("OTP resent successfully");
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {type === "register"
          ? "Enter Verification Code"
          : "Reset Password Verification"}
      </h2>
      <p className="text-gray-600 mb-6">We sent a code to {email}</p>
      <div className="flex gap-2 mb-6 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-12 h-12 text-center border rounded-lg focus:outline-none focus:ring-1 focus:ring-accent ${
              digit ? "border-accent" : "border-gray-300"
            }`}
          />
        ))}
      </div>
      {isLoading ? (
        <div className="flex justify-center mb-4">
          <Loading /> {/* Komponen loading ditampilkan */}
        </div>
      ) : (
        <button
          onClick={handleVerify}
          className="w-full bg-accent text-white p-3 rounded-lg mb-4"
        >
          Verify
        </button>
      )}
      <button
        onClick={handleResend}
        className="w-full text-accent"
        disabled={resendLoading}
      >
        {resendLoading ? "Resending..." : "Didn't receive a code? Resend"}
      </button>
    </div>
  );
}
