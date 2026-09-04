import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, PhoneOff, Mic, Volume2, Shield, User, Clock, MessageSquareQuote, Check } from 'lucide-react';

interface FakeCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FakeCallModal: React.FC<FakeCallModalProps> = ({ isOpen, onClose }) => {
  const [callerName, setCallerName] = useState('Mom');
  const [selectedScriptKey, setSelectedScriptKey] = useState<'checkin' | 'pickup' | 'order'>('pickup');
  const [callState, setCallState] = useState<'scheduler' | 'incoming' | 'connected'>('incoming');
  const [callDuration, setCallDuration] = useState(0);
  const [delaySeconds, setDelaySeconds] = useState(0);
  const [countdown, setCountdown] = useState(0);

  const scripts = {
    pickup: {
      title: 'Come pick me up',
      text: '"Haan beta, I am waiting in the car right outside the main gate with the hazard lights on. Come out right now, I see the crowd."'
    },
    checkin: {
      title: 'Just checking in',
      text: '"Beta, Papa and I were just checking your live location. Keep the phone in hand and tell me when you reach the metro exit."'
    },
    order: {
      title: 'Security / Concierge',
      text: '"Hello ma\'am, your verified companion cab is parked at Gate 1. Security has verified the plate number."'
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [callState]);

  useEffect(() => {
    if (isOpen) {
      setCallState('incoming');
      setCallDuration(0);
    }
  }, [isOpen]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAccept = () => {
    setCallState('connected');
  };

  const handleDecline = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#1C1619] text-[#FFFDFB] flex flex-col justify-between p-6 sm:p-8"
      >
        {/* Top bar with subtle discretion exit */}
        <div className="flex justify-between items-center text-xs opacity-60">
          <span>SafeHer Discreet Companion Call</span>
          <button 
            onClick={onClose} 
            className="px-2.5 py-1 rounded-full bg-[#FFFDFB]/10 hover:bg-[#FFFDFB]/20 text-[11px] font-semibold"
          >
            Exit
          </button>
        </div>

        {/* Center caller card */}
        <div className="flex flex-col items-center justify-center my-auto space-y-4 max-w-sm mx-auto w-full">
          <div className="w-24 h-24 rounded-full bg-[#FAF6F1]/15 flex items-center justify-center border-2 border-[#FFFDFB]/20 shadow-2xl">
            <User className="w-12 h-12 text-[#FFFDFB]" />
          </div>

          <div className="text-center">
            <h2 className="text-[28px] font-bold tracking-tight">{callerName}</h2>
            <p className="text-[14px] text-[#FAF6F1]/70 mt-1">
              {callState === 'incoming' ? 'Incoming Mobile Call...' : `In Call • ${formatSeconds(callDuration)}`}
            </p>
          </div>

          {callState === 'connected' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#FAF6F1]/10 rounded-2xl p-4 max-w-xs text-center border border-[#FFFDFB]/10 space-y-2"
            >
              <span className="text-[10px] uppercase font-bold text-[#D4AF7A] tracking-wider block">
                Script in ear
              </span>
              <p className="text-[13px] text-[#FAF6F1]/95 leading-relaxed italic">
                {scripts[selectedScriptKey].text}
              </p>
            </motion.div>
          )}

          {callState === 'incoming' && (
            <div className="bg-[#FAF6F1]/5 rounded-2xl p-3.5 w-full border border-[#FFFDFB]/10 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#FAF6F1]/60 tracking-wider block text-center">
                Choose Script Preview
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {(['pickup', 'checkin', 'order'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedScriptKey(key)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all ${
                      selectedScriptKey === key
                        ? 'bg-[#E89C8B] text-white shadow-xs'
                        : 'bg-[#FFFDFB]/10 text-[#FFFDFB]/70'
                    }`}
                  >
                    {scripts[key].title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className="space-y-6 max-w-xs mx-auto w-full">
          {callState === 'incoming' ? (
            <div className="flex items-center justify-around">
              {/* Decline */}
              <button
                onClick={handleDecline}
                className="w-16 h-16 rounded-full bg-[#E89C8B] flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform"
                aria-label="Decline Call"
              >
                <PhoneOff className="w-7 h-7 text-[#FFFDFB]" />
              </button>

              {/* Accept */}
              <button
                onClick={handleAccept}
                className="w-16 h-16 rounded-full bg-[#9BB79C] flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform animate-pulse"
                aria-label="Accept Call"
              >
                <Phone className="w-7 h-7 text-[#FFFFFF]" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="grid grid-cols-3 gap-6 text-center text-xs">
                <div className="flex flex-col items-center gap-1 opacity-70">
                  <div className="w-12 h-12 rounded-full bg-[#FFFDFB]/10 flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span>Mute</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-70">
                  <div className="w-12 h-12 rounded-full bg-[#FFFDFB]/10 flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <span>Speaker</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-70">
                  <div className="w-12 h-12 rounded-full bg-[#FFFDFB]/10 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span>Secured</span>
                </div>
              </div>

              <button
                onClick={handleDecline}
                className="w-16 h-16 rounded-full bg-[#E89C8B] flex items-center justify-center shadow-lg active:scale-95 transition-transform mt-4"
              >
                <PhoneOff className="w-7 h-7 text-[#FFFDFB]" />
              </button>
            </div>
          )}

          {/* Caller quick switcher */}
          {callState === 'incoming' && (
            <div className="flex justify-center gap-1.5 pt-2">
              {['Mom', 'Papa', 'Rhea', 'BluSmart Driver'].map((name) => (
                <button
                  key={name}
                  onClick={() => setCallerName(name)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                    callerName === name
                      ? 'bg-[#FFFDFB] text-[#1C1619]'
                      : 'bg-[#FFFDFB]/10 text-[#FFFDFB]/70'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
