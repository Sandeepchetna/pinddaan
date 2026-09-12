'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Phone, 
  Award, 
  Car, 
  CheckCircle2
} from 'lucide-react';
import { useAppLanguage, AppLangCode } from '@/lib/useAppLanguage';

interface ModalTranslation {
  sacredPill: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  uspFixedTitle: string;
  uspFixedDesc: string;
  uspPandasTitle: string;
  uspPandasDesc: string;
  uspLogisticsTitle: string;
  uspLogisticsDesc: string;
  uspSamagriTitle: string;
  uspSamagriDesc: string;
  alertTitle: string;
  alertDesc: string;
  btnExplore: string;
  btnBook: string;
  helplineLabel: string;
}

const MODAL_TRANSLATIONS: Record<AppLangCode, ModalTranslation> = {
  hi: {
    sacredPill: 'ॐ नमो नारायणाय • सादर प्रणाम',
    titlePrefix: 'गया जी तीर्थ में आपका स्वागत है: ',
    titleHighlight: '100% प्रामाणिक एवं सुरक्षित',
    subtitle: 'विष्णुपद मंदिर कुल के प्रामाणिक पंडा जी द्वारा विधि-विधान। स्टेशन के बिचौलियों व घाट के अनुचित मोलभाव से आपको 100% सुरक्षा।',
    uspFixedTitle: '100% निश्चित दक्षिणा',
    uspFixedDesc: 'जो तय हुआ वही अंतिम, कोई अप्रत्याशित मांग नहीं',
    uspPandasTitle: 'प्रामाणिक गया तीर्थ पंडा',
    uspPandasDesc: 'विष्णुपद बही-खाता कुल वंश परंपरा रिकॉर्ड',
    uspLogisticsTitle: 'पारदर्शी यात्रा व्यवस्था',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'सम्पूर्ण सामग्री एवं संकल्प',
    uspSamagriDesc: '100% शुद्ध सामग्री, तिल, जौ, गाय का घी, भोज',
    alertTitle: 'पितृपक्ष महासंगम 2026: 26 सितम्बर – 10 अक्टूबर',
    alertDesc: 'शुभ तिथियों के लिए अग्रिम पंजीकरण चालू है।',
    btnExplore: 'पैकेज देखें',
    btnBook: 'अभी बुक करें',
    helplineLabel: '24x7 तीर्थ हेल्पलाइन'
  },
  en: {
    sacredPill: 'Welcome to PindDaanWale Official',
    titlePrefix: 'Sacred Gaya Ji Pilgrimage: ',
    titleHighlight: 'Authentic & Extortion-Free',
    subtitle: 'Experience traditional ancestor rites conducted by verified Vishnupad lineage purohits. Strict protection from station touts and riverbank price inflation.',
    uspFixedTitle: '100% Fixed Dakshina',
    uspFixedDesc: 'No unexpected charges or forced demands at riverbanks',
    uspPandasTitle: 'Verified Lineage Pandas',
    uspPandasDesc: 'Official bahi-khata lineage genealogy documentation',
    uspLogisticsTitle: 'Transparent Logistics',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private AC Cab (Platinum VIP)',
    uspSamagriTitle: 'Full Vedic Samagri',
    uspSamagriDesc: '100% pure organic kit, barley, cow ghee & gotra sankalp',
    alertTitle: 'Pitru Paksha Mahasangam 2026: 26 Sept – 10 Oct',
    alertDesc: 'Pre-booking open for auspicious Panchang dates.',
    btnExplore: 'Explore Packages',
    btnBook: 'Book Now',
    helplineLabel: '24x7 Pilgrim Helpline'
  },
  bn: {
    sacredPill: 'ওঁ নমো নারায়ণায় • সাদর প্রণাম',
    titlePrefix: 'গয়া জী তীর্থে আপনাকে স্বাগত: ',
    titleHighlight: '১০০% প্রামাণিক ও সুরক্ষিত',
    subtitle: 'বিষ্ণুপদ মন্দির কুলের প্রামাণিক পণ্ডা দ্বারা বৈদিক পিণ্ডদান। স্টেশনের দালাল ও ঘাটের অতিরিক্ত দাবির হাত থেকে ১০০% সুরক্ষা।',
    uspFixedTitle: '১০০% নির্ধারিত দক্ষিণা',
    uspFixedDesc: 'যা নির্ধারিত তাই চূড়ান্ত, ঘাটে কোনো অতিরিক্ত দাবি নেই',
    uspPandasTitle: 'প্রামাণিক বংশানুক্রমিক পণ্ডা',
    uspPandasDesc: 'বিষ্ণুপদ প্রাচীন বহি-খাতা বংশাবলি রেকর্ড',
    uspLogisticsTitle: 'স্বচ্ছ ভ্রমণ ব্যবস্থা',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'সম্পূর্ণ বৈদিক সামগ্রী',
    uspSamagriDesc: '১০০% শুদ্ধ পূজা সামগ্রী, তিল, যব, ঘি ও গোত্র সংকল্প',
    alertTitle: 'পিতৃপক্ষ মহাসঙ্গম ২০২৬: ২৬ সেপ্টেম্বর – ১০ অক্টোবর',
    alertDesc: 'শুভ তিথির জন্য অগ্রিম বুকিং চলছে।',
    btnExplore: 'প্যাকেজ দেখুন',
    btnBook: 'এখনই বুক করুন',
    helplineLabel: '২৪x৭ তীর্থ হেল্পলাইন'
  },
  mr: {
    sacredPill: 'ॐ नमो नारायणाय • सादर प्रणाम',
    titlePrefix: 'गया जी तीर्थात आपले स्वागत: ',
    titleHighlight: '१००% प्रामाणिक व सुरक्षित',
    subtitle: 'विष्णुपद मंदिराच्या अधिकृत वंशपरंपरेतील पंडांद्वारे शास्त्रोक्त पिंडदान. स्थानकावरील दलाल आणि घाटावरील अवाजवी मागण्यांपासून पूर्ण संरक्षण.',
    uspFixedTitle: '१००% निश्चित दक्षिणा',
    uspFixedDesc: 'ठरलेली दक्षिणा अंतिम, घाटावर कोणतीही जादा मागणी नाही',
    uspPandasTitle: 'प्रामाणिक गया तीर्थ पुरोहित',
    uspPandasDesc: 'विष्णुपद वही-खाते व मूळ कुल वंश नोंद',
    uspLogisticsTitle: 'पारदर्शक प्रवास व्यवस्था',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'संपूर्ण वैदिक पूजा साहित्य',
    uspSamagriDesc: '१००% शुद्ध साहित्य, तीळ, जव, गाईचे तूप व गोत्र संकल्प',
    alertTitle: 'पितृपक्ष महासंगम २०२६: २६ सप्टेंबर – १० ऑक्टोबर',
    alertDesc: 'शुभ तिथींसाठी आगाऊ नोंदणी सुरू आहे.',
    btnExplore: 'पॅकेज पहा',
    btnBook: 'आत्ताच बुक करा',
    helplineLabel: '२४x७ तीर्थ हेल्पलाइन'
  },
  gu: {
    sacredPill: 'ૐ નમો નારાયણાય • સાદર પ્રણામ',
    titlePrefix: 'ગયા જી તીર્થમાં આપનું સ્વાગત છે: ',
    titleHighlight: '100% પ્રામાણિક અને સુરક્ષિત',
    subtitle: 'વિષ્ણુપદ મંદિરના પ્રમાણિત પરંપરાગત પંડાઓ દ્વારા શાસ્ત્રોક્ત પિંડદાન. સ્ટેશનના દલાલો અને ઘાટ પરની અણધારી માગણીઓથી પૂર્ણ રક્ષણ.',
    uspFixedTitle: '100% નિશ્ચિત દક્ષિણા',
    uspFixedDesc: 'જે નક્કી થયું તે જ અંતિમ, ઘાટ પર કોઈ વધારાનો ખર્ચ નહીં',
    uspPandasTitle: 'પ્રમાણિત ગયા તીર્થ પંડા',
    uspPandasDesc: 'વિષ્ણુપદ વહી-ખાતા વંશ પરંપરા નોંધણી',
    uspLogisticsTitle: 'પારદર્શક મુસાફરી વ્યવસ્થા',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'સંપૂર્ણ વૈદિક સામગ્રી',
    uspSamagriDesc: '100% શુદ્ધ સામગ્રી, તલ, જવ, ગાયનું ઘી અને ગોત્ર સંકલ્પ',
    alertTitle: 'પિતૃપક્ષ મહાસંગમ 2026: 26 સપ્ટેમ્બર – 10 ઓક્ટોબર',
    alertDesc: 'શુભ તિથિઓ માટે એડવાન્સ બુકિંગ શરૂ છે.',
    btnExplore: 'પેકેજ જુઓ',
    btnBook: 'હમણાં બુક કરો',
    helplineLabel: '24x7 યાત્રા હેલ્પલાઇન'
  },
  pa: {
    sacredPill: 'ਓਮ ਨਮੋ ਨਾਰਾਇਣਾਇ • ਸਾਦਰ ਪ੍ਰਣਾਮ',
    titlePrefix: 'ਗਯਾ ਜੀ ਤੀਰਥ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ: ',
    titleHighlight: '100% ਪ੍ਰਮਾਣਿਕ ਤੇ ਸੁਰੱਖਿਅਤ',
    subtitle: 'ਵਿਸ਼ਨੂੰਪਦ ਮੰਦਰ ਕੁਲ ਦੇ ਪ੍ਰਮਾਣਿਤ ਪੰਡਿਤਾਂ ਦੁਆਰਾ ਵੈਦਿਕ ਪਿੰਡ ਦਾਨ। ਸਟੇਸ਼ਨ ਦੇ ਵਿਚੋਲਿਆਂ ਤੇ ਘਾਟ ਦੀ ਵਾਧੂ ਮੰਗਾਂ ਤੋਂ 100% ਸੁਰੱਖਿਆ।',
    uspFixedTitle: '100% ਨਿਸ਼ਚਿਤ ਦਕਸ਼ਿਣਾ',
    uspFixedDesc: 'ਜੋ ਤੈਅ ਹੋਇਆ ਓਹੀ ਅੰਤਿਮ, ਕੋਈ ਵਾਧੂ ਮੰਗ ਨਹੀਂ',
    uspPandasTitle: 'ਪ੍ਰਮਾਣਿਕ ਤੀਰਥ ਪੁਰੋਹਿਤ',
    uspPandasDesc: 'ਵਿਸ਼ਨੂੰਪਦ ਵਹੀ-ਖਾਤਾ ਵੰਸ਼ ਪਰੰਪਰਾ ਰਿਕਾਰਡ',
    uspLogisticsTitle: 'ਪਾਰਦਰਸ਼ੀ ਆਵਾਜਾਈ ਪ੍ਰਬੰਧ',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'ਸੰਪੂਰਨ ਵੈਦਿਕ ਸਮੱਗਰੀ',
    uspSamagriDesc: '100% ਸ਼ੁੱਧ ਸਮੱਗਰੀ, ਤਿਲ, ਜੌਂ, ਦੇਸੀ ਘਿਓ ਤੇ ਗੋਤਰ ਸੰਕਲਪ',
    alertTitle: 'ਪਿਤ੍ਰ ਪੱਖ ਮਹਾਸੰਗਮ 2026: 26 ਸਤੰਬਰ – 10 ਅਕਤੂਬਰ',
    alertDesc: 'ਸ਼ੁੱਭ ਤਿਥੀਆਂ ਲਈ ਪੇਸ਼ਗੀ ਬੁਕਿੰਗ ਚਾਲੂ ਹੈ।',
    btnExplore: 'ਪੈਕੇਜ ਵੇਖੋ',
    btnBook: 'ਹੁਣੇ ਬੁੱਕ ਕਰੋ',
    helplineLabel: '24x7 ਹੈਲਪਲਾਈਨ'
  },
  ta: {
    sacredPill: 'ஓம் நமோ நாராயணாய • வணக்கங்கள்',
    titlePrefix: 'கயா ஜீ புனித யாத்திரைக்கு நல்வரவு: ',
    titleHighlight: '100% அங்கீகரிக்கப்பட்டது & பாதுகாப்பானது',
    subtitle: 'விஷ்ணுபதம் பரம்பரை புரோகிதர்கள் மூலம் செய்யப்படும் வேத பிண்ட தானம். ரயில் நிலைய இடைத்தரகர்கள் மற்றும் நதிக்கரை அதிக கட்டண மிரட்டல்களில் இருந்து முழு பாதுகாப்பு.',
    uspFixedTitle: '100% நிலையான தட்சிணை',
    uspFixedDesc: 'முன்பதிவு செய்த கட்டணமே இறுதியானது, கூடுதல் கட்டணம் இல்லை',
    uspPandasTitle: 'அங்கீகரிக்கப்பட்ட கயா பாண்டாக்கள்',
    uspPandasDesc: 'விஷ்ணுபதம் பஹி-காதா பரம்பரை ஆவணங்கள்',
    uspLogisticsTitle: 'நேர்மையான பயண ஏற்பாடு',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'முழுமையான வேத பூஜை பொருட்கள்',
    uspSamagriDesc: '100% தூய பொருட்கள், எள், பார்லி, பசு நெய் & கோத்ர சங்கல்பம்',
    alertTitle: 'பித்ரு பக்ஷம் 2026: 26 செப்டம்பர் – 10 அக்டோபர்',
    alertDesc: 'புனித தேதிகளுக்கான முன்பதிவு தொடங்கியது.',
    btnExplore: 'பேக்கேஜ்களைப் பார்க்க',
    btnBook: 'இப்போதே முன்பதிவு செய்க',
    helplineLabel: '24x7 யாத்ரீகர் உதவி எண்'
  },
  te: {
    sacredPill: 'ఓం నమో నారాయణాయ • సాదర ప్రణామం',
    titlePrefix: 'గయా జీ పుణ్యక్షేత్రానికి స్వాగతం: ',
    titleHighlight: '100% ప్రామాణికం & సురక్షితం',
    subtitle: 'విష్ణుపాద దేవాలయ వంశపారంపర్య పండితులచే శాస్త్రోక్త పిండ ప్రదానం. స్టేషన్ దళారులు మరియు ఘాట్ వద్ద అదనపు డిమాండ్ల నుండి పూర్తి రక్షణ.',
    uspFixedTitle: '100% ఖచ్చితమైన దక్షిణ',
    uspFixedDesc: 'ఖరారైన మొత్తమే అంతిమం, ఘాట్ వద్ద అదనపు డిమాండ్లు ఉండవు',
    uspPandasTitle: 'ప్రామాణిక గయా తీర్థ పండాలు',
    uspPandasDesc: 'విష్ణుపాద బహీ-ఖాతా వంశపారంపర్య రికార్డులు',
    uspLogisticsTitle: 'పారదర్శక రవాణా సౌకర్యం',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'సంపూర్ణ వేద పూజా సామాగ్రి',
    uspSamagriDesc: '100% స్వచ్ఛమైన సామాగ్రి, నువ్వులు, యవలు, నెయ్యి & గోత్ర సంకల్పం',
    alertTitle: 'పితృ పక్షం 2026: 26 సెప్టెంబర్ – 10 అక్టోబర్',
    alertDesc: 'శుభ తిథుల కొరకు ముందస్తు బుకింగ్ ప్రారంభమైనది.',
    btnExplore: 'ప్యాకేజీలను చూడండి',
    btnBook: 'ఇప్పుడే బుక్ చేయండి',
    helplineLabel: '24x7 యాత్రికుల హెల్ప్‌లైన్'
  },
  kn: {
    sacredPill: 'ಓಂ ನಮೋ ನಾರಾಯಣಾಯ • ಸಾದರ ಪ್ರಣಾಮ',
    titlePrefix: 'ಗಯಾ ಜೀ ಪುಣ್ಯಕ್ಷೇತ್ರಕ್ಕೆ ಸ್ವಾಗತ: ',
    titleHighlight: '100% ಪ್ರಾಮಾಣಿಕ ಮತ್ತು ಸುರಕ್ಷಿತ',
    subtitle: 'ವಿಷ್ಣುಪಾದ ದೇವಸ್ಥಾನದ ವಂಶಪಾರಂಪರ್ಯ ಪುರೋಹಿತರಿಂದ ಶಾಸ್ತ್ರೋಕ್ತ ಪಿಂಡ ಪ್ರದಾನ. ನಿಲ್ದಾಣದ ಮಧ್ಯವರ್ತಿಗಳಿಂದ ಹಾಗೂ ಘಾಟ್ ಹೆಚ್ಚುವರಿ ಬೇಡಿಕೆಗಳಿಂದ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ.',
    uspFixedTitle: '100% ನಿಗದಿತ ದಕ್ಷಿಣೆ',
    uspFixedDesc: 'ನಿಗದಿಯಾದ ದಕ್ಷಿಣೆಯೇ ಅಂತಿಮ, ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಹಣ ಬೇಡುವುದಿಲ್ಲ',
    uspPandasTitle: 'ಅಧಿಕೃತ ಗಯಾ ತೀರ್ಥ ಪಾಂಡಾಗಳು',
    uspPandasDesc: 'ವಿಷ್ಣುಪಾದ ವಂಶಾವಳಿ ದಾಖಲೆಗಳ ನಿರ್ವಹಣೆ',
    uspLogisticsTitle: 'ಪಾರದರ್ಶಕ ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'ಸಂಪೂರ್ಣ ವೈದಿಕ ಪೂಜಾ ಸಾಮಗ್ರಿ',
    uspSamagriDesc: '100% ಶುದ್ಧ ಸಾಮಗ್ರಿ, ಎಳ್ಳು, ಜವೆಗೋಧಿ, ಹಸುವಿನ ತುಪ್ಪ ಮತ್ತು ಸಂಕಲ್ಪ',
    alertTitle: 'ಪಿತೃ ಪಕ್ಷ ಮಹಾಸಂಗಮ 2026: 26 ಸೆಪ್ಟೆಂಬರ್ – 10 ಅಕ್ಟೋಬರ್',
    alertDesc: 'ಪವಿತ್ರ ದಿನಾಂಕಗಳಿಗಾಗಿ ಮುಂಗಡ ನೋಂದಣಿ ಲಭ್ಯವಿದೆ.',
    btnExplore: 'ಪ್ಯಾಕೇಜ್ ನೋಡಿ',
    btnBook: 'ಈಗಲೇ ಬುಕ್ ಮಾಡಿ',
    helplineLabel: '24x7 ಯಾತ್ರಿಕರ ಸಹಾಯವಾಣಿ'
  },
  ml: {
    sacredPill: 'ഓം നമോ നാരായണായ • ആദരവോടെ നമസ്കാരം',
    titlePrefix: 'ഗയാ ജീ പുണ്യക്ഷേത്രത്തിലേക്ക് സ്വാഗതം: ',
    titleHighlight: '100% ആധികാരികവും സുരക്ഷിതവും',
    subtitle: 'വിഷ്ണുപാദ ക്ഷേത്ര പാരമ്പര്യ പുരോഹിതർ നടത്തുന്ന ശാസ്ത്രീയ പിണ്ഡദാനം. ഇടനിലക്കാരുടെ ചൂഷണത്തിൽ നിന്നും അമിത പണപ്പിരിവിൽ നിന്നും പൂർണ്ണ സംരക്ഷണം.',
    uspFixedTitle: '100% നിശ്ചിത ദക്ഷിണ',
    uspFixedDesc: 'മുൻകൂട്ടി നിശ്ചയിച്ച തുക മാത്രം, കടവിൽ അധിക തുക ആവശ്യപ്പെടില്ല',
    uspPandasTitle: 'ആധികാരിക ഗയാ തീർത്ഥ പാണ്ഡമാർ',
    uspPandasDesc: 'വിഷ്ണുപാദ ബഹി-ഖാതാ വംശാവലി രേഖകൾ',
    uspLogisticsTitle: 'സുതാര്യമായ യാത്രാ സൗകര്യം',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'സമ്പൂർണ്ണ പൂജാ സാമഗ്രികൾ',
    uspSamagriDesc: '100% ശുദ്ധമായ സാമഗ്രികൾ, എള്ള്, നെയ്യ് & ഗോത്ര സങ്കൽപം',
    alertTitle: 'പിതൃപക്ഷം 2026: 26 സെപ്റ്റംബർ – 10 ഒക്ടോബർ',
    alertDesc: 'പുണ്യ തിഥികൾക്കായി മുൻകൂട്ടി ബുക്ക് ചെയ്യാം.',
    btnExplore: 'പാക്കേജുകൾ കാണുക',
    btnBook: 'ഇപ്പോൾ ബുക്ക് ചെയ്യുക',
    helplineLabel: '24x7 ഹെൽപ്പ്‌ലൈൻ'
  },
  or: {
    sacredPill: 'ଓଁ ନମୋ ନାରାୟଣାୟ • ସାଦର ପ୍ରଣାମ',
    titlePrefix: 'ଗୟା ଜୀ ତୀର୍ଥକୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ: ',
    titleHighlight: '୧୦୦% ପ୍ରାମାଣିକ ଏବଂ ସୁରକ୍ଷିତ',
    subtitle: 'ବିଷ୍ଣୁପଦ ମନ୍ଦିର କୁଳର ପ୍ରାମାଣିକ ପଣ୍ଡାଙ୍କ ଦ୍ୱାରା ବୈଦିକ ପିଣ୍ଡଦାନ। ଷ୍ଟେସନର ଦଲାଲ ଓ ଘାଟରେ ଅଯଥା ଦାବିରୁ ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷା।',
    uspFixedTitle: '୧୦୦% ନିର୍ଦ୍ଧାରିତ ଦକ୍ଷିଣା',
    uspFixedDesc: 'ଯାହା ଧାର୍ଯ୍ୟ ହୋଇଛି ତାହା ଚୂଡ଼ାନ୍ତ, ଘାଟରେ କୌଣସି ଅତିରିକ୍ତ ଟଙ୍କା ନାହିଁ',
    uspPandasTitle: 'ପ୍ରାମାଣିକ ଗୟା ତୀର୍ଥ ପଣ୍ଡା',
    uspPandasDesc: 'ବିଷ୍ଣୁପଦ ବହି-ଖାତା ବଂଶାବଳୀ ରେକର୍ଡ',
    uspLogisticsTitle: 'ସ୍ୱଚ୍ଛ ଯାତ୍ରା ବ୍ୟବସ୍ଥା',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'ସମ୍ପୂର୍ଣ୍ଣ ବୈଦିକ ସାମଗ୍ରୀ',
    uspSamagriDesc: '୧୦୦% ଶୁଦ୍ଧ ସାମଗ୍ରୀ, ରାଶି, ଜଅ, ଗାଈ ଘିଅ ଓ ଗୋତ୍ର ସଂକଳ୍ପ',
    alertTitle: 'ପିତୃପକ୍ଷ ମହାସଙ୍ଗମ ୨୦୨୬: ୨୬ ସେପ୍ଟେମ୍ବର – ୧୦ ଅକ୍ଟୋବର',
    alertDesc: 'ଶୁଭ ତିଥି ପାଇଁ ଅଗ୍ରୀମ ବୁକିଂ ଚାଲୁଅଛି।',
    btnExplore: 'ପ୍ୟାକେଜ୍ ଦେଖନ୍ତୁ',
    btnBook: 'ଏବେ ବୁକ୍ କରନ୍ତୁ',
    helplineLabel: '୨୪x୭ ତୀର୍ଥ ହେଲ୍ପଲାଇନ୍'
  },
  ne: {
    sacredPill: 'ॐ नमो नारायणाय • सादर प्रणाम',
    titlePrefix: 'गया जी तीर्थमा स्वागत छ: ',
    titleHighlight: '१००% प्रामाणिक र सुरक्षित',
    subtitle: 'विष्णुपद मन्दिर कुलका प्रामाणिक पण्डाद्वारा वैदिक पिण्डदान। स्टेशनका दलाल र घाटको अस्वभाविक मोलतोलबाट १००% सुरक्षा।',
    uspFixedTitle: '१००% निश्चित दक्षिणा',
    uspFixedDesc: 'जे तय भयो त्यही अन्तिम, घाटमा कुनै अतिरिक्त माग छैन',
    uspPandasTitle: 'प्रामाणिक गया तीर्थ पण्डा',
    uspPandasDesc: 'विष्णुपद बही-खाता कुल वंश परम्परा रेकर्ड',
    uspLogisticsTitle: 'पारदर्शी यात्रा व्यवस्था',
    uspLogisticsDesc: 'Auto/Tempo (Gold) • Private Cab (Platinum VIP)',
    uspSamagriTitle: 'सम्पूर्ण वैदिक सामग्री',
    uspSamagriDesc: '१००% शुद्ध सामग्री, तिल, जौ, गाईको घिउ र गोत्र संकल्प',
    alertTitle: 'पितृपक्ष महासङ्गम २०२६: २६ सेप्टेम्बर – १० अक्टोबर',
    alertDesc: 'शुभ तिथिका लागि अग्रिम बुकिङ खुला छ।',
    btnExplore: 'प्याकेज हेर्नुहोस्',
    btnBook: 'अहिले बुक गर्नुहोस्',
    helplineLabel: '२४x७ तीर्थ हेल्पलाइन'
  }
};

