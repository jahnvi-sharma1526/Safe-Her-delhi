import React from 'react';

interface CrowdDensityIndicatorProps {
  density: 1 | 2 | 3; // 1: calm, 2: moderate, 3: lively/busy
  showLabel?: boolean;
}

export const CrowdDensityIndicator: React.FC<CrowdDensityIndicatorProps> = ({
  density,
  showLabel = false
}) => {
  const labels = ['Quiet & Calm', 'Comfortable', 'Lively Footfall'];

  return (
    <div className="inline-flex items-center gap-1.5" title={`Crowd level: ${labels[density - 1]}`}>
      <div className="flex items-center gap-1">
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            density >= 1 ? 'bg-[#3A2E33]' : 'bg-[#3A2E33]/20'
          }`}
        />
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            density >= 2 ? 'bg-[#3A2E33]' : 'bg-[#3A2E33]/20'
          }`}
        />
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            density >= 3 ? 'bg-[#3A2E33]' : 'bg-[#3A2E33]/20'
          }`}
        />
      </div>
      {showLabel && (
        <span className="text-[12px] text-[#8B7D82] font-normal">
          {labels[density - 1]}
        </span>
      )}
    </div>
  );
};
