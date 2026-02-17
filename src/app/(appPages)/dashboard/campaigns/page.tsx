import DashboardCampaignsPage from "@/components/pages/dashboard/campaigns"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'نجومي - الحملات',
  description: 'لوحة تحكم لعرض وإدارة الحملات، إنشاء حملات جديدة وتعديل بيانات الحملات الحالية.',
};

const DashboardCampaigns = () => <DashboardCampaignsPage />

export default DashboardCampaigns