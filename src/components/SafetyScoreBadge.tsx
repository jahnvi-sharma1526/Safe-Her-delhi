import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface SafetyScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'lavender' | 'sage' | 'radial';
}

export const SafetyScoreBadge: React.FC<SafetyScoreBadgeProps> = ({
  score,
  size = 'md',
  showLabel = true,
  variant = 'lavender'
}) => {
  if (variant === 'radial') {
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-[#E5DFF2]/60"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-[#9BB79C]"
            strokeDasharray={`${score * 10}, 100`}
            strokeWidth="3"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="absolute text-[10px] font-bold text-[#4A2E3A]">
          {score.toFixed(1)}
        </span>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-[12px] px-2.5 py-1 gap-1.5',
    lg: 'text-[14px] px-3.5 py-1.5 gap-2 font-semibold'
  };

  return (
    <div
      id={`safety-score-${score}`}
      className={`inline-flex items-center rounded-full font-semibold tracking-tight transition-colors bg-[#E5DFF2]/80 text-[#4A2E3A] border border-[#E5DFF2] ${sizeClasses[size]}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#9BB79C]" />
      <span>{score.toFixed(1)}</span>
      {showLabel && (
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B7A82] ml-0.5">
          Safe
        </span>
      )}
    </div>
  );
};
