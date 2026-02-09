'use client';

import { StarsOption } from '@/interfaces';
import { useState } from 'react';
import { ProgressSteps } from './ProgressSteps';
import { StarsSelector } from './StarsSelector';
import { SummaryCard } from './SummaryCard';

const options: StarsOption[] = [
  { label: '100 نجمة', value: 100 },
  { label: '200 نجمة', value: 200 },
  { label: '500 نجمة', value: 500 },
  { label: '1000 نجمة', value: 1000 },
  { label: '2000 نجمة', value: 2000 },
  { label: 'كل نجمة', value: 'all' },
];

export function StarsTransferCard() {
  const [selectedStars, setSelectedStars] = useState<number | 'all'>(200);
  const [customStars, setCustomStars] = useState('');

  return (
    <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Card */}
      <div className="lg:col-span-2 rounded-2xl border bg-white p-6 space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">🚤 نجومي</h2>

        <h3 className="text-lg font-semibold">تحويل الأثر إلى حسابك البنكي</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SummaryCard
            title="إجمالي المبلغ المدفوع"
            value="10,000 ش"
            icon="💰"
          />
          <SummaryCard title="إجمالي عدد النجوم" value="1000 نجمة" icon="⭐" />
        </div>

        <StarsSelector
          options={options}
          selected={selectedStars}
          onSelect={setSelectedStars}
        />

        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            أدخل عدد النجوم التي تريد سحبها
          </label>
          <input
            value={customStars}
            onChange={(e) => setCustomStars(e.target.value)}
            placeholder="عدد النجوم"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
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
        <ProgressSteps currentStep={2} />
      </div>
    </div>
  );
}
