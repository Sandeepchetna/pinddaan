import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Target, 
  Eye, 
  Cpu, 
  Users, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Calendar, 
  Flame, 
  Compass, 
  ExternalLink,
  MessageCircle,
  Award
} from 'lucide-react';

export const metadata = {
  title: 'Our Story & Mission | Guiding Sacred Journeys | PindDaanWale',
  description: 'Learn the story of PindDaanWale—an independent digital pilgrimage platform powered by Nighwan Technology and guided by hereditary Gaya Ji Teerth Pandas to bring transparency, dignity, and authenticity to ancestral rites.',
  alternates: {
    canonical: '/about'
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B2118]">

      {/* 1. HERO BANNER */}
      <section className="relative bg-[#1A110B] text-white py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
        {/* Background Ambient Glows & Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,146,46,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(111,29,20,0.35),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF7F2] to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-black/50 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C6922E]" />
            <span>Our Sacred Journey • Established 2025</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.12]">
            Guiding Sacred Journeys with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#F48D08] to-amber-300">
              Faith, Trust & Technology
            </span>
          </h1>

          <p className="max-w-5xl mx-auto text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-body font-normal opacity-95 text-balance">
            PindDaanWale is a dedicated digital pilgrimage platform created to simplify and support one of the most <br className="hidden md:inline" />
            sacred responsibilities in Sanatan Dharma—Pind Daan and Shradh rituals in holy Gaya Ji.
          </p>

          {/* Quick Pillar Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-semibold">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-100 backdrop-blur-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922E]" />
              Authentic Vedic Rites
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-100 backdrop-blur-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922E]" />
              Hereditary Gaya Pandas
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-100 backdrop-blur-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922E]" />
              Zero Bargaining & Fixed Dakshina
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-100 backdrop-blur-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922E]" />
              Powered by Nighwan Technology
            </span>
          </div>

        </div>
      </section>

      {/* 2. WHY PINDDAANWALE WAS CREATED */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922E]">
              <Flame className="w-4 h-4 text-[#C6922E]" />
              <span>The Purpose Behind Our Inception</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#2B2118] leading-[1.2]">
              Why PindDaanWale Was Created
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5A5148] leading-relaxed font-body">
              <p>
                Every year, hundreds of thousands of Hindu families arrive at the sacred banks of the Falgu River and the revered Vishnupad Temple carrying a deeply profound, emotional duty: honoring their ancestors and praying for their soul’s eternal liberation.
              </p>
              <p>
                However, for first-time visitors, elderly parents, and NRI families living thousands of miles away, navigating pilgrimage logistics in Gaya Ji has historically been daunting—unclear dakshina expectations, aggressive middle-men, lack of organized transit, and uncertainty around authentic lineage pandas.
              </p>
              <p className="font-semibold text-[#2B2118] bg-amber-50/80 p-4 rounded-2xl border-l-4 border-[#C6922E]">
                Our mission is simple: to help devotees from India and across the world perform authentic Vedic rituals with dignity, transparency, and complete human guidance.
              </p>
              <p>
                Whether you are visiting Gaya Ji in person or arranging a live 4K streamed gotra ritual from abroad, our team coordinates every detail—from preliminary consultations and panda assignment to clean accommodation, private AC cabs, puja samagri, and post-ritual verification.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-9 border border-[#EFE6D9] shadow-xl shadow-amber-950/5 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#EFE6D9] flex items-center justify-center text-[#C6922E]">
              <ShieldCheck className="w-6 h-6 text-[#C6922E]" />
            </div>

            <h3 className="font-display font-bold text-xl text-[#2B2118]">
              Restoring Sacred Dignity to Teerth Pilgrimage
            </h3>

            <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed">
              Established in 2025, PindDaanWale has grown with one clear conviction: making the timeless Sanatan traditions of Gaya Ji more accessible, structured, and trustworthy by combining modern technology with authentic spiritual guidance.
            </p>

            <div className="pt-2 border-t border-[#EFE6D9] space-y-3 text-xs font-semibold text-[#2B2118]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Zero Bargaining • 100% Fixed Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Verified 4th & 5th Generation Gayawal Lineage Pandas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Dedicated Assistance for Senior Citizens & NRIs</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF7F2] border-y border-[#EFE6D9]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C6922E]">Our Guiding Light</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#2B2118]">Our Vision & Mission</h2>
            <p className="text-xs sm:text-sm text-[#7A736A]">
              We believe that every devotee deserves authentic guidance, transparent pricing, and respectful service while performing rituals for their ancestors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EFE6D9] shadow-sm hover:shadow-lg transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C6922E] flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-[#2B2118]">Our Vision</h3>
              <p className="text-sm sm:text-base text-[#5A5148] leading-relaxed font-body">
                To become the world’s most trusted digital platform for Hindu pilgrimage services, beginning with Gaya Ji and gradually expanding to other sacred destinations across India.
              </p>
              <div className="pt-4 border-t border-[#EFE6D9]/80 text-xs text-[#7A736A] font-medium">
                Building a global bridge of devotion connecting pilgrims with the holy roots of Bharat.
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EFE6D9] shadow-sm hover:shadow-lg transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#C6922E] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-[#2B2118]">Our Mission</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#5A5148] font-body">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                  <span><strong>Preserve Vedic Authenticity:</strong> Adhere strictly to Shastra-mandated procedures from Vayu Purana and Gaya Mahatmya.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                  <span><strong>Eliminate Commercial Friction:</strong> Guarantee transparent, pre-agreed dakshina with zero on-spot bargaining.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                  <span><strong>Direct Panda Coordination:</strong> Connect devotees with genuine and experienced Teerth Pandits.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                  <span><strong>Complete End-to-End Care:</strong> Assist families with transport, stay, samagri, and ritual coordination.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                  <span><strong>India’s Most Trusted Ecosystem:</strong> Deploy enterprise-grade technology to elevate devotee peace of mind.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 4. POWERED BY NIGHWAN TECHNOLOGY */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E1B4B] text-white rounded-3xl sm:rounded-[32px] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Circuit Graphics */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6922E]/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>Engineering & Enterprise Innovation</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-[1.2]">
                Powered by Nighwan Technology
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
                PindDaanWale is proudly developed, engineered, and operated under the guidance of <a href="https://www.nighwantech.com" target="_blank" rel="noopener noreferrer" className="text-amber-300 font-bold underline hover:text-white transition-colors">Nighwan Technology Pvt. Ltd.</a>, an Indian technology firm founded in 2020 specializing in building intelligent digital platforms, enterprise software, automation, and scalable AI solutions.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
                Recognizing the lack of transparency, disorganized booking channels, and digital disconnect faced by devotees visiting Gaya Ji, the engineering team at Nighwan Technology envisioned a modern platform that harmonizes cutting-edge digital reliability with timeless cultural values.
              </p>

              <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                Today, PindDaanWale stands as one of Nighwan Technology’s flagship social-impact initiatives—engineered to make sacred journeys accessible, transparent, and seamless for generations to come.
              </p>

              <div className="pt-2">
                <a
                  href="https://www.nighwantech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C6922E] hover:bg-[#A97718] text-white px-6 py-3 rounded-[16px] font-bold text-xs transition-all shadow-md active:scale-95"
                >
                  <span>Visit Nighwan Technology</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Feature Stats Card */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
              <h3 className="font-serif font-bold text-lg text-white border-b border-white/10 pb-3">
                Modern Tech Meets Sacred Roots
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    ERP 2.0 Cloud Architecture
                  </div>
                  <p className="text-slate-400 text-xs">Real-time inventory, Panda allocation, and transparent pricing management.</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    Global 4K Live Video Telecast
                  </div>
                  <p className="text-slate-400 text-xs">Low-latency two-way streaming connecting NRI families live from the US, UK, and UAE.</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Instant Digital Verification
                  </div>
                  <p className="text-slate-400 text-xs">Computer-generated pre-booking receipts, WhatsApp updates, and gotra lineage logs.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. GUIDED BY AUTHENTIC GAYA JI TEERTH PANDITS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-y border-[#EFE6D9]">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922E]">
            <Award className="w-4 h-4 text-[#C6922E]" />
            <span>Vedic Lineage & Authentic Customs</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#2B2118]">
            Guided by Authentic Gaya Ji Teerth Pandits
          </h2>

          <p className="text-base sm:text-lg text-[#5A5148] leading-relaxed max-w-3xl mx-auto font-body">
            Technology can simplify planning, but sacred rituals require tradition, knowledge, and authenticity.
          </p>

          <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#EFE6D9] text-left space-y-4 max-w-3xl mx-auto text-sm sm:text-base text-[#5A5148] leading-relaxed font-body">
            <p>
              For this reason, PindDaanWale works in coordination with experienced and respected Teerth Pandits (Gayawal Pandas) of Gaya Ji who follow traditional Vedic karma-kand procedures passed down through generations.
            </p>
            <p>
              Every ritual is performed according to established traditions and local customs—at Falgu River, the 40 cm footprint of Lord Vishnu inside Vishnupad Temple, the eternal Akshayavat banyan tree, and across all 45 sacred Vedis.
            </p>
            <p className="font-semibold text-[#2B2118]">
              Devotees receive an authentic spiritual experience with proper gotra recitation and heartfelt blessings from senior acharyas throughout the process.
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHAT MAKES US DIFFERENT */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C6922E]">Why Families Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#2B2118]">What Makes Us Different</h2>
            <p className="text-xs sm:text-sm text-[#7A736A]">
              We eliminate ambiguity so you can focus completely on remembrance and prayers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="bg-white rounded-2xl p-7 border border-[#EFE6D9] shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C6922E] flex items-center justify-center font-bold">1</div>
              <h3 className="font-display font-bold text-lg text-[#2B2118]">Authentic Guidance</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed">
                Work directly with verified, hereditary Teerth Pandits who strictly observe Puranic rites.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#EFE6D9] shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C6922E] flex items-center justify-center font-bold">2</div>
              <h3 className="font-display font-bold text-lg text-[#2B2118]">Transparent Process</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed">
                Clear packages with zero on-spot bargaining, zero hidden fees, and all-inclusive dakshina.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#EFE6D9] shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C6922E] flex items-center justify-center font-bold">3</div>
              <h3 className="font-display font-bold text-lg text-[#2B2118]">Complete Assistance</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed">
                Comfortable AC hotel stay, private chauffeur cab transport, and guidance across all 45 sacred shrines.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#EFE6D9] shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C6922E] flex items-center justify-center font-bold">4</div>
              <h3 className="font-display font-bold text-lg text-[#2B2118]">Dedicated Devotee Care</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed">
                Personalized support before, during, and after your journey—including assistance for elderly family members.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-[#EFE6D9] shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C6922E] flex items-center justify-center font-bold">5</div>
              <h3 className="font-display font-bold text-lg text-[#2B2118]">Technology-Enabled</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed">
                Simple online pre-booking, instant WhatsApp coordination, digital receipts, and 4K live stream options for NRIs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#2B2118] to-[#1A110B] text-white rounded-2xl p-7 shadow-md space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Zero Compromise</span>
                <h3 className="font-display font-bold text-lg text-white mt-1">Peace of Mind Guaranteed</h3>
                <p className="text-xs text-gray-300 leading-relaxed mt-1">
                  We handle the logistical complexities so you can dedicate every moment to solemn prayer.
                </p>
              </div>
              <Link href="/packages" className="text-xs font-bold text-[#C6922E] hover:text-amber-200 inline-flex items-center gap-1">
                <span>View Our Packages →</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 7. OUR JOURNEY (CHRONOLOGICAL TIMELINE) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF7F2] border-t border-[#EFE6D9]">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C6922E]">Milestones of Devotion</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#2B2118]">Our Journey (2020 → Future)</h2>
            <p className="text-xs sm:text-sm text-[#7A736A]">
              From a software company’s vision to India’s most comprehensive digital pilgrimage ecosystem.
            </p>
          </div>

          <div className="relative border-l-2 border-[#C6922E]/40 ml-4 sm:ml-32 space-y-10">
            
            {/* 2020 */}
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#C6922E] border-2 border-white shadow-sm" />
              <span className="text-xs font-mono font-bold text-[#C6922E] block sm:absolute sm:-left-24 sm:top-1">2020</span>
              <h3 className="text-lg font-display font-bold text-[#2B2118]">Founding of Nighwan Technology</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed mt-1">
                Nighwan Technology Pvt. Ltd. was founded to build transformative software architectures, AI engines, and enterprise solutions across India.
              </p>
            </div>

            {/* Early 2025 */}
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#C6922E] border-2 border-white shadow-sm" />
              <span className="text-xs font-mono font-bold text-[#C6922E] block sm:absolute sm:-left-24 sm:top-1">Early 2025</span>
              <h3 className="text-lg font-display font-bold text-[#2B2118]">The Gaya Ji Initiative</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed mt-1">
                Recognizing the distress and lack of transparent pricing for visiting devotees, ground research began in Gaya Ji in direct dialogue with respected Gayawal Pandas.
              </p>
            </div>

            {/* Mid 2025 */}
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#C6922E] border-2 border-white shadow-sm" />
              <span className="text-xs font-mono font-bold text-[#C6922E] block sm:absolute sm:-left-24 sm:top-1">Late 2025</span>
              <h3 className="text-lg font-display font-bold text-[#2B2118]">Launch of PindDaanWale</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed mt-1">
                Official launch of the PindDaanWale platform featuring transparent fixed packages, comprehensive 49-Vedi directory, and 4K live video streaming for the international NRI community.
              </p>
            </div>

            {/* Present (2026) */}
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-sm animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-700 block sm:absolute sm:-left-24 sm:top-1">Present</span>
              <h3 className="text-lg font-display font-bold text-[#2B2118]">Serving Global Sanatan Families</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed mt-1">
                Today, PindDaanWale coordinates seamless Vedic rituals for families across Karnataka, Maharashtra, Delhi NCR, and worldwide devotees in the USA, UK, and UAE.
              </p>
            </div>

            {/* Future */}
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#7A736A] border-2 border-white shadow-sm" />
              <span className="text-xs font-mono font-bold text-[#7A736A] block sm:absolute sm:-left-24 sm:top-1">Future</span>
              <h3 className="text-lg font-display font-bold text-[#2B2118]">Expansion Across Bharat</h3>
              <p className="text-xs sm:text-sm text-[#5A5148] leading-relaxed mt-1">
                Gradually expanding transparent, dignified pilgrimage facilitation to Kashi (Varanasi), Prayagraj, Haridwar, and sacred Teerths across India.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 8. OUR SACRED COMMITMENT */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#2B2118] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Heart className="w-10 h-10 text-[#C6922E] mx-auto" />
          
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">Our Solemn Promise</span>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white leading-tight">
            “Your faith is our sacred responsibility.”
          </h2>

          <p className="text-sm sm:text-lg text-gray-300 leading-relaxed font-body max-w-2xl mx-auto">
            Every family comes to Gaya Ji carrying memories, emotions, and an eternal duty toward their ancestors. We understand the spiritual weight of this journey. Our commitment is not merely to provide a service—it is to ensure that every devotee feels guided, respected, and supported throughout the entire experience.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/pre-booking"
              className="bg-[#C6922E] hover:bg-[#A97718] text-white px-8 py-3.5 rounded-[16px] font-bold text-xs transition-all shadow-lg active:scale-95"
            >
              Begin Your Sacred Journey
            </Link>
            <a
              href="tel:+917463055338"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-[16px] font-bold text-xs transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C6922E]" />
              <span>Talk to Our Gaya Ji Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. CONNECT WITH US */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-t border-[#EFE6D9]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C6922E]">Stay Connected</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#2B2118]">
            Connect With PindDaanWale
          </h2>
          <p className="text-xs sm:text-sm text-[#7A736A] max-w-xl mx-auto">
            Follow our journey and stay connected for updates, pilgrimage guidance, scriptural videos, and educational content.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            
            <a
              href="https://www.youtube.com/@PindDaanWale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EFE6D9] hover:border-[#C6922E] text-xs font-bold text-[#2B2118] hover:text-[#C6922E] transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-red-600" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube Channel</span>
            </a>

            <a
              href="https://www.facebook.com/pinddaanwale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EFE6D9] hover:border-[#C6922E] text-xs font-bold text-[#2B2118] hover:text-[#C6922E] transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook Page</span>
            </a>

            <a
              href="https://www.instagram.com/pinddaan_wale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF7F2] border border-[#EFE6D9] hover:border-[#C6922E] text-xs font-bold text-[#2B2118] hover:text-[#C6922E] transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-pink-600" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>

            <a
              href="https://wa.me/917463055338?text=Pranam%21%20I%20want%20to%20know%20more%20about%20PindDaanWale"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>

          </div>
        </div>
      </section>

    </div>
  );
}
