"use client";
import EmailInput from "@/components/fragments/EmailInput";
import OtpInput from "@/components/fragments/OtpInput";
import RegistrationForm from "@/components/fragments/RegistrationForm";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");

  async function handleSubmit(inputEmail: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forgot-password/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: inputEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.meta?.validations?.email?.[0] || "Failed to register email"; // Ambil error dari meta.validations
        setError(errorMessage); // Simpan error dari API
        throw new Error(errorMessage);
      }

      setEmail(inputEmail);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  }

  async function handleVerify(otpValue: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forgot-password/check-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: otpValue,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.meta?.validations?.otp?.[0] || "Failed to verify OTP"; // Ambil error dari meta.validations
        setError(errorMessage); // Simpan error dari API
        throw new Error(errorMessage);
      }

      setOtp(otpValue);
      setIsOtpVerified(true);
      setError(null);
    } catch (error: any) {
      setError(error.message); // Simpan pesan error ke state
    }
  }

  async function handlePassword(
    password: string,
    passwordConfirmation: string
  ) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forgot-password/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            password,
            password_confirmation: passwordConfirmation,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.meta?.validations?.password?.[0] ||
          "Failed to register password"; // Ambil error dari meta.validations
        setError(errorMessage); // Simpan error dari API
        throw new Error(errorMessage);
      }

      setPassword(password);
      setError(null);
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="shadow-md p-8 rounded-md">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}
        {!email ? (
          <EmailInput onSubmit={handleSubmit} type="forgot-password" />
        ) : !isOtpVerified ? (
          <OtpInput
            email={email}
            setIsOtpVerified={setIsOtpVerified}
            onVerify={handleVerify}
            type="forgot-password"
          />
        ) : (
          <RegistrationForm
            email={email}
            onSubmit={handlePassword}
            otp={otp}
            type="forgot-password"
          />
        )}
      </div>
    </div>
  );
}
