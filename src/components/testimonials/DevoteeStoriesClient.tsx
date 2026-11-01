'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Star, 
  Video, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  Play, 
  Clock, 
  Award,
  ShieldCheck,
  User,
  X
} from 'lucide-react';

interface DevoteeReview {
  id: string;
  name: string;
  city: string;
  stateOrRegion: string;
  zone: 'Delhi NCR' | 'Gujarat' | 'Maharashtra' | 'South India' | 'NRI' | 'Other';
  rating: number;
  packageName: string;
  date: string;
  feedback: string;
  priestLineage: string;
  verified: boolean;
}

interface VideoHighlight {
  id: string;
  title: string;
  family: string;
  city: string;
  duration: string;
  vedis: string;
  thumbnail: string;
  summary: string;
}

const VIDEO_HIGHLIGHTS: VideoHighlight[] = [
  {
    id: 'vid-1',
    title: 'Falgu River Devghat Ritual & Tarpan Experience',
    family: 'Sharma Family',
    city: 'Bengaluru, Karnataka',
    duration: '2:45 min',
    vedis: 'Falgu Devghat & Sita Kund',
    thumbnail: '/images/pind_daan_vidhi.jpg',
    summary: 'Watch the Sharma family performing the sacred gotra sankalp with Gangotri water and barley pinda under senior Gaya Panda guidance.'
  },
  {
    id: 'vid-2',
    title: '7-Kul Uttam Pind Daan at Vishnupad Footprint',
    family: 'Patel Family',
    city: 'Surat, Gujarat',
    duration: '3:15 min',
    vedis: 'Vishnupad Footprint (चरण कमल)',
    thumbnail: '/images/gaya_vishnupad.jpg',
    summary: 'The Patel family shares how peaceful and transparent the 7-Kul ritual was, with zero additional demand at the sanctum sanctorum.'
  },
  {
    id: 'vid-3',
    title: 'Akshayavat Immortal Banyan Tree Suphal Blessings',
    family: 'Agarwal Family',
    city: 'New Delhi',
    duration: '2:10 min',
    vedis: 'Akshayavat Altar (अक्षयवट)',
    thumbnail: '/images/akshay_vat.jpg',
    summary: 'Concluding rituals under the shade of Akshayavat with traditional Vastra and Patra Daan, receiving the auspicious Suphal blessing.'
  },
  {
    id: 'vid-4',
    title: 'Live 4K Zoom Stream from California (NRI Devotee)',
    family: 'Rajesh & Sunita Verma',
    city: 'San Jose, California, USA',
    duration: '4:00 min',
    vedis: 'Live Vishnupad Sanctum Stream',
    thumbnail: '/images/gaya_drone.jpg',
    summary: 'Overseas devotees participating live from the US while our hereditary Purohit recites their Gotra and lineage at the lotus feet of Lord Vishnu.'
  }
];

