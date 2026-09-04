import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, MapPin, Heart, Star, Coffee, ShieldCheck, ChevronRight } from 'lucide-react';
import { DelhiPlace, DelhiNeighborhood } from '../types';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';
import { NearbySpotSuggestions } from '../components/NearbySpotSuggestions';

interface MallListViewProps {
  places: DelhiPlace[];
  selectedArea: DelhiNeighborhood;
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
  onSelectPlace: (place: DelhiPlace) => void;
  onBackToCategories: () => void;
}

export const MallListView: React.FC<MallListViewProps> = ({
  places,
  selectedArea,
  favorites,
  onToggleFavorite,
  onSelectPlace,
  onBackToCategories
}) => {
  const [animatingHeart, setAnimatingHeart] = useState<string | null>(null);

  const mallPlaces = places.filter((p) => p.category === 'mall');

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
          Verified Malls
        </h1>
      </div>

      {/* Instant Localized Suggestions */}
      <NearbySpotSuggestions
        selectedArea={selectedArea}
        onSelectPlace={onSelectPlace}
      />

      {/* Mall Cards List (No divider lines) */}
      <div className="space-y-4 pt-1">
        {mallPlaces.map((mall) => {
          const isFav = favorites.includes(mall.id);
          return (
            <motion.div
              key={mall.id}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelectPlace(mall)}
              className="bg-[#FFFFFF] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Photo Banner */}
              <div className="relative h-44 w-full overflow-hidden bg-[#FDF7F4]">
                <img
                  src={mall.thumbnail}
                  alt={mall.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E3A]/65 via-transparent to-black/20" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs text-[11px] font-bold text-[#4A2E3A] shadow-xs">
                    {mall.area}
                  </span>
                </div>

                {/* Favorite Heart Button */}
                <button
                  id={`favorite-mall-${mall.id}`}
                  onClick={(e) => handleFavoriteClick(e, mall.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs flex items-center justify-center text-[#4A2E3A] hover:text-[#E89C8B] shadow-xs transition-colors"
                  aria-label="Save mall"
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      isFav ? 'fill-[#E89C8B] text-[#E89C8B] scale-110' : 'text-[#4A2E3A]'
                    }`}
                  />
                  {animatingHeart === mall.id && (
                    <span className="absolute animate-heart-float text-[#E89C8B] font-bold text-[14px]">
                      ❤️
                    </span>
                  )}
                </button>

                {/* Bottom Title & Rating */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-[18px] font-bold font-heading text-white drop-shadow-sm">
                      {mall.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[12px] text-white/90">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF7A] text-[#D4AF7A]" />
                      <span>{mall.rating}</span>
                      <span>•</span>
                      <span>{mall.priceRange}</span>
                    </div>
                  </div>

                  <SafetyScoreBadge score={mall.safetyScore} size="sm" />
                </div>
              </div>

              {/* Card Body without divider lines */}
              <div className="p-4 space-y-3.5">
                {/* Brand Chips Scrollable Row */}
                {mall.mallSpecific?.brandChips && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block">
                      Featured Brands
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                      {mall.mallSpecific.brandChips.map((brand) => (
                        <span
                          key={brand}
                          className="px-2.5 py-1 rounded-full bg-[#FBE4E8]/60 text-[11px] font-bold text-[#4A2E3A] whitespace-nowrap shadow-2xs"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pickup & Cab Lounge Note */}
                <div className="p-3 rounded-2xl bg-[#FDF7F4] flex items-start gap-2.5 text-[12px] text-[#4A2E3A]">
                  <ShieldCheck className="w-4 h-4 text-[#3F5D41] shrink-0 mt-0.5" />
                  <p className="leading-snug font-medium">
                    <strong className="text-[#3F5D41]">Verified Cab Point:</strong> {mall.mallSpecific?.cabPickupPoint || 'Indoor covered app-cab terminal with security guards.'}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
