"use client";

import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignLikeButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "onToggle"> {
  campaignId: string | number;
  iconClassName?: string;
  onToggle?: (nextLiked: boolean) => void;
}

const CampaignLikeButton: React.FC<CampaignLikeButtonProps> = ({
  campaignId,
  className,
  iconClassName,
  onToggle,
  ...props
}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(`campaign-like:${campaignId}`);
    setIsLiked(stored === "true");
  }, [campaignId]);

  const toggleLike = () => {
    const next = !isLiked;
    setIsLiked(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(`campaign-like:${campaignId}`, String(next));
    }
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-rose-500 transition-colors hover:bg-slate-200",
        className,
        isLiked && "text-rose-600"
      )}
      onClick={toggleLike}
      aria-pressed={isLiked}
      aria-label={isLiked ? "إلغاء الإعجاب" : "أعجبني"}
      {...props}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isLiked && "fill-current",
          iconClassName
        )}
      />
    </button>
  );
};

export default CampaignLikeButton;
