import React from 'react';
import { cn } from '@/lib/utils';

type PaymentDetailsCardProps = {
  amountLabel: string;
  method: 'card' | 'paypal';
  onMethodChange: (method: 'card' | 'paypal') => void;
};

const PaymentDetailsCard = ({
  amountLabel,
  method,
  onMethodChange,
}: PaymentDetailsCardProps) => {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between text-right">
        <h3 className="text-[16px] font-bold text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            💳
          </span>
          بيانات الدفع
        </h3>
      </div>

      <div className="mt-4 rounded-full bg-slate-100 p-1">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onMethodChange('card')}
            className={cn(
              'rounded-full py-2 text-[13px] font-semibold transition-colors',
              method === 'card'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500'
            )}
          >
            بطاقة بنكية
          </button>
          <button
            type="button"
            onClick={() => onMethodChange('paypal')}
            className={cn(
              'rounded-full py-2 text-[13px] font-semibold transition-colors',
              method === 'paypal'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500'
            )}
          >
            PayPal
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4 text-right">
        <div>
          <label
            className="text-[13px] text-slate-600"
            style={{
              fontFamily: 'Tajawal',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0%',
              textAlign: 'right',
              color: 'black',
            }}
          >
            رقم البطاقة
          </label>
          <input
            type="text"
            placeholder="أدخل المبلغ هنا"
            className="mt-2 w-full rounded-[10px] border border-slate-200 px-3 py-2 text-[14px] text-slate-700 outline-none placeholder:text-slate-300"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              className="text-[13px] text-slate-600"
              style={{
                fontFamily: 'Tajawal',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                textAlign: 'right',
                color: 'black',
              }}
            >
              تاريخ الانتهاء
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="mt-2 w-full rounded-[10px] border border-slate-200 px-3 py-2 text-[14px] text-slate-700 outline-none placeholder:text-slate-300"
            />
          </div>
          <div>
            <label
              className="text-[13px] text-slate-600"
              style={{
                fontFamily: 'Tajawal',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                textAlign: 'right',
                color: 'black',
              }}
            >
              رمز الأمان (CVC)
            </label>
            <input
              type="text"
              placeholder="***"
              className="mt-2 w-full rounded-[10px] border border-slate-200 px-3 py-2 text-[14px] text-slate-700 outline-none placeholder:text-slate-300"
            />
          </div>
        </div>
        <div>
          <label
            className="text-[13px] text-slate-600"
            style={{
              fontFamily: 'Tajawal',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0%',
              textAlign: 'right',
              color: 'black',
            }}
          >
            الاسم على البطاقة
          </label>
          <input
            type="text"
            placeholder="الاسم كامل"
            className="mt-2 w-full rounded-[10px] border border-slate-200 px-3 py-2 text-[14px] text-slate-700 outline-none placeholder:text-slate-300"
          />
        </div>
        <div className="space-y-3 text-[13px] text-slate-600">
          <label
            className="flex items-center justify-end gap-2 flex-row-reverse"
            style={{
              fontFamily: 'Tajawal',
              // fontWeight: 300,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0%',
              textAlign: 'right',
              color: 'black',
            }}
          >
            حفظ البطاقة للاستخدام مستقبلاً
            <input type="checkbox" className="h-4 w-4" />
          </label>
          <label
            className="flex items-center justify-end gap-2 flex-row-reverse"
            style={{
              fontFamily: 'Tajawal',
              // fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0%',
              textAlign: 'right',
              color: 'black',
            }}
          >
            التبرع كفاعل خير (مجهول الهوية)
            <input type="checkbox" className="h-4 w-4" />
          </label>
        </div>
        <button
          type="button"
          className="mt-2 w-full rounded-[12px] bg-blue-600 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          تأكيد التبرع بمبلغ {amountLabel}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;
