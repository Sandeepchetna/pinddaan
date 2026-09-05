import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact Us | Gaya Ji Pilgrimage Desk | PindDaanWale',
  description: 'Connect with our dedicated Gaya Ji pilgrimage facilitation desk. Direct phone support, hereditary Vishnupad panda coordination, and travel assistance.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">Direct Pilgrim Facilitation Desk</span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight leading-[1.15]">
            <span className="block text-[#2B2118]">Connect With Our</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6f1d14] via-[#C6922E] to-[#F48D08]">
              Gaya Ji Pilgrimage Desk
            </span>
          </h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Have questions about Tithi calculations, gotra lineage, or travel logistics? Speak directly with our dedicated Vedic coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-amber-900/10 shadow-sm space-y-6">
              <h2 className="text-xl font-serif font-bold text-text-primary border-b border-gray-100 pb-4">Direct Touchpoints</h2>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100/60 flex items-center justify-center text-accent-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-text-primary">Helpline Phone</h3>
                  <p className="text-xs text-text-secondary">+91 7463055338</p>
                  <p className="text-[10px] text-accent-copper font-medium mt-1">Available 24/7 during Pitru Paksha</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100/60 flex items-center justify-center text-accent-gold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-text-primary">Email Desk</h3>
                  <p className="text-xs text-text-secondary">support@pinddaanwale.com</p>
                  <p className="text-xs text-text-secondary">pandaji@pinddaanwale.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100/60 flex items-center justify-center text-accent-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-text-primary">Temple Desk Address</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Assam Bhawan Yatri Niwash, Gaya, Bihar 823001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100/60 flex items-center justify-center text-accent-gold shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-text-primary">Desk Hours</h3>
                  <p className="text-xs text-text-secondary">Mon - Sun: 5:00 AM - 9:00 PM IST</p>
                </div>
              </div>

            </div>

            <div className="bg-text-primary text-temple-ivory p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-accent-gold">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-xs uppercase tracking-wider">Authenticity Promise</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                All inquiries are processed by certified pandas registered with the Vishnupad Temple Management Committee.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-2xl border border-amber-900/10 shadow-sm space-y-6">
            <h2 className="text-2xl font-serif font-bold text-text-primary">Send an Inquiry</h2>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}
