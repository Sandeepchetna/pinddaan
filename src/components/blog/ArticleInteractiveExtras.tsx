'use client';

import React, { useState, useRef } from 'react';
import { 
  Share2, 
  Check, 
  MessageCircle, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Phone
} from 'lucide-react';

interface ShareBarProps {
  title: string;
  url?: string;
}

export function ArticleShareBar({ title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const text = encodeURIComponent(`*${title}*\n\nRead this authentic Vedic scripture guide on PindDaanWale:\n${window.location.href}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-all shadow-xs cursor-pointer"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Share Link</span>
          </>
        )}
      </button>

      <button
        onClick={handleWhatsApp}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all shadow-xs cursor-pointer"
        title="Share to WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>
    </div>
  );
}

interface FAQItem {
  q: string;
  a: string;
}

export function ArticleFaqAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all overflow-hidden ${
              isOpen 
                ? 'bg-amber-50/40 border-amber-300 shadow-sm' 
                : 'bg-white border-amber-900/10 hover:border-amber-300/60'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-4 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">
                  Q{idx + 1}
                </span>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#2B2118] leading-snug">
                  {faq.q}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-amber-700 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 text-xs text-slate-700 leading-relaxed border-t border-amber-200/50">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function SlidingCarousel({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group/carousel">
      <button
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-lg border border-amber-900/15 items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      <button
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-lg border border-amber-900/15 items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 text-slate-700" />
      </button>
    </div>
  );
}
