'use client';

import { ReactNode } from 'react';
import { mergeClasses as cn } from '@/lib/utils';
import { HeaderSubtitle } from '@/components/shared/HeaderSubtitle';

interface SuccessStateProps {
  image?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function SuccessState({
  image,
  title,
  description,
  className,
}: SuccessStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500', className)}>
      {/* Success Image/Icon */}
      {image && (
        <div className="mb-6 relative">
             <div className="text-6xl md:text-8xl animate-bounce">
                {image}
             </div>
             {/* Decor elements could go here */}
        </div>
      )}

      {/* Reuse HeaderSubtitle for consistent typography */}
      <HeaderSubtitle 
        title={title} 
        subtitle={description}
        showStars={true}
        titleClassName="text-3xl md:text-4xl text-slate-900"
        subtitleClassName="text-slate-500 mt-2 text-lg"
      />
    </div>
  );
}

export default SuccessState;
