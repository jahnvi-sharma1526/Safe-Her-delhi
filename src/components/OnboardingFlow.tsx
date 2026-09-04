import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Calendar, ShieldCheck, ChevronRight, Sparkles, MapPin, Coffee, ShoppingBag } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface OnboardingSlide {
  id: number;
  badge: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  secondaryIcons?: React.ElementType[];
  headline: string;
  supportingLine: string;
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    badge: 'Curated Delhi Gems',
    icon: Compass,
    iconColor: 'text-[#E89C8B]',
    iconBg: 'bg-[#FBE4E8]',
    secondaryIcons: [Coffee, ShoppingBag],
    headline: 'Find your next favorite spot',
    supportingLine: 'Curated cafes, markets, and hidden gems across Delhi.'
  },
  {
    id: 2,
    badge: 'Intelligent Day Planner',
    icon: Calendar,
    iconColor: 'text-[#E89C8B]',
    iconBg: 'bg-[#FBE4E8]',
    secondaryIcons: [Sparkles],
    headline: 'Plan your day, your way',
    supportingLine: "Tell us your mood and budget, we'll do the rest."
  },
  {
    id: 3,
    badge: 'Always-On Safety',
    icon: ShieldCheck,
    iconColor: 'text-[#3F5D41]',
    iconBg: 'bg-[#FBE4E8]',
    secondaryIcons: [MapPin],
    headline: "We've got your back",
    supportingLine: 'Live safety tracking, safer routes, and one-tap help — always with you.'
  }
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentSlide = ONBOARDING_SLIDES[currentIndex];
  const isLastSlide = currentIndex === ONBOARDING_SLIDES.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      onComplete();
    } else {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      // Swiped left -> next
      if (!isLastSlide) {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (diff < -45) {
      // Swiped right -> prev
      if (currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex((prev) => prev - 1);
      }
    }
    setTouchStartX(null);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#FDF7F4] text-[#4A2E3A] px-6 py-8 selection:bg-[#FBE4E8] select-none"
      style={{
        background: `
          radial-gradient(circle at 20% 15%, #fff0f3 0%, transparent 60%),
          radial-gradient(circle at 80% 85%, #fbe4ea 0%, transparent 60%),
          #FDF7F4
        `
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar with Skip Link */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-bold tracking-tight text-[#4A2E3A] font-heading">
            SafeHer
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E89C8B] bg-[#FBE4E8] px-2 py-0.5 rounded-full">
            Delhi
          </span>
        </div>

        <button
          id="onboarding-skip-btn"
          onClick={onComplete}
          className="text-[13px] font-bold text-[#8B7A82] hover:text-[#4A2E3A] py-1 px-3 rounded-full hover:bg-[#FBE4E8]/60 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Card Area */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto relative max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full text-center space-y-6 flex flex-col items-center"
          >
            {/* Minimal Minimalist Icon Display */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FBE4E8] flex items-center justify-center shadow-xs mx-auto">
                <currentSlide.icon className={`w-11 h-11 sm:w-13 sm:h-13 ${currentSlide.iconColor}`} />
              </div>

              {/* Subtle accent mini badge */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#FFFFFF] shadow-2xs flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D4AF7A]" />
              </div>
            </div>

            {/* Content Text (Headline + 1 sentence supporting line) */}
            <div className="space-y-2.5 px-2">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#E89C8B] bg-[#FBE4E8]/80 px-3 py-1 rounded-full">
                {currentSlide.badge}
              </span>
              <h2 className="text-[26px] sm:text-[28px] font-bold text-[#4A2E3A] font-heading tracking-tight leading-[1.2]">
                {currentSlide.headline}
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#8B7A82] leading-relaxed max-w-xs mx-auto">
                {currentSlide.supportingLine}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Area: Progress Dots + Next / Get Started Action */}
      <div className="w-full max-w-sm mx-auto space-y-6 pb-2">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2">
          {ONBOARDING_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-7 bg-[#E89C8B]'
                  : 'w-2 bg-[#FBE4E8] hover:bg-[#F7B8C4]'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          id={isLastSlide ? 'onboarding-get-started-btn' : 'onboarding-next-btn'}
          onClick={handleNext}
          className="w-full py-4 px-6 rounded-2xl bg-[#E89C8B] hover:bg-[#DC8876] text-[#FFFFFF] font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(232,156,139,0.35)] transition-all duration-200 active:scale-[0.98]"
        >
          <span>{isLastSlide ? 'Get Started' : 'Next'}</span>
          <ChevronRight className="w-4.5 h-4.5" />
        </button>
      </div>
    </motion.div>
  );
};
