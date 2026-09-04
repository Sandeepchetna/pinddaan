'use client';

import React, { useState } from 'react';
import { Share2, Check, MessageCircle, ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

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
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-all shadow-xs"
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
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all shadow-xs"
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
    <div className="space-y-3">
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
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">
                  Q{idx + 1}
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-[#2B2118]">
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
              <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-amber-200/50 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