export default function WelcomeTrustModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useAppLanguage();
  const t = MODAL_TRANSLATIONS[lang] || MODAL_TRANSLATIONS.hi;

  useEffect(() => {
    // Check if previously dismissed in this browser session
    try {
      const dismissed = sessionStorage.getItem('pinddaan_welcome_seen');
      if (dismissed === 'true') return;
    } catch (e) {
      // sessionStorage unavailable
    }

    // Trigger popup after exactly 10 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Handle Close & remember for session
  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('pinddaan_welcome_seen', 'true');
    } catch (e) {}
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      {/* Backdrop with luxury dark blur */}
      <div 
        onClick={handleClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer" 
      />

      {/* Royal Gold Temple Card Container */}
      <div className="relative w-full max-w-xl my-auto rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#1C160C] via-[#141218] to-[#0D1527] border-2 border-amber-500/50 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden text-white z-10 animate-in zoom-in-95 duration-300">
        
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Inner Content */}
        <div className="p-6 sm:p-8 space-y-5">
          
          {/* Top Welcoming Sacred Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
            <span>{t.sacredPill}</span>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h2 id="welcome-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
              {t.titlePrefix}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400">
                {t.titleHighlight}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
              {t.subtitle}
            </p>
          </div>

          {/* Core USPs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.04] border border-amber-400/20">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-300">
                  {t.uspFixedTitle}
                </div>
                <div className="text-[11px] text-slate-300/90 leading-snug">
                  {t.uspFixedDesc}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.04] border border-amber-400/20">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-300">
                  {t.uspPandasTitle}
                </div>
                <div className="text-[11px] text-slate-300/90 leading-snug">
                  {t.uspPandasDesc}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.04] border border-amber-400/20">
              <Car className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-sky-300">
                  {t.uspLogisticsTitle}
                </div>
                <div className="text-[11px] text-slate-300/90 leading-snug">
                  {t.uspLogisticsDesc}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.04] border border-amber-400/20">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-300">
                  {t.uspSamagriTitle}
                </div>
                <div className="text-[11px] text-slate-300/90 leading-snug">
                  {t.uspSamagriDesc}
                </div>
              </div>
            </div>
          </div>

          {/* Auspicious Pitru Paksha Alert Banner */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-amber-200">
                {t.alertTitle}
              </div>
              <div className="text-[11px] text-slate-300 leading-tight">
                {t.alertDesc}
              </div>
            </div>
          </div>

          {/* Primary CTA Buttons: 'Explore Packages' & 'Book Now' */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/packages"
              onClick={handleClose}
              className="w-full py-3 px-4 rounded-2xl border-2 border-amber-400/60 bg-white/5 hover:bg-amber-400/10 text-amber-200 hover:text-white font-bold text-sm transition-all text-center flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              <span>{t.btnExplore}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>

            <Link
              href="/pre-booking"
              onClick={handleClose}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#C6922E] via-[#F48D08] to-[#D97706] hover:from-[#B58226] hover:to-[#C66904] text-white font-bold text-sm transition-all text-center flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(244,141,8,0.4)] active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>{t.btnBook}</span>
            </Link>
          </div>

          {/* Bottom Helpline Link */}
          <div className="pt-1 text-center">
            <a 
              href="tel:+917463055338" 
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors py-1"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.helplineLabel}: <strong>+91 7463055338</strong></span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
