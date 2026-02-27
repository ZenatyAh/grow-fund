import React from 'react';
import Link from 'next/link';
import { CAMPAIGNS } from '@/components/pages/campaigns/data/campaigns';
import DonorCampaignCard from '../components/DonorCampaignCard';

type DonorCampaignsSectionProps = {
  title: string;
  campaigns: (typeof CAMPAIGNS)[number][];
};

const DonorCampaignsSection = ({ title, campaigns }: DonorCampaignsSectionProps) => {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <Link href="/campaigns" className="text-[18px] font-semibold text-slate-500 hover:text-blue-600">
          عرض الكل
        </Link>
        <h2 className="text-[42px] font-bold text-slate-900">{title}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {campaigns.map((campaign) => (
          <DonorCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
};

export default DonorCampaignsSection;
