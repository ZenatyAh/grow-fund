'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ProgressBottomInfoProps } from '@/interfaces';

const ProgressBottomInfo: React.FC<ProgressBottomInfoProps> = ({
  value,
  displayValue,
  showValue,
  valueLabelClassName,
  subLabel,
  SubLabelIcon,
  subLabelClassName,
}) => {
  if (!showValue && !subLabel) return null;

  return (
    <div
      className={`${showValue ? 'flex items-center justify-between gap-2' : ''} text-white! text-sm font-normal mt-3`}
    >
      {showValue && (
        <span
          className={cn(
            'tabular-nums text-(--primary-cta)',
            valueLabelClassName
          )}
        >
          {displayValue ?? `${value ?? 0}%`}
        </span>
      )}
      {subLabel && (
        <p
          className={cn(
            `text-(--gray-medium) text-xs text-right ${SubLabelIcon ? 'flex items-center justify-end gap-2' : ''}`,
            subLabelClassName
          )}
        >
          {subLabel}
          {SubLabelIcon && <SubLabelIcon className="text-(--bg-soft-blue)" />}
        </p>
      )}
    </div>
  );
};

export { ProgressBottomInfo };
