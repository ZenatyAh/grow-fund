"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { CAMPAIGNS } from '../data/campaigns';
import SuccessHero from './components/SuccessHero';
import SuccessDetailsCard from './components/SuccessDetailsCard';
import ContributionImpactCard from './components/ContributionImpactCard';

const CampaignCheckoutSuccessPage = () => {
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

  const amountParam = searchParams?.get('amount') ?? '200';
  const transactionParam = searchParams?.get('trx') ?? 'TRX-1002';
  const dateParam = searchParams?.get('date') ?? '12 أكتوبر 2025 . 10:30 ص';
  const totalParam = searchParams?.get('total') ?? '200';
  const amountLabel = `${amountParam} ش`;
  const totalLabel = `${totalParam} ش`;

  const openPrintableInvoice = () => {
    if (!campaignId) return;
    const query = new URLSearchParams({
      amount: amountParam,
      total: totalParam,
      trx: transactionParam,
      date: dateParam,
    }).toString();
    const url = `/print-invoice/${encodeURIComponent(campaignId)}?${query}`;
    window.open(url, '_blank');
  };

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
      <div className="mx-auto w-full max-w-[700px] px-3 pb-14 pt-7 md:pt-10">
        <div className="mx-auto max-w-[600px]">
          <SuccessHero
            title="تم التبرع بنجاح! شكراً لك"
            subtitle="مساهمتك ستصنع فرقًا حقيقيًا في حياة الآخرين"
          />

          <div className="mt-6">
            <SuccessDetailsCard
              amountLabel={amountLabel}
              totalLabel={totalLabel}
              campaignName={campaign.title}
              transactionId={transactionParam}
              dateLabel={dateParam}
            />
          </div>

          <div className="mt-5">
            <ContributionImpactCard
              title="ماذا تفعل بمساهمتك؟"
              description="مساهمتك الآن توفر وجبات لـ 5 عائلات"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={openPrintableInvoice}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2563EB] px-4 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#1D4ED8] md:text-[20px]"
            >
              <Download className="h-4 w-4 md:h-5 md:w-5" />
              تحميل الفاتورة
            </button>
            <Link
              href="/campaigns"
              className="inline-flex w-full items-center justify-center rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-[5px] font-bold text-[#0F172A] transition-colors hover:bg-slate-100 md:text-[20px]"
            >
              استكشاف المزيد من الحملات
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CampaignCheckoutSuccessPage;
