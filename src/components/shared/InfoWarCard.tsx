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

  if (isWarning) {
    return (
      <div
        dir="rtl"
        className={cn(
          "flex flex-row items-center gap-[24px] rounded-[24px] font-['var(--font-tajawal)'] shadow-sm",
          'bg-[#FEF2F2] border-[2px] border-[#FECACA] w-full h-auto min-h-[106px] p-[24px]',
          className
        )}
      >
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0 bg-[#DC2626] p-[16px]"
          style={{ width: '58px', height: '56px' }}
        >
          <MdWarning size={26} className="text-white" />
        </div>

        <div className="flex flex-col gap-[8px] flex-1">
          {title && (
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
          {message && (
            <p
              className="text-[#D64545] text-right"
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
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className={cn(
        "flex flex-col rounded-[24px] font-['var(--font-tajawal)'] shadow-sm",
        'bg-[#EFF6FF] border border-[#2563EB] w-full h-auto min-h-[104px] p-[24px] gap-[12px]',
        className
      )}
    >
      <div
        className={cn(
          "flex items-center",
          "w-[201px] h-[30px] gap-[32px] opacity-100 rotate-0"
        )}
      >
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0 bg-[#2563EB]"
          style={{ width: '24px', height: '24px' }}
        >
          <MdInfo size={16} className="text-white" />
        </div>

        {title && (
          <h3
            className="text-[#2563EB] text-right"
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
      </div>

      <div className="flex flex-col gap-[8px] flex-1">
        {message && (
          <p
            className="text-[#2563EB] text-right"
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
        )}
      </div>
    </div>
  );
};

export default InfoWarCard;
