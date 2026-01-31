'use client';

import { ReactNode } from 'react';
import { mergeClasses as cn } from '@/lib/utils';

interface RadioSelectProps {
  id: string;
  name: string;
  value: string;
  label: string;
  icon?: ReactNode;
  checked?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export function RadioSelect({
  id,
  name,
  value,
  label,
  icon,
  checked = false,
  onChange,
  className,
}: RadioSelectProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'group flex items-center justify-between w-full h-[72px] px-6 rounded-2xl border transition-all duration-200 cursor-pointer',
        checked 
          ? 'bg-blue-50 border-blue-500' 
          : 'bg-white border-slate-200 hover:border-blue-300',
        className
      )}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        className="sr-only"
      />

      {/* Left: Radio Circle */}
      <div 
        className={cn(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
          checked 
            ? 'border-blue-500' 
            : 'border-slate-300 group-hover:border-blue-400'
        )}
      >
        <div 
          className={cn(
            'w-3 h-3 rounded-full bg-blue-500 transition-transform duration-200',
            checked ? 'scale-100' : 'scale-0'
          )} 
        />
      </div>

      {/* Right: Label & Icon */}
      <div className="flex items-center gap-4">
        <span className={cn(
          "text-base font-medium",
          checked ? 'text-blue-900' : 'text-slate-700'
        )}>
          {label}
        </span>
        {icon && (
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
            checked ? 'bg-white text-blue-500' : 'bg-slate-100 text-slate-500'
          )}>
            {icon}
          </div>
        )}
      </div>
    </label>
  );
}

export default RadioSelect;
