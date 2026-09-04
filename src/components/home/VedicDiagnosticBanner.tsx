'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, BookOpen, Clock } from 'lucide-react';
import VedicDiagnosticModal from '@/components/ai/VedicDiagnosticModal';

export default function VedicDiagnosticBanner({ packages = [] }: { packages?: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#172033] via-[#0F172A] to-[#1E1714] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
          
          {/* Decorative Background Glows */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>AI VEDIC SHASTRA ENGINE 2.0</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white leading-tight">
                पितरों के मोक्ष व कुल शांति हेतु <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">सटीक पिंडदान विधान</span> जानें
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                गरुड़ पुराण एवं वायु पुराण के आधार पर 2 मिनट में जानें कि आपके कुल के लिए 1-दिवसीय आवश्यक पिंडदान, 3-दिवसीय 45-वेदी त्रि-स्थली, अथवा त्रिपिंडी नारायण बलि में से कौन सा विधान शास्त्रसम्मत है।
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% निःशुल्क जांच (Free Tool)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>45 पवित्र वेदियों का सटीक मिलान</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>2 मिनट में संपूर्ण रिपोर्ट</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setIsOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4 fill-current text-slate-950" />
                <span>AI वैदिक जांच शुरू करें</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      <VedicDiagnosticModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        packages={packages}
      />
    </>
  );
}
