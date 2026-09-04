export type PlaceCategory = 'shopping' | 'mall' | 'cafe' | 'outing';

export type DelhiNeighborhood = 
  | 'Hauz Khas' 
  | 'Khan Market' 
  | 'Connaught Place' 
  | 'Saket' 
  | 'Greater Kailash' 
  | 'South Extension'
  | 'Chanakyapuri'
  | 'Vasant Kunj'
  | 'Majnu Ka Tila'
  | 'Heritage & Lodhi';

export type DelhiArea = DelhiNeighborhood | 'South Delhi' | 'Central Delhi' | 'North Delhi';

export type OutingCategory = 'Garden' | 'Heritage' | 'Wildlife' | 'Religious site' | 'Monument';

export interface RoadConditionFlag {
  id: string;
  type: 'paved' | 'broken_pavement' | 'well_lit_crossing' | 'construction' | 'pedestrian_zone';
  label: string;
  description: string;
}

export interface SafetyAnchor {
  id: string;
  name: string;
  type: 'police' | 'hospital' | 'open_store' | 'pink_booth' | 'metro_cisf';
  address: string;
  distanceFromRoute: string;
}

export interface DelhiPlace {
  id: string;
  name: string;
  category: PlaceCategory;
  area: DelhiArea;
  neighborhood: DelhiNeighborhood;
  tagline: string;
  description: string;
  heroImage: string;
  thumbnail: string;
  gallery?: string[];
  budgetTier: 1 | 2 | 3; // 1: ₹, 2: ₹₹, 3: ₹₹₹
  priceRange: string; // e.g. "₹300–600 for two" or "Free Entry"
  safetyScore: number; // e.g. 9.8
  crowdDensity: 1 | 2 | 3; // 1: calm, 2: comfortable, 3: vibrant
  metroLine: string; // e.g. 'Yellow Line', 'Pink Line', 'Violet Line'
  metroStation: string; // e.g. 'Hauz Khas Metro'
  metroDistance: string; // e.g. '300m walking · Gate 2'
  metroExit: string; // e.g. 'Gate 2 — 250m well-lit path'
  bestSafeHours: string; // e.g. '11:00 AM – 8:30 PM'
  verifiedLighting: boolean;
  pinkBoothNearby: boolean;
  womenLedOrFriendly: boolean;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  tags: string[];
  curatedTips: string[];
  cafeSpecific?: {
    vibe: string;
    ambienceScore: number;
    foodScore: number;
    priceForTwo: string;
    mustOrder: string;
    outdoorSeating: boolean;
    workFriendly?: boolean;
  };
  mallSpecific?: {
    brandChips: string[];
    verifiedCabPickup: string;
    securityLevel: string;
    floorDirectory?: string[];
    nearbyCafes: { name: string; type: string }[];
  };
  marketSpecific?: {
    knownFor: string;
    specialties: string[];
    bargainingTips: string;
    bestLane: string;
    atmAvailability: string;
    safestEntryExit: string;
    recommendedTime: string;
  };
  outingSpecific?: {
    outingType: OutingCategory;
    bestTime: string;
    entryFee: string;
    openingHours: string;
    crowdPattern: string;
    safestEntryGate: string;
    nearbyFoodRest: { name: string; type: string; distance: string }[];
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SafeRoute {
  id: string;
  title: string;
  from: string;
  to: string;
  etaMinutes: number;
  distanceKm: number;
  safetyScore: number;
  routeType: 'recommended' | 'well-lit-priority' | 'cab-priority';
  estimatedFare: string;
  lightingRating: string; // e.g. "98% Verified LED Lighting"
  crowdHeatmap: 'green' | 'amber' | 'rose'; // Never alert red
  metroLegs: {
    line: string;
    colorHex: string;
    fromStation: string;
    toStation: string;
    stationsCount: number;
    pinkCoachPosition: string;
  }[];
  walkSegments: {
    instruction: string;
    distance: string;
    litRating: 'Excellent' | 'Good';
    cctvCovered: boolean;
  }[];
  roadConditions: RoadConditionFlag[];
  safetyAnchors: SafetyAnchor[];
  safeCheckpoints: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  initials: string;
  isPrimary: boolean;
  notifyWhatsApp: boolean;
  notifySMS: boolean;
}

export interface CabJourneyDetails {
  cabNumber: string;
  driverName: string;
  company: 'Uber' | 'BluSmart' | 'Ola' | 'Auto Rickshaw' | 'Other';
  startLocation: string;
  destination: string;
}

export interface FakeCallSettings {
  callerName: string;
  callerRelation: string;
  callerAvatarUrl?: string;
  scriptPreset: 'checking_in' | 'pickup' | 'urgent_family' | 'dinner_ready';
  delaySeconds: number;
}

export interface GirlsDayPlan {
  id: string;
  title: string;
  budgetType: 'budget' | 'moderate' | 'luxe';
  area: string;
  purpose: string;
  totalSpend: number;
  curatedBy: string;
  timeline: {
    step: number;
    time: string;
    place: DelhiPlace;
    type: 'market' | 'cafe' | 'mall' | 'outing';
    costEstimate: number;
    note: string;
  }[];
}
