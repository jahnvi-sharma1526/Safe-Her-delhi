import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Navigation, 
  CheckCircle2, 
  Heart,
  Share2, 
  ChevronRight,
  MessageCircleHeart
} from 'lucide-react';
import { PRESET_DAY_PLANS, DELHI_PLACES, SAFE_ROUTES } from '../data/delhiData';
import { GirlsDayPlan, DelhiPlace, SafeRoute } from '../types';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';

interface PlannerViewProps {
  onSelectPlace: (place: DelhiPlace) => void;
  onStartJourney: (route: SafeRoute) => void;
  onOpenAIChat?: () => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({
  onSelectPlace,
  onStartJourney,
  onOpenAIChat
}) => {
  // 3-input form states using segmented controls
  const [budgetType, setBudgetType] = useState<'budget' | 'moderate' | 'luxe'>('budget');
  const [selectedArea, setSelectedArea] = useState<string>('South Delhi');
  const [purpose, setPurpose] = useState<string>('Thrift & Coffee');

  // Match or generate dynamic custom itinerary
  const activePlan: GirlsDayPlan = useMemo(() => {
    if (budgetType === 'budget') return PRESET_DAY_PLANS[0];
    if (budgetType === 'moderate') return PRESET_DAY_PLANS[1];
    return PRESET_DAY_PLANS[2];
  }, [budgetType]);

  const [copied, setCopied] = useState(false);

  const handleSharePlan = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5 px-4 pb-28 pt-2">
      {/* Header with standalone headline, no subtitle text */}
      <div className="flex items-center justify-between">
        <h1 className="text-[26px] font-bold text-[#4A2E3A] font-heading tracking-tight">
          Girls’ Day Planner
        </h1>

        {onOpenAIChat && (
          <button
            onClick={onOpenAIChat}
            className="p-2.5 rounded-2xl bg-[#FBE4E8] text-[#4A2E3A] hover:bg-[#F8D2D9] transition-all flex items-center gap-1.5 text-[12px] font-bold shadow-2xs"
            title="Ask AI Bestie"
          >
            <Sparkles className="w-4 h-4 text-[#E89C8B]" />
            <span className="hidden sm:inline">AI Planner</span>
          </button>
        )}
      </div>

      {/* AI Assistant Banner: Blush pink background, heading only, arrow */}
      {onOpenAIChat && (
        <div
          onClick={onOpenAIChat}
          className="p-4 rounded-3xl bg-[#FBE4E8] hover:bg-[#F8D2D9] transition-all cursor-pointer flex items-center justify-between shadow-2xs group"
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

      {/* 3-Input Segmented Controls Form: Consistent Blush Pink Tone System */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 space-y-4 shadow-xs">
        {/* 1. Target Spend Tier: Plain text labels without Rupee symbols */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block mb-2">
            1. Target Spend Tier
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'budget', label: 'Under 2k' },
              { id: 'moderate', label: '2k – 4k' },
              { id: 'luxe', label: 'Luxe 4k+' }
            ].map((tier) => (
              <button
                key={tier.id}
                id={`plan-budget-tier-${tier.id}`}
                onClick={() => setBudgetType(tier.id as any)}
                className={`py-2 px-1 rounded-xl text-[12px] font-semibold transition-all text-center ${
                  budgetType === tier.id
                    ? 'bg-[#F7B8C4] text-[#4A2E3A] font-bold shadow-2xs'
                    : 'bg-[#FBE4E8]/60 text-[#4A2E3A] hover:bg-[#FBE4E8]'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Zone Segmented Control */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block mb-2">
            2. Delhi Zone
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {['South Delhi', 'Central Delhi', 'Saket & Mehrauli'].map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`py-2 px-1 rounded-xl text-[11px] font-semibold truncate transition-all text-center ${
                  selectedArea === area
                    ? 'bg-[#F7B8C4] text-[#4A2E3A] font-bold shadow-2xs'
                    : 'bg-[#FBE4E8]/60 text-[#4A2E3A] hover:bg-[#FBE4E8]'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Purpose Segmented Control */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block mb-2">
            3. Vibe / Purpose
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {['Thrift & Coffee', 'Aesthetic Date', 'Sunset & Dinner', 'Bookstore & Chill'].map((p) => (
              <button
                key={p}
                onClick={() => setPurpose(p)}
                className={`py-2 px-2 rounded-xl text-[12px] font-semibold truncate transition-all text-center ${
                  purpose === p
                    ? 'bg-[#F7B8C4] text-[#4A2E3A] font-bold shadow-2xs'
                    : 'bg-[#FBE4E8]/60 text-[#4A2E3A] hover:bg-[#FBE4E8]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned Estimated Spend Summary */}
      <div className="bg-[#FFFFFF] rounded-3xl p-5 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-[11px] uppercase font-bold text-[#8B7A82] tracking-wider">
            Total Estimated Spend
          </span>
          <div className="text-[22px] font-bold text-[#4A2E3A] font-heading flex items-baseline gap-1 mt-0.5">
            <span>₹{activePlan.totalSpend.toLocaleString('en-IN')}</span>
            <span className="text-[12px] text-[#8B7A82] font-normal">
              for whole outing
            </span>
          </div>
        </div>

        <button
          onClick={handleSharePlan}
          className="px-3.5 py-2 rounded-xl bg-[#FBE4E8]/60 text-[12px] font-semibold text-[#4A2E3A] hover:bg-[#FBE4E8] transition-colors flex items-center gap-1.5"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Link Copied!' : 'Share Plan'}</span>
        </button>
      </div>

      {/* Vertical Timeline Output */}
      <div className="space-y-4">
        <h3 className="text-[16px] font-bold text-[#4A2E3A] font-heading tracking-tight">
          {activePlan.title}
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:border-l-2 before:border-dotted before:border-[#E89C8B]">
          {activePlan.timeline.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Connector Dot */}
              <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#FFFFFF] border-2 border-[#E89C8B] flex items-center justify-center shadow-xs">
                <span className="text-[10px] font-bold text-[#4A2E3A]">{item.step}</span>
              </div>

              {/* Step Card */}
              <div
                onClick={() => onSelectPlace(item.place)}
                className="bg-[#FFFFFF] rounded-3xl p-4.5 space-y-3 cursor-pointer hover:shadow-md transition-all shadow-xs"
              >
                {/* Time & Cost Bar */}
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-[#E89C8B] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </span>
                  <span className="font-semibold text-[#4A2E3A] bg-[#FBE4E8]/60 px-2.5 py-1 rounded-full">
                    Est. ~₹{item.costEstimate}
                  </span>
                </div>

                {/* Place Mini Preview */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.place.thumbnail}
                    alt={item.place.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[15px] font-bold text-[#4A2E3A] truncate font-heading">
                        {item.place.name}
                      </h4>
                      <SafetyScoreBadge score={item.place.safetyScore} size="sm" showLabel={false} />
                    </div>
                    <p className="text-[12px] text-[#8B7A82] line-clamp-1 mt-0.5">
                      {item.place.tagline}
                    </p>
                  </div>
                </div>

                {/* Editor note */}
                <div className="p-3 rounded-2xl bg-[#FDF7F4] text-[12px] text-[#4A2E3A] leading-relaxed">
                  <strong className="text-[#4A2E3A]">Bestie note:</strong> {item.note}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Start This Day Plan Action */}
      <div className="pt-2">
        <button
          id="start-day-plan-journey-btn"
          onClick={() => onStartJourney(SAFE_ROUTES[0])}
          className="w-full py-4 px-6 rounded-2xl bg-[#E89C8B] hover:bg-[#DC8876] text-[#FFFFFF] font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(232,156,139,0.35)] transition-all duration-200 active:scale-[0.98]"
        >
          <Navigation className="w-4.5 h-4.5" />
          <span>Start This Plan • Step 1 Route</span>
        </button>
      </div>
    </div>
  );
};
