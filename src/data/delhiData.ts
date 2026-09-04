import { DelhiPlace, SafeRoute, EmergencyContact, GirlsDayPlan, FakeCallSettings } from '../types';

export const DELHI_NEIGHBORHOODS = [
  { id: 'Hauz Khas', name: 'Hauz Khas & HKV', zone: 'South Delhi', tagline: 'Lakeside cafes, Deer Park & bohemian indie boutiques' },
  { id: 'Khan Market', name: 'Khan Market', zone: 'Central Delhi', tagline: 'Luxe designer shops, bookstores & quiet roasteries' },
  { id: 'Connaught Place', name: 'Connaught Place (CP)', zone: 'Central Delhi', tagline: 'Colonial arcades, Janpath silver, Baoli & tearooms' },
  { id: 'Saket', name: 'Saket & Mehrauli', zone: 'South Delhi', tagline: 'Select CITYWALK, Qutub Complex & glasshouse cafes' },
  { id: 'Greater Kailash', name: 'Greater Kailash (GK)', zone: 'South Delhi', tagline: 'M-Block chic fashion lanes & cozy mountain cafes' },
  { id: 'South Extension', name: 'South Extension & Sarojini', zone: 'South Delhi', tagline: 'Thrift lanes, festive couture & specialty roasters' },
  { id: 'Chanakyapuri', name: 'Chanakyapuri Enclave', zone: 'Central Delhi', tagline: 'Serene tree-lined embassies, Nehru Park & Diggin garden' },
  { id: 'Vasant Kunj', name: 'Vasant Kunj', zone: 'South Delhi', tagline: 'DLF Promenade, Emporio luxury & serene bistros' },
  { id: 'Majnu Ka Tila', name: 'Majnu Ka Tila (MKT)', zone: 'North Delhi', tagline: 'Tibetan thrift alleyways, Korean beauty & AMA Cafe' },
  { id: 'Heritage & Lodhi', name: 'Heritage & Lodhi Zone', zone: 'Central Delhi', tagline: 'Lodhi Garden, Sundar Nursery, Humayun Tomb & Dilli Haat' },
];

