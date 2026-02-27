"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CampaignsFilters } from "../index";

const rowBase =
  "flex items-center justify-between px-6 py-5 text-lg font-medium text-slate-700";

type SectionKey =
  | "executor"
  | "scope"
  | "popularity"
  | "dateOrder"
  | "progress"
  | "size"
  | "duration"
  | "status";

const FILTER_SECTIONS: Array<{
  key: SectionKey;
  title: string;
  items: Array<{ label: string; value: string }>;
}> = [
    {
      key: "executor",
      title: "الجهة المنفذة",
      items: [
        { label: "جمعية موثوقة", value: "trusted_org" },
        { label: "مبادرة أهلية", value: "community_initiative" },
        { label: "مؤسسة رسمية", value: "official_org" },
        { label: "شريك دولي", value: "international_partner" },
      ],
    },
    {
      key: "scope",
      title: "نطاق الحملة",
      items: [
        { label: "محلي", value: "local" },
        { label: "إقليمي", value: "regional" },
        { label: "دولي", value: "international" },
      ],
    },
    {
      key: "popularity",
      title: "حسب الشعبية",
      items: [
        { label: "الأكثر تبرعًا", value: "most_donated" },
        { label: "الأكثر مشاركة", value: "most_shared" },
        { label: "الأكثر مشاهدة", value: "most_viewed" },
      ],
    },
    {
      key: "dateOrder",
      title: "حسب تاريخ الإضافة",
      items: [
        { label: "الأحدث", value: "newest" },
        { label: "الأقدم", value: "oldest" },
      ],
    },
    {
      key: "progress",
      title: "نسبة الإنجاز",
      items: [
        { label: "أقل من 25%", value: "lt_25" },
        { label: "25% - 50%", value: "25_50" },
        { label: "50% - 75%", value: "50_75" },
        { label: "أكثر من 75%", value: "gt_75" },
      ],
    },
    {
      key: "size",
      title: "حجم الحملة",
      items: [
        { label: "صغيرة", value: "small" },
        { label: "متوسطة", value: "medium" },
        { label: "كبيرة", value: "large" },
      ],
    },
    {
      key: "duration",
      title: "مدة الحملة",
      items: [
        { label: "أسبوع", value: "week" },
        { label: "شهر", value: "month" },
        { label: "3 أشهر", value: "three_months" },
        { label: "أكثر من 3 أشهر", value: "over_three_months" },
      ],
    },
    {
      key: "status",
      title: "حالة الحملة",
      items: [
        { label: "عاجلة جدًا", value: "very_urgent" },
        { label: "عاجلة", value: "urgent" },
        { label: "غير عاجلة", value: "not_urgent" },
      ],
    },
  ];

type CampaignsFiltersSidebarProps = {
  filters: CampaignsFilters;
  onFiltersChange: (filters: CampaignsFilters) => void;
};

const CampaignsFiltersSidebar = ({
  filters,
  onFiltersChange,
}: CampaignsFiltersSidebarProps) => {
  const [openSection, setOpenSection] = useState<SectionKey | null>(null);

  const toggleSection = (key: SectionKey) => {
    setOpenSection((current) => (current === key ? null : key));
  };

  const handleSelect = (section: SectionKey, value: string) => {
    onFiltersChange({
      ...filters,
      [section]: filters[section] === value ? undefined : value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <aside className="w-full max-w-sm rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="divide-y divide-slate-200 text-right">
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold text-slate-800">الفلترة</span>
          <button
            type="button"
            onClick={() => onFiltersChange({})}
            disabled={!hasActiveFilters}
            className={cn(
              "text-sm font-semibold transition-colors",
              hasActiveFilters
                ? "text-blue-600 hover:text-blue-700"
                : "text-slate-300 cursor-not-allowed"
            )}
          >
            إزالة الفلترة
          </button>
        </div>
        {FILTER_SECTIONS.map((section) => {
          const isOpen = openSection === section.key;

          return (
            <div key={section.key}>
              <button
                type="button"
                onClick={() => toggleSection(section.key)}
                className={cn(rowBase, "w-full text-slate-700")}
                aria-expanded={isOpen}
              >
                <span>{section.title}</span>
                {isOpen ? (
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-slate-500 transition-transform",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                ) : (
                  <ChevronLeft className="h-5 w-5 text-slate-500" />
                )}
              </button>
              {isOpen ? (
                <div className="px-6 pb-4 text-base text-slate-600">
                  {section.items.map((item, index) => (
                    <button
                      key={item.value}
                      type="button"
                      className={cn(
                        "w-full py-3 text-right transition-colors",
                        index > 0 && "border-t border-slate-200",
                        filters[section.key] === item.value
                          ? "text-blue-600 font-semibold bg-blue-50/70 rounded-xl px-3"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 rounded-xl px-3"
                      )}
                      onClick={() => handleSelect(section.key, item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default CampaignsFiltersSidebar;
