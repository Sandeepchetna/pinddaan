/**
 * Vedic Muhurat Calculation & Validation Engine
 * 
 * Accurately models the scriptural division of the daytime (Ahan) into five 
 * Kaalas as mandated by the Dharmasindhu, Nirnayasindhu, and Garuda Purana:
 * 
 * 1. Pratah Kaal:   Sunrise to 1st fifth (~06:00 AM – 08:24 AM)
 * 2. Sangava Kaal:  2nd fifth (~08:24 AM – 10:48 AM)
 * 3. Madhyahna Kaal: 3rd fifth (~10:48 AM – 01:12 PM) -> contains Kutap & Rohina Muhurats
 * 4. Aparahna Kaal: 4th fifth (~01:12 PM – 03:36 PM) -> Prime Shastric Period for Pind Daan
 * 5. Sayahna Kaal:  5th fifth (~03:36 PM – Sunset)    -> Pind Daan Strictly Prohibited
 * 
 * Rituals after Sunset (Ratri) or during Sayahna Kaal are forbidden by Garuda Purana.
 */

export type MuhuratSlotStatus = 'UPCOMING' | 'ACTIVE' | 'CONCLUDED';
export type OverallMuhuratStatus = 'UPCOMING' | 'ACTIVE' | 'CONCLUDED_FOR_TODAY';

export interface VedicSlotConfig {
  id: 'kutap' | 'aparahna';
  nameKey: 'kutapMuhurat' | 'aparahnaKaal';
  descKey: 'kutapMuhuratDesc' | 'aparahnaKaalDesc';
  defaultTitle: string;
  defaultDesc: string;
  startTimeStr: string;
  endTimeStr: string;
  startMinutes: number; // minutes from midnight (Asia/Kolkata)
  endMinutes: number;   // minutes from midnight (Asia/Kolkata)
  isPrime: boolean;
}

export const VEDIC_MUHURAT_SLOTS: VedicSlotConfig[] = [
  {
    id: 'kutap',
    nameKey: 'kutapMuhurat',
    descKey: 'kutapMuhuratDesc',
    defaultTitle: 'Kutap & Rohin Muhurat',
    defaultDesc: 'Ideal for Gotra Sankalp & Falgu Tarpan.',
    startTimeStr: '11:36 AM',
    endTimeStr: '01:12 PM',
    startMinutes: 11 * 60 + 36, // 696 minutes
    endMinutes: 13 * 60 + 12,   // 792 minutes
    isPrime: false,
  },
  {
    id: 'aparahna',
    nameKey: 'aparahnaKaal',
    descKey: 'aparahnaKaalDesc',
    defaultTitle: 'Aparahna Kaal (Prime Period)',
    defaultDesc: 'Prime time for Vishnupad & Akshayavat pind daan offerings.',
    startTimeStr: '01:12 PM',
    endTimeStr: '03:36 PM',
    startMinutes: 13 * 60 + 12, // 792 minutes
    endMinutes: 15 * 60 + 36,   // 936 minutes
    isPrime: true,
  },
];

export interface EvaluatedMuhuratState {
  currentMinutes: number;
  overallStatus: OverallMuhuratStatus;
  isConcludedForToday: boolean;
  slots: Array<VedicSlotConfig & { status: MuhuratSlotStatus }>;
  activeSlot: (VedicSlotConfig & { status: MuhuratSlotStatus }) | null;
  cutoffTimeStr: string;
  resumesTomorrowTimeStr: string;
}

/**
 * Returns the current time in Asia/Kolkata as minutes from midnight (0 to 1439).
 */
export function getKolkataMinutes(date: Date = new Date()): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value ?? '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value ?? '0', 10);
    return hour * 60 + minute;
  } catch {
    return date.getHours() * 60 + date.getMinutes();
  }
}

/**
 * Real-time evaluator for Muhurat time slots and Garuda Purana compliance.
 */
export function evaluateMuhuratTiming(referenceDate: Date = new Date()): EvaluatedMuhuratState {
  const currentMinutes = getKolkataMinutes(referenceDate);

  const evaluatedSlots = VEDIC_MUHURAT_SLOTS.map(slot => {
    let status: MuhuratSlotStatus = 'UPCOMING';
    if (currentMinutes >= slot.endMinutes) {
      status = 'CONCLUDED';
    } else if (currentMinutes >= slot.startMinutes) {
      status = 'ACTIVE';
    }
    return {
      ...slot,
      status,
    };
  });

  const kutapStart = VEDIC_MUHURAT_SLOTS[0].startMinutes; // 696 (11:36 AM)
  const aparahnaEnd = VEDIC_MUHURAT_SLOTS[1].endMinutes;  // 936 (03:36 PM)

  let overallStatus: OverallMuhuratStatus = 'UPCOMING';
  if (currentMinutes >= aparahnaEnd) {
    overallStatus = 'CONCLUDED_FOR_TODAY';
  } else if (currentMinutes >= kutapStart) {
    overallStatus = 'ACTIVE';
  }

  const activeSlot = evaluatedSlots.find(s => s.status === 'ACTIVE') || null;

  return {
    currentMinutes,
    overallStatus,
    isConcludedForToday: overallStatus === 'CONCLUDED_FOR_TODAY',
    slots: evaluatedSlots,
    activeSlot,
    cutoffTimeStr: '03:36 PM',
    resumesTomorrowTimeStr: '11:36 AM',
  };
}
