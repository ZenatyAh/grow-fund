'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import {
    IconEye,
    IconEyeOff,
    IconEdit,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const PasswordInput = ({ label, placeholder }: { label: string, placeholder: string }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-[8px]">
            <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] leading-[150%]">
                {label}
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="w-full h-[56px] px-[16px] py-[12px] bg-white border border-[#E2E8F0] rounded-[12px] text-[16px] text-[#334155] text-right focus:outline-none focus:border-[#2563EB] font-['var(--font-tajawal)']"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-[16px] top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                >
                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
            </div>
        </div>
    );
};

const ChangePasswordForm = () => {
    return (
        <div
            className="h-[947px] pt-[40px] px-[32px] flex flex-col gap-[24px]"
            style={{ width: '1106px' }}
            dir="rtl"
        >
            {/* Title */}
            <h1 className="text-[32px] font-bold text-[#0F172A] text-right leading-[140%] font-['var(--font-tajawal)'] mb-[8px]">
                تغيير كلمة المرور
            </h1>

            {/* Form Container */}
            <div className="w-[1050px] h-[753px] bg-white border border-[#E2E8F0] rounded-[24px] p-[32px] shadow-sm opacity-100 rotate-0">
                <form className="flex flex-col gap-[24px] h-full" onSubmit={(e) => e.preventDefault()}>

                    {/* Section Header */}
                    <div className="flex items-center justify-start gap-[8px] w-full">
                        <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold leading-none">!</span>
                        </div>
                        <span className="text-[20px] font-bold text-[#0F172A] font-['var(--font-tajawal)'] leading-[150%]">المعلومات الأساسية</span>
                    </div>

                    {/* Current Password */}
                    <PasswordInput
                        label="كلمة المرور الحالية"
                        placeholder="***************"
                    />

                    {/* New Password */}
                    <div className="flex flex-col gap-[8px]">
                        <PasswordInput
                            label="كلمة المرور الجديدة"
                            placeholder="***************"
                        />
                        {/* Password Strength Indicator */}
                        <div className="flex gap-[8px] mt-[4px]">
                           
                            <div className="flex-1 h-[4px] rounded-full bg-[#22C55E]"></div>
                            <div className="flex-1 h-[4px] rounded-full bg-[#22C55E]"></div>
                            <div className="flex-1 h-[4px] rounded-full bg-[#22C55E]"></div>
                             <div className="flex-1 h-[4px] rounded-full bg-[#E2E8F0]"></div>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <PasswordInput
                        label="تأكيد كلمة المرور"
                        placeholder="***************"
                    />

                    {/* Requirements Box */}
                    <div className="bg-[#F8FAFC] p-[24px] rounded-[16px] border border-[#F1F5F9]">
                        <h4 className="text-[16px] font-bold text-[#000000] mb-[12px] font-['var(--font-tajawal)'] leading-[145%] text-right">شروط كلمة المرور:</h4>
                        <ul className="flex flex-col gap-[8px]">
                            {[
                                "8 أحرف على الأقل .",
                                "يجب أن تحتوي على حرف كبير واحد على الأقل .",
                                "يجب أن تحتوي على رمز خاص واحد (@#$%...)"
                            ].map((req, i) => (
                                <li key={i} className="flex items-center gap-[8px] text-[14px] text-[#000000] font-bold font-['var(--font-tajawal)'] leading-[145%] text-right">
                                    <div className="w-[6px] h-[6px] rounded-full bg-[#22C55E]"></div>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-[16px] justify-end mt-auto">
                        <Button
                            variant="subtle"
                            className="w-[101px] h-[56px] flex items-center justify-center border border-[#E2E8F0] bg-white text-[#334155] rounded-[12px]"
                        >
                            إلغاء
                        </Button>

                        <Button
                            variant="primary"
                            className="w-[250px] h-[56px] flex items-center justify-center rounded-[12px] px-6"
                        >
                            <span className="flex items-center gap-2 font-bold text-[18px]">
                                تغيير كلمة المرور
                                <IconEdit size={20} />
                            </span>
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
