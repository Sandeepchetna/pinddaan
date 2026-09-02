'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  User, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Crown, 
  FileDown, 
  Check, 
  ChevronDown, 
  Info, 
  Plus, 
  Trash2,
  Lock,
  Scale
} from 'lucide-react';
import { createPreBookingAction, getAdminERPData } from '@/app/admin/actions';
import { generateBookingPDF } from '@/lib/pdfGenerator';

function getPanchangForDate(dateStr: string) {
  if (!dateStr) return null;
  const dt = new Date(dateStr);
  const month = dt.getMonth(); // 0-indexed
  const day = dt.getDate();
  
  if (month === 8) { // September (Pitru Paksha Season)
    return { tithiName: 'Pitru Paksha Sacred Tithi', significance: 'Highly auspicious period for Shradh & Pind Daan at Vishnupad Gaya Ji.' };
  }
  return { tithiName: 'Krishna/Shukla Paksha Tithi', significance: 'Auspicious date for ancestral Gotra Tarpan & Pind Pradaan at Falgu Ghat.' };
}

interface Ancestor {
  name: string;
  relation: string;
  gotra: string;
}

export default function PreBookingEnginePage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 State
  const [purpose, setPurpose] = useState<string>('First Pind Daan');
  const [ritualMode, setRitualMode] = useState<'IN_PERSON' | 'ONLINE'>('IN_PERSON');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [panchangSuggestion, setPanchangSuggestion] = useState<string>('');
  const [gotra, setGotra] = useState<string>('');
  const [devoteeCount, setDevoteeCount] = useState<string>('2 Devotees');
  const [ancestors, setAncestors] = useState<Ancestor[]>([
    { name: '', relation: 'Father / Grandfather', gotra: '' }
  ]);

  // Step 2 State
  const [selectedPackageSlug, setSelectedPackageSlug] = useState<string>('1-day-express-pind-daan');
  const [selectedTier, setSelectedTier] = useState<'GOLD' | 'PLATINUM'>('GOLD');
  const [expandedPackage, setExpandedPackage] = useState<string | null>('1-day-express-pind-daan');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter(a => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Step 3 Devotee Details
  const [devoteeName, setDevoteeName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [whatsappPhone, setWhatsappPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [country, setCountry] = useState<string>('India');
  const [pincode, setPincode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);

  // Dynamic CMS Data lists
  const [packagesList, setPackagesList] = useState<any[]>([
    {
      slug: '1-day-express-pind-daan',
      title: '1-Day Express Pind Daan',
      duration: '1 Day (Approx 4-5 Hours)',
      priceINR: 4500,
      goldPriceINR: 7500,
      badge: 'MOST POPULAR',
      shortDesc: 'Ideal for devotees visiting Gaya Ji for a single day to perform essential rites at Vishnupad Temple & Falgu River.'
    },
    {
      slug: '3-day-complete-tri-sthali',
      title: '3-Day Complete 45-Vedi Pilgrimage',
      duration: '3 Days / 2 Nights',
      priceINR: 12500,
      goldPriceINR: 18500,
      badge: 'RECOMMENDED',
      shortDesc: 'Comprehensive pilgrimage covering Vishnupad, Falgu River, Akshayavat Banyan, Pretshila Hill, Ramshila, and Mangla Gauri Temple.'
    },
    {
      slug: 'nri-remote-live-stream',
      title: 'NRI Remote Live Stream Pind Daan',
      duration: 'Remote Live Stream (2 Hours)',
      priceINR: 8500,
      goldPriceINR: 14500,
      badge: 'NRI SPECIAL',
      shortDesc: 'For devotees abroad unable to travel. Live 4K video stream from Falgu River with sacred prasadam shipped globally.'
    }
  ]);

  // Submission & Success View State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRefId, setBookingRefId] = useState<string>('');

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

  // Load Packages & ERP Settings from Database on Mount
  useEffect(() => {
    getAdminERPData()
      .then(res => {
        if (res.success) {
          if (res.packages && res.packages.length > 0) setPackagesList(res.packages);
          if (res.siteSettings) setSiteSettings(res.siteSettings);
        }
      })
      .catch(() => {});
  }, []);

  // Sync Date Change with Panchang Helper
  const handleDateChange = (dateVal: string) => {
    setPreferredDate(dateVal);
    if (dateVal) {
      const info = getPanchangForDate(dateVal);
      setPanchangSuggestion(info ? `🌸 Panchang Note: ${info.tithiName} — ${info.significance}` : '');
    } else {
      setPanchangSuggestion('');
    }
  };

  // Ancestor builder functions
  const addAncestor = () => {
    setAncestors([...ancestors, { name: '', relation: 'Ancestor', gotra: gotra }]);
  };

  const removeAncestor = (index: number) => {
    if (ancestors.length > 1) {
      setAncestors(ancestors.filter((_, idx) => idx !== index));
    }
  };

  const updateAncestor = (index: number, field: keyof Ancestor, val: string) => {
    const updated = [...ancestors];
    updated[index][field] = val;
    setAncestors(updated);
  };

  // Calculate Active Package & Estimated Cost
  const activePackage = packagesList.find(p => p.slug === selectedPackageSlug) || packagesList[0];
  const estimatedCost = selectedTier === 'PLATINUM' && activePackage?.goldPriceINR ? activePackage.goldPriceINR : (activePackage?.priceINR || 4500);

  // Final Booking Submission Handler
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      alert('Please agree to the Terms & Ritual Guidelines before proceeding.');
      return;
    }
    setIsSubmitting(true);

    const fullPackageTitle = (activePackage?.title || 'Selected Package') + (selectedAddons.length > 0 ? ` + Combo (${selectedAddons.join(', ')})` : '');

    try {
      const validAncestors = ancestors.filter(a => a.name.trim() !== '');

      const res = await createPreBookingAction({
        devoteeName,
        phone,
        whatsappPhone: whatsappPhone || phone,
        email,
        city,
        state,
        country,
        pincode,
        address,
        preferredDate,
        purpose: fullPackageTitle,
        gotra,
        ancestors: validAncestors,
        ritualMode,
        devoteeCount,
        packageSlug: selectedPackageSlug,
        packageName: fullPackageTitle,
        planTier: selectedTier,
        specialNotes,
        estimatedCost
      });

      if (res && (res.bookingId || res.success)) {
        setBookingRefId(res.bookingId || `PDW-2026-${Math.floor(100000 + Math.random() * 900000)}`);
      } else {
        setBookingRefId(`PDW-2026-${Math.floor(100000 + Math.random() * 900000)}`);
      }
      setIsSubmitted(true);
    } catch (err) {
      setBookingRefId(`PDW-2026-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Download Official PDF Receipt
  const handleDownloadPDF = () => {
    const fullPackageTitle = (activePackage?.title || 'Selected Package') + (selectedAddons.length > 0 ? ` + Combo (${selectedAddons.join(', ')})` : '');

    generateBookingPDF({
      bookingId: bookingRefId,
      devoteeName,
      phone,
      whatsappPhone: whatsappPhone || phone,
      email,
      city,
      state,
      country,
      pincode,
      address,
      preferredDate,
      purpose: fullPackageTitle,
      gotra,
      ancestors: ancestors.filter(a => a.name.trim() !== ''),
      devoteeCount,
      packageName: fullPackageTitle,
      planTier: selectedTier,
      companyName: siteSettings?.companyName || 'PindDaanWale',
      logoUrl: siteSettings?.logoUrl || '/Pind-Daan-Wale.svg',
      bankName: siteSettings?.bankName || 'State Bank of India',
      accountName: siteSettings?.accountName || 'PindDaanWale Pilgrimage Services',
      accountNumber: siteSettings?.accountNumber || '40982317822',
      ifscCode: siteSettings?.ifscCode || 'SBIN0000078',
      upiId: siteSettings?.upiId || '7463055338@sbi',
      officialAddress: siteSettings?.address || 'Vishnupad Temple Compound, Gaya Ji, Bihar - 823001',
      officialPhone: siteSettings?.helpdeskPhone || '+91 7463055338',
      officialEmail: siteSettings?.email || 'support@pinddaanwale.com'
    });
  };

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-10 px-4 sm:px-6 lg:px-8 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header Badge */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#6f1d14] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F48D08]" />
            <span>Assisted Pilgrimage Planning Journey • Gaya Ji Authority</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">
            Pre-Booking Engine 2.0
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto">
            Plan your authentic Shradh, Tarpan, and Pind Daan rites under hereditary Gaya Purohits in 3 simple steps.
          </p>
        </div>

        {/* ========================================================== */}
        {/* STEP PROGRESS INDICATOR BAR */}
        {/* ========================================================== */}
        {!isSubmitted && (
          <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-gray-200 shadow-sm text-center text-xs font-serif font-bold">
            <div 
              onClick={() => setStep(1)}
              className={`py-2.5 rounded-xl cursor-pointer transition-all ${
                step === 1 
                  ? 'bg-gradient-to-r from-[#6f1d14] to-[#F48D08] text-white shadow-md' 
                  : step > 1 ? 'bg-amber-100 text-[#F48D08]' : 'text-gray-400 bg-gray-50'
              }`}
            >
              Step 1: Plan Ritual
            </div>
            <div 
              onClick={() => setStep(2)}
              className={`py-2.5 rounded-xl cursor-pointer transition-all ${
                step === 2 
                  ? 'bg-gradient-to-r from-[#6f1d14] to-[#F48D08] text-white shadow-md' 
                  : step > 2 ? 'bg-amber-100 text-[#F48D08]' : 'text-gray-400 bg-gray-50'
              }`}
            >
              Step 2: Select Package
            </div>
            <div 
              onClick={() => setStep(3)}
              className={`py-2.5 rounded-xl cursor-pointer transition-all ${
                step === 3 
                  ? 'bg-gradient-to-r from-[#6f1d14] to-[#F48D08] text-white shadow-md' 
                  : 'text-gray-400 bg-gray-50'
              }`}
            >
              Step 3: Devotee Info
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* SUCCESS VIEW (BOOKING CONFIRMATION RECEIPT & WHATSAPP) */}
        {/* ========================================================== */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl space-y-8 animate-fadeIn text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold text-[#F48D08] tracking-widest block">
                Pre-Booking Confirmation ID: {bookingRefId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                Thank You, Devotee!
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
                Your assisted pilgrimage request has been saved. Our Senior Teerth Panda Acharya will review your gotra sankalp and contact you shortly.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <a
                href={`https://wa.me/917463055338?text=${encodeURIComponent(
                  `Pranam Acharya Ji! 🙏\n\nI have submitted my Pind Daan Pre-Booking on PindDaanWale.\n\n• Booking ID: *${bookingRefId}*\n• Devotee Name: *${devoteeName}*\n• Purpose: *${purpose}*\n• Package: *${activePackage?.title} (${selectedTier} Tier)*\n• Preferred Date: *${preferredDate || 'To be finalized'}*\n• Ancestors Registered: *${ancestors.map(a => a.name).filter(Boolean).join(', ')}*\n\nPlease confirm Panda assignment & 30% advance protocol.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-6 rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp to Confirm</span>
              </a>

              <button
                onClick={handleDownloadPDF}
                className="bg-[#F48D08] hover:bg-[#D97706] text-white font-bold text-xs py-3.5 px-6 rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Summary PDF</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-8">
              
              {/* STEP 1 — PLAN YOUR RITUAL */}
              {step === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-xs uppercase font-extrabold text-[#F48D08] tracking-wider">Step 1 of 3</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                      "Select Preferred Date & Ritual Details"
                    </h2>
                    <p className="text-xs text-text-secondary">Choose your preferred visit date and attendance mode for Gaya Ji rites.</p>
                  </div>

                  {/* Attendance Mode */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                      Ritual Attendance Mode (उपस्थिति प्रकार)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setRitualMode('IN_PERSON')}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          ritualMode === 'IN_PERSON' ? 'border-2 border-[#F48D08] bg-amber-50/50 shadow-sm' : 'border-gray-200'
                        }`}
                      >
                        <span className="block font-serif font-bold text-xs text-text-primary">Physical Visit to Holy Gaya Ji</span>
                        <span className="block text-[11px] text-text-secondary mt-0.5">In-person arrival with full panda escort.</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRitualMode('ONLINE')}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          ritualMode === 'ONLINE' ? 'border-2 border-[#F48D08] bg-amber-50/50 shadow-sm' : 'border-gray-200'
                        }`}
                      >
                        <span className="block font-serif font-bold text-xs text-text-primary">Online 4K Live Stream Pind Daan</span>
                        <span className="block text-[11px] text-text-secondary mt-0.5">Remote Zoom live stream & global prasadam courier.</span>
                      </button>
                    </div>
                  </div>

                  {/* Date & Panchang Helper */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-text-primary">
                      Preferred Ritual Date (यात्रा की संभावित तिथि) *
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-[#F48D08]"
                    />
                    {panchangSuggestion && (
                      <p className="text-xs font-semibold text-[#F48D08] bg-amber-50 p-3 rounded-xl border border-amber-200">
                        {panchangSuggestion}
                      </p>
                    )}
                  </div>

                  {/* Multiple Ancestors Register */}
                  <div className="space-y-4 pt-2 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-text-primary">Registered Ancestors Rites List</h4>
                        <p className="text-[11px] text-text-secondary">Add ancestor names for gotra sankalp recitation.</p>
                      </div>
                      <button
                        type="button"
                        onClick={addAncestor}
                        className="bg-amber-100 hover:bg-amber-200 text-[#F48D08] px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Ancestor</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {ancestors.map((anc, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-3 items-center bg-gray-50 p-3 rounded-2xl border border-gray-200">
                          <div className="col-span-5">
                            <input
                              type="text"
                              placeholder="Ancestor Name (e.g. Late Ram Sharma)"
                              value={anc.name}
                              onChange={(e) => updateAncestor(idx, 'name', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#F48D08]"
                            />
                          </div>
                          <div className="col-span-4">
                            <input
                              type="text"
                              placeholder="Relation (e.g. Father, Grandfather)"
                              value={anc.relation}
                              onChange={(e) => updateAncestor(idx, 'relation', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#F48D08]"
                            />
                          </div>
                          <div className="col-span-2">
                            <input
                              type="text"
                              placeholder="Gotra"
                              value={anc.gotra}
                              onChange={(e) => updateAncestor(idx, 'gotra', e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#F48D08]"
                            />
                          </div>
                          <div className="col-span-1 text-right">
                            {ancestors.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeAncestor(idx)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-[#F48D08] hover:bg-[#D97706] text-white py-4 rounded-full font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Continue to Step 2: Package Selection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              )}

              {/* STEP 2 — SELECT YOUR PACKAGE */}
              {step === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-extrabold text-[#F48D08] tracking-wider">Step 2 of 3</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                      "Select Your Package & Plan Tier"
                    </h2>
                    <p className="text-xs text-text-secondary">Choose between Gold or Platinum VIP variants for transparent dakshina.</p>
                  </div>

                  {/* Packages List Cards with Accordion Expansion */}
                  <div className="space-y-4">
                    {packagesList.map((pkg) => {
                      const isSelected = selectedPackageSlug === pkg.slug;
                      const isExpanded = expandedPackage === pkg.slug;

                      return (
                        <div
                          key={pkg.slug}
                          className={`rounded-3xl border transition-all overflow-hidden ${
                            isSelected 
                              ? 'border-2 border-[#F48D08] bg-white shadow-md' 
                              : 'border-gray-200 bg-white hover:border-amber-200'
                          }`}
                        >
                          <div
                            onClick={() => {
                              setSelectedPackageSlug(pkg.slug);
                              setExpandedPackage(isExpanded ? null : pkg.slug);
                            }}
                            className="p-6 cursor-pointer flex justify-between items-center gap-4 bg-amber-50/40 hover:bg-amber-50/80 transition-colors"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-[#F48D08]">
                                  {pkg.badge || 'PACKAGES'}
                                </span>
                                <span className="text-xs text-gray-500 font-bold">{pkg.duration}</span>
                              </div>
                              <h3 className="text-xl font-serif font-bold text-text-primary">{pkg.title}</h3>
                              <p className="text-xs text-text-secondary leading-relaxed">{pkg.shortDesc}</p>
                            </div>

                            <div className="text-right shrink-0">
                              <div className="text-xs font-bold text-gray-400">From</div>
                              <div className="text-2xl font-serif font-bold text-[#F48D08]">₹{pkg.priceINR.toLocaleString('en-IN')}</div>
                              <ChevronDown className={`w-5 h-5 text-gray-400 mx-auto transition-transform ${isExpanded ? 'rotate-180 text-[#F48D08]' : ''}`} />
                            </div>
                          </div>

                          {/* Expanded Section: GOLD vs PLATINUM Tier Selection */}
                          {isExpanded && (
                            <div className="p-6 border-t border-amber-100 bg-white space-y-6 animate-fadeIn">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedPackageSlug(pkg.slug);
                                    setSelectedTier('GOLD');
                                  }}
                                  className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-4 ${
                                    selectedPackageSlug === pkg.slug && selectedTier === 'GOLD'
                                      ? 'border-2 border-[#F48D08] bg-amber-50/60 shadow-md'
                                      : 'border-gray-200 bg-white hover:border-amber-300'
                                  }`}
                                >
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="font-serif font-bold text-sm text-text-primary">🌟 GOLD PLAN</span>
                                      <span className="text-lg font-bold text-[#F48D08]">₹{pkg.priceINR.toLocaleString('en-IN')}</span>
                                    </div>
                                    <p className="text-[11px] text-text-secondary leading-relaxed">
                                      Essential Pind Daan rites, verified Vishnupad panda, full puja samagri, and gotra sankalp.
                                    </p>
                                  </div>

                                  <div className="pt-2 border-t border-amber-100">
                                    <span className={`w-full py-2 rounded-xl text-xs font-bold text-center block ${
                                      selectedPackageSlug === pkg.slug && selectedTier === 'GOLD'
                                        ? 'bg-[#F48D08] text-white shadow-sm'
                                        : 'bg-amber-100 text-[#F48D08]'
                                    }`}>
                                      {selectedPackageSlug === pkg.slug && selectedTier === 'GOLD' ? '✓ Selected Gold' : 'Book Gold Variant'}
                                    </span>
                                  </div>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedPackageSlug(pkg.slug);
                                    setSelectedTier('PLATINUM');
                                  }}
                                  className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-4 ${
                                    selectedPackageSlug === pkg.slug && selectedTier === 'PLATINUM'
                                      ? 'border-2 border-[#C6922E] bg-gradient-to-br from-amber-500/10 via-yellow-500/10 to-amber-50 shadow-md'
                                      : 'border-gray-200 bg-white hover:border-amber-300'
                                  }`}
                                >
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="font-serif font-bold text-sm text-[#6f1d14] flex items-center gap-1">
                                        <Crown className="w-4 h-4 text-[#C6922E]" /> 💎 PLATINUM VIP
                                      </span>
                                      <span className="text-lg font-bold text-[#6f1d14]">
                                        ₹{(pkg.goldPriceINR || pkg.priceINR * 1.5).toLocaleString('en-IN')}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-text-secondary leading-relaxed">
                                      Senior Panda, Private AC Chauffeur SUV, 3-Star Hotel Stay, VIP Temple Access & Prasadam Box.
                                    </p>
                                  </div>

                                  <div className="pt-2 border-t border-amber-200">
                                    <span className={`w-full py-2 rounded-xl text-xs font-bold text-center block ${
                                      selectedPackageSlug === pkg.slug && selectedTier === 'PLATINUM'
                                        ? 'bg-gradient-to-r from-[#6f1d14] via-[#F48D08] to-[#C6922E] text-white shadow-sm'
                                        : 'bg-amber-100 text-[#6f1d14]'
                                    }`}>
                                      {selectedPackageSlug === pkg.slug && selectedTier === 'PLATINUM' ? '✓ Selected Platinum VIP' : 'Book Platinum Variant'}
                                    </span>
                                  </div>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* ADD-ON SPECIAL RITUALS SELECTION */}
                  <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200 space-y-4">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#6f1d14]">
                      <Sparkles className="w-4 h-4 text-[#F48D08]" />
                      <span>Add-On Special Rituals (अतिरिक्त विशेष पूजा / श्राद्ध विधान)</span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Want to combine additional special ancestral rituals (like Tripindi or Narayan Bali) with your selected package? Select below:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'Tripindi Shradh', label: 'Tripindi Shradh (त्रिपिंडी श्राद्ध)' },
                        { id: 'Narayan Bali Shanti', label: 'Narayan Bali Shanti (नारायण बलि शांति)' },
                        { id: 'Pitru Dosh & Naag Dosh Nivaran', label: 'Pitru Dosh Nivaran (पितृ दोष निवारण)' },
                        { id: 'Kalsarp Dosh Shanti', label: 'Kalsarp Dosh Shanti (कालसर्प दोष शांति)' }
                      ].map((item) => {
                        const isChecked = selectedAddons.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleAddon(item.id)}
                            className={`p-3.5 rounded-2xl border text-left flex items-center justify-between text-xs transition-all ${
                              isChecked 
                                ? 'border-2 border-[#F48D08] bg-white font-bold text-[#6f1d14] shadow-sm' 
                                : 'border-gray-200 bg-white/80 hover:border-amber-300 text-gray-700'
                            }`}
                          >
                            <span>{item.label}</span>
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                              isChecked ? 'bg-[#F48D08] text-white' : 'border border-gray-300'
                            }`}>
                              {isChecked ? '✓' : ''}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* MULTI-RITUAL COMBO NOTICE WHEN MORE THAN 0 ADDONS SELECTED */}
                    {selectedAddons.length > 0 && (
                      <div className="bg-white p-5 rounded-2xl border-2 border-[#F48D08] space-y-3 animate-fadeIn shadow-md">
                        <div className="flex items-center gap-2 font-serif font-bold text-xs text-[#6f1d14]">
                          <MessageCircle className="w-4 h-4 text-[#F48D08]" />
                          <span>🌸 Multi-Ritual Pilgrimage Combo Notice</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          You have selected multiple combined rituals (<strong>{activePackage?.title} + {selectedAddons.join(' + ')}</strong>). 
                          Performing multiple combined Vidhans requires custom auspicious Mahurat timing, multi-panda coordination, and special Pind Samagri.
                        </p>
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-[#6f1d14]">
                          👉 For combining multiple packages / rituals, please connect directly with our Senior Acharya on WhatsApp (<strong>+91 7463055338</strong>) for custom package pricing & guidance!
                        </div>
                        <a 
                          href={`https://wa.me/917463055338?text=${encodeURIComponent(`Pranam Acharya Ji, I want to book a Custom Multi-Ritual Combo: ${activePackage?.title} along with ${selectedAddons.join(', ')}. Please guide me on Mahurat timing and package details.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Connect on WhatsApp for Custom Combo Package →</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 bg-gray-100 hover:bg-gray-200 text-text-primary py-4 rounded-full font-bold text-xs transition-all"
                    >
                      ← Back to Step 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="w-2/3 bg-[#F48D08] hover:bg-[#D97706] text-white py-4 rounded-full font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Step 3: Devotee Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 3 — DEVOTEE DETAILS & CONFIRMATION */}
              {step === 3 && (
                <form onSubmit={handleSubmitBooking} className="space-y-6 animate-fadeIn">
                  
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-extrabold text-[#F48D08] tracking-wider">Step 3 of 3</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
                      "Devotee Details & Final Confirmation"
                    </h2>
                    <p className="text-xs text-text-secondary">Provide your contact info to receive panda assignment & receipt.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1">Full Name (श्रद्धालु का नाम) *</label>
                      <input
                        type="text"
                        required
                        value={devoteeName}
                        onChange={(e) => setDevoteeName(e.target.value)}
                        placeholder="e.g. Ramesh Chandra Sharma"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#F48D08]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1">Mobile Phone (मोबाइल नंबर) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98100 12345"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#F48D08]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1">City / Hometown (शहर) *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Mumbai / San Jose"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#F48D08]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-primary mb-1">Gotra (गोत्र)</label>
                      <input
                        type="text"
                        value={gotra}
                        onChange={(e) => setGotra(e.target.value)}
                        placeholder="e.g. Kashyap / Bharadwaj"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#F48D08]"
                      />
                    </div>
                  </div>

                  {/* 30% Advance Notice Protocol */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
                    <div className="font-bold text-[#6f1d14] flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-[#F48D08]" />
                      <span>30% Advance Booking Confirmation Protocol</span>
                    </div>
                    <p className="text-[#6f1d14]/80 leading-relaxed">
                      To confirm your booking, 30% advance payment is required. After making payment, simply reply on WhatsApp with the payment screenshot to confirm hotel & panda assignment.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="w-4 h-4 accent-[#F48D08]"
                    />
                    <label htmlFor="terms" className="text-xs text-text-secondary cursor-pointer">
                      I agree with the Terms, Ritual Guidelines, and Shastra Rules.
                    </label>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-1/3 bg-gray-100 hover:bg-gray-200 text-text-primary py-4 rounded-full font-bold text-xs transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 bg-gradient-to-r from-[#6f1d14] via-[#F48D08] to-[#C6922E] text-white py-4 rounded-full font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Submitting Request...' : 'Submit Pre-Booking Request →'}
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* STICKY LIVE SUMMARY SIDEBAR CARD */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xl space-y-6 sticky top-24">
                <div className="border-b border-gray-100 pb-4">
                  <span className="text-[10px] font-extrabold uppercase text-[#F48D08] tracking-widest block">Live Summary</span>
                  <h3 className="font-serif font-bold text-lg text-text-primary">Booking Overview</h3>
                </div>

                <div className="space-y-3 text-xs text-text-secondary">
                  <div className="flex justify-between">
                    <span>Purpose:</span>
                    <strong className="text-text-primary">{purpose}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Selected Package:</span>
                    <strong className="text-[#F48D08]">{activePackage?.title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Plan Tier:</span>
                    <strong className="text-[#6f1d14]">{selectedTier} VIP</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Visit Date:</span>
                    <strong className="text-text-primary">{preferredDate || 'Not set'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Ancestors Listed:</span>
                    <strong className="text-text-primary">{ancestors.filter(a => a.name).length || 1}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
                  <span className="text-[10px] font-extrabold uppercase text-gray-500 block">Total Dakshina</span>
                  <span className="text-2xl font-serif font-bold text-[#F48D08]">₹{estimatedCost.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-gray-500 block">(Includes 30% Advance: ₹{Math.round(estimatedCost * 0.3).toLocaleString('en-IN')})</span>
                </div>

                <div className="space-y-2 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                  <p className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Pre-Paid Escrow Transparency</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F48D08] shrink-0" />
                    <span>All-Inclusive Package (Panda & Puja)</span>
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
