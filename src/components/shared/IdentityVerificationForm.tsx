'use client';

import React from 'react';
import { cn, type IdentityVerificationFormProps } from '@/lib/utils';
import { Info, Image as ImageIcon, FileText, User, Calendar, ChevronDown } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';

export const IdentityVerificationForm: React.FC<IdentityVerificationFormProps> = ({
  type,
  onSubmit,
  className,
}) => {
  const isIndividual = type === 'individual';

  return (
    <div 
      className={cn(
        'bg-white rounded-[24px] p-[32px] pb-[40px] flex flex-col shadow-sm text-right',
        isIndividual ? 'w-[1092px] h-[882px] gap-[24px]' : 'w-full max-w-[952px] gap-8',
        className
      )} 
      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%23CBD5E1' stroke-width='1' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center text-white">
            <Info size={14} />
          </div>
          <h2 className="text-[16px] font-[700] text-[#0F172A] font-tajawal leading-[150%]">معلومات الهوية الشخصية</h2>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {isIndividual ? (
          <>
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-[700] text-[#0F172A] font-tajawal leading-[150%]">الاسم الكامل (كما في الهوية)</label>
              <input
                type="text"
                placeholder="محمد وسام سليمان شاهين"
                className="w-full h-14 rounded-lg px-4 text-[#0F172A] focus:outline-none focus:border-[#2563EB] placeholder:text-[#94A3B8]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23CBD5E1' stroke-width='1' stroke-dasharray='4%2c 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}
              />
            </div>

            {/* ID Number */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-[700] text-[#0F172A] font-tajawal leading-[150%]">رقم الهوية</label>
              <input
                type="text"
                placeholder="407146935"
                className="w-full h-14 rounded-lg px-4 text-[#0F172A] focus:outline-none focus:border-[#2563EB] placeholder:text-[#94A3B8]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23CBD5E1' stroke-width='1' stroke-dasharray='4%2c 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3csvg%3e")` }}
              />
            </div>

            {/* ID Type */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-[700] text-[#0F172A] font-tajawal leading-[150%]">نوع الهوية</label>
              <div className="relative">
                <select 
                  className="w-full h-14 rounded-lg px-4 text-[#0F172A] appearance-none focus:outline-none focus:border-[#2563EB] bg-white"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23CBD5E1' stroke-width='1' stroke-dasharray='4%2c 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}
                >
                  <option>هوية شخصية</option>
                  <option>جواز سفر</option>
                  <option>رخصة قيادة</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748B]">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* ID Images */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[16px] font-[700] text-[#0F172A] font-tajawal leading-[150%]">صورة الهوية</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                <FileUpload 
                  uploadClassName="border-none" 
                  emptyStateClassName="bg-white dark:bg-white w-[510px] h-[170px] border border-dashed border-[#E2E8F0] rounded-[12px] p-[24px]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23E2E8F0FF' stroke-width='1' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}
                >
                  <div className="flex flex-col items-center gap-[8px]">
                    <div className="w-[60px] h-[60px] rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] p-[28px]">
                      <ImageIcon size={24} />
                    </div>
                    <span className="text-[14px] font-[700] text-[#0F172A] font-tajawal">الوجه الأمامي</span>
                    <span className="text-[12px] text-[#94A3B8] font-tajawal">(بحد أقصى 5 ميجابايت) PNG. JPG</span>
                  </div>
                </FileUpload>
                <FileUpload 
                  uploadClassName="border-none" 
                  emptyStateClassName="bg-white dark:bg-white w-[510px] h-[170px] border border-dashed border-[#E2E8F0] rounded-[12px] p-[24px]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23E2E8F0FF' stroke-width='1' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}
                >
                  <div className="flex flex-col items-center gap-[8px]">
                    <div className="w-[60px] h-[60px] rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] p-[28px]">
                      <ImageIcon size={24} />
                    </div>
                    <span className="text-[14px] font-[700] text-[#0F172A] font-tajawal">الوجه الخلفي</span>
                    <span className="text-[12px] text-[#94A3B8] font-tajawal">(بحد أقصى 5 ميجابايت) PNG. JPG</span>
                  </div>
                </FileUpload>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[16px] font-[700] text-[#0F172A] font-tajawal leading-[150%]">صورة شخصية</label>
              <FileUpload 
                uploadClassName="border-none" 
                emptyStateClassName="bg-white dark:bg-white w-full h-[170px] border border-dashed border-[#E2E8F0] rounded-[12px] p-[24px]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23E2E8F0FF' stroke-width='1' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}
              >
                <div className="flex flex-col items-center gap-[8px]">
                  <div className="w-[60px] h-[60px] rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] p-[28px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
                      <path d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-[14px] font-[700] text-[#0F172A] font-tajawal">صورة سيلفي مع الهوية</span>
                  <span className="text-[12px] text-[#94A3B8] font-tajawal">(بحد أقصى 5 ميجابايت) PNG. JPG</span>
                </div>
              </FileUpload>
            </div>
          </>
        ) : (
          <>
            {/* Institution Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-bold text-[#0F172A] font-tajawal">اسم المؤسسة الرسمي</label>
              <input
                type="text"
                placeholder="الجمعية الفلسطينة"
                className="w-full h-14 rounded-lg px-4 text-[#0F172A] focus:outline-none focus:border-[#2563EB] placeholder:text-[#94A3B8]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23CBD5E1' stroke-width='1' stroke-dasharray='4%2c 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}
              />
            </div>

            {/* Registration Number */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-bold text-[#0F172A] font-tajawal">رقم الترخيص / السجل</label>
              <input
                type="text"
                placeholder="1010XXXX"
                className="w-full h-14 rounded-lg px-4 text-[#0F172A] focus:outline-none focus:border-[#2563EB] placeholder:text-[#94A3B8]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23CBD5E1' stroke-width='1' stroke-dasharray='4%2c 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}
              />
            </div>

            {/* Foundation Date */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-bold text-[#0F172A] font-tajawal">تاريخ التأسيس</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="22/04/2001"
                  className="w-full h-14 rounded-lg px-4 text-[#0F172A] focus:outline-none focus:border-[#2563EB] placeholder:text-[#94A3B8]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23CBD5E1' stroke-width='1' stroke-dasharray='4%2c 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")` }}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]">
                  <Calendar size={20} />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="flex flex-col gap-6 mt-4">
              {/* Registration Certificate */}
              <div className="flex flex-col gap-2">
                <label className="text-[18px] font-bold text-[#0F172A] font-tajawal">شهادة التسجيل أو الرخصة</label>
                <FileUpload uploadClassName="border-[#E2E8F0]" emptyStateClassName="bg-[#F8FAFC] min-h-[160px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#2563EB]">
                      <FileText size={20} />
                    </div>
                    <span className="text-[14px] font-bold text-[#0F172A]">شهادة التسجيل أو الرخصة</span>
                    <span className="text-[12px] text-[#94A3B8]">(بحد أقصى 5 ميجابايت) PNG. PDF. JPG</span>
                  </div>
                </FileUpload>
              </div>

              {/* Authorized Person ID */}
              <div className="flex flex-col gap-2">
                <label className="text-[18px] font-bold text-[#0F172A] font-tajawal">هوية المفوض (مدير الحساب)</label>
                <FileUpload uploadClassName="border-[#E2E8F0]" emptyStateClassName="bg-[#F8FAFC] min-h-[160px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#2563EB]">
                      <ImageIcon size={20} />
                    </div>
                    <span className="text-[14px] font-bold text-[#0F172A]">صورة الوجه الأمامي من الهوية الشخصية فقط</span>
                    <span className="text-[12px] text-[#94A3B8]">(بحد أقصى 5 ميجابايت) PNG. JPG</span>
                  </div>
                </FileUpload>
              </div>

              {/* Authorized Person Selfie */}
              <div className="flex flex-col gap-2">
                <label className="text-[18px] font-bold text-[#0F172A] font-tajawal">صورة شخصية للمفوض (مدير الحساب)</label>
                <FileUpload uploadClassName="border-[#E2E8F0]" emptyStateClassName="bg-[#F8FAFC] min-h-[160px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#2563EB]">
                      <User size={20} />
                    </div>
                    <span className="text-[14px] font-bold text-[#0F172A]">صورة سيلفي مع الهوية</span>
                    <span className="text-[12px] text-[#94A3B8]">(بحد أقصى 5 ميجابايت) PNG. JPG</span>
                  </div>
                </FileUpload>
              </div>

              {/* Authorization Letter */}
              <div className="flex flex-col gap-2">
                <label className="text-[18px] font-bold text-[#0F172A] font-tajawal">خطاب التفويض</label>
                <FileUpload uploadClassName="border-[#E2E8F0]" emptyStateClassName="bg-[#F8FAFC] min-h-[160px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#2563EB]">
                      <FileText size={20} />
                    </div>
                    <span className="text-[14px] font-bold text-[#0F172A]">خطاب التفويض الرسمي للمؤسسة</span>
                    <span className="text-[12px] text-[#94A3B8]">(بحد أقصى 5 ميجابايت) PNG. PDF. JPG</span>
                  </div>
                </FileUpload>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
