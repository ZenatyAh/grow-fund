import { StarsOption } from '@/interfaces';

type Props = {
  options: StarsOption[];
  selected: number | 'all';
  onSelect: (value: number | 'all') => void;
};

export function StarsSelector({ options, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((opt) => {
        const isActive = selected === opt.value;

        return (
          <button
            key={opt.label}
            onClick={() => onSelect(opt.value)}
            className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium
              ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            ⭐{opt.label}
          </button>
        );
      })}
    </div>
  );
}
