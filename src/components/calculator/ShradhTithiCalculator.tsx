'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  Sun, 
  Moon, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Award
} from 'lucide-react';

interface TithiDetail {
  tithiNumber: number;
  name: string;
  hindiName: string;
  significance: string;
  eligibleAncestors: string;
  recommendedPackageSlug: string;
  recommendedPackageName: string;
  recommendedPrice: number;
  specialRules: string;
}

const TITHI_DATA: Record<number, TithiDetail> = {
  1: {
    tithiNumber: 1,
    name: 'Pratipada Shradh (Padwa)',
    hindiName: 'प्रतिपदा श्राद्ध (पड़वा)',
    significance: 'Dedicated to departed maternal grandparents (Nana-Nani) if the tithi of passing is unknown, or anyone who passed on Pratipada.',
    eligibleAncestors: 'Paternal/Maternal grandparents, Pratipada tithi ancestors.',
    recommendedPackageSlug: 'madhyam-pind-daan',
    recommendedPackageName: 'Madhyam Pind Daan',
    recommendedPrice: 7500,
    specialRules: 'Also considered the auspicious opening tithi of Pitru Paksha Mahasangam in Gaya Ji.'
  },
  2: {
    tithiNumber: 2,
    name: 'Dwitiya Shradh (Dooj)',
    hindiName: 'द्वितीया श्राद्ध (दूज)',
    significance: 'Performed for ancestors who passed away on Shukla or Krishna Dwitiya tithi.',
    eligibleAncestors: 'Father, mother, or family elders passing on Dwitiya.',
    recommendedPackageSlug: 'kanishtha-pind-daan',
    recommendedPackageName: 'Kanishtha Pind Daan',
    recommendedPrice: 4500,
    specialRules: 'Requires barley flour Pinda and black sesame tarpan at Falgu Devghat.'
  },
  3: {
    tithiNumber: 3,
    name: 'Tritiya Shradh (Teej)',
    hindiName: 'तृतीया श्राद्ध (तीज)',
    significance: 'For ancestors who left their mortal bodies on Tritiya tithi.',
    eligibleAncestors: 'Ancestors with Tritiya passing date.',
    recommendedPackageSlug: 'madhyam-pind-daan',
    recommendedPackageName: 'Madhyam Pind Daan',
    recommendedPrice: 7500,
    specialRules: 'Includes Kalash Puja and 3 Vastra Daan for ancestral peace.'
  },
  4: {
    tithiNumber: 4,
    name: 'Chaturthi Shradh (Chauth)',
    hindiName: 'चतुर्थी श्राद्ध (चौथ)',
    significance: 'Performed for ancestors who passed on Chaturthi tithi.',
    eligibleAncestors: 'Elders or family members passing on Chaturthi.',
    recommendedPackageSlug: 'shradh-pind-daan',
    recommendedPackageName: 'Shradh Pind Daan',
    recommendedPrice: 3100,
    specialRules: 'Core Shradh vidhi with Gotra Sankalp at Vishnupad footprint.'
  },
  5: {
    tithiNumber: 5,
    name: 'Panchami Shradh (Kuwar Panchami)',
    hindiName: 'पंचमी श्राद्ध (कुंवार पंचमी)',
    significance: 'Highly auspicious for unmarried family members who passed away, or those passing on Panchami tithi.',
    eligibleAncestors: 'Unmarried departed souls, young relatives, or Panchami tithi ancestors.',
    recommendedPackageSlug: 'madhyam-pind-daan',
    recommendedPackageName: 'Madhyam Pind Daan',
    recommendedPrice: 7500,
    specialRules: 'Garuda Purana prescribes offering milk, kusha, and barley pinda for peaceful transmigration.'
  },
  6: {
    tithiNumber: 6,
    name: 'Shashthi Shradh (Chhath)',
    hindiName: 'षष्ठी श्राद्ध (छठ)',
    significance: 'Performed for ancestors who passed on Shashthi tithi.',
    eligibleAncestors: 'Paternal & maternal ancestors passing on Shashthi.',
    recommendedPackageSlug: 'kanishtha-pind-daan',
    recommendedPackageName: 'Kanishtha Pind Daan',
    recommendedPrice: 4500,
    specialRules: 'Performed with 2 Thali Daan under senior Gayawal Panda.'
  },
  7: {
    tithiNumber: 7,
    name: 'Saptami Shradh (Satam)',
    hindiName: 'सप्तमी श्राद्ध (सातम)',
    significance: 'Dedicated to departed souls on Saptami tithi.',
    eligibleAncestors: 'Parents, grandparents, or extended lineage on Saptami.',
    recommendedPackageSlug: 'madhyam-pind-daan',
    recommendedPackageName: 'Madhyam Pind Daan',
    recommendedPrice: 7500,
    specialRules: 'Offering Pinda at Falgu Devghat washes away generational sins.'
  },
  8: {
    tithiNumber: 8,
    name: 'Ashtami Shradh',
    hindiName: 'अष्टमी श्राद्ध (अठ्ठम)',
    significance: 'For departed souls on Ashtami tithi. Considered one of the most powerful mid-Paksha days.',
    eligibleAncestors: 'Father, mother, or grandparents on Ashtami.',
    recommendedPackageSlug: 'uttam-pind-daan',
    recommendedPackageName: 'Uttam Pind Daan (7-Kul)',
    recommendedPrice: 11000,
    specialRules: 'Recommended for 7-Kul ancestral peace at Vishnupad Garbhagriha.'
  },
  9: {
    tithiNumber: 9,
    name: 'Matri Navami (Mother’s Shradh)',
    hindiName: 'मातृ नवमी श्राद्ध (माता का श्राद्ध)',
    significance: 'The most sacred day dedicated exclusively to deceased Mothers, Grandmothers (Dadi/Nani), and female ancestors, irrespective of their exact passing tithi.',
    eligibleAncestors: 'Mother, Grandmother, Great-grandmother, Aunt, or all deceased women in the lineage.',
    recommendedPackageSlug: 'uttam-pind-daan',
    recommendedPackageName: 'Uttam Pind Daan (7-Kul)',
    recommendedPrice: 11000,
    specialRules: 'Suvasini Puja, Vastra Daan, and offering Pindas with raw honey and milk is mandated.'
  },
  10: {
    tithiNumber: 10,
    name: 'Dashami Shradh',
    hindiName: 'दशमी श्राद्ध',
    significance: 'For ancestors passing on Dashami tithi.',
    eligibleAncestors: 'Ancestors with Dashami passing tithi.',
    recommendedPackageSlug: 'madhyam-pind-daan',
    recommendedPackageName: 'Madhyam Pind Daan',
    recommendedPrice: 7500,
    specialRules: 'Performed during Aparahna Kaal with Gangotri Jal and Falgu stream.'
  },
  11: {
    tithiNumber: 11,
    name: 'Ekadashi Shradh (Indira Ekadashi)',
    hindiName: 'एकादशी श्राद्ध (मोक्षदा एकादशी)',
    significance: 'Supremely sacred. According to the Padma Purana, Shradh performed on Pitru Paksha Ekadashi grants direct liberation into Vaikuntha Dham.',
    eligibleAncestors: 'All departed ancestors, especially spiritual seekers and virtuous elders.',
    recommendedPackageSlug: 'uttam-pind-daan',
    recommendedPackageName: 'Uttam Pind Daan (7-Kul)',
    recommendedPrice: 11000,
    specialRules: 'Direct Vishnu Pujan at the 40cm footprint; bestows unbroken lineage peace.'
  },
  12: {
    tithiNumber: 12,
    name: 'Dwadashi Shradh (Baras / Sanyasi Shradh)',
    hindiName: 'द्वादशी श्राद्ध (सन्यासी श्राद्ध)',
    significance: 'Exclusively dedicated to ancestors who took Sanyasa (renunciation), ascetics, or those who passed on Dwadashi.',
    eligibleAncestors: 'Sanyasis, monks, gurus, or ancestors passing on Dwadashi.',
    recommendedPackageSlug: 'madhyam-pind-daan',
    recommendedPackageName: 'Madhyam Pind Daan',
    recommendedPrice: 7500,
    specialRules: 'No animal bali or onion/garlic; pure satvik barley Pinda offering.'
  },
  13: {
    tithiNumber: 13,
    name: 'Trayodashi Shradh (Kakbali & Children)',
    hindiName: 'त्रयोदशी श्राद्ध (मघा श्राद्ध)',
    significance: 'Particularly sacred when combined with Magha Nakshatra. Ideal for deceased young children or Trayodashi passing.',
    eligibleAncestors: 'Deceased young children or ancestors with Trayodashi tithi.',
    recommendedPackageSlug: 'kanishtha-pind-daan',
    recommendedPackageName: 'Kanishtha Pind Daan',
    recommendedPrice: 4500,
    specialRules: 'Panchabali (Kakbali, Gaubali, Shwanbali) is strongly emphasized.'
  },
  14: {
    tithiNumber: 14,
    name: 'Chaturdashi Shradh (Ghata Chaturdashi)',
    hindiName: 'चतुर्दशी श्राद्ध (अकाल मृत्यु शांति)',
    significance: 'Strictly reserved for family members who passed away unnaturally (accidents, weapons, snake bite, drowning, suicide, or sudden illness).',
    eligibleAncestors: 'Ancestors who suffered unnatural, traumatic, or untimely passing.',
    recommendedPackageSlug: 'gaya-ji-narayan-bali-',
    recommendedPackageName: 'Narayan Bali & Tripindi Shradh',
    recommendedPrice: 12499,
    specialRules: 'WARNING: Normal natural deaths must NOT be performed on Chaturdashi; only unnatural deaths.'
  },
  15: {
    tithiNumber: 15,
    name: 'Sarva Pitru Amavasya (Mahalaya)',
    hindiName: 'सर्वपितृ अमावस्या (महालया विसर्जन)',
    significance: 'The grandest day of the entire year. If you do not know the exact death anniversary, tithi, or gotra details of ANY ancestor, offering Pind Daan on Sarva Pitru Amavasya satisfies ALL departed souls simultaneously.',
    eligibleAncestors: 'ALL ancestors (Paternal, Maternal, In-laws, forgotten souls, unknown lineages).',
    recommendedPackageSlug: 'uttam-pind-daan',
    recommendedPackageName: 'Uttam Pind Daan (7-Kul) or 1-Day Layover',
    recommendedPrice: 11000,
    specialRules: 'Peak festival day in Gaya Ji. Rites concluded under Akshayavat grant permanent liberation.'
  }
};

