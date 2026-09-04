import React, { useState, useMemo } from 'react';
import { ShieldCheck, Filter, MapPin, Sparkles } from 'lucide-react';
import { DelhiPlace } from '../types';
import { PlaceCard } from '../components/PlaceCard';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';
import { BudgetTierIndicator } from '../components/BudgetTierIndicator';
import { CrowdDensityIndicator } from '../components/CrowdDensityIndicator';

interface ShoppingExplorerViewProps {
  places: DelhiPlace[];
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
  onSelectPlace: (place: DelhiPlace) => void;
}

export const ShoppingExplorerView: React.FC<ShoppingExplorerViewProps> = ({
  places,
  favorites,
  onToggleFavorite,
  onSelectPlace
}) => {
  // Filter state as pill toggles
  const [selectedBudget, setSelectedBudget] = useState<number | 'all'>('all');
  const [selectedArea, setSelectedArea] = useState<string | 'all'>('all');
  const [safetyOnly, setSafetyOnly] = useState<boolean>(false);

  const marketPlaces = useMemo(() => {
    return places.filter((p) => p.category === 'shopping');
  }, [places]);

  const filteredPlaces = useMemo(() => {
    return marketPlaces.filter((p) => {
      if (selectedBudget !== 'all' && p.budgetTier !== selectedBudget) return false;
      if (selectedArea !== 'all' && p.area !== selectedArea) return false;
      if (safetyOnly && p.safetyScore < 9.5) return false;
      return true;
    });
  }, [marketPlaces, selectedBudget, selectedArea, selectedArea, safetyOnly]);

  return (
    <div className="space-y-5 px-4 pb-24 pt-2">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-bold text-[#3A2E33] font-display tracking-tight">
          Shopping Explorer
        </h1>
        <p className="text-[13px] text-[#8B7D82] mt-0.5">
          Curated thrift havens, heritage bazaars & vetted shopping lanes
        </p>
      </div>

      {/* Pill Toggle Filter Bar */}
      <div className="space-y-2.5">
        {/* Budget Pill Toggles */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-semibold text-[#8B7D82] uppercase tracking-wider shrink-0 mr-1">
            Budget:
          </span>
          <button
            id="filter-budget-all"
            onClick={() => setSelectedBudget('all')}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
              selectedBudget === 'all'
                ? 'bg-[#3A2E33] text-[#FFFDFB]'
                : 'bg-[#FFFDFB] text-[#8B7D82] border border-[#3A2E33]/10 hover:border-[#E8B4BC]'
            }`}
          >
            All
          </button>
          <button
            id="filter-budget-1"
            onClick={() => setSelectedBudget(selectedBudget === 1 ? 'all' : 1)}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
              selectedBudget === 1
                ? 'bg-[#3A2E33] text-[#FFFDFB]'
                : 'bg-[#FFFDFB] text-[#8B7D82] border border-[#3A2E33]/10 hover:border-[#E8B4BC]'
            }`}
          >
            ₹ Budget Thrift
          </button>
          <button
            id="filter-budget-2"
            onClick={() => setSelectedBudget(selectedBudget === 2 ? 'all' : 2)}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
              selectedBudget === 2
                ? 'bg-[#3A2E33] text-[#FFFDFB]'
                : 'bg-[#FFFDFB] text-[#8B7D82] border border-[#3A2E33]/10 hover:border-[#E8B4BC]'
            }`}
          >
            ₹₹ Ethnic & Craft
          </button>
          <button
            id="filter-budget-3"
            onClick={() => setSelectedBudget(selectedBudget === 3 ? 'all' : 3)}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
              selectedBudget === 3
                ? 'bg-[#3A2E33] text-[#FFFDFB]'
                : 'bg-[#FFFDFB] text-[#8B7D82] border border-[#3A2E33]/10 hover:border-[#E8B4BC]'
            }`}
          >
            ₹₹₹ Luxury Boutiques
          </button>
        </div>

        {/* Area & Safety Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-semibold text-[#8B7D82] uppercase tracking-wider shrink-0 mr-1">
            Zone:
          </span>
          {['all', 'South Delhi', 'Central Delhi'].map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors ${
                selectedArea === area
                  ? 'bg-[#E8B4BC] text-[#3A2E33] font-semibold'
                  : 'bg-[#FFFDFB] text-[#8B7D82] border border-[#3A2E33]/10'
              }`}
            >
              {area === 'all' ? 'All Areas' : area}
            </button>
          ))}

          {/* Safety 9.5+ Toggle */}
          <button
            id="filter-safety-high"
            onClick={() => setSafetyOnly(!safetyOnly)}
            className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${
              safetyOnly
                ? 'bg-[#C6D3C3] text-[#2C3E2D] font-semibold border border-[#C6D3C3]'
                : 'bg-[#FFFDFB] text-[#8B7D82] border border-[#3A2E33]/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>9.5+ Safety Only</span>
          </button>
        </div>
      </div>

      {/* Market Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {filteredPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            isFavorite={favorites.includes(place.id)}
            onToggleFavorite={onToggleFavorite}
            onSelectPlace={onSelectPlace}
            layoutStyle="grid"
          />
        ))}
      </div>
    </div>
  );
};
