import React from 'react';
import Link from 'next/link';
import { 
  Check, 
  Crown, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Car, 
  Hotel, 
  UserCheck, 
  FileCheck, 
  Award,
  Gem 
} from 'lucide-react';

export default function PackageComparisonPage() {
  const features = [
    {
      name: 'Teerth Panda Rites Roster',
      gold: 'Verified Vishnupad Teerth Panda',
      platinum: 'Senior VIP Lineage Teerth Panda Escort',
      icon: UserCheck
    },
    {
      name: 'Station / Airport Transport',
      gold: 'Station Cab Pickup / Local Transfer',
      platinum: 'Private Chauffeur AC SUV Doorstep Transport',
      icon: Car
    },
    {
      name: 'Hotel Accommodation & Meals',
      gold: 'Comfortable Standard AC Room',
      platinum: '3-Star Deluxe AC Hotel + Pure Veg Sattvic Meals',
      icon: Hotel
    },
    {
      name: 'Sacred Vedis Rites Circuit',
      gold: 'Falgu River, Vishnupad Temple & Akshayavat',
      platinum: 'All 45 Vedis + Pretshila Hill + Sita Kund Rites',
      icon: Sparkles
    },
    {
      name: 'Vishnupad Temple Access',
      gold: 'Standard Temple Rites Entry',
      platinum: 'VIP Priority Darshan Access & Aarti Entry',
      icon: Crown
    },
    {
      name: 'Vedic Samagri & Bhog Rites',
      gold: 'Full Standard Pind Puja Samagri Kit',
      platinum: 'Special Premium Bhog & Complete Deluxe Rites Kit',
      icon: Award
    },
    {
      name: 'Prasadam & Lineage Certificate',
      gold: 'Digital Lineage Registration Entry',
      platinum: 'Official Gold-Embossed Lineage Certificate & Prasadam Box',
      icon: FileCheck
    },
    {
      name: 'Dedicated Helpline Escort',
      gold: 'Phone Helpline Assistance',
      platinum: '24/7 Personal Care Manager on Ground',
      icon: Phone
    }
  ];

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-12 px-4 sm:px-6 space-y-16">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs uppercase tracking-widest font-bold text-[#F48D08]">
          Transparent Rites & Dakshina Breakdown
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-text-primary">
          Gold vs. Platinum VIP Plan Comparison
        </h1>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Compare features line-by-line to select the perfect pilgrimage plan for your family's Gaya Ji journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 pt-2">
          <a
            href="https://wa.me/917463055338?text=Pranam%20Pandit%20Ji,%20I%20want%20to%20understand%20Gold%20vs%20Platinum%20pinddaan%20plans"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow select-none"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Connect on WhatsApp</span>
          </a>

          <a
            href="tel:+917463055338"
            className="w-full sm:w-auto bg-white border border-amber-900/20 hover:border-[#F48D08] text-text-primary px-5 py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-sm select-none"
          >
            <Phone className="w-4 h-4 text-[#F48D08] shrink-0" />
            <span>Call +91 7463055338</span>
          </a>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-amber-900/10 shadow-xl overflow-hidden">
        
        {/* Table Header - Clean 2-Column Mobile Card Layout with Zero Overlap */}
        <div className="bg-amber-50/80 p-4 sm:p-6 border-b border-amber-900/10">
          <div className="grid grid-cols-2 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Desktop-only Title Column */}
            <div className="hidden sm:block sm:col-span-4 font-serif font-bold text-base text-text-primary">
              Service & Rites Feature
            </div>

            {/* Gold Tier Header Card */}
            <div className="col-span-1 sm:col-span-4 text-center p-3 sm:p-4 rounded-2xl bg-white/90 border border-amber-200/80 shadow-sm space-y-1.5 min-w-0">
              <span className="text-[9px] sm:text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-[#F48D08] inline-block whitespace-nowrap">
                🌟 GOLD PLAN
              </span>
              <div className="text-xl sm:text-3xl font-serif font-bold text-[#F48D08] leading-tight truncate">
                ₹4,500
              </div>
              <span className="block text-[10px] sm:text-[11px] text-text-secondary leading-tight">Essential Rites</span>
            </div>

            {/* Platinum Tier Header Card */}
            <div className="col-span-1 sm:col-span-4 text-center p-3 sm:p-4 rounded-2xl bg-white/90 border border-amber-200/80 shadow-sm space-y-1.5 min-w-0">
              <span className="text-[9px] sm:text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#4A154B] via-[#6f1d14] to-[#C6922E] text-white inline-block whitespace-nowrap">
                💎 PLATINUM VIP
              </span>
              <div className="text-xl sm:text-3xl font-serif font-bold text-[#6f1d14] leading-tight truncate">
                ₹7,500
              </div>
              <span className="block text-[10px] sm:text-[11px] text-text-secondary leading-tight">Full Chauffeur & Hotel</span>
            </div>

          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-100">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="grid grid-cols-12 p-4 sm:p-6 items-center hover:bg-amber-50/30 transition-colors">
                
                <div className="col-span-4 flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[11px] sm:text-xs text-text-primary leading-tight">
                    {feat.name}
                  </span>
                </div>

                <div className="col-span-4 text-center text-[11px] sm:text-xs text-text-secondary font-medium px-2 sm:px-4">
                  {feat.gold}
                </div>

                <div className="col-span-4 text-center text-[11px] sm:text-xs font-bold text-[#6f1d14] bg-amber-50/80 p-2 sm:p-3 rounded-2xl border border-amber-300/40">
                  💎 {feat.platinum}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA Row - Mobile Full-Width Stack with Balanced Min-Height */}
        <div className="bg-gray-50 p-4 sm:p-6 border-t border-amber-900/10">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
            <div className="col-span-1 sm:col-span-4 text-xs font-bold text-text-secondary text-center sm:text-left">
              Ready to book your family's rites?
            </div>

            <div className="col-span-1 sm:col-span-4">
              <Link
                href="/pre-booking?tier=GOLD"
                className="w-full min-h-[48px] flex items-center justify-center text-center bg-[#F48D08] hover:bg-[#D97706] text-white py-3 px-4 rounded-full font-bold text-xs shadow transition-all select-none"
              >
                <span>Book Gold Plan (₹4,500)</span>
              </Link>
            </div>

            <div className="col-span-1 sm:col-span-4">
              <Link
                href="/pre-booking?tier=PLATINUM"
                className="w-full min-h-[48px] flex items-center justify-center text-center bg-gradient-to-r from-[#6f1d14] via-[#F48D08] to-[#C6922E] hover:opacity-95 text-white py-3 px-4 rounded-full font-bold text-xs shadow transition-all select-none"
              >
                <span>Book Platinum VIP Plan (₹7,500)</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Trust Badges */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto font-bold text-sm">✓</div>
          <h4 className="font-serif font-bold text-sm">No Hidden Fees</h4>
          <p className="text-xs text-text-secondary">Fixed dakshina confirmed before your arrival.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 space-y-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto font-bold text-sm">🏛️</div>
          <h4 className="font-serif font-bold text-sm">Hereditary Teerth Pandas</h4>
          <p className="text-xs text-text-secondary">Authentic lineage Pandas with zero bargaining.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 space-y-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-[#F48D08] flex items-center justify-center mx-auto font-bold text-sm">📱</div>
          <h4 className="font-serif font-bold text-sm">Instant Confirmation</h4>
          <p className="text-xs text-text-secondary">Receive booking ID & panda details on phone.</p>
        </div>
      </div>

    </div>
  );
}
