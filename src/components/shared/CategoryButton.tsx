'use client';

import { ReactNode } from 'react';
import { mergeClasses as cn } from '@/lib/utils';
import { Button } from '@/components/shared/Button';

interface CategoryButtonProps {
  label: string;
  icon: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryButton({
  label,
  icon,
  selected = false,
  onClick,
  className,
}: CategoryButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={selected ? 'primary' : 'subtle'}
      className={cn(
        'group h-auto px-6 py-3 rounded-2xl min-w-[140px] text-base gap-3 transition-all duration-200',
        selected
          ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-200 hover:bg-blue-700'
          : 'bg-white border border-slate-200 text-slate-600 hover:bg-white hover:border-blue-300 hover:text-blue-600 shadow-none',
        className
      )}
    >
      <span className="font-bold">{label}</span>
      <span className={cn(
        "transition-transform duration-200 group-hover:scale-110",
        selected ? "text-white" : "text-slate-500 group-hover:text-blue-600"
      )}>
        {icon}
      </span>
    </Button>
  );
}

export default CategoryButton;
