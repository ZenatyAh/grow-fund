import React, { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { mockConfirmDonation } from '@/features/donate/mockPayment';

type PaymentDetailsCardProps = {
  campaignId: string;
  amountLabel: string;
  amountValue: number;
  method: 'card' | 'paypal';
  onMethodChange: (method: 'card' | 'paypal') => void;
  mockStatus?: 'success' | 'failed' | null;
};

type PaymentForm = {
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardholderName: string;
  saveCard: boolean;
  anonymous: boolean;
};

type PaymentFormErrors = Partial<Record<keyof PaymentForm, string>>;

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  const chunks = digits.match(/.{1,4}/g) ?? [];
  return chunks.join(' ');
};

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const isValidCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 16) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const isValidExpiry = (value: string) => {
  const match = value.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiryDate = new Date(year, month, 0, 23, 59, 59, 999);
  return expiryDate >= now;
};

const normalizeDateLabel = (date: Date) => {
  const dateText = new Intl.DateTimeFormat('ar-EG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const timeText = new Intl.DateTimeFormat('ar-EG', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return `${dateText} . ${timeText}`;
};

const PaymentDetailsCard = ({
  campaignId,
  amountLabel,
  amountValue,
  method,
  onMethodChange,
  mockStatus = null,
}: PaymentDetailsCardProps) => {
  const router = useRouter();

  const [form, setForm] = useState<PaymentForm>({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardholderName: '',
    saveCard: false,
    anonymous: false,
  });
  const [errors, setErrors] = useState<PaymentFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCardMethod = method === 'card';

  const validateForm = () => {
    const nextErrors: PaymentFormErrors = {};

    if (!isCardMethod) return nextErrors;

    if (!form.cardNumber) {
      nextErrors.cardNumber = 'رقم البطاقة مطلوب.';
    } else if (!isValidCardNumber(form.cardNumber)) {
      nextErrors.cardNumber = 'رقم البطاقة غير صالح.';
    }

    if (!form.expiry) {
      nextErrors.expiry = 'تاريخ الانتهاء مطلوب.';
    } else if (!isValidExpiry(form.expiry)) {
      nextErrors.expiry = 'تاريخ الانتهاء غير صالح أو منتهي.';
    }

    if (!form.cvc) {
      nextErrors.cvc = 'رمز الأمان مطلوب.';
    } else if (!/^\d{3,4}$/.test(form.cvc)) {
      nextErrors.cvc = 'رمز الأمان يجب أن يكون 3 أو 4 أرقام.';
    }

    if (!form.cardholderName.trim()) {
      nextErrors.cardholderName = 'الاسم على البطاقة مطلوب.';
    } else if (!/^[A-Za-z\u0600-\u06FF\s]{3,}$/.test(form.cardholderName.trim())) {
      nextErrors.cardholderName = 'الاسم غير صالح.';
    }

    return nextErrors;
  };

  const canSubmit = useMemo(() => {
    if (!isCardMethod) return false;
    return !isSubmitting;
  }, [isCardMethod, isSubmitting]);

  const onSubmit = async () => {
    setSubmitError(null);

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);

      const response = await mockConfirmDonation({
        campaignId,
        amount: amountValue,
        cardNumber: form.cardNumber,
        expiry: form.expiry,
        cvc: form.cvc,
        cardholderName: form.cardholderName,
        saveCard: form.saveCard,
        anonymous: form.anonymous,
        method,
        mockStatus,
      });

      const processedDate = new Date(response.processedAt);
      const dateLabel = normalizeDateLabel(processedDate);

      const commonParams = new URLSearchParams({
        amount: String(amountValue),
        total: String(amountValue),
        trx: response.transactionId,
        date: dateLabel,
        stars: String(Math.max(1, Math.round(amountValue / 10))),
        target: String(Math.max(2, Math.round(amountValue / 10) * 2)),
      });

      if (response.status === 'success') {
        router.push(`/campaigns/${campaignId}/success?${commonParams.toString()}`);
        return;
      }

      if (response.reason) {
        commonParams.set('reason', response.reason);
      }
      router.push(`/campaigns/${campaignId}/failed?${commonParams.toString()}`);
    } catch {
      setSubmitError('تعذر تنفيذ عملية الدفع الآن. حاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {method === 'paypal' ? (
        <div className="mt-5 rounded-[12px] border border-amber-200 bg-amber-50 px-4 py-3 text-right text-[13px] text-amber-700">
          الدفع عبر PayPal غير مفعّل حاليًا في البيئة التجريبية. استخدم البطاقة البنكية لاختبار سيناريو النجاح/الفشل.
        </div>
      ) : (
        <div className="mt-5 space-y-4 text-right">
          <div>
            <label className="text-[16px] font-bold text-black">رقم البطاقة</label>
            <input
              type="text"
              value={form.cardNumber}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(event.target.value) }));
                setErrors((prev) => ({ ...prev, cardNumber: undefined }));
              }}
              placeholder="1234 5678 9012 3456"
              className={cn(
                'mt-2 w-full rounded-[10px] border px-3 py-2 text-[14px] text-slate-700 outline-none placeholder:text-slate-300',
                errors.cardNumber ? 'border-red-400' : 'border-slate-200'
              )}
              inputMode="numeric"
              autoComplete="cc-number"
            />
            {errors.cardNumber ? (
              <p className="mt-1 text-[12px] text-red-600">{errors.cardNumber}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[16px] font-bold text-black">تاريخ الانتهاء</label>
              <input
                type="text"
                value={form.expiry}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, expiry: formatExpiry(event.target.value) }));
                  setErrors((prev) => ({ ...prev, expiry: undefined }));
                }}
                placeholder="MM/YY"
                className={cn(
                  'mt-2 w-full rounded-[10px] border px-3 py-2 text-[14px] text-slate-700 outline-none placeholder:text-slate-300',
                  errors.expiry ? 'border-red-400' : 'border-slate-200'
                )}
                inputMode="numeric"
                autoComplete="cc-exp"
              />
              {errors.expiry ? (
                <p className="mt-1 text-[12px] text-red-600">{errors.expiry}</p>
              ) : null}
            </div>
            <div>
              <label className="text-[16px] font-bold text-black">رمز الأمان (CVC)</label>
              <input
                type="text"
                value={form.cvc}
                onChange={(event) => {
                  const cvc = event.target.value.replace(/\D/g, '').slice(0, 4);
                  setForm((prev) => ({ ...prev, cvc }));
                  setErrors((prev) => ({ ...prev, cvc: undefined }));
                }}
                placeholder="123"
                className={cn(
                  'mt-2 w-full rounded-[10px] border px-3 py-2 text-[14px] text-slate-700 outline-none placeholder:text-slate-300',
                  errors.cvc ? 'border-red-400' : 'border-slate-200'
                )}
                inputMode="numeric"
                autoComplete="cc-csc"
              />
              {errors.cvc ? (
                <p className="mt-1 text-[12px] text-red-600">{errors.cvc}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label className="text-[16px] font-bold text-black">الاسم على البطاقة</label>
            <input
              type="text"
              value={form.cardholderName}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, cardholderName: event.target.value }));
                setErrors((prev) => ({ ...prev, cardholderName: undefined }));
              }}
              placeholder="الاسم كامل"
              className={cn(
                'mt-2 w-full rounded-[10px] border px-3 py-2 text-[14px] text-slate-700 outline-none placeholder:text-slate-300',
                errors.cardholderName ? 'border-red-400' : 'border-slate-200'
              )}
              autoComplete="cc-name"
            />
            {errors.cardholderName ? (
              <p className="mt-1 text-[12px] text-red-600">{errors.cardholderName}</p>
            ) : null}
          </div>

          <div className="space-y-3 text-[13px] text-slate-600">
            <label className="flex items-center justify-end gap-2 flex-row-reverse text-[16px] text-black">
              حفظ البطاقة للاستخدام مستقبلاً
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={form.saveCard}
                onChange={(event) => setForm((prev) => ({ ...prev, saveCard: event.target.checked }))}
              />
            </label>
            <label className="flex items-center justify-end gap-2 flex-row-reverse text-[16px] text-black">
              التبرع كفاعل خير (مجهول الهوية)
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={form.anonymous}
                onChange={(event) => setForm((prev) => ({ ...prev, anonymous: event.target.checked }))}
              />
            </label>
          </div>

          {submitError ? <p className="text-right text-[12px] text-red-600">{submitError}</p> : null}

          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="mt-2 w-full rounded-[12px] bg-blue-600 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmitting ? 'جاري تأكيد التبرع...' : `تأكيد التبرع بمبلغ ${amountLabel}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsCard;
