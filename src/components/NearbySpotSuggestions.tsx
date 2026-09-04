import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, Sparkles, Coffee, ShoppingBag, Trees, Store, ChevronRight } from 'lucide-react';
import { DelhiPlace, DelhiNeighborhood } from '../types';
import { DELHI_PLACES } from '../data/delhiData';
import { SafetyScoreBadge } from './SafetyScoreBadge';

interface NearbySpotSuggestionsProps {
  selectedArea: DelhiNeighborhood;
  onSelectPlace: (place: DelhiPlace) => void;
}

export const NearbySpotSuggestions: React.FC<NearbySpotSuggestionsProps> = ({
  selectedArea,
  onSelectPlace
}) => {
  // Find top cafe, market, outing, mall near this specific location
  const areaPlaces = DELHI_PLACES.filter(
    (p) => p.neighborhood === selectedArea || p.area.toLowerCase().includes(selectedArea.toLowerCase().split(' ')[0])
  );

  // If few places directly in neighborhood, pick closest south/central Delhi spots
  const placesPool = areaPlaces.length >= 3 ? areaPlaces : DELHI_PLACES;

  const topCafe = placesPool.find((p) => p.category === 'cafe') || DELHI_PLACES.find((p) => p.category === 'cafe')!;
  const topMarket = placesPool.find((p) => p.category === 'shopping') || DELHI_PLACES.find((p) => p.category === 'shopping')!;
  const topOuting = placesPool.find((p) => p.category === 'outing') || DELHI_PLACES.find((p) => p.category === 'outing')!;

  const suggestions = [
    { place: topCafe, icon: Coffee, tag: 'Top Cafe', bg: 'bg-[#FBE4E8]' },
    { place: topMarket, icon: ShoppingBag, tag: 'Top Market', bg: 'bg-[#FBE4E8]' },
    { place: topOuting, icon: Trees, tag: 'Top Outing', bg: 'bg-[#FBE4E8]' }
  ].filter((item, index, self) => self.findIndex(s => s.place.id === item.place.id) === index);

  return (
    <div className="space-y-3 pt-1">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FBE4E8] flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-[#E89C8B]" />
          </div>
          <h3 className="text-[15px] font-bold text-[#4A2E3A] font-heading tracking-tight">
            Near {selectedArea}
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-[#8B7A82]">
          Instant Area Picks
        </span>
      </div>

      {/* 3 Curated Cards with Uniform Blush Pink Background */}
      <div className="grid grid-cols-1 gap-2.5">
        {suggestions.map(({ place, icon: Icon, tag, bg }) => (
          <motion.div
            key={place.id}
            onClick={() => onSelectPlace(place)}
            whileTap={{ scale: 0.98 }}
            className={`p-3.5 rounded-2xl ${bg} flex items-center justify-between gap-3 cursor-pointer group shadow-2xs hover:shadow-xs transition-all`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img
                  src={place.thumbnail}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-[#4A2E3A] bg-[#FFFFFF]/80 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                  <span className="text-[11px] text-[#8B7A82] font-semibold">
                    {place.distanceKm} km away
                  </span>
                </div>

                <h4 className="text-[14px] font-bold text-[#4A2E3A] truncate mt-0.5">
                  {place.name}
                </h4>
                <p className="text-[11px] text-[#8B7A82] truncate">
                  {place.metroStation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SafetyScoreBadge score={place.safetyScore} size="sm" showLabel={false} />
              <div className="w-7 h-7 rounded-full bg-[#FFFFFF]/80 flex items-center justify-center text-[#4A2E3A] group-hover:bg-[#FFFFFF]">
                <ChevronRight className="w-4 h-4 text-[#8B7A82] group-hover:text-[#E89C8B]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
