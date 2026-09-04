import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Search, Sparkles, ChevronRight, Check, MessageCircleHeart } from 'lucide-react';
import { DELHI_NEIGHBORHOODS } from '../data/delhiData';
import { DelhiNeighborhood } from '../types';

interface HomeViewProps {
  onSelectArea: (area: DelhiNeighborhood) => void;
  onOpenAIChat?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectArea, onOpenAIChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Rotating greeting headline by time of day
  const greetingHeadline = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Hey beautiful, ready to explore?";
    } else if (hour >= 12 && hour < 17) {
      return "Hey girly, where are we going today?";
    } else if (hour >= 17 && hour < 22) {
      return "Hi babe, let's find your vibe today";
    } else {
      return "Hey girly, where are we going today?";
    }
  }, []);

  // Filtered areas when typing or focused
  const filteredNeighborhoods = useMemo(() => {
    if (!searchQuery.trim()) return DELHI_NEIGHBORHOODS;
    const q = searchQuery.toLowerCase();
    return DELHI_NEIGHBORHOODS.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.zone.toLowerCase().includes(q) ||
        n.tagline.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setLocationSuccess(true);
      setTimeout(() => {
        // Auto-select detected area Hauz Khas / South Delhi
        onSelectArea('Hauz Khas');
      }, 500);
    }, 800);
  };

  return (
    <div className="min-h-[82vh] flex flex-col justify-center px-5 py-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-sm mx-auto space-y-6 text-center"
      >
        {/* Soft Decorative Bestie Sparkle Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FBE4E8] text-[#4A2E3A] text-[12px] font-semibold mx-auto shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF7A]" />
          <span>Delhi City Companion</span>
        </div>

        {/* Headline alone with no subtitle text */}
        <div>
          <h1 className="text-[30px] sm:text-[32px] font-bold text-[#4A2E3A] font-heading tracking-tight leading-[1.2]">
            {greetingHeadline}
          </h1>
        </div>

        {/* One Large Centered Input: "Pick your area" */}
        <div className="pt-1 text-left space-y-3 relative">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-[#FBE4E8] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#E89C8B]" />
              </div>
            </div>

            <input
              id="area-search-input"
              type="text"
              value={searchQuery}
              onFocus={() => setIsInputFocused(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsInputFocused(true);
              }}
              placeholder="Pick your area (e.g. Hauz Khas, Khan Market)"
              className="w-full pl-15 pr-4 py-4.5 rounded-2xl bg-[#FFFFFF] text-[#4A2E3A] placeholder:text-[#8B7A82]/70 text-[15px] font-semibold outline-none focus:ring-2 focus:ring-[#E89C8B]/60 shadow-[0_4px_24px_rgba(74,46,58,0.04)] transition-all"
            />
          </div>

          {/* "Use my current location" Chip */}
          <div className="flex justify-center pt-1">
            <button
              id="use-current-location-btn"
              onClick={handleUseCurrentLocation}
              disabled={isLocating || locationSuccess}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-[#FBE4E8]/60 hover:bg-[#FBE4E8] text-[#4A2E3A] text-[13px] font-bold shadow-xs active:scale-95 transition-all"
            >
              {locationSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#3F5D41]" />
                  <span className="text-[#4A2E3A]">Located: Hauz Khas & HKV</span>
                </>
              ) : isLocating ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#E89C8B] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[#8B7A82]">Detecting GPS...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-3.5 h-3.5 text-[#E89C8B]" />
                  <span>Use my current location</span>
                </>
              )}
            </button>
          </div>

          {/* Area Selection Suggestions Dropdown / List */}
          {(isInputFocused || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-2 bg-[#FFFFFF] rounded-2xl shadow-[0_8px_30px_rgba(74,46,58,0.08)] max-h-60 overflow-y-auto space-y-1 z-20 relative no-scrollbar"
            >
              <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#8B7A82]">
                <span>Neighborhoods</span>
                <span>Tap to choose</span>
              </div>
              {filteredNeighborhoods.map((n) => (
                <button
                  key={n.id}
                  id={`select-area-${n.id}`}
                  onClick={() => onSelectArea(n.id as DelhiNeighborhood)}
                  className="w-full p-2.5 rounded-xl hover:bg-[#FBE4E8]/60 flex items-center justify-between text-left transition-colors group"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-bold text-[#4A2E3A] group-hover:text-[#E89C8B]">
                        {n.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#FBE4E8] text-[#4A2E3A] font-semibold">
                        {n.zone}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8B7A82] truncate max-w-[240px]">
                      {n.tagline}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8B7A82] group-hover:text-[#E89C8B]" />
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* AI Bestie Mood Plan Prompt Card: Blush pink background, heading only, arrow */}
        {onOpenAIChat && (
          <div
            onClick={onOpenAIChat}
            className="p-4 rounded-3xl bg-[#FBE4E8] hover:bg-[#F8D2D9] transition-all cursor-pointer flex items-center justify-between shadow-2xs group text-left mt-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFFFFF] flex items-center justify-center text-[#4A2E3A] shadow-2xs group-hover:scale-105 transition-transform">
                <MessageCircleHeart className="w-5 h-5 text-[#E89C8B]" />
              </div>
              <h4 className="text-[14px] font-bold text-[#4A2E3A] font-heading">
                Want a custom mood plan?
              </h4>
            </div>
            <ChevronRight className="w-4 h-4 text-[#4A2E3A] group-hover:translate-x-0.5 transition-transform" />
          </div>
        )}
      </motion.div>
    </div>
  );
};
