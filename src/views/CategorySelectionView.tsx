import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Coffee, 
  Store, 
  Trees, 
  ChevronRight, 
  MapPin, 
  Sparkles,
  ShieldCheck, 
  Compass, 
  ArrowLeft 
} from 'lucide-react';
import { PlaceCategory, DelhiNeighborhood, DelhiPlace } from '../types';
import { DELHI_PLACES } from '../data/delhiData';
import { NearbySpotSuggestions } from '../components/NearbySpotSuggestions';

interface CategorySelectionViewProps {
  selectedArea: DelhiNeighborhood;
  onChangeArea: () => void;
  onSelectCategory: (category: PlaceCategory) => void;
  onQuickViewPlace?: () => void;
}

export const CategorySelectionView: React.FC<CategorySelectionViewProps> = ({
  selectedArea,
  onChangeArea,
  onSelectCategory,
  onQuickViewPlace
}) => {
  // Count spots per category for current area
  const countCategory = (cat: PlaceCategory) => {
    return DELHI_PLACES.filter(
      (p) => p.category === cat && (p.neighborhood === selectedArea || p.area.includes('Delhi'))
    ).length;
  };

  const categories = [
    {
      id: 'shopping' as PlaceCategory,
      title: 'Shopping Markets',
      subtitle: 'Thrift lanes, export surplus, silver & ethnic couture',
      teaser: `${countCategory('shopping')} curated markets · Safe daylight lanes & bargaining tips`,
      cardBg: 'bg-[#FBE4E8]',
      iconBg: 'bg-[#FFFFFF]',
      iconColor: 'text-[#E89C8B]',
      icon: ShoppingBag,
      tag: 'Best for thrifting'
    },
    {
      id: 'cafe' as PlaceCategory,
      title: 'Aesthetic Cafes',
      subtitle: 'Cozy book nooks, garden patios & specialty roasters',
      teaser: `${countCategory('cafe')} aesthetic spots near ${selectedArea} · Solo & work friendly`,
      cardBg: 'bg-[#FBE4E8]',
      iconBg: 'bg-[#FFFFFF]',
      iconColor: 'text-[#E89C8B]',
      icon: Coffee,
      tag: 'Work & chill vibes'
    },
    {
      id: 'mall' as PlaceCategory,
      title: 'Verified Malls',
      subtitle: 'Sephora, Zara, high-street luxury & sheltered cab bays',
      teaser: `${countCategory('mall')} premium malls · Verified indoor app-cab pickup zones`,
      cardBg: 'bg-[#FBE4E8]',
      iconBg: 'bg-[#FFFFFF]',
      iconColor: 'text-[#E89C8B]',
      icon: Store,
      tag: 'Safe indoor lounges'
    },
    {
      id: 'outing' as PlaceCategory,
      title: 'Outings & Sightseeing',
      subtitle: 'UNESCO gardens, monuments, lake walks & royal tombs',
      teaser: `${countCategory('outing')} places to visit near ${selectedArea} · Gardens, monuments, heritage`,
      cardBg: 'bg-[#FBE4E8]',
      iconBg: 'bg-[#FFFFFF]',
      iconColor: 'text-[#E89C8B]',
      icon: Trees,
      tag: 'Golden hour & picnics'
    }
  ];

  return (
    <div className="space-y-6 px-4 pb-28 pt-3">
      {/* Top Location Bar with quick Change action */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-[#FFFFFF] shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#FBE4E8] flex items-center justify-center shrink-0">
            <MapPin className="w-4.5 h-4.5 text-[#E89C8B]" />
          </div>
          <div className="truncate">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7A82] block">
              Current Zone
            </span>
            <span className="text-[16px] font-bold text-[#4A2E3A] truncate block">
              {selectedArea}
            </span>
          </div>
        </div>

        <button
          id="change-area-btn"
          onClick={onChangeArea}
          className="px-3.5 py-1.5 rounded-full bg-[#FBE4E8]/60 text-[12px] font-bold text-[#4A2E3A] hover:bg-[#FBE4E8] transition-colors shadow-2xs"
        >
          Change
        </button>
      </div>

      {/* Immediate Localized Suggestions ("Near [Location Name]") */}
      {onQuickViewPlace && (
        <NearbySpotSuggestions
          selectedArea={selectedArea}
          onSelectPlace={onQuickViewPlace}
        />
      )}

      {/* Screen Title: Headline alone, no subtitle text */}
      <div className="pt-1">
        <h2 className="text-[22px] font-bold text-[#4A2E3A] font-heading tracking-tight">
          Explore by Category
        </h2>
      </div>

      {/* 4 Elegant Option Cards (All unified in Blush Pink, No divider lines) */}
      <div className="space-y-3.5">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.id}
              id={`select-category-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-5 rounded-3xl ${cat.cardBg} text-left transition-all duration-200 active:scale-[0.98] shadow-xs hover:shadow-md group block`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${cat.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#4A2E3A] font-heading tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-[12px] text-[#4A2E3A]/80 font-medium mt-0.5 line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#FFFFFF]/90 flex items-center justify-center shrink-0 mt-1">
                  <ChevronRight className="w-4 h-4 text-[#4A2E3A]" />
                </div>
              </div>

              {/* Teaser info pill */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-[#4A2E3A]">
                <span className="truncate max-w-[230px] opacity-90">
                  {cat.teaser}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/80 font-bold shrink-0 ml-2">
                  {cat.tag}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
