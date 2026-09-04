import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Coffee, MapPin, Heart, Train, Star, Sparkles, Navigation } from 'lucide-react';
import { DelhiPlace, DelhiNeighborhood } from '../types';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';
import { NearbySpotSuggestions } from '../components/NearbySpotSuggestions';

interface CafeListViewProps {
  places: DelhiPlace[];
  selectedArea: DelhiNeighborhood;
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
  onSelectPlace: (place: DelhiPlace) => void;
  onBackToCategories: () => void;
}

export const CafeListView: React.FC<CafeListViewProps> = ({
  places,
  selectedArea,
  favorites,
  onToggleFavorite,
  onSelectPlace,
  onBackToCategories
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'work' | 'garden' | 'budget'>('all');
  const [animatingHeart, setAnimatingHeart] = useState<string | null>(null);

  const cafePlaces = places.filter((p) => p.category === 'cafe');
  
  // Filter logic
  const filteredCafes = cafePlaces.filter((cafe) => {
    if (filterMode === 'work') return cafe.cafeSpecific?.workFriendly;
    if (filterMode === 'garden') return cafe.cafeSpecific?.outdoorSeating;
    if (filterMode === 'budget') return cafe.budgetTier === 1;
    return true;
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
          Curated Cafes
        </h1>
      </div>

      {/* Instant Localized Suggestions */}
      <NearbySpotSuggestions
        selectedArea={selectedArea}
        onSelectPlace={onSelectPlace}
      />

      {/* Filter Pills with Consistent Blush Pink Color System */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Cafes' },
          { id: 'work', label: 'Work & Solo Friendly' },
          { id: 'garden', label: 'Garden & Outdoor' },
          { id: 'budget', label: 'Budget Friendly' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterMode(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all whitespace-nowrap ${
              filterMode === tab.id
                ? 'bg-[#F7B8C4] text-[#4A2E3A] font-bold shadow-2xs'
                : 'bg-[#FBE4E8]/60 text-[#4A2E3A] hover:bg-[#FBE4E8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cafe Cards List (No divider lines) */}
      <div className="space-y-4 pt-1">
        {filteredCafes.map((cafe) => {
          const isFav = favorites.includes(cafe.id);
          return (
            <motion.div
              key={cafe.id}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelectPlace(cafe)}
              className="bg-[#FFFFFF] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Photo Banner with subtle overlay & heart */}
              <div className="relative h-44 w-full overflow-hidden bg-[#FDF7F4]">
                <img
                  src={cafe.thumbnail}
                  alt={cafe.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E3A]/60 via-transparent to-black/20" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs text-[11px] font-bold text-[#4A2E3A] shadow-xs">
                    {cafe.neighborhood}
                  </span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  id={`favorite-cafe-${cafe.id}`}
                  onClick={(e) => handleFavoriteClick(e, cafe.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs flex items-center justify-center text-[#4A2E3A] hover:text-[#E89C8B] shadow-xs transition-colors"
                  aria-label="Save cafe"
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      isFav ? 'fill-[#E89C8B] text-[#E89C8B] scale-110' : 'text-[#4A2E3A]'
                    }`}
                  />
                  {animatingHeart === cafe.id && (
                    <span className="absolute animate-heart-float text-[#E89C8B] font-bold text-[14px]">
                      ❤️
                    </span>
                  )}
                </button>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-[#FFFFFF]">
                  <div>
                    <h3 className="text-[18px] font-bold font-heading text-white drop-shadow-sm">
                      {cafe.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[12px] text-white/90 font-medium">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF7A] text-[#D4AF7A]" />
                      <span>{cafe.rating}</span>
                      <span>•</span>
                      <span>{cafe.priceRange}</span>
                    </div>
                  </div>

                  <SafetyScoreBadge score={cafe.safetyScore} size="sm" />
                </div>
              </div>

              {/* Card Body without divider lines */}
              <div className="p-4 space-y-3">
                {/* Metro & Distance row */}
                <div className="flex items-center justify-between text-[12px] text-[#8B7A82]">
                  <div className="flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-[#E89C8B]" />
                    <span className="truncate max-w-[190px]">{cafe.metroStation}</span>
                  </div>
                  <span className="font-semibold text-[#4A2E3A] bg-[#FBE4E8]/60 px-2 py-0.5 rounded-full">
                    {cafe.distanceKm} km away
                  </span>
                </div>

                {/* Vibe Tags Horizontal Scroll */}
                <div className="relative">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap pr-6 py-0.5">
                    {cafe.vibeTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-[#FBE4E8]/60 text-[11px] font-semibold text-[#4A2E3A] shrink-0"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#FFFFFF] to-transparent" />
                </div>

                {/* Safety Highlights */}
                <div className="flex items-center gap-2 text-[12px] text-[#4A2E3A] bg-[#FDF7F4] p-2.5 rounded-2xl">
                  <Sparkles className="w-4 h-4 text-[#D4AF7A] shrink-0" />
                  <span className="line-clamp-1">{cafe.safetyFeatures[0]}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
