import React, { useState } from 'react';
import { Heart, Sparkles, ShoppingBag, Coffee, ArrowRight } from 'lucide-react';
import { DelhiPlace } from '../types';
import { PlaceCard } from '../components/PlaceCard';

interface FavoritesViewProps {
  places: DelhiPlace[];
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
  onSelectPlace: (place: DelhiPlace) => void;
  onExploreMore: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  places,
  favorites,
  onToggleFavorite,
  onSelectPlace,
  onExploreMore
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'shopping' | 'cafe' | 'mall'>('all');

  const favoritePlaces = places.filter((p) => favorites.includes(p.id));
  const filteredFavorites = favoritePlaces.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="space-y-5 px-4 pb-28 pt-2">
      {/* Header with Headline alone, no subtitle text */}
      <div>
        <h1 className="text-[26px] font-bold text-[#4A2E3A] font-heading tracking-tight">
          Saved Places
        </h1>
      </div>

      {/* Category Pills with Consistent Blush Pink Color System */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Saved' },
          { id: 'shopping', label: 'Markets' },
          { id: 'cafe', label: 'Cafes' },
          { id: 'mall', label: 'Malls' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-[#F7B8C4] text-[#4A2E3A] font-bold shadow-2xs'
                : 'bg-[#FBE4E8]/60 text-[#4A2E3A] hover:bg-[#FBE4E8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List / Grid */}
      {filteredFavorites.length === 0 ? (
        <div className="bg-[#FFFFFF] rounded-3xl p-8 text-center space-y-4 my-8 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#FBE4E8] flex items-center justify-center mx-auto text-[#E89C8B]">
            <Heart className="w-6 h-6 stroke-[1.5px]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-[16px] font-semibold text-[#4A2E3A]">
              No saved spots in this view
            </h3>
            <p className="text-[13px] text-[#8B7A82] max-w-xs mx-auto">
              Tap the heart icon on any market, cafe, or mall to save it for your next Delhi outing.
            </p>
          </div>
          <button
            onClick={onExploreMore}
            className="px-5 py-2.5 rounded-2xl bg-[#E89C8B] text-[#FFFFFF] text-[13px] font-semibold hover:bg-[#DC8876] transition-colors shadow-xs"
          >
            Explore Spots
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredFavorites.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelectPlace={onSelectPlace}
              layoutStyle="grid"
            />
          ))}
        </div>
      )}
    </div>
  );
};
