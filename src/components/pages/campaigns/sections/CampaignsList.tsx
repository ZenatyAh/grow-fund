"use client";

import React, { useEffect, useMemo, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, SearchX } from "lucide-react";
import type { CampaignsFilters } from "../index";

// Dummy Data
const CAMPAIGNS = [
  {
    id: 1,
    title: "حملة سلة الخير: ساهم في توفير الغذاء للأسر المتعففة",
    image: "/images/home/background.png",
    category: "إغاثة غذائية",
    date: "تم نشر في 1/1/2025",
    createdAt: "2025-01-01",
    description:
      "حملة إغاثية عاجلة تهدف لتأمين الاحتياجات الغذائية الأساسية لـ 500 أسرة متعففة في القرى والهجر والمدن. كن عونًا لهم في ظل الظروف الصعبة.",
    raised: 154700,
    goal: 5200000,
    daysLeft: 5,
    executor: "trusted_org",
    scope: "local",
    shares: 240,
    views: 1200,
  },
  {
    id: 2,
    title: "سقيا رحمة: مياه نقية للمحتاجين",
    image: "/images/home/background.png",
    category: "مياه",
    date: "تم نشر في 5/1/2025",
    createdAt: "2025-01-05",
    description:
      "مشروع حفر آبار وتوفير محطات تحلية للمياه في المناطق النائية التي تعاني من شح المياه الصالحة للشرب.",
    raised: 89000,
    goal: 150000,
    daysLeft: 12,
    executor: "official_org",
    scope: "regional",
    shares: 140,
    views: 980,
  },
  {
    id: 3,
    title: "ترميم منازل الفقراء",
    image: "/images/home/background.png",
    category: "إيواء",
    date: "تم نشر في 12/1/2025",
    createdAt: "2025-01-12",
    description:
      "ساعد في ترميم منازل الأسر الأشد احتياجًا لتوفير مأوى آمن وكريم يحميهم من تقلبات الطقس.",
    raised: 230000,
    goal: 400000,
    daysLeft: 3,
    executor: "community_initiative",
    scope: "local",
    shares: 310,
    views: 1500,
  },
  {
    id: 4,
    title: "علاج مرضى الفشل الكلوي",
    image: "/images/home/background.png",
    category: "صحة",
    date: "تم نشر في 15/1/2025",
    createdAt: "2025-01-15",
    description:
      "دعم تكاليف جلسات الغسيل الكلوي للمرضى غير القادرين، وتوفير الأدوية اللازمة لهم.",
    raised: 78000,
    goal: 250000,
    daysLeft: 8,
    executor: "trusted_org",
    scope: "regional",
    shares: 90,
    views: 620,
  },
  {
    id: 5,
    title: "الحقيبة المدرسية",
    image: "/images/home/background.png",
    category: "تعليم",
    date: "تم نشر في 20/1/2025",
    createdAt: "2025-01-20",
    description:
      "توفير الحقائب المدرسية والقرطاسية للطلاب والطالبات من الأسر ذوي الدخل المحدود.",
    raised: 12000,
    goal: 50000,
    daysLeft: 10,
    executor: "official_org",
    scope: "international",
    shares: 60,
    views: 410,
  },
  {
    id: 6,
    title: "حماية الحياة البرية المحلية",
    image: "/images/home/background.png",
    category: "بيئة",
    date: "تم نشر في 11/2/2025",
    createdAt: "2025-02-11",
    description:
      "برنامج توعوي وميداني لحماية الموائل الطبيعية والحياة البرية في المنطقة.",
    raised: 48000,
    goal: 130000,
    daysLeft: 6,
    executor: "international_partner",
    scope: "international",
    shares: 200,
    views: 840,
  },
  {
    id: 7,
    title: "إنقاذ الحيوانات المصابة",
    image: "/images/home/background.png",
    category: "حيوانات",
    date: "تم نشر في 14/2/2025",
    createdAt: "2025-02-14",
    description:
      "توفير الرعاية البيطرية للحيوانات المصابة وإعادة تأهيلها وإطلاقها.",
    raised: 37000,
    goal: 95000,
    daysLeft: 4,
    executor: "community_initiative",
    scope: "local",
    shares: 180,
    views: 760,
  },
];

type CampaignsListProps = {
  searchQuery: string;
  activeCategoryLabel: string;
  filters: CampaignsFilters;
};

