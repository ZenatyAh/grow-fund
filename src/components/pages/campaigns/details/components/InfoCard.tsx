import React from "react";
import { cn } from "@/lib/utils";

type InfoCardProps = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

const InfoCard = ({ title, className, children }: InfoCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm",
        className
      )}
    >
      {title ? (
        <h3 className="mb-3 text-lg font-semibold text-slate-900">{title}</h3>
      ) : null}
      {children}
    </div>
  );
};

export default InfoCard;
