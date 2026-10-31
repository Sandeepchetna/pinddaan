import { GayaSacredSthali, RitualPackage, Pandit, Ancestor, Booking, Lead, MarketplaceVendor, HeroSlide } from '../types';

export interface GovtHelpline {
  designation: string;
  contact: string;
  type: 'ADMIN' | 'AMBULANCE' | 'POLICE' | 'MELA_CONTROL';
}

export const GOVT_HELPLINES: GovtHelpline[] = [
  { designation: 'District Magistrate (DM), Gaya Ji', contact: '0631-2222900', type: 'ADMIN' },
  { designation: 'Deputy Development Commissioner (DDC), Gaya Ji', contact: '0631-2224044', type: 'ADMIN' },
  { designation: 'City Commissioner, Gaya Municipal Corp.', contact: '8544144311', type: 'ADMIN' },
  { designation: 'ADM Disaster Management & Mela Control', contact: '8789396142', type: 'MELA_CONTROL' },
  { designation: 'Sub-Divisional Officer (SDO Sadar), Gaya Ji', contact: '9473191246', type: 'ADMIN' },
  { designation: 'Emergency Pilgrim Ambulance Fleet Desk 1', contact: '7783889568', type: 'AMBULANCE' },
  { designation: 'Emergency Pilgrim Ambulance Fleet Desk 2', contact: '9939933514', type: 'AMBULANCE' },
  { designation: 'Emergency Pilgrim Ambulance Fleet Desk 3', contact: '8521507217', type: 'AMBULANCE' }
];

export const GAYA_SACRED_STHALIS: GayaSacredSthali[] = [
  {
    id: 'falgu-river',
    name: 'Falgu River (Devghat & Sita Kund)',
    hindiName: 'फल्गु नदी (देवघाट एवं सीता कुंड)',
    tagline: 'The Sacred Underground Stream for Divine Tarpan',
    description: 'The sacred river where Mother Sita performed sand Pind Daan for King Dasharatha. Pilgrims begin their Gaya Shradh with sacred Vedic Snana, Kusha grass purification, and barley Tarpan.',
    image: '/images/gaya_vishnupad.jpg',
    keySpots: ['Devghat (मुख्य देवघाट)', 'Sita Kund (सीता कुंड)', 'Brahma Kund', 'Ramgaya Ghat'],
    scripturalSignificance: 'Vayu Purana: Offering water with black sesame and reciting the Gayatri Tarpan at Falgu cleanses three generations of ancestral debts.',
    dayNumber: 'Day 1: Snana & Tarpan',
    rating: 4.99,
    reviewsCount: 8450,
  },
  {
    id: 'vishnupad-temple',
    name: 'Sri Vishnupad Mandir (Lord Vishnu Footprint)',
    hindiName: 'श्री विष्णुपद मंदिर (चरण कमल)',
    tagline: 'The 40cm Basalt Footprint of Lord Vishnu for Instant Moksha',
    description: 'The supreme sanctum sanctorum of Gaya Ji. The 40cm footprint of Lord Vishnu is embedded in solid basalt rock where Gayasura received his cosmic boon. Offering pinds here grants eternal Vaikuntha.',
    image: '/images/pind_daan_vidhi.jpg',
    keySpots: ['Vishnupad Garbhagriha', 'Solah Vedi (16 Altars)', 'Brahma Mangalpuri', 'Gajasur Shila'],
    scripturalSignificance: 'Garuda Purana: A single pind placed on Lord Vishnu’s holy footprint releases all departed ancestors from Yamaloka.',
    dayNumber: 'Day 2: Maha Pind Pradaan',
    rating: 5.0,
    reviewsCount: 14200,
  },
  {
    id: 'akshayavat',
    name: 'Akshayavat (The Immortal Banyan Tree)',
    hindiName: 'अक्षयवट (अमर वटवृक्ष)',
    tagline: 'The Eternal Tree Blessed by Mother Sita for 21 Generations',
    description: 'The indestructible holy tree that witnessed Mother Sita’s sacred pind daan. Offering the final Pind and receiving ancestral blessings here completes the Gaya pilgrimage, bestowing unbroken lineage peace.',
    image: '/images/akshay_vat.jpg',
    keySpots: ['Akshayavat Tree Altar', 'Gayawal Panda Mandap', 'Rukmini Kund', 'Prapitamaha Temple'],
    scripturalSignificance: 'Padma Purana: Rites concluded under the shade of Akshayavat remain inexhaustible (Akshaya) for cosmic eons.',
    dayNumber: 'Day 3: Purna Ahuti & Blessings',
    rating: 4.98,
    reviewsCount: 11300,
  }
];

export const GAYA_SACRED_VEDIS = [
  { name: 'Falgu River (Devghat)', desc: 'The holy underground river where Lord Rama and Mother Sita performed sacred ancestor tarpans with Vedic mantras.', day: 'Day 1' },
  { name: 'Sri Vishnupad Temple', desc: 'The 40cm footprint of Lord Vishnu engraved in solid basalt rock where Pinds are offered for instant Moksha.', day: 'Day 1 & 2' },
  { name: 'Akshayavat (Immortal Banyan)', desc: 'The undying holy tree blessed by Mother Sita. Offering Pinds here bestows eternal salvation to 21 generations.', day: 'Day 2 & 3' },
  { name: 'Pretshila Hill (Pretkut)', desc: 'Sacred hilltop dedicated to pacifying spirits that passed unnaturally and relieving severe ancestral distress.', day: 'Special / Day 3' },
  { name: 'Ramshila Hill', desc: 'Ancient hilltop altar where Lord Rama performed ancestral rites and consecrated Lord Shiva.', day: 'Day 2' },
  { name: 'Sita Kund', desc: 'Where Mother Sita offered sand pinds (*Balu Pind*) for King Dasharatha with the sacred Phalgu as witness.', day: 'Day 2' },
  { name: 'Ramkund & Brahmakund', desc: 'Consecrated water bodies used for purification, Vedic Snana, and ritual Sankalp.', day: 'Day 1' },
  { name: 'Kagbali & Panchabali', desc: 'Prescribed offerings to cows, dogs, crows, ants, and devatas as mandated in Dharma Sindhu.', day: 'Daily' }
];

