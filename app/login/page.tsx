"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="max-w-md mx-auto p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-accent text-center">
          Sign In.
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg mb-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg mb-2"
          />
          <div className="text-right mb-4">
            <Link href="/forgot-password" className="text-accent text-sm">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white p-3 rounded-lg mb-4"
          >
            Login
          </button>
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
