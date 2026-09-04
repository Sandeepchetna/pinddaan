import Link from 'next/link';
import { Phone, Mail, MapPin, Compass, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import Logo from '@/components/common/Logo';
import prisma from '@/lib/prisma';

const db = prisma as any;

export default async function Footer() {
  let footerBgImage = '/images/gaya_vishnupad.jpg';
  try {
    if (db.siteSettings) {
      const settings = await db.siteSettings.findUnique({ where: { id: 'default' } });
      if (settings?.footerBgImage) {
        footerBgImage = settings.footerBgImage;
      }
    }
  } catch (err) {
    // fallback default
  }

  // Programmatic Departure City & Global NRI Country Registry (Fills both lines cleanly)
  const departureCities = [
    { name: 'Pind Daan from Delhi NCR', href: '/pind-daan/from-delhi' },
    { name: 'Pind Daan from Mumbai', href: '/pind-daan/from-mumbai' },
    { name: 'Pind Daan from Bengaluru', href: '/pind-daan/from-bengaluru' },
    { name: 'Pind Daan from Kolkata', href: '/pind-daan/from-kolkata' },
    { name: 'Pind Daan from Hyderabad', href: '/pind-daan/from-hyderabad' },
    { name: 'Pind Daan from Chennai', href: '/pind-daan/from-chennai' },
    { name: 'Pind Daan from Pune', href: '/pind-daan/from-pune' },
    { name: 'Pind Daan from Ahmedabad', href: '/pind-daan/from-ahmedabad' },
    { name: 'Pind Daan from Surat', href: '/pind-daan/from-surat' },
    { name: 'Pind Daan from Jaipur', href: '/pind-daan/from-jaipur' },
    { name: 'Pind Daan from Lucknow', href: '/pind-daan/from-lucknow' },
    { name: 'Pind Daan from Patna', href: '/pind-daan/from-patna' },
    { name: 'Pind Daan from Ranchi', href: '/pind-daan/from-ranchi' },
    { name: 'Pind Daan from Bhubaneswar', href: '/pind-daan/from-bhubaneswar' },
    { name: 'USA & Global NRI Pilgrimage', href: '/pind-daan/from-usa-nri' },
    { name: 'UK & London NRI Pilgrimage', href: '/pind-daan/from-uk-london' },
    { name: 'Canada (Toronto/Vancouver) NRIs', href: '/pind-daan/from-canada-nri' },
    { name: 'Australia (Sydney/Melbourne) NRIs', href: '/pind-daan/from-australia-nri' },
    { name: 'Dubai & UAE Gulf NRIs', href: '/pind-daan/from-dubai-uae-nri' },
    { name: 'Singapore & SE Asia NRIs', href: '/pind-daan/from-singapore-nri' },
  ];

  return (
    <footer className="relative w-full border-t-4 border-[#F48D08] bg-[#1a1410] text-gray-200 overflow-hidden">
      {/* Heritage Background Image with Subtle Saffron/Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
        style={{ backgroundImage: `url("${footerBgImage}")` }}
      >
        <div className="absolute inset-0 bg-black/55 bg-gradient-to-b from-[#1a1410]/70 via-black/50 to-[#120d0a]/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 space-y-12">
        
        {/* Main 5-Column Navigation Grid (Zero Duplicates) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          
          {/* Col 1: Brand & Authority Mission (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <Logo light={true} />
            <p className="text-xs text-gray-300 font-medium leading-relaxed drop-shadow-sm">
              Independent digital pilgrimage platform in direct collaboration with hereditary 4th & 5th generation Gaya Teerth Pandas. We facilitate authentic Vedic rites at authentic, fixed dakshina with zero bargaining and 100% hassle-free family coordination.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://www.facebook.com/pinddaanwale" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-gray-200 hover:text-[#C6922E] hover:border-[#C6922E] transition-all backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/pinddaan_wale" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-gray-200 hover:text-[#C6922E] hover:border-[#C6922E] transition-all backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@PindDaanWale" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-gray-200 hover:text-[#C6922E] hover:border-[#C6922E] transition-all backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Sacred Shrines & 45-Vedi Circuit (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#F48D08] tracking-wider uppercase inline-block border-b border-[#F48D08]/60 pb-1">
                Sacred 45-Vedi Shrines
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/sacred-places/vishnupad-temple" className="hover:text-[#F48D08] transition-colors">
                  Vishnupad Temple
                </Link>
              </li>
              <li>
                <Link href="/sacred-places/falgu-river" className="hover:text-[#F48D08] transition-colors">
                  Falgu River & Sita Kund
                </Link>
              </li>
              <li>
                <Link href="/sacred-places/akshayavat" className="hover:text-[#F48D08] transition-colors">
                  Akshayavat Eternal Banyan
                </Link>
              </li>
              <li>
                <Link href="/sacred-places/pretshila" className="hover:text-[#F48D08] transition-colors">
                  Pretshila Hill Shrine
                </Link>
              </li>
              <li>
                <Link href="/gaya-ji" className="hover:text-[#F48D08] transition-colors">
                  Official 45-Vedi Circuit
                </Link>
              </li>
              <li>
                <Link href="/sacred-places" className="hover:text-[#F48D08] transition-colors text-amber-300 font-bold">
                  All Sacred Shrines →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ritual Packages & Booking (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#F48D08] tracking-wider uppercase inline-block border-b border-[#F48D08]/60 pb-1">
                Ritual Packages
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/packages/1-day-essential-pind-daan" className="hover:text-[#F48D08] transition-colors">
                  1-Day Essential Pind Daan
                </Link>
              </li>
              <li>
                <Link href="/packages/3-day-complete-tri-sthali" className="hover:text-[#F48D08] transition-colors">
                  3-Day Tri-Sthali Pilgrimage
                </Link>
              </li>
              <li>
                <Link href="/packages/nri-remote-live-stream" className="hover:text-[#F48D08] transition-colors">
                  NRI Remote Live Stream
                </Link>
              </li>
              <li>
                <Link href="/packages/compare" className="hover:text-[#F48D08] transition-colors">
                  Compare Gold vs. Platinum
                </Link>
              </li>
              <li>
                <Link href="/pind-daan" className="hover:text-[#F48D08] transition-colors">
                  Rituals & Vidhi Guide
                </Link>
              </li>
              <li>
                <Link href="/pre-booking" className="hover:text-[#F48D08] transition-colors text-amber-300 font-bold">
                  Pre-Book Ritual Online →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Pilgrim Guides & Knowledge (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#F48D08] tracking-wider uppercase inline-block border-b border-[#F48D08]/60 pb-1">
                Pilgrim Guides
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li>
                <Link href="/travel-guide" className="hover:text-[#F48D08] transition-colors">
                  Gaya Travel & Train Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/why-pind-daan-is-performed-only-at-gaya-ji" className="hover:text-[#F48D08] transition-colors">
                  Why Pind Daan at Gaya Ji?
                </Link>
              </li>
              <li>
                <Link href="/blog/tri-sthali-pind-daan-gaya-kashi-prayag" className="hover:text-[#F48D08] transition-colors">
                  Tri-Sthali (Gaya-Kashi-Prayag)
                </Link>
              </li>
              <li>
                <Link href="/blog/complete-pitru-paksha-guidelines-for-nris" className="hover:text-[#F48D08] transition-colors">
                  NRI Pitru Paksha Guidelines
                </Link>
              </li>
              <li>
                <Link href="/blog/akshayavat-and-falgu-river-significance" className="hover:text-[#F48D08] transition-colors">
                  Falgu & Akshayavat Secrets
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#F48D08] transition-colors">
                  Gaya Teerth FAQs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F48D08] transition-colors text-amber-300 font-bold">
                  Our Story & Mission →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Official Contact & 24/7 Desk (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#F48D08] tracking-wider uppercase inline-block border-b border-[#F48D08]/60 pb-1">
                Temple Helpdesk
              </h4>
            </div>
            <div className="space-y-3.5 text-xs text-gray-300 font-medium">
              <a href="tel:+917463055338" className="flex items-center gap-2.5 hover:text-[#F48D08] transition-colors">
                <div className="w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-[#F48D08] shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 7463055338</span>
              </a>

              <a href="mailto:support@pinddaanwale.com" className="flex items-center gap-2.5 hover:text-[#F48D08] transition-colors">
                <div className="w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-[#F48D08] shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>support@pinddaanwale.com</span>
              </a>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-[#F48D08] shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-snug">Assam Bhawan Yatri Niwash, Gaya, Bihar – 823001</span>
              </div>

              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors"
                >
                  <span>Official Inquiry Desk</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================== */}
        {/* DEDICATED PROGRAMMATIC LOCAL SEO STRIP: DEPARTURE CITIES */}
        {/* ========================================================== */}
        <div className="pt-8 border-t border-white/15 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Compass className="w-4 h-4 text-[#F48D08]" />
              <span>Pind Daan Pilgrimage by Departure City & Global NRIs</span>
            </div>
            <Link 
              href="/pind-daan" 
              className="text-[11px] text-gray-300 hover:text-[#F48D08] font-bold transition-colors inline-flex items-center gap-1"
            >
              <span>Explore All Cities & Vidhi</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            {departureCities.map((city, idx) => (
              <Link
                key={idx}
                href={city.href}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/50 text-gray-300 hover:text-white transition-all backdrop-blur-sm"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-gray-300 font-medium text-center sm:text-left">
            Copyright © {new Date().getFullYear()} www.pinddaanwale.com | Trusted Digital Pilgrimage Platform | Guided by Hereditary Vishnupad Temple Pandas
          </p>
          <p className="text-center sm:text-right shrink-0">
            Design & Developed by{' '}
            <a
              href="https://www.nighwantech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C6922E] hover:text-amber-300 font-bold transition-colors underline decoration-[#C6922E]/50 underline-offset-4"
            >
              Nighwan Technology
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
