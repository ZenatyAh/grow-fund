"use client";

import React, { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const DONATION_OPTIONS = [1, 5, 10, 20];
const CUSTOM_MIN = 1;
const CUSTOM_MAX = 1000;

type DonationSidebarProps = {
  campaignId: string | number;
  raised: number;
  goal: number;
  daysLeft?: number;
  participants?: number;
};

const DonationSidebar = ({
  campaignId,
  raised,
  goal,
  daysLeft,
  participants,
}: DonationSidebarProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(5);
  const [customAmount, setCustomAmount] = useState("");
  const [customError, setCustomError] = useState<string | null>(null);
  const progressValue = useMemo(
    () => Math.min(Math.round((raised / goal) * 100), 100),
    [goal, raised]
  );
  const isComplete = goal > 0 && raised >= goal;
  const participantsCount =
    participants ?? Math.max(1, Math.round(raised / 5000));

  const selectedStars =
    selectedAmount === "custom"
      ? Number(customAmount || 0)
      : selectedAmount;
  const checkoutHref = `/campaigns/${campaignId}/checkout?stars=${selectedStars}`;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
          <span>{progressValue}%</span>
          {isComplete ? (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              حملة مكتملة
            </span>
          ) : (
            <span className="text-slate-400">نسبة الإنجاز</span>
          )}
        </div>
        <Progress
          value={progressValue}
          className="mt-3 h-2 bg-slate-100"
          indicatorClassName={cn(
            "bg-blue-600",
            isComplete && "bg-emerald-600"
          )}
        />
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
          <span>تم جمع {raised.toLocaleString()} نجمة</span>
          <span>الهدف {goal.toLocaleString()} نجمة</span>
        </div>
      </div>

      {!isComplete ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">اختر تبرعك</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {DONATION_OPTIONS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSelectedAmount(amount)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                  selectedAmount === amount
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                )}
              >
                <Star className="h-4 w-4" />
                {amount} نجوم
              </button>
            ))}
            <div
              className={cn(
                "col-span-2 flex flex-col gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                selectedAmount === "custom"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              )}
            >
              <div className="flex items-center justify-between">
                <span>نجمة</span>
                <span>اختر عدد النجوم</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={customAmount}
                onFocus={() => setSelectedAmount("custom")}
                onChange={(event) => {
                  const raw = event.target.value.replace(/[^0-9]/g, "");
                  setCustomAmount(raw);
                  if (!raw) {
                    setCustomError(null);
                    return;
                  }
                  const numeric = Number(raw);
                  if (Number.isNaN(numeric)) {
                    setCustomError("الرجاء إدخال رقم صحيح");
                    return;
                  }
                  if (numeric < CUSTOM_MIN) {
                    setCustomError(`الحد الأدنى ${CUSTOM_MIN} نجمة`);
                    return;
                  }
                  if (numeric > CUSTOM_MAX) {
                    setCustomError(`الحد الأقصى ${CUSTOM_MAX} نجمة`);
                    return;
                  }
                  setCustomError(null);
                }}
                placeholder={`من ${CUSTOM_MIN} إلى ${CUSTOM_MAX}`}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
              />
              {customError ? (
                <span className="text-xs text-rose-500">{customError}</span>
              ) : null}
            </div>
          </div>
          <Button asChild className="mt-4 w-full rounded-xl py-5 text-base">
            <Link href={checkoutHref}>
              أضف النجوم الآن
            </Link>
          </Button>
          <p className="mt-3 text-center text-xs text-slate-400">
            تبرعك يصنع فارقًا حقيقيًا في حياة الأسر
          </p>
        </div>
      ) : null}

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
        <span>{participantsCount} مشارك</span>
        {isComplete ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
            مكتملة
          </span>
        ) : (
          <span className="text-emerald-600">
            {daysLeft !== undefined ? `متبقي ${daysLeft} أيام للحملة` : "الحملة جارية"}
          </span>
        )}
      </div>
    </div>
  );
};

export default DonationSidebar;
