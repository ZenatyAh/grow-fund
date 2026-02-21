'use client';

import React, { useMemo } from 'react';
import { CAMPAIGNS } from '@/components/pages/campaigns/data/campaigns';
import DonorWelcomeBanner from './sections/DonorWelcomeBanner';
import DonorImpactSummary from './sections/DonorImpactSummary';
import DonorTopCampaign from './sections/DonorTopCampaign';
import DonorCampaignsSection from './sections/DonorCampaignsSection';

const HomeDonorPage = () => {
  const donatedCampaigns = useMemo(() => CAMPAIGNS.slice(0, 4), []);
  const suggestedCampaigns = useMemo(() => CAMPAIGNS.slice(4, 8), []);
  const primaryCampaign = donatedCampaigns[0] ?? CAMPAIGNS[0];

  return (
    <main className="min-h-screen space-y-12 bg-[#F1F5F9] pb-8">
      <DonorWelcomeBanner donorName="محمد" />

      <DonorImpactSummary
        donatedStars={35}
        balanceAmount={2000}
        supportedCampaignsCount={8}
        beneficiariesCount={120}
      />

      <DonorTopCampaign
        id={primaryCampaign.id}
        title={primaryCampaign.title}
        description={primaryCampaign.description}
        image={primaryCampaign.image}
      />

      <DonorCampaignsSection title="آخر التبرعات" campaigns={donatedCampaigns} />
      <DonorCampaignsSection title="الحملات المقترحة" campaigns={suggestedCampaigns} />
    </main>
  );
};

export default HomeDonorPage;
