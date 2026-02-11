import React from "react";

type ContributionImpactCardProps = {
  title: string;
  description: string;
};

const ContributionImpactCard = ({
  title,
  description,
}: ContributionImpactCardProps) => {
  return (
    <div className="rounded-[16px] border border-blue-200 bg-blue-50/60 px-4 py-3 text-right">
      <div className="flex items-center justify-between">
        <div className="text-[14px] font-semibold text-blue-700">{title}</div>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
          i
        </span>
      </div>
      <div className="mt-1 text-[12px] text-blue-600">{description}</div>
    </div>
  );
};

export default ContributionImpactCard;
