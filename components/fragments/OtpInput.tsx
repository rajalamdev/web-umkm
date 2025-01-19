import { useState, useEffect } from 'react';

interface OtpInputProps {
    email: string;
    setIsOtpVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OtpInput({ email, setIsOtpVerified }: OtpInputProps) {
    const [otp, setOtp] = useState(['', '', '', '', '']);

    useEffect(() => {
        // Auto-focus first input on mount
        document.getElementById('otp-0')?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            
            // Auto-focus next input
            if (value && index < 4) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }

        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Clear previous input and focus it
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }

        // Trigger verify when pressing Enter on last digit
        if (e.key === 'Enter' && index === 4 && otp[4]) {
            handleVerify();
        }
    };

    const handleVerify = async () => {
        const otpString = otp.join('');
        // Verify OTP logic here
        setIsOtpVerified(true);
    };

    const handleResend = async () => {
        // Resend OTP logic here
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Enter Verification Code</h2>
            <p className="text-gray-600 mb-6">
                We sent a code to {email}
            </p>
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
                            digit ? 'border-accent' : 'border-gray-300'
                        }`}
                    />
                ))}
            </div>
            <button
                onClick={handleVerify}
                className="w-full bg-accent text-white p-3 rounded-lg mb-4"
            >
                Verify
            </button>
            <button
                onClick={handleResend}
                className="w-full text-accent"
            >
                Didn't receive a code? Resend
            </button>
        </div>
    );
}
