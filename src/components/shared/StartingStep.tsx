'use client';

import { ReactNode } from 'react';
import { mergeClasses as cn } from '@/lib/utils';

interface StartingStepProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function StartingStep({
  title,
  description,
  icon,
  className,
}: StartingStepProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-100/80',
        className
      )}
    >
      {/* Icon (Left in LTR, Right in RTL - layout is flex-row, so it depends on order. 
          Design has text on right (Arabic), icon on left.
          So in standard flow (RTL), icon should be second in DOM or flex-direction handled.
          I'll stick to logical order: Content then Icon, but visually Icon is on far end.
      */}
      
      {/* Icon Container */}
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center p-3 text-blue-500">
        {icon}
      </div>

      {/* Text Container */}
      <div className="flex-1 text-right">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {title}
        </h3>
        <p className="text-base text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default StartingStep;
