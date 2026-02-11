'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import CampaignLikeButton from '../../components/CampaignLikeButton';

export type UpdateCardProps = {
  authorName: string;
  authorAvatar: string;
  verified?: boolean;
  timeLabel: string;
  title?: string;
  description?: string;
  image: string;
  likes: number;
  likeId: string | number;
  showLikes?: boolean;
  formatLikes?: (likes: number) => string;
  className?: string;
};

const UpdateCard = ({
  authorName,
  authorAvatar,
  verified = false,
  timeLabel,
  title,
  description,
  image,
  likes,
  likeId,
  showLikes = true,
  formatLikes,
  className,
}: UpdateCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const stored = window.localStorage.getItem(`campaign-like:${likeId}`);
    setIsLiked(stored === 'true');
  }, [likeId]);

  const displayLikes = likes + (isLiked ? 1 : 0);
  const likesText = useMemo(() => {
    const formatted = formatLikes
      ? formatLikes(displayLikes)
      : new Intl.NumberFormat('ar', { notation: 'compact' }).format(displayLikes);
    return `${formatted} إعجاب`;
  }, [displayLikes, formatLikes]);
  return (
    <article
      className={cn(
        'rounded-[28px] border border-slate-200 bg-white px-6 pb-6 pt-6 text-right shadow-sm',
        className
      )}
    >
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10">
            <Image
              src={authorAvatar}
              alt={authorName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div
              className="flex items-center gap-2 text-[18px] font-bold text-black"
              style={{
                fontFamily: 'Tajawal',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: '20px',
                lineHeight: '150%',
                letterSpacing: '0%',
              }}
            >
              {authorName}
              {verified ? (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
              ) : null}
            </div>
            <div className="text-[16px] text-slate-400">{timeLabel}</div>
          </div>
        </div>
      </header>

      {title || description ? (
        <div className="mt-5 space-y-2">
          {title ? (
            <p
              className="text-[18px] font-semibold text-black"
              style={{
                fontFamily: 'Tajawal',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                textAlign: 'right',
              }}
            >
              {title}
            </p>
          ) : null}
          {description ? (
            <p
              className="text-[18px] text-black"
              style={{
                fontFamily: 'Tajawal',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                textAlign: 'right',
              }}
            >
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-[20px] border border-white/10">
        <div className="relative h-[240px] sm:h-[360px] lg:h-[420px]">
          <Image src={image} alt="" fill className="object-cover" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        {showLikes ? (
          <span
            className="text-[18px] text-rose-500"
            style={{
              fontFamily: "Tajawal",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "160%",
              letterSpacing: "0%",
              textAlign: "right",
            }}
          >
            {likesText}
          </span>
        ) : null}
        <CampaignLikeButton
          campaignId={likeId}
          onToggle={setIsLiked}
          className="h-10 w-10 bg-rose-50 text-rose-500 hover:bg-rose-100"
          iconClassName="h-4 w-4"
        />
      </div>
    </article>
  );
};

export default UpdateCard;
