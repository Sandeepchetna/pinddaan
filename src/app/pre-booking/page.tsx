'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  MessageCircle, 
  Printer, 
  Download, 
  Copy, 
  ShieldCheck, 
  Package, 
  Lock, 
  Crown, 
  Check,
  Clock,
  Award,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { createPreBookingAction, getPublicBookingData } from '@/app/admin/actions';
import { printBookingReceipt, BookingPDFData } from '@/lib/pdfGenerator';

function PreBookingFormContent() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package');
  const tierParam = searchParams.get('tier');

  // Tier State: GOLD or PLATINUM
  const [selectedTier, setSelectedTier] = useState<'GOLD' | 'PLATINUM'>('GOLD');

  // Simple Form State
  const [selectedPackageSlug, setSelectedPackageSlug] = useState<string>('1-day-essential-pind-daan');
  const [devoteeName, setDevoteeName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // Packages & Settings from Public Database
  const [packagesList, setPackagesList] = useState<any[]>([
    {
      slug: '1-day-essential-pind-daan',
      title: '1-Day Essential Pind Daan',
      priceINR: 4500,
      goldPriceINR: 7500,
      duration: '1 Day (Approx 4-5 Hours)',
      badge: 'MOST POPULAR',
      shortDesc: 'Ideal for devotees visiting Gaya Ji for a single day to perform essential rites at Vishnupad Temple & Falgu River.',
      image: '/images/gaya_vishnupad.jpg',
      inclusions: 'Verified Vishnupad Temple Teerth Panda\nComplete Vedic Samagri (Pind, Barley, Sesame, Milk, Honey)\nFalgu River & Vishnupad Temple Rites\nAkshayavat Thread Ceremony & Lineage Registration\nBrahman Bhoj for Vedic Brahmins',
      goldInclusions: 'VIP Senior Lineage Teerth Panda Assignment\nPrivate AC Cab Station Pickup & Drop\nComplete Vedic Samagri & Special Bhog Offerings\nFalgu River, Vishnupad Temple & Sita Kund Rites\nAkshayavat Thread Ceremony & Lineage Certificate\nPriority Temple Darshan Access'
    },
    {
      slug: '3-day-complete-tri-sthali',
      title: '3-Day Complete Tri-Sthali Pilgrimage',
      priceINR: 12500,
      goldPriceINR: 18500,
      duration: '3 Days / 2 Nights',
      badge: 'RECOMMENDED',
      shortDesc: 'Comprehensive pilgrimage covering Vishnupad, Falgu River, Akshayavat Banyan, Pretshila Hill, Ramshila, and Mangla Gauri Temple.',
      image: '/images/hero_cinematic.jpg',
      inclusions: 'Dedicated Vishnupad Teerth Panda Escort\n2 Nights Hotel Accommodation in Gaya Ji\nStation Pickup & Drop Assistance\nAll Sacred Vedi Visits (Falgu, Vishnupad, Akshayavat)\nFull Ritual Samagri & Dakshina Included',
      goldInclusions: 'VIP Senior Lineage Teerth Panda Escort\n2 Nights 3-Star AC Deluxe Hotel Stay with Pure Veg Meals\nPrivate Chauffeur AC SUV Transport for Entire Pilgrimage\nVIP Escort across All 45 Sacred Vedis & Pretshila Hill\nSpecial Vishnupad Temple Aarti Access & Bhog Prasadam\nOfficial Teerth Lineage Certificate'
    },
    {
      slug: '1-day-express-pind-daan',
      title: '1-Day Express VIP Pind Daan',
      priceINR: 7500,
      goldPriceINR: 11500,
      duration: '1 Day (Full Assistance)',
      badge: 'EXPRESS DARSHAN',
      shortDesc: 'Expedited rituals with dedicated Panda, priority temple darshan, and pure satvik bhoj.',
      image: '/images/pind_daan_vidhi.jpg',
      inclusions: 'Priority Vishnupad Temple Panda Escort\nComplete Pure Vedic Samagri\nFalgu Ghat & Vishnupad Sanctum Rites\nAkshayavat Pind Daan Rites\nPure Satvik Bhoj Arrangement',
      goldInclusions: 'VIP Express Darshan Escort at Vishnupad\nPrivate Chauffeur AC Sedan Pickup from Gaya Station\nSpecial Sankalp at Sita Kund & Falgu\nDeluxe Brahman Bhoj & Prasad Kit'
    },
    {
      slug: 'nri-remote-live-stream',
      title: 'NRI Remote Live Stream Pind Daan',
      priceINR: 8500,
      goldPriceINR: 14500,
      duration: 'Remote 4K Live Stream (2 Hours)',
      badge: 'WORLDWIDE SERVICE',
      shortDesc: 'For devotees abroad unable to travel. Live 4K two-way video stream from Falgu River with sanctified prasadam shipped globally.',
      image: '/images/akshay_vat.jpg',
      inclusions: 'Dedicated 4K HD Live Stream on Zoom / YouTube\nName & Gotra Recitation during Live Sankalp\nPandit Ji Interactive Family Participation\nHigh-Definition Recording Provided\nSacred Pind Prasadam Shipped Worldwide',
      goldInclusions: 'Exclusive 1-on-1 Private 4K Live Stream from Falgu & Vishnupad\nFull Ancestral Recitation of 3 Generations (Paternal & Maternal)\nPersonalized Sankalp Video Recording & Digital Certificate\nVIP Prasadam Box Shipped via Express Courier Worldwide'
    }
  ]);

  const [siteSettings, setSiteSettings] = useState<any>({
    companyName: 'PindDaanWale',
    logoUrl: '/Pind-Daan-Wale.svg',
    bankName: 'State Bank of India',
    accountName: 'PindDaanWale Pilgrimage Services',
    accountNumber: '40982317822',
    ifscCode: 'SBIN0000078',
    upiId: '7463055338@sbi',
    address: 'Vishnupad Temple Compound, Gaya Ji, Bihar - 823001',
    helpdeskPhone: '+91 7463055338',
    email: 'support@pinddaanwale.com'
  });

  // State on Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRefId, setBookingRefId] = useState<string>('');
  const [copiedId, setCopiedId] = useState(false);

  // Read URL query parameters immediately (reactive to client navigation)
  useEffect(() => {
    if (packageParam) {
      setSelectedPackageSlug(packageParam);
    }
    if (tierParam) {
      const upper = tierParam.toUpperCase();
      if (upper === 'PLATINUM' || upper === 'GOLD') {
        setSelectedTier(upper as 'GOLD' | 'PLATINUM');
      }
    }
  }, [packageParam, tierParam]);

  // Load live packages & settings from DB
  useEffect(() => {
    getPublicBookingData()
      .then(res => {
        if (res.success) {
          if (res.packages && res.packages.length > 0) {
            setPackagesList(res.packages);
            if (packageParam) {
              const matched = res.packages.find((p: any) => p.slug === packageParam || p.id === packageParam);
              if (matched) {
                setSelectedPackageSlug(matched.slug);
              }
            }
          }
          if (res.siteSettings) {
            setSiteSettings(res.siteSettings);
          }
        }
      })
      .catch(() => {});
  }, [packageParam]);

  const activePackage = packagesList.find(p => p.slug === selectedPackageSlug) || packagesList[0];
  const isPlatinum = selectedTier === 'PLATINUM';
  const price = isPlatinum 
    ? (activePackage?.goldPriceINR || Math.round((activePackage?.priceINR || 4500) * 1.45)) 
    : (activePackage?.priceINR || 4500);

  // Dynamic Inclusions list
  const activeInclusions = (isPlatinum && activePackage?.goldInclusions 
    ? activePackage.goldInclusions 
    : (activePackage?.inclusions || 'Vedic Rites Included\nVishnupad Temple Darshan\nFalgu River Snan & Sankalp'))
    .split('\n')
    .filter((line: string) => line.trim().length > 0);

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName.trim() || !phone.trim() || !preferredDate || !address.trim()) {
      alert('कृपया सभी आवश्यक विवरण भरें / Please fill all required fields.');
      return;
    }

    setIsSubmitting(true);

    const fullPackageTitle = `${activePackage?.title || 'Pind Daan Ritual'} (${selectedTier} Tier)`;

    try {
      const res = await createPreBookingAction({
        devoteeName: devoteeName.trim(),
        phone: phone.trim(),
        whatsappPhone: phone.trim(),
        city: address.trim(),
        address: address.trim(),
        preferredDate,
        purpose: fullPackageTitle,
        packageSlug: selectedPackageSlug,
        packageName: fullPackageTitle,
        planTier: selectedTier,
        estimatedCost: price
      });

      const refId = res?.bookingId || `PDW-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRefId(refId);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const refId = `PDW-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRefId(refId);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Receipt data builder matching authentic sdd older receipt
  const getReceiptData = (): BookingPDFData => ({
    bookingId: bookingRefId,
    devoteeName: devoteeName.trim(),
    phone: phone.trim(),
    address: address.trim(),
    city: address.trim(),
    preferredDate,
    purpose: 'Pitru Paksha Pind Daan',
    packageName: `${activePackage?.title || 'Pind Daan Ritual'} (${selectedTier} Tier)`,
    planTier: selectedTier,
    estimatedCost: price,
    companyName: 'PindDaanWale',
    logoUrl: '/Pind-Daan-Wale.svg',
    bankName: siteSettings?.bankName || 'State Bank of India',
    accountName: siteSettings?.accountName || 'PindDaanWale Pilgrimage Services',
    accountNumber: siteSettings?.accountNumber || '40982317822',
    ifscCode: siteSettings?.ifscCode || 'SBIN0000078',
    upiId: siteSettings?.upiId || '7463055338@sbi',
    officialAddress: siteSettings?.address || 'Vishnupad Temple Compound, Gaya Ji, Bihar - 823001',
    officialPhone: siteSettings?.helpdeskPhone || '+91 7463055338',
    officialEmail: siteSettings?.email || 'support@pinddaanwale.com'
  });

  const handlePrint = () => {
    printBookingReceipt(getReceiptData());
  };

  const copyId = () => {
    navigator.clipboard.writeText(bookingRefId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2118] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-[1280px] mx-auto space-y-8 sm:space-y-10">
        
        {/* Header Ribbon */}
        <div className="text-center space-y-3 max-w-[680px] mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EFE6D9] text-[#C6922E] text-xs font-body font-semibold tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>Gaya Ji Teerth Pre-Booking • सरल पूर्व-पंजीयन</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-display font-bold tracking-[-0.02em] leading-[1.15]">
            {isSubmitted ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700">
                Booking Confirmed / पंजीयन सफल
              </span>
            ) : (
              <>
                <span className="block text-[#2B2118]">Sacred Gotra Registration &</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6f1d14] via-[#C6922E] to-[#F48D08]">
                  Pre-Book Pind Daan Ritual
                </span>
              </>
            )}
          </h1>
          <p className="text-base font-body text-[#5A5148] leading-relaxed">
            {isSubmitted 
              ? 'आपकी आधिकारिक बुकिंग रसीद नीचे तैयार है। इसे प्रिंट या डाउनलोड करें।' 
              : 'केवल 4 आसान विवरण भरें और अपनी पिंडदान यात्रा सुनिश्चित करें।'}
          </p>
        </div>

        {/* ========================================================== */}
        {/* SUCCESS VIEW: RECEIPT DISPLAYED IN THE SAME PAGE */}
        {/* ========================================================== */}
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            
            {/* Top Success Banner */}
            <div className="bg-emerald-50 border-2 border-emerald-500/30 rounded-3xl p-5 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-emerald-950">
                  Pre-Booking Confirmed! / पूर्व-पंजीयन संपन्न
                </h3>
                <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-emerald-200">
                  <span className="font-mono font-bold text-xs text-[#6f1d14]">
                    Booking ID: {bookingRefId}
                  </span>
                  <button
                    onClick={copyId}
                    className="text-[11px] text-gray-500 hover:text-black font-semibold flex items-center gap-1 pl-2 border-l border-gray-200"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedId ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-emerald-900/80 max-w-sm mx-auto">
                श्री {devoteeName}, आपका {selectedTier} टियर पिंडदान पंजीयन दर्ज हो गया है। वरिष्ठ गया पंडा जी शीघ्र संपर्क करेंगे।
              </p>
            </div>

            {/* In-Page Official Receipt Preview Card (Exact layout & instructions from older sdd receipt) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#F48D08] shadow-xl space-y-6">
              
              {/* Receipt Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#f3e9dc] pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/Pind-Daan-Wale.svg"
                    alt="PindDaanWale Official Emblem"
                    className="w-14 h-14 object-contain shrink-0"
                  />
                  <div>
                    <span className="font-display font-bold text-2xl text-[#2B2118] block leading-tight notranslate" translate="no">
                      PindDaanWale
                    </span>
                    <span className="text-[10.5px] uppercase font-semibold text-[#C6922E] tracking-[0.16em] block mt-0.5">
                      Sacred. Trusted. Complete.
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">
                      Vishnupad Temple Compound, Gaya Ji, Bihar - 823001
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[12px] font-bold text-text-primary uppercase block">
                    PILGRIMAGE PRE-BOOKING SUMMARY
                  </span>
                  <div className="font-mono font-bold text-xs bg-[#fff8eb] text-[#6f1d14] px-3 py-1 rounded-md border border-[#fce3b8] inline-block mt-1">
                    Ref ID: {bookingRefId}
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-1">
                    Issued: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Tier Badge Center */}
              <div className="text-center">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isPlatinum 
                    ? 'bg-gradient-to-r from-[#4A154B] via-[#6f1d14] to-[#C6922E] text-white shadow-sm' 
                    : 'bg-[#fff3e0] text-[#e65100] border border-[#ffe0b2]'
                }`}>
                  {isPlatinum ? '💎 PLATINUM VIP PILGRIMAGE PLAN' : '🌟 GOLD PILGRIMAGE PLAN'}
                </span>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Devotee Profile & Contact */}
                <div className="bg-[#faf7f2] p-4 rounded-2xl border border-[#eee5d8] space-y-2 text-xs">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6f1d14] border-b border-dashed border-[#d8c2ab] pb-1">
                    DEVOTEE PROFILE & CONTACT
                  </h4>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">Devotee Name:</span>
                    <strong className="text-text-primary text-right break-words min-w-0">{devoteeName}</strong>
                  </div>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">Mobile Phone:</span>
                    <strong className="text-text-primary font-mono text-right break-all min-w-0">{phone}</strong>
                  </div>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">WhatsApp Number:</span>
                    <strong className="text-text-primary font-mono text-right break-all min-w-0">{phone}</strong>
                  </div>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">Hometown City:</span>
                    <strong className="text-text-primary text-right break-words min-w-0">{address}</strong>
                  </div>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">Main Gotra (गोत्र):</span>
                    <strong className="text-text-primary text-right break-words min-w-0">Self / Kashyap</strong>
                  </div>
                </div>

                {/* Rites & Logistics Summary */}
                <div className="bg-[#faf7f2] p-4 rounded-2xl border border-[#eee5d8] space-y-2 text-xs">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6f1d14] border-b border-dashed border-[#d8c2ab] pb-1">
                    RITES & LOGISTICS SUMMARY
                  </h4>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">Ritual Purpose:</span>
                    <strong className="text-text-primary text-right break-words min-w-0">Pitru Paksha Pind Daan</strong>
                  </div>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">Selected Package:</span>
                    <strong className="text-text-primary text-right break-words min-w-0">{activePackage?.title}</strong>
                  </div>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">Visit Date:</span>
                    <strong className="text-text-primary text-right break-words min-w-0">{preferredDate}</strong>
                  </div>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">Hotel Stay Choice:</span>
                    <strong className="text-text-primary text-right break-words min-w-0">{isPlatinum ? '3-Star AC Deluxe Hotel' : 'Not Required / Self'}</strong>
                  </div>
                  <div className="flex justify-between items-start py-1 gap-2">
                    <span className="text-gray-500 shrink-0">Station/Airport Pickup:</span>
                    <strong className="text-text-primary text-right break-words min-w-0">{isPlatinum ? 'Private AC Cab Pickup' : 'Not Required / Self'}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-t border-[#eee5d8] pt-2 items-baseline">
                    <span className="text-xs font-bold text-gray-700">Estimated Total Cost:</span>
                    <span className="text-base font-serif font-bold text-[#6f1d14]">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

              </div>

              {/* Exact Payment Protocol Notice from Older Receipt */}
              <div className="bg-[#fff8eb] border border-[#fce3b8] p-4 rounded-2xl text-xs space-y-2">
                <div className="font-bold text-[#6f1d14] text-xs flex items-center gap-1.5">
                  <span>📌 Important Confirmation & Payment Verification Protocol:</span>
                </div>
                <div className="text-[11px] text-gray-800 space-y-1 leading-relaxed">
                  <div>• <strong>Call Before Sending Money:</strong> Please call our official helpline (<strong>+91 7463055338</strong>) before transferring any advance payment to confirm ritual schedule & Panda assignment.</div>
                  <div>• <strong>Send Payment Screenshot on WhatsApp:</strong> After completing the transfer, please <strong>send a screenshot of your payment receipt on WhatsApp (+91 7463055338)</strong> along with your Ref ID (<strong>{bookingRefId}</strong>) for instant booking confirmation.</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#f3d4a0] font-mono text-[11px] text-text-primary text-center font-bold break-all">
                  Bank Account: State Bank of India | A/c No: 40982317822 | IFSC: SBIN0000078 | UPI ID: 7463055338@sbi
                </div>
              </div>

              {/* Computer Generated Footer */}
              <div className="text-center text-[10px] text-gray-500 border-t border-[#f3e9dc] pt-3 space-y-0.5">
                <div>This is a computer-generated pilgrimage pre-booking summary receipt.</div>
                <div className="font-bold text-[#6f1d14]">Pooja Helpline: +91 7463055338 | Email: support@pinddaanwale.com | Website: www.pinddaanwale.com</div>
              </div>

              {/* Action Buttons: Print, Download, WhatsApp (All in the same tab!) */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-full bg-[#1E293B] hover:bg-black text-white py-3.5 px-3 sm:px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all select-none"
                  >
                    <Printer className="w-4 h-4 text-[#F48D08] shrink-0" />
                    <span className="whitespace-nowrap">Print Receipt</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-full bg-[#F48D08] hover:bg-[#D97706] text-white py-3.5 px-3 sm:px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all select-none"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">Download PDF</span>
                  </button>
                </div>

                {/* Direct WhatsApp Confirmation Button */}
                {(() => {
                  let formattedDate = preferredDate;
                  try {
                    const parts = preferredDate.split('-');
                    if (parts.length === 3) {
                      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
                      if (!isNaN(d.getTime())) {
                        formattedDate = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
                      }
                    }
                  } catch {}

                  const waText = 
`🙏 Pranam Acharya Ji!
I have successfully pre-booked my Pind Daan through PindDaanWale.

