'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaRegBell } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { 
  MdPerson, 
  MdSettings, 
  MdSecurity, 
  MdLogout 
} from 'react-icons/md';
import { ROUTES } from '@/shared/constants/routes';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const DonorActions = () => {
  const userName = "أحمد محمد"; // Placeholder name as requested ("السهم الذي بجانب الاسم")

  const menuItems = [
    {
      label: 'الملف الشخصي',
      icon: <MdPerson size={22} />,
      href: '/profile/donor/1',
    },
    {
      label: 'الاعدادت',
      icon: <MdSettings size={22} />,
      href: '#',
    },
    {
      label: 'الخصوصية وتسجيل الخروج',
      icon: (
        <div className="flex items-center gap-0.5">
          <MdSecurity size={18} />
          <MdLogout size={18} />
        </div>
      ),
      href: '#',
    },
  ];

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

      <Popover>
        <PopoverTrigger asChild>
          <button
            className="bg-(--Light-grayish-blue) border-2 border-(--bg-bold-blue) text-base text-(--bg-bold-blue) font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-(--bg-bold-blue) hover:text-white transition-all duration-300 cursor-pointer group outline-none"
            aria-label="الملف الشخصي"
          >
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-blue-200 bg-white flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Profile Icon"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="font-['var(--font-tajawal)']">{userName}</span>
            <FaAngleDown 
              size={16} 
              className="transition-transform duration-300 group-data-[state=open]:rotate-180"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent 
          align="end" 
          sideOffset={12}
          className="w-72! bg-white p-2 rounded-[24px] border border-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex flex-col gap-1" dir="rtl">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all font-bold font-['var(--font-tajawal)'] group/item"
              >
                <span className="text-blue-600 transition-colors group-hover/item:text-blue-700">
                  {item.icon}
                </span>
                <span className="text-[17px]">{item.label}</span>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DonorActions;
