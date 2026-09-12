'use client';

import React from 'react';
import { 
  X, 
  Phone, 
  ShieldAlert, 
  HeartPulse, 
  Train, 
  Users, 
  Headphones, 
  MapPin, 
  AlertTriangle,
  ExternalLink,
  MessageCircle,
  Clock
} from 'lucide-react';

interface PilgrimEmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHindi: boolean;
}

export default function PilgrimEmergencyModal({ isOpen, onClose, isHindi }: PilgrimEmergencyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#171310] text-gray-100 rounded-3xl shadow-2xl border border-red-500/40 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-gradient-to-r from-red-950/80 via-[#201512] to-[#171310] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
              <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-red-400 uppercase">
                  {isHindi ? '24x7 आपातकालीन सहायता हब' : '24x7 PILGRIM EMERGENCY & SOS'}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm sm:text-base md:text-lg text-white">
                {isHindi ? 'गया जिला प्रशासन व श्रद्धालु सुरक्षा हेल्पलाइन' : 'Gaya District Administration & Safety Helplines'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4 custom-scrollbar bg-gradient-to-b from-[#1c1815] to-[#120f0d]">
          
          {/* Notice Banner */}
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-red-950/40 border border-red-500/30 text-xs text-red-200">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px] sm:text-xs">
              {isHindi 
                ? 'यह सभी नंबर बिहार सरकार, गया जिला प्रशासन एवं मेला नियंत्रण कक्ष द्वारा आधिकारिक रूप से सत्यापित हैं। किसी भी संकट, खोए-पाए या मेडिकल इमरजेंसी में नीचे दिए गए नंबरों पर तुरंत सीधे कॉल करें।'
                : 'All numbers are officially verified by Bihar Govt & Gaya District Administration. Tap any number to call immediately in case of emergency, medical need, or lost person.'}
            </p>
          </div>

          {/* 1. District Administration Control Room */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 sm:p-4 hover:border-amber-500/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <ShieldAlert className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">
                    {isHindi ? 'गया जिला प्रशासन मेला नियंत्रण कक्ष' : 'District Administration Control Room'}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-gray-400">
                    {isHindi ? '24 घंटे केंद्रीय मेला प्रबंधन व सुरक्षा' : '24x7 Central Mela Command & Public Support'}
                  </span>
                </div>
              </div>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                24x7 Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <a
                href="tel:06312222500"
                className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-amber-500/40 text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span>0631-2222500</span>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold">{isHindi ? 'कॉल करें' : 'Call'}</span>
              </a>

              <a
                href="tel:9266628168"
                className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-amber-500/40 text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span>9266628168</span>
                </div>
                <span className="text-[10px] text-amber-400 font-semibold">{isHindi ? 'कॉल करें' : 'Call'}</span>
              </a>
            </div>
          </div>

          {/* 2. Medical & Ambulance Network */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 sm:p-4 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <HeartPulse className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">
                    {isHindi ? 'निशुल्क एम्बुलेंस एवं अस्पताल' : 'Free Ambulance & Hospital Care'}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-gray-400">
                    {isHindi ? 'सदर अस्पताल व ANMMCH मेडिकल कॉलेज गया' : 'Sadar Hospital & ANMMCH Medical College Gaya'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <a
                href="tel:108"
                className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/30 text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>108 (निशुल्क एम्बुलेंस)</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-semibold">Toll Free</span>
              </a>

              <a
                href="tel:06312410339"
                className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-emerald-500/40 text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>0631-2410339 (ANMMCH)</span>
                </div>
                <span className="text-[10px] text-emerald-300 font-semibold">{isHindi ? 'कॉल करें' : 'Call'}</span>
              </a>
            </div>
          </div>

          {/* 3. Police Emergency & Tourist Assistance */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 sm:p-4 hover:border-sky-500/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                  <ShieldAlert className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">
                    {isHindi ? 'पुलिस आपातकाल व विष्णुपद पर्यटक सहायता' : 'Police Emergency & Tourist Police'}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-gray-400">
                    {isHindi ? 'विष्णुपद थाना, सिविल लाइंस व मेला पुलिस कैंप' : 'Vishnupad Police Outpost & Mela Security'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <a
                href="tel:112"
                className="flex items-center justify-between p-2.5 rounded-xl bg-sky-950/30 hover:bg-sky-950/50 border border-sky-500/30 text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>112 (अखिल भारतीय पुलिस)</span>
                </div>
                <span className="text-[10px] text-sky-300 font-semibold">Toll Free</span>
              </a>

              <a
                href="tel:139"
                className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-sky-500/40 text-xs font-bold transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Train className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>139 (रेलवे सुरक्षा व सहायता)</span>
                </div>
                <span className="text-[10px] text-sky-300 font-semibold">Gaya Jn</span>
              </a>
            </div>
          </div>

          {/* 4. Lost & Found (खोया-पाया सहायता) */}
          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-[#F48D08] shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-white">
                  {isHindi ? 'खोया-पाया सहायता केंद्र (Lost & Found Desk)' : 'Lost & Found Pilgrim Desk'}
                </h5>
                <p className="text-[11px] text-gray-300">
                  {isHindi 
                    ? 'गांधी मैदान व विष्णुपद मंदिर नियंत्रण कक्ष में लाउडस्पीकर उद्घोषणा की निशुल्क सुविधा उपलब्ध है।' 
                    : 'Free public announcement available at Gandhi Maidan & Vishnupad Control Booths.'}
                </p>
              </div>
            </div>
            <a
              href="tel:06312222500"
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs shrink-0 border border-amber-500/40"
            >
              <Phone className="w-3 h-3" />
              <span>{isHindi ? 'उद्घोषणा हेतु कॉल करें' : 'Call Desk'}</span>
            </a>
          </div>

          {/* 5. PinddaanWale Dedicated On-Ground Support */}
          <div className="bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-transparent p-3.5 sm:p-4 rounded-2xl border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="px-2 py-0.5 rounded-md bg-[#F48D08] text-white text-[10px] font-extrabold uppercase">
                PinddaanWale Care
              </span>
              <h4 className="font-serif font-bold text-xs sm:text-sm text-white mt-1">
                {isHindi ? 'पिंडदानवाले तीर्थ यात्री 24x7 ऑन-ग्राउंड सहायता' : 'PinddaanWale 24x7 Pilgrim Assistance'}
              </h4>
              <p className="text-[11px] text-gray-300 mt-0.5">
                {isHindi ? 'पंडित समन्वय, वेदी मार्गदर्शन या वाहन सहायता में सीधी सहायता।' : 'Direct help with purohit coordination, vedi navigation or cab support.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:+917463055338"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F48D08] hover:bg-[#D97706] text-white font-bold text-xs shadow-md transition-transform active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +91 7463055338</span>
              </a>
              <a
                href="https://wa.me/917463055338?text=Namaste%21%20I%20am%20at%20Gaya%20Ji%20and%20need%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
                title="WhatsApp Support"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between shrink-0 text-xs">
          <span className="text-[10px] sm:text-[11px] text-gray-400">
            {isHindi ? 'स्रोत: pinddaangaya.bihar.gov.in (बिहार सरकार)' : 'Source: pinddaangaya.bihar.gov.in (Govt of Bihar)'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            {isHindi ? 'बंद करें' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
