import { useState } from 'react';
import Link from 'next/link';

interface RegistrationFormProps {
    email: string;
}

export default function RegistrationForm({ email }: RegistrationFormProps) {
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password setup logic here
        // Redirect to login page after success
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-accent">Atur password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-3 border rounded-lg mb-4"
                />
                <Link href={"/login"}>
                    <button
                        type="submit"
                        className="w-full bg-accent text-white p-3 rounded-lg mb-4"
                    >
                        Continue
                    </button>
                </Link>
            </form>
            <div className="text-center">
                <p className="text-gray-600">
                    Have an account?{' '}
                    <Link href="/login" className="text-accent">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