export const RITUAL_PACKAGES: RitualPackage[] = [
  // ── ONLY PIND DAAN PACKAGES (PURE VEDIC RITUALS) ──
  {
    id: 'uttam-pind-daan',
    slug: 'uttam-pind-daan',
    title: 'Uttam Pind Daan',
    hindiTitle: 'उत्तम पिंडदान (7 कुल उद्धार)',
    duration: '3–3.5 Hours',
    mode: ['IN_PERSON', 'REMOTE_LIVE'],
    badge: 'SARVA SHRESTHA VIDHI',
    priceINR: 11000,
    priceUSD: 140,
    shortDesc: 'The most comprehensive Vedic ritual featuring Kalash Puja, 7 Kul Ka Pind Daan, and 5 Vastra & Patra Daan at Vishnupad & Falgu River.',
    inclusions: [
      'Kalash Puja',
      '7 Kul Ka Pind Daan',
      '5 Vastra and Patra Daan',
      'Required Puja Samagri Included',
      "Pandit Ji's Charges (Dakshina) Included"
    ],
    exclusions: [
      'Brahmin Bhojan (Charged Separately)',
      'Additional Brahmin Dakshina (Charged Separately)',
      'Any additional rituals not mentioned (Charged Separately)',
      'Hotel Accommodation & Cab Transfers (Pure Ritual Only)'
    ],
    scripturalSignificance: 'Vayu Purana: Performing 7 Kul Pind Daan at Vishnupad liberates seven ancestral lineages into Vishnu Lok.',
    popularFor: 'Devotees seeking complete 7-lineage ancestral peace at Gaya Ji.',
    vedisCovered: ['Falgu Devghat', 'Vishnupad Footprint', 'Akshayavat'],
    featured: true,
    image: '/images/gaya_vishnupad.jpg',
    panditType: 'Verified Gaya Panda',
    foodIncluded: 'Not Included (Brahmin Bhojan Charged Separately)'
  },
  {
    id: 'madhyam-pind-daan',
    slug: 'madhyam-pind-daan',
    title: 'Madhyam Pind Daan',
    hindiTitle: 'मध्यम पिंडदान (वैदिक विधि)',
    duration: '2–2.5 Hours',
    mode: ['IN_PERSON', 'REMOTE_LIVE'],
    badge: 'MOST POPULAR VIDHI',
    priceINR: 7500,
    priceUSD: 95,
    shortDesc: 'Traditional Vedic Gaya Ji Pind Daan with Kalash Puja, complete Pind Daan Vidhi, and 3 Vastra & Patra Daan for ancestral peace.',
    inclusions: [
      'Kalash Puja',
      'Pind Daan Vidhi',
      '3 Vastra and Patra Daan',
      'Required Puja Samagri Included',
      "Pandit Ji's Charges (Dakshina) Included"
    ],
    exclusions: [
      'Brahmin Bhojan (Charged Separately)',
      'Additional Brahmin Dakshina (Charged Separately)',
      'Any additional rituals not mentioned (Charged Separately)',
      'Hotel Accommodation & Cab Transfers (Pure Ritual Only)'
    ],
    scripturalSignificance: 'Garuda Purana: Authentic Kalash Puja and Pind Daan with Patra Daan fulfills all Pitru obligations.',
    popularFor: 'Families performing standard complete Pind Daan vidhi.',
    vedisCovered: ['Falgu Devghat', 'Vishnupad Footprint'],
    featured: true,
    image: '/images/pind_daan_vidhi.jpg',
    panditType: 'Verified Gaya Panda',
    foodIncluded: 'Not Included (Brahmin Bhojan Charged Separately)'
  },
  {
    id: 'kanishtha-pind-daan',
    slug: 'kanishtha-pind-daan',
    title: 'Kanishtha Pind Daan',
    hindiTitle: 'कनिष्ठ पिंडदान (सरल विधि)',
    duration: '2 Hours',
    mode: ['IN_PERSON', 'REMOTE_LIVE'],
    badge: 'SARAL VEDIC VIDHI',
    priceINR: 4500,
    priceUSD: 60,
    shortDesc: 'Essential Vedic Pind Daan Vidhi with 2 Thali Daan performed under authentic Gaya Panda guidance at Vishnupad & Falgu.',
    inclusions: [
      'Pind Daan Vidhi',
      '2 Thali Daan',
      'Required Puja Samagri Included',
      "Pandit Ji's Charges (Dakshina) Included"
    ],
    exclusions: [
      'Brahmin Bhojan (Charged Separately)',
      'Additional Brahmin Dakshina (Charged Separately)',
      'Any additional rituals not mentioned (Charged Separately)',
      'Hotel Accommodation & Cab Transfers (Pure Ritual Only)'
    ],
    scripturalSignificance: 'Offering Pinda with Thali Daan at Falgu bank satisfies departed spirits.',
    popularFor: 'Essential Pind Daan on limited timeframe.',
    vedisCovered: ['Falgu Devghat', 'Vishnupad Footprint'],
    featured: true,
    image: '/images/akshay_vat.jpg',
    panditType: 'Verified Gaya Panda',
    foodIncluded: 'Not Included (Brahmin Bhojan Charged Separately)'
  },
  {
    id: 'shradh-pind-daan',
    slug: 'shradh-pind-daan',
    title: 'Shradh Pind Daan',
    hindiTitle: 'श्राद्ध पिंडदान (मूल विधि)',
    duration: '1–1.5 Hours',
    mode: ['IN_PERSON', 'REMOTE_LIVE'],
    badge: 'CORE SHRADDHA VIDHI',
    priceINR: 3100,
    priceUSD: 40,
    shortDesc: 'Focused Vedic Pind Daan Vidhi only at holy Falgu River and Vishnupad with authentic gotra sankalp.',
    inclusions: [
      'Pind Daan Vidhi Only',
      'Required Puja Samagri Included',
      "Pandit Ji's Charges (Dakshina) Included"
    ],
    exclusions: [
      'Brahmin Bhojan (Charged Separately)',
      'Additional Brahmin Dakshina (Charged Separately)',
      'Any additional rituals not mentioned (Charged Separately)',
      'Hotel Accommodation & Cab Transfers (Pure Ritual Only)'
    ],
    scripturalSignificance: 'Basic scriptural tarpan and pinda offering per Vedic Dharma Sindhu.',
    popularFor: 'Core shraddha ceremony in Gaya Ji.',
    vedisCovered: ['Falgu Devghat', 'Vishnupad Footprint'],
    featured: true,
    image: '/images/gaya_drone.jpg',
    panditType: 'Verified Gaya Panda',
    foodIncluded: 'Not Included (Brahmin Bhojan Charged Separately)'
  },

  // ── PACKAGES WITH STAY & SPECIAL PUJAS ──
  {
    id: 'gaya-1day-pind-daan',
    slug: 'gaya-ji-1-day-pind-daan',
    title: 'Gaya Ji 1-Day Pind Daan',
    hindiTitle: 'गया जी 1-दिवसीय पिंडदान (होटल एवं वाहन सहित)',
    duration: '1 Day (4 to 6 Hours)',
    mode: ['IN_PERSON', 'REMOTE_LIVE'],
    badge: 'NEW REDUCED RATE',
    priceINR: 7499,
    priceUSD: 95,
    shortDesc: 'Single-day layover rites at Falgu River & Vishnupad. Gold Plan: Non-AC Room ₹7,499 / AC Room ₹8,499. Platinum VIP: Deluxe Hotel & AC Cab ₹12,499.',
    inclusions: [
      'Certified Gaya Teerth Purohit',
      'Ritual at Falgu Ghat & Vishnupad Temple',
      'Complete Organic Samagri Kit (Jau, Tila, Ghee)',
      '2-Person Private Room Stay (Non-AC ₹7,499 / AC Room ₹8,499) & Pure Satvik Food',
      'Gaya Ji Railway Station | Airport Pickup & Drop (Auto)',
      'Puja Samagri and Pandit Dakshina Included'
    ],
    exclusions: ['Extended 45-Vedi tour'],
    scripturalSignificance: 'Vishnu Purana states that offering barley at Falgu dissolves generational sins.',
    popularFor: 'Busy pilgrims on a single-day itinerary desiring station pickup and room.',
    vedisCovered: ['Falgu Devghat', 'Vishnupad Footprint'],
    featured: true,
    image: '/images/pind_daan_vidhi.jpg',
    panditType: 'Certified Gaya Teerth Purohit'
  },
  {
    id: 'gaya-tri-sthali-3day',
    slug: 'gaya-ji-complete-3-day-pind-daan-3-days-',
    title: 'Gaya Ji Complete 3-Day Pind Daan (3 Days)',
    hindiTitle: 'गया जी संपूर्ण त्रि-स्थली महापिंड दान (3 दिवसीय)',
    duration: '3 Days / 3 Nights',
    mode: ['IN_PERSON', 'REMOTE_LIVE'],
    badge: 'Bihar Govt & Shastra Prescribed Vidhi',
    priceINR: 21449,
    priceUSD: 250,
    shortDesc: 'The complete Vedic ritual covering all 3 primary sacred points in Gaya Ji: Falgu River, Lord Vishnupad Footprint, and Akshayavat (Immortal Tree).',
    inclusions: [
      'Dedicated 4th-Gen Vedic Teerth Purohit (Gaya Panda)',
      'All 3 Primary Sacred Sites (Falgu River, Vishnupad Mandir, Akshayavat)',
      '100% Pure Organic Samagri (Barley, Black Sesame, Desi Ghee, Gangotri Jal)',
      '3-Night AC 2-Person Private Room Stay & Pure Satvik Food',
      'Gaya Ji Railway Station | Airport Pickup & Drop (Auto)',
      'Puja Samagri and Dakshina Included'
    ],
    exclusions: ['Personal shopping Dakshina'],
    scripturalSignificance: 'Garuda Purana (Pretakalpa Ch. 11): Performing Pind Daan at all 3 Sthalis ensures permanent liberation from Pitru Yoni.',
    popularFor: 'Families seeking complete, lifelong peace for departed ancestors.',
    vedisCovered: ['Falgu Devghat', 'Vishnupad Footprint', 'Akshayavat', 'Sita Kund'],
    featured: true,
    image: '/images/gaya_vishnupad.jpg',
    panditType: '4th-Gen Vedic Teerth Purohit (Gaya Panda)'
  },
  {
    id: 'pitra-dosh-tripindi',
    slug: 'pitra-dosh-puja-tripindi-shradh-',
    title: 'Pitra Dosh Puja ( Tripindi Shradh)',
    hindiTitle: 'पितृ दोष पूजा (त्रिपिंडी श्राद्ध)',
    duration: '1 Day (4-5 Hours)',
    mode: ['IN_PERSON', 'REMOTE_LIVE'],
    badge: 'MOST POPULAR',
    priceINR: 10449,
    priceUSD: 115,
    shortDesc: 'Phalgu River early cleansing rites, tarpan, and Tripindi Homa with Ghee Ahutis on the bank of Falgu River.',
    inclusions: [
      'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji',
      'Altar Rites with Wheat Sattu',
      'Tripindi Homa with Ghee Ahutis on Bank of Falgu River',
      'Complete Puja Samagri & Gotra Sankalp Included',
      'Pure Vedic Ritual (No Pickup/Drop • No Food • No Stay)'
    ],
    exclusions: ['Cab Pickup/Drop, Hotel Accommodation, Food & Meals'],
    scripturalSignificance: 'Prescribed in Dharma Sindhu for relieving persistent Pitru Dosh afflictions.',
    popularFor: 'Resolving Pitru Dosh and ancestral unrest.',
    vedisCovered: ['Falgu River Bank'],
    featured: true,
    image: '/images/akshay_vat.jpg',
    panditType: 'Verified Gaya Panda'
  },
  {
    id: 'gaya-narayan-bali',
    slug: 'gaya-ji-narayan-bali-',
    title: 'Gaya Ji Narayan Bali',
    hindiTitle: 'गया जी नारायण बलि',
    duration: '1 Day (5  - 6 Hours)',
    mode: ['IN_PERSON', 'REMOTE_LIVE'],
    badge: 'SPECIALIZED REMEDY',
    priceINR: 12499,
    priceUSD: 135,
    shortDesc: 'Specialized Vedic karma-kand performed at bank of falgu river near Vishnupad for souls who passed away unnaturally.',
    inclusions: [
      'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji',
      'Altar Rites & Pind Daan with Wheat Sattu',
      'Narayan Bali Homa with Ghee Ahutis on Falgu River Bank',
      'Complete Puja Samagri & Gotra Sankalp Included',
      'Pure Vedic Ritual (No Pickup/Drop • No Food • No Stay)'
    ],
    exclusions: ['Cab Pickup/Drop, Hotel Accommodation, Food & Meals'],
    scripturalSignificance: 'Garuda Purana Pretakalpa: Narayan Bali liberates souls suffering unnatural demise.',
    popularFor: 'Untimely deaths, sudden passing, and severe Pitru Dosh.',
    vedisCovered: ['Falgu River Bank', 'Vishnupad Mandir'],
    featured: true,
    image: '/uploads/1788529572818_WhatsApp_Image_2026-09-04_at_13_05_03.jpg',
    panditType: 'Verified Gaya Panda'
  }
];

