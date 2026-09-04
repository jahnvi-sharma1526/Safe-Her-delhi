import React from 'react';
import { MapPin, Search, Sparkles, User, ShieldCheck } from 'lucide-react';
import { DelhiNeighborhood } from '../types';

interface NavbarProps {
  currentArea: DelhiNeighborhood;
  onSelectArea: (area: DelhiNeighborhood) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentArea,
  onSelectArea,
  onOpenSearch,
  onOpenProfile
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FDF7F4]/95 backdrop-blur-md px-4 pt-3.5 pb-2.5">
      <div className="flex items-center justify-between gap-3">
        {/* App Branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FBE4E8] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#E89C8B]" />
          </div>
          <div>
            <h1 className="text-[16.5px] font-bold text-[#4A2E3A] font-heading tracking-tight leading-none">
              SafeHer <span className="text-[#E89C8B] font-semibold text-[14px]">Delhi</span>
            </h1>
            <span className="text-[10px] font-semibold text-[#8B7A82] tracking-wide block mt-0.5">
              Curated • Girly • Safe
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            id="global-search-trigger"
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#4A2E3A] hover:bg-[#FBE4E8]/60 transition-colors shadow-2xs"
            aria-label="Search spots"
          >
            <Search className="w-4 h-4 stroke-[2px]" />
          </button>

          {/* Profile / Emergency Contacts */}
          <button
            id="profile-trigger-btn"
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-full bg-[#E5DFF2]/80 flex items-center justify-center text-[#4A2E3A] hover:bg-[#E5DFF2] transition-colors shadow-2xs"
            aria-label="Profile and Emergency Contacts"
          >
            <User className="w-4 h-4 stroke-[2px]" />
          </button>
        </div>
      </div>
    </header>
  );
};
