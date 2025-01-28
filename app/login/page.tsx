"use client";
import { useState } from "react";
import Link from "next/link";
import Loading from "@/components/loading";
import { FaRegCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from '@/lib/store/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const router = useRouter();
  const { setToken, setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        const errorMessage =
          data.meta?.validations?.phone_email?.[0] ||
          data.meta?.validations?.password?.[0] ||
          data.meta?.messages?.[0] ||
          "Failed to Login";
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      setToken(data.data.token);
      // setUser({
      //   id: data.data.id,
      //   name: data.data.name,
      //   email: data.data.email,
      //   birth_date: data.data.birth_date,
      //   gender: data.data.gender,
      //   phone: data.data.phone,
      //   photo_url: data.data.photo_url,
      //   username: data.data.username,
      // });

      toast({
        title: (
          <div className="flex items-center gap-2">
            <FaRegCheckCircle className="text-green-500 text-xl" />
            <span className="font-bold text-lg text-gray-800">
              Login Berhasil!
            </span>
          </div>
        ),
        description: (
          <span className="text-gray-600">Silahkan coba fitur lainnya</span>
        ),
      });

      window.location.href = "/";
      setError(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setShowIcon(!showIcon);
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="max-w-md mx-auto p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-accent text-center">
          Sign In.
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg mb-4"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg mb-2"
            />
            <div className="absolute bottom-6 right-0 flex items-center pr-3 cursor-pointer">
              {showIcon ? (
                <FaRegEyeSlash onClick={handleShowPassword} />
              ) : (
                <FaRegEye onClick={handleShowPassword} />
              )}
            </div>
          </div>
          <div className="text-right mb-4">
            <Link href="/forgot-password" className="text-accent text-sm">
              Forgot password?
            </Link>
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
              Login
            </button>
          )}
        </form>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button className="w-full bg-accent text-white p-3 rounded-lg mb-4">
          Google
        </button>
        {/* 
                <button
                    className="w-full p-3 border rounded-lg mb-4 flex items-center justify-center gap-2"
                >
                    <img src="/google.svg" alt="Google" className="w-5 h-5" />
                    Google
                </button> */}

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-accent">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
