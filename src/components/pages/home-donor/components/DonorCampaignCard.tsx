'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CAMPAIGNS } from '@/components/pages/campaigns/data/campaigns';
import CampaignLikeButton from '@/components/pages/campaigns/components/CampaignLikeButton';
import CampaignShareButton from '@/components/pages/campaigns/components/CampaignShareButton';

type DonorCampaignCardProps = {
  campaign: (typeof CAMPAIGNS)[number];
};

const DonorCampaignCard = ({ campaign }: DonorCampaignCardProps) => {
  const progress = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);

  return (
    <article className="overflow-hidden rounded-[12px] border border-[#D5DEE8] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
      <Link href={`/campaigns/${campaign.id}`} className="relative block h-[170px] w-full">
        <Image src={campaign.image} alt={campaign.title} fill className="object-cover" />
        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-700">
          مستمرة
        </span>
      </Link>

      <div className="px-3 py-3 text-right">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
            إغاثية
          </span>
          <div className="flex items-center gap-2">
            <CampaignShareButton campaignId={campaign.id} campaignTitle={campaign.title} />
            <CampaignLikeButton campaignId={campaign.id} />
          </div>
        </div>

        <h3 className="line-clamp-2 text-[24px] font-bold leading-[1.4] text-slate-900" title={campaign.title}>
          {campaign.title}
        </h3>
        <p className="mt-1 text-[12px] text-slate-400">{campaign.date}</p>

        <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-slate-600">{campaign.description}</p>

        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[12px] text-slate-500">
            <span>{campaign.raised.toLocaleString()} نجمة</span>
            <span>الهدف {campaign.goal.toLocaleString()} نجمة</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200">
            <div className="h-1.5 rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Link
          href={`/campaigns/${campaign.id}`}
          className="mt-3 inline-flex w-full items-center justify-center rounded-[8px] bg-blue-600 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-blue-700"
        >
          أضف نجمة للحملة
        </Link>
      </div>
    </article>
  );
};

export default DonorCampaignCard;
