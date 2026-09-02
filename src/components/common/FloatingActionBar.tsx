'use client';

import React from 'react';
import { Play, Headphones, Phone, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function FloatingActionBar() {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {/* Video Gallery */}
      <Link 
        href="/blog" 
        title="Video Gallery"
        className="w-11 h-11 rounded-full bg-[#C6922E] hover:bg-[#A65F2A] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20"
      >
        <Play className="w-5 h-5 fill-current ml-0.5" />
      </Link>

      {/* Audio Guide */}
      <Link 
        href="/knowledge-centre" 
        title="Sacred Audio Guide"
        className="w-11 h-11 rounded-full bg-[#C6922E] hover:bg-[#A65F2A] text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20"
      >
        <Headphones className="w-5 h-5" />
      </Link>

      {/* Direct Call */}
      <a 
        href="tel:+917463055338" 
        title="Call Helpline: +91 7463055338"
        className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Navigation Map */}
      <Link 
        href="/gaya-ji" 
        title="45-Vedi Circuit Map"
        className="w-11 h-11 rounded-full bg-[#0284C7] hover:bg-sky-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20"
      >
        <MapPin className="w-5 h-5" />
      </Link>

      {/* WhatsApp Chat */}
      <a 
        href="https://wa.me/917463055338?text=Pranam%21%20I%20want%20to%20know%20about%20Pind%20Daan%20Booking%20at%20Gaya%20Ji" 
        target="_blank" 
        rel="noreferrer"
        title="WhatsApp Chat"
        className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 border border-white/20"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}
