import DashboardCampaignDetailsPage from '@/components/pages/dashboard/campaigns/[Id]';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "نجومي - تفاصيل الحملة",
  description: "تفاصيل حملة التبرع والمبادرة الخيرية.",
};

const DashboardCampaignDetails = () => <DashboardCampaignDetailsPage />

export default DashboardCampaignDetails