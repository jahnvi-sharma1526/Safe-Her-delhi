import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Navigation, 
  Train, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  ChevronRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { SAFE_ROUTES, DELHI_PLACES } from '../data/delhiData';
import { SafeRoute, DelhiPlace } from '../types';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';

interface SafeRouteViewProps {
  selectedPlace?: DelhiPlace | null;
  onStartJourney: (route: SafeRoute) => void;
  onSelectPlaceDetails: (place: DelhiPlace) => void;
}

export const SafeRouteView: React.FC<SafeRouteViewProps> = ({
  selectedPlace,
  onStartJourney,
  onSelectPlaceDetails
}) => {
  const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0);
  const currentRoute = SAFE_ROUTES[activeRouteIndex];

  return (
    <div className="space-y-4 pb-28 pt-2">
      {/* Map-First Canvas Container */}
      <div className="px-4">
        <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#E5DFF2] bg-[#FDF7F4] shadow-xs">
          {/* Stylized Aesthetic Cream & Muted Rose Map Canvas */}
          <svg
            className="w-full h-full"
            viewBox="0 0 400 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base land grid */}
            <rect width="400" height="360" fill="#FDF7F4" />

            {/* City road grid lines */}
            <path d="M0 60 H400 M0 140 H400 M0 220 H400 M0 300 H400" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M70 0 V360 M170 0 V360 M270 0 V360 M370 0 V360" stroke="#FFFFFF" strokeWidth="4" />

            {/* Ring Road Curve */}
            <path
              d="M 30 180 Q 200 40 370 200"
              stroke="#E5DFF2"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="6 6"
              opacity="0.8"
            />

            {/* Green park zones (Sundar Nursery / Lodhi Gardens / Nehru Park) */}
            <rect x="230" y="70" width="80" height="50" rx="16" fill="#EBF3EA" />
            <text x="270" y="98" fill="#3F5D41" fontSize="9" fontWeight="600" textAnchor="middle">
              Lush Heritage Belt
            </text>

            <rect x="40" y="240" width="70" height="60" rx="14" fill="#EBF3EA" />
            <text x="75" y="275" fill="#3F5D41" fontSize="9" fontWeight="600" textAnchor="middle">
              Santushti Enclave
            </text>

            {/* Metro Pink Line Track */}
            <path
              d="M 50 310 L 150 200 L 290 140"
              stroke="#FBE4E8"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* Safe Route Highlighting Glow (Muted Coral) */}
            <path
              d="M 60 300 C 100 250, 140 210, 160 190 C 200 150, 240 130, 280 110"
              stroke="#E89C8B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 6"
            />

            {/* Origin Node */}
            <g transform="translate(60, 300)">
              <circle r="12" fill="#FBE4E8" fillOpacity="0.8" />
              <circle r="6" fill="#4A2E3A" />
              <circle r="2.5" fill="#FFFFFF" />
              <rect x="-40" y="16" width="80" height="18" rx="6" fill="#FFFFFF" stroke="#E5DFF2" strokeWidth="1" />
              <text x="0" y="29" fill="#4A2E3A" fontSize="8" fontWeight="bold" textAnchor="middle">
                Sarojini Gate 1
              </text>
            </g>

            {/* Safe Pink Booth Checkpoint Marker */}
            <g transform="translate(160, 190)">
              <circle r="10" fill="#EBF3EA" />
              <circle r="5" fill="#9BB79C" />
              <rect x="-35" y="-22" width="70" height="16" rx="5" fill="#FFFFFF" stroke="#9BB79C" strokeWidth="1" />
              <text x="0" y="-11" fill="#3F5D41" fontSize="8" fontWeight="bold" textAnchor="middle">
                Pink Booth #14
              </text>
            </g>

            {/* Destination Node */}
            <g transform="translate(280, 110)">
              <circle r="14" fill="#E89C8B" fillOpacity="0.3" className="animate-ping" />
              <circle r="10" fill="#E89C8B" />
              <circle r="4" fill="#FFFFFF" />
              <rect x="-45" y="-26" width="90" height="18" rx="6" fill="#4A2E3A" />
              <text x="0" y="-14" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                Diggin Chanakyapuri
              </text>
            </g>
          </svg>

          {/* Top Overlaid Route Switcher */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex gap-1.5 bg-[#FFFFFF]/95 backdrop-blur-md p-1 rounded-2xl shadow-xs">
              {SAFE_ROUTES.map((route, idx) => (
                <button
                  key={route.id}
                  onClick={() => setActiveRouteIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                    activeRouteIndex === idx
                      ? 'bg-[#F7B8C4] text-[#4A2E3A] font-bold shadow-2xs'
                      : 'bg-[#FBE4E8]/60 text-[#4A2E3A] hover:bg-[#FBE4E8]'
                  }`}
                >
                  Route {idx + 1}
                </button>
              ))}
            </div>

            <div className="bg-[#FFFFFF]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E5DFF2] shadow-xs">
              <SafetyScoreBadge score={currentRoute.safetyScore} size="sm" />
            </div>
          </div>

          {/* Bottom Map Badge */}
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md text-[11px] font-bold text-[#4A2E3A] border border-[#E5DFF2] shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9BB79C]" />
            <span>100% Verified Safe Footpaths</span>
          </div>
        </div>
      </div>

      {/* Active Route Card */}
      <div className="px-4">
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DFF2] p-5 space-y-4 shadow-xs">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82]">
                Recommended Safe Corridor
              </span>
              <h3 className="text-[18px] font-bold text-[#4A2E3A] font-heading tracking-tight mt-0.5">
                {currentRoute.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[20px] font-bold text-[#4A2E3A]">
                {currentRoute.etaMinutes} min
              </span>
              <span className="block text-[11px] text-[#8B7A82] font-semibold">
                {currentRoute.distanceKm} km
              </span>
            </div>
          </div>

          {/* Metro Legs & Coaches */}
          <div className="p-3.5 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] space-y-2">
            {currentRoute.metroLegs.map((leg, i) => (
              <div key={i} className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <Train className="w-4 h-4 text-[#E89C8B]" />
                  <span className="font-bold text-[#4A2E3A]">{leg.line}</span>
                  <span className="text-[#8B7A82]">({leg.stationsCount} stops)</span>
                </div>
                <span className="text-[11px] font-bold text-[#4A2E3A] bg-[#E5DFF2] px-2 py-0.5 rounded-md">
                  {leg.pinkCoachPosition}
                </span>
              </div>
            ))}
          </div>

          {/* Turn-by-Turn Safe Checkpoints */}
          <div className="space-y-2.5">
            <h4 className="text-[12px] font-bold text-[#8B7A82] uppercase tracking-wider">
              Safety Verification Checkpoints
            </h4>
            <div className="space-y-2">
              {currentRoute.walkSegments.map((segment, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[13px]">
                  <div className="w-5 h-5 rounded-full bg-[#EBF3EA] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9BB79C]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#4A2E3A] leading-snug font-medium">
                      {segment.instruction}
                    </p>
                    <span className="text-[11px] text-[#8B7A82] mt-0.5 inline-block">
                      Lighting: <strong className="text-[#3F5D41]">{segment.litRating}</strong> • CCTV Monitored
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA: Start Journey */}
          <div className="pt-2">
            <button
              id="start-safe-journey-btn"
              onClick={() => onStartJourney(currentRoute)}
              className="w-full py-4 px-6 rounded-2xl bg-[#E89C8B] hover:bg-[#DC8876] text-[#FFFFFF] font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(232,156,139,0.35)] transition-all duration-200 active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4" />
              <span>Start Journey • Live Companion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