export const DELHI_PLACES: DelhiPlace[] = [
  // ===================== OUTINGS & SIGHTSEEING (NEW) =====================
  {
    id: 'lodhi-garden',
    name: 'Lodhi Garden',
    category: 'outing',
    area: 'Central Delhi',
    neighborhood: 'Heritage & Lodhi',
    tagline: '90-acre lush royal park dotted with 15th-century Sayyid & Lodhi monuments',
    description: 'A beloved green sanctuary in central Delhi with emerald rolling lawns, rose gardens, heritage stone bridges, and tranquil walking trails. Heavily frequented by women runners, book readers, and picnic groups.',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80'
    ],
    budgetTier: 1,
    priceRange: 'Free Entry',
    safetyScore: 9.9,
    crowdDensity: 2,
    metroLine: 'Violet Line',
    metroStation: 'Jorbagh / JLN Stadium Metro',
    metroDistance: '450m shaded walk · Gate 2',
    metroExit: 'Jorbagh Gate 2 — 400m along well-guarded Lodhi Estate road',
    bestSafeHours: '6:00 AM – 7:30 PM (Gates close at sunset 8:00 PM)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 3890,
    distanceKm: 3.5,
    tags: ['Royal Garden', 'Heritage Tombs', 'Picnic Spot', 'Jogging Tracks', 'Free Entry'],
    curatedTips: [
      'Bara Gumbad and Sheesh Gumbad lawns have the best shade under giant neem and banyan trees.',
      'Security guards and horticultural staff are present along every internal stone path.',
      'Bring a picnic mat and book; pair with coffee at Lodhi Colony afterwards.'
    ],
    outingSpecific: {
      outingType: 'Garden',
      bestTime: 'Best before 6:00 PM (Golden hour between 4:30 PM and 6:30 PM is picturesque)',
      entryFee: 'Free Entry (No ticket required)',
      openingHours: '6:00 AM – 8:00 PM (Daily)',
      crowdPattern: 'Quiet morning joggers, serene daytime reading spots, relaxed family & couple strolls before sunset',
      safestEntryGate: 'Gate 1 (Main Jor Bagh Road) and Gate 4 with police picket & lit footpath',
      nearbyFoodRest: [
        { name: 'Lodhi - The Garden Restaurant', type: 'Al fresco European Dining', distance: 'Inside compound' },
        { name: 'Blue Tokai Lodhi Colony', type: 'Specialty Coffee', distance: '600m' },
        { name: 'Clean NDMC Public Restrooms', type: 'Sanitized Restrooms at Gate 1', distance: '50m' }
      ]
    },
    coordinates: { lat: 28.5931, lng: 77.2197 }
  },
  {
    id: 'sundar-nursery-heritage',
    name: 'Sundar Nursery & Sunderwala Mahal',
    category: 'outing',
    area: 'Central Delhi',
    neighborhood: 'Heritage & Lodhi',
    tagline: 'UNESCO-restored 90-acre heritage botanical park with marble fountains & lakes',
    description: 'Delhi’s crown jewel of landscape restoration. Featuring 16th-century Mughal monuments, pristine water cascades, sunken amphitheaters, and 300+ tree species with ticketed security.',
    heroImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80'
    ],
    budgetTier: 1,
    priceRange: '₹50 per person',
    safetyScore: 9.9,
    crowdDensity: 2,
    metroLine: 'Violet / Pink Line',
    metroStation: 'JLN Stadium Metro / Hazrat Nizamuddin',
    metroDistance: '600m direct walk · Gate 2',
    metroExit: 'JLN Stadium Gate 2 — 5-min registered e-rickshaw',
    bestSafeHours: '7:00 AM – 7:00 PM (Gates close 6:30 PM)',
    verifiedLighting: true,
    pinkBoothNearby: false,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 4100,
    distanceKm: 4.4,
    tags: ['Botanical Garden', 'UNESCO Heritage', 'Lake Pavilion', 'Golden Hour'],
    curatedTips: [
      'Ticketed gated entry ensures zero outside commotion and peaceful surroundings.',
      'Lakeside pavilion has live classical flute players on weekend evenings.',
      'Fabcafe by the lake is located right inside the gardens.'
    ],
    outingSpecific: {
      outingType: 'Garden',
      bestTime: 'Best from 3:30 PM to 6:30 PM for sunset over the lake pavilion',
      entryFee: '₹50 for Indian Adults, ₹25 for Children / Seniors',
      openingHours: '7:00 AM – 7:00 PM (Daily, last entry 6:15 PM)',
      crowdPattern: 'Comfortable creative crowd, female photography groups, botanical enthusiasts',
      safestEntryGate: 'Main Heritage Gate 1 with guard ticketing booth & bag scanner',
      nearbyFoodRest: [
        { name: 'Fabcafe by the Lake', type: 'Organic Regional Food & Coffee', distance: 'Inside park' },
        { name: 'Sundar Nursery Eco-Kiosks', type: 'Artisan Juices & Ice Cream', distance: 'Central lawn' }
      ]
    },
    coordinates: { lat: 28.5934, lng: 77.2443 }
  },
  {
    id: 'humayun-tomb',
    name: 'Humayun’s Tomb Complex',
    category: 'outing',
    area: 'Central Delhi',
    neighborhood: 'Heritage & Lodhi',
    tagline: 'Magnificent 16th-century Persian-style red sandstone palace & charbagh gardens',
    description: 'The architectural inspiration behind the Taj Mahal. High security, immaculately maintained garden quadrants, reflective water channels, and grand dome vistas.',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: '₹40 for Indians · ₹600 Foreigners',
    safetyScore: 9.8,
    crowdDensity: 2,
    metroLine: 'Violet / Pink Line',
    metroStation: 'JLN Stadium Metro',
    metroDistance: '700m safe walk · Gate 2',
    metroExit: 'JLN Stadium Gate 2 — 3-min e-rickshaw directly to ASI gate',
    bestSafeHours: '8:00 AM – 6:00 PM (Gates close 5:30 PM)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.8,
    reviewsCount: 5200,
    distanceKm: 4.6,
    tags: ['UNESCO World Heritage', 'Architecture', 'Mughal History', 'Palace Gardens'],
    curatedTips: [
      'ASI ticket counter has dedicated ladies queues and instant QR scan entry.',
      'Isa Khan Tomb near the entrance is circular, exceptionally quiet, and great for photos.'
    ],
    outingSpecific: {
      outingType: 'Heritage',
      bestTime: 'Best before 5:30 PM; early morning (8:00 AM) has magical soft light without crowd',
      entryFee: '₹40 (Digital ASI Ticket) / ₹50 (Cash)',
      openingHours: '6:00 AM – 6:00 PM (Sunrise to Sunset)',
      crowdPattern: 'Global tourists, art historians, guided photography walks with ASI security personnel',
      safestEntryGate: 'Main ASI Heritage Gate with turnstiles & metal screening',
      nearbyFoodRest: [
        { name: 'Cafe Lota (Crafts Museum)', type: 'Artisanal Indian Regional Bites', distance: '1.2 km' },
        { name: 'Heritage Souvenir Cafe', type: 'Chai & Snacks', distance: 'Near ticket desk' }
      ]
    },
    coordinates: { lat: 28.5893, lng: 77.2507 }
  },
  {
    id: 'deer-park-hauz-khas',
    name: 'Deer Park & Hauz Khas Lake',
    category: 'outing',
    area: 'South Delhi',
    neighborhood: 'Hauz Khas',
    tagline: 'Vast forest canopy with spotted deer enclosures, duck lakes & peacocks',
    description: 'An expansive ecological haven in South Delhi connecting Hauz Khas Village to Safdarjung Enclave. Features spotted deer enclosures, blooming bougainvillea paths, water fountains, and ancient monuments.',
    heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: 'Free Entry',
    safetyScore: 9.6,
    crowdDensity: 2,
    metroLine: 'Yellow / Magenta Line',
    metroStation: 'Hauz Khas / Green Park Metro',
    metroDistance: '400m walk · HKV Gate',
    metroExit: 'Hauz Khas Gate 2 or Green Park Gate 3',
    bestSafeHours: '6:30 AM – 7:00 PM',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.8,
    reviewsCount: 3200,
    distanceKm: 2.7,
    tags: ['Deer Sanctuary', 'Lake View', 'Hauz Khas', 'Sunset Walk', 'Free Entry'],
    curatedTips: [
      'Enter from the Hauz Khas Village entrance near Kunzum Books for quick access to the lake.',
      'Delhi Forest Department guards patrol the paved lakeside perimeter.'
    ],
    outingSpecific: {
      outingType: 'Wildlife',
      bestTime: 'Best between 4:00 PM and 6:30 PM when deer congregate near the feeding station',
      entryFee: 'Free Entry (Managed by Delhi DDA)',
      openingHours: '5:00 AM – 8:00 PM (Summer) / 5:30 AM – 7:00 PM (Winter)',
      crowdPattern: 'Morning yoga circles, pet walkers, young couples, and bird photographers',
      safestEntryGate: 'Hauz Khas Village Main Arch & Green Park Sector 3 Gate',
      nearbyFoodRest: [
        { name: 'Kunzum Books & Coffee', type: 'Book Cafe & Pour Overs', distance: '150m' },
        { name: 'Naivedyam Green Park', type: 'South Indian Filter Coffee', distance: '500m' }
      ]
    },
    coordinates: { lat: 28.5545, lng: 77.1925 }
  },
  {
    id: 'qutub-complex-mehrauli',
    name: 'Qutub Minar & Archaeological Park',
    category: 'outing',
    area: 'South Delhi',
    neighborhood: 'Saket',
    tagline: '72.5m soaring 12th-century victory tower surrounded by manicured rose gardens',
    description: 'Delhi’s iconic UNESCO heritage site boasting exquisite flute carvings, the Iron Pillar of Delhi, the uncompleted Alai Minar, and sprawling rose gardens protected by CISF security.',
    heroImage: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: '₹40 for Indians · ₹600 Foreigners',
    safetyScore: 9.8,
    crowdDensity: 2,
    metroLine: 'Yellow Line',
    metroStation: 'Qutub Minar Metro',
    metroDistance: '500m walk or 2-min cab · Gate 2',
    metroExit: 'Qutub Minar Metro Gate 2 — Direct wide pedestrian boulevard',
    bestSafeHours: '7:00 AM – 9:00 PM (Illuminated at night until 9 PM)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 6400,
    distanceKm: 5.9,
    tags: ['UNESCO Monument', 'Night Illumination', 'Rose Garden', 'High Security'],
    curatedTips: [
      'The complex is illuminated with warm gold floodlights after 7:00 PM, creating a majestic night view.',
      'Pair with dinner at The Grammar Room or Olive Qutub right next door.'
    ],
    outingSpecific: {
      outingType: 'Monument',
      bestTime: 'Best late afternoon (4:30 PM) through early evening (7:30 PM) for the floodlit view',
      entryFee: '₹40 (Digital ASI booking)',
      openingHours: '7:00 AM – 9:30 PM (Daily)',
      crowdPattern: 'Organized tourist walks, architecture students, CISF guarded at all angles',
      safestEntryGate: 'Main Security Entrance with electronic baggage scanner and turnstiles',
      nearbyFoodRest: [
        { name: 'The Grammar Room', type: 'Glasshouse Cafe & Cocktails', distance: '400m' },
        { name: 'Olive Bar & Kitchen', type: 'Boutique Courtyard Dining', distance: '450m' }
      ]
    },
    coordinates: { lat: 28.5244, lng: 77.1855 }
  },
  {
    id: 'agrasen-ki-baoli',
    name: 'Agrasen Ki Baoli',
    category: 'outing',
    area: 'Central Delhi',
    neighborhood: 'Connaught Place',
    tagline: '14th-century stepped heritage reservoir with 108 stone steps in the heart of CP',
    description: 'An awe-inspiring architectural wonder hidden behind high-rise buildings near Connaught Place. 60-meter long stepped well with three tiers of stone arches and quiet acoustic echoes.',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: 'Free Entry',
    safetyScore: 9.7,
    crowdDensity: 2,
    metroLine: 'Blue / Violet Line',
    metroStation: 'Barakhamba Road / Janpath Metro',
    metroDistance: '350m walk · Gate 6',
    metroExit: 'Barakhamba Road Gate 6 — 350m straight into Hailey Road',
    bestSafeHours: '9:00 AM – 5:30 PM',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.7,
    reviewsCount: 2900,
    distanceKm: 5.1,
    tags: ['Stepwell', 'Ancient Reservoir', 'Central Delhi', 'Free Entry'],
    curatedTips: [
      'Located in a quiet, upscale residential lane (Hailey Road) right behind CP.',
      'Security guards control step access for visitor safety.'
    ],
    outingSpecific: {
      outingType: 'Monument',
      bestTime: 'Best from 11:00 AM to 3:30 PM for gentle ambient light down the steps',
      entryFee: 'Free Entry (ASI Protected Monument)',
      openingHours: '9:00 AM – 5:30 PM (Daily)',
      crowdPattern: 'Photography enthusiasts, history lovers, university students',
      safestEntryGate: 'Hailey Road Main Arch with security guard booth',
      nearbyFoodRest: [
        { name: 'Cha Bar Oxford Bookstore', type: 'Tea Room & Book Cafe', distance: '600m' },
        { name: 'Wenger’s Deli CP', type: 'Classic Delhi Bakery & Sandwiches', distance: '750m' }
      ]
    },
    coordinates: { lat: 28.6260, lng: 77.2250 }
  },

  // ===================== CAFES =====================
  {
    id: 'diggin-chanakyapuri',
    name: 'Diggin',
    category: 'cafe',
    area: 'Central Delhi',
    neighborhood: 'Chanakyapuri',
    tagline: 'Romantic brick-and-ivy garden sanctuary in diplomatic enclave',
    description: 'Tucked inside the serene diplomatic enclave of Chanakyapuri, Diggin offers fairy-tale brick architecture, lush hanging planters, artisanal thin-crust pizzas, and gentle acoustic music.',
    heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80',
    budgetTier: 2,
    priceRange: '₹1,200–1,500 for two',
    safetyScore: 9.9,
    crowdDensity: 2,
    metroLine: 'Yellow / Pink Line',
    metroStation: 'Lok Kalyan Marg / Durgabai Deshmukh',
    metroDistance: '5-min safe cab · Diplomatic Gate',
    metroExit: 'Pre-book Uber/BluSmart directly to Santushti Complex gate',
    bestSafeHours: '11:30 AM – 10:30 PM (Daily)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 1890,
    distanceKm: 3.2,
    tags: ['Garden Cafe', 'Diplomatic Area', 'Italian', 'Aesthetic Interiors'],
    curatedTips: [
      'Located in an ultra-secure, tree-lined diplomatic zone with 24/7 security.',
      'Outdoor patio tables near the rose creeper trellis are the dreamiest for photos.',
      'Call ahead or reserve via app for weekend late afternoons.'
    ],
    cafeSpecific: {
      vibe: 'Romantic, fairy-lit garden with ivy-clad brick walls',
      ambienceScore: 9.9,
      foodScore: 9.4,
      priceForTwo: '₹1,400 for two',
      mustOrder: 'Roseberry Iced Tea, Truffle Mushroom Ravioli, Ferrero Rocher Shake',
      outdoorSeating: true,
      workFriendly: false
    },
    coordinates: { lat: 28.5912, lng: 77.1974 }
  },
  {
    id: 'the-grammar-room',
    name: 'The Grammar Room',
    category: 'cafe',
    area: 'South Delhi',
    neighborhood: 'Saket',
    tagline: 'Chic sunlit glasshouse overlooking tranquil forest foliage and Qutub ridge',
    description: 'A beloved South Delhi gem with a minimalist Nordic design palette, floor-to-ceiling glass panes, handcrafted cocktails, artisanal toasts, and board games.',
    heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80',
    budgetTier: 3,
    priceRange: '₹1,800–2,200 for two',
    safetyScore: 9.7,
    crowdDensity: 2,
    metroLine: 'Yellow Line',
    metroStation: 'Qutub Minar Metro',
    metroDistance: '4-min registered cab · Gate 2',
    metroExit: 'Gate 2 — 5-min registered cab to One Style Mile',
    bestSafeHours: '11:00 AM – 10:00 PM',
    verifiedLighting: true,
    pinkBoothNearby: false,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 1540,
    distanceKm: 6.2,
    tags: ['Glasshouse', 'Boutique Coffee', 'Aesthetic Brunch', 'Quiet Luxury'],
    curatedTips: [
      'Part of the gated One Style Mile compound with dedicated valet and security.',
      'The avocado tartine and cinnamon French toast are iconic brunch staples.',
      'Outdoor porch seating allows you to hear bird songs despite being in the city.'
    ],
    cafeSpecific: {
      vibe: 'Sunlit glasshouse with forest views & tranquil acoustic playlists',
      ambienceScore: 9.9,
      foodScore: 9.6,
      priceForTwo: '₹2,000 for two',
      mustOrder: 'Sprout & Barley Bowl, Brioche French Toast, Kaffir Lime Cold Brew',
      outdoorSeating: true,
      workFriendly: true
    },
    coordinates: { lat: 28.5245, lng: 77.1855 }
  },
  {
    id: 'fabcafe-sundar-nursery',
    name: 'Fabcafe by the Lake',
    category: 'cafe',
    area: 'Central Delhi',
    neighborhood: 'Heritage & Lodhi',
    tagline: 'Lakeside pavilion overlooking restored 16th-century Mughal heritage gardens',
    description: 'A serene open-air pavilion located inside the 90-acre UNESCO heritage Sundar Nursery. Features clean wholesome organic Indian dishes, artisanal teas, and calming lake ripples.',
    heroImage: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=400&q=80',
    budgetTier: 2,
    priceRange: '₹1,000–1,300 for two',
    safetyScore: 9.8,
    crowdDensity: 2,
    metroLine: 'Violet Line',
    metroStation: 'JLN Stadium Metro',
    metroDistance: '600m walking · Gate 2',
    metroExit: 'Gate 2 — 800m tree-lined walk or 3-min e-rickshaw',
    bestSafeHours: '8:00 AM – 7:30 PM (Park closes at dusk)',
    verifiedLighting: true,
    pinkBoothNearby: false,
    womenLedOrFriendly: true,
    rating: 4.8,
    reviewsCount: 1240,
    distanceKm: 4.5,
    tags: ['Botanical Garden', 'Heritage', 'Organic Food', 'Golden Hour'],
    curatedTips: [
      'Sundar Nursery has ticketed entry with polite guards along every marble water channel.',
      'Best experienced at 4:30 PM for sunset golden hour reflection over the lake.',
      'Great spot to read a book solo or picnic with girlfriends.'
    ],
    cafeSpecific: {
      vibe: 'Peaceful lakeside breeze with heritage Mughal tomb backdrop',
      ambienceScore: 9.8,
      foodScore: 9.2,
      priceForTwo: '₹1,200 for two',
      mustOrder: 'Jackfruit Cutlets, Almond Milk Cold Coffee, Beetroot Lotus Stem Tikki',
      outdoorSeating: true,
      workFriendly: true
    },
    coordinates: { lat: 28.5934, lng: 77.2443 }
  },
  {
    id: 'kunzum-hauz-khas',
    name: 'Kunzum Books & Coffee',
    category: 'cafe',
    area: 'South Delhi',
    neighborhood: 'Hauz Khas',
    tagline: 'Cozy book lover sanctuary with specialty roasts and quiet work nooks',
    description: 'An artistic haven in Hauz Khas Village filled with floor-to-ceiling indie books, vintage armchairs, artisanal single estate pour-overs, and polite creative patrons.',
    heroImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: '₹400–650 for two',
    safetyScore: 9.6,
    crowdDensity: 1,
    metroLine: 'Yellow / Magenta Line',
    metroStation: 'Hauz Khas Metro Station',
    metroDistance: '400m well-lit path · Gate 2',
    metroExit: 'Gate 2 — 5-min safe e-rickshaw into HKV entrance',
    bestSafeHours: '11:00 AM – 8:30 PM',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.8,
    reviewsCount: 780,
    distanceKm: 2.8,
    tags: ['Book Cafe', 'Solo Friendly', 'Quiet Work', 'Artisanal Coffee'],
    curatedTips: [
      'Free high-speed Wi-Fi and quiet background lo-fi music make it perfect for solo studying.',
      'Complimentary cookie with every specialty brew purchase.'
    ],
    cafeSpecific: {
      vibe: 'Cozy, plant-filled & bookish; ideal for solo creative recharge',
      ambienceScore: 9.7,
      foodScore: 9.0,
      priceForTwo: '₹550 for two',
      mustOrder: 'Cinnamon Flat White, Walnut Brownie, Hibiscus Iced Tea',
      outdoorSeating: false,
      workFriendly: true
    },
    coordinates: { lat: 28.5532, lng: 77.1945 }
  },
  {
    id: 'blue-tokai-khan',
    name: 'Blue Tokai Coffee Roasters',
    category: 'cafe',
    area: 'Central Delhi',
    neighborhood: 'Khan Market',
    tagline: 'Artisanal single-origin brews, gentle jazz & dedicated work-friendly tables',
    description: 'A peaceful, minimalist Scandinavian-inspired roastery tucked in the upscale lanes of Khan Market. High-speed Wi-Fi, respectful crowd, and single-estate pours.',
    heroImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
    budgetTier: 2,
    priceRange: '₹600–850 for two',
    safetyScore: 9.9,
    crowdDensity: 1,
    metroLine: 'Violet Line',
    metroStation: 'Khan Market Metro',
    metroDistance: '80m walking · Gate 4',
    metroExit: 'Gate 4 — 80m step into Middle Lane',
    bestSafeHours: '7:30 AM – 10:30 PM (Daily)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 890,
    distanceKm: 4.9,
    tags: ['Specialty Coffee', 'Work Friendly', 'Quiet', 'Khan Market'],
    curatedTips: [
      'Ideal for solo deep work, laptop sessions, or unwinding after market shopping.',
      'Try the Iced Vietnamese Coffee or Sea Salt Mocha with a sourdough croissant.'
    ],
    cafeSpecific: {
      vibe: 'Minimalist Nordic roastery with gentle acoustics & fast Wi-Fi',
      ambienceScore: 9.5,
      foodScore: 9.3,
      priceForTwo: '₹750 for two',
      mustOrder: 'Attikan Estate Pour Over, Iced Sea Salt Mocha, Butter Croissant',
      outdoorSeating: false,
      workFriendly: true
    },
    coordinates: { lat: 28.5998, lng: 77.2268 }
  },
  {
    id: 'music-and-mountains-gk',
    name: 'Music & Mountains — Hillside Cafe',
    category: 'cafe',
    area: 'South Delhi',
    neighborhood: 'Greater Kailash',
    tagline: 'Rustic Himalayan wood-cabin retreat with stone fireplaces and vintage chandeliers',
    description: 'Transport yourself to a snow-clad mountain lodge in Manali right in GK-1 M-Block. Features candlelit wooden tables, comforting apple crumble, mountain teas, and soft acoustic jazz.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    budgetTier: 3,
    priceRange: '₹1,600–2,100 for two',
    safetyScore: 9.8,
    crowdDensity: 2,
    metroLine: 'Magenta Line / Violet Line',
    metroStation: 'Greater Kailash / Kailash Colony',
    metroDistance: '350m well-lit path · Gate 1',
    metroExit: 'GK Metro Gate 1 — 350m walking straight into M-Block arcade',
    bestSafeHours: '12:00 PM – 11:00 PM',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.8,
    reviewsCount: 1620,
    distanceKm: 4.2,
    tags: ['Mountain Cabin', 'Candlelight', 'Aesthetic Dinner', 'GK-1 M Block'],
    curatedTips: [
      'Upstairs corner tables with tree-branch railings are the coziest for conversations.',
      'The hot dark chocolate with marshmallows and rustic shepherd’s pie are legends.'
    ],
    cafeSpecific: {
      vibe: 'Warm pine-scented cabin with soft candle glow & vintage jazz',
      ambienceScore: 9.9,
      foodScore: 9.5,
      priceForTwo: '₹1,800 for two',
      mustOrder: 'Himalayan Apple Crumble, Truffle Fries, Spiced Mountain Hot Chocolate',
      outdoorSeating: false,
      workFriendly: false
    },
    coordinates: { lat: 28.5524, lng: 77.2405 }
  },
  {
    id: 'ama-cafe-mkt',
    name: 'AMA Cafe',
    category: 'cafe',
    area: 'North Delhi',
    neighborhood: 'Majnu Ka Tila',
    tagline: 'Iconic warm-wood Tibetan haven famous for fluffy pancakes & blueberry cheesecakes',
    description: 'The crowning jewel of Delhi’s Tibetan quarter. Spread over three warm wood-panelled floors with Himalayan prayer flags, cozy leather booth seating, artisanal pour-overs, and legendary bakery displays.',
    heroImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: '₹500–750 for two',
    safetyScore: 9.5,
    crowdDensity: 3,
    metroLine: 'Yellow Line',
    metroStation: 'Vidhan Sabha Metro Station',
    metroDistance: '5-min direct safe e-rickshaw · Gate 2',
    metroExit: 'Vidhan Sabha Gate 2 — Take registered e-rickshaw directly to MKT Monastery Gate',
    bestSafeHours: '8:00 AM – 8:30 PM',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 3800,
    distanceKm: 8.5,
    tags: ['Himalayan Breakfast', 'Bakery', 'Majnu Ka Tila', 'Budget Friendly'],
    curatedTips: [
      'Arrive before 11:30 AM on weekends to avoid waiting queue.',
      'Pair your visit with exploring the Tibetan handicraft and Korean skincare stalls.'
    ],
    cafeSpecific: {
      vibe: 'Warm Himalayan alpine vibe with aroma of freshly baked cinnamon rolls',
      ambienceScore: 9.8,
      foodScore: 9.6,
      priceForTwo: '₹600 for two',
      mustOrder: 'Blueberry Cheesecake, Himalayan Breakfast Platter, Iced Mud Coffee',
      outdoorSeating: false,
      workFriendly: true
    },
    coordinates: { lat: 28.7025, lng: 77.2285 }
  },
  {
    id: 'cha-bar-cp',
    name: 'Cha Bar & Oxford Bookstore',
    category: 'cafe',
    area: 'Central Delhi',
    neighborhood: 'Connaught Place',
    tagline: 'Airy black-and-white tea room with 150+ blends inside historic Oxford Bookstore',
    description: 'A timeless sanctuary right on the outer circle of Connaught Place. Grab a novel from the curated shelves, settle into high-back white chairs, and sip on rare Darjeeling flushes.',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: '₹400–600 for two',
    safetyScore: 9.7,
    crowdDensity: 2,
    metroLine: 'Yellow / Blue Line',
    metroStation: 'Rajiv Chowk Metro',
    metroDistance: '150m walking · Gate 6 (N-Block)',
    metroExit: 'Rajiv Chowk Gate 6 — 2-min walk along N-Block colonized corridor',
    bestSafeHours: '10:00 AM – 9:00 PM',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.7,
    reviewsCount: 1950,
    distanceKm: 5.4,
    tags: ['Artisanal Tea', 'Bookstore Cafe', 'Connaught Place', 'Quiet Reading'],
    curatedTips: [
      'You are allowed to bring unpurchased books from the Oxford racks to your table while ordering.',
      'Smoked chicken sandwiches and Earl Grey iced tea are perennial favourites.'
    ],
    cafeSpecific: {
      vibe: 'Refined, quiet literary tearoom with spotless monochrome aesthetics',
      ambienceScore: 9.6,
      foodScore: 9.1,
      priceForTwo: '₹500 for two',
      mustOrder: 'Nilgiri Frost Tea, Bun Maska with Chai, Fish & Chips Basket',
      outdoorSeating: false,
      workFriendly: true
    },
    coordinates: { lat: 28.6312, lng: 77.2198 }
  },

  // ===================== SHOPPING MARKETS =====================
  {
    id: 'sarojini-nagar',
    name: 'Sarojini Nagar Market',
    category: 'shopping',
    area: 'South Delhi',
    neighborhood: 'South Extension',
    tagline: 'Delhi’s iconic thrift haven for export surplus, denim & seasonal steals',
    description: 'A bustling open-air market famed for fast fashion, export surplus tops, denim, and trendy accessories. The central square has plenty of street vendors and active footfall throughout daylight hours.',
    heroImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: '₹300–1,500 total spend',
    safetyScore: 9.3,
    crowdDensity: 3,
    metroLine: 'Pink Line',
    metroStation: 'Sarojini Nagar Metro',
    metroDistance: '120m well-lit path · Gate 1',
    metroExit: 'Gate 1 — 120m straight well-lit pedestrian walkway',
    bestSafeHours: '11:30 AM – 7:30 PM (Mondays closed)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.8,
    reviewsCount: 1420,
    distanceKm: 2.4,
    tags: ['Thrifting', 'Bargaining', 'Western Wear', 'Jewellery'],
    curatedTips: [
      'Enter via Gate 1 of Pink Line Metro for the safest and shortest walk.',
      'Lanes 11 and 12 (Export Surplus) are widest and best-lit before 7:00 PM.',
      'Always keep a small crossbody bag zipped in front in dense corridors.',
      'DLF Multilevel parking building has clean restrooms and prepaid auto stands.'
    ],
    marketSpecific: {
      knownFor: 'Budget export surplus fashion, denim, co-ords & jewellery steals',
      specialties: ['Export Surplus Tops', 'Korean Pants', 'Tote Bags', 'Silver Junk Jewellery'],
      bargainingTips: 'Quote around 40-50% of the opening ask with a polite smile.',
      bestLane: 'Lane 11 & Subhash Market alley',
      atmAvailability: 'SBI & HDFC ATMs at Main Central Circle',
      safestEntryExit: 'Metro Gate 1 directly into Lane 11 (Avoid dark back-alleys after sunset)',
      recommendedTime: 'Weekday mornings (11:30 AM – 2:00 PM) for breathable browsing'
    },
    coordinates: { lat: 28.5772, lng: 77.1983 }
  },
  {
    id: 'khan-market',
    name: 'Khan Market Promenade',
    category: 'shopping',
    area: 'Central Delhi',
    neighborhood: 'Khan Market',
    tagline: 'Refined U-shaped promenade of luxury designer boutiques, bookstores & perfumes',
    description: 'Consistently ranked among the safest and most sophisticated retail hubs in India. Lined with high-end designer stores, artisanal perfume shops, indie bookstores, and world-class patisseries.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    budgetTier: 3,
    priceRange: '₹2,000–8,000+ spend',
    safetyScore: 9.9,
    crowdDensity: 2,
    metroLine: 'Violet Line',
    metroStation: 'Khan Market Metro',
    metroDistance: '60m directly into Middle Lane · Gate 4',
    metroExit: 'Gate 4 — 60m directly into Middle Lane',
    bestSafeHours: '10:30 AM – 10:30 PM (Daily)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 2150,
    distanceKm: 4.8,
    tags: ['Luxury Boutiques', 'Bookstores', 'Specialty Coffee', 'High Security'],
    curatedTips: [
      'The entire perimeter is heavily patrolled with 24/7 security & CCTV.',
      'Bahar Lane and Middle Lane house some of the quietest coffee reading nooks.',
      'Faqir Chand & Sons and Bahrisons Booksellers are absolute cultural treasures.'
    ],
    marketSpecific: {
      knownFor: 'Luxury lifestyle, indie bookstores, designer Indian wear & niche beauty',
      specialties: ['Artisanal Perfumes', 'Indie Books', 'Resort Wear', 'Fine Silver & Gold'],
      bargainingTips: 'Fixed price retail; ask about seasonal store privileges.',
      bestLane: 'Middle Lane & Back Courtyard',
      atmAvailability: 'Multiple bank branches with guard-assisted lobbies',
      safestEntryExit: 'Metro Gate 4 directly into well-lit central arcade (Guards at every corner)',
      recommendedTime: 'Late afternoon (4:00 PM – 8:00 PM)'
    },
    coordinates: { lat: 28.6003, lng: 77.2272 }
  },
  {
    id: 'janpath-market',
    name: 'Janpath & Tibetan Market',
    category: 'shopping',
    area: 'Central Delhi',
    neighborhood: 'Connaught Place',
    tagline: 'Artisanal silver jewellery, boho linen, brassware & Tibetan crafts',
    description: 'Situated right off Connaught Place, Janpath combines authentic silver jewellery kiosks, hand-embroidered bags, and antique home decor with wide, shaded pedestrian sidewalks.',
    heroImage: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: '₹300–1,200 spend',
    safetyScore: 9.4,
    crowdDensity: 2,
    metroLine: 'Violet Line / Yellow Line',
    metroStation: 'Janpath / Rajiv Chowk',
    metroDistance: '50m straight to craft row · Gate 2',
    metroExit: 'Janpath Metro Gate 2 — 50m straight to main craft row',
    bestSafeHours: '11:00 AM – 8:00 PM',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.7,
    reviewsCount: 980,
    distanceKm: 5.6,
    tags: ['Silver Jewellery', 'Boho Linen', 'Crafts', 'Central Delhi'],
    curatedTips: [
      'The Tibetan Ring lane behind the main road is quieter and has authentic turquoise stones.',
      'CP Police Pink Booth is located just 150m away near the Janpath intersection.',
      'Pair with cold coffee at DePaul’s right opposite the jewellery stalls.'
    ],
    marketSpecific: {
      knownFor: 'Bohemian linen dresses, oxidized silver oxidised chokers & Kashmiri shawls',
      specialties: ['Silver Jewellery', 'Mirrorwork Kurtis', 'Brass Statues', 'Pashmina Stoles'],
      bargainingTips: 'Start negotiations at 50-60% for unhallmarked artisanal items.',
      bestLane: 'Tibetan Market Arcade & Leather Lane',
      atmAvailability: 'State Bank of India at Janpath roadhead',
      safestEntryExit: 'Janpath Metro Gate 2 has direct police picket & lighted footpath',
      recommendedTime: '3:00 PM – 6:30 PM for gentle golden hour browsing'
    },
    coordinates: { lat: 28.6258, lng: 77.2185 }
  },
  {
    id: 'gk-m-block',
    name: 'GK-1 M-Block Market',
    category: 'shopping',
    area: 'South Delhi',
    neighborhood: 'Greater Kailash',
    tagline: 'Chic fashion boutiques, designer footwear, co-ords & street chaat',
    description: 'South Delhi’s trendiest open-air market for young women. Packed with footwear studios, stylish western co-ord sets, cosmetic counters, and famous street kulfi.',
    heroImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=400&q=80',
    budgetTier: 2,
    priceRange: '₹800–3,500 spend',
    safetyScore: 9.8,
    crowdDensity: 2,
    metroLine: 'Magenta Line',
    metroStation: 'Greater Kailash Metro',
    metroDistance: '350m well-lit path · Gate 1',
    metroExit: 'Gate 1 — 350m straight into central market fountain',
    bestSafeHours: '11:00 AM – 9:00 PM (Tuesdays closed)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.8,
    reviewsCount: 2100,
    distanceKm: 4.1,
    tags: ['Footwear', 'Co-ord Sets', 'Boutiques', 'Safe South Delhi'],
    curatedTips: [
      'Footwear stores on the upper level have custom sizes and block heels.',
      'Well-lit perimeter with private security guards at each quadrant entrance.'
    ],
    marketSpecific: {
      knownFor: 'Designer party footwear, contemporary ethnic wear & aesthetic jewellery',
      specialties: ['Embroidered Juttis', 'Satin Co-ords', 'Bridal Clutches', 'Silver Rings'],
      bargainingTips: 'Light bargaining in smaller standalone shoe stalls (10-20%).',
      bestLane: 'Central Fountain Circle & South Arcade',
      atmAvailability: 'HDFC, Kotak & Standard Chartered ATMs on ground lane',
      safestEntryExit: 'Main Gate 1 with registered security desk & valet stand',
      recommendedTime: '3:30 PM – 7:30 PM'
    },
    coordinates: { lat: 28.5528, lng: 77.2408 }
  },
  {
    id: 'dilli-haat-ina',
    name: 'Dilli Haat (INA)',
    category: 'shopping',
    area: 'Central Delhi',
    neighborhood: 'Heritage & Lodhi',
    tagline: 'Walled open-air craft village with verified artisans from every Indian state',
    description: 'An expansive, gated cultural village operated by Delhi Tourism. Features thatched-roof craft stalls rotated every fortnight, regional food courts, and clean paved brick paths.',
    heroImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    budgetTier: 2,
    priceRange: '₹500–2,500 spend',
    safetyScore: 9.8,
    crowdDensity: 2,
    metroLine: 'Yellow / Pink Line',
    metroStation: 'Dilli Haat INA Metro',
    metroDistance: '30m direct step · Gate 5',
    metroExit: 'Gate 5 — 30m direct step to security entry ticket counter',
    bestSafeHours: '10:30 AM – 9:30 PM (Daily)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 3100,
    distanceKm: 2.1,
    tags: ['Gated Village', 'Handicrafts', 'Pottery', 'Regional Food'],
    curatedTips: [
      'Gated and ticketed entry (₹30) ensures quiet, orderly, and ultra-safe ambience.',
      'Try the steamed fruit momos at the Sikkim Stall and Kashmiri Kahwa at sunset.'
    ],
    marketSpecific: {
      knownFor: 'Authentic regional textiles, terracotta pottery, handlooms & Madhubani paintings',
      specialties: ['Kashmiri Pashmina', 'Chanderi Sarees', 'Blue Pottery', 'Handmade Mojaris'],
      bargainingTips: 'Artisans hold government identity cards; fair bargaining only.',
      bestLane: 'Central courtyard pottery & silk handlooms',
      atmAvailability: 'Canara Bank ATM inside the complex entrance',
      safestEntryExit: 'Metro Gate 5 opens directly at the gated security barrier',
      recommendedTime: '4:30 PM – 8:00 PM when courtyard lanterns turn on'
    },
    coordinates: { lat: 28.5732, lng: 77.2081 }
  },
  {
    id: 'mkt-tibetan-colony',
    name: 'Majnu Ka Tila Tibetan Colony',
    category: 'shopping',
    area: 'North Delhi',
    neighborhood: 'Majnu Ka Tila',
    tagline: 'Vibrant narrow alleyways for Korean skincare, oversized knits & silver charms',
    description: 'Delhi’s little Tibet! A pedestrian-only enclave filled with cozy streetwear shops, authentic Korean beauty sheet masks, handmade scented incense, and momo cafes.',
    heroImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=400&q=80',
    budgetTier: 1,
    priceRange: '₹300–1,500 spend',
    safetyScore: 9.4,
    crowdDensity: 2,
    metroLine: 'Yellow Line',
    metroStation: 'Vidhan Sabha Metro',
    metroDistance: '5-min safe e-rickshaw · Gate 2',
    metroExit: 'Vidhan Sabha Gate 2 — Board registered e-rickshaw directly to Main Monastery Arch',
    bestSafeHours: '11:00 AM – 8:00 PM',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.7,
    reviewsCount: 1800,
    distanceKm: 8.4,
    tags: ['Korean Beauty', 'Tibetan Crafts', 'Streetwear', 'Oversized Sweaters'],
    curatedTips: [
      'Vehicle-free pedestrian cobblestone lanes ensure peaceful shopping.',
      'Check the Korean cosmetics boutiques near the central Buddhist temple.'
    ],
    marketSpecific: {
      knownFor: 'Korean skincare, affordable anime merchandise, boots & Tibetan turquoise jewellery',
      specialties: ['Korean Sheet Masks', 'Chunky Boots', 'Oversized Cardigans', 'Prayer Flags'],
      bargainingTips: 'Modest discounts on bundles (e.g. buying multiple skincare items).',
      bestLane: 'Temple Square Alley & Monastery Walkway',
      atmAvailability: 'PNB ATM at Main Monastery entrance',
      safestEntryExit: 'Main Monastery Gate Arch with police desk and e-rickshaw stand',
      recommendedTime: '1:00 PM – 6:00 PM'
    },
    coordinates: { lat: 28.7022, lng: 77.2280 }
  },

  // ===================== MALLS =====================
  {
    id: 'select-citywalk',
    name: 'Select CITYWALK',
    category: 'mall',
    area: 'South Delhi',
    neighborhood: 'Saket',
    tagline: 'Premier lifestyle destination with outdoor plazas, Sephora, Zara & verified cab bays',
    description: 'Delhi’s benchmark luxury shopping and entertainment center. Features an open-air central plaza with water fountains, high-end global beauty and apparel labels, and verified app-cab boarding decks.',
    heroImage: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?auto=format&fit=crop&w=400&q=80',
    budgetTier: 3,
    priceRange: '₹1,500–10,000+ spend',
    safetyScore: 9.9,
    crowdDensity: 3,
    metroLine: 'Yellow Line',
    metroStation: 'Malviya Nagar / Saket Metro',
    metroDistance: '5-min safe e-rickshaw · Gate 3',
    metroExit: 'Malviya Nagar Gate 3 — 5-min direct safe e-rickshaw strip',
    bestSafeHours: '10:00 AM – 11:00 PM (Daily)',
    verifiedLighting: true,
    pinkBoothNearby: true,
    womenLedOrFriendly: true,
    rating: 4.9,
    reviewsCount: 4200,
    distanceKm: 5.8,
    tags: ['Sephora', 'Zara', 'Outdoor Plaza', 'Verified Cab Bay', 'Luxury Security'],
    curatedTips: [
      'Dedicated Uber/BluSmart pickup lounge in Basement 1 with security attendants.',
      'The central open courtyard hosts seasonal flea markets and live acoustic sets on weekends.',
      'Cleanest multi-facility powder rooms in South Delhi with nursing & vanity counters.'
    ],
    mallSpecific: {
      brandChips: ['Sephora', 'Zara', 'H&M Home', 'Jo Malone', 'Massimo Dutti', 'Muji', 'Nykaa Luxe', 'MAC', 'Bobbi Brown'],
      verifiedCabPickup: 'P1 Level App Cab Zone & Ground East Gate Concierge',
      securityLevel: 'Round-the-clock trained marshals, metal screening & 300+ CCTV grid',
      floorDirectory: [
        'Ground Floor: Sephora, Zara, Jo Malone, MAC, Bobbi Brown',
        'First Floor: H&M Home, Muji, Massimo Dutti, Forever New',
        'Second Floor: PVR Gold Class, Food Hall, Harajuku Tokyo Cafe'
      ],
      nearbyCafes: [
        { name: 'Paul French Bakery', type: 'Artisanal Pastries & Coffee' },
        { name: 'Harajuku Tokyo Cafe', type: 'Japanese Fluffy Pancakes' },
        { name: 'Burma Burma', type: 'Tea Room & Pan-Asian' }
      ]
    },
    coordinates: { lat: 28.5284, lng: 77.2195 }
  },
  {
    id: 'dlf-promenade',
    name: 'DLF Promenade & Emporio',
    category: 'mall',
    area: 'South Delhi',
    neighborhood: 'Vasant Kunj',
    tagline: 'Sophisticated fashion haven in Vasant Kunj with curated dining and sheltered cab lounges',
    description: 'An elegant high-fashion mall in the upscale Vasant Kunj enclave. Houses beloved international labels, gourmet grocery markets, high-end cineplex, and refined alfresco bistros.',
    heroImage: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1000&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=400&q=80',
    budgetTier: 3,
    priceRange: '₹2,000–12,000+ spend',
    safetyScore: 9.8,
    crowdDensity: 2,
    metroLine: 'Magenta Line',
    metroStation: 'Vasant Vihar Metro',
    metroDistance: '8-min safe app cab · Gate 1',
    metroExit: '10-min safe app cab from Vasant Vihar Metro Gate 1',
    bestSafeHours: '11:00 AM – 11:00 PM',
    verifiedLighting: true,
    pinkBoothNearby: false,
    womenLedOrFriendly: true,
    rating: 4.8,
    reviewsCount: 2800,
    distanceKm: 7.1,
    tags: ['High Street', 'Gourmet Food', 'Cineplex', 'Vasant Kunj'],
    curatedTips: [
      'Connected via indoor security corridor to DLF Emporio for luxury browsing.',
      'Valet parking and sheltered cab bays ensure you never wait on an open roadside.'
    ],
    mallSpecific: {
      brandChips: ['Zara', 'Mango', 'Marks & Spencer', 'Steve Madden', 'Bath & Body Works', 'Forest Essentials', 'Dune London'],
      verifiedCabPickup: 'Main Promenade Porch Gate 2 & Sheltered Valet Deck',
      securityLevel: 'Comprehensive private enclave surveillance & bag screening',
      floorDirectory: [
        'Ground Floor: Zara, Mango, Forest Essentials, Bath & Body Works',
        'First Floor: Marks & Spencer, Steve Madden, Aldo',
        'Top Floor: Cineplex, Smoke House Deli, Mamagoto'
      ],
      nearbyCafes: [
        { name: 'Cafe Delhi Heights', type: 'Comfort & Burgers' },
        { name: 'Smoke House Deli', type: 'European Bistro' },
        { name: 'Chaayos Premium', type: 'Chai & Snacks' }
      ]
    },
    coordinates: { lat: 28.5422, lng: 77.1558 }
  }
];

