import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Share2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Train, 
  PhoneCall, 
  BatteryMedium, 
  Check, 
  Navigation,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SafeRoute, DelhiPlace } from '../types';

interface SafeReturnViewProps {
  activeRoute?: SafeRoute | null;
  onOpenFakeCall: () => void;
  onEndJourney: () => void;
}

export const SafeReturnView: React.FC<SafeReturnViewProps> = ({
  activeRoute,
  onOpenFakeCall,
  onEndJourney
}) => {
  const [journeyStarted, setJourneyStarted] = useState(true);
  const [progress, setProgress] = useState(38);
  const [shareLiveLocation, setShareLiveLocation] = useState(true);
  const [hasArrived, setHasArrived] = useState(false);
  const [etaRemaining, setEtaRemaining] = useState(activeRoute?.etaMinutes || 14);

  // Gentle progress increment simulation for demo
  useEffect(() => {
    if (!journeyStarted || hasArrived) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setHasArrived(true);
          return 100;
        }
        return prev + 2;
      });
      setEtaRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [journeyStarted, hasArrived]);

  const handleSimulateArrival = () => {
    setProgress(100);
    setHasArrived(true);
  };

  return (
    <div className="space-y-6 px-4 pb-28 pt-2">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7D82]">
          Safe Return Home
        </span>
        <h1 className="text-[26px] font-bold text-[#3A2E33] font-display tracking-tight mt-0.5">
          {hasArrived ? 'You have arrived safely' : 'Live Journey Companion'}
        </h1>
        <p className="text-[13px] text-[#8B7D82] mt-0.5">
          {hasArrived
            ? 'Your trusted contacts have been notified of your safe arrival.'
            : 'Calm, automated telemetry sharing your progress with loved ones.'}
        </p>
      </div>

      {/* Main Calm Status Card */}
      <div className="bg-[#FFFDFB] rounded-3xl border border-[#3A2E33]/6 p-5 sm:p-6 space-y-5 shadow-[0_4px_24px_rgba(58,46,51,0.03)]">
        {!hasArrived ? (
          <>
            {/* ETA & Destination Summary */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#8B7D82] uppercase tracking-wider">
                  Destination
                </span>
                <h3 className="text-[19px] font-bold text-[#3A2E33] tracking-tight mt-0.5">
                  {activeRoute?.to || 'Santushti Complex, Chanakyapuri'}
                </h3>
                <p className="text-[12px] text-[#8B7D82] mt-0.5">
                  Origin: {activeRoute?.from || 'Sarojini Nagar Gate 1'}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[26px] font-bold text-[#3A2E33] font-display">
                  {etaRemaining} min
                </span>
                <span className="block text-[11px] text-[#8B7D82]">
                  Estimated Arrival
                </span>
              </div>
            </div>

            {/* Calm Progress Bar Along The Route */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[12px] font-medium text-[#8B7D82]">
                <span>Progress: {progress}%</span>
                <span>Pink Line Corridor</span>
              </div>

              <div className="w-full h-3 rounded-full bg-[#FAF6F1] overflow-hidden border border-[#3A2E33]/5">
                <motion.div
                  className="h-full bg-[#E08E79] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Single "Share Live Location" Toggle */}
            <div className="p-3.5 rounded-2xl bg-[#FAF6F1] border border-[#3A2E33]/6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${shareLiveLocation ? 'bg-[#C6D3C3]/40' : 'bg-[#FAF6F1]'}`}>
                  <Share2 className="w-4 h-4 text-[#2C3E2D]" />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-[#3A2E33]">
                    Share Live Location
                  </h4>
                  <p className="text-[11px] text-[#8B7D82]">
                    Syncing in background with 2 emergency contacts
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                id="share-live-toggle"
                onClick={() => setShareLiveLocation(!shareLiveLocation)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 relative ${
                  shareLiveLocation ? 'bg-[#C6D3C3]' : 'bg-[#8B7D82]/30'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-[#FFFDFB] shadow-xs transition-transform ${
                    shareLiveLocation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Live Transit Checkpoint Pill */}
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#C6D3C3]/15 border border-[#C6D3C3]/40 text-[12px] text-[#2C3E2D]">
              <ShieldCheck className="w-4 h-4 text-[#2C3E2D] shrink-0" />
              <span>
                Current Zone: <strong>Durgabai Deshmukh South Campus</strong> (Well-lit, 24/7 CCTV)
              </span>
            </div>

            {/* Helper action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                id="fake-call-trigger-btn"
                onClick={onOpenFakeCall}
                className="py-2.5 px-3 rounded-xl bg-[#FAF6F1] hover:bg-[#F3D9DE]/40 border border-[#3A2E33]/8 text-[12px] font-semibold text-[#3A2E33] flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E08E79]" />
                <span>Simulate Call</span>
              </button>

              <button
                onClick={handleSimulateArrival}
                className="py-2.5 px-3 rounded-xl bg-[#FAF6F1] hover:bg-[#C6D3C3]/30 border border-[#3A2E33]/8 text-[12px] font-semibold text-[#3A2E33] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Check className="w-3.5 h-3.5 text-[#2C3E2D]" />
                <span>Mark Arrived</span>
              </button>
            </div>
          </>
        ) : (
          /* Gentle Checkmark Arrival Confirmation */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 text-center space-y-4"
          >
            <div className="w-20 h-20 rounded-full bg-[#C6D3C3]/30 border-2 border-[#C6D3C3] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 text-[#2C3E2D]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-[22px] font-bold text-[#3A2E33] font-display">
                Arrived at Destination
              </h3>
              <p className="text-[13px] text-[#8B7D82] max-w-xs mx-auto">
                Automatic SMS check-in sent to Maa and Ananya. Live tracking session completed.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={onEndJourney}
                className="py-3 px-8 rounded-2xl bg-[#3A2E33] text-[#FFFDFB] font-semibold text-[14px] shadow-sm hover:bg-[#544349] transition-colors"
              >
                Back to Explorer
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Safety Protocol Note */}
      <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#3A2E33]/6 text-[12px] text-[#8B7D82] space-y-1 leading-relaxed">
        <p className="font-semibold text-[#3A2E33]">
          Delhi Metro & Pink Booth Hotline
        </p>
        <p>
          If you ever feel uneasy at any station, press the Passenger Emergency Alarm (PEA) inside the train coach or approach the station controller booth.
        </p>
      </div>
    </div>
  );
};
