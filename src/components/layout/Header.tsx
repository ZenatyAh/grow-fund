'use client';
import useIsMobile from '@/shared/hooks/useIsMobile';
import DonorActions from '@/shared/ui/components/DonorActions';
import Logo from '@/shared/ui/components/Logo';
import NavbarLinks from '@/shared/ui/components/NavbarLinks';
import { useState } from 'react';

const Header = () => {
  const [donor] = useState(true);

  // Hook to determine if the device is mobile
  const isMobile = useIsMobile();

  return (
    <header className="bg-white rounded-md px-6 py-4.5 flex items-center justify-between gap-5 shadow-md">
      <Logo />
      <NavbarLinks />
      {donor ? (
        <DonorActions />
      ) : (
        <div className="flex items-center gap-3 font-bold">
          <button className="text-white bg-(--bg-bold-blue) rounded-lg py-2.5 px-7 cursor-pointer">
            تسجيل الدخول
          </button>
          <button className="text-(--bg-bold-blue) bg-(--Light-grayish-blue) rounded-lg py-2.5 px-7 border border-(--bg-slate-200) cursor-pointer">
            إنشاء حساب
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
