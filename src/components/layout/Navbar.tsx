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
  Search
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import GlobalSearchModal from '@/components/common/GlobalSearchModal';
import LanguageConverter from '@/components/common/LanguageConverter';

interface NavbarProps {
  packages?: any[];
  sacredPlaces?: any[];
}

export default function Navbar({ packages = [], sacredPlaces = [] }: NavbarProps) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      <div className="bg-[#1a1410] text-gray-200 text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#F48D08] animate-pulse shrink-0" />
            <span>Pitripaksha Mela 2026: <strong>26 Sept 2026 – 10 Oct 2026</strong> • Gaya Ji, Bihar</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="hidden lg:flex items-center gap-1.5 text-gray-300 border-r border-white/20 pr-4">
              <CloudSun className="w-3.5 h-3.5 text-[#F48D08]" />
              <span>Gaya Ji · 30°C Clear</span>
            </div>

            <a href="tel:+917463055338" className="flex items-center gap-1.5 hover:text-[#F48D08] transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-[#F48D08]" />
              <span>Pooja Helpline: <strong>+91 7463055338</strong></span>
            </a>

            <Link 
              href="/pre-booking" 
              className="bg-[#F48D08] hover:bg-[#D97706] text-white px-4 py-1 rounded-full font-bold transition-all shadow-sm flex items-center gap-1.5 text-[11px]"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          
          <Logo />

          <nav className="hidden lg:flex items-center gap-8 font-medium text-xs">
            
            <Link 
              href="/" 
              className="hover:text-[#F48D08] text-text-primary font-bold py-7 border-b-2 border-transparent hover:border-[#F48D08] transition-colors"
              onMouseEnter={() => setActiveMegaMenu(null)}
            >
              Home
            </Link>

            {/* Pinddaan Gaya Ji Mega Menu */}
            <div 
              className="static group"
              onMouseEnter={() => setActiveMegaMenu('pinddaan')}
            >
              <button className={`flex items-center gap-1 py-7 font-bold transition-colors ${activeMegaMenu === 'pinddaan' ? 'text-[#F48D08] border-b-2 border-[#F48D08]' : 'text-text-primary hover:text-[#F48D08]'}`}>
                <span>Pinddaan Gaya Ji</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#F48D08] transition-transform duration-200 ${activeMegaMenu === 'pinddaan' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* About Vishnupad Mega Menu */}
            <div 
              className="static group"
              onMouseEnter={() => setActiveMegaMenu('vishnupad')}
            >
              <button className={`flex items-center gap-1 py-7 font-bold transition-colors ${activeMegaMenu === 'vishnupad' ? 'text-[#F48D08] border-b-2 border-[#F48D08]' : 'text-text-primary hover:text-[#F48D08]'}`}>
                <span>About Vishnupad</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#F48D08] transition-transform duration-200 ${activeMegaMenu === 'vishnupad' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Ritual Packages Mega Menu (DYNAMICALLY RENDERED FROM HOSTINGER MYSQL DB!) */}
            <div 
              className="static group"
              onMouseEnter={() => setActiveMegaMenu('packages')}
            >
              <button className={`flex items-center gap-1 py-7 font-bold transition-colors ${activeMegaMenu === 'packages' ? 'text-[#F48D08] border-b-2 border-[#F48D08]' : 'text-text-primary hover:text-[#F48D08]'}`}>
                <span>Ritual Packages</span>
                <span className="bg-amber-100 text-[#F48D08] text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ml-0.5">
                  {displayPackages.length}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#F48D08] transition-transform duration-200 ${activeMegaMenu === 'packages' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link 
              href="/blog" 
              className="hover:text-[#F48D08] text-text-primary font-bold py-7 transition-colors"
              onMouseEnter={() => setActiveMegaMenu(null)}
            >
              Videos & Articles
            </Link>

            <Link 
              href="/contact" 
              className="hover:text-[#F48D08] text-text-primary font-bold py-7 transition-colors"
              onMouseEnter={() => setActiveMegaMenu(null)}
            >
              Contact Us
            </Link>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-text-primary hover:text-[#F48D08] hover:bg-amber-50 transition-all flex items-center gap-1 font-bold text-xs"
              title="Search Packages, Sacred Places, FAQs (Cmd+K)"
            >
              <Search className="w-4 h-4 text-[#F48D08]" />
              <span className="hidden xl:inline">Search</span>
            </button>

          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-text-primary hover:text-[#F48D08]"
              title="Search"
            >
              <Search className="w-5 h-5 text-[#F48D08]" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text-primary hover:text-[#F48D08]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Legend of Gayasur</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">The scriptural story from Vayu Purana granting eternal salvation to 101 generations.</p>
                </div>
              </Link>

              <Link href="/gaya-ji" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">45-Vedi Sacred Circuit</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">Explore the complete 45 sacred shrines sequence across Gaya Ji.</p>
                </div>
              </Link>

              <Link href="/blog/why-pind-daan-is-performed-only-at-gaya-ji" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Importance of Pitripaksha</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">The 16-day sacred fortnight rules, tithi dates, and pitru blessings.</p>
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

      {/* 2. About Vishnupad Mega Panel (FULL 4-ITEM 2x2 GRID) */}
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
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Vishnupad Temple History</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">Rebuilt in 1787 by Maharani Ahilyabai Holkar of Indore.</p>
                </div>
              </Link>

              <Link href="/sacred-places/vishnupad-temple" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Lord Vishnu Footprint</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">The 40 cm sacred footprint embedded in solid basalt rock.</p>
                </div>
              </Link>

              <Link href="/sacred-places/falgu-river" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Flower2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">Falgu & Sita Kund Rites</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">Sacred river bank adjacent to temple for initial Pind offering.</p>
                </div>
              </Link>

              <Link href="/sacred-places" onClick={() => setActiveMegaMenu(null)} className="group flex gap-4 p-4 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-900/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#F48D08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-text-primary group-hover:text-[#F48D08] transition-colors">45 Vedis Temple Circuit</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">Complete sequence of 45 sacred Vedis surrounding Vishnupad shrine.</p>
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

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 text-sm font-medium">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-text-primary hover:text-[#F48D08]">Home</Link>
          <Link href="/gaya-ji" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-text-primary hover:text-[#F48D08]">About Gaya Ji</Link>
          <Link href="/sacred-places/vishnupad-temple" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-text-primary hover:text-[#F48D08]">About Vishnupad</Link>
          <Link href="/packages" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-text-primary hover:text-[#F48D08]">Ritual Packages ({displayPackages.length})</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-text-primary hover:text-[#F48D08]">Videos & Knowledge</Link>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-bold">Select Language:</span>
            <LanguageConverter />
          </div>
          <Link href="/pre-booking" onClick={() => setMobileMenuOpen(false)} className="block text-center bg-[#F48D08] text-white py-3 rounded-full font-bold">
            Pre-Book Pind Daan Ritual
          </Link>
        </div>
      )}

    </header>
  );
}
