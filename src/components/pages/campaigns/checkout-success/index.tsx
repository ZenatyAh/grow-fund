"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/shared/ui/components/Breadcrumbs";
import { CAMPAIGNS } from "../data/campaigns";
import SuccessHero from "./components/SuccessHero";
import SuccessDetailsCard from "./components/SuccessDetailsCard";
import ContributionImpactCard from "./components/ContributionImpactCard";

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

  const amountParam = searchParams?.get("amount") ?? "200";
  const transactionParam = searchParams?.get("trx") ?? "TRX-1002";
  const dateParam =
    searchParams?.get("date") ?? "12 أكتوبر 2025 • 10:30 ص";
  const amountLabel = `${amountParam} ش`;

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
    <main className="min-h-screen bg-slate-50 font-['Tajawal']">
      <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-8">
        <Breadcrumbs
          className="mb-8 text-slate-400"
          currentLabel="نجاح التبرع"
          labelMap={{
            campaigns: "استكشاف الحملات",
          }}
        />

        <div className="mx-auto max-w-[520px]">
          <SuccessHero
            title="تم التبرع بنجاح! شكراً لك"
            subtitle="مساهمتك ستصنع فرقًا حقيقيًا في حياة الآخرين"
          />

          <div className="mt-6">
            <SuccessDetailsCard
              amountLabel={amountLabel}
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

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#"
              className="inline-flex w-full items-center justify-center rounded-[12px] bg-blue-600 px-6 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              تحميل الفاتورة
            </Link>
            <Link
              href="/campaigns"
              className="inline-flex w-full items-center justify-center rounded-[12px] border border-slate-200 bg-white px-6 py-3 text-[14px] font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300"
            >
              استكشاف المزيد من الحملات
            </Link>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-[12px] text-slate-400">
          <Image
            src="/images/home/background.png"
            alt="نجومي"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>نجومي</span>
        </div>
      </div>
    </main>
  );
};

export default CampaignCheckoutSuccessPage;
