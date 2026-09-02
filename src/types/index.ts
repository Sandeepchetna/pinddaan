export type Language = 'en' | 'hi' | 'bn' | 'te' | 'ta' | 'mr';
export type Currency = 'INR' | 'USD';

export type RitualMode = 'IN_PERSON' | 'REMOTE_LIVE';

// ── Legacy Booking Status (kept for backward compat) ──
export type BookingStatus = 
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'PANDIT_ASSIGNED'
  | 'SAMAGRI_PREPARED'
  | 'RITUAL_LIVE'
  | 'COMPLETED'
  | 'CANCELLED';

// ── Enterprise Pre-Booking Statuses ──
export type PreBookingStatus =
  | 'PRE_BOOKING_SUBMITTED'
  | 'VERIFICATION_PENDING'
  | 'ADVANCE_AWAITED'
  | 'ADVANCE_RECEIVED'
  | 'BOOKING_CONFIRMED'
  | 'PANDIT_ASSIGNED'
  | 'HOTEL_RESERVED'
  | 'PICKUP_SCHEDULED'
  | 'ARRIVAL_CONFIRMED'
  | 'RITUAL_IN_PROGRESS'
  | 'RITUAL_COMPLETED'
  | 'CERTIFICATE_SENT'
  | 'CLOSED';

export type PaymentStatus =
  | 'PENDING'
  | 'ADVANCE_AWAITED'
  | 'ADVANCE_RECEIVED'
  | 'BALANCE_PENDING'
  | 'FULLY_PAID'
  | 'REFUND_INITIATED'
  | 'REFUNDED';

export type LeadStatusV2 =
  | 'NEW_INQUIRY'
  | 'CONTACTED'
  | 'QUOTATION_SHARED'
  | 'PRE_BOOKING_CREATED'
  | 'FOLLOWUP_SCHEDULED'
  | 'INTERESTED'
  | 'LOST';

export type RitualPurpose =
  | 'FIRST_PIND_DAAN'
  | 'ANNUAL_SHRADH'
  | 'PITRU_DOSH'
  | 'NARAYAN_BALI'
  | 'NOT_SURE';

export type PickupLocation = 'AIRPORT' | 'RAILWAY_STATION' | 'BUS_STAND' | 'HOTEL' | 'OTHER';
export type VehiclePreference = 'SEDAN' | 'SUV' | 'INNOVA' | 'TEMPO_TRAVELLER';
export type StayCategory = 'BUDGET' | 'COMFORT' | 'PREMIUM' | 'LUXURY';

// ── Timeline Event ──
export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description?: string;
  actor?: string;
}

// ── Sacred Sites ──
export interface GayaSacredSthali {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  description: string;
  image: string;
  keySpots: string[];
  scripturalSignificance: string;
  dayNumber: string;
  rating: number;
  reviewsCount: number;
}

// ── Ritual Package (Extended for Admin CMS) ──
export interface RitualPackage {
  id: string;
  slug: string;
  title: string;
  hindiTitle: string;
  duration: string;
  mode: RitualMode[];
  badge?: string;
  priceINR: number;
  priceUSD: number;
  originalPriceINR?: number;
  originalPriceUSD?: number;
  shortDesc: string;
  inclusions: string[];
  exclusions: string[];
  scripturalSignificance: string;
  popularFor: string;
  vedisCovered: string[];
  featured?: boolean;
  // Extended fields for Pre-Booking Engine
  image?: string;
  gallery?: string[];
  templesCovered?: string[];
  foodIncluded?: string;
  pickupIncluded?: boolean;
  dropIncluded?: boolean;
  panditType?: string;
  estimatedDuration?: string;
  bestFor?: string;
  faqs?: { q: string; a: string }[];
  terms?: string[];
  displayOrder?: number;
  status?: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
}

// ── Pandit ──
export interface Pandit {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  lineage: string;
  bahiKhataVerified: boolean;
  vedicDegree: string;
  languages: string[];
  photo: string;
  rating: number;
  reviewsCount: number;
  ritualsCompleted: number;
  available: boolean;
}

// ── Ancestor (Family Tree) ──
export interface Ancestor {
  id: string;
  fullName: string;
  relationship: 'Father' | 'Mother' | 'Paternal Grandfather' | 'Paternal Grandmother' | 'Maternal Grandfather' | 'Maternal Grandmother' | 'Spouse' | 'Sibling' | 'Other';
  gotra: string;
  deathTithi: string;
  deathDateGregorian?: string;
  photoUrl?: string;
  lastRitualYear?: number;
  nextShradhDate?: string;
  notes?: string;
}

// ── Ritual Proof ──
export interface RitualProof {
  id: string;
  bookingId: string;
  type: 'PHOTO' | 'VIDEO' | 'CERTIFICATE' | 'VISARJAN_PROOF';
  title: string;
  url: string;
  geoTag: string;
  timestamp: string;
  verifiedByPandit: string;
}

// ── Legacy Booking ──
export interface Booking {
  id: string;
  referenceNo: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  packageId: string;
  packageName: string;
  destination: string;
  ritualMode: RitualMode;
  targetDate: string;
  targetTithi: string;
  gotra: string;
  ancestors: {
    name: string;
    relationship: string;
    tithi?: string;
  }[];
  brahmanBhojCount: number;
  gauSevaOpted: boolean;
  prasadCourierOpted: boolean;
  wheelchairAssistantOpted: boolean;
  hotelBookingOpted: boolean;
  currency: Currency;
  totalAmount: number;
  paidAmount: number;
  status: BookingStatus;
  assignedPandit?: Pandit;
  liveStreamUrl?: string;
  certificateUuid?: string;
  proofs: RitualProof[];
  createdAt: string;
  notes?: string;
}

