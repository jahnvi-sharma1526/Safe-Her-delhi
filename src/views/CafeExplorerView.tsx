import React, { useState, useMemo } from 'react';
import { Sparkles, Star, Coffee, UtensilsCrossed, MapPin, Heart } from 'lucide-react';
import { DelhiPlace } from '../types';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';
import { BudgetTierIndicator } from '../components/BudgetTierIndicator';

interface CafeExplorerViewProps {
  places: DelhiPlace[];
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
  onSelectPlace: (place: DelhiPlace) => void;
}

export const CafeExplorerView: React.FC<CafeExplorerViewProps> = ({
  places,
  favorites,
  onToggleFavorite,
  onSelectPlace
}) => {
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [outdoorOnly, setOutdoorOnly] = useState<boolean>(false);

  const cafePlaces = useMemo(() => {
    return places.filter((p) => p.category === 'cafe');
  }, [places]);

  const filteredCafes = useMemo(() => {
    return cafePlaces.filter((p) => {
      if (selectedArea !== 'all' && p.area !== selectedArea) return false;
      if (outdoorOnly && !p.cafeSpecific?.outdoorSeating) return false;
      return true;
    });
  }, [cafePlaces, selectedArea, outdoorOnly]);

  return (
    <div className="space-y-5 px-4 pb-24 pt-2">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-bold text-[#3A2E33] font-display tracking-tight">
          Cafe Explorer
        </h1>
        <p className="text-[13px] text-[#8B7D82] mt-0.5">
          Garden courtyards, specialty roasteries & serene reading havens
        </p>
      </div>

      {/* Filter Pill Row */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedArea('all')}
          className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors ${
            selectedArea === 'all'
              ? 'bg-[#3A2E33] text-[#FFFDFB]'
              : 'bg-[#FFFDFB] text-[#8B7D82] border border-[#3A2E33]/10'
          }`}
        >
          All Delhi
        </button>
        {['South Delhi', 'Central Delhi', 'Chanakyapuri', 'Saket & Mehrauli'].map((area) => (
          <button
            key={area}
            onClick={() => setSelectedArea(area)}
            className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors ${
              selectedArea === area
                ? 'bg-[#E8B4BC] text-[#3A2E33] font-semibold'
                : 'bg-[#FFFDFB] text-[#8B7D82] border border-[#3A2E33]/10'
            }`}
          >
            {area}
          </button>
        ))}
        <button
          onClick={() => setOutdoorOnly(!outdoorOnly)}
          className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors ${
            outdoorOnly
              ? 'bg-[#C6D3C3] text-[#2C3E2D] font-semibold'
              : 'bg-[#FFFDFB] text-[#8B7D82] border border-[#3A2E33]/10'
          }`}
        >
          Garden / Alfresco
        </button>
      </div>

      {/* Cafe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredCafes.map((cafe) => {
          const isFav = favorites.includes(cafe.id);
          return (
            <div
              key={cafe.id}
              id={`cafe-card-${cafe.id}`}
              onClick={() => onSelectPlace(cafe)}
              className="bg-[#FFFDFB] rounded-2xl border border-[#3A2E33]/6 overflow-hidden shadow-[0_2px_12px_rgba(58,46,51,0.03)] cursor-pointer transition-all duration-200 hover:border-[#E8B4BC]/60 active:scale-[0.98] flex flex-col"
            >
              {/* Photo Capped at 40% height */}
              <div className="relative h-44 w-full bg-[#FAF6F1] overflow-hidden">
                <img
                  src={cafe.heroImage}
                  alt={cafe.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E33]/30 via-transparent to-transparent pointer-events-none" />

                {/* Safety Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <SafetyScoreBadge score={cafe.safetyScore} size="sm" />
                </div>

                {/* Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(cafe.id);
                  }}
                  className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#FFFDFB]/90 backdrop-blur-xs flex items-center justify-center text-[#3A2E33]"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFav ? 'fill-[#E08E79] text-[#E08E79]' : 'text-[#3A2E33]/70'
                    }`}
                  />
                </button>

                {/* Distance Badge */}
                <div className="absolute bottom-2.5 left-3.5 px-2.5 py-0.5 rounded-full bg-[#3A2E33]/60 backdrop-blur-xs text-[11px] text-[#FFFDFB] font-medium">
                  {cafe.distanceKm} km away
                </div>
              </div>

              {/* Cafe Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B7D82]">
                      {cafe.area}
                    </span>
                    <span className="text-[12px] font-semibold text-[#3A2E33]">
                      {cafe.cafeSpecific?.priceForTwo || '₹1,200'} for two
                    </span>
                  </div>

                  <h3 className="text-[17px] font-semibold text-[#3A2E33] tracking-tight mt-0.5">
                    {cafe.name}
                  </h3>

                  <p className="text-[13px] text-[#8B7D82] line-clamp-2 mt-1 leading-relaxed">
                    {cafe.tagline}
                  </p>
                </div>

                {/* Small Iconography Row (not a stat block) */}
                <div className="pt-3 border-t border-[#3A2E33]/6 flex items-center justify-between text-[12px] text-[#3A2E33]">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF7A] text-[#D4AF7A]" />
                    <span className="font-semibold">{cafe.rating}</span>
                  </div>

                  {/* Ambience */}
                  <div className="flex items-center gap-1 text-[#8B7D82]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E8B4BC]" />
                    <span>Ambience: <strong className="text-[#3A2E33]">{cafe.cafeSpecific?.ambienceScore}</strong></span>
                  </div>

                  {/* Food Score */}
                  <div className="flex items-center gap-1 text-[#8B7D82]">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-[#EDCBB5]" />
                    <span>Food: <strong className="text-[#3A2E33]">{cafe.cafeSpecific?.foodScore}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
