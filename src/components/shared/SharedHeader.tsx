'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ROUTES } from '@/shared/constants/routes';

const SharedHeader = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = useMemo(() => {
    const isCreator = pathname?.includes('campaign-creator');
    const profileHref = isCreator ? '/profile/campaign-creator/1' : '/profile/donor/1';

    return [
      {
        label: 'الملف الشخصي',
        icon: <User className="w-4 h-4" />,
        href: profileHref,
      },
      {
        label: 'الاعدادات والخصوصية',
        icon: <Settings className="w-4 h-4" />,
        href: '#',
      },
      {
        label: 'تسجيل الخروج',
        icon: <LogOut className="w-4 h-4 text-red-500" />,
        href: '#', 
        isDanger: true,
      },
    ];
  }, [pathname]);

  return (
    <header 
      className="w-full h-[116px] bg-white rounded-[16px] p-[30px_32px] flex items-center justify-between shadow-sm border border-[#E2E8F0] z-50"
    >
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
          <Link href={ROUTES.HOME} className="font-tajawal font-[400] text-[16px] text-[#0F172A] leading-[150%] whitespace-nowrap cursor-pointer hover:text-blue-600 transition-colors">
            الصفحة الرئيسية
          </Link>
          <Link href={ROUTES.CAMPAIGNS} className="font-tajawal font-[400] text-[16px] text-[#0F172A] leading-[150%] whitespace-nowrap cursor-pointer hover:text-blue-600 transition-colors">
            استكشاف الحملات
          </Link>
          <Link href={`${ROUTES.HOME}#about`} className="font-tajawal font-[400] text-[16px] text-[#0F172A] leading-[150%] whitespace-nowrap cursor-pointer hover:text-blue-600 transition-colors">
            عن المنصة
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-[24px]">

        <div className="w-[56px] h-[56px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[64px] flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
          <Bell className="w-[24px] h-[24px] text-[#94A3B8]" />
        </div>


        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-[242px] h-[56px] flex items-center justify-between p-[10px_32px] rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-[12px]">
              <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                <span className="text-[12px] text-slate-500 font-bold">م ش</span>
              </div>
              <span className="font-tajawal font-[400] text-[16px] text-[#0F172A]">
                محمد شاهين
              </span>
            </div>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-[20px] h-[20px] text-[#0F172A]" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-full bg-white border border-[#E2E8F0] rounded-[12px] shadow-lg overflow-hidden z-50 p-2"
              >
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-right font-tajawal text-[14px] transition-all duration-200 ${
                      item.isDanger 
                        ? 'text-red-500 hover:bg-red-50' 
                        : 'text-[#0F172A] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="flex-grow">{item.label}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default SharedHeader;


