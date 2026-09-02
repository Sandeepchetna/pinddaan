import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
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

  return (
    <footer className="relative w-full border-t-4 border-[#F48D08] bg-[#1a1410] text-gray-200 overflow-hidden">
      {/* Lightened Overlay - Visible Heritage Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
        style={{ backgroundImage: `url("${footerBgImage}")` }}
      >
        <div className="absolute inset-0 bg-black/45 bg-gradient-to-b from-[#1a1410]/50 via-black/40 to-[#120d0a]/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Col 1: Brand & Socials (4 Columns) */}
          <div className="md:col-span-4 space-y-6">
            <Logo light={true} />
            <p className="text-xs text-gray-200 font-medium leading-relaxed max-w-sm drop-shadow-sm">
              Provide authentic guidance for Pinddaan in Gaya Ji with complete devotion, transparency and authenticity.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-gray-200 hover:text-[#F48D08] hover:border-[#F48D08] transition-all backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-gray-200 hover:text-[#F48D08] hover:border-[#F48D08] transition-all backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-gray-200 hover:text-[#F48D08] hover:border-[#F48D08] transition-all backdrop-blur-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h4 className="font-serif font-bold text-base text-[#F48D08] tracking-wide inline-block border-b-2 border-[#F48D08] pb-1 drop-shadow">
                Quick Links
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-200 font-medium">
              <li><Link href="/" className="hover:text-[#F48D08] transition-colors">Home</Link></li>
              <li><Link href="/gaya-ji" className="hover:text-[#F48D08] transition-colors">Pinddaan Gaya Ji</Link></li>
              <li><Link href="/sacred-places/vishnupad-temple" className="hover:text-[#F48D08] transition-colors">About Vishnupad</Link></li>
              <li><Link href="/sacred-places" className="hover:text-[#F48D08] transition-colors">Site Seeing</Link></li>
              <li><Link href="/blog" className="hover:text-[#F48D08] transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="hover:text-[#F48D08] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Useful Links (2.5 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h4 className="font-serif font-bold text-base text-[#F48D08] tracking-wide inline-block border-b-2 border-[#F48D08] pb-1 drop-shadow">
                Useful Links
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-200 font-medium">
              <li><Link href="/blog/why-pind-daan-is-performed-only-at-gaya-ji" className="hover:text-[#F48D08] transition-colors">Importance of Pitripaksh</Link></li>
              <li><Link href="/gaya-ji" className="hover:text-[#F48D08] transition-colors">State Fair (45-Vedi)</Link></li>
              <li><Link href="/pind-daan" className="hover:text-[#F48D08] transition-colors">Rituals & Vidhi</Link></li>
              <li><Link href="/pre-booking" className="hover:text-[#F48D08] transition-colors">Panda Ji Services</Link></li>
              <li><Link href="/blog" className="hover:text-[#F48D08] transition-colors">Video Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-[#F48D08] transition-colors">Publications</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Us (4 Columns with Circular Badges) */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <h4 className="font-serif font-bold text-base text-[#F48D08] tracking-wide inline-block border-b-2 border-[#F48D08] pb-1 drop-shadow">
                Contact Us
              </h4>
            </div>
            <div className="space-y-4 text-xs text-gray-200 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-[#F48D08] shrink-0 backdrop-blur-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 7463055338</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-[#F48D08] shrink-0 backdrop-blur-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@pinddaanwale.com</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-[#F48D08] shrink-0 mt-0.5 backdrop-blur-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-relaxed">Vishnupad Temple Compound, Gaya Ji, Bihar – 823001, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
          <p className="text-center sm:text-left">
            Copyright © {new Date().getFullYear()} www.pinddaanwale.com | The Official Gaya Ji Digital Destination | Content Guided by Vishnupad Temple Management, Gaya Ji
          </p>
          <p className="text-center sm:text-right shrink-0">
            Design & Developed by{' '}
            <a
              href="https://www.nighwantech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F48D08] hover:text-amber-300 font-bold transition-colors underline decoration-[#F48D08]/50 underline-offset-4"
            >
              Nighwan Technology
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
