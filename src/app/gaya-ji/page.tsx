import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Compass, 
  Award, 
  Building2, 
  CheckCircle2, 
  HelpCircle,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';

export const metadata = {
  title: 'Gaya Ji Sacred Destination Guide | Pilgrimage Info & 45-Vedi Trail',
  description: 'Comprehensive Gaya Ji Pind Daan pilgrimage guide based on authentic district records. Complete 45-Vedi Teerth Sthali sequence, Vishnupad Temple history, Mela Tent Cities, and Emergency Helplines.',
};

export default function GayaJiDestinationPage() {
  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-8 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 sm:px-4 rounded-full bg-amber-100 text-[#F48D08] text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F48D08]" />
            <span>Comprehensive Gaya Ji Destination & Pilgrimage Guide</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.15]">
            <span className="block text-[#2B2118]">Gaya Ji — The Holy Seat of</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6f1d14] via-[#C6922E] to-[#F48D08]">
              Ancestral Liberation & Moksha
            </span>
          </h1>
          <p className="text-text-secondary text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Gaya Ji is the divine land where Lord Vishnu, Lord Rama, and Mata Sita performed ancestral rites. Recognized by the District Administration of Gaya and Bihar Tourism.
          </p>
        </div>

        {/* District Administration Emergency Control Room & Helplines (From Bihar Gov Portal) */}
        <section className="bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-amber-900/10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#F48D08]">Government & District Desk</span>
              <h2 className="text-2xl font-serif font-bold text-text-primary">District Administration Emergency & Control Room</h2>
            </div>
            <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
              24/7 Active Control Desk
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="bg-temple-alt/50 p-5 rounded-2xl border border-amber-900/10 space-y-2">
              <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#F48D08]" /> District Control Room
              </span>
              <p className="text-text-secondary">0631-2222500 / 0631-2222501</p>
              <p className="text-[10px] text-gray-500">Gaya Collectorate Desk</p>
            </div>

            <div className="bg-temple-alt/50 p-5 rounded-2xl border border-amber-900/10 space-y-2">
              <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F48D08]" /> Police Control Room
              </span>
              <p className="text-text-secondary">0631-2222241 / 112</p>
              <p className="text-[10px] text-gray-500">Emergency Police Security</p>
            </div>

            <div className="bg-temple-alt/50 p-5 rounded-2xl border border-amber-900/10 space-y-2">
              <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#F48D08]" /> Medical & Ambulance
              </span>
              <p className="text-text-secondary">102 / 0631-2220102</p>
              <p className="text-[10px] text-gray-500">ANMMCH & Pilgrim Hospital</p>
            </div>

            <div className="bg-temple-alt/50 p-5 rounded-2xl border border-amber-900/10 space-y-2">
              <span className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#F48D08]" /> Lost & Found Desk
              </span>
              <p className="text-text-secondary">0631-2222502</p>
              <p className="text-[10px] text-gray-500">Mela Tent City Desk</p>
            </div>
          </div>
        </section>

        {/* 45-Vedi Sacred Trail Sequence (Official Bihar Govt Mela Map) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#F48D08]">Scriptural Sequence</span>
            <h2 className="text-3xl font-serif font-bold text-text-primary">Canonical 45-Vedi Sacred Trail (गया तीर्थ स्थल)</h2>
            <p className="text-text-secondary text-sm">
              According to Vayu Purana and Bihar Tourism, performing Pind Daan across the 45-Vedi shrines guarantees absolute Moksha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm space-y-3">
              <span className="bg-amber-100 text-[#F48D08] font-bold text-xs px-3 py-1 rounded-full">Vedi 1 - 5</span>
              <h3 className="font-serif font-bold text-lg text-text-primary">Vishnupad Shrines Complex</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Includes Vishnupad Footprint, Rudrapad, Brahmapad, Matanga Vapi, and Gadadhar Temple. The primary sanctuary for ancestral oblations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm space-y-3">
              <span className="bg-amber-100 text-[#F48D08] font-bold text-xs px-3 py-1 rounded-full">Vedi 6 - 15</span>
              <h3 className="font-serif font-bold text-lg text-text-primary">Falgu River & Ghats</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Covers Dev Ghat, Sita Kund, Ram Ghat, Vaitarni Pond, and Goprajar Ghat. The holy site where Mata Sita offered sand pinds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm space-y-3">
              <span className="bg-amber-100 text-[#F48D08] font-bold text-xs px-3 py-1 rounded-full">Vedi 16 - 45</span>
              <h3 className="font-serif font-bold text-lg text-text-primary">Outer Sacred Circuit</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Extends to Akshayavat Banyan Tree, Pretshila Hill, Ramshila, Brahmayoni, Dharmaranya, Matangashram, and Gayasur Shrine.
              </p>
            </div>
          </div>
        </section>

        {/* Govt Tent Cities & Transport Facilities */}
        <section className="bg-temple-alt/60 p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-amber-900/10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#D97706]">Mela Infrastructure</span>
            <h2 className="text-3xl font-serif font-bold text-text-primary">Pitru Paksha Mela Tent Cities & Logistics</h2>
            <p className="text-text-secondary text-sm">
              During Pitru Paksha, Bihar Government establishes mega tent cities with free drinking water, lighting, and medical camps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 space-y-2">
              <h4 className="font-serif font-bold text-sm text-text-primary">Gandhi Maidan Tent City</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Accommodates over 50,000 pilgrims with free medical helpdesks, charging stations, and bio-toilets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 space-y-2">
              <h4 className="font-serif font-bold text-sm text-text-primary">E-Rickshaw Senior Mobility</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Dedicated green-corridor battery rickshaws for elderly pilgrims between Gaya Junction, Vishnupad, and Falgu River.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 space-y-2">
              <h4 className="font-serif font-bold text-sm text-text-primary">Designated Parking Hubs</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Organized parking at Bairagi, AN College Ground, and Bodhgaya Bypass with shuttle services.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold">Ready to Plan Your Pilgrimage to Gaya Ji?</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            Reserve your verified panda, hotel accommodation, and private airport pickup with complete peace of mind.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/pre-booking" className="bg-[#F48D08] hover:bg-[#D97706] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors shadow-md">
              Start Pre-Booking Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
