'use client';

import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Lock, 
  Phone, 
  HelpCircle,
  FileCheck2,
  HeartHandshake
} from 'lucide-react';
import { useAppLanguage } from '@/lib/useAppLanguage';

export default function ZeroExtortionPledge({ cityName }: { cityName?: string }) {
  const { isHindi } = useAppLanguage();

  return (
    <div className="my-10 space-y-6">
      {/* 1. Gold-Stamped Official Sacred Pledge Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C160C] via-[#141218] to-[#0D1527] border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl">
        {/* Background Decorative Seals */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? '100% निर्धारित दक्षिणा • शून्य बिचौलिया गारंटी' : '100% FIXED DAKSHINA • ZERO EXTORTION GUARANTEE'}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-snug">
              {isHindi ? (
                <>
                  PindDaanWale की पवित्र प्रतिज्ञा: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">जो बुक किया, वही अंतिम है</span>
                </>
              ) : (
                <>
                  The Sacred PindDaanWale Pledge: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">What You Book Is All You Pay</span>
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isHindi 
                ? 'गया जी तीर्थ में श्रद्धालुओं के साथ होने वाले अनुचित मोलभाव, अतिरिक्त दक्षिणा की मांग और स्टेशन के बिचौलियों से हम आपकी पूर्ण रक्षा करते हैं। बुकिंग के समय तय राशि में सम्पूर्ण वैदिक पूजन सामग्री, प्रमाणित पुरोहित दक्षिणा, विष्णुपद मंदिर दर्शन व नौका सेवा सम्मिलित है। घाट पर ₹1 भी अतिरिक्त नहीं देना होगा।'
                : 'We strictly protect pilgrims traveling to Gaya Ji from aggressive touts, unexpected price inflation at the ghats, and high-pressure bargaining. Your pre-booked package includes complete Vedic samagri, verified Vishnupad teerth purohit honorarium, temple access, and boat seva. Not a single extra rupee will ever be demanded at the holy riverbank.'}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{isHindi ? 'समस्त पूजन सामग्री सम्मिलित' : 'All Sacred Samagri Included'}</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <Lock className="w-4 h-4 shrink-0" />
                <span>{isHindi ? 'कोई अतिरिक्त छुपा खर्च नहीं' : 'No Hidden Extra Demands'}</span>
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <Award className="w-4 h-4 shrink-0" />
                <span>{isHindi ? 'प्रमाणित गया तीर्थ पंडा कुल' : 'Verified Gaya Ji Panda Lineage'}</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 text-center space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-400 block tracking-wider">
              {isHindi ? 'तीर्थयात्री सुरक्षा हेल्पलाइन' : 'PILGRIM PROTECTION HELPLINE'}
            </span>
            <a 
              href="tel:+917463055338" 
              className="font-mono font-extrabold text-lg text-white hover:text-amber-300 transition-colors block"
            >
              +91 7463055338
            </a>
            <span className="text-[11px] text-slate-400 block">
              {isHindi ? '24/7 तत्काल तीर्थ पुरोहित सहायता' : '24/7 Direct Teerth Assistance'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Comparison Table: Middlemen Trap vs PindDaanWale Protocol */}
      <div className="rounded-3xl bg-[#0E1626] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>{isHindi ? 'गया जी तीर्थयात्री सचेतक' : 'GAYA JI PILGRIM ADVISORY'}</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              {isHindi 
                ? 'स्टेशन के बिचौलियों का ट्रैप बनाम PindDaanWale प्रामाणिक व्यवस्था' 
                : 'The Station Middlemen Trap vs. PindDaanWale Verified Protocol'}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {isHindi 
                ? 'गया रेलवे स्टेशन अथवा बाहर मिलने वाले अनाधिकृत एजेंटों के झांसे से बचें।' 
                : 'Understand how unauthorized agents operate at stations and how our fixed protocol safeguards your ancestral rites.'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-bold">{isHindi ? 'पहलू (Aspect)' : 'Aspect'}</th>
                <th className="py-3.5 px-4 text-rose-400 font-bold bg-rose-950/20 rounded-t-xl">{isHindi ? 'अनाधिकृत एजेंट / बिचौलियों का ट्रैप' : 'Middlemen / Station Agents Trap'}</th>
                <th className="py-3.5 px-4 text-emerald-400 font-bold bg-emerald-950/20 rounded-t-xl">{isHindi ? 'PindDaanWale प्रामाणिक व्यवस्था' : 'PindDaanWale Sacred Protocol'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="py-4 px-4 font-bold text-white">{isHindi ? 'दक्षिणा एवं मूल्य' : 'Pricing & Dakshina'}</td>
                <td className="py-4 px-4 text-rose-300/90 bg-rose-950/10">
                  {isHindi ? 'स्टेशन पर बहुत कम बताकर आकर्षित करना, फिर घाट पर "संकल्प दक्षिणा" के नाम पर ₹15,000–₹25,000 तक का दबाव बनाना।' : 'Lures with unrealistically cheap quotes at station, followed by high-pressure demands of ₹15,000–₹25,000 mid-ritual.'}
                </td>
                <td className="py-4 px-4 text-emerald-300 font-semibold bg-emerald-950/10">
                  {isHindi ? '100% निश्चित एवं पारदर्शी मूल्य (₹4,500 आवश्यक / ₹12,500 त्रि-स्थली)। घाट पर ₹1 भी अतिरिक्त नहीं।' : '100% Fixed & Transparent (₹4,500 Essential / ₹12,500 Complete). Not a single extra rupee demanded at the riverbank.'}
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">{isHindi ? 'पुरोहित की प्रामाणिकता' : 'Purohit Authenticity'}</td>
                <td className="py-4 px-4 text-rose-300/90 bg-rose-950/10">
                  {isHindi ? 'गैर-पुरोहित बिचौलिए जो कमीशन पर काम करते हैं। बही-खाते या वंश परंपरा का कोई प्रमाण नहीं।' : 'Commission agents masquerading as priests with zero verifiable lineage or temple registration.'}
                </td>
                <td className="py-4 px-4 text-emerald-300 font-semibold bg-emerald-950/10">
                  {isHindi ? 'विष्णुपद मंदिर व फल्गु तीर्थ के प्रामाणिक गयावाल पंडा कुल, जो गरुड़ पुराण अनुसार विधि संपन्न कराते हैं।' : 'Generational Vishnupad Gaya Teerth Purohits maintaining authentic ancestral bahi-khata lineage records.'}
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">{isHindi ? 'पूजन सामग्री' : 'Ritual Samagri'}</td>
                <td className="py-4 px-4 text-rose-300/90 bg-rose-950/10">
                  {isHindi ? 'सामग्री का अतिरिक्त शुल्क जोड़ना या अधूरी सामग्री के साथ 15-20 मिनट में रस्म पूरी कर देना।' : 'Surprise extra charges for sesame, barley, milk, flowers, or rushed superficial rites in 15 minutes.'}
                </td>
                <td className="py-4 px-4 text-emerald-300 font-semibold bg-emerald-950/10">
                  {isHindi ? 'सम्पूर्ण शुद्ध वैदिक सामग्री (जौ का आटा, तिल, कुशा, गाय का दूध, वस्त्र, तुलसी) पहले से सम्मिलित।' : 'All sacred pure Vedic samagri (barley flour, black sesame, kusha ring, Ganga jal, vastram) 100% included.'}
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">{isHindi ? 'रेलवे स्टेशन / एयरपोर्ट आगमन' : 'Station / Airport Arrival'}</td>
                <td className="py-4 px-4 text-rose-300/90 bg-rose-950/10">
                  {isHindi ? 'गया जंक्शन के बाहर ऑटो चालकों और दलालों का घेराव जो भ्रमित कर किसी भी धर्मशाला में ले जाते हैं।' : 'Aggressive auto drivers and touts surrounding devotees at Gaya Jn exit, taking them to unverified stays.'}
                </td>
                <td className="py-4 px-4 text-emerald-300 font-semibold bg-emerald-950/10">
                  {isHindi ? 'PindDaanWale का अधिकृत वाहन व प्रतिनिधि नेम-बोर्ड के साथ आपको स्टेशन/एयरपोर्ट से सीधे रिसीव करता है।' : 'PindDaanWale assigned private AC chauffeur receives you at Gaya Jn / Patna Airport with a personalized name-board.'}
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-white">{isHindi ? 'मानसिक शांति व अनुभूति' : 'Mental Peace & Spiritual Focus'}</td>
                <td className="py-4 px-4 text-rose-300/90 bg-rose-950/10">
                  {isHindi ? 'मोलभाव, विवाद और अतिरिक्त पैसों की चिंता से पूर्वजों के मोक्ष का पवित्र उद्देश्य प्रभावित होता है।' : 'Stressful bargaining, disputes, and anxiety ruin the sacred, solemn purpose of ancestor liberation.'}
                </td>
                <td className="py-4 px-4 text-emerald-300 font-semibold bg-emerald-950/10">
                  {isHindi ? 'सम्पूर्ण एकाग्रता, शांति एवं श्रद्धा के साथ पूर्वजों का आशीर्वाद और मोक्ष सुफल प्राप्ति।' : 'Complete serenity, dignified Vedic chants, and deep spiritual contentment for your family lineage.'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