const CampaignsList = ({
  searchQuery,
  activeCategoryLabel,
  filters,
}: CampaignsListProps) => {
    const PAGE_SIZE = 8;
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const getProgressPercent = (campaign: (typeof CAMPAIGNS)[number]) =>
        Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);

    const getSizeLabel = (campaign: (typeof CAMPAIGNS)[number]) => {
        if (campaign.goal < 100000) return "small";
        if (campaign.goal < 500000) return "medium";
        return "large";
    };

    const getDurationLabel = (campaign: (typeof CAMPAIGNS)[number]) => {
        if (campaign.daysLeft <= 7) return "week";
        if (campaign.daysLeft <= 30) return "month";
        if (campaign.daysLeft <= 90) return "three_months";
        return "over_three_months";
    };

    const getStatusLabel = (campaign: (typeof CAMPAIGNS)[number]) => {
        if (campaign.daysLeft <= 3) return "very_urgent";
        if (campaign.daysLeft <= 7) return "urgent";
        return "not_urgent";
    };

    const applySorting = (list: (typeof CAMPAIGNS)[number][]) => {
        if (filters.dateOrder) {
            return [...list].sort((a, b) =>
                filters.dateOrder === "newest"
                    ? new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                    : new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime()
            );
        }

        if (filters.popularity) {
            return [...list].sort((a, b) => {
                if (filters.popularity === "most_shared") {
                    return b.shares - a.shares;
                }
                if (filters.popularity === "most_viewed") {
                    return b.views - a.views;
                }
                return b.raised - a.raised;
            });
        }

        return list;
    };

    const filteredCampaigns = useMemo(() => {
        const base = CAMPAIGNS.filter((campaign) => {
            const shouldFilterByCategory =
                activeCategoryLabel && activeCategoryLabel !== "الكل";

            const matchesCategory = shouldFilterByCategory
                ? campaign.category === activeCategoryLabel
                : true;

            const matchesExecutor = filters.executor
                ? campaign.executor === filters.executor
                : true;
            const matchesScope = filters.scope
                ? campaign.scope === filters.scope
                : true;
            const matchesProgress = filters.progress
                ? (() => {
                      const progress = getProgressPercent(campaign);
                      if (filters.progress === "lt_25") return progress < 25;
                      if (filters.progress === "25_50")
                          return progress >= 25 && progress < 50;
                      if (filters.progress === "50_75")
                          return progress >= 50 && progress < 75;
                      return progress >= 75;
                  })()
                : true;
            const matchesSize = filters.size
                ? getSizeLabel(campaign) === filters.size
                : true;
            const matchesDuration = filters.duration
                ? getDurationLabel(campaign) === filters.duration
                : true;
            const matchesStatus = filters.status
                ? getStatusLabel(campaign) === filters.status
                : true;

            if (!normalizedQuery) {
                return (
                    matchesCategory &&
                    matchesExecutor &&
                    matchesScope &&
                    matchesProgress &&
                    matchesSize &&
                    matchesDuration &&
                    matchesStatus
                );
            }

            const haystack = [
                campaign.title,
                campaign.description,
                campaign.category,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch = haystack.includes(normalizedQuery);

            return (
                matchesCategory &&
                matchesSearch &&
                matchesExecutor &&
                matchesScope &&
                matchesProgress &&
                matchesSize &&
                matchesDuration &&
                matchesStatus
            );
        });
        return applySorting(base);
    }, [activeCategoryLabel, filters, normalizedQuery]);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [activeCategoryLabel, normalizedQuery]);

    const visibleCampaigns = filteredCampaigns.slice(0, visibleCount);
    const hasMore = visibleCount < filteredCampaigns.length;
    const canShowLess = visibleCount > PAGE_SIZE;

    return (
        <section className="w-full pt-6 pb-12">
                {filteredCampaigns.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-16 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                            <SearchX className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            لا توجد حملات مطابقة
                        </h3>
                        <p className="mt-2 max-w-md text-base text-gray-600">
                            جرّب كلمات بحث مختلفة أو اختر فئة أخرى لعرض حملات
                            جديدة.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Campaigns Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleCampaigns.map((campaign) => (
                                <CampaignCard key={campaign.id} {...campaign} />
                            ))}
                        </div>
                    </>
                )}

                {hasMore || canShowLess ? (
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
                        {canShowLess ? (
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full px-8 py-6 gap-2 text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                                onClick={() => setVisibleCount(PAGE_SIZE)}
                            >
                                <span>عرض أقل</span>
                            </Button>
                        ) : null}
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-6 gap-2 text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                            onClick={() =>
                                setVisibleCount((count) => count + PAGE_SIZE)
                            }
                        >
                            <span>عرض المزيد</span>
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </div>
                ) : null}
        </section>
    );
};

export default CampaignsList;
