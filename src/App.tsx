import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DELHI_PLACES, SAFE_ROUTES } from './data/delhiData';
import { DelhiPlace, DelhiNeighborhood, PlaceCategory, SafeRoute } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { SearchModal } from './components/SearchModal';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { FakeCallModal } from './components/FakeCallModal';
import { AIChatPlanner } from './components/AIChatPlanner';
import { LoadingScreen } from './components/LoadingScreen';
import { OnboardingFlow } from './components/OnboardingFlow';

import { HomeView } from './views/HomeView';
import { CategorySelectionView } from './views/CategorySelectionView';
import { CafeListView } from './views/CafeListView';
import { MarketListView } from './views/MarketListView';
import { MallListView } from './views/MallListView';
import { OutingListView } from './views/OutingListView';
import { SafeRouteView } from './views/SafeRouteView';
import { PlannerView } from './views/PlannerView';
import { CompanionView } from './views/CompanionView';
import { FavoritesView } from './views/FavoritesView';
import { ProfileView } from './views/ProfileView';

export default function App() {
  // App Lifecycle States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Navigation & Screen States
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<DelhiNeighborhood>('Hauz Khas');
  const [currentCategory, setCurrentCategory] = useState<PlaceCategory>('cafe');

  // Modals state
  const [selectedPlace, setSelectedPlace] = useState<DelhiPlace | null>(null);
  const [companionTargetPlace, setCompanionTargetPlace] = useState<DelhiPlace | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFakeCallOpen, setIsFakeCallOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Active Journey / Routes
  const [activeRoute, setActiveRoute] = useState<SafeRoute | null>(null);
  const [isViewingRoutes, setIsViewingRoutes] = useState(false);

  // Favorites state with defaults
  const [favorites, setFavorites] = useState<string[]>([
    'sarojini-nagar',
    'diggin-chanakyapuri',
    'khan-market',
    'lodhi-garden'
  ]);

  // Handle Loading Screen completion
  const handleLoadingFinished = () => {
    setIsLoading(false);
    try {
      const hasSeen = localStorage.getItem('safeher_has_seen_onboarding');
      if (!hasSeen) {
        setShowOnboarding(true);
      }
    } catch {
      // In case localStorage is restricted
      setShowOnboarding(false);
    }
  };

  // Handle Onboarding completion or skip
  const handleOnboardingComplete = () => {
    try {
      localStorage.setItem('safeher_has_seen_onboarding', 'true');
    } catch {
      // Ignore localStorage error
    }
    setShowOnboarding(false);
    setCurrentTab('home');
  };

  // Replay Onboarding from Profile
  const handleReplayOnboarding = () => {
    setShowOnboarding(true);
  };

  const handleToggleFavorite = (placeId: string) => {
    setFavorites((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]
    );
  };

  // When area is picked on Step 1 (Home)
  const handleSelectArea = (neighborhood: DelhiNeighborhood) => {
    setSelectedNeighborhood(neighborhood);
    setCurrentTab('categories');
  };

  // When category is picked on Step 2 (Categories)
  const handleSelectCategory = (category: PlaceCategory) => {
    setCurrentCategory(category);
    setCurrentTab('explore');
  };

  // Start Companion Mode from Place Detail modal
  const handleStartRoute = (place: DelhiPlace) => {
    setCompanionTargetPlace(place);
    setCurrentTab('companion');
  };

  const handleStartJourneyFromRoute = (route: SafeRoute) => {
    setActiveRoute(route);
    setCurrentTab('companion');
  };

  return (
    <div className="min-h-screen bg-[#FDF7F4] text-[#4A2E3A] flex justify-center selection:bg-[#FBE4E8] selection:text-[#4A2E3A]">
      {/* 1. Cold Start Loading Screen with Animated Wordmark */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            onFinished={handleLoadingFinished}
            minDurationMs={2000}
          />
        )}
      </AnimatePresence>

      {/* 2. First-Time Onboarding Flow */}
      <AnimatePresence>
        {!isLoading && showOnboarding && (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

      {/* 3. Main App Container */}
      {!isLoading && !showOnboarding && (
        <div className="w-full max-w-md min-h-screen bg-[#FDF7F4] flex flex-col relative shadow-[0_0_50px_rgba(74,46,58,0.06)] border-x border-[#E5DFF2]">
          
          {/* Top Navbar */}
          <Navbar
            currentArea={selectedNeighborhood}
            onSelectArea={handleSelectArea}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenProfile={() => setCurrentTab('profile')}
          />

          {/* Explore Sub-navigation Pill Bar without divider line */}
          {currentTab === 'explore' && !isViewingRoutes && (
            <div className="px-4 py-2.5 bg-[#FDF7F4] flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'shopping', label: 'Markets' },
                { id: 'cafe', label: 'Cafes' },
                { id: 'mall', label: 'Malls' },
                { id: 'outing', label: 'Outings' }
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setCurrentCategory(sub.id as PlaceCategory)}
                  className={`flex-1 py-2 px-2.5 rounded-full text-[11.5px] font-bold transition-all text-center whitespace-nowrap ${
                    currentCategory === sub.id
                      ? 'bg-[#F7B8C4] text-[#4A2E3A] font-bold shadow-2xs'
                      : 'bg-[#FBE4E8]/60 text-[#4A2E3A] hover:bg-[#FBE4E8]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
              <button
                onClick={() => setIsViewingRoutes(true)}
                className="py-2 px-3 rounded-full text-[11.5px] font-bold bg-[#FBE4E8]/60 text-[#4A2E3A] whitespace-nowrap hover:bg-[#FBE4E8]"
              >
                Corridors
              </button>
            </div>
          )}

          {/* Route view back button when viewing safe route map */}
          {currentTab === 'explore' && isViewingRoutes && (
            <div className="px-4 py-2.5 bg-[#FDF7F4] flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#4A2E3A]">
                Safe Corridor Navigator
              </span>
              <button
                onClick={() => setIsViewingRoutes(false)}
                className="px-3 py-1 rounded-full bg-[#FBE4E8]/60 text-[11px] font-bold text-[#4A2E3A] hover:bg-[#FBE4E8]"
              >
                Back to List
              </button>
            </div>
          )}

          {/* Main Content Area */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab + (isViewingRoutes ? '-routes' : '')}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {/* Step 1: Home View */}
                {currentTab === 'home' && (
                  <HomeView 
                    onSelectArea={handleSelectArea} 
                    onOpenAIChat={() => setIsAIChatOpen(true)}
                  />
                )}

                {/* Step 2: Category Selection */}
                {currentTab === 'categories' && (
                  <CategorySelectionView
                    selectedArea={selectedNeighborhood}
                    onChangeArea={() => setCurrentTab('home')}
                    onSelectCategory={handleSelectCategory}
                    onQuickViewPlace={() => {}}
                  />
                )}

                {/* Step 3: Explore List Views */}
                {currentTab === 'explore' && !isViewingRoutes && (
                  <>
                    {currentCategory === 'cafe' && (
                      <CafeListView
                        places={DELHI_PLACES}
                        selectedArea={selectedNeighborhood}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectPlace={setSelectedPlace}
                        onBackToCategories={() => setCurrentTab('categories')}
                      />
                    )}
                    {currentCategory === 'shopping' && (
                      <MarketListView
                        places={DELHI_PLACES}
                        selectedArea={selectedNeighborhood}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectPlace={setSelectedPlace}
                        onBackToCategories={() => setCurrentTab('categories')}
                      />
                    )}
                    {currentCategory === 'mall' && (
                      <MallListView
                        places={DELHI_PLACES}
                        selectedArea={selectedNeighborhood}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectPlace={setSelectedPlace}
                        onBackToCategories={() => setCurrentTab('categories')}
                      />
                    )}
                    {currentCategory === 'outing' && (
                      <OutingListView
                        places={DELHI_PLACES}
                        selectedArea={selectedNeighborhood}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectPlace={setSelectedPlace}
                        onBackToCategories={() => setCurrentTab('categories')}
                      />
                    )}
                  </>
                )}

                {/* Safe Corridor Interactive Map */}
                {currentTab === 'explore' && isViewingRoutes && (
                  <SafeRouteView
                    selectedPlace={selectedPlace}
                    onStartJourney={handleStartJourneyFromRoute}
                    onSelectPlaceDetails={setSelectedPlace}
                  />
                )}

                {/* Day Planner */}
                {currentTab === 'planner' && (
                  <PlannerView
                    onSelectPlace={setSelectedPlace}
                    onStartJourney={handleStartJourneyFromRoute}
                    onOpenAIChat={() => setIsAIChatOpen(true)}
                  />
                )}

                {/* Companion Mode */}
                {currentTab === 'companion' && (
                  <CompanionView
                    initialDestination={companionTargetPlace}
                    onOpenFakeCall={() => setIsFakeCallOpen(true)}
                    onSelectPlaceDetails={setSelectedPlace}
                    onCloseCompanion={() => setCurrentTab('home')}
                  />
                )}

                {/* Favorites Wishlist */}
                {currentTab === 'favorites' && (
                  <FavoritesView
                    places={DELHI_PLACES}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectPlace={setSelectedPlace}
                    onExploreMore={() => {
                      setCurrentTab('categories');
                      setIsViewingRoutes(false);
                    }}
                  />
                )}

                {/* Profile & Safety Contacts */}
                {currentTab === 'profile' && (
                  <ProfileView onReplayOnboarding={handleReplayOnboarding} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Bottom Navigation Dock */}
          <BottomNav
            activeTab={currentTab}
            onChangeTab={(tab) => {
              setIsViewingRoutes(false);
              setCurrentTab(tab);
            }}
            favoritesCount={favorites.length}
            isCompanionActive={currentTab === 'companion'}
          />

          {/* Global Place Detail Modal */}
          <PlaceDetailModal
            place={selectedPlace}
            isOpen={!!selectedPlace}
            onClose={() => setSelectedPlace(null)}
            isFavorite={selectedPlace ? favorites.includes(selectedPlace.id) : false}
            onToggleFavorite={handleToggleFavorite}
            onStartRoute={handleStartRoute}
          />

          {/* Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectPlace={setSelectedPlace}
          />

          {/* Discreet Fake Call Simulator Modal */}
          <FakeCallModal
            isOpen={isFakeCallOpen}
            onClose={() => setIsFakeCallOpen(false)}
          />

          {/* AI Bestie Mood-Based Chat Planner Modal */}
          <AIChatPlanner
            isOpen={isAIChatOpen}
            onClose={() => setIsAIChatOpen(false)}
            onSelectPlace={setSelectedPlace}
            onAddPlanToItinerary={(places) => {
              setCurrentTab('planner');
            }}
          />
        </div>
      )}
    </div>
  );
}
