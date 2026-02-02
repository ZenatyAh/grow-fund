'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaRegBell } from 'react-icons/fa';
import { ROUTES } from '@/shared/constants/routes';

const DonorActions = () => {
  return (
    <div className="flex items-center gap-6">
      <Link
        href={ROUTES.NOTIFICATIONS}
        className="w-11 h-11 bg-(--Light-grayish-blue) border border-(--bg-slate-200) flex items-center justify-center rounded-full group hover:bg-(--bg-bold-blue)"
        aria-label="الإشعارات"
      >
        <FaRegBell
          size={23}
          className="group-hover:text-white! transition-colors duration-300"
          color="var(--bg-bold-blue)"
        />
      </Link>
      <Link
        href="/profile"
        className="bg-(--Light-grayish-blue) border-2 border-(--bg-bold-blue) text-base text-(--bg-bold-blue) font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-(--bg-bold-blue) hover:text-white transition-all duration-300"
        aria-label="الملف الشخصي"
      >
        <Image
          src="/images/logo.png"
          alt="Profile Icon"
          width={28}
          height={28}
        />
        الملف الشخصي
      </Link>
    </div>
  );
};

export default DonorActions;
