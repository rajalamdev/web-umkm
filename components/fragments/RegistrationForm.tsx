import { useState } from "react";
import Link from "next/link";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface RegistrationFormProps {
  email: string;
  otp: string; // Terima nilai OTP dari RegisterPage
  onSubmit: (
    password: string,
    passwordConfirmation: string
  ) => Promise<boolean>;
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isSuccess = await onSubmit(password, passwordConfirmation); // Tunggu hasil onSubmit
      if (isSuccess) {
        router.push("/login"); // Arahkan ke halaman login
        toast({
          title: (
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-xl" />
              <span className="font-bold text-lg text-gray-800">
                Pembuatan Akun Berhasil!
              </span>
            </div>
          ),
          description: (
            <span className="text-gray-600">
              Silahkan login untuk melanjutkan.
            </span>
          ),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowIcon(!showIcon);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-accent">
        Atur password
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-3 border rounded-lg mb-4"
        />
        <div className="relative w-[20rem]">
          <input
            type={showPassword ? "text" : "password"}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm your password"
            className="w-full p-3 border rounded-lg mb-4"
          />
          <div className="absolute bottom-8 right-0 flex items-center pr-3 cursor-pointer">
            {showIcon ? (
              <FaRegEyeSlash onClick={handleShowPassword} />
            ) : (
              <FaRegEye onClick={handleShowPassword} />
            )}
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center mb-4">
            <Loading /> {/* Komponen loading ditampilkan */}
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-accent text-white p-3 rounded-lg mb-4"
          >
            Continue
          </button>
        )}
      </form>
      <div className="text-center">
        <p className="text-gray-600">
          Have an account?{" "}
          <Link href="/login" className="text-accent">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
