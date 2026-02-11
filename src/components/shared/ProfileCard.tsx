'use client';

import { 
  IconCamera,
  IconMapPin,
  IconUser,
  IconBuilding
} from '@tabler/icons-react';
import { 
  MdPerson, 
  MdKey, 
  MdSecurity, 
  MdNotifications, 
  MdVerified,
  MdFavorite,
  MdHistory
} from 'react-icons/md';
import { cn, MenuItemProps, ProfileCardProps } from '@/lib/utils';


const MenuItem = ({ id, icon, label, isActive, onClick }: MenuItemProps) => (
  <div 
    onClick={() => onClick?.(id, label)}
    className={cn(
      "flex items-center justify-between w-[324px] h-[49px] px-[8px] py-[10px] rounded-xl transition-all cursor-pointer gap-[10px]",
      isActive ? "bg-[#EFF6FF]" : "bg-transparent hover:bg-gray-50"
    )}
  >
    <div className="flex items-center gap-[10px]">
      <div 
        className={cn("flex items-center justify-center transition-colors relative", isActive ? "text-[#1D4ED8]" : "text-[#64748B]")}
        style={{ 
          width: '20.005px', 
          height: '19.995px',
          top: '2.01px',
          left: '2px'
        }}
      >
        {icon}
      </div>
      <span className={cn(
        "text-[18px] font-bold leading-[160%] font-['var(--font-tajawal)'] transition-colors",
        isActive ? "text-[#1D4ED8]" : "text-[#334155]"
      )}>
        {label}
      </span>
    </div>
  </div>
);



const ProfileCard = ({
  type,
  name,
  location,
  typeLabel,
  profileStrength = 0,
  imageUrl,
  isDonor,
  activeItemId,
  onMenuItemClick,
  className
}: ProfileCardProps) => {
  const typeIcon = type === 'individual' 
    ? <IconUser size={14} stroke={1.5} /> 
    : <IconBuilding size={14} stroke={1.5} />;
  
  const menuItems = [
    { 
      id: 'edit-data', 
      label: 'تعديل بياناتي', 
      icon: <MdPerson size={20} />
    },
    ...(isDonor ? [
      { 
        id: 'donation-preferences', 
        label: 'تفضيلات التبرع', 
        icon: <MdFavorite size={20} />
      }
    ] : []),
    { 
      id: 'change-password', 
      label: 'تغيير كلمة المرور', 
      icon: <MdKey size={20} />
    },
    { 
      id: '2fa', 
      label: 'المصادقة الثنائية', 
      icon: <MdSecurity size={20} />
    },
    ...(isDonor ? [
      { 
        id: 'donation-record', 
        label: 'سجل التبرع', 
        icon: <MdHistory size={20} />
      }
    ] : []),
    { 
      id: 'notifications', 
      label: 'إعدادات الإشعارات', 
      icon: <MdNotifications size={20} />
    },
    { 
      id: 'verification', 
      label: 'توثيق الحساب', 
      icon: <MdVerified size={20} />
    },
  ];

  return (
    <div 
      dir="rtl"
      className={cn(
        "flex flex-col bg-white border border-[#E2E8F0] rounded-[24px] shadow-sm font-['var(--font-tajawal)']",
        "w-[372px] pt-[40px] px-[24px] pb-[40px] gap-[32px] overflow-hidden",
        isDonor ? "h-[1011px]" : "h-auto min-h-[838px]",
        className
      )}
    >
      
      <div className="flex flex-col items-center gap-[16px] w-full mx-auto">
        <div className="relative">
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden bg-[#E2E8F0] flex items-center justify-center border-[6px] border-white shadow-sm">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <IconUser size={80} className="text-[#94A3B8]" stroke={1.5} />
            )}
          </div>
          <button className="absolute bottom-[4px] right-[4px] w-[40px] h-[40px] bg-[#2563EB] rounded-full border-[3px] border-white flex items-center justify-center text-white hover:bg-blue-700 transition-all shadow-md active:scale-95 z-10">
            <IconCamera size={20} stroke={1.5} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-[12px]">
          <h2 className="text-[32px] font-bold text-[#0F172A] text-center leading-[140%] font-['var(--font-tajawal)']">
            {name}
          </h2>
          
          <div className="flex items-center gap-2">
            <div 
              style={{ width: '81px', height: '33px' }}
              className="flex items-center justify-center gap-[16px] bg-[#EFF6FF] px-[16px] py-[8px] rounded-[48px] opacity-100 rotate-0"
            >
              <div className="text-[#2563EB]">
                {typeIcon}
              </div>
              <span className="text-[12px] text-[#2563EB] font-normal leading-[140%] font-['var(--font-tajawal)'] text-center">
                {typeLabel}
              </span>
            </div>

            <div 
              style={{ width: '151px', height: '33px' }}
              className="flex items-center justify-center gap-[4px] bg-[#E2E8F0] px-[16px] py-[8px] rounded-[58px] opacity-100 rotate-0"
            >
              <IconMapPin size={14} className="text-[#334155]" stroke={1.5} />
              <span className="text-[12px] text-[#334155] font-normal leading-[140%] font-['var(--font-tajawal)'] text-center">
                {location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] w-[324px] min-h-[73px] mx-auto opacity-100 rotate-0">
        <div className="flex items-center justify-between font-['var(--font-tajawal)']">
          <span className="text-[20px] font-bold text-[#0F172A] leading-[150%] text-right font-['var(--font-tajawal)']">
            قوة الملف الشخصي
          </span>
          <span className="text-[20px] font-bold text-[#2563EB] leading-[150%] text-right font-['var(--font-tajawal)']">
            {profileStrength}%
          </span>
        </div>
        
        <div className="relative w-full h-[10px] bg-[#F1F5F9] rounded-full overflow-hidden">
          <div 
            className="absolute top-0 right-0 h-full bg-[#2563EB] transition-all duration-500 ease-out"
            style={{ width: `${profileStrength}%` }}
          />
        </div>
        
        <p className="text-[12px] text-[#64748B] text-center font-normal leading-[140%] font-['var(--font-tajawal)']">
          أكمل بياناتك {type === 'individual' ? 'الشخصية' : 'المؤسسية'} للوصول الى 100%
        </p>
      </div>

      <div className="w-[324px] h-[2px] bg-[#E2E8F0] rounded-[100px] mx-auto flex-shrink-0" />

      <div className="flex flex-col gap-[16px] w-[324px] min-h-[309px] mx-auto flex-grow">
        {menuItems.map((item) => (
          <MenuItem 
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItemId === item.id}
            onClick={onMenuItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
