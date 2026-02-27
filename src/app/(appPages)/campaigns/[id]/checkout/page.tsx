import CampaignCheckoutPage from "@/components/pages/campaigns/checkout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "نجومي - تأكيد الدفع",
  description: "إتمام عملية التبرع وتأكيد الدفع للحملة.",
};

const CampaignCheckout = () => <CampaignCheckoutPage />;

export default CampaignCheckout;
