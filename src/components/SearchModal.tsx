import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MapPin, Train, Star, ArrowRight, Sparkles } from 'lucide-react';
import { DELHI_PLACES } from '../data/delhiData';
import { DelhiPlace } from '../types';
import { SafetyScoreBadge } from './SafetyScoreBadge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (place: DelhiPlace) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPlace
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filterTags = ['Thrifting', 'Garden Cafe', 'Silver Jewellery', 'Sephora', 'Heritage Walk', 'Work Friendly'];

  const filteredPlaces = useMemo(() => {
    return DELHI_PLACES.filter((place) => {
      const matchesText =
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.area.toLowerCase().includes(query.toLowerCase()) ||
        place.neighborhood.toLowerCase().includes(query.toLowerCase()) ||
        place.metroLine.toLowerCase().includes(query.toLowerCase()) ||
        place.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesTag = selectedTag ? place.tags.includes(selectedTag) : true;
      return matchesText && matchesTag;
    });
  }, [query, selectedTag]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#4A2E3A]/40 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full max-w-md bg-[#FDF7F4] rounded-3xl shadow-2xl flex flex-col max-h-[82vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header without divider line */}
            <div className="p-4 bg-[#FFFFFF] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#8B7A82]" />
              <input
                id="search-delhi-input"
                type="text"
                autoFocus
                placeholder="Search spots, areas (e.g. Khan Market, HKV)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-[15px] font-semibold text-[#4A2E3A] placeholder:text-[#8B7A82]/60 outline-none"
              />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#FDF7F4] flex items-center justify-center text-[#8B7A82] hover:text-[#4A2E3A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Filter Tags */}
            <div className="px-4 py-3 bg-[#FDF7F4] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors ${
                    selectedTag === tag
                      ? 'bg-[#4A2E3A] text-white shadow-2xs'
                      : 'bg-[#FFFFFF] text-[#8B7A82] hover:bg-[#FBE4E8]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results List without divider lines */}
            <div className="p-4 overflow-y-auto space-y-2.5 flex-1 bg-[#FDF7F4] no-scrollbar">
              {filteredPlaces.length === 0 ? (
                <div className="py-12 text-center text-[#8B7A82] space-y-1">
                  <p className="text-[14px] font-bold text-[#4A2E3A]">No spots matching your search</p>
                  <p className="text-[12px] opacity-70">Try "Sarojini", "Khan Market", "Coffee", or "Garden"</p>
                </div>
              ) : (
                filteredPlaces.map((place) => (
                  <motion.div
                    key={place.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectPlace(place);
                      onClose();
                    }}
                    className="p-3 rounded-2xl bg-[#FFFFFF] flex items-center justify-between gap-3 cursor-pointer group shadow-2xs hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={place.thumbnail}
                        alt={place.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-[14px] font-bold text-[#4A2E3A] truncate">
                            {place.name}
                          </h4>
                          <span className="text-[10px] text-[#4A2E3A] font-semibold px-2 py-0.2 rounded-full bg-[#E5DFF2] shrink-0">
                            {place.neighborhood}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8B7A82] truncate mt-0.5">
                          {place.priceRange} • {place.metroStation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <SafetyScoreBadge score={place.safetyScore} size="sm" showLabel={false} />
                      <ArrowRight className="w-4 h-4 text-[#8B7A82] group-hover:text-[#4A2E3A] transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
