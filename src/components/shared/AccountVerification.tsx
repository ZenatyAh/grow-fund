'use client';

import React, { useState } from 'react';
import { AlertCircle, Camera, Check, ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Input from '@/shared/ui/components/Input';
import Image from 'next/image';

const AccountVerificationSection = () => {
    const [idType, setIdType] = useState('هوية شخصية');
    const [isBankSelected, setIsBankSelected] = useState(true);

    return (
        <div
            className="pt-[40px] px-[32px] flex flex-col gap-[24px] pb-[60px]"
            style={{ width: '1106px' }}
            dir="rtl"
        >

            <h1 className="text-[32px] font-bold text-[#0F172A] text-right leading-[140%] font-['var(--font-tajawal)'] mb-[8px]">
                توثيق الحساب
            </h1>

      
            <div className="w-[1050px] bg-white border border-[#E2E8F0] rounded-[24px] p-[32px] flex flex-col gap-[32px] shadow-sm">
                <div className="flex items-center justify-start gap-[12px]">
                    <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold leading-none">!</span>
                    </div>
                    <h3 className="text-[20px] font-bold text-[#0F172A] font-['var(--font-tajawal)'] leading-[150%] text-right">
                        معلومات الهوية الشخصية
                    </h3>
                </div>

                <div className="flex flex-col gap-[24px]">
            
                    <div className="flex flex-col gap-[8px]">
                        <Input
                            label="الاسم الكامل (كما في الهوية)"
                            inputName="fullName"
                            placeholder=""
                            variant="secondary"
                            labelClassName="!text-[#0F172A] !text-[16px] font-bold !mb-2 !block"
                            otherClassName="w-full h-[56px] !bg-white border-[#E2E8F0] border rounded-2xl"
                        />
                    </div>

               
                    <div className="flex flex-col gap-[8px]">
                        <Input
                            label="رقم الهوية"
                            inputName="idNumber"
                            placeholder=""
                            variant="secondary"
                            labelClassName="!text-[#0F172A] !text-[16px] font-bold !mb-2 !block"
                            otherClassName="w-full h-[56px] !bg-white border-[#E2E8F0] border rounded-2xl"
                        />
                    </div>

                 
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] block mb-2">
                            نوع الهوية
                        </label>
                        <div className="relative">
                            <select
                                className="w-full h-[56px] px-[20px] bg-white border border-[#E2E8F0] rounded-2xl outline-none text-[#0F172A] font-['var(--font-tajawal)'] appearance-none"
                                value={idType}
                                onChange={(e) => setIdType(e.target.value)}
                            >
                                <option value="هوية شخصية">هوية شخصية</option>
                                <option value="جواز سفر">جواز سفر</option>
                            </select>
                            <div className="absolute left-[20px] top-1/2 -translate-y-1/2 pointer-events-none">
                                <Image src="/images/chevron-down.svg" width={20} height={20} alt="arrow" />
                            </div>
                        </div>
                    </div>

             
                    <div className="flex flex-col gap-[16px]">
                        <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] block">
                            صورة الهوية
                        </label>
                        <div className="flex gap-[24px]">
                         
                            <div className="flex-1 h-[140px] border-2 border-dashed border-[#E2E8F0] rounded-[24px] flex flex-col items-center justify-center gap-[12px] cursor-pointer hover:bg-gray-50 transition-colors bg-white">
                                <div className="w-[48px] h-[48px] rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                                    <ImagePlus size={24} />
                                </div>
                                <div className="flex flex-col items-center gap-[4px]">
                                    <span className="text-[14px] font-bold text-[#0F172A] font-['var(--font-tajawal)']">الوجه الأمامي</span>
                                    <span className="text-[12px] text-[#64748B] font-['var(--font-tajawal)']">(بحد أقصى 5 ميجابايت) PNG, JPG</span>
                                </div>
                            </div>
                         
                            <div className="flex-1 h-[140px] border-2 border-dashed border-[#E2E8F0] rounded-[24px] flex flex-col items-center justify-center gap-[12px] cursor-pointer hover:bg-gray-50 transition-colors bg-white">
                                <div className="w-[48px] h-[48px] rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                                    <ImagePlus size={24} />
                                </div>
                                <div className="flex flex-col items-center gap-[4px]">
                                    <span className="text-[14px] font-bold text-[#0F172A] font-['var(--font-tajawal)']">الوجه الخلفي</span>
                                    <span className="text-[12px] text-[#64748B] font-['var(--font-tajawal)']">(بحد أقصى 5 ميجابايت) PNG, JPG</span>
                                </div>
                            </div>
                        </div>
                    </div>

                 
                    <div className="flex flex-col gap-[16px]">
                        <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] block">
                            صورة شخصية
                        </label>
                        <div className="w-full h-[140px] border-2 border-dashed border-[#E2E8F0] rounded-[24px] flex flex-col items-center justify-center gap-[12px] cursor-pointer hover:bg-gray-50 transition-colors bg-white">
                            <div className="w-[48px] h-[48px] rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                                <Camera size={24} />
                            </div>
                            <div className="flex flex-col items-center gap-[4px]">
                                <span className="text-[14px] font-bold text-[#0F172A] font-['var(--font-tajawal)']">صورة سيلفي مع الهوية</span>
                                <span className="text-[12px] text-[#64748B] font-['var(--font-tajawal)']">(بحد أقصى 5 ميجابايت) PNG, JPG</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

       
            <div className="w-[1050px] bg-white border border-[#E2E8F0] rounded-[24px] p-[32px] flex flex-col gap-[32px] mb-[40px] shadow-sm">
                <div className="flex items-center justify-start gap-[12px]">
                    <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold leading-none">!</span>
                    </div>
                    <h3 className="text-[20px] font-bold text-[#0F172A] font-['var(--font-tajawal)'] leading-[150%] text-right">
                        بيانات التحويل البنكي
                    </h3>
                </div>

                <div className="flex flex-col gap-[24px]">
                   
                    <div className="flex flex-col gap-[8px]">
                        <Input
                            label="اسم صاحب الحساب"
                            inputName="bankAccountName"
                            placeholder=""
                            variant="secondary"
                            labelClassName="!text-[#0F172A] !text-[16px] font-bold !mb-2 !block"
                            otherClassName="w-full h-[56px] !bg-white border-[#E2E8F0] border rounded-2xl"
                        />
                        <span className="text-[12px] text-[#64748B] font-['var(--font-tajawal)'] text-right mt-[-8px]">تم التحقق من الاسم عبر الهوية الوطنية</span>
                    </div>

               
                    <div className="flex flex-col gap-[8px]">
                        <Input
                            label="رقم الايبان (IBAN)"
                            inputName="iban"
                            placeholder=""
                            variant="secondary"
                            labelClassName="!text-[#0F172A] !text-[16px] font-bold !mb-2 !block"
                            otherClassName="w-full h-[56px] !bg-white border-[#E2E8F0] border rounded-2xl text-right"
                            dir="ltr"
                        />
                        <span className="text-[12px] text-[#64748B] font-['var(--font-tajawal)'] text-right mt-[-8px]">تأكد من إدخال 24 رقم بعد رمز الدولة pal</span>
                    </div>

                  
                    <div className="flex flex-col gap-[16px]">
                        <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] block">
                            اسم البنك
                        </label>
                        <div className="w-full h-[72px] px-[24px] flex items-center justify-between border border-[#E2E8F0] rounded-[16px] bg-white">
                            <div className="flex items-center gap-[12px]">
                                <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center bg-[#AC145A]">
                                    <Image src="/images/بنك فلسطين.png" width={40} height={40} alt="Bank of Palestine" />
                                </div>
                                <span className="text-[16px] font-bold text-[#0F172A] font-['var(--font-tajawal)']">بنك فلسطين</span>
                            </div>
                            <div
                                onClick={() => setIsBankSelected(!isBankSelected)}
                                className={cn(
                                    "w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center transition-all cursor-pointer",
                                    isBankSelected ? "bg-[#2563EB] border-[#2563EB] text-white" : "bg-white border-[#E2E8F0] text-transparent"
                                )}
                            >
                                <Check size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountVerificationSection;