export const SAFE_ROUTES: SafeRoute[] = [
  {
    id: 'route-lodhi-to-khan',
    title: 'Lodhi Garden Gate 1 → Khan Market Promenade',
    from: 'Lodhi Garden Main Gate',
    to: 'Khan Market Middle Lane',
    etaMinutes: 9,
    distanceKm: 1.4,
    safetyScore: 9.9,
    routeType: 'recommended',
    estimatedFare: '₹15 Walking / ₹40 E-Rickshaw',
    lightingRating: '99% Verified LED Boulevard',
    crowdHeatmap: 'green',
    metroLegs: [
      {
        line: 'Violet Line',
        colorHex: '#E5DFF2',
        fromStation: 'JLN Stadium',
        toStation: 'Khan Market',
        stationsCount: 1,
        pinkCoachPosition: 'Coach 1 (Ladies Coach)'
      }
    ],
    walkSegments: [
      {
        instruction: 'Walk along the wide, paved Amrita Shergill Marg footpath under continuous LED lighting',
        distance: '450m',
        litRating: 'Excellent',
        cctvCovered: true
      },
      {
        instruction: 'Cross at the pelican signal into Khan Market West Gate with traffic marshal on duty',
        distance: '150m',
        litRating: 'Excellent',
        cctvCovered: true
      }
    ],
    roadConditions: [
      { id: 'rc-1', type: 'paved', label: 'Wide Paver Pavement', description: 'Smooth, obstacle-free stone footpath with tactile curbs' },
      { id: 'rc-2', type: 'well_lit_crossing', label: 'Pelican Guarded Crossing', description: 'Illuminated zebra crossing with CCTV pole #19' }
    ],
    safetyAnchors: [
      { id: 'sa-1', name: 'Delhi Police Pink Booth Lodhi', type: 'pink_booth', address: 'Gate 1 Intersection', distanceFromRoute: 'Directly on route' },
      { id: 'sa-2', name: 'Max Medcentre Diplomatic', type: 'hospital', address: 'Max House, Dr APJ Abdul Kalam Rd', distanceFromRoute: '200m away' },
      { id: 'sa-3', name: 'Khan Market 24/7 Security Desk', type: 'police', address: 'Middle Lane Gate', distanceFromRoute: 'At destination' }
    ],
    safeCheckpoints: [
      'Lodhi Garden Guard Station 1',
      'NDMC Solar CCTV Pole #42',
      'Khan Market Police Picket'
    ]
  },
  {
    id: 'route-sarojini-to-diggin',
    title: 'Sarojini Nagar Market → Diggin Chanakyapuri',
    from: 'Sarojini Nagar Gate 1',
    to: 'Diggin, Santushti Complex',
    etaMinutes: 14,
    distanceKm: 3.4,
    safetyScore: 9.8,
    routeType: 'recommended',
    estimatedFare: '₹30 Metro / ₹90 Auto',
    lightingRating: '96% Verified LED Footpaths',
    crowdHeatmap: 'amber',
    metroLegs: [
      {
        line: 'Pink Line',
        colorHex: '#FBE4E8',
        fromStation: 'Sarojini Nagar',
        toStation: 'Durgabai Deshmukh South Campus',
        stationsCount: 2,
        pinkCoachPosition: 'Coach 1 (Frontmost in train direction)'
      }
    ],
    walkSegments: [
      {
        instruction: 'Walk along the dedicated shaded footpath from Sarojini Gate 1 to Metro entrance',
        distance: '120m',
        litRating: 'Excellent',
        cctvCovered: true
      },
      {
        instruction: 'From South Campus Metro Gate 2, board prepaid green auto or BluSmart into Santushti enclave',
        distance: '800m',
        litRating: 'Excellent',
        cctvCovered: true
      }
    ],
    roadConditions: [
      { id: 'rc-3', type: 'pedestrian_zone', label: 'Covered Metro Walkway', description: 'Gated foot path from market circle to turnstiles' },
      { id: 'rc-4', type: 'broken_pavement', label: 'Minor uneven brick patch', description: 'Brief 15m repair near auto curb, well-lit' }
    ],
    safetyAnchors: [
      { id: 'sa-4', name: 'Sarojini Pink Booth (24/7)', type: 'pink_booth', address: 'Gate 1 Metro Circle', distanceFromRoute: 'Directly on route' },
      { id: 'sa-5', name: 'DMRC Station CISF Command', type: 'metro_cisf', address: 'Pink Line Concourse', distanceFromRoute: 'Inside metro' },
      { id: 'sa-6', name: 'Santushti Military Police Gate', type: 'police', address: 'Air Force Enclave Post', distanceFromRoute: 'At gate' }
    ],
    safeCheckpoints: [
      'Sarojini Pink Booth (24/7 Women Helpdesk)',
      'DMRC Pink Line Customer Care Desk',
      'Santushti Complex Guardhouse'
    ]
  },
  {
    id: 'route-saket-to-mehrauli',
    title: 'Select CITYWALK → The Grammar Room',
    from: 'Select CITYWALK Saket',
    to: 'The Grammar Room, Mehrauli',
    etaMinutes: 16,
    distanceKm: 4.8,
    safetyScore: 9.6,
    routeType: 'cab-priority',
    estimatedFare: '₹140 App Cab (BluSmart/Uber)',
    lightingRating: '95% Well-lit Arterial Avenue',
    crowdHeatmap: 'rose',
    metroLegs: [
      {
        line: 'Yellow Line',
        colorHex: '#D4AF7A',
        fromStation: 'Malviya Nagar',
        toStation: 'Qutub Minar',
        stationsCount: 2,
        pinkCoachPosition: 'Coach 1 (Ladies Coach)'
      }
    ],
    walkSegments: [
      {
        instruction: 'Board registered cab inside Mall P1 Lounge directly to One Style Mile gate',
        distance: 'Door-to-door',
        litRating: 'Excellent',
        cctvCovered: true
      }
    ],
    roadConditions: [
      { id: 'rc-5', type: 'paved', label: 'Sheltered Valet Deck', description: 'Indoor CCTV monitored boarding bay' }
    ],
    safetyAnchors: [
      { id: 'sa-7', name: 'Select CITYWALK Security Command', type: 'open_store', address: 'P1 Level Concierge', distanceFromRoute: 'At origin' },
      { id: 'sa-8', name: 'Malviya Nagar Police Post', type: 'police', address: 'Press Enclave Road', distanceFromRoute: '300m away' }
    ],
    safeCheckpoints: [
      'Select CITYWALK Concierge & Marshals',
      'Malviya Nagar Metro CISF Post',
      'One Style Mile Guard Gatehouse'
    ]
  }
];

