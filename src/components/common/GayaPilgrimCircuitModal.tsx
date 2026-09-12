'use client';

import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Train, 
  Bus, 
  Car, 
  ExternalLink, 
  ShieldCheck, 
  Info, 
  Sparkles, 
  ChevronRight, 
  Accessibility, 
  Footprints, 
  Phone, 
  AlertTriangle 
} from 'lucide-react';
import { getPilgrimTranslation } from '@/data/multilingualPilgrimHub';
import { useAppLanguage, AppLangCode } from '@/lib/useAppLanguage';

export interface RouteStop {
  id: number;
  nameEn: string;
  nameHi: string;
  categoryEn: string;
  categoryHi: string;
  addressEn: string;
  addressHi: string;
  lat: number;
  lng: number;
  railwayDistance: string;
  railwayFareShared: string;
  railwayFareAuto: string;
  busDistance: string;
  busFareShared: string;
  busFareAuto: string;
  significanceEn: string;
  significanceHi: string;
  accessibilityEn: string;
  accessibilityHi: string;
  googleMapsUrl: string;
}

export const GAYA_ROUTE_STOPS: RouteStop[] = [
  {
    id: 1,
    nameEn: 'Shri Vishnupad Temple & Falgu Devghat',
    nameHi: 'श्री विष्णुपद मंदिर व फल्गु देवघाट',
    categoryEn: 'Primary Pind Daan Site',
    categoryHi: 'मुख्य पिंडदान स्थल',
    addressEn: 'Chand Chaura, Gaya Ji, Bihar 823001',
    addressHi: 'चांद चौरा, गया जी, बिहार 823001',
    lat: 24.7836,
    lng: 85.0084,
    railwayDistance: '4.1 km',
    railwayFareShared: '₹25',
    railwayFareAuto: '₹140 - ₹150',
    busDistance: '2.3 km',
    busFareShared: '₹15',
    busFareAuto: '₹80 - ₹90',
    significanceEn: 'Sacred footprint (Charan Chinha) of Bhagwan Vishnu carved on solid basalt rock. Core site for 16-Pindi sankalp and Falgu tarpan.',
    significanceHi: 'ठोस कसौटी शिला पर भगवान विष्णु के साक्षात 40 सेमी लंबे पदचिह्न। 16 वेदी पिंडदान व फल्गु नदी तर्पण का मुख्य केंद्र।',
    accessibilityEn: 'Wheelchair ramp available at main entry. Direct road access via Chand Chaura.',
    accessibilityHi: 'मुख्य प्रवेश द्वार पर सुलभ रैंप उपलब्ध। बुजुर्गों के लिए ई-रिक्शा मंदिर के पास तक जाता है।',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vishnupad+Temple+Gaya+Bihar',
  },
  {
    id: 2,
    nameEn: 'Akshayavat (Immortal Banyan Tree)',
    nameHi: 'अक्षयवट (अमर वटवृक्ष)',
    categoryEn: 'Final Suphal Blessing Site',
    categoryHi: 'अंतिम सुफल वेदी',
    addressEn: 'Near Vishnupad Temple, Gaya Ji 823001',
    addressHi: 'विष्णुपद मंदिर के निकट, गया जी 823001',
    lat: 24.7801,
    lng: 85.0112,
    railwayDistance: '5.2 km',
    railwayFareShared: '₹30',
    railwayFareAuto: '₹160 - ₹180',
    busDistance: '3.1 km',
    busFareShared: '₹20',
    busFareAuto: '₹100 - ₹120',
    significanceEn: 'The imperishable banyan tree where Gayawal Pandas bestow the final Suphal (सफल) blessings, declaring the ancestral lineage freed.',
    significanceHi: 'अमर वटवृक्ष जहाँ गयावाल तीर्थ पुरोहितों द्वारा पिंडदान की पूर्णता पर "सुफल" आशीर्वाद दिया जाता है, जिससे पितृ तृप्त होते हैं।',
    accessibilityEn: 'Level courtyard, easily walkable from Vishnupad Temple (500 meters).',
    accessibilityHi: 'समतल प्रांगण, विष्णुपद से मात्र 500 मीटर पैदल या ई-रिक्शा द्वारा सुलभ।',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Akshayavat+Gaya+Bihar',
  },
  {
    id: 3,
    nameEn: 'Pretshila Hill & Ramkund',
    nameHi: 'प्रेतशिला पहाड़ी व रामकुंड',
    categoryEn: 'Untimely Death & Pitrudosh Pacification',
    categoryHi: 'अकाल मृत्यु व प्रेतदोष शांति',
    addressEn: 'Pretshila Hill, Gaya District, Bihar 823002',
    addressHi: 'प्रेतशिला पर्वत, गया जिला, बिहार 823002',
    lat: 24.8456,
    lng: 84.9785,
    railwayDistance: '10.5 km',
    railwayFareShared: '₹50',
    railwayFareAuto: '₹320 - ₹380',
    busDistance: '11.8 km',
    busFareShared: '₹55',
    busFareAuto: '₹350 - ₹400',
    significanceEn: '873-foot high hill dedicated to Yama and ancestral souls affected by sudden, untimely, or unnatural deaths. Sattu pinda offered at Ramkund.',
    significanceHi: 'अकाल मृत्यु, दुर्घटना अथवा प्रेतबाधा से पीड़ित पूर्वजों की शांति के लिए अत्यंत सिद्ध वेदी। रामकुंड पर सत्तू का पिंडदान होता है।',
    accessibilityEn: '676 stone steps to the summit. Traditional Doli / Palki available for senior citizens (approx ₹700 - ₹1100 round trip).',
    accessibilityHi: 'शिखर तक 676 सीढ़ियां हैं। वरिष्ठ श्रद्धालुओं हेतु आधार पर डोली/पालकी की व्यवस्था उपलब्ध रहती है (लगभग ₹700-₹1100)।',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pretshila+Hill+Gaya+Bihar',
  },
  {
    id: 4,
    nameEn: 'Ramshila Hill',
    nameHi: 'रामशिला पर्वत वेदी',
    categoryEn: 'Lord Rama Ancestral Pind Daan Site',
    categoryHi: 'प्रभु श्री राम पिंड वेदी',
    addressEn: 'Ramshila Road, Gaya Ji, Bihar 823001',
    addressHi: 'रामशिला रोड, गया जी, बिहार 823001',
    lat: 24.8194,
    lng: 85.0042,
    railwayDistance: '3.2 km',
    railwayFareShared: '₹20',
    railwayFareAuto: '₹110 - ₹130',
    busDistance: '4.5 km',
    busFareShared: '₹25',
    busFareAuto: '₹130 - ₹150',
    significanceEn: 'Hilltop temple where Lord Rama performed sacred ancestral rites for King Dasharatha. Features ancient Rameshwar Mahadev shrine.',
    significanceHi: 'पहाड़ी पर स्थित वेदी जहाँ भगवान श्री राम ने अपने पिता राजा दशरथ का पिंडदान किया था। यहाँ प्राचीन रामेश्वर महादेव मंदिर है।',
    accessibilityEn: 'Gentle stepped stone pathway (~300 steps). Shade and rest points present.',
    accessibilityHi: 'मध्यम सीढ़ियां (~300 सीढ़ियां), बीच-बीच में विश्राम स्थल बने हुए हैं।',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ramshila+Hill+Gaya+Bihar',
  },
  {
    id: 5,
    nameEn: 'Sitakund Ghat (Falgu River)',
    nameHi: 'सीताकुंड घाट (फल्गु पूर्वी तट)',
    categoryEn: 'Devi Sita Sand Pind Daan Site',
    categoryHi: 'माता सीता बालू पिंड वेदी',
    addressEn: 'Opposite Vishnupad Temple, Falgu River, Gaya 823001',
    addressHi: 'विष्णुपद के ठीक सामने, फल्गु नदी पूर्वी तट, गया 823001',
    lat: 24.7828,
    lng: 85.0135,
    railwayDistance: '4.8 km',
    railwayFareShared: '₹25',
    railwayFareAuto: '₹140 - ₹160',
    busDistance: '3.0 km',
    busFareShared: '₹20',
    busFareAuto: '₹90 - ₹110',
    significanceEn: 'Where Devi Sita offered Pinda made of Falgu sand (बालू पिंड) to Maharaja Dasharatha in Lord Rama\'s absence, directly witnessed by the sun and banyan tree.',
    significanceHi: 'जहाँ माता सीता ने महाराज दशरथ के आग्रह पर फल्गु की बालू से पिंडदान किया था, जिसे आकाशवाणी व वटवृक्ष ने प्रमाणित किया।',
    accessibilityEn: 'Accessible via the pedestrian walkway across the Falgu Rubber Dam from Vishnupad (5-7 mins walk).',
    accessibilityHi: 'विष्णुपद से फल्गु रबर डैम पुल द्वारा पैदल मात्र 5-7 मिनट में सुगम मार्ग।',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sitakund+Gaya+Bihar',
  },
  {
    id: 6,
    nameEn: 'Maa Mangla Gauri Shaktipeeth',
    nameHi: 'माँ मंगलागौरी शक्तिपीठ',
    categoryEn: 'Maha Shaktipeeth',
    categoryHi: '18 महा शक्तिपीठ में से एक',
    addressEn: 'Mangla Gauri Temple Rd, Gaya Ji 823001',
    addressHi: 'मंगलागौरी मंदिर मार्ग, गया जी 823001',
    lat: 24.7792,
    lng: 84.9986,
    railwayDistance: '4.8 km',
    railwayFareShared: '₹25',
    railwayFareAuto: '₹140 - ₹160',
    busDistance: '3.5 km',
    busFareShared: '₹20',
    busFareAuto: '₹110 - ₹130',
    significanceEn: 'One of the prime 18 Maha Shaktipeeths where Sati\'s breast part fell. Devotees visit for family wellbeing and kuldevi blessings after Pind Daan.',
    significanceHi: 'माता सती का स्तन भाग गिरने से सिद्ध हुआ शक्तिपीठ। पिंडदान उपरांत कुलदेवी के आशीर्वाद व अखंड सौभाग्य हेतु दर्शन किए जाते हैं।',
    accessibilityEn: 'Approx 120 gentle steps or auto-rickshaw drop near the temple rear gate.',
    accessibilityHi: 'लगभग 120 सुगम सीढ़ियां अथवा पीछे के रास्ते से ई-रिक्शा मंदिर के काफी समीप तक पहुँचता है।',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mangla+Gauri+Temple+Gaya+Bihar',
  },
  {
    id: 7,
    nameEn: 'Brahmakund & Baitarni Sarovar',
    nameHi: 'ब्रह्मकुंड व वैतरणी सरोवर',
    categoryEn: 'Vedic Godaan & Salvation Site',
    categoryHi: 'वैदिक गोदान व भवसागर पार वेदी',
    addressEn: 'Near Vishnupad, Gaya Ji 823001',
    addressHi: 'विष्णुपद के समीप, गया जी 823001',
    lat: 24.7775,
    lng: 85.0025,
    railwayDistance: '4.5 km',
    railwayFareShared: '₹25',
    railwayFareAuto: '₹130 - ₹150',
    busDistance: '2.8 km',
    busFareShared: '₹20',
    busFareAuto: '₹90 - ₹110',
    significanceEn: 'Sacred pond where Vedic Godaan (symbolic cow offering) is performed to help ancestral souls peacefully traverse the metaphysical river Baitarni.',
    significanceHi: 'पवित्र सरोवर जहाँ पितरों को यमलोक की वैतरणी नदी पार कराने के लिए शास्त्रोक्त गोदान संकल्प कराया जाता है।',
    accessibilityEn: 'Direct roadside access with gentle paved stone steps to the water reservoir.',
    accessibilityHi: 'सड़क से सीधा जुड़ाव, पक्के सीढ़ीदार घाट।',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Baitarni+Pond+Gaya+Bihar',
  },
  {
    id: 8,
    nameEn: 'Mahabodhi Temple (Bodhgaya)',
    nameHi: 'महाबोधि मंदिर (बोधगया)',
    categoryEn: 'UNESCO World Heritage Spiritual Site',
    categoryHi: 'विश्व धरोहर आध्यात्मिक तीर्थ',
    addressEn: 'Bodh Gaya, Bihar 824231',
    addressHi: 'बोधगया, बिहार 824231',
    lat: 24.6961,
    lng: 84.9913,
    railwayDistance: '14.2 km',
    railwayFareShared: '₹40',
    railwayFareAuto: '₹250 - ₹300',
    busDistance: '12.5 km',
    busFareShared: '₹35',
    busFareAuto: '₹240 - ₹280',
    significanceEn: 'UNESCO World Heritage spiritual shrine where Lord Buddha attained enlightenment under the Bodhi tree. Pilgrims complete their spiritual journey here.',
    significanceHi: 'यूनेस्को विश्व धरोहर स्थल जहाँ भगवान बुद्ध को ज्ञान प्राप्त हुआ। पिंडदान के उपरांत तीर्थयात्री मन की शांति व दर्शन हेतु यहाँ पधारते हैं।',
    accessibilityEn: 'Complete international standard wheelchair accessibility, battery buggies, smooth paths.',
    accessibilityHi: 'पूर्ण व्हीलचेयर सुलभ, बैटरी चालित कारें व समतल अंतरराष्ट्रीय स्तर का परिसर।',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mahabodhi+Temple+Bodhgaya+Bihar',
  },
  {
    id: 9,
    nameEn: 'Gandhi Maidan Tent City & Mela Base Camp',
    nameHi: 'गांधी मैदान टेंट सिटी व नियंत्रण कक्ष',
    categoryEn: 'Govt Accommodation & Emergency Hub',
    categoryHi: 'सरकारी टेंट सिटी व आपातकालीन केंद्र',
    addressEn: 'Gandhi Maidan, Gaya Ji 823001',
    addressHi: 'गांधी मैदान, गया जी 823001',
    lat: 24.7964,
    lng: 85.0039,
    railwayDistance: '2.8 km',
    railwayFareShared: '₹15',
    railwayFareAuto: '₹80 - ₹90',
    busDistance: '1.8 km',
    busFareShared: '₹10',
    busFareAuto: '₹60 - ₹70',
    significanceEn: 'Central administration base for Pitripaksha Mela: 5,000+ pilgrim free tent capacity, 24x7 medical clinic, lost & found helpdesk, and RO drinking water.',
    significanceHi: 'पितृपक्ष महासंगम का मुख्य प्रशासनिक केंद्र: 5000+ श्रद्धालुओं हेतु टेंट सिटी, 24 घंटे चिकित्सा शिविर, खोया-पाया केंद्र व शुद्ध पेयजल व्यवस्था।',
    accessibilityEn: 'Ground level, direct vehicle drop, spacious medical booths and police camp.',
    accessibilityHi: 'पूर्णतः समतल मैदान, सभी वाहनों का सीधा प्रवेश, 24 घंटे एम्बुलेंस व पुलिस सहायता।',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gandhi+Maidan+Gaya+Bihar',
  },
];

interface GayaPilgrimCircuitModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHindi?: boolean;
  lang?: AppLangCode;
  initialStopId?: number;
}

export default function GayaPilgrimCircuitModal({
  isOpen,
  onClose,
  isHindi,
  lang,
  initialStopId = 1,
}: GayaPilgrimCircuitModalProps) {
  const { lang: appLang } = useAppLanguage();
  const currentLang: AppLangCode = lang || appLang || (isHindi ? 'hi' : 'en');
  const t = getPilgrimTranslation(currentLang);
  const [selectedStopId, setSelectedStopId] = useState<number>(initialStopId);

  if (!isOpen) return null;

  const currentStop = GAYA_ROUTE_STOPS.find(s => s.id === selectedStopId) || GAYA_ROUTE_STOPS[0];

  // OpenStreetMap embed URL centered on current stop coordinates
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${currentStop.lng - 0.015}%2C${currentStop.lat - 0.012}%2C${currentStop.lng + 0.015}%2C${currentStop.lat + 0.012}&layer=mapnik&marker=${currentStop.lat}%2C${currentStop.lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#171310] text-gray-100 rounded-3xl shadow-2xl border border-amber-900/50 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-gradient-to-r from-amber-950/60 via-[#1c1815] to-[#171310] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F48D08]/20 border border-[#F48D08]/40 flex items-center justify-center text-[#F48D08]">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#F48D08] uppercase block">
                {t.circuitTitle}
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                {t.circuitSubtitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Horizontal Stop Selector (Mobile Only) */}
        <div className="md:hidden flex items-center gap-2 overflow-x-auto px-3 py-2 bg-black/40 border-b border-white/10 shrink-0 custom-scrollbar">
          {GAYA_ROUTE_STOPS.map((stop) => {
            const isSelected = stop.id === currentStop.id;
            return (
              <button
                key={stop.id}
                onClick={() => setSelectedStopId(stop.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 shrink-0 ${
                  isSelected
                    ? 'bg-[#F48D08] text-white shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 text-[10px] flex items-center justify-center">
                  {stop.id}
                </span>
                <span>{currentLang === 'en' ? stop.nameEn.split(' ')[0] : stop.nameHi.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body: Split Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left Column: List of Route Stops (Desktop Only) */}
          <div className="hidden md:block md:col-span-4 border-r border-white/10 overflow-y-auto md:max-h-[calc(92vh-75px)] p-3 space-y-1.5 custom-scrollbar bg-black/20">
            <div className="px-2 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>{t.routeStops} ({GAYA_ROUTE_STOPS.length})</span>
              <span className="text-[10px] text-[#F48D08]">{t.clickToSelect}</span>
            </div>

            {GAYA_ROUTE_STOPS.map((stop) => {
              const isSelected = stop.id === currentStop.id;
              return (
                <button
                  key={stop.id}
                  onClick={() => setSelectedStopId(stop.id)}
                  className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-start gap-2.5 border ${
                    isSelected 
                      ? 'bg-amber-500/20 border-amber-500/60 text-white shadow-md' 
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-gray-300'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isSelected ? 'bg-[#F48D08] text-white shadow-sm' : 'bg-white/10 text-gray-300'
                  }`}>
                    {stop.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-amber-300' : 'text-gray-200'}`}>
                      {currentLang === 'en' ? stop.nameEn : stop.nameHi}
                    </h4>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">
                      {currentLang === 'en' ? stop.categoryEn : stop.categoryHi}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                    isSelected ? 'text-amber-400 translate-x-0.5' : 'text-gray-600'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Stop Details + Map + Fare Estimate */}
          <div className="md:col-span-8 overflow-y-auto max-h-[calc(92vh-135px)] md:max-h-[calc(92vh-75px)] p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 custom-scrollbar bg-gradient-to-b from-[#1c1815] to-[#120f0d]">
            
            {/* Top Details & Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[#F48D08] text-[10px] font-extrabold uppercase">
                    Stop #{currentStop.id} • {currentLang === 'en' ? currentStop.categoryEn : currentStop.categoryHi}
                  </span>
                </div>
                <h3 className="font-serif font-extrabold text-lg sm:text-xl text-white mt-1">
                  {currentLang === 'en' ? currentStop.nameEn : currentStop.nameHi}
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F48D08] shrink-0" />
                  <span>{currentLang === 'en' ? currentStop.addressEn : currentStop.addressHi}</span>
                </p>
              </div>

              <a
                href={currentStop.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#F48D08] hover:bg-[#D97706] text-white font-bold text-xs shadow-md active:scale-95 transition-all shrink-0"
              >
                <span>{t.openGoogleMaps}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* ONE-WAY OFFICIAL FARE ESTIMATE (Matching Government Standard) */}
            <div className="bg-gradient-to-br from-amber-950/40 via-amber-900/20 to-black/40 border border-amber-500/30 rounded-2xl p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.govtFareTitle}</span>
                </span>
                <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">
                  {t.erickshawAndAuto}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* From Gaya Railway Station */}
                <div className="bg-black/40 p-3 rounded-xl border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Train className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {t.fromRailwayStation}
                      </span>
                      <span className="text-[10px] text-amber-300 font-semibold">{currentStop.railwayDistance}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 block">{t.shared}</span>
                        <strong className="text-emerald-400 font-bold">{currentStop.railwayFareShared}</strong>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div>
                        <span className="text-[10px] text-gray-400 block">{t.reservedAuto}</span>
                        <strong className="text-amber-300 font-bold">{currentStop.railwayFareAuto}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* From Govt Bus Stand */}
                <div className="bg-black/40 p-3 rounded-xl border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {t.fromBusStand}
                      </span>
                      <span className="text-[10px] text-sky-300 font-semibold">{currentStop.busDistance}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 block">{t.shared}</span>
                        <strong className="text-emerald-400 font-bold">{currentStop.busFareShared}</strong>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div>
                        <span className="text-[10px] text-gray-400 block">{t.reservedAuto}</span>
                        <strong className="text-amber-300 font-bold">{currentStop.busFareAuto}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-amber-200/70 italic">
                {t.fareFootnote}
              </p>
            </div>

            {/* Religious Significance */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-3.5 space-y-1.5">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{t.religiousSignificance}</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {currentLang === 'en' ? currentStop.significanceEn : currentStop.significanceHi}
              </p>
            </div>

            {/* Senior Citizen & Accessibility Advisory */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-3.5 space-y-1.5">
              <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Accessibility className="w-3.5 h-3.5" />
                <span>{t.seniorAccessibility}</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {currentLang === 'en' ? currentStop.accessibilityEn : currentStop.accessibilityHi}
              </p>
            </div>

            {/* Interactive OpenStreetMap Embed */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-inner relative">
              <div className="bg-black/60 px-3.5 py-2 text-[11px] text-gray-400 flex items-center justify-between border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F48D08]" />
                  <span>{t.liveSatelliteMap}</span>
                </span>
                <span className="text-[10px] text-amber-400 font-mono">{currentStop.lat.toFixed(4)}° N, {currentStop.lng.toFixed(4)}° E</span>
              </div>
              <div className="relative w-full h-56 sm:h-72 bg-[#111]">
                <iframe
                  title={`Map of ${currentStop.nameEn}`}
                  src={mapEmbedUrl}
                  className="w-full h-full border-0 filter contrast-105"
                  loading="lazy"
                />
                {/* Floating Google Maps Overlay Button */}
                <a
                  href={currentStop.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-stone-950 font-extrabold text-xs shadow-2xl transition-all hover:scale-105 active:scale-95 border border-stone-200"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                  <span>{t.navigateGoogleMaps}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-600" />
                </a>
              </div>
            </div>

            {/* Third-Party & Govt Information Disclaimer */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-3.5 space-y-1.5 text-gray-300">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{t.disclaimerTitle}</span>
              </div>
              <p className="leading-relaxed text-[10.5px] sm:text-[11px] text-gray-300">
                {t.disclaimerBody}
              </p>
            </div>

          </div>
        </div>

        {/* Modal Footer with Direct Route & Sticky Google Maps Navigation */}
        <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-black/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-gray-300 text-[11px] truncate w-full sm:w-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">
              {t.viewing} <strong className="text-white">{currentLang === 'en' ? currentStop.nameEn : currentStop.nameHi}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={currentStop.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-lg transition-all active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5 fill-current" />
              <span>{t.openGoogleMaps}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-semibold transition-colors shrink-0"
            >
              {t.close}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
