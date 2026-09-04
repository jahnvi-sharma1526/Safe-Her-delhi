import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Train, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Navigation, 
  CheckCircle2, 
  Star, 
  Tag, 
  ShoppingBag, 
  Coffee, 
  Trees, 
  Ticket, 
  Users, 
  Compass, 
  Store,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { DelhiPlace } from '../types';
import { SafetyScoreBadge } from './SafetyScoreBadge';

interface PlaceDetailModalProps {
  place: DelhiPlace | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (placeId: string) => void;
  onStartRoute: (place: DelhiPlace) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onStartRoute
}) => {
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number>(0);

  if (!place) return null;

  const currentHero = place.gallery && place.gallery[selectedGalleryIdx] 
    ? place.gallery[selectedGalleryIdx] 
    : place.heroImage;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#4A2E3A]/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-[#FDF7F4] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full-bleed Hero with soft top scrim & action controls */}
            <div className="relative h-64 sm:h-72 w-full bg-[#4A2E3A] shrink-0">
              <img
                src={currentHero}
                alt={place.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E3A]/80 via-transparent to-black/30 pointer-events-none" />

              {/* Top action controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <button
                  id="close-place-detail-btn"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md flex items-center justify-center text-[#4A2E3A] hover:bg-[#FFFFFF] shadow-xs transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <SafetyScoreBadge score={place.safetyScore} size="md" />
                  <button
                    id="toggle-fav-detail-btn"
                    onClick={() => onToggleFavorite(place.id)}
                    className="w-9 h-9 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md flex items-center justify-center text-[#4A2E3A] hover:bg-[#FFFFFF] shadow-xs transition-colors"
                    aria-label="Save place"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorite ? 'fill-[#E89C8B] text-[#E89C8B]' : 'text-[#4A2E3A]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Bottom Hero Overlay */}
              <div className="absolute bottom-3 left-4 right-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A2E3A] bg-[#FFFFFF]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full inline-block">
                    {place.neighborhood} • {place.category.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-[12px] font-bold text-white bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    <Star className="w-3 h-3 fill-[#D4AF7A] text-[#D4AF7A]" />
                    <span>{place.rating}</span>
                  </div>
                </div>
                <h2 className="text-[24px] font-bold text-white font-heading tracking-tight leading-tight drop-shadow-xs">
                  {place.name}
                </h2>
              </div>
            </div>

            {/* Gallery Thumbnail Bar if available */}
            {place.gallery && place.gallery.length > 1 && (
              <div className="flex gap-2 px-4 py-2.5 bg-[#FDF7F4] overflow-x-auto no-scrollbar">
                {place.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGalleryIdx(i)}
                    className={`w-14 h-11 rounded-xl overflow-hidden shrink-0 transition-all ${
                      selectedGalleryIdx === i ? 'ring-2 ring-[#E89C8B] scale-105' : 'opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Body without divider lines */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-[#FDF7F4] no-scrollbar">
              {/* Tagline & Quick Stats */}
              <div className="bg-[#FFFFFF] p-5 rounded-3xl space-y-3.5 shadow-xs">
                <p className="text-[14px] font-semibold text-[#4A2E3A] leading-relaxed">
                  {place.tagline}
                </p>
                <p className="text-[13px] text-[#8B7A82] leading-relaxed">
                  {place.description}
                </p>

                {/* Stat pills row */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-3 rounded-2xl bg-[#FDF7F4]">
                    <span className="text-[10px] uppercase font-bold text-[#8B7A82] tracking-wider block">
                      Budget
                    </span>
                    <span className="text-[12px] font-bold text-[#4A2E3A] block mt-0.5">
                      {place.budgetTier === 1 ? '₹ Budget' : place.budgetTier === 2 ? '₹₹ Moderate' : '₹₹₹ Luxury'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FDF7F4]">
                    <span className="text-[10px] uppercase font-bold text-[#8B7A82] tracking-wider block">
                      Entry / Spend
                    </span>
                    <span className="text-[11px] font-bold text-[#4A2E3A] block mt-0.5 truncate">
                      {place.priceRange}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FDF7F4]">
                    <span className="text-[10px] uppercase font-bold text-[#8B7A82] tracking-wider block">
                      Best Safe Time
                    </span>
                    <span className="text-[11px] font-bold text-[#4A2E3A] block mt-0.5 truncate">
                      {place.bestSafeHours.split('(')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Outing Specific Highlights */}
              {place.outingSpecific && (
                <div className="bg-[#FFFFFF] p-5 rounded-3xl space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Trees className="w-4 h-4 text-[#3F5D41]" />
                    <h4 className="text-[13px] font-bold text-[#4A2E3A] uppercase tracking-wider">
                      Visitor Guidelines & Sights
                    </h4>
                  </div>

                  <div className="space-y-2.5 text-[13px]">
                    <div className="p-3.5 rounded-2xl bg-[#EBF3EA] space-y-1">
                      <span className="text-[11px] uppercase font-bold text-[#3F5D41] block">
                        Best Visiting Hours
                      </span>
                      <p className="text-[#2C3E2D] font-semibold text-[12px]">
                        {place.outingSpecific.bestTime}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FDF7F4] space-y-1">
                      <span className="text-[11px] uppercase font-bold text-[#8B7A82] block">
                        Safest Entry Gate
                      </span>
                      <p className="text-[#4A2E3A] font-semibold text-[12px]">
                        {place.outingSpecific.safestEntryGate}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FDF7F4] space-y-1">
                      <span className="text-[11px] uppercase font-bold text-[#8B7A82] block">
                        Crowd Density Pattern
                      </span>
                      <p className="text-[#8B7A82] font-medium text-[12px]">
                        {place.outingSpecific.crowdPattern}
                      </p>
                    </div>

                    {/* Nearby Food & Rest Options */}
                    {place.outingSpecific.nearbyFoodRest && place.outingSpecific.nearbyFoodRest.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] uppercase font-bold text-[#8B7A82] block mb-2">
                          Nearby Restrooms & Refreshments
                        </span>
                        <div className="space-y-2">
                          {place.outingSpecific.nearbyFoodRest.map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-[#FDF7F4] text-[12px]">
                              <div>
                                <span className="font-bold text-[#4A2E3A]">{f.name}</span>
                                <span className="text-[11px] text-[#8B7A82] block">{f.type}</span>
                              </div>
                              <span className="text-[11px] font-semibold text-[#E89C8B] bg-[#FFFFFF] px-2.5 py-1 rounded-full shadow-2xs">
                                {f.distance}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cafe Specific Highlights */}
              {place.cafeSpecific && (
                <div className="bg-[#FFFFFF] p-5 rounded-3xl space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-[#E89C8B]" />
                    <h4 className="text-[13px] font-bold text-[#4A2E3A] uppercase tracking-wider">
                      Cafe Menu & Ambience
                    </h4>
                  </div>

                  <div className="space-y-2.5 text-[13px]">
                    <div className="flex justify-between py-2 px-3 rounded-2xl bg-[#FDF7F4]">
                      <span className="text-[#8B7A82]">Vibe & Acoustics</span>
                      <span className="font-semibold text-[#4A2E3A] text-right max-w-[200px]">
                        {place.cafeSpecific.vibe}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 px-3 rounded-2xl bg-[#FDF7F4]">
                      <span className="text-[#8B7A82]">Price for two</span>
                      <span className="font-bold text-[#4A2E3A]">{place.cafeSpecific.priceForTwo}</span>
                    </div>
                    <div className="flex justify-between py-2 px-3 rounded-2xl bg-[#FDF7F4]">
                      <span className="text-[#8B7A82]">Ambience Score</span>
                      <span className="font-bold text-[#9BB79C]">{place.cafeSpecific.ambienceScore} / 10</span>
                    </div>
                    <div className="pt-1">
                      <span className="text-[11px] uppercase font-bold text-[#8B7A82] block mb-1">
                        Must order items
                      </span>
                      <p className="font-semibold text-[#4A2E3A] text-[13px] bg-[#FBE4E8]/60 p-3 rounded-2xl">
                        ☕ {place.cafeSpecific.mustOrder}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Specific Highlights */}
              {place.marketSpecific && (
                <div className="bg-[#FFFFFF] p-5 rounded-3xl space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#E89C8B]" />
                    <h4 className="text-[13px] font-bold text-[#4A2E3A] uppercase tracking-wider">
                      Market Specialties & Safe Entries
                    </h4>
                  </div>

                  <div className="space-y-3 text-[13px]">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-[#8B7A82] block mb-1.5">
                        Specialty categories
                      </span>
                      <div className="relative">
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap pr-6 py-0.5">
                          {place.marketSpecific.specialties.map((spec, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-[#FBE4E8] text-[#4A2E3A] text-[12px] font-semibold shrink-0"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#FFFFFF] to-transparent" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FDF7F4] space-y-1">
                      <span className="text-[11px] uppercase font-bold text-[#8B7A82] block">
                        Bargaining & Timing Tip
                      </span>
                      <p className="text-[#4A2E3A] font-medium text-[12px]">
                        {place.marketSpecific.bargainingTips}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#EBF3EA] space-y-1">
                      <span className="text-[11px] uppercase font-bold text-[#3F5D41] block">
                        Safest Entry & Exit Gate
                      </span>
                      <p className="text-[#2C3E2D] font-semibold text-[12px]">
                        {place.marketSpecific.safestEntryExit}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mall Specific Highlights */}
              {place.mallSpecific && (
                <div className="bg-[#FFFFFF] p-5 rounded-3xl space-y-3.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#E89C8B]" />
                    <h4 className="text-[13px] font-bold text-[#4A2E3A] uppercase tracking-wider">
                      Brands Directory & Cab Deck
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[11px] uppercase font-bold text-[#8B7A82] block mb-1.5">
                        Verified Stores
                      </span>
                      <div className="relative">
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap pr-6 py-0.5">
                          {place.mallSpecific.brandChips.map((b) => (
                            <span
                              key={b}
                              className="px-3 py-1 rounded-full bg-[#FBE4E8] text-[#4A2E3A] text-[12px] font-semibold shrink-0"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#FFFFFF] to-transparent" />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#EBF3EA] space-y-1 text-[12px]">
                      <span className="font-bold text-[#3F5D41] block">
                        Indoor App-Cab Pickup Lounge
                      </span>
                      <p className="text-[#2C3E2D] font-medium">
                        {place.mallSpecific.verifiedCabPickup}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Metro Transit & Exit Access (Line & Dot Diagram) */}
              <div className="bg-[#FFFFFF] p-5 rounded-3xl shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <Train className="w-4 h-4 text-[#E89C8B]" />
                  <h4 className="text-[13px] font-bold text-[#4A2E3A] uppercase tracking-wider">
                    Safest Metro Route & Exit
                  </h4>
                </div>

                <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5DFF2]">
                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#FFFFFF] border-2 border-[#E89C8B] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E89C8B]" />
                    </div>
                    <span className="text-[13px] font-bold text-[#4A2E3A]">
                      {place.metroLine} — {place.metroStation}
                    </span>
                    <p className="text-[12px] text-[#8B7A82] mt-0.5 font-medium">
                      Coach 1 dedicated Ladies Coach (Pink Floor Signage)
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#FFFFFF] border-2 border-[#9BB79C] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9BB79C]" />
                    </div>
                    <span className="text-[13px] font-bold text-[#4A2E3A]">
                      Safe Exit Footpath
                    </span>
                    <p className="text-[12px] text-[#4A2E3A] mt-0.5 font-medium">
                      {place.metroExit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Curated Local Tips */}
              <div className="bg-[#FFFFFF] p-5 rounded-3xl space-y-2.5 shadow-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF7A]" />
                  <h4 className="text-[13px] font-bold text-[#4A2E3A] uppercase tracking-wider">
                    SafeHer Bestie Tips
                  </h4>
                </div>

                <ul className="space-y-2 text-[13px] text-[#4A2E3A]">
                  {place.curatedTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E89C8B] shrink-0 mt-1.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pinned "Start Companion Mode" CTA Button without divider line */}
            <div className="p-4 bg-[#FFFFFF] shadow-lg">
              <button
                id="start-companion-mode-cta"
                onClick={() => {
                  onStartRoute(place);
                  onClose();
                }}
                className="w-full py-4 px-6 rounded-2xl bg-[#E89C8B] hover:bg-[#DC8876] text-[#FFFFFF] font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(232,156,139,0.35)] transition-all duration-200 active:scale-[0.98]"
              >
                <Compass className="w-4.5 h-4.5" />
                <span>Start Companion Mode</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
