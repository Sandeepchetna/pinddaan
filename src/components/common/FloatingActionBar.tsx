'use client';

import React, { useState } from 'react';
import { Play, Headphones, Phone, MapPin, MessageCircle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import GayaPilgrimCircuitModal from '@/components/common/GayaPilgrimCircuitModal';
import PilgrimEmergencyModal from '@/components/common/PilgrimEmergencyModal';
import { useAppLanguage } from '@/lib/useAppLanguage';

export default function FloatingActionBar() {
  const { isHindi } = useAppLanguage();
  const [isCircuitOpen, setIsCircuitOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  return (
    <>
      <div className="fixed left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 sm:gap-3">
        {/* Navigation / Circuit Map */}
        <button 
          type="button"
          onClick={() => setIsCircuitOpen(true)}
          title={isHindi ? "तीर्थ परिपथ व सरकारी किराया नक्शा" : "Sacred Circuit & Fare Map"}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0284C7] hover:bg-sky-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20 active:scale-95"
        >
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Emergency SOS Button */}
        <button 
          type="button"
          onClick={() => setIsEmergencyOpen(true)}
          title={isHindi ? "24x7 गया जिला आपातकालीन हेल्पलाइन" : "24x7 Gaya Emergency Helplines"}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20 active:scale-95"
        >
          <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Video Gallery */}
        <Link 
          href="/blog" 
          title="Video Gallery"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#C6922E] hover:bg-[#A65F2A] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20"
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
        </Link>

        {/* Direct Call */}
        <a 
          href="tel:+917463055338" 
          title="Call Helpline: +91 7463055338"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

        {/* WhatsApp Chat */}
        <a 
          href="https://wa.me/917463055338?text=Pranam%21%20I%20want%20to%20know%20about%20Pind%20Daan%20Booking%20at%20Gaya%20Ji" 
          target="_blank" 
          rel="noreferrer"
          title="WhatsApp Chat"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>

      <GayaPilgrimCircuitModal 
        isOpen={isCircuitOpen}
        onClose={() => setIsCircuitOpen(false)}
        isHindi={isHindi}
      />

      <PilgrimEmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        isHindi={isHindi}
      />
    </>
  );
}
