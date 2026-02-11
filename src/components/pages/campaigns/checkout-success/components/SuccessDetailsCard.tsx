import React from "react";

type SuccessDetailsCardProps = {
  amountLabel: string;
  campaignName: string;
  transactionId: string;
  dateLabel: string;
};

const SuccessDetailsCard = ({
  amountLabel,
  campaignName,
  transactionId,
  dateLabel,
}: SuccessDetailsCardProps) => {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-center">
        <div className="text-[13px] text-slate-500">المبلغ المتبرع به</div>
        <div className="mt-2 text-[26px] font-bold text-blue-600">
          {amountLabel}
        </div>
      </div>

      <div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50 p-4 text-right text-[13px] text-slate-600">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">اسم الحملة</span>
          <span className="font-semibold text-slate-800">{campaignName}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-slate-500">رقم المعاملة</span>
          <span className="font-semibold text-slate-800">#{transactionId}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-slate-500">التاريخ</span>
          <span className="font-semibold text-slate-800">{dateLabel}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-right text-[14px] text-slate-500">
        <span>الإجمالي</span>
        <span className="font-bold text-blue-600">{amountLabel}</span>
      </div>
    </div>
  );
};

export default SuccessDetailsCard;
