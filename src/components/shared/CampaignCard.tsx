'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CampaignSummaryCardProps } from '@/interfaces';
import { Star, CircleDollarSign } from 'lucide-react';

export const CampaignCard: React.FC<CampaignSummaryCardProps> = ({
  amount,
  amountIcon,
  title,
  date,
  imageUrl,
  imageAlt = 'Campaign Image',
  isCompleted = false,
  progressValue = 0,
  goalLabel,
  indicatorValue,
  indicatorIcon,
  completedMessage = 'اكتمل الهدف',
  completedIcon,
  buttons = [],
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-row bg-white rounded-[25px] border border-[#E2E8F0] px-[32px] py-[24px] justify-between items-start w-[899px] h-[243px] shadow-sm overflow-hidden text-right',
        className
      )}
      dir="rtl"
    >
      <div className="relative w-[194px] h-[194px] flex-shrink-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="rounded-[16px] object-cover"
        />
      </div>

      <div className="flex flex-col w-[608px] h-[195px]">
        <div className="flex justify-between items-start w-[556px] h-[67px] gap-[24px]">
          <div className="flex flex-col flex-1">
            <h3 className="text-[20px] font-[700] text-[#0F172A] leading-[150%] font-tajawal">
              {title}
            </h3>
            <span className="text-[18px] font-[400] text-[var(--subheadings,#334155)] leading-[160%] font-tajawal tracking-[0%]">
              {date}
            </span>
          </div>

          <div className="flex items-center gap-[8px] w-[79px] h-[39px] justify-end">
            <span className="text-[24px] font-[700] text-[#2563EB] leading-[145%] font-tajawal tracking-[0%]">
              {amount}
            </span>
            <div className="w-[32px] h-[32px] flex items-center justify-center text-[#2563EB] rounded-full flex-shrink-0">
              {amountIcon || <CircleDollarSign size={20} strokeWidth={1.2} />}
            </div>
          </div>
        </div>

        <div className="flex gap-[16px] mt-[28px] h-[48px]">
          {buttons.map((btn, idx) => {
            const isBlue = btn.variant === 'primary' || !btn.variant;
            return (
              <button
                key={idx}
                onClick={btn.onClick}
                className={cn(
                  'flex items-center justify-center h-[48px] px-[32px] py-[16px] gap-[16px] rounded-[8px] transition-all duration-200 cursor-pointer font-tajawal font-[700] text-[18px] leading-[160%] whitespace-nowrap',
                  isBlue
                    ? 'bg-[#2563EB] text-white min-w-[210px]'
                    : 'bg-[#F8FAFC] border-[1.5px] border-[#E2E8F0] text-[#0F172A] min-w-[244.7px]'
                )}
              >
                <span className="flex-1 text-center">{btn.label}</span>
                <span className="flex items-center justify-center w-[24px] h-[24px] flex-shrink-0">
                  {btn.icon}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto h-[32px]">
          {isCompleted ? (
            <div className="h-[32px] w-[608px] bg-[#2563EB] rounded-[25px] flex items-center justify-end px-[16px] text-white gap-[8px]">
              <span className="font-[700] text-[16px] font-tajawal">
                {completedMessage} {goalLabel}
              </span>
              {completedIcon || <Star className="fill-white" size={16} />}
            </div>
          ) : (
            <div className="h-[32px] w-[608px] flex rounded-[25px] overflow-hidden bg-[#E2E8F0] relative">
              <div
                className="bg-[#2563EB] h-full flex items-center justify-center px-[16px] gap-[8px] text-white rounded-r-[25px] transition-all duration-500 z-10"
                style={{
                  width: `${progressValue}%`,
                  maxWidth: '100%',
                  borderTopRightRadius: '25px',
                  borderBottomRightRadius: '25px'
                }}
              >
                <span className="font-[700] text-[16px] font-tajawal">
                  {indicatorValue}
                </span>
                {indicatorIcon || <Star className="fill-white" size={16} />}
              </div>
              <div className="flex-1 flex items-center justify-end px-[16px] text-[#64748B] text-[16px] font-tajawal">
                <span>{goalLabel}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
