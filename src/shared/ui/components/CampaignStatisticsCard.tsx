import { CampaignStatisticsCardProps } from '@/interfaces';

const CampaignStatisticsCard = ({
  otherClassName,
  Icon,
  iconSize,
  iconClassName,
  title,
  count,
  label,
}: CampaignStatisticsCardProps) => {
  return (
    <div
      className={`w-full bg-white border-2 border-(--bg-slate-100) rounded-xl p-6 flex items-center gap-4 shadow-xl ${otherClassName}`}
    >
      <div className="bg-(--bg-light-blue) border border-(--bg-slate-100) flex items-center justify-center w-12 h-12 rounded-full">
        <Icon
          size={iconSize}
          className={`text-(--bg-bold-blue) ${iconClassName}`}
        />
      </div>
      <div className="text-(--text-third) space-y-4">
        <p className="text-base font-normal">{title}</p>
        <div
          className={`${count ? 'flex items-center gap-2' : ''} text-xl font-bold`}
        >
          {count && <span>{count}</span>}
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignStatisticsCard;
