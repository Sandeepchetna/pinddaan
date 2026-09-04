'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Flame, 
  Phone, 
  MessageCircle, 
  MapPin, 
  FileText,
  RotateCcw,
  Clock,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { assessVedicMokshaPath, DevoteeAnswers, VedicDiagnosisReport } from '@/lib/vedicRulesEngine';
import { useAppLanguage } from '@/lib/useAppLanguage';

interface VedicDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages?: any[];
}

export default function VedicDiagnosticModal({ isOpen, onClose, packages = [] }: VedicDiagnosticModalProps) {
  const { isHindi } = useAppLanguage();
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<DevoteeAnswers>({
    relation: 'both_parents',
    circumstance: 'natural_old_age',
    symptoms: [],
    priorRituals: 'first_time_gaya',
    gotra: '',
    devoteeCity: ''
  });

  const [report, setReport] = useState<VedicDiagnosisReport | null>(null);

  if (!isOpen) return null;

  const toggleSymptom = (symptom: string) => {
    setAnswers(prev => {
      const exists = prev.symptoms.includes(symptom);
      return {
        ...prev,
        symptoms: exists 
          ? prev.symptoms.filter(s => s !== symptom)
          : [...prev.symptoms, symptom]
      };
    });
  };

  const handleCalculate = () => {
    const result = assessVedicMokshaPath(answers, packages);
    setReport(result);
    setStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setReport(null);
    setAnswers({
      relation: 'both_parents',
      circumstance: 'natural_old_age',
      symptoms: [],
      priorRituals: 'first_time_gaya',
      gotra: '',
      devoteeCity: ''
    });
  };

  // WhatsApp Pre-filled Diagnosis Share URL
  const generateWhatsAppLink = () => {
    if (!report) return 'https://wa.me/917463055338';
    const text = encodeURIComponent(
      isHindi
        ? `*प्रणाम पंडित जी! (PindDaanWale AI वैदिक रिपोर्ट)*\n\n` +
          `• *पितृ सम्बंध:* ${answers.relation}\n` +
          `• *देहावसान परिस्थिति:* ${answers.circumstance}\n` +
          `• *दोष स्तर:* ${report.doshaGrade}\n` +
          `• *अनुशंसित विधान:* ${report.recommendedPackage.hindiTitle}\n` +
          `• *दक्षिणा अनुमान:* ₹${report.recommendedPackage.estimatedDakshina.toLocaleString('en-IN')}\n` +
          `• *गोत्र:* ${answers.gotra || 'ज्ञात नहीं'}\n\n` +
          `कृपया गया जी तीर्थ में विधि-विधान एवं तिथि निर्धारण में मेरा मार्गदर्शन करें।`
        : `*Pranam Pandit Ji! (PindDaanWale AI Vedic Assessment Report)*\n\n` +
          `• *Ancestral Lineage:* ${answers.relation}\n` +
          `• *Demise Circumstance:* ${answers.circumstance}\n` +
          `• *Dosha Grade:* ${report.doshaGrade}\n` +
          `• *Recommended Ritual:* ${report.recommendedPackage.title}\n` +
          `• *Estimated Dakshina:* ₹${report.recommendedPackage.estimatedDakshina.toLocaleString('en-IN')}\n` +
          `• *Gotra:* ${answers.gotra || 'Not known'}\n\n` +
          `Please guide me with the sacred dates, Pandit Ji allocation, and ritual arrangements in Gaya Ji.`
    );
    return `https://wa.me/917463055338?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Darkened Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Main Diagnostic Card Container */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#141C2B] via-[#0E1626] to-[#0A0F1A] text-slate-100 rounded-3xl border border-amber-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Strip */}
        <div className="relative px-6 py-5 border-b border-slate-800 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-slate-950 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">
                  {isHindi ? 'AI वैदिक मोक्ष एवं पितृ दोष डायग्नोस्टिक' : 'AI Vedic Moksha & Pitru Dosh Assessment'}
                </h3>
                <span className="text-[10px] uppercase font-mono font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {isHindi ? 'गरुड़ पुराण प्रमाणित' : 'Garuda Purana Verified'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isHindi 
                  ? 'शास्त्रसम्मत तिथि, वेदी एवं पिंडदान विधान का 2-मिनट में सटीक आकलन'
                  : 'Accurate 2-minute Vedic Shastra assessment of auspicious dates, sacred vedis & ritual procedure'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Dots (Steps 1 to 4) */}
        {step <= 4 && (
          <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-slate-800/60 bg-slate-900/40">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step 
                      ? 'w-8 bg-amber-400' 
                      : s < step 
                        ? 'w-4 bg-emerald-400' 
                        : 'w-4 bg-slate-700'
                  }`} 
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-amber-400 font-bold">
              {isHindi ? `चरण ${step} / 4` : `Step ${step} of 4`}
            </span>
          </div>
        )}

        {/* Modal Body: Dynamic Step Views */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-6">

          {/* STEP 1: Ancestor Lineage */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h4 className="font-bold text-base text-white mb-1">
                  {isHindi 
                    ? 'आप किनके मोक्ष एवं पिंडदान हेतु संकल्प करना चाहते हैं?'
                    : 'For whom do you wish to perform the sacred Moksha & Pind Daan Sankalp?'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isHindi 
                    ? 'वायु पुराण के अनुसार प्रत्येक सम्बंध के लिए विशिष्ट वेदियों पर तर्पण का विधान है।'
                    : 'According to Vayu Purana, specific sacred vedis are prescribed for each ancestral relationship.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { 
                    id: 'both_parents', 
                    label: isHindi ? 'माता-पिता (सम्पूर्ण कुल वंश)' : 'Both Parents (Complete Ancestral Lineage)', 
                    desc: isHindi ? 'पितृ एवं मातृ दोनों कुलों का सम्पूर्ण पार्वण श्राद्ध' : 'Comprehensive Parvana Shradh for both paternal and maternal lines' 
                  },
                  { 
                    id: 'father', 
                    label: isHindi ? 'पिताजी (Paternal Lineage)' : 'Father (Paternal Lineage)', 
                    desc: isHindi ? 'पिता, दादा एवं परदादा के त्रिपिंडी/पार्वण निमित्त' : 'Tripindi and Parvana rites for father, grandfather, and great-grandfather' 
                  },
                  { 
                    id: 'mother', 
                    label: isHindi ? 'माताजी (Maternal Lineage)' : 'Mother (Maternal Lineage)', 
                    desc: isHindi ? 'माता, दादी व ननिहाल पक्ष के लिए विशेष सीता कुंड तर्पण' : 'Special Sita Kund tarpan for mother, grandmother, and maternal lineage' 
                  },
                  { 
                    id: 'grandparents', 
                    label: isHindi ? 'दादा-दादी / नाना-नानी' : 'Grandparents / Ancestors', 
                    desc: isHindi ? 'पूर्वजों के ऋण से मुक्ति व 101 कुलों का उद्धार' : 'Liberation of 101 ancestral generations and ancestral debt clearance' 
                  },
                  { 
                    id: 'spouse', 
                    label: isHindi ? 'जीवनसाथी (पति / पत्नी)' : 'Spouse (Husband / Wife)', 
                    desc: isHindi ? 'एकाग्र चित्त एकोद्दिष्ट श्राद्ध विधान' : 'Solemn Ekoddishtha Shradh individual rite' 
                  },
                  { 
                    id: 'unmarried_relative', 
                    label: isHindi ? 'अविवाहित अथवा निकट संबंधी' : 'Unmarried or Close Relative', 
                    desc: isHindi ? 'विशिष्ट नारायण बलि एवं ब्रह्म कुंड संकल्प' : 'Dedicated Narayan Bali and Brahma Kund Sankalp' 
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAnswers(prev => ({ ...prev, relation: item.id as any }))}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      answers.relation === item.id
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/50'
                        : 'bg-slate-900/60 border-slate-800/90 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm text-white mb-1">
                      <span>{item.label}</span>
                      {answers.relation === item.id && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <span>{isHindi ? 'अगला चरण: देहावसान परिस्थिति' : 'Next Step: Circumstance of Demise'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Circumstances of Passing */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h4 className="font-bold text-base text-white mb-1">
                  {isHindi ? 'देहावसान किस परिस्थिति में हुआ था?' : 'What were the circumstances of their passing?'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isHindi 
                    ? 'गरुड़ पुराण के अनुसार अकाल या आकस्मिक मृत्यु में प्रेतशिला वेदी अनिवार्य होती है।'
                    : 'According to Garuda Purana, untimely or accidental demise necessitates the Pretshila vedi.'}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { 
                    id: 'natural_old_age', 
                    title: isHindi ? 'स्वाभाविक / वृद्धावस्था में शान्तिपूर्ण देहावसान' : 'Natural / Peaceful Demise in Old Age', 
                    desc: isHindi ? 'घर पर परिजनों की उपस्थिति में शांतिपूर्ण निर्वाण। सामान्य पार्वण श्राद्ध अनुशंसित।' : 'Peaceful passing at home in the presence of family. Standard Parvana Shradh recommended.' 
                  },
                  { 
                    id: 'accidental_untimely', 
                    title: isHindi ? 'अकाल / आकस्मिक / अस्वाभाविक देहावसान (Untimely Passing)' : 'Untimely / Accidental Demise', 
                    desc: isHindi ? 'सड़क दुर्घटना, जलमग्न, अल्पायु, अचानक आघात या अशांत मृत्यु। गरुड़ पुराण अनुसार त्रिपिंडी एवं प्रेतशिला अनिवार्य।' : 'Road accident, drowning, sudden demise, or early age passing. Tripindi and Pretshila mandatory under Garuda Purana.' 
                  },
                  { 
                    id: 'lingering_illness', 
                    title: isHindi ? 'दीर्घकालिक अस्वस्थता अथवा अस्पताल में निर्वाण' : 'Prolonged Illness or Hospital Demise', 
                    desc: isHindi ? 'कष्टप्रद बीमारी या अस्पताल में प्राण त्याग। शांति एवं सद्गति हेतु विशेष तर्पण।' : 'Passing away during prolonged medical struggle or hospital care. Special peace and soul transit tarpan.' 
                  },
                  { 
                    id: 'unknown_circumstances', 
                    title: isHindi ? 'तारीख, समय अथवा परिस्थिति पूर्णतः ज्ञात नहीं' : 'Date, Time, or Circumstances Not Fully Known', 
                    desc: isHindi ? 'गया जी में सर्वपितृ अमावस्या व अक्षयवट पर अज्ञात पितरों का मुक्ति संकल्प।' : 'Sarvapitru Amavasya and Akshayavat rites for unknown ancestors in Gaya Ji.' 
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAnswers(prev => ({ ...prev, circumstance: item.id as any }))}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${
                      answers.circumstance === item.id
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/50'
                        : 'bg-slate-900/60 border-slate-800/90 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm text-white mb-1">
                      <span>{item.title}</span>
                      {answers.circumstance === item.id && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  {isHindi ? 'पिछला चरण' : 'Previous Step'}
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <span>{isHindi ? 'अगला चरण: कुलदोष संकेत' : 'Next Step: Family Indications'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Life Indications & Symptoms */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h4 className="font-bold text-base text-white mb-1">
                  {isHindi ? 'क्या परिवार में निम्न में से कोई लक्षण महसूस हो रहे हैं?' : 'Is your family experiencing any of the following indications?'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isHindi 
                    ? 'यह पितृ दोष अथवा पूर्वजों की अपूर्ण इच्छाओं का ज्योतिषीय एवं पौराणिक संकेत होता है (लागू होने वाले चुनें):'
                    : 'Scriptural and astrological indicators of Pitru Dosh or unfulfilled ancestral desires (select all that apply):'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { 
                    id: 'career_obstacles', 
                    label: isHindi ? 'कार्य-व्यापार में निरंतर रुकावटें' : 'Persistent career or business obstacles', 
                    desc: isHindi ? 'मेहनत के बाद भी बरकत न होना या धन रुकना' : 'Hard work without expected prosperity or persistent wealth blockages' 
                  },
                  { 
                    id: 'child_delay', 
                    label: isHindi ? 'संतान प्राप्ति या विवाह में विलम्ब' : 'Delays in progeny or matrimonial alliances', 
                    desc: isHindi ? 'वंश वृद्धि में बाधा अथवा योग्य रिश्ते न मिलना' : 'Obstacles in family growth or repeated delays in finding suitable alliances' 
                  },
                  { 
                    id: 'frequent_illness', 
                    label: isHindi ? 'घर में बार-बार अस्वस्थता व व्याधियां' : 'Frequent unexplained illnesses in family', 
                    desc: isHindi ? 'बिना कारण स्वास्थ्य बिगड़ना या मानसिक तनाव' : 'Health downturns without clear medical cause, persistent fatigue or anxiety' 
                  },
                  { 
                    id: 'disturbed_dreams', 
                    label: isHindi ? 'सपनों में पूर्वजों का अशांत या प्यासा दिखना' : 'Restless dreams or ancestors appearing thirsty/hungry', 
                    desc: isHindi ? 'जल या भोजन मांगते हुए दिखना अथवा भय लगना' : 'Ancestors appearing asking for water or food, uneasy sleep patterns' 
                  },
                  { 
                    id: 'family_discord', 
                    label: isHindi ? 'गृह क्लेश अथवा पारिवारिक अशांति' : 'Unwarranted family discord or unrest', 
                    desc: isHindi ? 'अकारण परिजनों के मध्य मतभेद या मनमुटाव' : 'Friction and misunderstandings between family members without major cause' 
                  }
                ].map((symptom) => {
                  const isChecked = answers.symptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isChecked
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-white mb-1">
                        <span>{symptom.label}</span>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-amber-500 border-amber-400' : 'border-slate-600'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3 h-3 text-slate-950" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{symptom.desc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  {isHindi ? 'पिछला चरण' : 'Previous Step'}
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <span>{isHindi ? 'अगला चरण: गया जी तीर्थ इतिहास' : 'Next Step: Pilgrimage History'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Prior Rites History & Gotra */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h4 className="font-bold text-base text-white mb-1">
                  {isHindi ? 'क्या पहले कभी गया जी में पिंडदान हुआ है?' : 'Have Pind Daan rituals been performed in Gaya Ji previously?'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isHindi 
                    ? 'प्रथम बार आने वाले कुलवंशियों हेतु त्रि-स्थली सम्पूर्ण विधान अनिवार्य माना जाता है।'
                    : 'For first-time pilgrims, the full Tri-Sthali 45-Vedi trail is traditionally prescribed.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { 
                    id: 'first_time_gaya', 
                    label: isHindi ? 'पहली बार गया जी आ रहे हैं' : 'First time visiting Gaya Ji', 
                    desc: isHindi ? '45 वेदियों पर सम्पूर्ण कुल मुक्ति संकल्प' : 'Complete ancestral liberation sankalp across the 45 sacred vedis' 
                  },
                  { 
                    id: 'done_elsewhere', 
                    label: isHindi ? 'हरिद्वार/काशी में किया था, गया जी नहीं' : 'Performed at Haridwar/Kashi, but not Gaya Ji', 
                    desc: isHindi ? 'मोक्ष की अंतिम वेदी गया जी में शेष है' : 'Final moksha vedi at Gaya Ji remains unfulfilled' 
                  },
                  { 
                    id: 'annual_only', 
                    label: isHindi ? 'घर पर नियमित वार्षिक श्राद्ध करते हैं' : 'Perform regular annual shradh at home', 
                    desc: isHindi ? 'गया तीर्थ में अक्षय तृप्ति संकल्प' : 'Akshaya Tripti eternal satisfaction sankalp at Gaya Ji' 
                  },
                  { 
                    id: 'never_done', 
                    label: isHindi ? 'आज तक कोई भी श्राद्ध संस्कार नहीं हुआ' : 'No prior Shradh rituals ever performed', 
                    desc: isHindi ? 'तत्काल प्रायश्चित एवं नारायण बलि विधान' : 'Immediate expiation and Narayan Bali ritual prescribed' 
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAnswers(prev => ({ ...prev, priorRituals: item.id as any }))}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      answers.priorRituals === item.id
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/50'
                        : 'bg-slate-900/60 border-slate-800/90 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-sm text-white mb-1">
                      <span>{item.label}</span>
                      {answers.priorRituals === item.id && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>

              {/* Optional Gotra & City Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {isHindi ? 'आपका कुल गोत्र (Optional):' : 'Your Family Gotra (Optional):'}
                  </label>
                  <input
                    type="text"
                    placeholder={isHindi ? 'उदा. कश्यप, भारद्वाज, पराशर...' : 'e.g. Kashyapa, Bharadwaja, Parashara...'}
                    value={answers.gotra}
                    onChange={(e) => setAnswers(prev => ({ ...prev, gotra: e.target.value }))}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {isHindi ? 'आपका नगर / राज्य (City / State):' : 'Your City / State:'}
                  </label>
                  <input
                    type="text"
                    placeholder={isHindi ? 'उदा. दिल्ली, मुंबई, बेंगलुरु, पटना...' : 'e.g. Delhi, Mumbai, Bengaluru, London...'}
                    value={answers.devoteeCity}
                    onChange={(e) => setAnswers(prev => ({ ...prev, devoteeCity: e.target.value }))}
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  {isHindi ? 'पिछला चरण' : 'Previous Step'}
                </button>
                <button
                  onClick={handleCalculate}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 fill-current text-slate-950" />
                  <span>{isHindi ? 'वैदिक डायग्नोस्टिक रिपोर्ट देखें (Generate Audit)' : 'Generate Vedic Audit Report'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Instant Vedic Moksha Audit Report */}
          {step === 5 && report && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Report Header Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#192233] to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {isHindi ? 'शास्त्रसम्मत आकलन सम्पन्न' : 'Vedic Assessment Completed'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ID: PDW-VD-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <h4 className="font-bold text-lg text-white">
                    {isHindi ? report.recommendedPackage.hindiTitle : report.recommendedPackage.title}
                  </h4>
                  <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                    {isHindi ? 'दोष आकलन: ' : 'Dosha Assessment: '}
                    <span className="font-bold text-amber-200">{report.doshaGrade}</span>
                  </p>
                </div>

                <div className="bg-slate-900/90 px-4 py-3 rounded-2xl border border-slate-700/80 text-right shrink-0">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {isHindi ? 'पारदर्शी पंडा दक्षिणा व सामग्री' : 'Transparent Panda Dakshina & Samagri'}
                  </div>
                  <div className="font-extrabold text-lg text-amber-400">
                    ₹{report.recommendedPackage.estimatedDakshina.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">
                    {isHindi ? 'कोई अतिरिक्त छुपा खर्च नहीं' : '100% Fixed - No Hidden Charges'}
                  </div>
                </div>
              </div>

              {/* Shastra Logic Reasoning */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Flame className="w-4 h-4" />
                  <span>{isHindi ? 'वैदिक एवं पौराणिक विश्लेषण (Shastra Analysis):' : 'Vedic & Scriptural Analysis:'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isHindi ? report.recommendedPackage.reasoning : (report.recommendedPackage.englishReasoning || report.recommendedPackage.reasoning)}
                </p>
                <p className="text-[11px] text-amber-300/80 italic font-serif pt-1 border-t border-slate-800">
                  {report.garudaPuranaCitation}
                </p>
              </div>

              {/* Mandatory Sacred Vedis prescribed */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-400">
                    {isHindi 
                      ? `आपके लिए निर्धारित अनिवार्य पवित्र वेदियाँ (${report.mandatoryVedis.length}):`
                      : `Sacred Vedis Prescribed for Your Sankalp (${report.mandatoryVedis.length}):`}
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold">
                    {isHindi ? 'गया जी 45-वेदी महामार्ग' : 'Gaya Ji 45-Vedi Sacred Trail'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {report.mandatoryVedis.map((vedi, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#0F172A] border border-slate-800/90 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-bold text-xs text-white">
                          {isHindi ? vedi.hindiName : vedi.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-normal">
                        {isHindi ? vedi.significance : (vedi.englishSignificance || vedi.significance)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sankalp Guidance preview */}
              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/30">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                  {isHindi ? 'गोत्र संकल्प प्रारूप (Sankalp Mantra):' : 'Sacred Vedic Sankalp Draft:'}
                </span>
                <p className="text-xs text-amber-100/90 font-serif leading-relaxed italic">
                  {report.sankalpGuidance}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{isHindi ? 'पंडित जी को WhatsApp पर भेजें व परामर्श लें' : 'Consult Verified Pandit Ji on WhatsApp'}</span>
                </a>

                <Link
                  href={`/pre-booking?package=${report.recommendedPackage.slug}&gotra=${encodeURIComponent(answers.gotra || '')}`}
                  onClick={onClose}
                  className="w-full sm:w-auto py-3 px-6 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>{isHindi ? 'तारीख बुक करें (Pre-Book)' : 'Reserve Sacred Slot'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto py-3 px-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'पुनः जांचें' : 'Restart Audit'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
