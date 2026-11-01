'use client';

import React, { useState } from 'react';
import { 
  Share2, 
  Printer, 
  MessageCircle, 
  X, 
  Check, 
  Copy, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  MapPin, 
  Sparkles,
  Download
} from 'lucide-react';

interface ShareItineraryModalProps {
  packageData: {
    title: string;
    slug: string;
    priceINR: number;
    duration: string;
    inclusions: string[] | string;
    exclusions?: string[] | string;
    vedisCovered?: string[];
  };
  buttonLabel?: string;
  variant?: 'outline' | 'primary' | 'card';
}

export default function ShareItineraryModal({ 
  packageData, 
  buttonLabel = 'Share Itinerary with Family', 
  variant = 'outline' 
}: ShareItineraryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const inclusionsList = Array.isArray(packageData.inclusions) 
    ? packageData.inclusions 
    : (packageData.inclusions ? packageData.inclusions.split('\n') : []);

  const pageUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/packages/${packageData.slug}`
    : `https://www.pinddaanwale.com/packages/${packageData.slug}`;

  // Formatted WhatsApp message
  const whatsappMessage = `*Gaya Ji Pind Daan Itinerary & Fixed Dakshina*
━━━━━━━━━━━━━━━━━━━━
📌 *Package:* ${packageData.title}
💰 *Fixed Dakshina:* ₹${packageData.priceINR.toLocaleString('en-IN')} (Zero Hidden Extortion)
⏱️ *Duration:* ${packageData.duration}
📍 *Sacred Sites:* Falgu River, Vishnupad Mandir, Akshayavat

✅ *Key Inclusions:*
${inclusionsList.slice(0, 5).map(inc => `• ${inc}`).join('\n')}
• Complete Vedic Samagri & Verified Gayawal Panda Included

🏛️ *Official Authority:* PindDaanWale (Vishnupad, Gaya Ji)
📞 *24x7 Helpline:* +91 7463055338
🔗 *View full itinerary & booking:*
${pageUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Trigger Button */}
      {variant === 'primary' ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs transition-all border border-slate-700"
        >
          <Share2 className="w-4 h-4 text-amber-400" />
          <span>{buttonLabel}</span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-all font-medium"
        >
          <Share2 className="w-3.5 h-3.5 text-amber-400" />
          <span>{buttonLabel}</span>
        </button>
      )}

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0E1626] border border-amber-500/40 p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 inline-block">
                Share With Parents & Family
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                {packageData.title}
              </h3>
              <p className="text-xs text-slate-400">
                Share full itinerary, inclusions, and fixed rate with your family via WhatsApp or print as a clean PDF.
              </p>
            </div>

            {/* Quick Summary Card (Printable Section) */}
            <div id="printable-itinerary" className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">100% Fixed Dakshina</span>
                  <div className="text-2xl font-serif font-bold text-amber-400">
                    ₹{packageData.priceINR.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Duration</span>
                  <span className="text-xs font-bold text-white">{packageData.duration}</span>
                </div>
              </div>

              {/* Inclusions */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase font-mono">
                  What’s Included:
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {inclusionsList.slice(0, 4).map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Zero Extortion Guarantee</span>
                </span>
                <span>Helpline: +91 7463055338</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* WhatsApp Share Button */}
              <button
                onClick={handleWhatsAppShare}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share to Family on WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                {/* Copy Text Button */}
                <button
                  onClick={handleCopy}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-200 inline-flex items-center justify-center gap-1.5 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>

                {/* Print / Save PDF Button */}
                <button
                  onClick={handlePrint}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-medium text-slate-200 inline-flex items-center justify-center gap-1.5 transition-all"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Print / PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