const REVIEWS_DATA: DevoteeReview[] = [
  {
    id: 'rev-1',
    name: 'Rajesh Kumar Sharma',
    city: 'New Delhi',
    stateOrRegion: 'Delhi NCR',
    zone: 'Delhi NCR',
    rating: 5,
    packageName: 'Uttam Pind Daan (₹11,000)',
    date: 'October 2026',
    feedback: 'Like everyone else, we had heard terrifying stories of pandas harassing pilgrims at Falgu river. PindDaanWale changed that completely. Our Panda Ji arrived on time, conducted the entire 7-Kul vidhi with deep reverence, and not a single extra rupee was asked. Truly transparent seva.',
    priestLineage: 'Gayawal Tirth Purohit Lineage',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Dinesh & Bhavna Patel',
    city: 'Surat',
    stateOrRegion: 'Gujarat',
    zone: 'Gujarat',
    rating: 5,
    packageName: '1-Day Pind Daan Layover (₹7,499)',
    date: 'September 2026',
    feedback: 'We reached Gaya Junction early morning. The pickup representative was waiting right at Platform 1. The room was neat, food was completely satvik without onion/garlic, and the ritual was finished smoothly before our evening return train.',
    priestLineage: 'Senior Vishnupad Purohit',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'K. V. Subrahmanyam',
    city: 'Hyderabad',
    stateOrRegion: 'Telangana',
    zone: 'South India',
    rating: 5,
    packageName: 'Madhyam Pind Daan (₹7,500)',
    date: 'October 2026',
    feedback: 'Our priest was extremely knowledgeable in Vedic mantras. He patiently helped us recall our Gotra and maternal lineage details. The Kalash Puja and Akshayavat Suphal gave immense satisfaction to my mother.',
    priestLineage: '4th Generation Gayawal Panda',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Prakash Rao Kulkarni',
    city: 'Pune',
    stateOrRegion: 'Maharashtra',
    zone: 'Maharashtra',
    rating: 5,
    packageName: 'Pitra Dosh Puja (Tripindi Shradh ₹10,449)',
    date: 'September 2026',
    feedback: 'We were advised to perform Tripindi Shradh at Gaya Ji due to ongoing hurdles. The priests arranged everything—three consecrated pots, wheat, barley, and black til. The atmosphere was intensely sacred. Felt a deep burden lift from our hearts.',
    priestLineage: 'Pretshila Vedic Shastri',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Dr. Amit & Sneha Sen',
    city: 'London',
    stateOrRegion: 'United Kingdom',
    zone: 'NRI',
    rating: 5,
    packageName: 'NRI Remote Live Seva ($140 / ₹11,000)',
    date: 'October 2026',
    feedback: 'Living in London with NHS duties, traveling to India on short notice was impossible. PindDaanWale arranged a private Zoom link. We watched our Panda Ji chant our parents’ names at the holy footprint. Two weeks later, the consecrated Prasad kit arrived in London in pristine condition. Immensely grateful.',
    priestLineage: 'Gayawal Global Seva Desk',
    verified: true
  },
  {
    id: 'rev-6',
    name: 'Sureshchandra Mehta',
    city: 'Ahmedabad',
    stateOrRegion: 'Gujarat',
    zone: 'Gujarat',
    rating: 5,
    packageName: 'Uttam Pind Daan (₹11,000)',
    date: 'September 2026',
    feedback: 'The 5 Vastra and Patra Daan was done strictly according to Shastras. No bargaining, no emotional pressure. The receipts and communication were 100% professional. I will recommend this to every Gujarati family.',
    priestLineage: 'Verified Vishnupad Tirth Panda',
    verified: true
  },
  {
    id: 'rev-7',
    name: 'Venkatesh Iyer',
    city: 'Chennai',
    stateOrRegion: 'Tamil Nadu',
    zone: 'South India',
    rating: 5,
    packageName: 'Complete 3-Day Trip (₹21,449)',
    date: 'October 2026',
    feedback: 'The 3-day pilgrimage covering Falgu, Vishnupad, and Akshayavat was very well coordinated. Having a dedicated vehicle and priest made a huge difference for my 78-year-old father who has walking difficulties.',
    priestLineage: 'Gaya Panda Samaj Representative',
    verified: true
  },
  {
    id: 'rev-8',
    name: 'Anand Joshi',
    city: 'Mumbai',
    stateOrRegion: 'Maharashtra',
    zone: 'Maharashtra',
    rating: 5,
    packageName: 'Kanishtha Pind Daan (₹4,500)',
    date: 'October 2026',
    feedback: 'Fast, authentic, and pocket-friendly. In 2 hours, all rituals at Falgu and Vishnupad were completed. Everything was transparent as promised.',
    priestLineage: 'Verified Gayawal Panda',
    verified: true
  }
];

export default function DevoteeStoriesClient() {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoHighlight | null>(null);

  const zones = ['All', 'Delhi NCR', 'Gujarat', 'Maharashtra', 'South India', 'NRI'];

  const filteredReviews = useMemo(() => {
    if (selectedZone === 'All') return REVIEWS_DATA;
    return REVIEWS_DATA.filter(rev => rev.zone === selectedZone);
  }, [selectedZone]);

  return (
    <div className="space-y-12">

      {/* Video Testimonials Section */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400">
            <Video className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Authentic Ceremonies & Devotee Video Reels
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Real families sharing their firsthand pilgrimage experience at Falgu River Devghat and Vishnupad Mandir.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIDEO_HIGHLIGHTS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group cursor-pointer rounded-2xl bg-[#0E1626] border border-slate-800 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between transition-all shadow-lg hover:-translate-y-1"
            >
              {/* Thumbnail with Play Icon */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{vid.duration}</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-amber-300 font-medium">
                  <span>{vid.family}</span>
                  <span className="text-slate-400 text-[10px]">{vid.city.split(',')[0]}</span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {vid.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {vid.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player Preview */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0E1626] border border-amber-500/40 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 inline-block">
                Verified Pilgrim Recording
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                {activeVideo.title} — {activeVideo.family} ({activeVideo.city})
              </h3>
            </div>

            {/* Video Player Mockup / Image Preview */}
            <div className="relative aspect-video w-full rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl">
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white font-mono uppercase">
                    Sacred Spot: {activeVideo.vedis}
                  </p>
                  <p className="text-xs text-slate-300 max-w-md">
                    {activeVideo.summary}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Fixed Dakshina Verified</span>
              </span>
              <Link
                href="/packages"
                className="text-amber-400 font-bold hover:underline"
              >
                View Ritual Packages →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Verified Reviews Section with Filter Tabs */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Written Testimonials by Region
            </h2>
            <p className="text-xs text-slate-400">
              Filter reviews from pilgrims traveling from your region.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  selectedZone === zone
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {zone === 'All' ? 'All (150+)' : zone}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#0E1626] border border-slate-800 space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">{rev.name}</h4>
                      {rev.verified && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{rev.city}, {rev.stateOrRegion}</span>
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Package Badge */}
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-amber-300 font-mono">
                    {rev.packageName}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{rev.date}</span>
                </div>

                {/* Feedback */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.feedback}"
                </p>
              </div>

              {/* Priest Attribution */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Conducted by: <strong className="text-slate-200">{rev.priestLineage}</strong></span>
                </span>
                <span className="text-emerald-400 font-bold">100% Fixed Dakshina</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