export const INITIAL_HOTELS = [
  {
    id: 'hotel-1',
    name: 'Hotel Mahamaya Residency',
    category: 'LUXURY_HOTEL' as const,
    stayCategory: 'COMFORT' as const,
    location: 'Vishnupad Road, Gaya Ji',
    distanceFromVishnupad: '300 Meters (5 Min Walk)',
    pricePerNightINR: 2800, // Base for 2 Persons
    pricePerNightUSD: 35,
    baseOccupancy: 2,
    extraPersonChargeINR: 600,
    extraPersonChargeUSD: 8,
    roomType: 'Deluxe AC Double Bed (2 Persons)',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['AC', 'Parking', 'TV', 'Elevator', 'Geyser', 'Pure Sattvic Dining', 'Free Wi-Fi', 'Wheelchair Friendly', 'Cab Support'],
    acType: 'AC' as const,
    breakfastIncluded: true,
    lunchIncluded: false,
    dinnerIncluded: true,
    parkingAvailable: true,
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    googleMapUrl: 'https://maps.google.com/?q=Vishnupad+Temple+Gaya',
    receptionContactName: 'Ramesh Sharma (General Manager)',
    receptionPhone: '+919876543210',
    receptionEmail: 'reservations@mahamayaresidency.com',
    mealPlanOptions: [
      { id: 'ROOM_ONLY' as const, label: 'Room Only', desc: 'Accommodation for 2 persons', pricePerPersonDayINR: 0, pricePerPersonDayUSD: 0 },
      { id: 'BREAKFAST' as const, label: 'Sattvic Breakfast', desc: 'Fresh herbal tea & sattvic breakfast', pricePerPersonDayINR: 250, pricePerPersonDayUSD: 3 },
      { id: 'ALL_MEALS' as const, label: 'Full Sattvic Meals', desc: 'Breakfast, Pure Desi Ghee Lunch & Dinner', pricePerPersonDayINR: 600, pricePerPersonDayUSD: 8 }
    ],
    rating: 4.8,
    available: true
  },
  {
    id: 'hotel-2',
    name: 'Sri Vishnupad Teerth Dharamshala',
    category: 'SATTVIC_DHARAMSHALA' as const,
    stayCategory: 'BUDGET' as const,
    location: 'Falgu Riverbank Ghat, Gaya Ji',
    distanceFromVishnupad: '100 Meters (On Riverbank)',
    pricePerNightINR: 1200, // Base for 2 Persons
    pricePerNightUSD: 15,
    baseOccupancy: 2,
    extraPersonChargeINR: 350,
    extraPersonChargeUSD: 5,
    roomType: 'Family Triple AC Room (2-3 Persons)',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['AC', 'Geyser', 'Pure Sattvic Dining', 'Free Wi-Fi', 'Wheelchair Friendly', 'Senior Friendly'],
    acType: 'AC' as const,
    breakfastIncluded: true,
    lunchIncluded: true,
    dinnerIncluded: true,
    parkingAvailable: false,
    checkInTime: '11:00 AM',
    checkOutTime: '10:00 AM',
    googleMapUrl: 'https://maps.google.com/?q=Falgu+River+Gaya',
    receptionContactName: 'Pt. Dwarka Nath Panda (Dharamshala Manager)',
    receptionPhone: '+919431234567',
    receptionEmail: 'booking@vishnupaddharamshala.org',
    mealPlanOptions: [
      { id: 'ROOM_ONLY' as const, label: 'Room Only', desc: 'Accommodation for 2 persons', pricePerPersonDayINR: 0, pricePerPersonDayUSD: 0 },
      { id: 'BREAKFAST' as const, label: 'Sattvic Breakfast', desc: 'Daily morning Prasad & Tea', pricePerPersonDayINR: 150, pricePerPersonDayUSD: 2 },
      { id: 'ALL_MEALS' as const, label: 'Full Sattvic Meals', desc: 'Complete 3-time Sattvic Thali', pricePerPersonDayINR: 400, pricePerPersonDayUSD: 5 }
    ],
    rating: 4.9,
    available: true
  },
  {
    id: 'hotel-4',
    name: 'Falgu Riverfront Teerth Niwas',
    category: 'TEMPLE_LODGE' as const,
    stayCategory: 'PREMIUM' as const,
    location: 'Devghat Road, Gaya Ji',
    distanceFromVishnupad: '150 Meters (2 Min Walk)',
    pricePerNightINR: 3400, // Base for 2 Persons
    pricePerNightUSD: 42,
    baseOccupancy: 2,
    extraPersonChargeINR: 700,
    extraPersonChargeUSD: 9,
    roomType: 'Super Deluxe River View AC Room',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['AC', 'Parking', 'TV', 'Elevator', 'Geyser', 'Pure Sattvic Dining', 'Free Wi-Fi', 'Senior Friendly'],
    acType: 'AC' as const,
    breakfastIncluded: true,
    lunchIncluded: true,
    dinnerIncluded: true,
    parkingAvailable: true,
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    googleMapUrl: 'https://maps.google.com/?q=Devghat+Gaya',
    receptionContactName: 'Brijesh Pandey (Front Desk Supervisor)',
    receptionPhone: '+919835012345',
    receptionEmail: 'contact@falguriverfront.com',
    mealPlanOptions: [
      { id: 'ROOM_ONLY' as const, label: 'Room Only', desc: 'Accommodation for 2 persons', pricePerPersonDayINR: 0, pricePerPersonDayUSD: 0 },
      { id: 'BREAKFAST' as const, label: 'Sattvic Breakfast', desc: 'Fresh herbal tea & sattvic breakfast', pricePerPersonDayINR: 250, pricePerPersonDayUSD: 3 },
      { id: 'ALL_MEALS' as const, label: 'Full Sattvic Meals', desc: 'Breakfast, Pure Desi Ghee Lunch & Dinner', pricePerPersonDayINR: 600, pricePerPersonDayUSD: 8 }
    ],
    rating: 4.8,
    available: true
  },
  {
    id: 'hotel-3',
    name: 'Gaya Heritage Grand Hotel',
    category: 'LUXURY_HOTEL' as const,
    stayCategory: 'LUXURY' as const,
    location: 'Station Road, Gaya Ji',
    distanceFromVishnupad: '2.5 KM (10 Min Cab)',
    pricePerNightINR: 4500, // Base for 2 Persons
    pricePerNightUSD: 56,
    baseOccupancy: 2,
    extraPersonChargeINR: 900,
    extraPersonChargeUSD: 12,
    roomType: 'Executive Suite with Balcony (2 Persons)',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: ['AC', 'Parking', 'TV', 'Elevator', 'Geyser', 'Pure Sattvic Dining', 'Free Wi-Fi', 'Wheelchair Friendly', 'Cab Support', '24/7 Room Service'],
    acType: 'BOTH' as const,
    breakfastIncluded: true,
    lunchIncluded: true,
    dinnerIncluded: true,
    parkingAvailable: true,
    checkInTime: '02:00 PM',
    checkOutTime: '12:00 PM',
    googleMapUrl: 'https://maps.google.com/?q=Gaya+Railway+Station',
    receptionContactName: 'Sanjay Kumar (Front Office Manager)',
    receptionPhone: '+919123456789',
    receptionEmail: 'frontdesk@gayaheritagegrand.com',
    mealPlanOptions: [
      { id: 'ROOM_ONLY' as const, label: 'Room Only', desc: 'Luxury Suite for 2 persons', pricePerPersonDayINR: 0, pricePerPersonDayUSD: 0 },
      { id: 'BREAKFAST' as const, label: 'Buffet Sattvic Breakfast', desc: 'Organic breakfast buffet', pricePerPersonDayINR: 350, pricePerPersonDayUSD: 5 },
      { id: 'ALL_MEALS' as const, label: 'Full Sattvic Dining', desc: 'Complete Sattvic Gourmet Dining', pricePerPersonDayINR: 800, pricePerPersonDayUSD: 10 }
    ],
    rating: 4.7,
    available: true
  }
];

