import CampaignCheckoutFailedPage from "@/components/pages/campaigns/checkout-failed";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "نجومي - فشل عملية التبرع",
  description: "صفحة فشل عملية الدفع وتعذر تأكيد التبرع.",
};

const CampaignCheckoutFailed = () => <CampaignCheckoutFailedPage />;

export default CampaignCheckoutFailed;
