import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, ChevronDown } from 'lucide-react';

const SharedHeader = () => {
  return (
    <header className="w-[1488px] h-[116px] bg-white rounded-[16px] p-[30px_32px] flex items-center justify-between shadow-sm border border-[#E2E8F0] mx-auto">
    
      <div className="flex items-center gap-[303px]">

        <div className="w-[98px] h-[40px] flex items-center gap-[10px]">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="opacity-100"
          />
          <span className="font-tajawal font-[400] text-[18px] text-[#0F172A] leading-[160%]">
            نجومي
          </span>
        </div>

   
        <nav className="w-[360px] h-[24px] flex items-center gap-[24px]">
          <span className="font-tajawal font-[400] text-[16px] text-[#0F172A] leading-[150%] whitespace-nowrap cursor-pointer">
            الصفحة الرئيسية
          </span>
          <span className="font-tajawal font-[400] text-[16px] text-[#0F172A] leading-[150%] whitespace-nowrap cursor-pointer">
            استكشاف الحملات
          </span>
          <span className="font-tajawal font-[400] text-[16px] text-[#0F172A] leading-[150%] whitespace-nowrap cursor-pointer">
            عن المنصة
          </span>
        </nav>
      </div>

      <div className="w-[326px] h-[56px] flex items-center gap-[24px] pr-[6px]">
    
        <div className="w-[56px] h-[56px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[64px] flex items-center justify-center cursor-pointer">
          <Bell className="w-[24px] h-[24px] text-[#94A3B8]" />
        </div>
        <div className="w-[242px] h-[56px] flex items-center justify-between p-[10px_32px] rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] cursor-pointer">
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
              <span className="text-[12px] text-slate-500 font-bold">م ش</span>
            </div>
            <span className="font-tajawal font-[400] text-[16px] text-[#0F172A]">
              محمد شاهين
            </span>
          </div>
          <ChevronDown className="w-[20px] h-[20px] text-[#0F172A]" />
        </div>
      </div>
    </header>
  );
};

export default SharedHeader;
