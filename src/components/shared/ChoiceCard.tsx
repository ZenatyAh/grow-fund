'use client';

import { ReactNode } from 'react';
import { mergeClasses as cn } from '@/lib/utils';
import { Button } from '@/components/shared/Button';

interface ChoiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  onSelect: () => void;
  selected?: boolean;
  className?: string;
}

export function ChoiceCard({
  icon,
  title,
  description,
  buttonLabel,
  onSelect,
  selected = false,
  className,
}: ChoiceCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 p-8 rounded-2xl bg-slate-50 border transition-all duration-200',
        selected ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200',
        'hover:border-blue-400',
        className
      )}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>

      {/* Description */}
      <p className="text-sm text-slate-500 text-center max-w-[250px]">
        {description}
      </p>

      {/* Action Button */}
      <Button variant="primary" size="sm" onClick={onSelect} className="mt-2">
        {buttonLabel}
      </Button>
    </div>
  );
}

export default ChoiceCard;
