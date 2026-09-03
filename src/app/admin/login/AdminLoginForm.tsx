'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { loginAdminAction } from '../actions';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await loginAdminAction({ email, password });
      if (!res.success) {
        setErrorMessage(res.error || 'अमान्य क्रेडेंशियल / Invalid email or password');
        setLoading(false);
        return;
      }

      // Successful login -> Redirect to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'लॉगिन विफल रहा / Authentication failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 selection:bg-[#F48D08] selection:text-white relative overflow-hidden">
      {/* Background Sacred Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#6f1d14]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6f1d14] via-[#F48D08] to-[#C6922E] shadow-2xl shadow-amber-500/20 mb-4 ring-1 ring-white/20">
            <span className="font-serif font-bold text-2xl text-white tracking-wider">PD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight flex items-center justify-center gap-2">
            PindDaanWale
            <span className="text-xs uppercase px-2.5 py-0.5 rounded-full bg-[#F48D08]/20 border border-[#F48D08]/40 text-[#F48D08] font-mono font-bold tracking-normal">
              ERP 2.0
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Administrative Pilgrimage Control Center • Authorized Access Only
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1E293B]/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative">
          
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-700/60">
            <ShieldCheck className="w-5 h-5 text-[#F48D08]" />
            <h2 className="text-white font-serif font-bold text-base">सुरक्षित एडमिन लॉगिन / Secure Portal</h2>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                एडमिन ईमेल / Admin Email or ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pinddaanwale.com"
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F48D08] focus:ring-1 focus:ring-[#F48D08] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-300">
                  पासवर्ड / Master Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F48D08] focus:ring-1 focus:ring-[#F48D08] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-[#F48D08] to-[#D97706] hover:from-[#e07d03] hover:to-[#c66a02] text-white font-bold py-3.5 px-5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed group text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>प्रमाणित कर रहे हैं / Authenticating...</span>
                </>
              ) : (
                <>
                  <span>साइन इन करें / Sign In Securely</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F48D08]" />
              <span>Restricted to Authorized Gaya Ji Pilgrimage Administrators</span>
            </p>
          </div>
        </div>

        {/* Footer Credit */}
        <p className="text-center text-xs text-slate-400 mt-6">
          &copy; {new Date().getFullYear()} PindDaanWale™ • All Rights Reserved
        </p>
      </div>
    </div>
  );
}
