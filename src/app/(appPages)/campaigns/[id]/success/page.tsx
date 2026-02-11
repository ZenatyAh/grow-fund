import CampaignCheckoutSuccessPage from "@/components/pages/campaigns/checkout-success";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "نجومي - نجاح التبرع",
  description: "صفحة نجاح عملية التبرع وتأكيد المعاملة.",
};

const CampaignCheckoutSuccess = () => <CampaignCheckoutSuccessPage />;

export default CampaignCheckoutSuccess;
