import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Send, 
  Calendar, 
  ChevronRight, 
  Heart, 
  Star, 
  Train, 
  MapPin, 
  Compass, 
  MessageSquare,
  PlusCircle,
  Check
} from 'lucide-react';
import { DelhiPlace, PlaceCategory } from '../types';
import { DELHI_PLACES } from '../data/delhiData';
import { SafetyScoreBadge } from './SafetyScoreBadge';

interface AIChatPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (place: DelhiPlace) => void;
  onAddPlanToItinerary?: (places: DelhiPlace[]) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedPlaces?: DelhiPlace[];
  planTitle?: string;
  totalCostEst?: string;
}

export const AIChatPlanner: React.FC<AIChatPlannerProps> = ({
  isOpen,
  onClose,
  onSelectPlace,
  onAddPlanToItinerary
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hey babe! Tell me what kind of day or vibe you're craving — e.g. cozy coffee + thrifting, a scenic heritage walk, or family-friendly brunch — and I'll map out a dreamy, safe sequence for you."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [planAddedSuccess, setPlanAddedSuccess] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '☕ Cafe + shopping', query: 'I want to go to a cute cafe and then do some thrift shopping nearby' },
    { label: '🌿 Chill outing', query: 'Looking for a peaceful green outing and a lakeside walk' },
    { label: '👨‍👩‍👧 Family-friendly day', query: 'Family-friendly spots with good parking, cafe and easy walking' },
    { label: '✨ Something new', query: 'Surprise me with something aesthetic and safe for golden hour' }
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Intelligent mood matcher heuristic with rich place suggestions
  const generateAssistantResponse = (userText: string) => {
    const text = userText.toLowerCase();

    if (text.includes('cafe') && (text.includes('shop') || text.includes('thrift'))) {
      const places = [
        DELHI_PLACES.find(p => p.id === 'diggin-chanakyapuri') || DELHI_PLACES[0],
        DELHI_PLACES.find(p => p.id === 'sarojini-nagar') || DELHI_PLACES[1]
      ];
      return {
        text: "Here is a dreamy afternoon plan for you: Start with a relaxed lunch at Diggin, then take a quick 7-min safe cab over to Sarojini for export-surplus treasures!",
        suggestedPlaces: places,
        planTitle: "Aesthetic Lunch & Thrifting Spree",
        totalCostEst: "₹950 for two"
      };
    } else if (text.includes('family') || text.includes('bookstore') || text.includes('family-friendly')) {
      const places = [
        DELHI_PLACES.find(p => p.id === 'khan-market') || DELHI_PLACES[2],
        DELHI_PLACES.find(p => p.id === 'lodhi-garden') || DELHI_PLACES[3]
      ];
      return {
        text: "For a relaxed family-friendly outing, Khan Market offers great bookstores (Faqir Chand & Bahrisons), followed by a calm golden hour stroll through royal tombs at Lodhi Garden.",
        suggestedPlaces: places,
        planTitle: "Khan Market Books & Lodhi Garden Stroll",
        totalCostEst: "₹1,200 for two"
      };
    } else if (text.includes('outing') || text.includes('chill') || text.includes('heritage') || text.includes('green')) {
      const places = [
        DELHI_PLACES.find(p => p.id === 'sunder-nursery') || DELHI_PLACES[4],
        DELHI_PLACES.find(p => p.id === 'humayuns-tomb') || DELHI_PLACES[5]
      ];
      return {
        text: "Here is a serene nature & heritage loop: Sunder Nursery for garden picnics & Fabcafe by the lake, right next to the UNESCO Humayun's Tomb complex.",
        suggestedPlaces: places,
        planTitle: "Sunder Nursery Lakes & Mughal Heritage",
        totalCostEst: "₹450 for two"
      };
    } else if (text.includes('mall') || text.includes('luxury') || text.includes('sephora')) {
      const places = [
        DELHI_PLACES.find(p => p.id === 'select-citywalk') || DELHI_PLACES[0],
        DELHI_PLACES.find(p => p.id === 'delhi-art-gallery') || DELHI_PLACES[1]
      ];
      return {
        text: "How about an air-conditioned luxury day? Hit Select CITYWALK for Zara & Sephora, with fully sheltered indoor cab lounges for safe pickup.",
        suggestedPlaces: places,
        planTitle: "Select CITYWALK & Luxury Cafes",
        totalCostEst: "₹1,500 for two"
      };
    } else {
      // Default curated sequence
      const places = [
        DELHI_PLACES.find(p => p.id === 'blue-tokai-hkv') || DELHI_PLACES[0],
        DELHI_PLACES.find(p => p.id === 'hauz-khas-fort') || DELHI_PLACES[3]
      ];
      return {
        text: "I mapped out this South Delhi favorite: Artisanal pour-overs at Blue Tokai, followed by sunset views over the historic Hauz Khas lake reservoir!",
        suggestedPlaces: places,
        planTitle: "Hauz Khas Coffee & Sunset Walk",
        totalCostEst: "₹800 for two"
      };
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAssistantResponse(query);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: reply.text,
        suggestedPlaces: reply.suggestedPlaces,
        planTitle: reply.planTitle,
        totalCostEst: reply.totalCostEst
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 700);
  };

  const handleAddToPlanner = (places: DelhiPlace[], planTitle?: string) => {
    if (onAddPlanToItinerary) {
      onAddPlanToItinerary(places);
    }
    setPlanAddedSuccess(planTitle || 'Custom Plan');
    setTimeout(() => {
      setPlanAddedSuccess(null);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#4A2E3A]/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-[#FDF7F4] rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Chat Header without divider line */}
          <div className="px-5 pt-5 pb-3 bg-[#FFFFFF] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FBE4E8] flex items-center justify-center shadow-2xs">
                <Sparkles className="w-5 h-5 text-[#E89C8B]" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#4A2E3A] font-heading tracking-tight">
                  SafeHer Bestie AI
                </h3>
                <span className="text-[11px] font-semibold text-[#8B7A82]">
                  Mood-Based Day Curator
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8.5 h-8.5 rounded-full bg-[#FDF7F4] flex items-center justify-center text-[#4A2E3A] hover:bg-[#FBE4E8] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Success Banner if plan converted */}
          {planAddedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-4 mt-2 p-3 rounded-2xl bg-[#EBF3EA] text-[#3F5D41] text-[12px] font-bold flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Added "{planAddedSuccess}" to your Girls' Day Planner!</span>
            </motion.div>
          )}

          {/* Chat Messages Feed without divider lines */}
          <div className="p-4 overflow-y-auto space-y-4 flex-1 bg-[#FDF7F4] no-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] p-4 rounded-3xl text-[13.5px] leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#E89C8B] text-white rounded-br-xs font-medium'
                      : 'bg-[#FFFFFF] text-[#4A2E3A] rounded-bl-xs font-normal'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Inline Sequence of Suggested Place Cards */}
                {msg.suggestedPlaces && msg.suggestedPlaces.length > 0 && (
                  <div className="w-full max-w-[95%] mt-3 space-y-2.5">
                    {msg.planTitle && (
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82]">
                          Suggested Plan • {msg.totalCostEst}
                        </span>
                      </div>
                    )}

                    <div className="space-y-2">
                      {msg.suggestedPlaces.map((place, idx) => (
                        <motion.div
                          key={place.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            onSelectPlace(place);
                            onClose();
                          }}
                          className="p-3 rounded-2xl bg-[#FFFFFF] shadow-2xs hover:shadow-xs flex items-center justify-between gap-3 cursor-pointer group transition-all"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#FDF7F4]">
                              <img
                                src={place.thumbnail}
                                alt={place.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-md bg-[#FBE4E8] text-[#4A2E3A]">
                                  Stop {idx + 1}
                                </span>
                                <span className="text-[11px] font-semibold text-[#8B7A82]">
                                  {place.neighborhood}
                                </span>
                              </div>
                              <h5 className="text-[13.5px] font-bold text-[#4A2E3A] truncate mt-0.5">
                                {place.name}
                              </h5>
                              <p className="text-[11px] text-[#8B7A82] truncate">
                                {place.priceRange} • {place.metroStation}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <SafetyScoreBadge score={place.safetyScore} size="sm" showLabel={false} />
                            <ChevronRight className="w-4 h-4 text-[#8B7A82] group-hover:text-[#E89C8B]" />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick "Add to Day Planner" Button */}
                    <button
                      onClick={() => handleAddToPlanner(msg.suggestedPlaces!, msg.planTitle)}
                      className="w-full py-2.5 px-4 rounded-2xl bg-[#FBE4E8] hover:bg-[#F8D2D9] text-[#4A2E3A] font-bold text-[12px] flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-98"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#E89C8B]" />
                      <span>Add to Girls' Day Planner</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#FFFFFF] w-20 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#E89C8B] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#E89C8B] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#E89C8B] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips & Input Dock without divider lines */}
          <div className="p-4 bg-[#FFFFFF] space-y-3 shadow-lg">
            {/* Quick Mood Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p.query)}
                  className="px-3 py-1.5 rounded-full bg-[#FDF7F4] hover:bg-[#FBE4E8] text-[#4A2E3A] text-[11.5px] font-bold whitespace-nowrap transition-colors shrink-0"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask e.g. 'cozy brunch then vintage market'..."
                className="flex-1 px-4 py-3 rounded-2xl bg-[#FDF7F4] text-[13.5px] font-semibold text-[#4A2E3A] placeholder:text-[#8B7A82]/70 outline-none focus:bg-[#FFFFFF]"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="w-11 h-11 rounded-2xl bg-[#E89C8B] disabled:opacity-40 text-white flex items-center justify-center shadow-xs active:scale-95 transition-all shrink-0"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