// ── Lead (CRM) ──
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  ritualType: string;
  estimatedBudget: string;
  stage: 'NEW' | 'CALLBACK_SCHEDULED' | 'QUOTE_SENT' | 'CONVERTED' | 'DROPPED';
  assignedTo: string;
  source: string;
  createdAt: string;
}

// ── Marketplace Vendor ──
export interface MarketplaceVendor {
  id: string;
  category: 'STAY' | 'CAB' | 'SAMAGRI' | 'GAUSHALA' | 'PHOTOGRAPHY';
  name: string;
  location: string;
  tagline: string;
  rating: number;
  reviewsCount: number;
  startingPrice: string;
  image: string;
  features: string[];
  verified: boolean;
  contactPerson: string;
}

export type MealPlanType = 'ROOM_ONLY' | 'BREAKFAST' | 'ALL_MEALS';

export interface MealPlanOption {
  id: MealPlanType;
  label: string;
  desc: string;
  pricePerPersonDayINR: number;
  pricePerPersonDayUSD: number;
}

// ── Hotel Stay (Extended for Admin CMS) ──
export interface HotelStay {
  id: string;
  name: string;
  category: 'LUXURY_HOTEL' | 'SATTVIC_DHARAMSHALA' | 'TEMPLE_LODGE';
  stayCategory?: StayCategory;
  location: string;
  distanceFromVishnupad: string;
  pricePerNightINR: number; // Base rate for 2 Persons per room
  pricePerNightUSD: number; // Base rate for 2 Persons per room
  baseOccupancy: number; // e.g. 2 Persons
  extraPersonChargeINR?: number; // e.g. ₹600 per extra person per night
  extraPersonChargeUSD?: number;
  roomType: string;
  image: string;
  gallery?: string[];
  amenities: string[];
  acType?: 'AC' | 'NON_AC' | 'BOTH';
  breakfastIncluded?: boolean;
  lunchIncluded?: boolean;
  dinnerIncluded?: boolean;
  parkingAvailable?: boolean;
  checkInTime?: string; // e.g. "12:00 PM"
  checkOutTime?: string; // e.g. "11:00 AM"
  googleMapUrl?: string;
  receptionContactName?: string;
  receptionPhone?: string;
  receptionEmail?: string;
  mealPlanOptions?: MealPlanOption[];
  rating: number;
  available: boolean;
}

// ── Pickup Request (within Pre-Booking) ──
export interface PickupRequest {
  needed: boolean;
  location?: PickupLocation;
  customLocation?: string;
  arrivalDate?: string;
  arrivalTime?: string;
  trainNumber?: string;
  flightNumber?: string;
  vehiclePreference?: VehiclePreference;
}

// ── Travellers ──
export interface TravellerCount {
  adults: number;
  children: number;
  seniorCitizens: number;
}

// ── Special Assistance ──
export interface SpecialAssistance {
  wheelchair: boolean;
  seniorCitizen: boolean;
  medicalSupport: boolean;
  languageAssistance: boolean;
}

// ── Pre-Booking Ancestor Row ──
export interface PreBookingAncestor {
  id: string;
  relation: string;
  name: string;
  gotra?: string;
  deathDate?: string;
}

// ══════════════════════════════════════════════════
//  ENTERPRISE PRE-BOOKING
// ══════════════════════════════════════════════════
export interface PreBooking {
  id: string;
  bookingId: string; // PDW-2026-000145 format

  // Step 1: Ritual Requirement
  ritualMode: RitualMode;
  ritualPurpose: RitualPurpose;
  ancestors: PreBookingAncestor[];
  preferredDate: string;
  tithiDisplay: string;

  // Step 2: Package & Services
  packageId: string;
  packageName: string;
  hotelNeeded: boolean;
  hotelId?: string;
  hotelName?: string;
  hotelNights?: number;
  hotelRooms?: number;
  extraPersonCount?: number;
  extraPersonCost?: number;
  selectedMealPlan?: MealPlanType;
  hotelCheckInTime?: string;
  hotelCheckOutTime?: string;
  hotelRoomCost?: number;
  hotelMealCost?: number;
  hotelTotalCost?: number;
  stayCategory?: StayCategory;
  pickup: PickupRequest;
  travellers: TravellerCount;
  specialAssistance: SpecialAssistance;

  // Step 3: Personal Details
  fullName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  specialInstructions?: string;

  // Meta
  status: PreBookingStatus;
  paymentStatus: PaymentStatus;
  assignedExecutive?: string;
  timeline: TimelineEvent[];
  estimatedTotal: number;
  currency: Currency;
  createdAt: string;
  agreedToTerms: boolean;
}

// ── Dynamic Hero Section Slider ──
export type HeroMediaType = 'IMAGE' | 'VIDEO' | 'YOUTUBE';

export interface HeroSlideStatCard {
  title: string;
  subtitle: string;
  iconName?: string;
}

export interface HeroSlide {
  id: string;
  badge: string;
  h1Title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  mediaType: HeroMediaType;
  mediaUrl: string;
  cards: HeroSlideStatCard[];
  status: 'ACTIVE' | 'DRAFT';
}
