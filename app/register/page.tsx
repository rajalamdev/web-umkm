"use client"
import EmailInput from '@/components/fragments/EmailInput';
import OtpInput from '@/components/fragments/OtpInput';
import RegistrationForm from '@/components/fragments/RegistrationForm';
import { useState } from 'react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    return (
        <div className='min-h-screen grid place-items-center'>
            <div className='shadow-md p-8 rounded-md'>
                {!email ? (
                    <EmailInput setEmail={setEmail} />
                ) : !isOtpVerified ? (
                    <OtpInput email={email} setIsOtpVerified={setIsOtpVerified} />
                ) : (
                    <RegistrationForm email={email} />
                )}
            </div>
        </div>
    );
}
