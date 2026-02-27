'use client';

import DonorActions from '@/shared/ui/components/DonorActions';
import Logo from '@/shared/ui/components/Logo';
import NavbarLinks from '@/shared/ui/components/NavbarLinks';
import { ROUTES } from '@/shared/constants/routes';
import { useAuth } from '@/providers/AuthProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { isAuthenticated, user, clearAuthData } = useAuth();
  const pathname = usePathname();
  const donor = pathname.startsWith(ROUTES.DONOR_DASHBOARD);
  const profileHref =
    user?.role === 'DONOR'
      ? `/profile/donor/${user.id}`
      : user?.role === 'CAMPAIGN_CREATOR'
        ? `/profile/campaign-creator/${user.id}`
        : '#';
  const userName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'المستخدم';

  return (
    <header className="bg-white rounded-md px-6 py-4.5 flex items-center justify-between gap-5 shadow-md">
      <Logo />
      {donor ? (
        <ul className="flex items-center justify-center gap-8">
          <li className="inline-block text-base md:text-lg font-bold">
            <Link
              href={ROUTES.DONOR_DASHBOARD}
              className="text-(--bg-bold-blue) transition-all duration-300"
            >
              الصفحة الرئيسية
            </Link>
          </li>
          <li className="inline-block text-base md:text-lg font-bold">
            <Link
              href={ROUTES.CAMPAIGNS}
              className="text-slate-700 hover:text-(--bg-bold-blue) transition-all duration-300"
            >
              استكشاف الحملات
            </Link>
          </li>
          <li className="inline-block text-base md:text-lg font-bold">
            <Link
              href={`${ROUTES.DONOR_DASHBOARD}#about`}
              className="text-slate-700 hover:text-(--bg-bold-blue) transition-all duration-300"
            >
              عن المنصة
            </Link>
          </li>
        </ul>
      ) : (
        <NavbarLinks />
      )}

      {isAuthenticated ? (
        <DonorActions
          userName={userName}
          profileHref={profileHref}
          onLogout={clearAuthData}
        />
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