export const VERIFIED_PANDITS: Pandit[] = [
  {
    id: 'p-gaya-1',
    name: 'Pt. Ramakant Pandey',
    title: 'Senior Teerth Purohit & Gaya Kshetra Acharya',
    experienceYears: 34,
    lineage: '4th Generation Vishnupad Bahi-Khata Trustee',
    bahiKhataVerified: true,
    vedicDegree: 'Shukla Yajurveda Ratna, Sampurnanand Sanskrit Univ.',
    languages: ['Hindi', 'English', 'Bengali', 'Sanskrit'],
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    rating: 4.99,
    reviewsCount: 3840,
    ritualsCompleted: 6200,
    available: true,
  },
  {
    id: 'p-gaya-2',
    name: 'Pt. Shambhu Nath Mishra',
    title: 'Akshayavat Teerth Panda & Vedic Scholar',
    experienceYears: 28,
    lineage: '5th Generation Falgu Teerth Purohit',
    bahiKhataVerified: true,
    vedicDegree: 'Rigveda Acharya, Varanasi / Gaya',
    languages: ['Hindi', 'Telugu', 'Odia', 'Sanskrit'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.97,
    reviewsCount: 2910,
    ritualsCompleted: 4800,
    available: true,
  },
  {
    id: 'p-gaya-3',
    name: 'Pt. Devendra Kumar Jha',
    title: 'Pretshila & Narayan Bali Karma-Kand Specialist',
    experienceYears: 22,
    lineage: '3rd Generation Gaya Teerth Panda',
    bahiKhataVerified: true,
    vedicDegree: 'Acharya in Karmakand, Kameshwar Singh Darbhanga Univ.',
    languages: ['Hindi', 'Maithili', 'English', 'Gujarati'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    rating: 4.98,
    reviewsCount: 2120,
    ritualsCompleted: 3900,
    available: true,
  }
];

export const INITIAL_ANCESTORS: Ancestor[] = [
  {
    id: 'anc-1',
    fullName: 'Late Shri Harish Chandra Sharma',
    relationship: 'Paternal Grandfather',
    gotra: 'Kashyap',
    deathTithi: 'Ashwin Krishna Navami',
    deathDateGregorian: '1998-10-14',
    lastRitualYear: 2025,
    nextShradhDate: '2026-09-29',
    notes: 'Beloved grandfather. Tri-Sthali Pind Daan completed at Vishnupad & Akshayavat in Gaya Ji.',
  },
  {
    id: 'anc-2',
    fullName: 'Late Smt. Savitri Devi',
    relationship: 'Paternal Grandmother',
    gotra: 'Kashyap',
    deathTithi: 'Bhadrapada Krishna Amavasya',
    deathDateGregorian: '2006-09-22',
    lastRitualYear: 2025,
    nextShradhDate: '2026-09-10',
    notes: 'Lifelong devotee. Annual Shradh Tarpan performed regularly at Falgu Devghat.',
  },
  {
    id: 'anc-3',
    fullName: 'Late Shri Rameshwar Prasad Sharma',
    relationship: 'Father',
    gotra: 'Kashyap',
    deathTithi: 'Kartik Shukla Ekadashi',
    deathDateGregorian: '2021-11-15',
    lastRitualYear: 2024,
    nextShradhDate: '2026-11-20',
    notes: 'Passed away peacefully. Complete Gaya Tri-Sthali Pind Daan scheduled.',
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-8941',
    referenceNo: 'PDW-2026-8941',
    userId: 'user-default',
    customerName: 'Rajesh Sharma',
    customerEmail: 'rajesh.sharma@example.com',
    customerPhone: '+91 98101 23456',
    customerCity: 'New Delhi / San Jose',
    packageId: 'gaya-tri-sthali-3day',
    packageName: 'Gaya Ji Complete Tri-Sthali Pind Daan (3 Days)',
    destination: 'Gaya Ji',
    ritualMode: 'REMOTE_LIVE',
    targetDate: '2026-09-18',
    targetTithi: 'Krishna Paksha Ashtami (Pitru Paksha)',
    gotra: 'Kashyap',
    ancestors: [
      { name: 'Late Shri Harish Chandra Sharma', relationship: 'Paternal Grandfather', tithi: 'Ashwin Navami' },
      { name: 'Late Smt. Savitri Devi', relationship: 'Paternal Grandmother', tithi: 'Bhadrapada Amavasya' },
      { name: 'Late Shri Rameshwar Prasad Sharma', relationship: 'Father', tithi: 'Kartik Ekadashi' }
    ],
    brahmanBhojCount: 5,
    gauSevaOpted: true,
    prasadCourierOpted: true,
    wheelchairAssistantOpted: false,
    hotelBookingOpted: false,
    currency: 'INR',
    totalAmount: 23600,
    paidAmount: 23600,
    status: 'RITUAL_LIVE',
    assignedPandit: VERIFIED_PANDITS[0],
    liveStreamUrl: 'https://webrtc.pinddaanwale.com/room/PDW-8941-GAYA',
    certificateUuid: 'c7f92e41-65b1-4f8a-9f4a-9e1208941abc',
    createdAt: '2026-08-15',
    proofs: [
      {
        id: 'proof-1',
        bookingId: 'book-8941',
        type: 'PHOTO',
        title: 'Sankalp Recitation at Falgu Devghat, Gaya Ji',
        url: '/images/gaya_vishnupad.jpg',
        geoTag: 'Falgu Devghat, Gaya Ji (24.7955° N, 85.0002° E)',
        timestamp: '2026-08-31 07:15 AM IST',
        verifiedByPandit: 'Pt. Ramakant Pandey',
      },
      {
        id: 'proof-2',
        bookingId: 'book-8941',
        type: 'PHOTO',
        title: 'Offering Pind at Lord Vishnupad Footprint',
        url: '/images/pind_daan_vidhi.jpg',
        geoTag: 'Vishnupad Garbhagriha, Gaya Ji (24.7941° N, 85.0028° E)',
        timestamp: '2026-08-31 09:30 AM IST',
        verifiedByPandit: 'Pt. Ramakant Pandey',
      }
    ],
    notes: 'Devotee joined live from California at 6:45 PM PST. Pandit completed Sankalp with full name and Gotra recitation at Lord Vishnupad Temple.',
  },
  {
    id: 'book-8942',
    referenceNo: 'PDW-2026-8942',
    userId: 'user-2',
    customerName: 'Ananya Mukherjee',
    customerEmail: 'ananya.m@example.com',
    customerPhone: '+91 98300 54321',
    customerCity: 'Kolkata',
    packageId: 'gaya-tri-sthali-3day',
    packageName: 'Gaya Ji Complete Tri-Sthali Pind Daan (3 Days)',
    destination: 'Gaya Ji',
    ritualMode: 'IN_PERSON',
    targetDate: '2026-09-05',
    targetTithi: 'Bhadrapada Shukla Trayodashi',
    gotra: 'Sandilya',
    ancestors: [
      { name: 'Late Smt. Mala Mukherjee', relationship: 'Mother', tithi: 'Shukla Trayodashi' }
    ],
    brahmanBhojCount: 2,
    gauSevaOpted: true,
    prasadCourierOpted: false,
    wheelchairAssistantOpted: true,
    hotelBookingOpted: true,
    currency: 'INR',
    totalAmount: 23200,
    paidAmount: 23200,
    status: 'PANDIT_ASSIGNED',
    assignedPandit: VERIFIED_PANDITS[1],
    createdAt: '2026-08-28',
    proofs: [],
    notes: 'Elderly father accompanying; wheelchair assistance requested at Falgu River and Vishnupad Temple.',
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Vikramaditya Singhania',
    phone: '+91 99100 88221',
    email: 'vikram.singhania@corp.in',
    city: 'Mumbai',
    ritualType: 'Gaya Ji Pitru Paksha 17-Day Maha Yajna',
    estimatedBudget: '₹75,000+',
    stage: 'CALLBACK_SCHEDULED',
    assignedTo: 'Pt. Ramakant Pandey',
    source: 'Google Search (Pind Daan in Gaya)',
    createdAt: '2026-08-31 09:20 AM',
  },
  {
    id: 'lead-2',
    name: 'Pooja Reddy',
    phone: '+1 650 443 9912',
    email: 'pooja.reddy@tech.co',
    city: 'San Francisco, USA',
    ritualType: 'Gaya Ji Narayan Bali (Pitru Dosh)',
    estimatedBudget: '$250',
    stage: 'QUOTE_SENT',
    assignedTo: 'Pt. S. Mishra',
    source: 'NRI Community Portal',
    createdAt: '2026-08-30 08:45 PM',
  },
  {
    id: 'lead-3',
    name: 'Amitabh Sen',
    phone: '+91 98311 00223',
    email: 'amitabh.sen@wb.gov.in',
    city: 'Kolkata',
    ritualType: 'Tri-Sthali 3-Day Complete in Gaya Ji',
    estimatedBudget: '₹25,000',
    stage: 'NEW',
    assignedTo: 'Teerth Desk 1',
    source: 'Facebook Ad (Bengali Devotees)',
    createdAt: '2026-08-31 01:15 PM',
  }
];

export const MARKETPLACE_VENDORS: MarketplaceVendor[] = [
  {
    id: 'mv-1',
    category: 'STAY',
    name: 'The Sacred Bodhi Heritage Ashram & Resort',
    location: 'Gaya Ji (1.2 km from Vishnupad Temple)',
    tagline: '100% Pure Vegetarian Sattvic Stays with Private Temple Meditation Hall',
    rating: 4.95,
    reviewsCount: 840,
    startingPrice: '₹3,200 / night',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    features: ['No Onion / No Garlic Kitchen', 'Vishnupad Shuttle Service', 'Wheelchair Friendly', 'Doctor on Call'],
    verified: true,
    contactPerson: 'Manager Satish Kumar',
  },
  {
    id: 'mv-2',
    category: 'CAB',
    name: 'Gaya Ji Teerth EV Green Yatra Fleet',
    location: 'Gaya Airport, Railway Station & Falgu Ghat Circuit',
    tagline: 'Silent, AC Electric Vehicles with Verified Polite Devotee Drivers',
    rating: 4.98,
    reviewsCount: 1220,
    startingPrice: '₹1,500 / day',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['Fixed Transparent Fare', 'Elderly Boarding Assist', 'Free Bottled Ganga Jal', 'Luggage Care'],
    verified: true,
    contactPerson: 'Capt. Rakesh Yadav',
  },
  {
    id: 'mv-3',
    category: 'SAMAGRI',
    name: 'Shri Vishnupad Vedic Organic Samagri Guild',
    location: 'Vishnupad Ghat Central Depot, Gaya Ji',
    tagline: '100% Adulteration-Free Organic Barley, Black Sesame & Desi Cow Ghee',
    rating: 4.99,
    reviewsCount: 3400,
    startingPrice: '₹1,800 / kit',
    image: '/images/pind_daan_vidhi.jpg',
    features: ['Lab Tested Purity', 'Pre-weighed for 3-Day Vidhi', 'Eco-friendly Leaf Pind Bowls', 'Gangotri Jal Sealed'],
    verified: true,
    contactPerson: 'Acharya Govind Shastri',
  },
  {
    id: 'mv-4',
    category: 'GAUSHALA',
    name: 'Surabhi Desi Gau Seva Foundation',
    location: 'Falgu Riverbank, Gaya Ji',
    tagline: 'Sanctuary for 1,200+ Indigenous Desi Gir & Sahiwal Cows in Gaya',
    rating: 5.0,
    reviewsCount: 2150,
    startingPrice: '₹501 / Seva',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    features: ['Live Video Grass Feeding Proof', 'Vedic Cow Puja with Gotra Sankalp', 'Tax Exemption 80G', 'Direct Blessings'],
    verified: true,
    contactPerson: 'Mahant Raghav Das',
  }
];

export const FAQS = [
  {
    question: 'Why is Pind Daan in Gaya Ji considered the Supreme Moksha Dham in Sanatan Dharma?',
    answer: 'According to the Garuda Purana and Vayu Purana, Gaya Ji holds Lord Vishnu’s holy footprint where Gayasura received the cosmic boon that any soul for whom Pind Daan is offered across the sacred vedis (Falgu, Vishnupad, Akshayavat) attains permanent liberation (Moksha) from the cycle of rebirth.'
  },
  {
    question: 'What are the 3 Primary Sthalis (Tri-Sthali) in Gaya Ji?',
    answer: 'The 3 essential sacred sthalis are: 1. Falgu River (Devghat & Sita Kund) for snana, tarpana, and sand pinds; 2. Lord Vishnupad Temple (Garbhagriha footprint) for main Pind Pradaan; and 3. Akshayavat (the eternal banyan tree blessed by Mother Sita) for concluding rites and immortal blessings.'
  },
  {
    question: 'Can Pind Daan in Gaya Ji be performed remotely for NRIs and immobile devotees?',
    answer: 'Yes. Padma Purana and Shradh Prakasha explicitly sanction proxy (*Pratinidhi*) Sankalp. A certified Gaya Teerth Panda takes your Gotra and ancestors’ names via live two-way 4K video link, chanting your personalized Sankalp directly at Lord Vishnupad Temple with 100% scriptural efficacy.'
  },
  {
    question: 'How does PindDaanWale 2.0 prevent Panda extortion at Gaya Ghats?',
    answer: 'We operate on a 100% pre-paid, all-inclusive pricing model in direct coordination with verified hereditary Gaya Pandas. Your package includes the Purohit Dakshina, Temple passes, organic Samagri, and Gau Seva. Devotees are strictly not required to pay any cash Dakshina at the altar.'
  },
  {
    question: 'What emergency and administration support is available during Pitru Paksha Mela in Gaya Ji?',
    answer: 'PindDaanWale 2.0 integrates direct emergency desks with the Gaya District Administration (DM: 0631-2222900, Disaster Management: 8789396142) and provides 24/7 on-ground ambulance transport for pilgrims.'
  }
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'OFFICIAL GAYA TEERTH PROTOCOL • SHASTRA MANDATED',
    h1Title: 'Deliver Eternal Salvation to Your Departed Ancestors in Gaya Ji',
    description: 'Perform authentic Shradh, Tarpan, and Pind Daan under the guidance of hereditary 4th-generation Gaya Purohits at Sri Vishnupad Mandir, Falgu River, and Akshayavat with 100% pre-paid escrow transparency.',
    ctaText: 'Reserve Pind Daan Sankalp',
    ctaLink: 'booking',
    secondaryCtaText: 'Consult Acharya on WhatsApp',
    secondaryCtaLink: 'https://wa.me/917463055338?text=Namaste, I want to inquire about Gaya Ji Pind Daan.',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1920&q=80',
    cards: [
      { title: '28+ Countries', subtitle: 'Global NRI Families Served' },
      { title: '100% Escrow', subtitle: 'Zero Altar Extortion' },
      { title: '4th-Gen Purohit', subtitle: 'Bahi-Khata Verified Pandas' }
    ],
    status: 'ACTIVE'
  },
  {
    id: 'slide-2',
    badge: '4K TWO-WAY WEBRTC LIVE STREAM • GLOBAL NRI DESK',
    h1Title: 'Live Remote E-Pind Daan from Anywhere in the World',
    description: 'Immobile elders and overseas NRIs can participate in two-way 4K HD live WebRTC video sankalp. Certified Gaya Pandits chant your family gotra at Lord Vishnupad footprint with doorstep prasad delivery.',
    ctaText: 'Book 4K Remote Live E-Pind',
    ctaLink: 'booking',
    secondaryCtaText: 'View Remote Vidhi Guide',
    secondaryCtaLink: 'rituals',
    mediaType: 'IMAGE',
    mediaUrl: '/images/gaya_vishnupad.jpg',
    cards: [
      { title: '4K Live WebRTC', subtitle: 'Interactive 2-Way HD Video' },
      { title: 'Doorstep Prasad', subtitle: 'Sanctified Falgu Sand Delivered' },
      { title: 'Pratinidhi Vidhi', subtitle: 'Padma Purana Authorized' }
    ],
    status: 'ACTIVE'
  },
  {
    id: 'slide-3',
    badge: 'DISTRICT ADMIN & TEERTH PILGRIMAGE DESK GAYA',
    h1Title: 'Complete 3-Day Tri-Sthali Sacred Pilgrimage',
    description: 'Experience the complete Shradh parikrama across Falgu Devghat, Lord Vishnupad Mandir, and Akshayavat. Includes private AC transport, verified dharamshala/hotel stays, and hereditary Purohit coordination.',
    ctaText: 'Explore Tri-Sthali Package',
    ctaLink: 'rituals',
    secondaryCtaText: 'Check Hotel Stays',
    secondaryCtaLink: 'services',
    mediaType: 'IMAGE',
    mediaUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1920&q=80',
    cards: [
      { title: '3-Day Parikrama', subtitle: 'All 3 Sacred Altars Covered' },
      { title: 'AC Hotel & Cab', subtitle: 'Private Ghat Transfers' },
      { title: 'Verified Pandas', subtitle: 'Certified Vedic Pandits' }
    ],
    status: 'ACTIVE'
  }
];
