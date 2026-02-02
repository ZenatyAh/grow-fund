import { EmptyStateProps } from '@/interfaces';

const EmptyState = ({
  Icon,
  iconSize = 60,
  iconClassName,
  text,
  textOtherClassName,
}: EmptyStateProps) => {
  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center gap-6 py-10">
      <Icon size={iconSize} className={iconClassName} />
      <p
        className={`text-2xl text-(--text-third) font-bold ${textOtherClassName}`}
      >
        {text}
      </p>
    </div>
  );
};

export default EmptyState;
