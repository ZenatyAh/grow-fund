import { cn } from '@/lib/utils';
import { userList } from '@/shared/constants/userList';
import Logo from '@/shared/ui/components/Logo';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-white h-full border border-(--bg-slate-100) rounded-2xl py-8 px-6">
      <Logo otherClassName="justify-center" />
      <div className="mt-6">
        <h4 className="text-sm text-slate-400 mb-4">القائمة الرئيسية</h4>
        <ul>
          {userList.map((section, index) => (
            <li
              key={index}
              className={cn(
                'mb-6',
                index !== userList.length - 1 &&
                  'pb-5 border-b border-b-(--bg-slate-200)'
              )}
            >
              {section.items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl p-3 border border-transparent hover:bg-(--bg-light-blue) hover:border-(--bg-slate-100) transition-colors"
                >
                  <Link
                    href={item.link}
                    className="flex items-center gap-3 text-(--text-third)"
                    aria-label={item.title}
                  >
                    <item.icon className="w-6 h-6" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
