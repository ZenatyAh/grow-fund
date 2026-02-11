import React from "react";

type SuccessHeroProps = {
  title: string;
  subtitle: string;
};

const SuccessHero = ({ title, subtitle }: SuccessHeroProps) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-[160px] w-[160px] items-center justify-center rounded-full bg-white shadow-sm">
        <span className="text-[80px]" aria-hidden="true">
          👍
        </span>
      </div>
      <h1 className="mt-6 text-[22px] font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-[13px] text-slate-500">{subtitle}</p>
    </div>
  );
};

export default SuccessHero;
