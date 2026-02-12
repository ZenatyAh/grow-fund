'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import {
  IconCalendar,
  IconChevronDown,
  IconEdit
} from '@tabler/icons-react';
import { cn, InputProps } from '@/lib/utils';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import VerificationModal from './VerificationModal';


const FormInput = ({ label, icon, className, containerClassName, ...props }: InputProps) => (
  <div className={cn("flex flex-col gap-[8px]", containerClassName)}>
    <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] leading-[150%]">
      {label}
    </label>
    <div className="relative">
      <input
        className={cn(
          "h-[48px] px-[16px] py-[12px] bg-white border border-[#E2E8F0] rounded-[8px]",
          "text-[16px] text-[#334155] text-right focus:outline-none focus:border-[#2563EB] transition-colors",
          "placeholder:text-[#94A3B8] font-['var(--font-tajawal)'] overflow-hidden",
          icon && "pl-[48px]",
          className
        )}
        style={{
          paddingTop: '12px',
          paddingRight: '16px',
          paddingBottom: '8px',
          paddingLeft: icon ? '48px' : '12px',
        }}
        {...props}
      />
      {icon && (
        <div className="absolute left-[16px] top-1/2 -translate-y-1/2 text-[#64748B]">
          {icon}
        </div>
      )}
    </div>
  </div>
);

const EditProfileForm = () => {
  const [phone, setPhone] = useState('');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

  return (
    <div
      className="h-[947px] pt-[40px] px-[32px] flex flex-col gap-[24px]"
      style={{ width: '1106px' }}
      dir="rtl"
    >
      {/* Title */}
      <h1 className="text-[32px] font-bold text-[#0F172A] text-right leading-[140%] font-['var(--font-tajawal)'] mb-[8px]">
        تعديل بياناتي
      </h1>

      {/* Form Container */}
      <div className="w-[1050px] h-[818px] bg-white border border-[#E2E8F0] rounded-[24px] p-[32px] shadow-sm opacity-100 rotate-0">
        <form className="flex flex-col gap-[24px]"
          onSubmit={(e) => e.preventDefault()}>

          {/* Section Header */}
          <div className="flex items-center justify-start gap-[8px] w-full">
            <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold leading-none">!</span>
            </div>
            <span className="text-[20px] font-bold text-[#0F172A] font-['var(--font-tajawal)'] leading-[150%]">المعلومات الأساسية</span>
          </div>

          {/* Name Row */}
          <div className="flex gap-[24px]">
            <FormInput
              label="الاسم الأول"
              containerClassName="w-[485px] h-[86px]"
              className="w-full"
            />
            <FormInput
              label="الاسم الأخير"
              containerClassName="w-[485px] h-[86px]"
              className="w-full"
            />
          </div>

          {/* DOB & Gender Row */}
          <div className="flex gap-[24px]">
            <div className="w-[485px] h-[86px] flex flex-col gap-[8px]">
              <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] leading-[150%]">تاريخ الميلاد</label>
              <div className="relative w-full h-[48px] px-[16px] py-[12px] bg-white border border-[#E2E8F0] rounded-[12px] flex items-center gap-[8px] cursor-pointer">
                <input
                  type="date"
                  placeholder="22/04/2001"
                  className="flex-1 bg-transparent border-none outline-none text-[16px] text-[#334155] text-right font-['var(--font-tajawal)'] h-full"
                />
              </div>
            </div>

            <div className="w-[485px] h-[86px] flex flex-col gap-[8px]">
              <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] leading-[150%]">الجنس</label>
              <div className="relative w-full h-[48px] px-[16px] py-[12px] bg-white border border-[#E2E8F0] rounded-[12px] flex items-center gap-[8px] cursor-pointer">
                <IconChevronDown size={20} className="text-[#94A3B8]" />
                <span className="flex-1 text-[16px] text-[#334155] text-right font-['var(--font-tajawal)']">ذكر</span>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="w-[986px] h-[86px] flex flex-col gap-[8px]">
            <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] leading-[150%]">رقم الهاتف</label>
            <div className="flex gap-[12px] items-end relative">
              <style>{`
                .phone-input-container .flag {
                  transform: scale(1.4);
                  margin-left: 8px !important;
                }
                .phone-input-container .selected-flag {
                  width: 65px !important;
                  padding: 0 12px 0 15px !important;
                }
              `}</style>
              <div className="flex-1 phone-input-container" dir="ltr">
                <PhoneInput
                  country={'ps'}
                  value={phone}
                  onChange={setPhone}
                  enableSearch={true}
                  inputStyle={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    fontSize: '18px',
                    fontFamily: 'Tajawal',
                    paddingLeft: '75px',
                    backgroundColor: '#FFFFFF',
                    color: '#0F172A',
                    fontWeight: '500'
                  }}
                  buttonStyle={{
                    borderRadius: '12px 0 0 12px',
                    border: '1px solid #E2E8F0',
                    borderRight: 'none',
                    backgroundColor: 'white',
                    width: '65px'
                  }}
                />
              </div>
              <Button
                variant="primary"
                className="h-[48px] px-[24px] min-w-[117px]"
                onClick={() => setIsVerificationModalOpen(true)}
              >
                تحقق
              </Button>
            </div>
          </div>

          {/* Email */}
          <FormInput
            label="البريد الإلكتروني"
            containerClassName="w-[986px] h-[86px]"
            className="w-full text-left"
            dir="ltr"
          />

          {/* About Me */}
          <div className="w-[986px] h-[162px] flex flex-col gap-[8px]">
            <label className="text-[20px] font-bold text-[#0F172A] text-right font-['var(--font-tajawal)'] leading-[150%]">نبذة عني</label>
            <textarea
              placeholder="اكتب نبذة مختصرة عنك وعن اهتماماتك"
              className="w-full h-[124px] px-[16px] py-[12px] bg-white border border-[#E2E8F0] rounded-[12px] text-[16px] text-[#334155] text-right focus:outline-none focus:border-[#2563EB] font-['var(--font-tajawal)'] resize-none"
            />
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
                حفظ التعديلات
                <IconEdit size={20} />
              </span>
            </Button>
          </div>

        </form>
      </div>

      <VerificationModal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        onConfirm={(method) => {
          console.log('Selected verification method:', method);
          setIsVerificationModalOpen(false);
        }}
      />
    </div>
  );
};

export default EditProfileForm;