export default function ShradhTithiCalculator() {
  const [calculationMode, setCalculationMode] = useState<'TITHI' | 'DATE' | 'UNKNOWN'>('TITHI');
  
  // Tithi selection state
  const [selectedTithiNumber, setSelectedTithiNumber] = useState<number>(15); // Default to Sarva Pitru Amavasya
  const [selectedAncestorType, setSelectedAncestorType] = useState<string>('all');
  
  // Date of passing state
  const [inputDate, setInputDate] = useState<string>('2024-05-15');
  const [calculatedTithiFromDate, setCalculatedTithiFromDate] = useState<number>(15);

  // Approximate Tithi calculation from date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputDate(val);
    if (val) {
      const d = new Date(val);
      // Deterministic Hindu synodic month approximation (29.53 days cycle)
      const refNewMoon = new Date('2024-01-11').getTime();
      const diffDays = (d.getTime() - refNewMoon) / (1000 * 60 * 60 * 24);
      const phase = ((diffDays % 29.53059) + 29.53059) % 29.53059;
      let tithiNum = Math.floor((phase / 29.53059) * 30) + 1;
      if (tithiNum > 15) tithiNum = tithiNum - 15; // Map to 1-15 scale
      if (tithiNum < 1) tithiNum = 1;
      if (tithiNum > 15) tithiNum = 15;
      setCalculatedTithiFromDate(tithiNum);
      setSelectedTithiNumber(tithiNum);
    }
  };

  const activeTithi = useMemo(() => {
    return TITHI_DATA[selectedTithiNumber] || TITHI_DATA[15];
  }, [selectedTithiNumber]);

  return (
    <div className="space-y-8">
      {/* Calculator Mode Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#0E1626] border border-slate-800 max-w-xl mx-auto shadow-inner">
        <button
          onClick={() => { setCalculationMode('TITHI'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            calculationMode === 'TITHI'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Select by Hindu Tithi</span>
        </button>

        <button
          onClick={() => { setCalculationMode('DATE'); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            calculationMode === 'DATE'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Enter English Date of Passing</span>
        </button>

        <button
          onClick={() => { 
            setCalculationMode('UNKNOWN');
            setSelectedTithiNumber(15); 
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            calculationMode === 'UNKNOWN'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Tithi Unknown / Forgotten</span>
        </button>
      </div>

      {/* Input Form Box */}
      <div className="p-6 rounded-3xl bg-[#0E1626] border border-slate-800 space-y-6 shadow-xl">
        {calculationMode === 'TITHI' && (
          <div className="space-y-4">
            <label className="text-xs font-mono uppercase font-bold text-amber-300 block">
              Choose the Passing Lunar Tithi (1 to 15)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {Object.values(TITHI_DATA).map((item) => (
                <button
                  key={item.tithiNumber}
                  onClick={() => setSelectedTithiNumber(item.tithiNumber)}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                    selectedTithiNumber === item.tithiNumber
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 uppercase font-mono">Tithi {item.tithiNumber}</span>
                  <span className="line-clamp-1">{item.name.split('(')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {calculationMode === 'DATE' && (
          <div className="space-y-4 max-w-md mx-auto text-center">
            <label className="text-xs font-mono uppercase font-bold text-amber-300 block">
              Enter the English Date of Death / Passing
            </label>
            <input
              type="date"
              value={inputDate}
              onChange={handleDateChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 text-center font-mono"
            />
            <p className="text-xs text-slate-400 leading-relaxed">
              Our Vedic algorithmic engine calculates the closest Hindu Lunar Tithi based on synodic lunar phases and identifies the ideal Gaya Ji ritual window.
            </p>
          </div>
        )}

        {calculationMode === 'UNKNOWN' && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
            <h4 className="text-sm font-bold text-amber-300">
              Exact Date or Tithi Unknown?
            </h4>
            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              According to the <em>Garuda Purana</em> and <em>Dharma Sindhu</em>, when the exact death tithi of ancestors is forgotten or unknown, performing Pind Daan on <strong>Sarva Pitru Amavasya (Mahalaya)</strong> or under the immortal <strong>Akshayavat tree in Gaya Ji</strong> fully liberates all ancestors without any dosha.
            </p>
          </div>
        )}
      </div>

      {/* Calculated Results Display */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#18233C] via-[#0E1626] to-[#10192A] border border-amber-500/40 shadow-2xl space-y-6">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase font-bold text-amber-400 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30 inline-block">
              Vedic Tithi Identified
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {activeTithi.name}
            </h3>
            <p className="text-sm text-amber-200/90 font-serif">
              {activeTithi.hindiName}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-right shrink-0">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Recommended Dakshina</span>
            <div className="text-2xl font-serif font-bold text-amber-400">
              ₹{activeTithi.recommendedPrice.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-400 block font-medium">100% Fixed • Zero Extortion</span>
          </div>
        </div>

        {/* Auspicious Muhurat Windows in Gaya Ji */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Auspicious Shradh Muhurat Windows in Gaya Ji (Daily & Pitru Paksha)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Kutup */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-1 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-300">Kutup Muhurat (कुतुप मुहूर्त)</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-lg font-mono font-bold text-white">11:36 AM – 12:24 PM</div>
              <p className="text-[11px] text-slate-400">The 8th muhurat of the day; supreme time for Pind Daan per Garuda Purana.</p>
            </div>

            {/* Rohin */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-200">Rohin Muhurat (रौहिण मुहूर्त)</span>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-lg font-mono font-bold text-white">12:24 PM – 01:12 PM</div>
              <p className="text-[11px] text-slate-400">9th muhurat; highly auspicious for gotra sankalp and barley tarpan.</p>
            </div>

            {/* Aparahna */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-200">Aparahna Kaal (अपराह्न काल)</span>
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-lg font-mono font-bold text-white">01:12 PM – 03:36 PM</div>
              <p className="text-[11px] text-slate-400">Scriptural afternoon window where ancestors readily accept offerings.</p>
            </div>
          </div>
        </div>

        {/* Shastra Rules & Ancestor Eligibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 block">
              Who Should Receive Offerings on this Tithi?
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeTithi.eligibleAncestors}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 block">
              Special Shastra Precepts (शास्त्र प्रमाण)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeTithi.specialRules}
            </p>
          </div>
        </div>

        {/* Action Button: Book the Recommended Package */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-300 text-center sm:text-left">
            <span>Recommended Ritual: </span>
            <strong className="text-amber-300">{activeTithi.recommendedPackageName}</strong>
            <span className="text-slate-400 block text-[11px]">Includes verified Gayawal Panda, complete samagri, and zero middleman extortion.</span>
          </div>

          <Link
            href={`/pre-booking?package=${activeTithi.recommendedPackageSlug}`}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 shrink-0"
          >
            <span>Book for {activeTithi.name.split('(')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
