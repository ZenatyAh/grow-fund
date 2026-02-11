import React from "react";
import { AlertCircle } from "lucide-react";

type ContributionImpactCardProps = {
  title: string;
  description: string;
};

const ContributionImpactCard = ({
  title,
  description,
}: ContributionImpactCardProps) => {
  return (
    <div className="rounded-[17px] border border-[#3B82F6] bg-[#EFF6FF] px-4 py-4 text-right">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[14px] font-bold text-[#2563EB] md:text-[25px]">{title}</div>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB] text-white">
          <AlertCircle className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-2 text-[11px] text-[#2563EB] md:text-[21px]">{description}</div>
    </div>
  );
};

export default ContributionImpactCard;
