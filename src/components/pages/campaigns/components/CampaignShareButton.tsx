"use client";

import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ShareCampaignModal from "./ShareCampaignModal";

interface CampaignShareButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> {
  campaignId: string | number;
  campaignTitle: string;
  iconClassName?: string;
}

const CampaignShareButton: React.FC<CampaignShareButtonProps> = ({
  campaignId,
  campaignTitle,
  className,
  iconClassName,
  ...props
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cn(
          "inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-blue-600 transition-colors hover:bg-slate-200",
          className
        )}
        onClick={() => setIsShareOpen(true)}
        aria-label="مشاركة الحملة"
        {...props}
      >
        <Share2 className={cn("h-5 w-5", iconClassName)} />
      </button>
      <ShareCampaignModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        campaignId={campaignId}
        campaignTitle={campaignTitle}
      />
    </>
  );
};

export default CampaignShareButton;
