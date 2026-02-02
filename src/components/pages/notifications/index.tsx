'use client';

import { cn } from '@/lib/utils';
import { usePersistedState } from '@/shared/hooks/usePersistedState';
import EmptyState from '@/shared/ui/components/EmptyState';
import NotificationItem from '@/shared/ui/components/NotificationItem';
import { ViewMode } from '@/utils/types';
import { Star } from 'lucide-react';
import { FaRegBell } from 'react-icons/fa';

const NotificationsPage = () => {
  // Notifications View Mode
  const [viewMode, setViewMode] = usePersistedState<ViewMode>(
    'notifiactions_view_mode',
    'normal'
  );

  const notificationsData = [
    {
      id: 1,
      date: 'اليوم',
      notifications: [
        {
          id: 1,
          title: 'تحقّق أثر جديد لتبرعك',
          description:
            'تبرعك ساعد في توفير مياه نظيفة لعائلة كاملة لمدة أسبوع.',
          time: 'منذ ساعة',
          Icon: Star,
        },
      ],
    },
    {
      id: 2,
      date: 'الأمس',
      notifications: [
        {
          id: 1,
          title: 'تحقّق أثر جديد لتبرعك',
          description:
            'تبرعك ساعد في توفير مياه نظيفة لعائلة كاملة لمدة أسبوع.',
          time: 'منذ ساعة',
          Icon: Star,
        },
      ],
    },
  ];

  return (
    <div className="relative max-w-247 mx-auto py-8">
      <div className="px-3">
        <h1 className="text-(--text-primary) text-3xl font-bold">الاشعارات</h1>

        <div className="flex items-center justify-between gap-5 mt-3">
          <div className="flex items-center gap-3">
            <button className="cursor-pointer bg-(--bg-bold-blue) rounded-full text-white p-2">
              الكل
            </button>
            <button className="cursor-pointer">غير مقروء</button>
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

      {notificationsData.length === 0 ? (
        <EmptyState
          Icon={FaRegBell}
          iconSize={70}
          text="لا توجد إشعارات بعد"
          iconClassName="text-(--bg-bold-blue)"
        />
      ) : (
        <>
          <div
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                : 'space-y-2'
            )}
          >
            {notificationsData.map((section) => (
              <div key={section.id} className="mt-5">
                <span className="block text-(--text-primary) text-base font-bold px-3 mb-3">
                  {section.date}
                </span>

                <ul className="space-y-2">
                  {section.notifications.map((item) => (
                    <NotificationItem key={item.id} {...item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button className="bg-(--bg-bold-blue) w-full text-white font-bold py-3 rounded-lg mt-6 cursor-pointer hover:bg-(--text-primary) transition-all duration-300">
            عرض الاشعارات السابقة
          </button>
        </>
      )}
    </div>
  );
};

export default NotificationsPage;
