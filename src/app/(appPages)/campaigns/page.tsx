import CampaignsPage from "@/components/pages/campaigns";
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'نجومي - الحملات',
  description: 'تصفح حملات التبرع والمبادرات الخيرية وساهم في إحداث تغيير إيجابي.',
};

const Campaigns = () => <CampaignsPage />;

export default Campaigns;
