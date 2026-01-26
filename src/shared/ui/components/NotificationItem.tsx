import { NotificationItemProps } from '@/interfaces';

const NotificationItem = ({
  Icon,
  title,
  time,
  description,
}: NotificationItemProps) => {
  return (
    <li className="bg-white border-2 border-(--bg-slate-100) rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center bg-(--bg-light-blue) rounded-full w-10 h-10">
          {Icon && <Icon size={20} className="text-(--bg-bold-blue)" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3 mb-1">
            <h3 className="text-(--text-primary) text-lg font-bold">{title}</h3>
            <span className="text-base text-(--text-secondary) font-bold">
              {time}
            </span>
          </div>
          <p className="text-sm font-normal text-(--text-secondary)">
            {description}
          </p>
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
