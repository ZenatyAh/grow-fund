import React from 'react';
import Image from 'next/image';

type DonationSummaryCardProps = {
  image: string;
  title: string;
  description: string;
  stars: number;
  pricePerStar: number;
  totalAmount?: number;
  currencyLabel?: string;
};

const DonationSummaryCard = ({
  image,
  title,
  description,
  stars,
  pricePerStar,
  totalAmount,
  currencyLabel = 'شيكل',
}: DonationSummaryCardProps) => {
  const total = totalAmount ?? stars * pricePerStar;

  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="relative h-[170px] overflow-hidden rounded-[14px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="mt-4 text-right">
        <h3 className="text-[20px] font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-[14px] leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3 text-right text-[14px] text-slate-600">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">عدد النجوم</span>
          <span className="font-semibold text-slate-800">{stars} نجمة</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-slate-500">قيمة النجمة</span>
          <span className="font-semibold text-slate-800">
            {pricePerStar} {currencyLabel}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-right">
        <span className="text-[14px] text-slate-500">الإجمالي</span>
        <span className="text-[16px] font-bold text-blue-600">
          {total} {currencyLabel}
        </span>
      </div>
    </div>
  );
};

export default DonationSummaryCard;
