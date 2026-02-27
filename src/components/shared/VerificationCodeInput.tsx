'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button } from './Button';
import { VerificationCodeInputProps } from '@/interfaces';



const VerificationCodeInput = ({ method, onVerify, onCancel }: VerificationCodeInputProps) => {
    const [code, setCode] = useState(['', '', '', '', '']);
    const [timer, setTimer] = useState(60);


    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };


    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);


            if (value && index < 4) {
                const nextInput = document.getElementById(`code-input-${index + 1}`);
                nextInput?.focus();
            }
        }
    };


    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-input-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleResendCode = () => {
        setTimer(60);
        setCode(['', '', '', '', '']);
    };

    const isCodeComplete = code.every(c => c !== '');

    return (
        <div className="px-[40px] py-[32px] flex flex-col items-center gap-[24px]">
            <p className="text-[16px] text-[#64748B] font-['var(--font-tajawal)'] text-center">
                أدخل كود التحقق المكون من 5 رموز المرسل على {method === 'phone' ? 'رقم الهاتف' : 'البريد الإلكتروني'}
                <br />
                <span className="font-bold text-[#0F264D]">
                    {method === 'phone' ? '***-***-0659' : 'u***@example.com'}
                </span>
            </p>

            <div className="flex gap-[16px] justify-center" dir="ltr">
                {[0, 1, 2, 3, 4].map((index) => (
                    <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={code[index]}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-[80px] h-[80px] text-center text-[20px] font-bold text-[#0F264D] border-2 border-[#E2E8F0] rounded-[12px] focus:outline-none focus:border-[#2563EB] transition-colors font-['var(--font-tajawal)'] leading-[150%]"
                        autoFocus={index === 0}
                    />
                ))}
            </div>


            <div className="flex flex-col items-center gap-[8px]">
                <span className="text-[14px] text-[#64748B] font-['var(--font-tajawal)']">
                    إعادة إرسال الكود خلال <span className="font-bold text-[#0F264D]">{formatTime(timer)}</span>
                </span>
                {timer === 0 && (
                    <button
                        onClick={handleResendCode}
                        className="text-[16px] font-bold text-[#2563EB] hover:underline font-['var(--font-tajawal)']"
                    >
                        إعادة إرسال الكود
                    </button>
                )}
            </div>

            <Button
                variant="primary"
                className="w-[320px] h-[56px] rounded-[12px] font-['var(--font-tajawal)'] text-[18px] font-bold shadow-sm"
                onClick={onVerify}
                disabled={!isCodeComplete}
            >
                تحقق الآن
            </Button>
        </div>
    );
};

export default VerificationCodeInput;