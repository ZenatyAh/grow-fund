import CampaignDetailsPage from "@/components/pages/campaigns/details";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "نجومي - تفاصيل الحملة",
  description: "تفاصيل حملة التبرع والمبادرة الخيرية.",
};

const CampaignDetails = () => <CampaignDetailsPage />;

export default CampaignDetails;
