'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  ChevronDown, 
  CloudSun, 
  Menu, 
  X, 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Flower2,
  Landmark,
  FileText,
  Video,
  Search,
  Compass
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import GlobalSearchModal from '@/components/common/GlobalSearchModal';
import LanguageConverter from '@/components/common/LanguageConverter';
import VedicDiagnosticModal from '@/components/ai/VedicDiagnosticModal';
import { useAppLanguage } from '@/lib/useAppLanguage';

interface NavbarProps {
  packages?: any[];
  sacredPlaces?: any[];
}

export default function Navbar({ packages = [], sacredPlaces = [] }: NavbarProps) {
  const { isHindi } = useAppLanguage();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection(prev => prev === section ? null : section);
  };

  // Fallback packages if none provided
  const displayPackages = packages.length > 0 ? packages : [
    {
      slug: '1-day-essential-pind-daan',
      title: '1-Day Essential Pind Daan',
      priceINR: 4500,
      shortDesc: 'Single day package at Vishnupad & Falgu River. Fixed dakshina ₹4,500.'
    },
    {
      slug: '3-day-complete-tri-sthali',
      title: '3-Day Tri-Sthali Pilgrimage',
      priceINR: 12500,
      shortDesc: 'Complete 45-Vedi trail with AC cab and hotel stay. Fixed dakshina ₹12,500.'
    },
    {
      slug: 'nri-remote-live-stream',
      title: 'NRI Remote Live Stream Rites',
      priceINR: 8500,
      shortDesc: 'Live 4K Zoom stream for devotees abroad with global prasadam delivery.'
    }
  ];

  // Fallback sacred places if none provided
  const displaySacredPlaces = sacredPlaces.length > 0 ? sacredPlaces : [
    { slug: 'vishnupad-temple', name: 'Vishnupad Temple', description: 'Primary sanctuary housing the footprint of Lord Vishnu.' },
    { slug: 'falgu-river', name: 'Falgu River & Sita Kund', description: 'Sacred riverbank where Mata Sita offered sand pind to King Dasharatha.' },
    { slug: 'akshayavat', name: 'Akshayavat Banyan Tree', description: 'The eternal banyan tree for final ancestral oblations.' },
    { slug: 'pretshila', name: 'Pretshila Hill Shrine', description: 'Sacred hill for granting peace to unfulfilled souls.' }
  ];

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-amber-900/10"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      
      {/* Top Announcement Ribbon */}
      <div className="bg-[#1a1410] text-gray-200 text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1.5 sm:gap-2">
          
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-medium text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#F48D08] animate-pulse shrink-0" />
            <span>Pitripaksha Mela 2026: <strong>26 Sept – 10 Oct</strong> • Gaya Ji, Bihar</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px]">
            <div className="hidden lg:flex items-center gap-1.5 text-gray-300 border-r border-white/20 pr-4">
              <CloudSun className="w-3.5 h-3.5 text-[#F48D08]" />
              <span>Gaya Ji · 30°C Clear</span>
            </div>

            <a href="tel:+917463055338" className="flex items-center gap-1 hover:text-[#F48D08] transition-colors font-medium">
              <Phone className="w-3 h-3 text-[#F48D08]" />
              <span>Pooja Helpline: <strong>+91 7463055338</strong></span>
            </a>

            <Link 
              href="/pre-booking" 
              className="hidden sm:inline-flex bg-[#F48D08] hover:bg-[#D97706] text-white px-3.5 py-1 rounded-full font-bold transition-all shadow-sm items-center gap-1 text-[10px] sm:text-[11px]"
            >
              <Sparkles className="w-3 h-3 fill-current" />
              <span>Pre-Book Pind Daan</span>
            </Link>

            <div className="hidden sm:block">
              <LanguageConverter />
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24 md:h-[96px]">
          
          <Logo />

          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 font-medium text-xs shrink-0">
            
            {/* Pinddaan Gaya Ji Mega Menu */}
            <div 
              className="static group shrink-0"
              onMouseEnter={() => setActiveMegaMenu('pinddaan')}
            >
              <button className={`flex items-center gap-1 py-7 font-bold transition-colors whitespace-nowrap ${activeMegaMenu === 'pinddaan' ? 'text-[#F48D08] border-b-2 border-[#F48D08]' : 'text-text-primary hover:text-[#F48D08]'}`}>
                <span className="whitespace-nowrap">Pinddaan Gaya Ji</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#F48D08] transition-transform duration-200 ${activeMegaMenu === 'pinddaan' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* About Vishnupad Mega Menu */}
            <div 
              className="static group shrink-0"
              onMouseEnter={() => setActiveMegaMenu('vishnupad')}
            >
              <button className={`flex items-center gap-1 py-7 font-bold transition-colors whitespace-nowrap ${activeMegaMenu === 'vishnupad' ? 'text-[#F48D08] border-b-2 border-[#F48D08]' : 'text-text-primary hover:text-[#F48D08]'}`}>
                <span className="whitespace-nowrap">About Vishnupad</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#F48D08] transition-transform duration-200 ${activeMegaMenu === 'vishnupad' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Ritual Packages Mega Menu (DYNAMICALLY RENDERED FROM HOSTINGER MYSQL DB!) */}
            <div 
              className="static group shrink-0"
              onMouseEnter={() => setActiveMegaMenu('packages')}
            >
              <button className={`flex items-center gap-1 py-7 font-bold transition-colors whitespace-nowrap ${activeMegaMenu === 'packages' ? 'text-[#F48D08] border-b-2 border-[#F48D08]' : 'text-text-primary hover:text-[#F48D08]'}`}>
                <span className="whitespace-nowrap">Ritual Packages</span>
                <span className="bg-amber-100 text-[#F48D08] text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ml-0.5 shrink-0">
                  {displayPackages.length}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#F48D08] transition-transform duration-200 ${activeMegaMenu === 'packages' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link 
              href="/blog" 
              className="hover:text-[#F48D08] text-text-primary font-bold py-7 transition-colors whitespace-nowrap shrink-0"
              onMouseEnter={() => setActiveMegaMenu(null)}
            >
              Videos & Articles
            </Link>

            <Link 
              href="/about" 
              className="hover:text-[#F48D08] text-text-primary font-bold py-7 transition-colors whitespace-nowrap shrink-0"
              onMouseEnter={() => setActiveMegaMenu(null)}
            >
              Our Story
            </Link>

            <Link 
              href="/contact" 
              className="hover:text-[#F48D08] text-text-primary font-bold py-7 transition-colors whitespace-nowrap shrink-0"
              onMouseEnter={() => setActiveMegaMenu(null)}
            >
              Contact Us
            </Link>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-2.5 py-1.5 rounded-full text-text-primary hover:text-[#F48D08] hover:bg-amber-50 transition-all flex items-center gap-1 font-bold text-xs whitespace-nowrap shrink-0"
              title="Search Packages, Sacred Places, FAQs (Cmd+K)"
            >
              <Search className="w-4 h-4 text-[#F48D08]" />
              <span className="hidden xl:inline">Search</span>
            </button>

            <button
              onClick={() => setIsDiagnosticOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-[11px] shadow-sm hover:shadow-md transition-all hover:scale-105 whitespace-nowrap shrink-0"
              title={isHindi ? "AI वैदिक पितृ दोष एवं पिंडदान जांच" : "AI Vedic Moksha & Pitru Dosh Assessment"}
            >
              <Sparkles className="w-3.5 h-3.5 fill-current text-slate-950" />
              <span>{isHindi ? 'AI पितृ दोष जांच' : 'AI Vedic Assessment'}</span>
            </button>

          </nav>

          <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-text-primary hover:text-[#F48D08] active:scale-95 transition-transform"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#F48D08]" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text-primary hover:text-[#F48D08] active:scale-95 transition-transform rounded-xl hover:bg-amber-50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#F48D08]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* 1. Pinddaan Gaya Ji Mega Panel */}
      {activeMegaMenu === 'pinddaan' && (
        <div 
          className="absolute top-full left-0 w-full bg-white border-b border-amber-900/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setActiveMegaMenu('pinddaan')}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div className="max-w-7xl mx-auto p-8 grid grid-cols-12 gap-8">
            <div className="col-span-8 grid grid-cols-2 gap-6">
              <Link href="/gaya-ji" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Flower2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">About Pinddaan Gaya Ji</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">Vedic significance of ancestral oblation and liberation at sacred Gaya Kshetra.</p>
                </div>
              </Link>

              <Link href="/blog/why-pind-daan-is-performed-only-at-gaya-ji" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Legend of Gayasur & Sanctity</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">The scriptural story from Vayu Purana granting eternal salvation to 101 generations.</p>
                </div>
              </Link>

              <Link href="/blog/tri-sthali-pind-daan-gaya-kashi-prayag" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Tri-Sthali Pilgrimage Sequence</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">Complete scriptural sequence covering Gaya Ji, Kashi, and Prayagraj.</p>
                </div>
              </Link>

              <Link href="/pind-daan" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">City Departure & Vidhi Hub</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">Pind Daan travel guidance from Delhi, Mumbai, Bengaluru, and global NRIs.</p>
                </div>
              </Link>
            </div>

            <div className="col-span-4 bg-amber-50/50 rounded-2xl p-4 border border-amber-900/10 space-y-3">
              <div className="h-40 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/images/gaya_vishnupad.jpg" alt="Pind Daan at Gaya Ji" className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Scriptural Sanctity</span>
              </div>
              <div className="space-y-1">
                <h5 className="font-serif font-bold text-sm text-text-primary">Gaya Kshetra Pind Daan</h5>
                <p className="text-xs text-text-secondary">Perform rituals with verified Vishnupad Temple Teerth Pandas.</p>
              </div>
              <Link href="/pre-booking" onClick={() => setActiveMegaMenu(null)} className="inline-flex items-center gap-1 text-[#F48D08] hover:text-[#D97706] font-bold text-xs pt-1">
                <span>Pre-Book Pind Daan Rites</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. About Vishnupad Mega Panel (FULL 4-ITEM 2x2 GRID - ZERO DUPLICATES) */}
      {activeMegaMenu === 'vishnupad' && (
        <div 
          className="absolute top-full left-0 w-full bg-white border-b border-amber-900/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setActiveMegaMenu('vishnupad')}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div className="max-w-7xl mx-auto p-8 grid grid-cols-12 gap-8">
            <div className="col-span-8 grid grid-cols-2 gap-6">
              <Link href="/sacred-places/vishnupad-temple" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Vishnupad Temple & Footprint</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">The 40 cm sacred basalt footprint of Lord Vishnu rebuilt by Ahilyabai Holkar.</p>
                </div>
              </Link>

              <Link href="/sacred-places/falgu-river" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Flower2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Falgu River & Sita Kund Rites</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">Sacred riverbank where Mata Sita offered sand pind to King Dasharatha.</p>
                </div>
              </Link>

              <Link href="/sacred-places/akshayavat" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Akshayavat Eternal Banyan</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">The undying sacred banyan tree for concluding ancestral oblations.</p>
                </div>
              </Link>

              <Link href="/sacred-places/pretshila" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Pretshila Hill Shrine</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">Sacred hill for granting eternal peace to premature and unfulfilled souls.</p>
                </div>
              </Link>
            </div>

            <div className="col-span-4 bg-amber-50/50 rounded-2xl p-4 border border-amber-900/10 space-y-3">
              <div className="h-40 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/images/gaya_vishnupad.jpg" alt="Vishnupad Temple" className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Main Sanctuary</span>
              </div>
              <div className="space-y-1">
                <h5 className="font-serif font-bold text-sm text-text-primary">Vishnupad Temple Complex</h5>
                <p className="text-xs text-text-secondary">The core center for offering pind and receiving divine blessings.</p>
              </div>
              <Link href="/sacred-places/vishnupad-temple" onClick={() => setActiveMegaMenu(null)} className="inline-flex items-center gap-1 text-[#F48D08] hover:text-[#D97706] font-bold text-xs pt-1">
                <span>View Full Temple Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}



      {/* 4. Ritual Packages Mega Panel (TOP 4 FEATURED + SEE ALL LINK) */}
      {activeMegaMenu === 'packages' && (
        <div 
          className="absolute top-full left-0 w-full bg-white border-b border-amber-900/10 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setActiveMegaMenu('packages')}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div className="max-w-7xl mx-auto p-8 grid grid-cols-12 gap-8">
            
            {/* Top 4 Featured Packages Grid (2x2 Clean Layout) */}
            <div className="col-span-8 grid grid-cols-2 gap-6">
              {displayPackages.slice(0, 4).map((pkg: any) => (
                <Link 
                  key={pkg.id || pkg.slug} 
                  href={`/packages`} 
                  onClick={() => setActiveMegaMenu(null)} 
                  className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform font-bold">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">
                        {pkg.title}
                      </h4>
                      <span className="text-[10px] font-bold text-[#F48D08] bg-amber-100 px-2 py-0.5 rounded-full">
                        ₹{pkg.priceINR?.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                      {pkg.shortDesc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Featured Card with Dynamic Count Link */}
            <div className="col-span-4 bg-amber-50/50 rounded-2xl p-4 border border-amber-900/10 space-y-3">
              <div className="h-40 rounded-xl overflow-hidden relative shadow-sm">
                <img src="/images/pind_daan_vidhi.jpg" alt="Ritual Packages" className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  TRANSPARENT DAKSHINA
                </span>
              </div>
              <div className="space-y-1">
                <h5 className="font-serif font-bold text-sm text-text-primary">Transparent Ritual Packages</h5>
                <p className="text-xs text-text-secondary">Fixed pricing, Basic & Gold VIP options, guaranteed panda lineage.</p>
              </div>
              <Link 
                href="/packages"
                onClick={() => setActiveMegaMenu(null)}
                className="inline-flex items-center gap-1.5 text-[#F48D08] hover:text-[#D97706] font-bold text-xs pt-1"
              >
                <span>Browse All Packages ({displayPackages.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation (Exactly mirrors Desktop / Laptop structure) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-5 py-5 space-y-4 text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 divide-y divide-gray-100">
            
            {/* 1. Home */}
            <div className="py-1">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-text-primary hover:text-[#F48D08] transition-colors"
              >
                <span className="font-bold text-sm">Home</span>
              </Link>
            </div>

            {/* 2. Pinddaan Gaya Ji (Accordion) */}
            <div className="py-1">
              <button 
                type="button"
                onClick={() => toggleMobileSection('pinddaan')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-text-primary hover:text-[#F48D08] transition-colors text-left"
              >
                <span className="font-bold text-sm">Pinddaan Gaya Ji</span>
                <ChevronDown className={`w-4 h-4 text-[#F48D08] transition-transform duration-200 ${expandedMobileSection === 'pinddaan' ? 'rotate-180' : ''}`} />
              </button>

              {expandedMobileSection === 'pinddaan' && (
                <div className="pl-3 pr-2 py-2 space-y-2 bg-amber-50/40 rounded-xl mt-1 border border-amber-900/5">
                  <Link 
                    href="/blog/why-pind-daan-is-performed-only-at-gaya-ji"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 text-xs text-text-secondary hover:text-[#F48D08] font-medium"
                  >
                    Why Pind Daan at Gaya Ji? (शास्त्र प्रमाण)
                  </Link>
                  <Link 
                    href="/gaya-ji"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 text-xs text-text-secondary hover:text-[#F48D08] font-medium"
                  >
                    45-Vedi Sacred Circuit Parikrama
                  </Link>
                  <Link 
                    href="/sacred-places/falgu-river"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 text-xs text-text-secondary hover:text-[#F48D08] font-medium"
                  >
                    Falgu River & Sita Kund (बालू पिंडदान)
                  </Link>
                  <Link 
                    href="/sacred-places/akshayavat"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 text-xs text-text-secondary hover:text-[#F48D08] font-medium"
                  >
                    Akshayavat Banyan Tree (अक्षय तृप्ति)
                  </Link>
                  <Link 
                    href="/pind-daan"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 text-xs text-[#F48D08] font-bold"
                  >
                    Complete Ritual Vidhi & Rules →
                  </Link>
                </div>
              )}
            </div>

            {/* 3. About Vishnupad (Accordion) */}
            <div className="py-1">
              <button 
                type="button"
                onClick={() => toggleMobileSection('vishnupad')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-text-primary hover:text-[#F48D08] transition-colors text-left"
              >
                <span className="font-bold text-sm">About Vishnupad</span>
                <ChevronDown className={`w-4 h-4 text-[#F48D08] transition-transform duration-200 ${expandedMobileSection === 'vishnupad' ? 'rotate-180' : ''}`} />
              </button>

              {expandedMobileSection === 'vishnupad' && (
                <div className="pl-3 pr-2 py-2 space-y-2 bg-amber-50/40 rounded-xl mt-1 border border-amber-900/5">
                  <Link 
                    href="/sacred-places/vishnupad-temple"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 text-xs text-text-secondary hover:text-[#F48D08] font-medium"
                  >
                    Vishnupad Temple Sanctuary & Footprint
                  </Link>
                  <Link 
                    href="/gaya-ji"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 text-xs text-text-secondary hover:text-[#F48D08] font-medium"
                  >
                    History, Architecture & Ahilyabai Holkar
                  </Link>
                  <Link 
                    href="/sacred-places"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 text-xs text-[#F48D08] font-bold"
                  >
                    Explore All 49 Sacred Vedis & Altars →
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Ritual Packages (Accordion with count badge) */}
            <div className="py-1">
              <button 
                type="button"
                onClick={() => toggleMobileSection('packages')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-text-primary hover:text-[#F48D08] transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Ritual Packages</span>
                  <span className="bg-amber-100 text-[#F48D08] text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                    {displayPackages.length}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#F48D08] transition-transform duration-200 ${expandedMobileSection === 'packages' ? 'rotate-180' : ''}`} />
              </button>

              {expandedMobileSection === 'packages' && (
                <div className="pl-3 pr-2 py-2 space-y-2 bg-amber-50/40 rounded-xl mt-1 border border-amber-900/5">
                  {displayPackages.map((pkg: any) => (
                    <Link
                      key={pkg.slug}
                      href={`/packages/${pkg.slug}/compare`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg hover:bg-white text-xs text-text-primary"
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{pkg.title}</span>
                        <span className="text-[#6f1d14] font-mono font-bold">₹{pkg.priceINR?.toLocaleString('en-IN') || '4,500'}</span>
                      </div>
                      <div className="text-[11px] text-text-secondary font-normal line-clamp-1">{pkg.shortDesc}</div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-amber-900/10 flex items-center justify-between">
                    <Link 
                      href="/packages/compare"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-[#6f1d14] font-bold hover:underline"
                    >
                      Compare Plans
                    </Link>
                    <Link 
                      href="/packages"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-[#F48D08] font-bold hover:underline"
                    >
                      All Packages ({displayPackages.length}) →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Videos & Articles */}
            <div className="py-1">
              <Link 
                href="/blog" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-text-primary hover:text-[#F48D08] transition-colors"
              >
                <span className="font-bold text-sm">Videos & Articles</span>
              </Link>
            </div>

            {/* 6. Our Story */}
            <div className="py-1">
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-text-primary hover:text-[#F48D08] transition-colors"
              >
                <span className="font-bold text-sm">Our Story</span>
              </Link>
            </div>

            {/* 7. Contact Us */}
            <div className="py-1">
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)} 
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-text-primary hover:text-[#F48D08] transition-colors"
              >
                <span className="font-bold text-sm">Contact Us</span>
              </Link>
            </div>

          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-500 font-bold">Select Language / भाषा:</span>
            <LanguageConverter />
          </div>

          {/* AI Vedic Diagnostic Mobile Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsDiagnosticOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-md active:scale-95 transition-transform"
          >
            <Sparkles className="w-4 h-4 fill-current text-slate-950" />
            <span>{isHindi ? 'AI पितृ दोष जांच (Vedic Diagnostic)' : 'AI Vedic Assessment (Vedic Diagnostic)'}</span>
          </button>

          {/* Quick Call Helpline Button */}
          <a
            href="tel:+917463055338"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-[#6f1d14] font-bold text-xs"
          >
            <Phone className="w-4 h-4 text-[#F48D08]" />
            <span>Pooja Helpline: +91 7463055338</span>
          </a>

          {/* Pre-Book CTA */}
          <Link 
            href="/pre-booking" 
            onClick={() => setMobileMenuOpen(false)} 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#6f1d14] via-[#F48D08] to-[#C6922E] text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-transform"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pre-Book Pind Daan Ritual</span>
          </Link>
        </div>
      )}

      {/* Global Vedic Diagnostic Modal */}
      <VedicDiagnosticModal 
        isOpen={isDiagnosticOpen} 
        onClose={() => setIsDiagnosticOpen(false)} 
        packages={displayPackages}
      />

    </header>
  );
}
