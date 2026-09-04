import React from 'react';
import { ShieldCheck, Star, MapPin, Car, Coffee, ArrowRight } from 'lucide-react';
import { DelhiPlace } from '../types';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';

interface MallExplorerViewProps {
  places: DelhiPlace[];
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
  onSelectPlace: (place: DelhiPlace) => void;
}

export const MallExplorerView: React.FC<MallExplorerViewProps> = ({
  places,
  favorites,
  onToggleFavorite,
  onSelectPlace
}) => {
  const mallPlaces = places.filter((p) => p.category === 'mall');

  return (
    <div className="space-y-6 px-4 pb-24 pt-2">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-bold text-[#3A2E33] font-display tracking-tight">
          Mall Explorer
        </h1>
        <p className="text-[13px] text-[#8B7D82] mt-0.5">
          Vetted premium shopping complexes with indoor cab lounges & maximum security
        </p>
      </div>

      {/* Mall Cards */}
      <div className="space-y-6">
        {mallPlaces.map((mall) => (
          <div
            key={mall.id}
            id={`mall-card-${mall.id}`}
            onClick={() => onSelectPlace(mall)}
            className="bg-[#FFFDFB] rounded-3xl border border-[#3A2E33]/6 overflow-hidden shadow-[0_4px_20px_rgba(58,46,51,0.03)] cursor-pointer transition-all duration-200 hover:border-[#E8B4BC]/60 active:scale-[0.99]"
          >
            {/* Hero Image */}
            <div className="relative h-48 sm:h-56 w-full bg-[#FAF6F1] overflow-hidden">
              <img
                src={mall.heroImage}
                alt={mall.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E33]/40 via-transparent to-transparent pointer-events-none" />

              {/* Safety Badge */}
              <div className="absolute top-4 left-4">
                <SafetyScoreBadge score={mall.safetyScore} size="sm" />
              </div>

              {/* Rating & Distance */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[#FFFDFB]">
                <div className="flex items-center gap-1 text-[13px] font-semibold bg-[#3A2E33]/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF7A] text-[#D4AF7A]" />
                  <span>{mall.rating}</span>
                </div>
                <span className="text-[12px] font-medium bg-[#3A2E33]/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                  {mall.distanceKm} km away
                </span>
              </div>
            </div>

            {/* Mall Details */}
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B7D82]">
                  {mall.area}
                </span>
                <h3 className="text-[20px] font-bold text-[#3A2E33] tracking-tight mt-0.5">
                  {mall.name}
                </h3>
                <p className="text-[13px] text-[#8B7D82] mt-1 leading-relaxed">
                  {mall.description}
                </p>
              </div>

              {/* Scrollable Brand Chips */}
              {mall.mallSpecific && (
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B7D82] block mb-2">
                    Key Labels & Boutiques
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                    {mall.mallSpecific.brandChips.map((brand) => (
                      <span
                        key={brand}
                        className="px-3 py-1 rounded-full bg-[#FAF6F1] text-[12px] font-medium text-[#3A2E33] border border-[#3A2E33]/5 whitespace-nowrap"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Cab Pickup Strip */}
              {mall.mallSpecific && (
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#C6D3C3]/20 border border-[#C6D3C3]/40 text-[12px] text-[#2C3E2D]">
                  <Car className="w-4 h-4 text-[#2C3E2D] shrink-0" />
                  <span className="font-medium">
                    Verified Pickup: {mall.mallSpecific.verifiedCabPickup}
                  </span>
                </div>
              )}

              {/* Cafes Nearby Carousel inside Mall */}
              {mall.mallSpecific?.nearbyCafes && (
                <div className="pt-2 border-t border-[#3A2E33]/6 space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-[#3A2E33] flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-[#E08E79]" />
                      <span>Cafes & Bites Inside</span>
                    </span>
                    <span className="text-[#8B7D82]">Indoor Safe Seating</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {mall.mallSpecific.nearbyCafes.map((cafe, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-[#FAF6F1] border border-[#3A2E33]/5 text-center flex flex-col justify-center"
                      >
                        <h5 className="text-[12px] font-semibold text-[#3A2E33] truncate">
                          {cafe.name}
                        </h5>
                        <p className="text-[10px] text-[#8B7D82] truncate mt-0.5">
                          {cafe.type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
