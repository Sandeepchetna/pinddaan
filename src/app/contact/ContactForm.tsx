'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Phone, AlertCircle } from 'lucide-react';
import { submitContactInquiryAction } from '@/app/admin/actions';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [purpose, setPurpose] = useState('Annual Shradh');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedLeadNumber, setSubmittedLeadNumber] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit WhatsApp/Phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContactInquiryAction({
        name: name.trim(),
        phone: cleanPhone,
        city: city.trim() || undefined,
        purpose,
        message: message.trim() || undefined
      });

      if (res.success) {
        setSubmittedLeadNumber(res.leadNumber || 'CONFIRMED');
      } else {
        setErrorMsg(res.error || 'Failed to submit inquiry. Please try calling directly.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred. Please call our 24/7 helpline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedLeadNumber) {
    return (
      <div className="bg-gradient-to-b from-[#FAF6EF] to-[#F5EFEB] p-8 sm:p-10 rounded-2xl border border-amber-500/30 text-center space-y-4 shadow-sm animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold bg-amber-500/15 text-amber-900 border border-amber-500/30 px-3 py-1 rounded-full inline-block">
            Reference: {submittedLeadNumber}
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#2B2118]">Pranam, {name} Ji!</h3>
          <p className="text-sm text-stone-700 max-w-md mx-auto leading-relaxed">
            Your sacred pilgrimage inquiry for <strong>{purpose}</strong> has been received by our Gaya Ji desk.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur p-4 rounded-xl border border-amber-900/10 text-xs text-stone-600 max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-amber-900 font-semibold">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>Assigned coordinator calling on: {phone}</span>
          </div>
          <p className="text-[11px] text-stone-500">
            Our hereditary Vishnupad Purohit will reach out via WhatsApp/Call to verify gotra, ancestors tithi, and package details.
          </p>
        </div>

        <button
          onClick={() => {
            setSubmittedLeadNumber(null);
            setName('');
            setPhone('');
            setCity('');
            setMessage('');
          }}
          className="text-xs font-bold text-accent-gold hover:text-accent-copper underline pt-2 block mx-auto"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3.5 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-2">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent-gold text-sm bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-primary mb-2">
            Phone Number / WhatsApp <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent-gold text-sm bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-2">City / Location</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Bengaluru / London"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent-gold text-sm bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-primary mb-2">Preferred Purpose</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent-gold text-sm bg-white"
          >
            <option value="Annual Shradh">Annual Shradh</option>
            <option value="First Time Pind Daan">First Time Pind Daan</option>
            <option value="Pitru Paksha Rites">Pitru Paksha Rites</option>
            <option value="Pitru Dosh Nivaran">Pitru Dosh Nivaran</option>
            <option value="Remote Live Pind Daan (NRI)">Remote Live Pind Daan (NRI)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-primary mb-2">Your Message / Query</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mention any specific dates, gotra queries, or senior citizen assistance required..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-accent-gold text-sm bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent-gold hover:bg-accent-copper text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shadow-md hover:shadow-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Inquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Pilgrimage Inquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
