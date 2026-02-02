import { TitleWithIconProps } from '@/interfaces';

const TitleWithIcon = ({
  otherClassName,
  title,
  description,
  Icon,
  iconWrapperClassName,
  iconSize = 15,
  iconClassName,
  handleClick,
}: TitleWithIconProps) => {
  return (
    <div
      className={`w-full flex items-start justify-between gap-4 border-2 border-slate-200 p-4 rounded-lg shadow-lg ${otherClassName}`}
    >
      <div>
        <h2 className="text-lg text-(--text-secondary) font-normal">{title}</h2>
        <div className="text-2xl text-(--text-primary) font-bold mt-1.5">
          {description}
        </div>
      </div>
      {Icon && (
        <div
          className={`bg-(--brand-primary) flex items-center justify-center rounded-sm p-1 cursor-pointer ${iconWrapperClassName}`}
          onClick={handleClick}
        >
          <Icon size={iconSize} className={`text-white ${iconClassName}`} />
        </div>
      )}
    </div>
  );
};

export default TitleWithIcon;
