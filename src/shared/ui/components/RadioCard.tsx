'use client';

import { Controller, type Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface RadioCardProps {
  inputName: string;
  control: Control<any>;
  RadioIcon?: React.ElementType;
  radioValue: string;
  radioLabel: string;
}

export function RadioCard({
  inputName,
  control,
  radioValue,
  radioLabel,
  RadioIcon,
}: RadioCardProps) {
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field }) => {
        const isChecked = field.value === radioValue;

        return (
          <label
            className={cn(
              'flex items-center justify-between gap-5 w-full p-6 rounded-2xl cursor-pointer transition-all border',
              isChecked
                ? 'bg-(--bg-soft-blue) border-2 border-(--primary-cta)'
                : 'bg-(--bg-app) border-gray-200'
            )}
          >
            {/* Left: Radio */}
            <div className="flex items-center gap-4">
              <input
                type="radio"
                value={radioValue}
                checked={isChecked}
                onChange={() => field.onChange(radioValue)}
                className="sr-only"
              />

              <div
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                  isChecked ? 'border-(--brand-primary)' : 'border-gray-300'
                )}
              >
                {isChecked && (
                  <div className="w-3 h-3 bg-(--brand-primary) rounded-full" />
                )}
              </div>
            </div>

            {/* Right: Text + Icon */}
            <div className="flex items-center gap-3 text-(--text-primary)">
              <span className="text-lg font-bold">{radioLabel}</span>
              {RadioIcon && <RadioIcon size={28} />}
            </div>
          </label>
        );
      }}
    />
  );
}
