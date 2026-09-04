import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Train, Star } from 'lucide-react';
import { DelhiPlace } from '../types';
import { SafetyScoreBadge } from './SafetyScoreBadge';
import { BudgetTierIndicator } from './BudgetTierIndicator';
import { CrowdDensityIndicator } from './CrowdDensityIndicator';

interface PlaceCardProps {
  place: DelhiPlace;
  isFavorite: boolean;
  onToggleFavorite: (placeId: string) => void;
  onSelectPlace: (place: DelhiPlace) => void;
  layoutStyle?: 'grid' | 'carousel' | 'horizontal';
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isFavorite,
  onToggleFavorite,
  onSelectPlace,
  layoutStyle = 'grid'
}) => {
  const [showHeartPop, setShowHeartPop] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFavorite) {
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 600);
    }
    onToggleFavorite(place.id);
  };

  if (layoutStyle === 'carousel') {
    return (
      <div
        id={`place-card-carousel-${place.id}`}
        onClick={() => onSelectPlace(place)}
        className="w-[280px] shrink-0 bg-[#FFFDFB] rounded-2xl border border-[#3A2E33]/6 overflow-hidden cursor-pointer transition-all duration-250 ease-out hover:border-[#E8B4BC]/50 active:scale-[0.98] shadow-[0_4px_16px_rgba(58,46,51,0.04)]"
      >
        {/* Photo Container capped at 38% height */}
        <div className="relative h-36 w-full bg-[#FAF6F1] overflow-hidden">
          <img
            src={place.heroImage}
            alt={place.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
            loading="lazy"
          />
          {/* Subtle scrim only for badge legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E33]/30 via-transparent to-transparent pointer-events-none" />

          {/* Safety Score Top Left */}
          <div className="absolute top-3 left-3">
            <SafetyScoreBadge score={place.safetyScore} size="sm" />
          </div>

          {/* Heart button */}
          <button
            id={`fav-btn-${place.id}`}
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFDFB]/90 backdrop-blur-xs flex items-center justify-center text-[#3A2E33] hover:text-[#E08E79] transition-colors relative"
            aria-label="Save to favorites"
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                isFavorite ? 'fill-[#E08E79] text-[#E08E79]' : 'text-[#3A2E33]/70'
              }`}
            />
            <AnimatePresence>
              {showHeartPop && (
                <motion.div
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -16, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <Heart className="w-4 h-4 fill-[#E08E79] text-[#E08E79]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Distance pill */}
          <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-full bg-[#3A2E33]/60 backdrop-blur-xs text-[11px] text-[#FFFDFB] font-medium">
            {place.distanceKm} km away
          </div>
        </div>

        {/* Card Body with generous padding */}
        <div className="p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B7D82]">
                {place.area}
              </span>
              <div className="flex items-center gap-1 text-[12px] font-semibold text-[#3A2E33]">
                <Star className="w-3.5 h-3.5 fill-[#D4AF7A] text-[#D4AF7A]" />
                <span>{place.rating}</span>
              </div>
            </div>

            <h4 className="text-[16px] font-semibold text-[#3A2E33] leading-snug tracking-tight truncate">
              {place.name}
            </h4>

            <p className="text-[13px] text-[#8B7D82] line-clamp-1 mt-0.5 font-normal">
              {place.tagline}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#3A2E33]/6 flex items-center justify-between text-[12px] text-[#8B7D82]">
            <div className="flex items-center gap-1 text-[12px]">
              <BudgetTierIndicator tier={place.budgetTier} />
            </div>
            <div className="flex items-center gap-1.5">
              <CrowdDensityIndicator density={place.crowdDensity} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid style
  return (
    <div
      id={`place-card-${place.id}`}
      onClick={() => onSelectPlace(place)}
      className="bg-[#FFFDFB] rounded-2xl border border-[#3A2E33]/6 overflow-hidden cursor-pointer transition-all duration-250 ease-out hover:border-[#E8B4BC]/60 active:scale-[0.98] shadow-[0_2px_12px_rgba(58,46,51,0.03)] flex flex-col"
    >
      {/* Photo capped at 38% height */}
      <div className="relative h-44 w-full bg-[#FAF6F1] overflow-hidden">
        <img
          src={place.heroImage}
          alt={place.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E33]/30 via-transparent to-transparent pointer-events-none" />

        {/* Safety Score badge */}
        <div className="absolute top-3.5 left-3.5">
          <SafetyScoreBadge score={place.safetyScore} size="sm" />
        </div>

        {/* Heart button */}
        <button
          id={`fav-btn-grid-${place.id}`}
          onClick={handleFavoriteClick}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#FFFDFB]/90 backdrop-blur-xs flex items-center justify-center text-[#3A2E33] hover:text-[#E08E79] transition-colors relative"
          aria-label="Save to favorites"
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFavorite ? 'fill-[#E08E79] text-[#E08E79]' : 'text-[#3A2E33]/70'
            }`}
          />
          <AnimatePresence>
            {showHeartPop && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -16, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Heart className="w-4 h-4 fill-[#E08E79] text-[#E08E79]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Distance indicator */}
        <div className="absolute bottom-3 left-3.5 px-2.5 py-0.5 rounded-full bg-[#3A2E33]/65 backdrop-blur-xs text-[11px] text-[#FFFDFB] font-medium flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#F3D9DE]" />
          <span>{place.distanceKm} km away</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B7D82]">
              {place.area}
            </span>
            <div className="flex items-center gap-1 text-[13px] font-semibold text-[#3A2E33]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF7A] text-[#D4AF7A]" />
              <span>{place.rating}</span>
              <span className="text-[11px] text-[#8B7D82] font-normal">({place.reviewsCount})</span>
            </div>
          </div>

          <h3 className="text-[17px] font-semibold text-[#3A2E33] leading-snug tracking-tight">
            {place.name}
          </h3>

          <p className="text-[13px] text-[#8B7D82] line-clamp-2 mt-1 leading-relaxed font-normal">
            {place.tagline}
          </p>
        </div>

        {/* Metro transit strip */}
        <div className="mt-3.5 pt-3 border-t border-[#3A2E33]/6 space-y-2">
          <div className="flex items-center gap-1.5 text-[12px] text-[#3A2E33]/85 truncate">
            <Train className="w-3.5 h-3.5 shrink-0 text-[#E8B4BC]" />
            <span className="truncate">{place.metroLine}</span>
          </div>

          <div className="flex items-center justify-between text-[12px] pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[#8B7D82] text-[11px]">Budget:</span>
              <BudgetTierIndicator tier={place.budgetTier} />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#8B7D82] text-[11px]">Crowd:</span>
              <CrowdDensityIndicator density={place.crowdDensity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
