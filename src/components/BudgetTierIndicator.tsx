import React from 'react';

interface BudgetTierIndicatorProps {
  tier: 1 | 2 | 3;
}

export const BudgetTierIndicator: React.FC<BudgetTierIndicatorProps> = ({ tier }) => {
  return (
    <div className="inline-flex items-center text-[13px] font-medium tracking-tight">
      <span className={tier >= 1 ? 'text-[#3A2E33]' : 'text-[#8B7D82]/30'}>₹</span>
      <span className={tier >= 2 ? 'text-[#3A2E33]' : 'text-[#8B7D82]/30'}>₹</span>
      <span className={tier >= 3 ? 'text-[#3A2E33]' : 'text-[#8B7D82]/30'}>₹</span>
    </div>
  );
};
