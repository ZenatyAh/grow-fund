'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { ProgressTopInfo } from './ProgressTopInfo';
import { ProgressBottomInfo } from './ProgressBottomInfo';
import PercentageValueInside from './PercentageValueInside';
import { ProgressProps } from '@/interfaces';

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      size = 'md',
      value,
      trackColor = 'var(--bg-bold-blue)',
      indicatorColor = 'var(--bg-blue-gray)',
      topDisplayValue,
      bottomDisplayValue,
      showInfo,
      label,
      showValueOutside,
      showValueInside = false,
      valueLabelClassName,
      labelClassName,
      LabelIcon,
      labelIconSize = 16,
      labelIconClassName,
      showSubInfo,
      subLabel,
      showSubValue,
      subLabelClassName,
      SubLabelIcon,
      subLabelIconSize = 16,
      subLabelIconClassName,
      progressVariant = 'percentage',
      customDisplay,
      ...props
    },
    ref
  ) => (
    <div className="relative w-full">
      <ProgressTopInfo
        value={value ?? 0}
        displayValue={topDisplayValue}
        showValue={showValueOutside}
        valueLabelClassName={valueLabelClassName}
        label={label}
        LabelIcon={LabelIcon}
        labelIconSize={labelIconSize}
        labelClassName={labelClassName}
        labelIconClassName={labelIconClassName}
        showValueOutside={showValueOutside}
      />
      <ProgressPrimitive.Root
        dir="rtl"
        ref={ref}
        className={cn(
          'relative w-full! overflow-hidden rounded-full',
          size === 'xs' && 'h-1.5',
          size === 'sm' && 'h-2',
          size === 'md' && 'h-3',
          size === 'lg' && 'h-4',
          size === 'xl' && 'h-6',
          className
        )}
        style={{ backgroundColor: trackColor }}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-(--primary-cta) transition-all duration-300 ease-in-out"
          style={{ width: `${value || 0}%`, backgroundColor: indicatorColor }}
        />
        <PercentageValueInside
          value={value ?? 0}
          showValueInside={showValueInside}
          progressVariant={progressVariant}
          customDisplay={customDisplay}
        />
      </ProgressPrimitive.Root>
      <ProgressBottomInfo
        value={value ?? 0}
        displayValue={bottomDisplayValue}
        showValue={showSubValue}
        valueLabelClassName={valueLabelClassName}
        subLabel={subLabel}
        SubLabelIcon={SubLabelIcon}
        subLabelClassName={subLabelClassName}
      />
    </div>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
