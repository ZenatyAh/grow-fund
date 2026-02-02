import { ProgressValueInsideProp } from '@/interfaces';
import React from 'react';

const PercentageValueInside = ({
  value,
  showValueInside,
  progressVariant,
  customDisplay,
}: ProgressValueInsideProp) => {
  return (
    <div>
      {showValueInside &&
        (progressVariant === 'percentage' ? (
          <span className="absolute inset-0 flex items-center justify-center text-white font-normal tabular-nums">
            {value ?? 0}%
          </span>
        ) : (
          <div className="absolute inset-0 inline-flex">{customDisplay}</div>
        ))}
    </div>
  );
};

export default PercentageValueInside;
