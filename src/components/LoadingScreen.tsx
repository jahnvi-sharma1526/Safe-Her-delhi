import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onFinished: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onFinished,
  minDurationMs = 2100
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinished();
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [onFinished, minDurationMs]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 30% 20%, #fff0f3 0%, transparent 55%),
          radial-gradient(circle at 75% 80%, #fbe4ea 0%, transparent 55%),
          #fff7f5
        `
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4.5 px-6">
        {/* Animated Wordmark Container */}
        <div className="relative flex items-baseline justify-center flex-wrap logo-shimmer">
          {/* Word: SafeHer */}
          <span className="inline-flex overflow-hidden">
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.05s' }}>S</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.12s' }}>a</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.19s' }}>f</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.26s' }}>e</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#c14f6f]" style={{ animationDelay: '0.33s' }}>H</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.40s' }}>e</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.47s' }}>r</span>
          </span>

          {/* Spacing between SafeHer and Delhi */}
          <span className="w-3 sm:w-3.5 inline-block" />

          {/* Word: Delhi */}
          <span className="inline-flex overflow-hidden">
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.66s' }}>D</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.73s' }}>e</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.80s' }}>l</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.87s' }}>h</span>
            <span className="logo-letter text-[46px] sm:text-[54px] text-[#5c2a3d]" style={{ animationDelay: '0.94s' }}>i</span>
          </span>

          {/* Heart Beat Icon */}
          <span className="logo-heart-anim text-[26px] sm:text-[28px] text-[#e0708f] ml-2 select-none">
            ♥
          </span>
        </div>

        {/* Small Caps Tagline */}
        <div className="logo-tagline-anim text-[11px] sm:text-[12px] tracking-[4px] uppercase text-[#e0708f] font-semibold text-center flex items-center justify-center">
          <span>CURATED</span>
          <span className="inline-block w-1 h-1 rounded-full bg-[#ec9fb2] mx-2 align-middle" />
          <span>GIRLY</span>
          <span className="inline-block w-1 h-1 rounded-full bg-[#ec9fb2] mx-2 align-middle" />
          <span>SAFE</span>
        </div>

        {/* Slim minimal loading indicator */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ec9fb2] animate-pulse" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 rounded-full bg-[#ec9fb2] animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 rounded-full bg-[#ec9fb2] animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
