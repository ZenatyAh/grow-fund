import { InfoTextProps } from '@/interfaces';

const InfoText = ({ Icon, text, className, iconWrapper, iconSize = 20, iconClassName }: InfoTextProps) => (
  <div className={`flex items-center gap-3 mt-2.5 ${className}`}>
    {Icon && (
      <div className={iconWrapper}>
        <Icon size={iconSize} className={`text-(--bg-bold-blue) ${iconClassName}`} />
      </div>
    )}
    <p className="text-base text-(--text-slate-400)">{text}</p>
  </div>
);

export default InfoText;
