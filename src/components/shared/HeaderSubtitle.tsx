'use client';

import { mergeClasses as cn } from '@/lib/utils';

interface HeaderSubtitleProps {
  title: string;
  subtitle?: string;
  showStars?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function HeaderSubtitle({
  title,
  subtitle,
  showStars = true,
  className,
  titleClassName,
  subtitleClassName,
}: HeaderSubtitleProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2 text-center', className)}>
      <h1
        className={cn(
          'text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2',
          titleClassName
        )}
      >
        {showStars && <span className="text-amber-400">✦</span>}
        {title}
        {showStars && <span className="text-amber-400">✦</span>}
      </h1>
      {subtitle && (
        <p
          className={cn(
            'text-sm md:text-base text-slate-500 max-w-md',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default HeaderSubtitle;
