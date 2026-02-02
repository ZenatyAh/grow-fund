import React from 'react';
import { MdInfo, MdWarning } from 'react-icons/md';
import { cn, InfoWarCardProps } from '@/lib/utils';

const InfoWarCard = ({
  variant,
  title,
  message,
  className,
}: InfoWarCardProps) => {
  const isWarning = variant === 'warning';

  return (
    <div
      dir="rtl"
      className={cn(
        "flex items-center rounded-[24px] font-['var(--font-tajawal)'] shadow-sm",
        isWarning
          ? 'bg-[#FEF2F2] border-[2px] border-[#FECACA] w-full h-[106px] p-[24px]'
          : 'bg-[#EFF6FF] border border-[#2563EB] w-[372px] h-[104px] pt-[16px] pr-[24px] pb-[16px] pl-[24px]',
        className
      )}
      style={{
        gap: isWarning ? '24px' : '12px',
      }}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full flex-shrink-0',
          isWarning ? 'bg-[#DC2626] p-[16px]' : 'bg-[#2563EB]'
        )}
        style={{
          width: isWarning ? '58px' : '24px',
          height: isWarning ? '56px' : '24px',
        }}
      >
        {isWarning ? (
          <MdWarning size={26} className="text-white" />
        ) : (
          <MdInfo size={16} className="text-white" />
        )}
      </div>

      <div className="flex flex-col gap-[8px] flex-1">
        {isWarning && title && (
          <h3
            className="text-[#D64545] text-right"
            style={{
              fontFamily: 'var(--font-tajawal)',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '160%',
              letterSpacing: '0%',
            }}
          >
            {title}
          </h3>
        )}

        <p
          className={cn(
            'text-right',
            isWarning ? 'text-[#D64545]' : 'text-[#2563EB]'
          )}
          style={{
            fontFamily: 'var(--font-tajawal)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '150%',
            letterSpacing: '0%',
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default InfoWarCard;
