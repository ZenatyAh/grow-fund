'use client';

import { BankAccountCard } from './BankAccountCard';
import { ProgressSteps } from './ProgressSteps';
import { ReadonlyField } from './ReadonlyField';

export function ReviewTransferCard() {
  return (
    <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Review Card */}
      <div className="lg:col-span-2 rounded-2xl border bg-white p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-2 text-lg font-semibold">
            🚤 نجومي
          </div>
          <h2 className="text-xl font-bold">تحويل الأثر إلى حسابك البنكي</h2>
        </div>

        <ReadonlyField label="النجوم التي تريد سحبها" value="500 نجمة" />

        <ReadonlyField label="رسوم المنصة" value="50 نجمة" />

        <ReadonlyField label="عدد النجوم الصافي" value="450 نجمة" />

        <BankAccountCard
          bankName="بنك فلسطين"
          maskedNumber="****4456"
          onChange={() => {}}
        />

        <div className="flex gap-3 pt-4">
          <button className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium">
            تأكيد
          </button>
          <button className="rounded-lg border px-6 py-2 text-gray-700">
            إلغاء
          </button>
        </div>
      </div>

      {/* Steps */}
      <div className="rounded-2xl border bg-white p-6">
        <ProgressSteps currentStep={1} />
      </div>
    </div>
  );
}
