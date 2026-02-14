import React from 'react';
import { cn } from '@/lib/utils';

type AmountOption = {
  id: string;
  stars: number;
  amount: number;
  badge?: string;
};

type DonationAmountSelectorProps = {
  options: AmountOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  customAmount: string;
  onCustomAmountChange: (value: string) => void;
  currencyLabel?: string;
  maxCustomAmount?: number;
};

const DonationAmountSelector = ({
  options,
  selectedId,
  onSelect,
  customAmount,
  onCustomAmountChange,
  currencyLabel = 'شيكل',
  maxCustomAmount = 10000,
}: DonationAmountSelectorProps) => {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between text-right">
        <h3 className="text-[16px] font-bold text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            $
          </span>
          اختر قيمة المساهمة
        </h3>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {options.map((option) => {
          const isActive = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                'rounded-[14px] border px-3 py-4 text-center transition-all',
                isActive
                  ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200'
              )}
            >
              <div className="mb-2 flex justify-center">
                <span
                  className={cn(
                    'text-[16px]',
                    isActive ? 'text-white' : 'text-orange-500'
                  )}
                >
                  ✦
                </span>
              </div>
              <div className="text-[14px] font-semibold">
                {option.stars} نجوم
              </div>
              <div
                className={cn(
                  'mt-2 inline-flex items-center justify-center rounded-md px-3 py-1 text-[12px] font-semibold',
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'bg-slate-100 text-slate-600'
                )}
              >
                {option.amount} {currencyLabel}
              </div>
              {option.badge ? (
                <div className="mt-2 text-[11px] text-slate-200">
                  {option.badge}
                </div>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-5 text-right text-[13px] text-slate-500">
        مبلغ آخر مخصص
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-3 py-2">
        <span className="text-[12px] text-slate-400">{currencyLabel}</span>
        <input
          type="text"
          inputMode="numeric"
          value={customAmount}
          onChange={(event) => {
            const digitsOnly = event.target.value.replace(/[^0-9]/g, '');
            if (!digitsOnly) {
              onCustomAmountChange('');
              return;
            }
            const numeric = Math.min(Number(digitsOnly), maxCustomAmount);
            onCustomAmountChange(String(numeric));
          }}
          placeholder="أدخل المبلغ هنا"
          className="w-full bg-transparent text-right text-[14px] text-slate-700 outline-none placeholder:text-slate-300"
        />
      </div>
      <div className="mt-2 text-right text-[12px] text-slate-400">
        الحد الأقصى {maxCustomAmount} {currencyLabel}
      </div>
    </div>
  );
};

export type { AmountOption };
export default DonationAmountSelector;
