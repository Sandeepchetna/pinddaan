import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Phone, 
  Crown, 
  Gem 
} from 'lucide-react';
import prisma from '@/lib/prisma';
import PackageTierToggle from '@/components/packages/PackageTierToggle';
import ZeroExtortionPledge from '@/components/common/ZeroExtortionPledge';

const db = prisma as any;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PackagesPage() {
  let packages: any[] = [];

  try {
    if (db.ritualPackage) {
      packages = await db.ritualPackage.findMany();
      // Explicit custom sort: 1-Day, 3-Day, Tripindi, then Narayan Bali
      const getPkgRank = (pkg: any) => {
        const s = ((pkg.slug || '') + ' ' + (pkg.title || '')).toLowerCase();
        if (s.includes('1-day') || s.includes('1 day')) return 1;
        if (s.includes('3-day') || s.includes('3 day')) return 2;
        if (s.includes('tripindi') || s.includes('pitidosh')) return 3;
        if (s.includes('narayan')) return 4;
        return 5;
      };
      packages = [...packages].sort((a, b) => getPkgRank(a) - getPkgRank(b));
    }
  } catch (err) {
    // fallback
  }

  // Fallback if empty DB
  if (packages.length === 0) {
    packages = [
      {
        id: 'cmtk2km8j0014d9g3kfc9n6hf',
        slug: 'gaya-ji-1-day-pind-daan',
        title: 'Gaya Ji 1-Day Pind Daan',
        duration: '1 Day (Approx 4-5 Hours)',
        priceINR: 9449,
        goldPriceINR: 13999,
        badge: 'MOST POPULAR',
        image: '/images/pind_daan_vidhi.jpg',
        shortDesc: 'Ideal for devotees visiting Gaya Ji for a single day to perform essential rites at Vishnupad Temple & Falgu River.',
        inclusions: 'Certified Gaya Teerth Purohit\nRitual at Falgu Ghat & Vishnupad Temple\nComplete Organic Samagri Kit (Jau, Tila, Ghee)\nAC 2 person private Room /stay & pure Satvik food\nGaya Ji Railway station | Airport pickup & drop (AUTO)\nPuja Samagri and Dakshina Included',
        goldInclusions: 'Certified Gaya Teerth Purohit\nRitual at Falgu Ghat & Vishnupad Temple\nComplete Organic Samagri Kit (Jau, Tila, Ghee)\nAC Deluxe to 4-Star Hotel & Resort 2-Person Private Room Stay & Pure Satvik Food\nGaya Ji Railway station | Airport pickup & drop (CAB)\nPuja Samagri and Dakshina Included'
      },
      {
        id: 'cmtk2km1f0012d9g3z6pb4w7k',
        slug: 'gaya-ji-complete-3-day-pind-daan-3-days-',
        title: 'Gaya Ji Complete 3-Day Pind Daan (3 Days)',
        duration: '3 Days / 3 Nights',
        priceINR: 21449,
        goldPriceINR: 34999,
        badge: 'RECOMMENDED',
        image: '/images/gaya_vishnupad.jpg',
        shortDesc: 'Comprehensive pilgrimage covering Vishnupad, Falgu River, Akshayavat Banyan, Pretshila Hill, Ramshila, and Mangla Gauri Temple.',
        inclusions: 'Certified Gaya Teerth Purohit\nRitual at Falgu Ghat & Vishnupad Temple\nComplete Organic Samagri Kit (Jau, Tila, Ghee)\n3 Night AC 2 person private Room /stay & pure Satvik food\nGaya Ji Railway station | Airport pickup & drop (AUTO)\nPuja Samagri and Dakshina Included',
        goldInclusions: 'Certified Gaya Teerth Purohit\nRitual at Falgu Ghat & Vishnupad Temple\nComplete Organic Samagri Kit (Jau, Tila, Ghee)\n3-Night AC Deluxe to 4-Star Hotel & Resort 2-Person Private Room Stay & Pure Satvik Food\nGaya Ji Railway station | Airport pickup & drop (CAB)\nPuja Samagri and Dakshina Included'
      },
      {
        id: 'cmtjwg94x0005q63sj94zy7hx',
        slug: 'pitra-dosh-puja-tripindi-shradh-',
        title: 'Pitra Dosh Puja ( Tripindi Shradh)',
        duration: '1 Day (4–5 Hours)',
        priceINR: 10449,
        goldPriceINR: 10449,
        badge: 'MOST POPULAR',
        image: '/images/akshay_vat.jpg',
        shortDesc: 'Phalgu River are used to perform the early cleansing rites, tarpan, and the final immersion rituals required during the Tripindi Shradh process',
        inclusions: 'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji\nAltar Rites with Wheat Sattu\nTripindi Homa with Ghee Ahutis on Bank of Falgu River\nComplete Puja Samagri & Gotra Sankalp Included\nPure Vedic Ritual (No Pickup/Drop • No Food • No Stay)',
        goldInclusions: 'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji\nAltar Rites with Wheat Sattu\nTripindi Homa with Ghee Ahutis on Bank of Falgu River\nComplete Puja Samagri & Gotra Sankalp Included\nPure Vedic Ritual (No Pickup/Drop • No Food • No Stay)'
      },
      {
        id: 'cmtk2kmmi0017d9g349fazyjq',
        slug: 'gaya-ji-narayan-bali-',
        title: 'Gaya Ji Narayan Bali',
        duration: '1 Day (5–6 Hours)',
        priceINR: 12499,
        goldPriceINR: 12499,
        badge: 'SPECIALIZED REMEDY',
        image: '/images/gaya_drone.jpg',
        shortDesc: 'Specialized Vedic karma-kand performed at bank of falgu river near Vishnupad for souls who passed away unnaturally.',
        inclusions: 'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji\nAltar Rites & Pind Daan with Wheat Sattu\nNarayan Bali Homa with Ghee Ahutis on Falgu River Bank\nComplete Puja Samagri & Gotra Sankalp Included\nPure Vedic Ritual (No Pickup/Drop • No Food • No Stay)',
        goldInclusions: 'Senior Jyotish & Vedic Karma-Kand Acharya in Gaya Ji\nAltar Rites & Pind Daan with Wheat Sattu\nNarayan Bali Homa with Ghee Ahutis on Falgu River Bank\nComplete Puja Samagri & Gotra Sankalp Included\nPure Vedic Ritual (No Pickup/Drop • No Food • No Stay)'
      }
    ];
  }

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-12 px-4 sm:px-6 space-y-16">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-[#F48D08]">
          Transparent & Fixed Dakshina Packages
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.25] pb-2">
          <span className="block text-[#2B2118] pb-1">Curated Vedic Rites &</span>
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6f1d14] via-[#C6922E] to-[#F48D08] pb-3 -mb-3">
            Pind Daan Pilgrimage Packages
          </span>
        </h1>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Choose between our <strong>GOLD PLAN</strong> for essential rites with local Auto/Tempo transfers or <strong>PLATINUM VIP PLAN</strong> for private AC Cab (Car) chauffeur pickup, AC Deluxe to 4-Star Hotel & Resort stay & senior Teerth Panda care.
        </p>
      </div>

      {/* Tier Comparison Badge Ribbon */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-amber-900/10 shadow-sm">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-900/10">
          <div className="w-10 h-10 rounded-full bg-[#F48D08] text-white flex items-center justify-center font-bold text-sm shrink-0">
            🌟
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-text-primary">GOLD PLAN TIER</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Essential Pind Daan rites, verified Vishnupad panda, local Auto/Tempo pickup, full puja samagri, and gotra sankalp.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/20 border border-amber-400/40">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6f1d14] via-[#F48D08] to-[#C6922E] text-white flex items-center justify-center font-bold shrink-0 shadow">
            <Crown className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-[#6f1d14]">PLATINUM VIP PLAN TIER</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Includes Senior Panda, Private AC Cab/Car (SUV/Sedan) Chauffeur Pickup/Drop, AC Deluxe to 4-Star Hotel & Resort Stay, and Dedicated Teerth Panda Care.
            </p>
          </div>
        </div>
      </div>

      {/* Client Component: Interactive GOLD vs PLATINUM Package Toggle Grid */}
      <PackageTierToggle initialPackages={packages} />

      {/* Official Zero Extortion & Vedic Sanctity Pledge */}
      <div className="max-w-7xl mx-auto">
        <ZeroExtortionPledge />
      </div>

      {/* Guarantees Ribbon */}
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl border border-amber-900/10 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="space-y-2 p-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-sm">Verified Lineage Pandas</h4>
          <p className="text-xs text-text-secondary">Direct lineage pandas registered with Vishnupad Temple management.</p>
        </div>

        <div className="space-y-2 p-4 border-y sm:border-y-0 sm:border-x border-gray-100">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-sm">No Mid-Ritual Bargaining</h4>
          <p className="text-xs text-text-secondary">100% transparent pricing confirmed before your arrival in Gaya Ji.</p>
        </div>

        <div className="space-y-2 p-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto">
            <Phone className="w-6 h-6" />
          </div>
          <h4 className="font-serif font-bold text-sm">24/7 Pilgrim Assistance</h4>
          <p className="text-xs text-text-secondary">Dedicated coordination desk for senior citizens and NRI families.</p>
        </div>
      </div>

    </div>
  );
}
