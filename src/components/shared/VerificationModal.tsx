'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { cn, VerificationModalProps } from '@/lib/utils';
import VerificationCodeInput from './VerificationCodeInput';


const VerificationModal = ({ isOpen, onClose, onConfirm }: VerificationModalProps) => {
    const [selectedMethod, setSelectedMethod] = useState<'phone' | 'email'>('phone');
    const [step, setStep] = useState<'select' | 'verify'>('select');

    const handleConfirmMethod = () => {
        setStep('verify');
    };

    const handleVerifyCode = () => {
        onConfirm(selectedMethod);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
    
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

      
            <div
                className="relative w-[1114px] bg-white rounded-[8px] border-2 border-[#737373] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
                dir="rtl"
            >
           
                <div className="h-[99px] flex items-center justify-center border-b-2 border-[#3F3F3F] px-[40px] py-[32px]">
                    <h2 className="text-[24px] font-bold text-[#0F264D] font-['var(--font-tajawal)'] leading-[145%]">
                        {step === 'select' ? 'اختيار طريقة التحقق' : `تحقق من ${selectedMethod === 'phone' ? 'رقم هاتفك' : 'بريدك الإلكتروني'}`}
                    </h2>
                </div>

                {step === 'select' ? (
                    <>
                     
                        <div className="h-[286px] px-[40px] py-[24px] flex flex-col gap-[24px]">
                            <h3 className="text-[24px] font-bold text-[#0F264D] font-['Almarai'] text-right leading-[30px]">طريقة التأكيد</h3>

                            <div className="flex flex-col gap-[24px]">
                                <label
                                    className={cn(
                                        "flex items-center h-[80px] px-[32px] py-[16px] rounded-[16px] border-2 cursor-pointer transition-all",
                                        selectedMethod === 'phone' ? "border-[#2563EB] bg-[#F0F7FF]" : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                                    )}
                                    onClick={() => setSelectedMethod('phone')}
                                >
                                    <div className={cn(
                                        "w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 ml-[16px]",
                                        selectedMethod === 'phone' ? "border-[#2563EB]" : "border-[#94A3B8]"
                                    )}>
                                        {selectedMethod === 'phone' && <div className="w-[14px] h-[14px] rounded-full bg-[#2563EB]" />}
                                    </div>

                                    <div className="flex flex-col gap-[4px] items-start">
                                        <span className="text-[18px] font-bold text-[#0F264D] font-['var(--font-tajawal)']">رقم الهاتف</span>
                                        <span className="text-[14px] text-[#64748B] font-['var(--font-tajawal)'] leading-[1.4]">سيتم ارسال كود التحقق الى رقم الهاتف</span>
                                    </div>
                                </label>

                                <label
                                    className={cn(
                                        "flex items-center h-[80px] px-[32px] py-[16px] rounded-[16px] border-2 cursor-pointer transition-all",
                                        selectedMethod === 'email' ? "border-[#2563EB] bg-[#F0F7FF]" : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                                    )}
                                    onClick={() => setSelectedMethod('email')}
                                >
                                    <div className={cn(
                                        "w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0 ml-[16px]",
                                        selectedMethod === 'email' ? "border-[#2563EB]" : "border-[#94A3B8]"
                                    )}>
                                        {selectedMethod === 'email' && <div className="w-[14px] h-[14px] rounded-full bg-[#2563EB]" />}
                                    </div>

                                    <div className="flex flex-col gap-[4px] items-start">
                                        <span className="text-[18px] font-bold text-[#0F264D] font-['var(--font-tajawal)']">البريد الالكتروني</span>
                                        <span className="text-[14px] text-[#64748B] font-['var(--font-tajawal)'] leading-[1.4]">سيتم ارسال كود التحقق الى البريد الالكتروني</span>
                                    </div>
                                </label>
                            </div>
                        </div>

               
                        <div className="h-[120px] flex gap-[8px] justify-end px-[40px] pb-[24px] items-center">
                            <Button
                                variant="subtle"
                                className="w-[103px] h-[48px] rounded-[8px] bg-white border-2 border-[#E2E8F0] text-[#64748B] font-['var(--font-tajawal)'] text-[18px] font-bold leading-[160%] text-center hover:bg-[#F8FAFC] px-[32px] py-[16px]"
                                onClick={onClose}
                            >
                                إلغاء
                            </Button>
                            <Button
                                variant="primary"
                                className="w-[103px] h-[48px] rounded-[8px] font-['var(--font-tajawal)'] text-[18px] font-bold leading-[160%] text-center shadow-sm px-[32px] py-[16px]"
                                onClick={handleConfirmMethod}
                            >
                                تأكيد
                            </Button>
                        </div>
                    </>
                ) : (
                    <VerificationCodeInput
                        method={selectedMethod}
                        onVerify={handleVerifyCode}
                        onCancel={onClose}
                    />
                )}
            </div>
        </div>
    );
};

export default VerificationModal;
