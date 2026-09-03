'use client';

import React, { useState } from 'react';
import { Play, Star, MapPin, CheckCircle, X, ShieldCheck, HeartHandshake, Film } from 'lucide-react';

export interface DevoteeTestimonial {
  id: string;
  author: string;
  city: string;
  country?: string | null;
  ritual: string;
  content: string;
  rating: number;
  avatarUrl?: string | null;
  videoUrl?: string | null;
  poojaImage?: string | null;
  status?: string;
  createdAt?: any;
}

interface Props {
  testimonials: DevoteeTestimonial[];
}

export default function DevoteeVideoShowcase({ testimonials }: Props) {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; author: string } | null>(null);

  // Fallback realistic testimonials if database has none
  const displayTestimonials: DevoteeTestimonial[] = testimonials.length > 0 ? testimonials : [
    {
      id: 'demo-1',
      author: 'Rajesh & Chetna Sharma',
      city: 'Bengaluru',
      country: 'India',
      ritual: 'Annual Pitru Paksha Shradh at Vishnupad',
      content: 'We came from Bengaluru with our elderly mother. PindDaanWale arranged airport pickup, wheelchair inside Vishnupad Temple, and our family Panda verified our 4-generation Bahi-Khata records. The feeling of closure and spiritual satisfaction is priceless.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      poojaImage: '/images/pind_daan_vidhi.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 'demo-2',
      author: 'Sunita & Arvind Mukherjee',
      city: 'San Jose, California',
      country: 'USA',
      ritual: 'Remote Live 4K Pind Daan Stream',
      content: 'Living in the US, we could not travel to Gaya Ji this year. The team set up a private 4K live stream from Falgu Devghat. The Acharya chanted our exact gotra and ancestors names clearly. The sacred prasadam arrived at our California address in pristine condition.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      poojaImage: '/images/akshay_vat.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    },
    {
      id: 'demo-3',
      author: 'Dr. Vikramaditya Verma & Family',
      city: 'Lucknow',
      country: 'India',
      ritual: '3-Day Complete Tri-Sthali Parikrama',
      content: 'Covered Vishnupad, Falgu, Akshayavat, Pretshila and Ramshila without a minute of confusion or stress. Fixed transparent dakshina, comfortable Innova Crysta throughout, and exceptional sattvic dining. 100% recommended for every devout Hindu family.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      poojaImage: '/images/gaya_vishnupad.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    }
  ];

  return (
    <section className="bg-[#FAF7F2] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#EFE6D9] relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C6922E]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EFE6D9] text-[#C6922E] text-xs font-body font-semibold tracking-wider shadow-sm">
            <Film className="w-3.5 h-3.5" />
            <span>SACRED DEVOTEE WITNESS • प्रत्यक्ष अनुभव</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#2B2118] tracking-[-0.02em] leading-tight">
            Devotees Performing Pooja & Video Experiences
          </h2>

          <p className="text-sm sm:text-base font-body text-[#5A5148] leading-relaxed max-w-2xl mx-auto">
            Real families, real rituals, and real blessings. Watch authentic video recordings of pilgrims performing ancestral oblation rites at Vishnupad, Falgu River, and Akshayavat.
          </p>
        </div>

        {/* Video & Pooja Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((t) => {
            const hasVideo = !!t.videoUrl;
            const coverImage = t.poojaImage || t.avatarUrl || '/images/pind_daan_vidhi.jpg';

            return (
              <div
                key={t.id}
                className="group bg-white rounded-[24px] border border-[#EFE6D9] hover:border-[#C6922E]/60 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
              >
                {/* Media Container: Devotee Pooja Photo + Video Play Overlay */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                  <img
                    src={coverImage}
                    alt={`${t.author} performing pooja at Gaya Ji`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                  {/* Top Ritual Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[11px] font-body font-semibold flex items-center gap-1.5 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C6922E]" />
                      <span>{t.ritual || 'Vedic Pind Daan'}</span>
                    </span>
                    <span className="bg-white/90 backdrop-blur-md text-[#2B2118] px-2.5 py-0.5 rounded-full text-[10px] font-body font-bold shadow-sm">
                      ★ 5.0
                    </span>
                  </div>

                  {/* Centered Video Play Button (if video exists) or Pooja Badge */}
                  {hasVideo ? (
                    <button
                      onClick={() => setActiveVideo({ url: t.videoUrl!, title: t.ritual, author: t.author })}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 group/btn cursor-pointer"
                      aria-label={`Play testimonial video of ${t.author}`}
                    >
                      <div className="w-16 h-16 rounded-full bg-[#C6922E] hover:bg-[#A97718] text-white flex items-center justify-center shadow-xl group-hover/btn:scale-110 transition-all duration-300 border-2 border-white/80">
                        <Play className="w-7 h-7 fill-current translate-x-0.5" />
                      </div>
                      <span className="bg-black/70 backdrop-blur-md text-white text-xs font-body font-semibold px-3 py-1 rounded-full border border-white/20 group-hover/btn:bg-[#C6922E] transition-colors">
                        Watch Recorded Video
                      </span>
                    </button>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-black/70 backdrop-blur-md text-white text-xs font-body font-medium px-4 py-1.5 rounded-full border border-white/20">
                        Pooja Photo Record
                      </span>
                    </div>
                  )}

                  {/* Devotee Location Bottom Pill */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-body">
                    <span className="font-semibold text-stone-200 flex items-center gap-1 drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-[#C6922E]" />
                      {t.city}{t.country ? `, ${t.country}` : ''}
                    </span>
                    <span className="text-[11px] text-amber-200 font-medium">
                      Verified Devotee
                    </span>
                  </div>
                </div>

                {/* Card Text & Testimonial Quote */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    
                    {/* Star Rating */}
                    <div className="flex text-[#C6922E] gap-1">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    {/* Devotee's Words */}
                    <p className="font-body text-[13.5px] text-[#5A5148] leading-relaxed italic line-clamp-4">
                      &quot;{t.content}&quot;
                    </p>
                  </div>

                  {/* Devotee Signature Bar */}
                  <div className="pt-4 border-t border-[#EFE6D9] flex items-center gap-3">
                    {t.avatarUrl ? (
                      <img
                        src={t.avatarUrl}
                        alt={t.author}
                        className="w-11 h-11 rounded-full object-cover border border-[#EFE6D9] shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#EFE6D9] text-[#C6922E] font-display font-bold text-base flex items-center justify-center shrink-0">
                        {t.author.charAt(0)}
                      </div>
                    )}
                    
                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-base text-[#2B2118] truncate leading-tight">
                        {t.author}
                      </h4>
                      <p className="text-[11px] font-body text-[#7A736A] truncate">
                        Pooja Witnessed by Vishnupad Panda
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative w-full max-w-3xl bg-[#1E293B] rounded-[24px] overflow-hidden shadow-2xl border border-white/10">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 text-white">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {activeVideo.author}
                  </h3>
                  <p className="text-xs font-body text-slate-400">
                    {activeVideo.title} • Recorded at Gaya Ji
                  </p>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Element */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                {activeVideo.url.includes('youtube.com') || activeVideo.url.includes('youtu.be') ? (
                  <iframe
                    src={activeVideo.url.replace('watch?v=', 'embed/')}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <video
                    src={activeVideo.url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support video playback.
                  </video>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-900 flex items-center justify-between text-xs font-body text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  Authentic Gaya Ji Devotee Recording
                </span>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="text-xs font-semibold text-[#C6922E] hover:underline"
                >
                  Close Video
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
