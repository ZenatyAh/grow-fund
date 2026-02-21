'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import {
    IconChevronDown,
    IconEdit,
    IconX
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface TagProps {
    label: string;
    onRemove?: () => void;
}

const Tag = ({ label }: { label: string }) => (
    <div
        className="flex items-center justify-center bg-[#F1F5F9] rounded-[8px]"
        style={{
            width: '85px',
            height: '32px',
            padding: '4px 8px',
            gap: '10px',
            opacity: 1
        }}
    >
        <span className="text-[16px] text-[#334155] font-normal font-['var(--font-tajawal)'] leading-[150%] text-center truncate">
            {label}
        </span>
    </div>
);

const FormField = ({ label, children, containerClassName }: { label: string, children: React.ReactNode, containerClassName?: string }) => (
    <div className={cn("flex flex-col gap-[8px]", containerClassName)}>
        <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] leading-[150%]">
            {label}
        </label>
        {children}
    </div>
);

const DonationPreferencesForm = () => {
    const [interestTags, setInterestTags] = useState(['التكنولوجيا', 'التعليم']);
    const [typeTags, setTypeTags] = useState(['طارئة', 'حملة طويلة الأمد']);
    const [targetTags, setTargetTags] = useState(['أطفال', 'طلاب']);

    return (
        <div
            className="w-full max-w-full pt-2 md:pt-4 flex flex-col gap-6"
            dir="rtl"
        >
            {/* Title */}
            <h1 className="text-[32px] font-bold text-[#0F172A] text-right leading-[140%] font-['var(--font-tajawal)'] mb-[8px]">
                تفضيلات التبرع
            </h1>

            {/* Form Container */}
            <div className="w-full bg-white border border-[#E2E8F0] rounded-[24px] p-4 md:p-6 shadow-sm">
                <form className="flex flex-col gap-6 h-full" onSubmit={(e) => e.preventDefault()}>

                    {/* Section Header */}
                    <div className="flex items-center justify-start gap-[8px] w-full">
                        <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold leading-none">!</span>
                        </div>
                        <span className="text-[20px] font-bold text-[#0F172A] font-['var(--font-tajawal)'] leading-[150%]">المعلومات الأساسية</span>
                    </div>

                    {/* Row 1: Visibility & Geography */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <FormField label="تفضيلات ظهور الحملات" containerClassName="flex-1">
                            <input
                                type="text"
                                placeholder="حملات جديدة"
                                className="w-full h-[56px] px-[16px] py-[12px] bg-white border border-[#E2E8F0] rounded-[12px] text-[16px] text-[#334155] text-right focus:outline-none focus:border-[#2563EB] font-['var(--font-tajawal)']"
                            />
                        </FormField>

                        <FormField label="النطاق الجغرافي" containerClassName="flex-1">
                            <input
                                type="text"
                                placeholder="محلي"
                                className="w-full h-[56px] px-[16px] py-[12px] bg-white border border-[#E2E8F0] rounded-[12px] text-[16px] text-[#334155] text-right focus:outline-none focus:border-[#2563EB] font-['var(--font-tajawal)']"
                            />
                        </FormField>
                    </div>

                    {/* Row 2: Areas of Interest */}
                    <FormField label="مجالات الاهتمام">
                        <div className="w-full h-[56px] px-[16px] py-[8px] bg-white border border-[#E2E8F0] rounded-[12px] flex items-center justify-start gap-[8px] overflow-x-auto no-scrollbar">
                            {interestTags.map(tag => (
                                <Tag key={tag} label={tag} />
                            ))}
                            <input
                                type="text"
                                placeholder="إضافة مجال..."
                                className="flex-1 bg-transparent border-none outline-none text-[16px] text-[#94A3B8] font-['var(--font-tajawal)'] min-w-[100px]"
                            />
                        </div>
                    </FormField>

                    {/* Row 3: Preferred Campaign Types */}
                    <FormField label="نوع الحملات المفضلة">
                        <div className="w-full h-[56px] px-[16px] py-[8px] bg-white border border-[#E2E8F0] rounded-[12px] flex items-center justify-start gap-[8px] overflow-x-auto no-scrollbar">
                            {typeTags.map(tag => (
                                <Tag key={tag} label={tag} />
                            ))}
                            <input
                                type="text"
                                placeholder="إضافة نوع..."
                                className="flex-1 bg-transparent border-none outline-none text-[16px] text-[#94A3B8] font-['var(--font-tajawal)'] min-w-[100px]"
                            />
                        </div>
                    </FormField>

                    {/* Row 4: Target Group */}
                    <FormField label="الفئة المستهدفة">
                        <div className="w-full h-[56px] px-[16px] py-[8px] bg-white border border-[#E2E8F0] rounded-[12px] flex items-center justify-start gap-[8px] overflow-x-auto no-scrollbar">
                            {targetTags.map(tag => (
                                <Tag key={tag} label={tag} />
                            ))}
                            <input
                                type="text"
                                placeholder="إضافة فئة..."
                                className="flex-1 bg-transparent border-none outline-none text-[16px] text-[#94A3B8] font-['var(--font-tajawal)'] min-w-[100px]"
                            />
                        </div>
                    </FormField>

                    {/* Row 5: Preferred Campaign Size */}
                    <FormField label="حجم الحملة المفضلة" containerClassName="w-full">
                        <input
                            type="text"
                            placeholder="أقل من 1000$"
                            className="w-full h-[56px] px-[16px] py-[12px] bg-white border border-[#E2E8F0] rounded-[12px] text-[16px] text-[#334155] text-right focus:outline-none focus:border-[#2563EB] font-['var(--font-tajawal)']"
                        />
                    </FormField>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 justify-end mt-auto">
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
                                حفظ التعديلات
                                <IconEdit size={20} />
                            </span>
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default DonationPreferencesForm;
