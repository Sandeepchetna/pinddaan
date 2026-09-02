'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Package, MapPin, FileText, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    packages: any[];
    sacredPlaces: any[];
    articles: any[];
    faqs: any[];
  }>({
    packages: [],
    sacredPlaces: [],
    articles: [],
    faqs: []
  });

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

  // Handle Search Input
  useEffect(() => {
    if (!query.trim()) {
      setResults({ packages: [], sacredPlaces: [], articles: [], faqs: [] });
      return;
    }

    const q = query.toLowerCase();

    // Default searchable dataset
    const samplePackages = [
      { slug: '1-day-express-pind-daan', title: '1-Day Express Pind Daan', desc: 'Vishnupad & Falgu River essential rites.' },
      { slug: '3-day-complete-tri-sthali', title: '3-Day Complete 45-Vedi Pilgrimage', desc: 'Full 45-Vedi trail with AC cab and stay.' },
      { slug: 'nri-remote-live-stream', title: 'NRI Remote Live Stream Pind Daan', desc: 'Live 4K Zoom stream with prasadam delivery.' }
    ];

    const samplePlaces = [
      { slug: 'vishnupad-temple', name: 'Vishnupad Temple', desc: 'Footprint of Lord Vishnu.' },
      { slug: 'falgu-river', name: 'Falgu River & Sita Kund', desc: 'Sacred riverbank where Mata Sita offered sand pind.' },
      { slug: 'akshayavat', name: 'Akshayavat Banyan Tree', desc: 'Eternal banyan tree for final ancestral oblations.' },
      { slug: 'pretshila', name: 'Pretshila Hill Shrine', desc: 'Hill shrine granting peace to unfulfilled souls.' }
    ];

    const sampleArticles = [
      { slug: 'why-pind-daan-is-performed-only-at-gaya-ji', title: 'Why Pind Daan is Performed Only at Gaya Ji', desc: 'Scriptural significance of Gaya Asura and Lord Vishnu.' },
      { slug: 'complete-pitru-paksha-guidelines-for-nris', title: 'Complete Pitru Paksha Guidelines for NRIs', desc: 'How overseas devotees perform Gotra Tarpan remotely.' }
    ];

    const sampleFaqs = [
      { question: 'What is the cost of Pind Daan at Gaya Ji?', answer: 'Dakshina packages start from ₹4,500 with transparent samagri.' },
      { question: 'What is Pitru Paksha 2026 date?', answer: 'Pitru Paksha Mela 2026 is observed from 26 Sept to 10 Oct 2026.' }
    ];

    setResults({
      packages: samplePackages.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)),
      sacredPlaces: samplePlaces.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)),
      articles: sampleArticles.filter(a => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)),
      faqs: sampleFaqs.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
    });
  }, [query]);

  if (!isOpen) return null;

  const totalResults = results.packages.length + results.sacredPlaces.length + results.articles.length + results.faqs.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-amber-900/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-amber-50/40">
          <Search className="w-5 h-5 text-[#F48D08] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Packages, Sacred Places, Articles, FAQs..."
            className="w-full bg-transparent border-none text-sm font-bold text-text-primary placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 text-xs font-bold px-2 py-1 rounded-md bg-gray-100">
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1 text-xs">
          {!query.trim() && (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-[#F48D08]">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="font-serif font-bold text-sm text-text-primary">Instant Knowledge Search</p>
              <p className="text-gray-400 text-xs max-w-sm mx-auto">
                Type queries like "Vishnupad", "1-Day Package", "Pitru Paksha", "NRIs", or "Tripindi".
              </p>
            </div>
          )}

          {query.trim() && totalResults === 0 && (
            <div className="text-center py-10 text-gray-400">
              No matching records found for "{query}". Try searching for "Gaya", "Package", or "Temple".
            </div>
          )}

          {/* Packages */}
          {results.packages.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-serif font-bold text-[#6f1d14] text-xs border-b border-gray-100 pb-1">
                <Package className="w-3.5 h-3.5 text-[#F48D08]" />
                <span>Ritual Packages</span>
              </div>
              {results.packages.map(pkg => (
                <Link
                  key={pkg.slug}
                  href={`/packages/${pkg.slug}`}
                  onClick={onClose}
                  className="block p-3 rounded-2xl bg-amber-50/40 hover:bg-amber-100/60 transition-colors border border-amber-100/60"
                >
                  <div className="font-bold text-text-primary">{pkg.title}</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">{pkg.desc}</div>
                </Link>
              ))}
            </div>
          )}

          {/* Sacred Places */}
          {results.sacredPlaces.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-serif font-bold text-[#6f1d14] text-xs border-b border-gray-100 pb-1">
                <MapPin className="w-3.5 h-3.5 text-[#F48D08]" />
                <span>Sacred Sanctuaries</span>
              </div>
              {results.sacredPlaces.map(pl => (
                <Link
                  key={pl.slug}
                  href={`/sacred-places/${pl.slug}`}
                  onClick={onClose}
                  className="block p-3 rounded-2xl bg-amber-50/40 hover:bg-amber-100/60 transition-colors border border-amber-100/60"
                >
                  <div className="font-bold text-text-primary">{pl.name}</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">{pl.desc}</div>
                </Link>
              ))}
            </div>
          )}

          {/* Articles */}
          {results.articles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-serif font-bold text-[#6f1d14] text-xs border-b border-gray-100 pb-1">
                <FileText className="w-3.5 h-3.5 text-[#F48D08]" />
                <span>Knowledge Base & Guides</span>
              </div>
              {results.articles.map(art => (
                <Link
                  key={art.slug}
                  href={`/blog/${art.slug}`}
                  onClick={onClose}
                  className="block p-3 rounded-2xl bg-amber-50/40 hover:bg-amber-100/60 transition-colors border border-amber-100/60"
                >
                  <div className="font-bold text-text-primary">{art.title}</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">{art.desc}</div>
                </Link>
              ))}
            </div>
          )}

          {/* FAQs */}
          {results.faqs.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-serif font-bold text-[#6f1d14] text-xs border-b border-gray-100 pb-1">
                <HelpCircle className="w-3.5 h-3.5 text-[#F48D08]" />
                <span>Frequently Asked Questions</span>
              </div>
              {results.faqs.map((faq, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-amber-50/40 border border-amber-100/60 space-y-1">
                  <div className="font-bold text-text-primary">Q: {faq.question}</div>
                  <div className="text-gray-600 text-[11px]">A: {faq.answer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center text-[10px] text-gray-400 flex justify-between items-center px-6">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded font-mono text-[9px]">ESC</kbd> to exit</span>
          <span>PindDaanWale Global Search</span>
        </div>
      </div>
    </div>
  );
}
