import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, MapPin, Heart, Train, Users, Sparkles } from 'lucide-react';
import { DelhiPlace, DelhiNeighborhood } from '../types';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';
import { NearbySpotSuggestions } from '../components/NearbySpotSuggestions';

interface MarketListViewProps {
  places: DelhiPlace[];
  selectedArea: DelhiNeighborhood;
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
  onSelectPlace: (place: DelhiPlace) => void;
  onBackToCategories: () => void;
}

export const MarketListView: React.FC<MarketListViewProps> = ({
  places,
  selectedArea,
  favorites,
  onToggleFavorite,
  onSelectPlace,
  onBackToCategories
}) => {
  const [budgetFilter, setBudgetFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [animatingHeart, setAnimatingHeart] = useState<string | null>(null);

  const marketPlaces = places.filter((p) => p.category === 'shopping');
  const filteredMarkets = marketPlaces.filter((market) => {
    if (budgetFilter === 'all') return true;
    return market.budgetTier === budgetFilter;
  });

  const handleFavoriteClick = (e: React.MouseEvent, placeId: string) => {
    e.stopPropagation();
    setAnimatingHeart(placeId);
    onToggleFavorite(placeId);
    setTimeout(() => setAnimatingHeart(null), 600);
  };

  return (
    <div className="space-y-5 px-4 pb-28 pt-2">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToCategories}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8B7A82] hover:text-[#4A2E3A] py-1 px-2 -ml-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Categories</span>
        </button>

        <span className="text-[12px] font-bold text-[#4A2E3A] bg-[#FBE4E8] px-3 py-1 rounded-full">
          📍 {selectedArea}
        </span>
      </div>

      {/* Headline alone, no subtitle text */}
      <div>
        <h1 className="text-[24px] font-bold text-[#4A2E3A] font-heading tracking-tight">
          Shopping Markets
        </h1>
      </div>

      {/* Instant Localized Suggestions */}
      <NearbySpotSuggestions
        selectedArea={selectedArea}
        onSelectPlace={onSelectPlace}
      />

      {/* Filter Options: Plain text labels without Rupee symbols & Consistent Blush Pink Color */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Markets' },
          { id: 1, label: 'Budget Thrifting' },
          { id: 2, label: 'Handlooms & Ethnic' },
          { id: 3, label: 'Luxe Boutiques' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setBudgetFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all whitespace-nowrap ${
              budgetFilter === tab.id
                ? 'bg-[#F7B8C4] text-[#4A2E3A] font-bold shadow-2xs'
                : 'bg-[#FBE4E8]/60 text-[#4A2E3A] hover:bg-[#FBE4E8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Market Cards List (No divider lines) */}
      <div className="space-y-4 pt-1">
        {filteredMarkets.map((market) => {
          const isFav = favorites.includes(market.id);
          return (
            <motion.div
              key={market.id}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelectPlace(market)}
              className="bg-[#FFFFFF] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Photo Banner */}
              <div className="relative h-44 w-full overflow-hidden bg-[#FDF7F4]">
                <img
                  src={market.thumbnail}
                  alt={market.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E3A]/65 via-transparent to-black/20" />

                {/* Budget Tier Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs text-[11px] font-bold text-[#4A2E3A] shadow-xs">
                    {market.budgetTier === 1 ? 'Budget' : market.budgetTier === 2 ? 'Moderate' : 'Luxury'}
                  </span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  id={`favorite-market-${market.id}`}
                  onClick={(e) => handleFavoriteClick(e, market.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs flex items-center justify-center text-[#4A2E3A] hover:text-[#E89C8B] shadow-xs transition-colors"
                  aria-label="Save market"
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      isFav ? 'fill-[#E89C8B] text-[#E89C8B] scale-110' : 'text-[#4A2E3A]'
                    }`}
                  />
                  {animatingHeart === market.id && (
                    <span className="absolute animate-heart-float text-[#E89C8B] font-bold text-[14px]">
                      ❤️
                    </span>
                  )}
                </button>

                {/* Bottom Overlay Title & Safety */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-[18px] font-bold font-heading text-white drop-shadow-sm">
                      {market.name}
                    </h3>
                    <span className="text-[12px] text-white/90">
                      {market.area}
                    </span>
                  </div>

                  <SafetyScoreBadge score={market.safetyScore} size="sm" />
                </div>
              </div>

              {/* Card Body without divider lines */}
              <div className="p-4 space-y-3">
                {/* Metro & Distance */}
                <div className="flex items-center justify-between text-[12px] text-[#8B7A82]">
                  <div className="flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-[#E89C8B]" />
                    <span className="truncate max-w-[190px]">{market.metroStation}</span>
                  </div>
                  <span className="font-semibold text-[#4A2E3A] bg-[#FBE4E8]/60 px-2 py-0.5 rounded-full">
                    {market.distanceKm} km away
                  </span>
                </div>

                {/* Best For Tags Horizontal Scroll */}
                <div className="relative">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap pr-6 py-0.5">
                    {market.marketSpecific?.bestItems.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-0.5 rounded-full bg-[#FBE4E8]/60 text-[11px] font-semibold text-[#4A2E3A] shrink-0"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#FFFFFF] to-transparent" />
                </div>

                {/* Bargaining or Safety Highlight */}
                <div className="flex items-center justify-between text-[12px] bg-[#FDF7F4] p-2.5 rounded-2xl">
                  <span className="text-[#4A2E3A] font-medium">
                    Best Time: {market.marketSpecific?.bestTimeToVisit || '11 AM - 5 PM'}
                  </span>
                  <span className="font-semibold text-[#E89C8B]">
                    {market.marketSpecific?.bargainingFriendly ? 'Bargaining Friendly' : 'Fixed Price'}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
