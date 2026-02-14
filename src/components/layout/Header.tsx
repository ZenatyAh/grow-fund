'use client';
import useIsMobile from '@/shared/hooks/useIsMobile';
import DonorActions from '@/shared/ui/components/DonorActions';
import Logo from '@/shared/ui/components/Logo';
import NavbarLinks from '@/shared/ui/components/NavbarLinks';
import { ROUTES } from '@/shared/constants/routes';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';

const Header = () => {
  const { isAuthenticated, user, clearAuthData } = useAuth();

  // Hook to determine if the device is mobile
  const isMobile = useIsMobile();

  return (
    <header className="bg-white rounded-md px-6 py-4.5 flex items-center justify-between gap-5 shadow-md">
      <Logo />
      <NavbarLinks />
      {isAuthenticated ? (
        <div className="flex items-center gap-3 font-bold">
          <span className="text-sm text-gray-700 hidden md:inline">
            {user?.firstName} {user?.lastName}
          </span>
          <button
            onClick={clearAuthData}
            className="text-white bg-(--bg-bold-blue) rounded-lg py-2.5 px-7 cursor-pointer"
          >
            تسجيل الخروج
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 font-bold">
          <Link
            href={ROUTES.LOGIN}
            className="text-white bg-(--bg-bold-blue) rounded-lg py-2.5 px-7 cursor-pointer"
          >
            تسجيل الدخول
          </Link>
          <Link
            href={ROUTES.REGISTER}
            className="text-(--bg-bold-blue) bg-(--Light-grayish-blue) rounded-lg py-2.5 px-7 border border-(--bg-slate-200) cursor-pointer"
          >
            إنشاء حساب
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
