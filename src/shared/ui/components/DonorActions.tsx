'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaRegBell } from 'react-icons/fa';
import { Star } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/components/popover';

import NotificationItem from '@/shared/ui/components/NotificationItem';
import { usePersistedState } from '@/shared/hooks/usePersistedState';
import { ViewMode } from '@/utils/types';

const DonorActions = () => {
  // Notifications View Mode
  const [viewMode, setViewMode] = usePersistedState<ViewMode>(
    'notifiactions_view_mode',
    'normal'
  );

  const notifications = [
    {
      id: 1,
      title: 'تحقّق أثر جديد لتبرعك',
      description: 'تبرعك ساعد في توفير مياه نظيفة لعائلة كاملة لمدة أسبوع.',
      time: 'منذ ساعة',
      Icon: Star,
    },
    {
      id: 2,
      title: 'تحقّق أثر جديد لتبرعك',
      description: 'تبرعك ساعد في توفير مياه نظيفة لعائلة كاملة لمدة أسبوع.',
      time: 'منذ ساعة',
      Icon: Star,
    },
  ];

  return (
    <div className="flex items-center gap-6">
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-11 h-11 bg-(--Light-grayish-blue) border border-(--bg-slate-200) flex items-center justify-center rounded-full group hover:bg-(--bg-bold-blue)">
            <FaRegBell
              size={23}
              className="group-hover:text-white! transition-colors duration-300"
              color="var(--bg-bold-blue)"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="px-3">
            <h2 className="text-(--text-primary) text-xl font-bold">
              الاشعارات
            </h2>

            <div className="flex items-center justify-between gap-5 mt-3">
              <div className="flex items-center gap-3">
                <span>الكل</span>
                <span>غير مقروء</span>
              </div>

              <button
                onClick={() =>
                  setViewMode((prev) => (prev === 'normal' ? 'grid' : 'normal'))
                }
                className="relative p-1.5 bg-(--bg-light-blue) flex items-center justify-center rounded-full cursor-pointer"
              >
                <div className="grid grid-cols-2 gap-0.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full border border-(--bg-bold-blue)"
                    />
                  ))}
                </div>
              </button>
            </div>
          </div>

          <div className="mt-5">
            <span className="block text-(--text-primary) text-base font-bold px-3 mb-3">
              اليوم
            </span>

            <ul
              className={`space-y-2 ${
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-2'
                  : ''
              }`}
            >
              {notifications.map((item) => (
                <NotificationItem key={item.id} {...item} />
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>

      <Link
        href="/profile"
        className="bg-(--Light-grayish-blue) border-2 border-(--bg-bold-blue) text-base text-(--bg-bold-blue) font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-(--bg-bold-blue) hover:text-white transition-all duration-300"
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
