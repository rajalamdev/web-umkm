import { useState } from "react";
import Link from "next/link";
import Loading from "../loading";

interface EmailInputProps {
  onSubmit: (email: string) => void;
}

export default function EmailInput({ onSubmit }: EmailInputProps) {
  const [inputEmail, setInputEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(inputEmail);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-accent text-center">
        Daftar
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border rounded-lg mb-4"
        />
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
