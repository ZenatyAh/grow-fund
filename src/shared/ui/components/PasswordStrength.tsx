import { PasswordStrengthProps } from '@/interfaces';
import { cn } from '@/lib/utils';

const PasswordStrength = ({ level, bars = 5 }: PasswordStrengthProps) => {
  return (
    <div className="mt-2 flex w-full gap-1">
      {Array.from({ length: bars }, (_, i) => i + 1).map((i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 flex-1 rounded-full transition-colors',
            level >= i
              ? level === 1
                ? 'bg-red-500'
                : level === 2
                  ? 'bg-yellow-500'
                  : 'bg-(--bg-green-light)'
              : 'bg-[#CBD5E1] dark:bg-(--bg-section)'
          )}
        />
      ))}
    </div>
  );
};

export default PasswordStrength;
