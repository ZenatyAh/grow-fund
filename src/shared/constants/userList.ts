import { Wallet } from 'lucide-react';
import { FaCog, FaCompass, FaRegBell, FaTachometerAlt } from 'react-icons/fa';
import { ROUTES } from './routes';

export const userList = [
  {
    section: 'main',
    items: [
      {
        id: 1,
        title: 'لوحة التحكم',
        link: ROUTES.DASHBOARD,
        icon: FaTachometerAlt,
      },
      {
        id: 2,
        title: 'استكشاف الحملات',
        link: ROUTES.CAMPAIGNS,
        icon: FaCompass,
      },
      {
        id: 3,
        title: 'المحفظة',
        link: '#',
        icon: Wallet,
      },
    ],
  },
  {
    section: 'general',
    items: [
      {
        id: 3,
        title: 'الإشعارات',
        link: ROUTES.NOTIFICATIONS,
        icon: FaRegBell,
      },
      { id: 4, title: 'الإعدادات', link: '#', icon: FaCog },
    ],
  },
];