export const DEFAULT_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'c-1',
    name: 'Maa',
    relation: 'Mother',
    phone: '+91 98110 24890',
    initials: 'M',
    isPrimary: true,
    notifyWhatsApp: true,
    notifySMS: true
  },
  {
    id: 'c-2',
    name: 'Ananya (Di)',
    relation: 'Sister',
    phone: '+91 98730 11234',
    initials: 'A',
    isPrimary: true,
    notifyWhatsApp: true,
    notifySMS: true
  },
  {
    id: 'c-3',
    name: 'Rhea Bff',
    relation: 'Roommate',
    phone: '+91 99100 87654',
    initials: 'R',
    isPrimary: false,
    notifyWhatsApp: true,
    notifySMS: true
  },
  {
    id: 'c-4',
    name: 'Papa',
    relation: 'Father',
    phone: '+91 98101 44556',
    initials: 'P',
    isPrimary: false,
    notifyWhatsApp: true,
    notifySMS: false
  }
];

export const DEFAULT_FAKE_CALL_SETTINGS: FakeCallSettings = {
  callerName: 'Maa',
  callerRelation: 'Mother',
  scriptPreset: 'checking_in',
  delaySeconds: 3
};

export const PRESET_DAY_PLANS: GirlsDayPlan[] = [
  {
    id: 'plan-lodhi-sundar-coffee',
    title: 'Heritage Gardens & Lakeside Romance',
    budgetType: 'budget',
    area: 'Central Delhi',
    purpose: 'Gardens & Lakeside',
    totalSpend: 750,
    curatedBy: 'SafeHer Bestie Ananya',
    timeline: [
      {
        step: 1,
        time: '3:30 PM',
        place: DELHI_PLACES[0], // Lodhi Garden
        type: 'outing',
        costEstimate: 0,
        note: 'Stroll past Sheesh Gumbad and Mughal rose beds in gentle daylight.'
      },
      {
        step: 2,
        time: '5:00 PM',
        place: DELHI_PLACES[1], // Sundar Nursery
        type: 'outing',
        costEstimate: 50,
        note: 'Golden hour reflection over Mughal lake pavilion.'
      },
      {
        step: 3,
        time: '6:30 PM',
        place: DELHI_PLACES[8], // Fabcafe Sundar Nursery
        type: 'cafe',
        costEstimate: 700,
        note: 'Warm jackfruit cutlets and almond cold brew by the lake.'
      }
    ]
  },
  {
    id: 'plan-thrift-coffee',
    title: 'Thrift & Aesthetic Coffee in South Delhi',
    budgetType: 'budget',
    area: 'South Delhi',
    purpose: 'Thrift & Coffee',
    totalSpend: 1450,
    curatedBy: 'SafeHer Bestie Jahnvi',
    timeline: [
      {
        step: 1,
        time: '11:30 AM',
        place: DELHI_PLACES[13], // Sarojini
        type: 'market',
        costEstimate: 800,
        note: 'Best daylight hours for browsing Lane 11. Pick export surplus linen & sunglasses.'
      },
      {
        step: 2,
        time: '2:30 PM',
        place: DELHI_PLACES[6], // Diggin
        type: 'cafe',
        costEstimate: 650,
        note: 'Board Pink Line metro to South Campus, then relax with roseberry iced tea & pizza.'
      }
    ]
  }
];
