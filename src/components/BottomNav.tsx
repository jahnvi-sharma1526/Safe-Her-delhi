import React from 'react';
import { Home, Compass, Calendar, Heart, ShieldCheck } from 'lucide-react';

export type ActiveTab = 'home' | 'categories' | 'explore' | 'planner' | 'favorites' | 'companion' | 'profile';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  isCompanionActive?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  favoritesCount,
  isCompanionActive = false
}) => {
  return (
    <nav
      id="bottom-navigation-dock"
      className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-[#FFFFFF]/95 backdrop-blur-md px-3 py-2 safe-area-bottom shadow-[0_-8px_30px_rgba(74,46,58,0.06)]"
    >
      <div className="flex items-end justify-between relative pb-1">
        {/* Home (Location Pick) */}
        <button
          id="nav-tab-home"
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-transform duration-200 active:scale-95 min-w-0 ${
            activeTab === 'home' ? 'text-[#4A2E3A]' : 'text-[#8B7A82]'
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 transition-colors ${activeTab === 'home' ? 'stroke-[2.2px] text-[#4A2E3A]' : 'stroke-[1.6px]'}`} />
          <span className={`text-[10.5px] sm:text-[11px] mt-1 font-semibold whitespace-nowrap ${activeTab === 'home' ? 'text-[#4A2E3A]' : 'text-[#8B7A82]'}`}>
            Home
          </span>
        </button>

        {/* Categories / Explore */}
        <button
          id="nav-tab-explore"
          onClick={() => onChangeTab('categories')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-transform duration-200 active:scale-95 min-w-0 ${
            activeTab === 'categories' || activeTab === 'explore' ? 'text-[#4A2E3A]' : 'text-[#8B7A82]'
          }`}
          aria-label="Explore Categories"
        >
          <Compass className={`w-5 h-5 transition-colors ${activeTab === 'categories' || activeTab === 'explore' ? 'stroke-[2.2px] text-[#4A2E3A]' : 'stroke-[1.6px]'}`} />
          <span className={`text-[10.5px] sm:text-[11px] mt-1 font-semibold whitespace-nowrap ${activeTab === 'categories' || activeTab === 'explore' ? 'text-[#4A2E3A]' : 'text-[#8B7A82]'}`}>
            Explore
          </span>
        </button>

        {/* Central Raised Companion Floating Button & Single-Line Text Label */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-7 min-w-0 px-1">
          <button
            id="nav-tab-come-with-me"
            onClick={() => onChangeTab('companion')}
            className={`w-15 h-15 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(232,156,139,0.4)] border-4 border-[#FDF7F4] transition-all duration-200 active:scale-90 ${
              activeTab === 'companion' || isCompanionActive
                ? 'bg-[#E89C8B] text-[#FFFFFF] ring-2 ring-[#E89C8B]'
                : 'bg-[#FBE4E8] text-[#4A2E3A] hover:bg-[#E89C8B] hover:text-[#FFFFFF]'
            }`}
            aria-label="Companion Mode"
          >
            <ShieldCheck className="w-7 h-7 stroke-[2.2px]" />
          </button>
          <span className={`text-[10px] sm:text-[11px] mt-1 font-bold whitespace-nowrap tracking-tight transition-colors ${activeTab === 'companion' || isCompanionActive ? 'text-[#4A2E3A]' : 'text-[#8B7A82]'}`}>
            Companion
          </span>
        </div>

        {/* Girls Day Planner */}
        <button
          id="nav-tab-planner"
          onClick={() => onChangeTab('planner')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-transform duration-200 active:scale-95 relative min-w-0 ${
            activeTab === 'planner' ? 'text-[#4A2E3A]' : 'text-[#8B7A82]'
          }`}
          aria-label="Girls Day Plan"
        >
          <Calendar className={`w-5 h-5 transition-colors ${activeTab === 'planner' ? 'stroke-[2.2px] text-[#4A2E3A]' : 'stroke-[1.6px]'}`} />
          <span className={`text-[10.5px] sm:text-[11px] mt-1 font-semibold whitespace-nowrap ${activeTab === 'planner' ? 'text-[#4A2E3A]' : 'text-[#8B7A82]'}`}>
            Plan Day
          </span>
        </button>

        {/* Saved Wishlist */}
        <button
          id="nav-tab-favorites"
          onClick={() => onChangeTab('favorites')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-transform duration-200 active:scale-95 relative min-w-0 ${
            activeTab === 'favorites' ? 'text-[#4A2E3A]' : 'text-[#8B7A82]'
          }`}
          aria-label="Saved Places"
        >
          <Heart className={`w-5 h-5 transition-colors ${activeTab === 'favorites' ? 'stroke-[2.2px] text-[#4A2E3A]' : 'stroke-[1.6px]'}`} />
          <span className={`text-[10.5px] sm:text-[11px] mt-1 font-semibold whitespace-nowrap ${activeTab === 'favorites' ? 'text-[#4A2E3A]' : 'text-[#8B7A82]'}`}>
            Saved
          </span>
          {favoritesCount > 0 && (
            <span className="absolute top-0 right-3 px-1.5 py-0.2 rounded-full bg-[#FBE4E8] text-[#4A2E3A] text-[9px] font-bold">
              {favoritesCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
