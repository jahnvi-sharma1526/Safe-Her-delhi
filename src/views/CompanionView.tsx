import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Footprints, 
  Car, 
  Navigation, 
  MapPin, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  PhoneCall, 
  Share2, 
  Send, 
  Sparkles, 
  ArrowLeft, 
  ChevronRight, 
  Radio, 
  ShieldAlert, 
  Train, 
  Building2, 
  Hospital, 
  Store, 
  Phone,
  Eye,
  Check
} from 'lucide-react';
import { DelhiPlace, SafeRoute, EmergencyContact, CabJourneyDetails, RoadConditionFlag, SafetyAnchor } from '../types';
import { SAFE_ROUTES, DEFAULT_EMERGENCY_CONTACTS, DELHI_PLACES } from '../data/delhiData';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';

interface CompanionViewProps {
  initialDestination?: DelhiPlace | null;
  onOpenFakeCall: () => void;
  onSelectPlaceDetails?: (place: DelhiPlace) => void;
  onCloseCompanion?: () => void;
}

export const CompanionView: React.FC<CompanionViewProps> = ({
  initialDestination,
  onOpenFakeCall,
  onSelectPlaceDetails,
  onCloseCompanion
}) => {
  // Flow mode: 'select_path' | 'walk_plan' | 'walk_active' | 'walk_arrived' | 'cab_form' | 'cab_active' | 'cab_arrived'
  const [currentMode, setCurrentMode] = useState<'select_path' | 'walk_plan' | 'walk_active' | 'walk_arrived' | 'cab_form' | 'cab_active' | 'cab_arrived'>('select_path');
  
  // Destination input
  const [destinationQuery, setDestinationQuery] = useState<string>(initialDestination?.name || 'Diggin Chanakyapuri');
  const [selectedPlace, setSelectedPlace] = useState<DelhiPlace | null>(initialDestination || DELHI_PLACES[0]);
  const [selectedRoute, setSelectedRoute] = useState<SafeRoute>(SAFE_ROUTES[0]);

  // Cab Journey Details
  const [cabDetails, setCabDetails] = useState<CabJourneyDetails>({
    cabNumber: 'DL 1R AB 8942',
    driverName: 'Ramesh Kumar',
    company: 'BluSmart',
    startLocation: 'Hauz Khas Metro Gate 2',
    destination: initialDestination?.name || 'Khan Market Middle Lane'
  });

  // Live Tracking state
  const [walkProgress, setWalkProgress] = useState<number>(15);
  const [cabProgress, setCabProgress] = useState<number>(20);
  const [etaRemaining, setEtaRemaining] = useState<number>(selectedRoute.etaMinutes);
  
  // Check-in Prompt state
  const [showCheckInPrompt, setShowCheckInPrompt] = useState<boolean>(false);
  const [checkInCountdown, setCheckInCountdown] = useState<number>(30);

  // Cab Deviation state
  const [isCabDeviated, setIsCabDeviated] = useState<boolean>(false);
  const [showDeviationPopup, setShowDeviationPopup] = useState<boolean>(false);
  const [alertSent, setAlertSent] = useState<boolean>(false);
  const [emergencyContacts] = useState<EmergencyContact[]>(DEFAULT_EMERGENCY_CONTACTS);

  // Timers
  const walkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cabIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // If initialDestination was passed in, auto-open walk plan
  useEffect(() => {
    if (initialDestination) {
      setSelectedPlace(initialDestination);
      setDestinationQuery(initialDestination.name);
      setCabDetails(prev => ({ ...prev, destination: initialDestination.name }));
    }
  }, [initialDestination]);

  // Walk tracking loop
  useEffect(() => {
    if (currentMode === 'walk_active') {
      walkIntervalRef.current = setInterval(() => {
        setWalkProgress(prev => {
          if (prev >= 95) {
            clearInterval(walkIntervalRef.current!);
            setCurrentMode('walk_arrived');
            return 100;
          }
          return prev + 4;
        });

        setEtaRemaining(prev => Math.max(1, prev - 1));
      }, 4000);

      // Trigger check-in popup after 8 seconds
      const checkInTimer = setTimeout(() => {
        setShowCheckInPrompt(true);
      }, 8000);

      return () => {
        if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
        clearTimeout(checkInTimer);
      };
    }
  }, [currentMode]);

  // Cab tracking loop
  useEffect(() => {
    if (currentMode === 'cab_active') {
      cabIntervalRef.current = setInterval(() => {
        setCabProgress(prev => {
          if (prev >= 95 && !isCabDeviated) {
            clearInterval(cabIntervalRef.current!);
            setCurrentMode('cab_arrived');
            return 100;
          }
          return Math.min(94, prev + 3);
        });
      }, 3500);

      return () => {
        if (cabIntervalRef.current) clearInterval(cabIntervalRef.current);
      };
    }
  }, [currentMode, isCabDeviated]);

  // Check-in countdown
  useEffect(() => {
    if (showCheckInPrompt && checkInCountdown > 0) {
      const timer = setInterval(() => {
        setCheckInCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleEscalateAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCheckInPrompt, checkInCountdown]);

  const handleStartWalkJourney = () => {
    setWalkProgress(10);
    setEtaRemaining(selectedRoute.etaMinutes);
    setCurrentMode('walk_active');
    setShowCheckInPrompt(false);
  };

  const handleStartCabJourney = () => {
    setCabProgress(15);
    setIsCabDeviated(false);
    setShowDeviationPopup(false);
    setAlertSent(false);
    setCurrentMode('cab_active');
  };

  const handleTriggerDeviationSimulation = () => {
    setIsCabDeviated(true);
    setShowDeviationPopup(true);
  };

  const handleAcknowledgeDeviation = () => {
    setShowDeviationPopup(false);
    // Re-check after 2 minutes simulated
  };

  const handleEscalateAlert = () => {
    setShowDeviationPopup(false);
    setShowCheckInPrompt(false);
    setAlertSent(true);
  };

  return (
    <div className="min-h-[85vh] px-4 pb-28 pt-2">
      {/* ===================== 1. SELECT PATH BOTTOM SHEET ===================== */}
      {currentMode === 'select_path' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-1.5 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBE4E8] text-[#4A2E3A] text-[12px] font-bold mx-auto shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#3F5D41]" />
              <span>SafeHer Companion Suite</span>
            </div>
            <h1 className="text-[26px] font-bold text-[#4A2E3A] font-heading tracking-tight">
              Come With Me
            </h1>
          </div>

          {/* Two Primary Paths */}
          <div className="space-y-3.5 pt-1">
            {/* Path 1: Walk me through this */}
            <button
              id="path-walk-btn"
              onClick={() => setCurrentMode('walk_plan')}
              className="w-full p-5 rounded-3xl bg-[#FBE4E8] border border-[#FBE4E8] text-left transition-all duration-200 active:scale-[0.98] shadow-xs hover:shadow-md group block"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Footprints className="w-6 h-6 text-[#E89C8B]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#4A2E3A] font-heading tracking-tight">
                      Walk me through this
                    </h3>
                    <p className="text-[12px] text-[#4A2E3A]/80 font-medium mt-0.5">
                      On-foot journeys · Cafes, thrift markets, gardens & metro paths
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFFFFF]/90 flex items-center justify-center shrink-0 mt-1">
                  <ChevronRight className="w-4 h-4 text-[#4A2E3A]" />
                </div>
              </div>

              {/* Feature Chips Horizontal Scroll */}
              <div className="relative mt-4">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 pr-6 whitespace-nowrap text-[11px] font-bold text-[#4A2E3A]">
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/80 shrink-0">Lit corridors</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/80 shrink-0">Crowd heatmap</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/80 shrink-0">Discreet check-ins</span>
                </div>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FBE4E8] to-transparent" />
              </div>
            </button>

            {/* Path 2: I'm in a cab */}
            <button
              id="path-cab-btn"
              onClick={() => setCurrentMode('cab_form')}
              className="w-full p-5 rounded-3xl bg-[#FBE4E8] text-left transition-all duration-200 active:scale-[0.98] shadow-xs hover:shadow-md group block"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <Car className="w-6 h-6 text-[#E89C8B]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#4A2E3A] font-heading tracking-tight">
                      I'm in a cab
                    </h3>
                    <p className="text-[12px] text-[#4A2E3A]/80 font-medium mt-0.5">
                      Uber, BluSmart, Ola & Auto rides · Live route deviation alerts
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFFFFF]/90 flex items-center justify-center shrink-0 mt-1">
                  <ChevronRight className="w-4 h-4 text-[#4A2E3A]" />
                </div>
              </div>

              {/* Feature Chips Horizontal Scroll */}
              <div className="relative mt-4">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 pr-6 whitespace-nowrap text-[11px] font-bold text-[#4A2E3A]">
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/80 shrink-0">Plate & driver log</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/80 shrink-0">Route deviation alert</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/80 shrink-0">Auto WhatsApp/SMS</span>
                </div>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FBE4E8] to-transparent" />
              </div>
            </button>
          </div>

          {/* Quick Support & Fake Call Card */}
          <div className="p-4 rounded-3xl bg-[#FFFFFF] border border-[#E5DFF2] space-y-3 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block">
              Quick Safety Shortcuts
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="quick-fake-call-trigger"
                onClick={onOpenFakeCall}
                className="p-3 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] flex items-center gap-2 text-left hover:bg-[#FBE4E8]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#FBE4E8] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4 text-[#E89C8B]" />
                </div>
                <div>
                  <span className="text-[12px] font-bold text-[#4A2E3A] block">Fake Call</span>
                  <span className="text-[10px] text-[#8B7A82] block">Mom calling...</span>
                </div>
              </button>

              <a
                href="tel:1091"
                className="p-3 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] flex items-center gap-2 text-left hover:bg-[#E5DFF2]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#E5DFF2] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#4A2E3A]" />
                </div>
                <div>
                  <span className="text-[12px] font-bold text-[#4A2E3A] block">1091 Helpline</span>
                  <span className="text-[10px] text-[#8B7A82] block">Delhi Women Police</span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* ===================== 2. WALK: ROUTE PLANNER SCREEN ===================== */}
      {currentMode === 'walk_plan' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Top Back bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentMode('select_path')}
              className="flex items-center gap-1.5 text-[13px] font-bold text-[#8B7A82] hover:text-[#4A2E3A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="text-[12px] font-bold text-[#E89C8B] bg-[#FBE4E8] px-3 py-1 rounded-full border border-[#FBE4E8]">
              Walk Companion Mode
            </span>
          </div>

          {/* Location Input: Where are you headed? */}
          <div className="bg-[#FFFFFF] p-4.5 rounded-3xl border border-[#E5DFF2] space-y-3 shadow-xs">
            <h3 className="text-[16px] font-bold text-[#4A2E3A] font-heading tracking-tight">
              Where are you headed?
            </h3>
            
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <MapPin className="w-4 h-4 text-[#E89C8B]" />
              </div>
              <input
                type="text"
                value={destinationQuery}
                onChange={(e) => setDestinationQuery(e.target.value)}
                placeholder="Search market, cafe or landmark..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] text-[#4A2E3A] text-[14px] font-semibold outline-none focus:border-[#E89C8B]"
              />
            </div>

            {/* Origin & Destination Pills */}
            <div className="flex items-center justify-between text-[12px] text-[#8B7A82] px-1 pt-1">
              <span>From: <strong>Current GPS Location</strong></span>
              <span>To: <strong className="text-[#4A2E3A]">{destinationQuery}</strong></span>
            </div>
          </div>

          {/* Scored Safest Route Overview */}
          <div className="bg-[#FFFFFF] p-4.5 rounded-3xl border border-[#E5DFF2] space-y-4 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82]">
                  Curated Safe Corridor
                </span>
                <h4 className="text-[17px] font-bold text-[#4A2E3A] font-heading tracking-tight mt-0.5">
                  {selectedRoute.title}
                </h4>
              </div>
              <SafetyScoreBadge score={selectedRoute.safetyScore} size="md" />
            </div>

            {/* 4 Safety Factor Badges */}
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              {/* Lighting */}
              <div className="p-2.5 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2]">
                <span className="text-[10px] font-bold uppercase text-[#8B7A82] block">Street Lighting</span>
                <span className="font-bold text-[#3F5D41] text-[12px] mt-0.5 block">
                  {selectedRoute.lightingRating}
                </span>
              </div>

              {/* Crowd Density Heatmap */}
              <div className="p-2.5 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2]">
                <span className="text-[10px] font-bold uppercase text-[#8B7A82] block">Live Crowd Heatmap</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9BB79C]" />
                  <span className="font-bold text-[#4A2E3A] text-[12px]">Comfortable / Safe</span>
                </div>
              </div>
            </div>

            {/* Road & Pavement Condition Flags */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block">
                Road & Pavement Condition Flags
              </span>
              <div className="space-y-1.5">
                {selectedRoute.roadConditions.map((flag) => (
                  <div key={flag.id} className="p-2.5 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] flex items-start gap-2.5 text-[12px]">
                    <div className="w-5 h-5 rounded-full bg-[#E5DFF2] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4A2E3A]" />
                    </div>
                    <div>
                      <span className="font-bold text-[#4A2E3A] block">{flag.label}</span>
                      <span className="text-[11px] text-[#8B7A82]">{flag.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Safety Anchors */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block">
                Nearby Safety Anchors Pinned
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {selectedRoute.safetyAnchors.map((anchor) => (
                  <div key={anchor.id} className="p-2.5 rounded-2xl bg-[#E5DFF2]/60 border border-[#E5DFF2] flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#4A2E3A]" />
                      <div>
                        <span className="font-bold text-[#4A2E3A] block">{anchor.name}</span>
                        <span className="text-[10px] text-[#8B7A82]">{anchor.address}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#4A2E3A] bg-[#FFFFFF] px-2 py-0.5 rounded-md border border-[#E5DFF2]">
                      {anchor.distanceFromRoute}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Walk CTA */}
            <button
              id="start-walk-tracking-btn"
              onClick={handleStartWalkJourney}
              className="w-full py-4 px-6 rounded-2xl bg-[#E89C8B] hover:bg-[#DC8876] text-[#FFFFFF] font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(232,156,139,0.35)] transition-all duration-200 active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4" />
              <span>Start Live Walk Companion</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* ===================== 3. WALK: LIVE TRACKING SCREEN ===================== */}
      {currentMode === 'walk_active' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Top ETA & Live Status */}
          <div className="bg-[#FFFFFF] p-4 rounded-3xl border border-[#E5DFF2] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FBE4E8] flex items-center justify-center">
                <Footprints className="w-5 h-5 text-[#E89C8B] animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block">
                  Companion Active
                </span>
                <span className="text-[15px] font-bold text-[#4A2E3A] block">
                  {etaRemaining} mins to {destinationQuery}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCurrentMode('walk_arrived')}
              className="px-3 py-1.5 rounded-full bg-[#EBF3EA] border border-[#DFECE0] text-[#3F5D41] text-[12px] font-bold hover:bg-[#DFECE0] transition-colors"
            >
              Mark Safe
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-[#FFFFFF] p-4 rounded-3xl border border-[#E5DFF2] shadow-xs space-y-2">
            <div className="flex justify-between text-[12px] font-bold text-[#4A2E3A]">
              <span>Journey Progress</span>
              <span>{walkProgress}% Completed</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#FDF7F4] border border-[#E5DFF2] overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-[#E89C8B] transition-all duration-500"
                style={{ width: `${walkProgress}%` }}
              />
            </div>
          </div>

          {/* Stylized Aesthetic Map Canvas */}
          <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-[#E5DFF2] bg-[#FDF7F4] shadow-xs">
            <svg className="w-full h-full" viewBox="0 0 400 360" fill="none">
              <rect width="400" height="360" fill="#FDF7F4" />
              {/* Roads */}
              <path d="M0 80 H400 M0 160 H400 M0 240 H400" stroke="#FFFFFF" strokeWidth="6" />
              <path d="M80 0 V360 M180 0 V360 M280 0 V360" stroke="#FFFFFF" strokeWidth="6" />

              {/* Park */}
              <rect x="200" y="50" width="120" height="70" rx="16" fill="#EBF3EA" />
              <text x="260" y="88" fill="#3F5D41" fontSize="9" fontWeight="bold" textAnchor="middle">
                Lush Tree Canopy
              </text>

              {/* Soft Heatmap Safe Corridor */}
              <path
                d="M 50 300 C 90 240, 130 200, 180 180 C 230 160, 270 120, 310 90"
                stroke="#9BB79C"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />

              {/* Safety Anchors Pinned (Lavender) */}
              <g transform="translate(180, 180)">
                <circle r="9" fill="#E5DFF2" />
                <circle r="4" fill="#4A2E3A" />
                <rect x="-35" y="-22" width="70" height="16" rx="5" fill="#FFFFFF" stroke="#E5DFF2" strokeWidth="1" />
                <text x="0" y="-11" fill="#4A2E3A" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Pink Booth #14
                </text>
              </g>

              {/* Moving User Location Marker */}
              <g transform={`translate(${50 + (walkProgress * 2.6)}, ${300 - (walkProgress * 2.1)})`}>
                <circle r="14" fill="#E89C8B" fillOpacity="0.3" className="animate-ping" />
                <circle r="9" fill="#E89C8B" />
                <circle r="4" fill="#FFFFFF" />
              </g>

              {/* Destination */}
              <g transform="translate(310, 90)">
                <circle r="10" fill="#4A2E3A" />
                <circle r="4" fill="#FFFFFF" />
                <rect x="-40" y="-24" width="80" height="18" rx="6" fill="#4A2E3A" />
                <text x="0" y="-12" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Destination
                </text>
              </g>
            </svg>

            {/* Bottom floating safety pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md text-[11px] font-bold text-[#4A2E3A] border border-[#E5DFF2] shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9BB79C]" />
                <span>98% LED Lighting Verified</span>
              </div>

              {/* Floating Fake Call Button */}
              <button
                id="floating-fake-call-walk"
                onClick={onOpenFakeCall}
                className="px-3.5 py-2 rounded-full bg-[#FBE4E8] hover:bg-[#E89C8B] hover:text-white border border-[#FBE4E8] text-[#4A2E3A] text-[12px] font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Fake Call</span>
              </button>
            </div>
          </div>

          {/* Gentle Check-in Modal Overlay if triggered */}
          <AnimatePresence>
            {showCheckInPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                className="p-4 rounded-3xl bg-[#FFFFFF] border-2 border-[#E5DFF2] shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF7A]" />
                    <span className="text-[14px] font-bold text-[#4A2E3A]">
                      Still doing okay?
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#8B7A82]">
                    Auto-check in {checkInCountdown}s
                  </span>
                </div>
                <p className="text-[12px] text-[#8B7A82]">
                  Just checking in on your walk along the corridor. Let us know everything is calm.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setShowCheckInPrompt(false)}
                    className="py-3 px-4 rounded-2xl bg-[#EBF3EA] border border-[#DFECE0] text-[#3F5D41] text-[13px] font-bold hover:bg-[#DFECE0] transition-colors"
                  >
                    Yes, I'm fine
                  </button>
                  <button
                    onClick={handleEscalateAlert}
                    className="py-3 px-4 rounded-2xl bg-[#FBE4E8] border border-[#FBE4E8] text-[#E89C8B] text-[13px] font-bold hover:bg-[#E89C8B] hover:text-white transition-colors"
                  >
                    I need help
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ===================== 4. CAB: DETAILS FORM SCREEN ===================== */}
      {currentMode === 'cab_form' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Top Back bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentMode('select_path')}
              className="flex items-center gap-1.5 text-[13px] font-bold text-[#8B7A82] hover:text-[#4A2E3A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="text-[12px] font-bold text-[#4A2E3A] bg-[#E5DFF2] px-3 py-1 rounded-full border border-[#E5DFF2]">
              Cab Companion Setup
            </span>
          </div>

          {/* Form Card */}
          <div className="bg-[#FFFFFF] p-5 rounded-3xl border border-[#E5DFF2] space-y-4 shadow-xs">
            <div className="space-y-1">
              <h3 className="text-[18px] font-bold text-[#4A2E3A] font-heading tracking-tight">
                Ride & Driver Details
              </h3>
              <p className="text-[12px] text-[#8B7A82]">
                Log your ride details before opening the door. Shared automatically if your route deviates.
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              {/* Cab App / Company Selector */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block mb-1.5">
                  Cab Service / App
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['BluSmart', 'Uber', 'Ola', 'Auto Rickshaw'] as const).map((comp) => (
                    <button
                      key={comp}
                      type="button"
                      onClick={() => setCabDetails(prev => ({ ...prev, company: comp }))}
                      className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all ${
                        cabDetails.company === comp
                          ? 'bg-[#4A2E3A] text-[#FFFFFF] shadow-xs'
                          : 'bg-[#FDF7F4] text-[#8B7A82] border border-[#E5DFF2]'
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cab Vehicle Number */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block mb-1">
                  Vehicle Number Plate
                </label>
                <input
                  type="text"
                  value={cabDetails.cabNumber}
                  onChange={(e) => setCabDetails(prev => ({ ...prev, cabNumber: e.target.value }))}
                  placeholder="e.g. DL 1R AB 4521"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] text-[#4A2E3A] text-[14px] font-bold outline-none focus:border-[#E89C8B]"
                />
              </div>

              {/* Driver Name */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block mb-1">
                  Driver Name
                </label>
                <input
                  type="text"
                  value={cabDetails.driverName}
                  onChange={(e) => setCabDetails(prev => ({ ...prev, driverName: e.target.value }))}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] text-[#4A2E3A] text-[14px] font-semibold outline-none focus:border-[#E89C8B]"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  value={cabDetails.destination}
                  onChange={(e) => setCabDetails(prev => ({ ...prev, destination: e.target.value }))}
                  placeholder="Destination spot..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] text-[#4A2E3A] text-[14px] font-semibold outline-none focus:border-[#E89C8B]"
                />
              </div>
            </div>

            {/* Emergency Broadcast Preview info */}
            <div className="p-3 rounded-2xl bg-[#E5DFF2]/60 border border-[#E5DFF2] flex items-center gap-2.5 text-[12px]">
              <Share2 className="w-4 h-4 text-[#4A2E3A] shrink-0" />
              <span className="text-[#4A2E3A] font-medium">
                Live location link ready to dispatch to <strong>4 trusted contacts</strong> via WhatsApp & SMS.
              </span>
            </div>

            {/* Start Ride Tracking Button */}
            <button
              id="start-cab-tracking-btn"
              onClick={handleStartCabJourney}
              className="w-full py-4 px-6 rounded-2xl bg-[#E89C8B] hover:bg-[#DC8876] text-[#FFFFFF] font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(232,156,139,0.35)] transition-all duration-200 active:scale-[0.98]"
            >
              <Car className="w-4 h-4" />
              <span>Start Cab Route Guard</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* ===================== 5. CAB: LIVE TRACKING & DEVIATION SCREEN ===================== */}
      {currentMode === 'cab_active' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Header Card */}
          <div className="bg-[#FFFFFF] p-4 rounded-3xl border border-[#E5DFF2] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E5DFF2] flex items-center justify-center">
                <Car className="w-5 h-5 text-[#4A2E3A]" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block">
                  {cabDetails.company} • {cabDetails.cabNumber}
                </span>
                <span className="text-[14px] font-bold text-[#4A2E3A] block">
                  Driver: {cabDetails.driverName}
                </span>
              </div>
            </div>

            {/* Persistent Manual Override Toggle in Corner */}
            <button
              onClick={() => setCurrentMode('cab_arrived')}
              className="px-3 py-1.5 rounded-full bg-[#EBF3EA] border border-[#DFECE0] text-[#3F5D41] text-[12px] font-bold hover:bg-[#DFECE0] transition-colors"
            >
              I'm safe
            </button>
          </div>

          {/* Live Route Map Canvas with Deviation visual */}
          <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-[#E5DFF2] bg-[#FDF7F4] shadow-xs">
            <svg className="w-full h-full" viewBox="0 0 400 360" fill="none">
              <rect width="400" height="360" fill="#FDF7F4" />

              {/* City Road Grid */}
              <path d="M0 60 H400 M0 140 H400 M0 220 H400 M0 300 H400" stroke="#FFFFFF" strokeWidth="5" />
              <path d="M70 0 V360 M170 0 V360 M270 0 V360 M370 0 V360" stroke="#FFFFFF" strokeWidth="5" />

              {/* Expected Route (Gentle Lavender / Sage Path) */}
              <path
                d="M 50 280 C 120 250, 180 180, 250 140 C 290 120, 330 90, 350 70"
                stroke="#9BB79C"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="6 6"
              />

              {/* If Deviated: Show gentle coral deviation branch */}
              {isCabDeviated && (
                <path
                  d="M 180 180 C 200 220, 240 260, 270 280"
                  stroke="#E89C8B"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
              )}

              {/* Cab Vehicle Marker */}
              <g transform={isCabDeviated ? "translate(240, 250)" : `translate(${50 + (cabProgress * 3)}, ${280 - (cabProgress * 2.1)})`}>
                <circle r="16" fill={isCabDeviated ? "#FBE4E8" : "#E5DFF2"} className="animate-ping" />
                <circle r="10" fill={isCabDeviated ? "#E89C8B" : "#4A2E3A"} />
                <circle r="4" fill="#FFFFFF" />
              </g>

              {/* Destination Point */}
              <g transform="translate(350, 70)">
                <circle r="10" fill="#4A2E3A" />
                <circle r="4" fill="#FFFFFF" />
                <rect x="-40" y="-24" width="80" height="18" rx="6" fill="#4A2E3A" />
                <text x="0" y="-12" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
                  {cabDetails.destination.split(' ')[0]}
                </text>
              </g>
            </svg>

            {/* Simulation trigger & Alert overlay */}
            <div className="absolute top-3 right-3">
              {!isCabDeviated ? (
                <button
                  id="simulate-deviation-btn"
                  onClick={handleTriggerDeviationSimulation}
                  className="px-3 py-1.5 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md border border-[#E5DFF2] text-[11px] font-bold text-[#8B7A82] hover:text-[#E89C8B] shadow-xs"
                >
                  ⚡ Simulate Deviation
                </button>
              ) : (
                <div className="px-3 py-1.5 rounded-full bg-[#FBE4E8] border border-[#FBE4E8] text-[11px] font-bold text-[#E89C8B] shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E89C8B] animate-ping" />
                  <span>Route Shift Detected</span>
                </div>
              )}
            </div>

            {/* Bottom floating status */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md text-[11px] font-bold text-[#4A2E3A] border border-[#E5DFF2] shadow-xs flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#9BB79C] animate-pulse" />
                <span>Live GPS Syncing with Cloud</span>
              </div>

              <button
                onClick={handleEscalateAlert}
                className="px-3.5 py-1.5 rounded-full bg-[#FBE4E8] hover:bg-[#E89C8B] hover:text-white text-[#E89C8B] text-[11px] font-bold border border-[#FBE4E8] shadow-xs transition-colors"
              >
                Send alert now
              </button>
            </div>
          </div>

          {/* Deviation Slide-Up Sheet (Calm, never red) */}
          <AnimatePresence>
            {showDeviationPopup && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="p-5 rounded-3xl bg-[#FFFFFF] border-2 border-[#E5DFF2] shadow-2xl space-y-3.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FBE4E8] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#E89C8B]" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#4A2E3A]">
                      Looks like your route changed — everything okay?
                    </h4>
                    <p className="text-[12px] text-[#8B7A82]">
                      Your driver took a turn away from the standard arterial corridor.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={handleAcknowledgeDeviation}
                    className="py-3 px-4 rounded-2xl bg-[#EBF3EA] border border-[#DFECE0] text-[#3F5D41] text-[13px] font-bold hover:bg-[#DFECE0] transition-colors"
                  >
                    Yes, continue
                  </button>
                  <button
                    onClick={handleEscalateAlert}
                    className="py-3 px-4 rounded-2xl bg-[#FBE4E8] border border-[#FBE4E8] text-[#E89C8B] text-[13px] font-bold hover:bg-[#E89C8B] hover:text-white transition-colors"
                  >
                    No, I need help
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Alert Dispatched Confirmation Card */}
          {alertSent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-3xl bg-[#FBE4E8] border border-[#FBE4E8] space-y-2 shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#E89C8B]" />
                <span className="text-[13px] font-bold text-[#4A2E3A]">
                  Alert Broadcast Dispatched
                </span>
              </div>
              <p className="text-[12px] text-[#4A2E3A]/90">
                Live location link + Cab details ({cabDetails.company} {cabDetails.cabNumber}, {cabDetails.driverName}) sent to <strong>Maa, Ananya & Rhea</strong> via WhatsApp and SMS.
              </p>
              <div className="flex items-center justify-between text-[11px] text-[#8B7A82] pt-1">
                <span>Broadcasting live GPS updates</span>
                <button
                  onClick={() => setCurrentMode('cab_arrived')}
                  className="font-bold text-[#4A2E3A] underline"
                >
                  I have reached safely
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ===================== 6. ARRIVED CONFIRMATION (CELEBRATORY & GENTLE) ===================== */}
      {(currentMode === 'walk_arrived' || currentMode === 'cab_arrived') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-5 px-4"
        >
          {/* Gentle Sage Checkmark Ring */}
          <div className="w-20 h-20 rounded-full bg-[#EBF3EA] border-4 border-[#FFFFFF] flex items-center justify-center shadow-lg">
            <Check className="w-10 h-10 text-[#3F5D41] stroke-[2.5px]" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-[26px] font-bold text-[#4A2E3A] font-heading tracking-tight">
              You've Arrived Safely!
            </h2>
            <p className="text-[13px] text-[#8B7A82] max-w-xs mx-auto">
              Journey complete at {destinationQuery}. Companion mode closed and live sharing safely concluded.
            </p>
          </div>

          <button
            onClick={() => setCurrentMode('select_path')}
            className="py-3.5 px-8 rounded-2xl bg-[#E89C8B] text-white font-bold text-[14px] shadow-md hover:bg-[#DC8876] transition-colors"
          >
            Done • Back to Home
          </button>
        </motion.div>
      )}
    </div>
  );
};
