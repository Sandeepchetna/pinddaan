import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';
import { SiWhatsapp } from '@icons-pack/react-simple-icons';

export default function StickyMobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex items-center h-16">
        <a 
          href="tel:+917463055338" 
          className="flex-1 flex flex-col items-center justify-center h-full text-text-primary hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-200"
        >
          <Phone className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Call</span>
        </a>
        
        <a 
          href="https://wa.me/917463055338" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center h-full text-[#25D366] hover:bg-green-50 active:bg-green-100 transition-colors border-r border-gray-200"
        >
          <SiWhatsapp className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wide text-text-primary">WhatsApp</span>
        </a>

        <Link 
          href="/pre-booking" 
          className="flex-[2] flex flex-col items-center justify-center h-full bg-accent-gold text-white hover:bg-accent-copper active:bg-accent-copper transition-colors"
        >
          <CalendarCheck className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Book Now</span>
        </Link>
      </div>
    </div>
  );
}
