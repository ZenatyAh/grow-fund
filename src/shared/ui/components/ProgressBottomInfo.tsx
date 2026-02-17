'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ProgressBottomInfoProps } from '@/interfaces';

const ProgressBottomInfo: React.FC<ProgressBottomInfoProps> = ({
  value,
  displayValue,
  showValue,
  valueSubLabelClassName,
  subLabel,
  SubLabelIcon,
  subLabelClassName,
  subLabelIconClassName,
}) => {
  if (!showValue && !subLabel) return null;

  return (
    <div
      className={`${showValue ? 'flex items-center justify-between gap-2' : ''} text-white! text-sm font-normal mt-3`}
    >
      {subLabel && (
        <p
          className={cn(
            `text-(--gray-medium) text-xs text-right ${SubLabelIcon ? 'flex items-center justify-end gap-2' : ''}`,
            subLabelClassName
          )}
        >
          {SubLabelIcon && <SubLabelIcon className={cn('text-(--bg-soft-blue)', subLabelIconClassName)} />}
          {subLabel}
        </p>
      )}
      {showValue && (
        <span
          className={cn(
            'tabular-nums text-(--primary-cta)',
            valueSubLabelClassName
          )}
        >
          {displayValue ?? `${value ?? 0}%`}
        </span>
      )}
    </div>
  );
};

export { ProgressBottomInfo };
