'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import { IconLock, IconX } from '@tabler/icons-react';
import { TwoFactorWizardModalProps } from '@/interfaces';


type Step = 'method' | 'verify' | 'recovery';

const TwoFactorWizardModal = ({ isOpen, onClose, onComplete }: TwoFactorWizardModalProps) => {
    const [currentStep, setCurrentStep] = useState<Step>('method');
    const [selectedMethod, setSelectedMethod] = useState<'sms' | 'email'>('sms');
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
    const [recoveryCodes] = useState([
        '9582-9948', '9582-9948', '9582-9948',
        '9582-9948', '9582-9948', '9582-9948',
        '9582-9948', '9582-9948', '9582-9948'
    ]);

    const handleMethodConfirm = () => {
        setCurrentStep('verify');
    };

    const handleVerifyConfirm = () => {
        setCurrentStep('recovery');
    };

    const handleRecoveryConfirm = () => {
        onComplete();
        onClose();
        setCurrentStep('method');
        setVerificationCode(['', '', '', '', '']);
    };

    const handleClose = () => {
        onClose();
        setCurrentStep('method');
        setVerificationCode(['', '', '', '', '']);
    };

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);
            if (value && index < 4) {
                const nextInput = document.getElementById(`code-input-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    useEffect(() => {
        if (currentStep === 'verify') {
            setTimeout(() => {
                const firstInput = document.getElementById('code-input-0');
                firstInput?.focus();
            }, 100);
        }
    }, [currentStep]);

    if (!isOpen) return null;

    const steps = [
        { id: 'method', label: 'اختيار الطريقة' },
        { id: 'verify', label: 'التفعيل' },
        { id: 'recovery', label: 'الاستعادة' }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === currentStep);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />


            <div
                className={cn(
                    "relative bg-white rounded-[8px] border border-[#E2E8F0] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200",
                    currentStep === 'method' && "w-[590px]",
                    currentStep === 'verify' && "w-[590px]",
                    currentStep === 'recovery' && "w-[664px]"
                )}
                dir="rtl"
            >

                <button
                    onClick={handleClose}
                    className="absolute top-[16px] left-[16px] z-10 text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                    <IconX size={24} />
                </button>


                <div className="pt-[24px] pb-[16px] px-[40px] ">
                    <h2 className="text-[20px] font-bold text-[#0F264D] font-['var(--font-tajawal)'] text-center mb-[24px]">
                        إعداد المصادقة الثنائية
                    </h2>

                    <div className="flex items-center justify-center gap-[40px]">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center gap-[8px]">

                                <div
                                    className={cn(
                                        "w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-all",
                                        index <= currentStepIndex
                                            ? "bg-[#2563EB] text-white"
                                            : "bg-[#E2E8F0] text-[#94A3B8]"
                                    )}
                                >
                                    {index + 1}
                                </div>

                                <span
                                    className={cn(
                                        "text-[14px] font-['var(--font-tajawal)']",
                                        index <= currentStepIndex ? "text-[#2563EB] font-bold" : "text-[#94A3B8]"
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="px-[40px] py-[32px]">

                    {currentStep === 'method' && (
                        <div className="flex flex-col gap-[24px]">

                            <label
                                className={cn(
                                    "flex items-start gap-[16px] p-[24px] rounded-[16px] border-2 cursor-pointer transition-all",
                                    selectedMethod === 'sms'
                                        ? "border-[#2563EB] bg-[#EFF6FF]"
                                        : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                                )}
                                onClick={() => setSelectedMethod('sms')}
                            >
                                <div
                                    className={cn(
                                        "w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 mt-[2px]",
                                        selectedMethod === 'sms' ? "border-[#2563EB]" : "border-[#94A3B8]"
                                    )}
                                >
                                    {selectedMethod === 'sms' && (
                                        <div className="w-[14px] h-[14px] rounded-full bg-[#2563EB]" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[16px] text-[#0F264D] font-['var(--font-tajawal)'] leading-[1.6] text-right">
                                        رسالة نصية عبر الـ SMS للرقم 0597780605
                                    </p>
                                    <p className="text-[14px] text-[#64748B] font-['var(--font-tajawal)'] leading-[1.6] text-right mt-[8px]">
                                        الخيار الأسرع والأكثر شيوعا يصلك رمز مباشرة على هاتفك المسجل
                                    </p>
                                </div>
                            </label>


                            <label
                                className={cn(
                                    "flex items-start gap-[16px] p-[24px] rounded-[16px] border-2 cursor-pointer transition-all",
                                    selectedMethod === 'email'
                                        ? "border-[#2563EB] bg-[#EFF6FF]"
                                        : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                                )}
                                onClick={() => setSelectedMethod('email')}
                            >
                                <div
                                    className={cn(
                                        "w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 mt-[2px]",
                                        selectedMethod === 'email' ? "border-[#2563EB]" : "border-[#94A3B8]"
                                    )}
                                >
                                    {selectedMethod === 'email' && (
                                        <div className="w-[14px] h-[14px] rounded-full bg-[#2563EB]" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[16px] text-[#0F264D] font-['var(--font-tajawal)'] leading-[1.6] text-right">
                                        بريد الكتروني ايميل الى sajahany23@gmail.com
                                    </p>
                                    <p className="text-[14px] text-[#64748B] font-['var(--font-tajawal)'] leading-[1.6] text-right mt-[8px]">
                                        خيار مناسب التوصيل في حالة احتمال مفقودة عن بريد الكتروني
                                    </p>
                                </div>
                            </label>
                        </div>
                    )}


                    {currentStep === 'verify' && (
                        <div className="flex flex-col items-center gap-[24px]">

                            <div className="w-[64px] h-[64px] rounded-full bg-[#EFF6FF] flex items-center justify-center">
                                <IconLock size={32} className="text-[#2563EB]" />
                            </div>

                            <h3 className="text-[20px] font-bold text-[#0F264D] font-['var(--font-tajawal)'] text-center">
                                إدخال رمز التحقق
                            </h3>

                            <p className="text-[14px] text-[#64748B] font-['var(--font-tajawal)'] text-center">
                                {selectedMethod === 'sms'
                                    ? 'تم ارسال رمز من +972597880605'
                                    : 'تم ارسال رمز الى ssjahany23@gmail.com'
                                }
                            </p>


                            <p className="text-[14px] text-[#64748B] font-['var(--font-tajawal)'] text-center">
                                إدخال الرمز المرسل
                            </p>


                            <div className="flex gap-[12px] justify-center" dir="ltr">
                                {verificationCode.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`code-input-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace' && !digit && index > 0) {
                                                const prevInput = document.getElementById(`code-input-${index - 1}`);
                                                prevInput?.focus();
                                            }
                                        }}
                                        className="w-[56px] h-[56px] text-center text-[24px] font-bold border-2 border-[#E2E8F0] rounded-[8px] focus:border-[#2563EB] focus:outline-none transition-colors"
                                    />
                                ))}
                            </div>


                            <button className="text-[14px] text-[#2563EB] font-['var(--font-tajawal)'] hover:underline">
                                لم يصلك الرمز؟ اعادة ارسال
                            </button>
                        </div>
                    )}


                    {currentStep === 'recovery' && (
                        <div className="flex flex-col gap-[24px]">

                            <h3 className="text-[16px] font-['var(--font-tajawal)'] text-[#0F264D] text-center">
                                احتفظ بهذه الأرقام للتحقق من استعادة حسابك
                            </h3>

                            <div className="grid grid-cols-3 gap-[16px]">
                                {recoveryCodes.map((code, index) => (
                                    <div
                                        key={index}
                                        className="h-[48px] flex items-center justify-center bg-white border border-[#E2E8F0] rounded-[8px] text-[16px] font-['var(--font-tajawal)'] text-[#0F264D]"
                                    >
                                        {code}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                <div className="flex gap-[8px] justify-end px-[40px] pb-[32px]">
                    <Button
                        variant="subtle"
                        className="w-[103px] h-[48px] rounded-[8px] bg-white border-2 border-[#E2E8F0] text-[#64748B] font-['var(--font-tajawal)'] text-[18px] font-bold hover:bg-[#F8FAFC]"
                        onClick={handleClose}
                    >
                        إلغاء
                    </Button>
                    <Button
                        variant="primary"
                        className="w-[103px] h-[48px] rounded-[8px] font-['var(--font-tajawal)'] text-[18px] font-bold"
                        onClick={
                            currentStep === 'method'
                                ? handleMethodConfirm
                                : currentStep === 'verify'
                                    ? handleVerifyConfirm
                                    : handleRecoveryConfirm
                        }
                    >
                        تأكيد
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorWizardModal;
