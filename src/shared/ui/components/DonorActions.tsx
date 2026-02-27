'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaRegBell } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import { 
  MdPerson, 
  MdSettings, 
  MdLogout 
} from 'react-icons/md';
import { ROUTES } from '@/shared/constants/routes';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type DonorActionsProps = {
  userName?: string;
  profileHref?: string;
  onLogout?: () => void;
};

type MenuLinkItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  isDanger?: boolean;
};

type MenuActionItem = {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  isDanger?: boolean;
};

const DonorActions = ({
  userName = 'المستخدم',
  profileHref = '#',
  onLogout,
}: DonorActionsProps) => {
  const menuItems: Array<MenuLinkItem | MenuActionItem> = [
    {
      label: 'الملف الشخصي',
      icon: <MdPerson size={22} />,
      href: profileHref,
    },
    {
      label: 'الإعدادات',
      icon: <MdSettings size={22} />,
      href: '#',
    },
    {
      label: 'تسجيل الخروج',
      icon: <MdLogout size={22} />,
      action: onLogout ?? (() => {}),
      isDanger: true,
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
            {menuItems.map((item, index) =>
              'action' in item ? (
                <button
                  key={index}
                  type="button"
                  onClick={item.action}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold font-['var(--font-tajawal)'] group/item w-full text-right ${
                    item.isDanger
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      item.isDanger
                        ? 'text-red-500'
                        : 'text-blue-600 group-hover/item:text-blue-700'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[17px]">{item.label}</span>
                </button>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold font-['var(--font-tajawal)'] group/item ${
                    item.isDanger
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      item.isDanger
                        ? 'text-red-500'
                        : 'text-blue-600 group-hover/item:text-blue-700'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-[17px]">{item.label}</span>
                </Link>
              )
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DonorActions;
