'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  X, 
  Package, 
  MapPin, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Plane, 
  Train, 
  Loader2,
  Phone
} from 'lucide-react';
import { CITY_DATABASE } from '@/data/cityDatabase';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state on close or query clear
  useEffect(() => {
    if (!query.trim()) {
      setAiAnswer(null);
    }
  }, [query]);

  // City list indexed from 57 cities database
  const allCities = useMemo(() => Object.values(CITY_DATABASE), []);

  // Filtered Results
  const { packages, sacredPlaces, articles, faqs, matchedCities } = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return { packages: [], sacredPlaces: [], articles: [], faqs: [], matchedCities: [] };
    }

    const samplePackages = [
      { slug: '1-day-essential-pind-daan', title: '1-Day Essential Pind Daan (₹4,500)', desc: 'Falgu River, Vishnupad Sanctum, & Akshayavat with verified Purohit & all samagri.' },
      { slug: '3-day-complete-tri-sthali', title: '3-Day Complete Tri-Sthali (₹12,500)', desc: 'All 45 Sacred Vedis, AC transport, hotel coordination, and lineage bahi-khata.' },
      { slug: '1-day-express-pind-daan', title: '1-Day Express VIP Pind Daan (₹7,500)', desc: 'Priority temple darshan, express panda escort, and pure satvik bhoj.' },
      { slug: 'nri-remote-live-stream', title: 'NRI Remote Live Stream Pind Daan (₹8,500)', desc: 'Live 4K Zoom stream with personalized Gotra sankalp and worldwide prasadam shipping.' }
    ];

    const samplePlaces = [
      { slug: 'vishnupad-temple', name: 'Vishnupad Temple (श्री विष्णुपद मंदिर)', desc: 'Sacred 40cm footprint of Lord Vishnu where souls attain permanent liberation.' },
      { slug: 'falgu-river', name: 'Falgu River & Sita Kund (फल्गु नदी)', desc: 'Holy river where Mata Sita offered sand pind for King Dasharatha.' },
      { slug: 'akshayavat', name: 'Akshayavat Banyan Tree (अक्षयवट)', desc: 'Undying banyan tree where ancestors receive eternal peace and pandas grant Sufal.' },
      { slug: 'pretshila', name: 'Pretshila Hill Shrine (प्रेतशिला)', desc: 'Sacred hill shrine specifically designated for liberating unfulfilled or troubled souls.' }
    ];

    const sampleArticles = [
      { slug: 'why-pind-daan-is-performed-only-at-gaya-ji', title: 'Why Pind Daan is Performed Only at Gaya Ji', desc: 'Vedic theology from Garuda Purana and Vayu Purana explaining Gaya Asura blessing.' },
      { slug: 'complete-pitru-paksha-guidelines-for-nris', title: 'Complete Pitru Paksha Guidelines for NRIs', desc: 'Step-by-step remote Gotra Tarpan and live stream ritual protocol.' },
      { slug: 'tri-sthali-pind-daan-gaya-kashi-prayag', title: 'Tri-Sthali Pind Daan: Gaya, Kashi & Prayagraj', desc: 'The complete three-sanctuary ancestral pilgrimage circuit.' }
    ];

    const sampleFaqs = [
      { question: 'What is the cost of Pind Daan in Gaya Ji?', answer: '100% fixed transparent packages start from ₹4,500 (1-Day Essential) to ₹12,500 (3-Day Complete). Zero surprise charges.' },
      { question: 'Can daughters or women perform Pind Daan?', answer: 'Yes! Garuda Purana and Valmiki Ramayana (Mother Sita at Sita Kund) affirm women have full scriptural rights if there is no son.' },
      { question: 'What are the dates for Pitru Paksha 2026?', answer: 'Pitru Paksha 2026 begins on 26 September (Bhadrapada Purnima) and ends on 10 October 2026 (Sarva Pitru Amavasya).' }
    ];

    return {
      packages: samplePackages.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)),
      sacredPlaces: samplePlaces.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)),
      articles: sampleArticles.filter(a => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)),
      faqs: sampleFaqs.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)),
      matchedCities: allCities.filter(c => c.name.toLowerCase().includes(q) || c.stateOrCountry.toLowerCase().includes(q) || c.slug.includes(q)).slice(0, 4)
    };
  }, [query, allCities]);

  // Ask Groq AI Mitra
  const handleAskAi = async () => {
    if (!query.trim() || isAiLoading) return;
    setIsAiLoading(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: query }],
          language: /[अ-ह]/.test(query) ? 'hi' : 'en'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiAnswer(data.reply);
      } else {
        setAiAnswer('Pranam! For immediate guidance from verified Gaya Teerth Purohits, please call or WhatsApp +91 7463055338.');
      }
    } catch (e) {
      setAiAnswer('Pranam! Please contact our Gaya helpline at +91 7463055338 for instant ritual guidance.');
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!isOpen) return null;

  const totalResults = packages.length + sacredPlaces.length + articles.length + faqs.length + matchedCities.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0B0F19] text-slate-100 w-full max-w-2xl rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[82vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-gradient-to-r from-[#171D2D] via-[#111726] to-[#171D2D]">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAskAi();
            }}
            placeholder="Search 57 cities, packages, sacred vedis, or ask any question..."
            className="w-full bg-transparent border-none text-sm font-semibold text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 rounded-md bg-slate-800">
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Fast-Action Prompt Strip (When typing a query) */}
        {query.trim().length > 2 && (
          <div className="px-4 py-2.5 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-b border-amber-500/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium truncate">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Need spiritual guidance or pricing for "{query}"?</span>
            </div>
            <button
              onClick={handleAskAi}
              disabled={isAiLoading}
              className="px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 shrink-0 shadow transition-all disabled:opacity-50"
            >
              {isAiLoading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Consulting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" />
                  <span>Ask AI Pandit Ji</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1 text-xs custom-scrollbar">

          {/* AI Instant Answer Card */}
          {aiAnswer && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 shadow-lg space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Pandit Ji Guidance</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Groq LPU Verified</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line">
                {aiAnswer}
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <Link
                  href={`/pre-booking`}
                  onClick={onClose}
                  className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Proceed to Pre-Booking</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <a
                  href="tel:+917463055338"
                  className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 font-medium"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>Call: +91 7463055338</span>
                </a>
              </div>
            </div>
          )}

          {/* Blank State */}
          {!query.trim() && (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
                <Compass className="w-6 h-6" />
              </div>
              <p className="font-serif font-bold text-sm text-white">Smart Search & Spiritual Navigator</p>
              <p className="text-slate-400 text-xs max-w-sm mx-auto">
                Search 57 cities (Delhi, Mumbai, Bengaluru, London), packages, 45 Vedis, or ask questions like "Can women perform Pind Daan?"
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2 text-[11px]">
                {['Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'London', 'Cost', 'Women Rights'].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && totalResults === 0 && !aiAnswer && !isAiLoading && (
            <div className="text-center py-10 space-y-3">
              <p className="text-slate-400 text-xs">
                No direct keyword matches for "{query}".
              </p>
              <button
                onClick={handleAskAi}
                className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Pandit Ji to answer this</span>
              </button>
            </div>
          )}

          {/* City Guides (57 Cities Index) */}
          {matchedCities.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs border-b border-slate-800 pb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>City Pilgrimage Guides (57 Hubs)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedCities.map(city => (
                  <Link
                    key={city.slug}
                    href={`/pind-daan/${city.slug}`}
                    onClick={onClose}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 transition-colors border border-slate-800 block space-y-1"
                  >
                    <div className="font-bold text-white flex items-center justify-between">
                      <span className="truncate">{city.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono shrink-0">
                        {city.zone}
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px] truncate flex items-center gap-1">
                      <Train className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{city.trainRoute}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Packages */}
          {packages.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs border-b border-slate-800 pb-1">
                <Package className="w-3.5 h-3.5" />
                <span>Ritual Packages (100% Fixed Dakshina)</span>
              </div>
              {packages.map(pkg => (
                <Link
                  key={pkg.slug}
                  href={`/packages/${pkg.slug}`}
                  onClick={onClose}
                  className="block p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 transition-colors border border-slate-800"
                >
                  <div className="font-bold text-white">{pkg.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{pkg.desc}</div>
                </Link>
              ))}
            </div>
          )}

          {/* Sacred Places */}
          {sacredPlaces.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs border-b border-slate-800 pb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Sacred Sanctuaries & 45 Vedis</span>
              </div>
              {sacredPlaces.map(pl => (
                <Link
                  key={pl.slug}
                  href={`/sacred-places/${pl.slug}`}
                  onClick={onClose}
                  className="block p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 transition-colors border border-slate-800"
                >
                  <div className="font-bold text-white">{pl.name}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{pl.desc}</div>
                </Link>
              ))}
            </div>
          )}

          {/* Articles & Guides */}
          {articles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs border-b border-slate-800 pb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Authentic Shastric Knowledge</span>
              </div>
              {articles.map(art => (
                <Link
                  key={art.slug}
                  href={`/blog/${art.slug}`}
                  onClick={onClose}
                  className="block p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 transition-colors border border-slate-800"
                >
                  <div className="font-bold text-white">{art.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{art.desc}</div>
                </Link>
              ))}
            </div>
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 text-xs border-b border-slate-800 pb-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="font-bold text-white">Q: {faq.question}</div>
                  <div className="text-slate-300 text-[11px]">A: {faq.answer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between items-center px-6">
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-[9px] text-slate-300">ESC</kbd> to close</span>
          <span>PindDaanWale Global Search &bull; Powered by Groq LPU</span>
        </div>
      </div>
    </div>
  );
}
