'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ProgressTopInfoProps } from '@/interfaces';

const ProgressTopInfo: React.FC<ProgressTopInfoProps> = ({
  value,
  displayValue,
  showValue,
  valueLabelClassName,
  label,
  LabelIcon,
  labelIconSize = 16,
  labelClassName,
  labelIconClassName,
  showValueOutside,
}) => {
  if (!showValue && !label) return null;

  return (
    <div
      className={`${showValueOutside ? 'flex items-center justify-between gap-2' : ''} text-white! text-sm font-normal mb-3`}
    >
      {showValueOutside && showValue && (
        <span
          className={cn(
            'tabular-nums text-(--primary-cta)',
            valueLabelClassName
          )}
        >
          {displayValue ?? `${value ?? 0}%`}
        </span>
      )}
      {label && (
        <p
          className={cn(
            `text-white text-right ${LabelIcon ? 'flex items-center justify-end gap-2' : ''}`,
            labelClassName
          )}
        >
          {label}
          {LabelIcon && (
            <LabelIcon
              size={labelIconSize}
              className={cn('text-(--bg-soft-blue)!', labelIconClassName)}
            />
          )}
        </p>
      )}
    </div>
  );
};

export { ProgressTopInfo };
