"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import Breadcrumbs from "@/shared/ui/components/Breadcrumbs";
import { CAMPAIGNS } from "../data/campaigns";
import DonationSummaryCard from "./components/DonationSummaryCard";
import DonationAmountSelector, {
  AmountOption,
} from "./components/DonationAmountSelector";
import PaymentDetailsCard from "./components/PaymentDetailsCard";

const amountOptions: AmountOption[] = [
  { id: "1", stars: 1, amount: 10 },
  { id: "5", stars: 5, amount: 50 },
  { id: "10", stars: 10, amount: 100 },
  { id: "20", stars: 20, amount: 200 },
];

const PRICE_PER_STAR = 10;
const MAX_CUSTOM_AMOUNT = 10000;

const CampaignCheckoutPage = () => {
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

  const initialStars = Number(searchParams?.get("stars") ?? "");
  const initialOption =
    amountOptions.find((option) => option.stars === initialStars)?.id ?? "5";
  const initialCustom =
    initialStars && !amountOptions.some((option) => option.stars === initialStars)
      ? String(initialStars * PRICE_PER_STAR)
      : "";

  const [selectedOptionId, setSelectedOptionId] = useState(initialOption);
  const [customAmount, setCustomAmount] = useState(initialCustom);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const selectedOption = amountOptions.find(
    (option) => option.id === selectedOptionId
  );
  const selectedStars = selectedOption?.stars ?? 5;
  const selectedAmount = selectedOption?.amount ?? selectedStars * PRICE_PER_STAR;
  const totalAmount = customAmount
    ? Math.min(Number(customAmount), MAX_CUSTOM_AMOUNT)
    : selectedAmount;
  const displayStars = customAmount
    ? Math.max(1, Math.round(totalAmount / PRICE_PER_STAR))
    : selectedStars;

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
          className="mb-6 text-slate-400"
          currentLabel="تأكيد الدفع"
          labelMap={{
            campaigns: "استكشاف الحملات",
          }}
        />

        <div className="mb-10 text-right">
          <h1 className="text-[28px] font-bold text-slate-900">
            إتمام عملية التبرع
          </h1>
          <p className="mt-2 text-[14px] text-slate-500">
            أنت على بعد خطوة واحدة من صنع أثر في حياة المحتاجين
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5 lg:col-start-1">
            <DonationAmountSelector
              options={amountOptions}
              selectedId={selectedOptionId}
              onSelect={setSelectedOptionId}
              customAmount={customAmount}
              onCustomAmountChange={setCustomAmount}
              currencyLabel="شيكل"
              maxCustomAmount={MAX_CUSTOM_AMOUNT}
            />

            <PaymentDetailsCard
              amountLabel={`${totalAmount} شيكل`}
              method={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>

          <div className="lg:col-start-2">
          <DonationSummaryCard
            image={campaign.image}
            title={campaign.title}
            description={campaign.description}
            stars={displayStars}
            pricePerStar={PRICE_PER_STAR}
            totalAmount={totalAmount}
            currencyLabel="شيكل"
          />
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

export default CampaignCheckoutPage;
