"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items?: BreadcrumbItem[];
  labelMap?: Record<string, string>;
  currentLabel?: string;
  className?: string;
  separatorClassName?: string;
  itemClassName?: string;
  activeClassName?: string;
};

const defaultLabelMap: Record<string, string> = {
  "": "الرئيسية",
  campaigns: "استكشاف الحملات",
};

const Breadcrumbs = ({
  items,
  labelMap,
  currentLabel,
  className,
  separatorClassName,
  itemClassName,
  activeClassName,
}: BreadcrumbsProps) => {
  const pathname = usePathname();

  const computedItems = useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }

    const labels = { ...defaultLabelMap, ...(labelMap ?? {}) };
    const segments = pathname.split("/").filter(Boolean);

    const crumbs: BreadcrumbItem[] = [
      { label: labels[""] ?? "الرئيسية", href: "/" },
    ];

    let current = "";
    segments.forEach((segment, index) => {
      current += `/${segment}`;
      const label = labels[segment] ?? segment;
      const isLast = index === segments.length - 1;
      crumbs.push({
        label: isLast && currentLabel ? currentLabel : label,
        href: isLast ? undefined : current,
      });
    });

    return crumbs;
  }, [currentLabel, items, labelMap, pathname]);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-2 text-sm text-slate-400", className)}
    >
      {computedItems.map((item, index) => {
        const isLast = index === computedItems.length - 1;
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors hover:text-slate-600",
                  itemClassName
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "text-slate-500",
                  itemClassName,
                  isLast && "text-slate-500",
                  isLast && activeClassName
                )}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronLeft
                className={cn("h-4 w-4 text-slate-300", separatorClassName)}
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
