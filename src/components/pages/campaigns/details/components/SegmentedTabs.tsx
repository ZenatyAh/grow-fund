"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type SegmentedTab = {
  id: string;
  label: string;
};

type SegmentedTabsProps = {
  tabs: SegmentedTab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  tabClassName?: string;
};

const SegmentedTabs = ({
  tabs,
  activeId,
  onChange,
  className,
  tabClassName,
}: SegmentedTabsProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center rounded-full bg-slate-100 p-1.5",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex-1 rounded-full px-6 py-3 text-base font-semibold transition-all",
              tabClassName,
              isActive
                ? "bg-white text-slate-900 shadow"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedTabs;
