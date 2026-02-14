'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { CAMPAIGNS } from '../data/campaigns';

const CampaignCheckoutFailedPage = () => {
  const params = useParams<{ id: string }>();
  const campaignId = params?.id;
  const searchParams = useSearchParams();
  const campaign = useMemo(() => {
    if (!campaignId) return null;
    const numericId = Number(campaignId);
    return (
      CAMPAIGNS.find((item) =>
        Number.isNaN(numericId)
          ? String(item.id) === campaignId
          : item.id === numericId
      ) ?? null
    );
  }, [campaignId]);

  const amount = searchParams?.get('amount') ?? '0';
  const reason =
    searchParams?.get('reason') ??
    'لم نتمكن من إتمام عملية إضافة النجمة. قد يكون السبب مشكلة مؤقتة في الدفع.';
  const currentStars = campaign?.raised ?? 0;
  const targetStars = campaign?.goal ?? 1;
  const progress = Math.max(
    0,
    Math.min(100, Math.round((currentStars / targetStars) * 100))
  );
  const statusBadge = progress >= 100 ? 'مكتملة' : 'جاري التنفيذ';

  if (!campaign) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-10 text-center text-slate-500">
          الحملة غير موجودة
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F1F5F9]">
      <div className="mx-auto w-full max-w-[980px] px-4 pb-20 pt-8 md:pt-12">
        <div className="mx-auto max-w-[700px]">
          <div className="flex items-center justify-center">
            <Image
              src="/images/campaign-under-review.png"
              alt="فشل عملية الدفع"
              width={130}
              height={130}
              priority
              className="h-[120px] w-[120px] object-contain"
            />
          </div>

          <h1 className="mt-4 text-center text-[30px] font-bold leading-[1.2] text-slate-900 md:text-[35px]">
            لم تكتمل عملية التبرع
          </h1>
          <p className="mt-3 text-center text-[18px] leading-[1.6] text-slate-600 md:text-[20px]">
            {reason}
          </p>

          <div className="mt-6 rounded-[20px] border border-[#D5DEE8] bg-[#F8FAFC] p-4 md:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[20px] font-bold text-[#2563EB] md:text-[20px]">
                {progress}%
              </span>
              <span className="rounded-md bg-[#E7EEF8] px-3 py-1 text-[14px] font-semibold text-[#3B82F6]">
                {statusBadge}
              </span>
            </div>

            <div className="mt-3 h-3 w-full rounded-full bg-[#E5EAF2]">
              <div
                className="h-3 rounded-full bg-[#2563EB]"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[14px] md:text-[15px]">
              <span className="text-slate-500">
                الهدف {targetStars.toLocaleString()} نجمة
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                <Sparkles className="h-4 w-4" />
                {currentStars.toLocaleString()} نجمة مجمعة
              </span>
            </div>
          </div>

          <p className="mt-4 text-center text-[22px] font-bold text-slate-900 md:text-[20px]">
            لا تقلق، لم يتم خصم أي مبلغ.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href={`/campaigns/${campaignId}/checkout?method=paypal`}
              className="inline-flex w-full items-center justify-center rounded-[12px] bg-[#2563EB] px-6 py-3 text-[18px] font-bold text-white transition-colors hover:bg-[#1D4ED8] md:text-[20px]"
            >
              تغيير طريقة الدفع
            </Link>
            <Link
              href={`/campaigns/${campaignId}/checkout?method=card`}
              className="inline-flex w-full items-center justify-center rounded-[12px] border border-[#CBD5E1] bg-[#F8FAFC] px-6 py-3 text-[18px] font-bold text-[#0F172A] transition-colors hover:bg-slate-100 md:text-[20px]"
            >
              حاول مرة أخرى
            </Link>
          </div>

          <p className="mt-3 text-center text-[12px] text-slate-500">
            المبلغ المختار: {amount} شيكل
          </p>
        </div>
      </div>
    </main>
  );
};

export default CampaignCheckoutFailedPage;
