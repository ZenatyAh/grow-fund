"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import CampaignLikeButton from "./CampaignLikeButton";
import CampaignShareButton from "./CampaignShareButton";

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
  const detailsHref = `/campaigns/${id}`;

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] border border-slate-100",
        className
      )}
    >
      {/* Image Container */}
      <Link href={detailsHref} className="relative aspect-[4/3] w-full overflow-hidden block">
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
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 text-right">
        {/* Actions Row */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CampaignShareButton campaignId={id} campaignTitle={title} />
            <CampaignLikeButton campaignId={id} />
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-5 py-2 text-base font-semibold text-blue-600">
            {category}
          </span>
        </div>

        {/* Title */}
        <Link href={detailsHref}>
          <h3
            className="mb-3 text-2xl font-extrabold leading-snug text-slate-900 line-clamp-2 hover:text-blue-700 transition-colors"
            title={title}
          >
            {title}
          </h3>
        </Link>
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
    </div>
  );
};

export default CampaignCard;
