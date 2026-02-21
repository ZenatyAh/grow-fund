import React from 'react';
import { BadgePlus, CircleDollarSign, HandHeart, Users } from 'lucide-react';
import ImpactStatCard from '../components/ImpactStatCard';

type DonorImpactSummaryProps = {
  donatedStars: number;
  balanceAmount: number;
  supportedCampaignsCount: number;
  beneficiariesCount: number;
};

const DonorImpactSummary = ({
  donatedStars,
  balanceAmount,
  supportedCampaignsCount,
  beneficiariesCount,
}: DonorImpactSummaryProps) => {
  return (
    <section>
      <h2 className="text-right text-[42px] font-bold text-slate-900">ملخص التأثير</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ImpactStatCard label="عدد النجوم إلي أضفتها" value={`${donatedStars}+`} Icon={BadgePlus} />
        <ImpactStatCard label="إجمالي رصيدك" value={`$${balanceAmount}`} Icon={CircleDollarSign} />
        <ImpactStatCard label="الحملات المدعومة" value={`${supportedCampaignsCount}`} Icon={HandHeart} />
        <ImpactStatCard label="مستفيدون ساهمت بدعمهم" value={`${beneficiariesCount}`} Icon={Users} />
      </div>
    </section>
  );
};

export default DonorImpactSummary;
