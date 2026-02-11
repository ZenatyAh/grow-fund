import React from "react";

type SuccessDetailsCardProps = {
  amountLabel: string;
  totalLabel: string;
  campaignName: string;
  transactionId: string;
  dateLabel: string;
};

const SuccessDetailsCard = ({
  amountLabel,
  totalLabel,
  campaignName,
  transactionId,
  dateLabel,
}: SuccessDetailsCardProps) => {
  return (
    <div className="rounded-[20px] border border-[#D5DEE8] bg-[#F8FAFC] p-4">
      <div className="text-center">
        <div className="text-[13px] font-bold text-[#334155] md:text-[20px]">المبلغ المتبرع به</div>
        <div className="mt-2 text-[29px] font-bold text-[#2563EB] md:text-[39px]">
          {amountLabel}
        </div>
      </div>

      <div className="mt-4 rounded-[16px] border border-[#D5DEE8] bg-[#E9EEF5] p-4 text-right">
        <div className="flex items-center justify-between gap-3 text-[11px] md:text-[21px]">
          <span className="font-bold text-slate-900">اسم الحملة</span>
          <span
            className="max-w-[58%] truncate text-left font-semibold text-[#475569] md:max-w-[62%]"
            title={campaignName}
          >
            {campaignName}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-[11px] md:text-[21px]">
          <span className="font-bold text-slate-900">رقم المعاملة</span>
          <span className="font-semibold text-[#475569]">#{transactionId}</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-[11px] md:text-[21px]">
          <span className="font-bold text-slate-900">التاريخ</span>
          <span className="font-semibold text-[#475569]">{dateLabel}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-[#D5DEE8] pt-4">
        <div className="flex items-center justify-between text-[17px] md:text-[28px]">
          <span className="font-normal text-slate-900">الإجمالي</span>
          <span className="font-bold text-[#2563EB]">{totalLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessDetailsCard;
