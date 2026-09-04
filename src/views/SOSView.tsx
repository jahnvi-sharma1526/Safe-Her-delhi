import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Phone, 
  Share2, 
  ShieldCheck, 
  PhoneCall, 
  User, 
  Check, 
  Sparkles
} from 'lucide-react';
import { DEFAULT_EMERGENCY_CONTACTS } from '../data/delhiData';
import { EmergencyContact } from '../types';

interface SOSViewProps {
  onOpenFakeCall: () => void;
}

export const SOSView: React.FC<SOSViewProps> = ({ onOpenFakeCall }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [pressProgress, setPressProgress] = useState(0);
  const [isSosActivated, setIsSosActivated] = useState(false);
  const [liveLocationOn, setLiveLocationOn] = useState(true);
  const [contacts, setContacts] = useState<EmergencyContact[]>(DEFAULT_EMERGENCY_CONTACTS);

  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    if (isSosActivated) return;
    setIsPressing(true);
    setPressProgress(0);

    const startTime = Date.now();
    const duration = 2000; // 2 seconds hold to activate

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setPressProgress(pct);
    }, 50);

    pressTimerRef.current = setTimeout(() => {
      setIsSosActivated(true);
      setIsPressing(false);
      setPressProgress(100);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }, duration);
  };

  const handlePressEnd = () => {
    if (isSosActivated) return;
    setIsPressing(false);
    setPressProgress(0);
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const handleResetSos = () => {
    setIsSosActivated(false);
    setPressProgress(0);
  };

  return (
    <div className="space-y-6 px-4 pb-28 pt-3">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82]">
          SafeHer Quiet Sanctuary
        </span>
        <h1 className="text-[26px] font-bold text-[#4A2E3A] font-heading tracking-tight">
          Safety & Emergency Support
        </h1>
        <p className="text-[13px] text-[#8B7A82] max-w-xs mx-auto">
          Calm, discreet assistance. Hold for 2 seconds to notify trusted contacts and nearby Delhi Police Pink Booths.
        </p>
      </div>

      {/* Main Central Circular SOS Button (Soft lavender/rose, calm styling, radial progress ring) */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative flex items-center justify-center">
          {/* Progress Ring SVG */}
          <svg className="w-56 h-56 -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#E5DFF2"
              strokeWidth="6"
            />
            {/* Active progress stroke */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#E89C8B"
              strokeWidth="6"
              strokeDasharray={534}
              strokeDashoffset={534 - (534 * pressProgress) / 100}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
          </svg>

          {/* Center Button */}
          <button
            id="sos-hold-button"
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            className={`absolute w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-200 select-none shadow-[0_8px_30px_rgba(229,223,242,0.8)] border-4 border-[#FFFFFF] ${
              isSosActivated
                ? 'bg-[#9BB79C] text-[#FFFFFF]'
                : isPressing
                ? 'bg-[#E5DFF2] scale-95 text-[#4A2E3A]'
                : 'bg-[#FBE4E8] hover:bg-[#E5DFF2] text-[#4A2E3A]'
            }`}
          >
            {isSosActivated ? (
              <div className="text-center space-y-1">
                <Check className="w-10 h-10 mx-auto text-white" />
                <span className="text-[14px] font-bold block">Alert Sent</span>
                <span className="text-[10px] text-white/90 block">Circle Notified</span>
              </div>
            ) : (
              <div className="text-center space-y-1">
                <ShieldAlert className="w-9 h-9 mx-auto stroke-[1.8px] text-[#4A2E3A]" />
                <span className="text-[16px] font-bold tracking-tight block">
                  {isPressing ? 'Hold to Confirm...' : 'Hold SOS'}
                </span>
                <span className="text-[10px] text-[#8B7A82] uppercase tracking-wider block font-bold">
                  2 Seconds
                </span>
              </div>
            )}
          </button>
        </div>

        {isSosActivated && (
          <button
            onClick={handleResetSos}
            className="mt-3 text-[12px] font-semibold text-[#8B7A82] hover:text-[#4A2E3A] underline"
          >
            Cancel / Reset Alert
          </button>
        )}
      </div>

      {/* Live Location Telemetry */}
      <div className="p-4 rounded-3xl bg-[#FFFFFF] border border-[#E5DFF2] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#EBF3EA] flex items-center justify-center">
            <Share2 className="w-4 h-4 text-[#9BB79C]" />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#4A2E3A]">
              Live GPS Telemetry
            </h4>
            <p className="text-[11px] text-[#8B7A82]">
              Real-time location broadcast to emergency circle
            </p>
          </div>
        </div>

        <button
          onClick={() => setLiveLocationOn(!liveLocationOn)}
          className={`w-11 h-6 rounded-full transition-colors p-0.5 relative ${
            liveLocationOn ? 'bg-[#9BB79C]' : 'bg-[#8B7A82]/30'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-[#FFFFFF] shadow-xs transition-transform ${
              liveLocationOn ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Emergency Contacts Avatar Row */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DFF2] p-5 space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#8B7A82]">
            Emergency Circle (One-Tap Dial)
          </h3>
          <span className="text-[11px] text-[#4A2E3A] font-bold bg-[#E5DFF2]/70 px-2 py-0.5 rounded-full">
            4 Linked
          </span>
        </div>

        <div className="space-y-2.5">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2]/60"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FBE4E8] text-[#4A2E3A] font-bold text-[13px] flex items-center justify-center">
                  {c.initials}
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#4A2E3A] leading-snug">
                    {c.name}
                  </h4>
                  <p className="text-[11px] text-[#8B7A82]">
                    {c.relation} • {c.phone}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${c.phone}`}
                className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#E5DFF2] flex items-center justify-center text-[#4A2E3A] hover:bg-[#FBE4E8] transition-colors shadow-xs"
                aria-label={`Call ${c.name}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#E89C8B]" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Delhi Official Helplines */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5DFF2] p-5 space-y-3 shadow-xs">
        <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#8B7A82]">
          Delhi Official Emergency Services
        </h3>

        <div className="grid grid-cols-2 gap-2 text-[12px]">
          <a
            href="tel:1091"
            className="p-3 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] flex items-center justify-between hover:bg-[#FBE4E8]/40 transition-colors"
          >
            <div>
              <span className="font-bold text-[#4A2E3A] block">1091</span>
              <span className="text-[11px] text-[#8B7A82]">Women Helpline</span>
            </div>
            <Phone className="w-4 h-4 text-[#E89C8B]" />
          </a>

          <a
            href="tel:112"
            className="p-3 rounded-2xl bg-[#FDF7F4] border border-[#E5DFF2] flex items-center justify-between hover:bg-[#FBE4E8]/40 transition-colors"
          >
            <div>
              <span className="font-bold text-[#4A2E3A] block">112</span>
              <span className="text-[11px] text-[#8B7A82]">National Helpline</span>
            </div>
            <Phone className="w-4 h-4 text-[#E89C8B]" />
          </a>
        </div>

        {/* Discreet Fake Call Trigger */}
        <button
          id="discreet-fake-call-button"
          onClick={onOpenFakeCall}
          className="w-full mt-2 py-3.5 rounded-2xl bg-[#FBE4E8]/60 border border-[#FBE4E8] text-[13px] font-bold text-[#4A2E3A] hover:bg-[#FBE4E8] flex items-center justify-center gap-2 transition-colors"
        >
          <PhoneCall className="w-4 h-4 text-[#E89C8B]" />
          <span>Discreet Exit: Trigger Incoming Fake Call</span>
        </button>
      </div>
    </div>
  );
};
