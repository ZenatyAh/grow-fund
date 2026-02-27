import React from 'react';
import { LucideIcon } from 'lucide-react';

type ImpactStatCardProps = {
  label: string;
  value: string;
  Icon: LucideIcon;
};

const ImpactStatCard = ({ label, value, Icon }: ImpactStatCardProps) => {
  return (
    <div className="rounded-[12px] border border-[#D5DEE8] bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-3 text-right">
        <div>
          <p className="text-[13px] text-slate-500">{label}</p>
          <p className="mt-1 text-[28px] font-bold text-slate-900">{value}</p>
        </div>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Icon className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
};

export default ImpactStatCard;
