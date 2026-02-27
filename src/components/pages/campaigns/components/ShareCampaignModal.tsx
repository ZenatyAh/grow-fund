"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Copy,
  Facebook,
  Instagram,
  Mail,
  Send,
  Share2,
  Star,
  Twitter,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ShareCampaignModalProps = {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string | number;
  campaignTitle: string;
};

const ShareCampaignModal = ({
  isOpen,
  onClose,
  campaignId,
  campaignTitle,
}: ShareCampaignModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return `${window.location.origin}/campaigns/${campaignId}`;
  }, [campaignId]);

  const shareText = `ساهم في دعم هذه الحملة: ${campaignTitle}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const openShare = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: campaignTitle, text: shareText, url: shareUrl });
        return;
      } catch {
        // ignore
      }
    }
    handleCopy();
  };

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="مشاركة الحملة"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <button
            type="button"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            onClick={onClose}
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 text-xl font-bold text-slate-900">
            <span>شارك هذه الحملة</span>
            <Share2 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="w-9" />
        </div>

        {/* Body */}
        <div className="px-6 py-8 text-right">
          <div className="flex items-center justify-end gap-4 text-slate-900">
            <span className="text-2xl font-semibold">ساعدنا في نشر الخير</span>
            <Star className="h-7 w-7 text-blue-600" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div className="relative">
              <input
                value={shareUrl}
                readOnly
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-left text-base text-gray-600 focus:outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-700">
                رابط الحملة
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-semibold transition-colors",
                copied ? "bg-emerald-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              <Copy className="h-5 w-5" />
              {copied ? "تم النسخ" : "انسخ الرابط"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <ShareButton
              label="Facebook"
              onClick={() =>
                openShare(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
                )
              }
              icon={<Facebook className="h-6 w-6" />}
              color="bg-blue-600"
            />
            <ShareButton
              label="X"
              onClick={() =>
                openShare(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shareUrl
                  )}&text=${encodeURIComponent(shareText)}`
                )
              }
              icon={<Twitter className="h-6 w-6" />}
              color="bg-sky-500"
            />
            <ShareButton
              label="Instagram"
              onClick={handleCopy}
              icon={<Instagram className="h-6 w-6" />}
              color="bg-fuchsia-500"
            />
            <ShareButton
              label="تليجرام"
              onClick={() =>
                openShare(
                  `https://t.me/share/url?url=${encodeURIComponent(
                    shareUrl
                  )}&text=${encodeURIComponent(shareText)}`
                )
              }
              icon={<Send className="h-6 w-6" />}
              color="bg-sky-400"
            />
            <ShareButton
              label="Threads"
              onClick={handleCopy}
              icon={<Share2 className="h-6 w-6" />}
              color="bg-neutral-900"
            />
            <ShareButton
              label="Gmail"
              onClick={() =>
                openShare(
                  `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
                    campaignTitle
                  )}&body=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`
                )
              }
              icon={<Mail className="h-6 w-6" />}
              color="bg-red-500"
            />
            <ShareButton
              label="مشاركة"
              onClick={handleNativeShare}
              icon={<Share2 className="h-6 w-6" />}
              color="bg-slate-600"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

type ShareButtonProps = {
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

const ShareButton = ({ label, icon, color, onClick }: ShareButtonProps) => {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-2 text-sm font-semibold text-slate-800"
      onClick={onClick}
    >
      <span
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-sm",
          color
        )}
      >
        {icon}
      </span>
      {label}
    </button>
  );
};

export default ShareCampaignModal;
