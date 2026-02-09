'use client';

import { InfoBadge } from './InfoBadge';
import { ProgressSteps } from './ProgressSteps';

export function SuccessTransferCard() {
  return (
    <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Success Card */}
      <div className="lg:col-span-2 rounded-2xl border bg-white p-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-2 font-semibold">
            🚤 نجومي
          </div>

          {/* Illustration placeholder */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
              ⏳
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            تم إرسال طلب التحويل
          </h2>

          <p className="text-gray-600 leading-relaxed">
            طلبك قيد المعالجة
            <br />
            سنقوم بإشعارك فور اكتمال التحويل
          </p>
        </div>

        {/* Info */}
        <div className="flex flex-wrap justify-center gap-4">
          <InfoBadge label="الرقم المرجعي" value="DJS-549753" icon="📄" />

          <InfoBadge label="الوقت المتوقع" value="1-2 أيام العمل" icon="⏱" />
        </div>

        {/* Action */}
        <div className="flex justify-center pt-2">
          <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium">
            العودة إلى المحفظة
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