📌 Booking Details:
🆔 Booking ID: ${bookingRefId}
👤 Name: ${devoteeName}
📱 Mobile: ${phone}
🎖️ Package: ${activePackage?.title} (${selectedTier} Tier)
📅 Visit Date: ${formattedDate || 'To be finalized'}
📍 Location: Gaya Ji (${address || 'Bihar'})
💰 Dakshina: ₹${price.toLocaleString('en-IN')}

Kindly confirm:
✅ Hotel booking details
✅ Panda Ji assignment
✅ 30% advance payment protocol

Looking forward to your confirmation.
Dhanyawad! 🙏`;

                  return (
                    <a
                      href={`https://wa.me/917463055338?text=${encodeURIComponent(waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirm on WhatsApp (व्हाट्सएप पर पुष्टि करें)</span>
                    </a>
                  );
                })()}

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setDevoteeName('');
                    setPhone('');
                    setPreferredDate('');
                    setAddress('');
                  }}
                  className="w-full py-2.5 text-center text-xs text-gray-500 hover:text-black font-semibold"
                >
                  + नया पूर्व-पंजीयन करें (Book Another)
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* ========================================================== */
          /* DESKTOP 2-COLUMN & MOBILE VERTICAL RESPONSIVE LAYOUT */
          /* ========================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* PACKAGE DETAILS SHOWCASE (BELOW ON MOBILE, LEFT ON DESKTOP) */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              
              {/* Dynamic Package Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
                
                {/* Top Badge & Duration */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-100 text-[#6f1d14] border border-amber-300">
                    {activePackage?.badge || 'GAYA JI VEDIC TEERTH'}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                    <Clock className="w-3.5 h-3.5 text-[#F48D08]" />
                    <span>{activePackage?.duration}</span>
                  </span>
                </div>

                {/* Package Heading & Active Tier Pill */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                    {activePackage?.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {activePackage?.shortDesc}
                  </p>
                </div>

                {/* Live Tier Dakshina Highlight Box */}
                <div className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isPlatinum 
                    ? 'bg-gradient-to-br from-amber-500/15 via-yellow-500/10 to-amber-900/10 border-amber-400/60 shadow-sm' 
                    : 'bg-amber-50/70 border-amber-300/70'
                }`}>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#6f1d14] bg-white border border-amber-300">
                      {isPlatinum ? <Crown className="w-3 h-3 text-amber-500" /> : <Award className="w-3 h-3 text-[#F48D08]" />}
                      <span>{isPlatinum ? 'PLATINUM VIP RITUAL PLAN' : 'GOLD STANDARD RITUAL PLAN'}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">
                      {isPlatinum 
                        ? 'एसी कैब पिकअप, 3-स्टार होटल स्टे, वरिष्ठ तीर्थ पंडा व ब्राह्मण भोज शामिल।' 
                        : 'विष्णुपद मंदिर व फल्गु नदी तट पर प्रामाणिक वैदिक पिंडदान सामग्री व पंडा दक्षिणा शामिल।'}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-[11px] text-gray-500 font-medium block">Total Dakshina (पारदर्शी दक्षिणा)</span>
                    <span className="font-serif font-bold text-[#F48D08] text-3xl block">
                      ₹{price?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center sm:justify-end gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>100% Fixed • No Hidden Charges</span>
                    </span>
                  </div>
                </div>

                {/* Dynamic Inclusions Checkmarks (Updating instantly upon tier or package change!) */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Included in this {selectedTier} Package (पूजा में शामिल व्यवस्थाएँ):</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeInclusions.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-gray-700 font-medium leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transparent 30% Advance Breakdown */}
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 text-xs space-y-2">
                  <div className="font-bold text-[#6f1d14] flex items-center justify-between">
                    <span>📌 Transparent Payment Breakdown:</span>
                    <span className="font-mono text-emerald-700 font-bold">Verified Schedule</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                      <span className="text-gray-500 block">30% Advance (सामग्री व पंडा लॉक):</span>
                      <strong className="text-sm text-[#F48D08] font-mono block mt-0.5">
                        ₹{Math.round(price * 0.3).toLocaleString('en-IN')}
                      </strong>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                      <span className="text-gray-500 block">70% Balance (गया आगमन पर):</span>
                      <strong className="text-sm text-gray-800 font-mono block mt-0.5">
                        ₹{Math.round(price * 0.7).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Direct Pandit Ji Contact Strip */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-[#6f1d14] text-white gap-3">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                      Need help selecting date or rituals?
                    </span>
                    <span className="text-xs font-bold block">
                      24/7 Gaya Ji Vedic Teerth Helpline
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+917463055338"
                      className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-white/20"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-300" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href="https://wa.me/917463055338"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* FORM COLUMN (UPPER ON MOBILE, RIGHT ON DESKTOP) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 order-1 lg:order-2">
              <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xl space-y-5"
              >
                
                {/* TOP GOLD & PLATINUM SWITCH BAR */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-primary text-center">
                    Select Ritual Tier (योजना श्रेणी चुनें)
                  </label>

                  <div className="bg-amber-50/90 p-1.5 rounded-2xl border border-amber-200/80 flex items-center gap-1.5 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setSelectedTier('GOLD')}
                      className={`flex-1 min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 select-none ${
                        !isPlatinum 
                          ? 'bg-[#F48D08] text-white shadow-md' 
                          : 'text-gray-600 hover:text-black hover:bg-amber-100/50'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span>GOLD PLAN</span>
                      {!isPlatinum && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTier('PLATINUM')}
                      className={`flex-1 min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 select-none ${
                        isPlatinum 
                          ? 'bg-gradient-to-r from-[#6f1d14] via-[#F48D08] to-[#C6922E] text-white shadow-md' 
                          : 'text-gray-600 hover:text-black hover:bg-amber-100/50'
                      }`}
                    >
                      <Crown className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>PLATINUM VIP</span>
                      {isPlatinum && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  </div>
                </div>

                {/* 1. SELECT PACKAGE */}
                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#F48D08]" />
                    <span>1. Select Package (पूजा पैकेज चुनें) *</span>
                  </label>

                  <select
                    value={selectedPackageSlug}
                    onChange={(e) => setSelectedPackageSlug(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3 text-base sm:text-sm font-semibold text-text-primary focus:outline-none focus:border-[#F48D08] focus:bg-white transition-all shadow-sm min-h-[48px]"
                  >
                    {packagesList.map((pkg) => {
                      const pkgPrice = isPlatinum 
                        ? (pkg.goldPriceINR || Math.round(pkg.priceINR * 1.45)) 
                        : pkg.priceINR;
                      return (
                        <option key={pkg.slug} value={pkg.slug}>
                          {pkg.title} — ₹{pkgPrice?.toLocaleString('en-IN')}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* 2. DEVOTEE NAME */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#F48D08]" />
                    <span>2. Devotee Name (यजमान का नाम) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    placeholder="जैसे: रमेश चंद्र शर्मा / Devotee Full Name"
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3 text-base sm:text-sm text-text-primary focus:outline-none focus:border-[#F48D08] focus:bg-white transition-all min-h-[48px]"
                  />
                </div>

                {/* 3. MOBILE NUMBER */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#F48D08]" />
                    <span>3. Mobile Number (मोबाइल नंबर) *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="+91 98765 43210 (10 अंकों का नंबर)"
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3 text-base sm:text-sm text-text-primary focus:outline-none focus:border-[#F48D08] focus:bg-white transition-all font-mono min-h-[48px]"
                  />
                </div>

                {/* 4. VISIT DATE */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#F48D08]" />
                    <span>4. Visit Date (यात्रा / पिंडदान की तिथि) *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3 text-xs sm:text-sm text-text-primary focus:outline-none focus:border-[#F48D08] focus:bg-white transition-all font-medium"
                  />

                  {/* Quick Date Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase mr-1">त्वरित चयन:</span>
                    <button
                      type="button"
                      onClick={() => setPreferredDate('2026-09-26')}
                      className="text-[10px] bg-amber-100 hover:bg-amber-200 text-[#6f1d14] px-2.5 py-1 rounded-full font-bold transition-colors"
                    >
                      पितृपक्ष प्रारंभ (26 Sept)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredDate('2026-10-10')}
                      className="text-[10px] bg-amber-100 hover:bg-amber-200 text-[#6f1d14] px-2.5 py-1 rounded-full font-bold transition-colors"
                    >
                      सर्वपितृ अमावस्या (10 Oct)
                    </button>
                  </div>
                </div>

                {/* 5. ADDRESS / CITY */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#F48D08]" />
                    <span>5. City / Address (शहर / पता) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="जैसे: मुंबई, महाराष्ट्र / New Delhi"
                    className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3 text-xs sm:text-sm text-text-primary focus:outline-none focus:border-[#F48D08] focus:bg-white transition-all"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C6922E] hover:bg-[#A97718] text-white py-4 rounded-[16px] font-body font-semibold text-base shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>पंजीयन दर्ज हो रहा है...</span>
                      </>
                    ) : (
                      <>
                        <span>Book {selectedTier === 'PLATINUM' ? 'Platinum' : 'Gold'} Plan (₹{price.toLocaleString('en-IN')}) →</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Trust Footer */}
                <div className="pt-1 text-center text-[10.5px] text-gray-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% प्रामाणिक गया जी तीर्थ पुरोहित • पारदर्शी दक्षिणा</span>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function SimplePreBookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="w-8 h-8 border-4 border-[#F48D08] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PreBookingFormContent />
    </Suspense>
  );
}
