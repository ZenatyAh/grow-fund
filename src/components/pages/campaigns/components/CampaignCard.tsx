"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import ShareCampaignModal from "./ShareCampaignModal";

interface CampaignCardProps {
  id: string | number;
  title: string;
  image: string;
  category: string;
  date: string;
  description: string;
  raised: number;
  goal: number;
  donorsCount?: number;
  daysLeft?: number;
  creatorName?: string;
  className?: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  id,
  title,
  image,
  category,
  date,
  description,
  raised,
  goal,
  donorsCount,
  daysLeft = 5,
  className,
}) => {
  const progressPercentage = Math.min(Math.round((raised / goal) * 100), 100);
  const [isLiked, setIsLiked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(`campaign-like:${id}`);
    setIsLiked(stored === "true");
  }, [id]);

  const toggleLike = () => {
    setIsLiked((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(`campaign-like:${id}`, String(next));
      }
      return next;
    });
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] border border-slate-100",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Time Badge */}
        <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
          <span>متبقي {daysLeft} أيام</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500">
            <Clock className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 text-right">
        {/* Actions Row */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-full bg-slate-100 text-blue-600 hover:bg-slate-200"
              onClick={() => setIsShareOpen(true)}
              aria-label="مشاركة الحملة"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "h-12 w-12 rounded-full bg-slate-100 text-rose-500 hover:bg-slate-200",
                isLiked && "text-rose-600"
              )}
              onClick={toggleLike}
              aria-pressed={isLiked}
              aria-label={isLiked ? "إلغاء الإعجاب" : "أعجبني"}
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isLiked && "fill-current"
                )}
              />
            </Button>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-5 py-2 text-base font-semibold text-blue-600">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-3 text-2xl font-extrabold leading-snug text-slate-900 line-clamp-2"
          title={title}
        >
          {title}
        </h3>
        <div className="mb-4 text-sm text-slate-500">{date}</div>

        {/* Description */}
        <p className="mb-6 text-base leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>

        {/* Progress Section (Push to bottom) */}
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
            <span>تم جمع {raised.toLocaleString()} نجمة</span>
            <span>من {goal.toLocaleString()}</span>
          </div>
          <Progress
            value={progressPercentage}
            className="h-2 bg-slate-100"
            indicatorClassName="bg-blue-600"
          />
          <Button className="w-full rounded-2xl py-6 text-lg" size="lg">
            أضف نجمة للحملة
          </Button>
        </div>
      </div>
      <ShareCampaignModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        campaignId={id}
        campaignTitle={title}
      />
    </div>
  );
};

export default CampaignCard;
