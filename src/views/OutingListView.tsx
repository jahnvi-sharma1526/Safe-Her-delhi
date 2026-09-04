import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Trees, 
  MapPin, 
  Clock, 
  Train, 
  Heart, 
  Sparkles, 
  ArrowLeft, 
  Ticket, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { DelhiPlace, DelhiNeighborhood, OutingCategory } from '../types';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';
import { NearbySpotSuggestions } from '../components/NearbySpotSuggestions';

interface OutingListViewProps {
  places: DelhiPlace[];
  selectedArea: DelhiNeighborhood;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectPlace: (place: DelhiPlace) => void;
  onBackToCategories: () => void;
}

export const OutingListView: React.FC<OutingListViewProps> = ({
  places,
  selectedArea,
  favorites,
  onToggleFavorite,
  onSelectPlace,
  onBackToCategories
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const outingPlaces = useMemo(() => {
    return places.filter((p) => p.category === 'outing');
  }, [places]);

  const filteredPlaces = useMemo(() => {
    if (filterType === 'all') return outingPlaces;
    return outingPlaces.filter((p) => p.outingSpecific?.outingType === filterType);
  }, [outingPlaces, filterType]);

  const outingTypes: { id: string; label: string }[] = [
    { id: 'all', label: 'All Sights' },
    { id: 'Garden', label: 'Gardens & Parks' },
    { id: 'Heritage', label: 'UNESCO Heritage' },
    { id: 'Monument', label: 'Monuments' },
    { id: 'Wildlife', label: 'Lakes & Wildlife' }
  ];

  return (
    <div className="space-y-5 px-4 pb-28 pt-2">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToCategories}
          className="flex items-center gap-1.5 text-[13px] font-bold text-[#8B7A82] hover:text-[#4A2E3A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Categories</span>
        </button>

        <span className="text-[12px] font-bold text-[#4A2E3A] bg-[#FBE4E8] px-3 py-1 rounded-full">
          {filteredPlaces.length} Curated Sights
        </span>
      </div>

      {/* Headline alone, no subtitle text */}
      <div>
        <h2 className="text-[24px] font-bold text-[#4A2E3A] font-heading tracking-tight flex items-center gap-2">
          <span>Outings & Sightseeing</span>
          <Trees className="w-5 h-5 text-[#E89C8B]" />
        </h2>
      </div>

      {/* Instant Localized Suggestions */}
      <NearbySpotSuggestions
        selectedArea={selectedArea}
        onSelectPlace={onSelectPlace}
      />

      {/* Filter Tabs with Consistent Blush Pink Color System */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {outingTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilterType(t.id)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all whitespace-nowrap ${
              filterType === t.id
                ? 'bg-[#F7B8C4] text-[#4A2E3A] font-bold shadow-2xs'
                : 'bg-[#FBE4E8]/60 text-[#4A2E3A] hover:bg-[#FBE4E8]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Outing Cards List (No divider lines) */}
      <div className="space-y-4">
        {filteredPlaces.map((place, idx) => {
          const isFav = favorites.includes(place.id);
          const outing = place.outingSpecific;

          return (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              onClick={() => onSelectPlace(place)}
              className="bg-[#FFFFFF] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              {/* Hero Image Banner with Overlaid Badges */}
              <div className="relative h-44 w-full overflow-hidden bg-[#FDF7F4]">
                <img
                  src={place.heroImage}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E3A]/60 via-transparent to-black/20" />

                {/* Top badges: Outing Type Tag & Favorite button */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md text-[11px] font-bold text-[#4A2E3A] shadow-xs">
                    {outing?.outingType || 'Garden'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(place.id);
                    }}
                    className="w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md flex items-center justify-center text-[#4A2E3A] hover:text-[#E89C8B] shadow-xs transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? 'fill-[#E89C8B] text-[#E89C8B]' : 'text-[#4A2E3A]'
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Overlay Title and Safety Score */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-[18px] font-bold font-heading drop-shadow-sm text-white">
                      {place.name}
                    </h3>
                    <p className="text-[12px] text-white/90 font-medium">
                      {place.area}
                    </p>
                  </div>
                  <SafetyScoreBadge score={place.safetyScore} size="sm" />
                </div>
              </div>

              {/* Card Body without divider lines */}
              <div className="p-4 space-y-3">
                {/* Metro & Distance Details */}
                <div className="flex items-center justify-between text-[12px] text-[#8B7A82]">
                  <div className="flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-[#E89C8B]" />
                    <span className="truncate max-w-[190px]">{place.metroStation}</span>
                  </div>
                  <span className="font-semibold text-[#4A2E3A] bg-[#FBE4E8]/60 px-2 py-0.5 rounded-full">
                    {place.distanceKm} km away
                  </span>
                </div>

                {/* Highlights tags Horizontal Scroll */}
                <div className="relative">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap pr-6 py-0.5">
                    {place.vibeTags.map((tag) => (
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

                {/* Best Timings & Entry Ticket Note */}
                <div className="flex items-center justify-between text-[12px] bg-[#FDF7F4] p-2.5 rounded-2xl">
                  <span className="text-[#4A2E3A] font-medium">
                    Best Time: {outing?.bestTimeToVisit || 'Morning / 4-6 PM'}
                  </span>
                  <span className="font-bold text-[#E89C8B]">
                    {outing?.entryFee || 'Free Entry'}
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
