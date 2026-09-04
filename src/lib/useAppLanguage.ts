'use client';

import { useState, useEffect } from 'react';

export type AppLangCode = 
  | 'en' 
  | 'hi' 
  | 'bn' 
  | 'mr' 
  | 'gu' 
  | 'pa' 
  | 'ta' 
  | 'te' 
  | 'kn' 
  | 'ml' 
  | 'or' 
  | 'ne';

export interface LanguageInfo {
  code: AppLangCode;
  name: string;
  speechLocale: string;
  native: string;
}

export const SUPPORTED_APP_LANGUAGES: Record<AppLangCode, LanguageInfo> = {
  en: { code: 'en', name: 'English', native: 'English', speechLocale: 'en-IN' },
  hi: { code: 'hi', name: 'Hindi', native: 'हिन्दी', speechLocale: 'hi-IN' },
  bn: { code: 'bn', name: 'Bengali', native: 'বাংলা', speechLocale: 'bn-IN' },
  mr: { code: 'mr', name: 'Marathi', native: 'मराठी', speechLocale: 'mr-IN' },
  gu: { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', speechLocale: 'gu-IN' },
  pa: { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', speechLocale: 'pa-IN' },
  ta: { code: 'ta', name: 'Tamil', native: 'தமிழ்', speechLocale: 'ta-IN' },
  te: { code: 'te', name: 'Telugu', native: 'తెలుగు', speechLocale: 'te-IN' },
  kn: { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  ml: { code: 'ml', name: 'Malayalam', native: 'മലയാളം', speechLocale: 'ml-IN' },
  or: { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', speechLocale: 'or-IN' },
  ne: { code: 'ne', name: 'Nepali', native: 'नेपाली', speechLocale: 'ne-NP' }
};

export function getActiveAppLanguage(): AppLangCode {
  if (typeof document === 'undefined') return 'en';
  try {
    // 1. Check googtrans cookie: /en/xx or /xx
    const cookieMatch = document.cookie.match(/(?:^|;\s*)googtrans=(?:\/[a-zA-Z]+)?\/([a-zA-Z-]+)/);
    if (cookieMatch && cookieMatch[1]) {
      const code = cookieMatch[1].toLowerCase().slice(0, 2) as AppLangCode;
      if (SUPPORTED_APP_LANGUAGES[code]) return code;
    }
    // 2. Check localStorage
    const saved = localStorage.getItem('pinddaan_lang')?.toLowerCase().slice(0, 2) as AppLangCode;
    if (saved && SUPPORTED_APP_LANGUAGES[saved]) return saved;
  } catch (e) {
    // ignore
  }
  return 'en';
}

export function useAppLanguage() {
  const [lang, setLang] = useState<AppLangCode>('en');

  useEffect(() => {
    // Initial read
    setLang(getActiveAppLanguage());

    const handleLanguageChange = (e: any) => {
      if (e?.detail?.code) {
        const code = e.detail.code.toLowerCase().slice(0, 2) as AppLangCode;
        if (SUPPORTED_APP_LANGUAGES[code]) {
          setLang(code);
        }
      } else {
        setLang(getActiveAppLanguage());
      }
    };

    window.addEventListener('app:language-change' as any, handleLanguageChange);
    return () => {
      window.removeEventListener('app:language-change' as any, handleLanguageChange);
    };
  }, []);

  const info = SUPPORTED_APP_LANGUAGES[lang] || SUPPORTED_APP_LANGUAGES.en;

  return {
    lang,
    info,
    isHindi: lang === 'hi',
    isEnglish: lang === 'en',
    isBengali: lang === 'bn',
    isMarathi: lang === 'mr',
    isGujarati: lang === 'gu',
    isTamil: lang === 'ta',
    isTelugu: lang === 'te'
  };
}

// Multilingual Greetings for AI Pandit Ji
export const AI_GREETINGS: Record<AppLangCode, string> = {
  en: "Jai Shree Vishnu! Har Har Mahadev!\nI am Pandit Ji AI, your authentic Gaya Ji Vedic guide. Ask any question regarding Pitru Paksha dates, Pind Daan rituals, Vishnupad Temple, or packages, or click the mic to speak.",
  hi: "जय श्री विष्णु! जय फल्गु माते!\nमैं गया जी का प्रामाणिक 'पंडित जी AI' हूँ। गोत्र संकल्प, पिंडदान तिथि, विष्णुपद मंदिर व पैकेज से जुड़ा कोई भी प्रश्न पूछें या माइक दबाकर बोलें।",
  bn: "জয় শ্রী বিষ্ণু! জয় ফল্গু মাতা!\nআমি গয়া জী বৈদিক 'পণ্ডিত জী AI'। পিণ্ডদান, পিতৃপক্ষ, বিষ্ণুপদ মন্দির ও প্যাকেজ সম্পর্কিত যেকোনো প্রশ্ন জিজ্ঞাসা করুন বা মাইক চেপে বলুন।",
  mr: "जय श्री विष्णू! जय फल्गु माता!\nमी गया जी वैदिक 'पंडित जी AI' आहे. पिंडदान, पितृपक्ष, विष्णुपद मंदिर आणि पॅकेजबद्दल काहीही विचारा किंवा माइक दाबून बोला.",
  gu: "જય શ્રી વિષ્ણુ! જય ફલ્ગુ માતા!\nહું ગયા જી વૈદિક 'પંડિત જી AI' છું. પિંડદાન, પિતૃપક્ષ, વિષ્ણુપદ મંદિર અને પેકેજ વિશે કંઈપણ પૂછો અથવા માઇક દબાવીને બોલો.",
  pa: "ਜੈ ਸ਼੍ਰੀ ਵਿਸ਼ਨੂੰ!\nਮੈਂ ਗਯਾ ਜੀ ਦਾ ਪ੍ਰਮਾਣਿਕ 'ਪੰਡਿਤ ਜੀ AI' ਹਾਂ। ਪਿੰਡ ਦਾਨ, ਪਿਤ੍ਰ ਪੱਖ, ਵਿਸ਼ਨੂੰਪਦ ਮੰਦਰ ਅਤੇ ਪੈਕੇਜਾਂ ਬਾਰੇ ਪੁੱਛੋ ਜਾਂ ਮਾਈਕ ਦਬਾ ਕੇ ਬੋਲੋ।",
  ta: "ஜெய் ஸ்ரீ விஷ்ணு!\nநான் கயா ஜீ 'பண்டிட் ஜி AI' வேத வழிகாட்டி. பிண்ட தானம், பித்ரு பக்ஷம், விஷ்ணுபதம் மற்றும் பேக்கேஜ்கள் பற்றி கேட்கவும் அல்லது பேசவும்.",
  te: "జై శ్రీ విష్ణు!\nనేను గయా జీ 'పండిట్ జీ AI' వేద మార్గదర్శిని. పిండ ప్రదానం, పితృ పక్షం, విష్ణుపాదం మరియు ప్యాకేజీల గురించి ఏదైనా అడగండి లేదా మాట్లాడండి.",
  kn: "ಜೈ ಶ್ರೀ ವಿಷ್ಣು!\nನಾನು ಗಯಾ ಜೀ 'ಪಂಡಿತ್ ಜೀ AI'. ಪಿಂಡ ದಾನ, ಪಿತೃ ಪಕ್ಷ, ವಿಷ್ಣುಪಾದ ಮತ್ತು ಪ್ಯಾಕೇಜ್ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ ಅಥವಾ ಮಾತನಾಡಿ.",
  ml: "ജയ് ശ്രീ വിഷ്ണു!\nഞാൻ ഗയാ ജീ 'പണ്ഡിറ്റ് ജീ AI'. പിണ്ഡദാനം, പിതൃപക്ഷം, വിഷ്ണുപാദം, പാക്കേജുകൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക അല്ലെങ്കിൽ സംസാരിക്കുക.",
  or: "ଜୟ ଶ୍ରୀ ବିଷ୍ଣୁ!\nମୁଁ ଗୟା ଜୀ ପ୍ରମାଣିକ 'ପଣ୍ଡିତ ଜୀ AI' | ପିଣ୍ଡଦାନ, ପିତୃପକ୍ଷ, ବିଷ୍ଣୁପଦ ମନ୍ଦିର ଓ ପ୍ୟାକେଜ୍ ବିଷୟରେ ପଚାରନ୍ତୁ କିମ୍ବା ମାଇକ୍ ଚିପି କୁହନ୍ତୁ।",
  ne: "जय श्री विष्णु!\nम गया जीको प्रामाणिक 'पण्डित जी AI' हुँ। पिण्डदान, पितृपक्ष, विष्णुपद मन्दिर र प्याकेज सम्बन्धी कुनै पनि प्रश्न सोध्नुहोस्।"
};

export const AI_PLACEHOLDERS: Record<AppLangCode, string> = {
  en: "Ask about Pind Daan, dates, gotra, packages, rituals...",
  hi: "पिंडदान, तिथि, गोत्र, पैकेज या विधि-विधान के बारे में पूछें...",
  bn: "পিণ্ডদান, তিথি, গোত্র, প্যাকেজ বা বিধি-বিধান সম্পর্কে জিজ্ঞাসা করুন...",
  mr: "पिंडदान, तिथी, गोत्र, पॅकेज किंवा विधीबद्दल विचारा...",
  gu: "પિંડદાન, તિથિ, ગોત્ર, પેકેજ અથવા વિધિ વિશે પૂછો...",
  pa: "ਪਿੰਡ ਦਾਨ, ਤਿਥੀ, ਗੋਤਰ, ਪੈਕੇਜ ਜਾਂ ਵਿਧੀ ਬਾਰੇ ਪੁੱਛੋ...",
  ta: "பிண்ட தானம், திதி, கோத்திரம், பேக்கேஜ்கள் பற்றி கேளுங்கள்...",
  te: "పిండ ప్రదానం, తిథి, గోత్రం, ప్యాకేజీల గురించి అడగండి...",
  kn: "ಪಿಂಡ ದಾನ, ತಿಥಿ, ಗೋತ್ರ, ಪ್ಯಾಕೇಜ್ ಬಗ್ಗೆ ಕೇಳಿ...",
  ml: "പിണ്ഡദാനം, തിഥി, ഗോത്രം, പാക്കേജുകൾ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...",
  or: "ପିଣ୍ଡଦାନ, ତିଥି, ଗୋତ୍ର, ପ୍ୟାକେଜ୍ ବିଷୟରେ ପଚାରନ୍ତୁ...",
  ne: "पिण्डदान, तिथि, गोत्र, प्याकेज बारे सोध्नुहोस्..."
};

export const AI_HEADER_TEXT: Record<AppLangCode, { title: string; subtitle: string }> = {
  en: { title: "Pandit Ji AI", subtitle: "Authentic Gaya Ji Teerth Purohit" },
  hi: { title: "पंडित जी AI", subtitle: "प्रामाणिक गया जी तीर्थ पुरोहित" },
  bn: { title: "পণ্ডিত জী AI", subtitle: "প্রামাণিক গয়া জী তীর্থ পুরোহিত" },
  mr: { title: "पंडित जी AI", subtitle: "प्रामाणिक गया जी तीर्थ पुरोहित" },
  gu: { title: "પંડિત જી AI", subtitle: "પ્રામાણિક ગયા જી તીર્થ પુરોહિત" },
  pa: { title: "ਪੰਡਿਤ ਜੀ AI", subtitle: "ਪ੍ਰਮਾਣਿਕ ਗਯਾ ਜੀ ਤੀਰਥ ਪੁਰੋਹਿਤ" },
  ta: { title: "பண்டிட் ஜி AI", subtitle: "அங்கீகரிக்கப்பட்ட கயா ஜீ தீர்த்த புரோகிதர்" },
  te: { title: "పండిట్ జీ AI", subtitle: "ప్రామాణిక గయా జీ తీర్థ పురోహితుడు" },
  kn: { title: "ಪಂಡಿತ್ ಜೀ AI", subtitle: "ಪ್ರಾಮಾಣಿಕ ಗಯಾ ಜೀ ತೀರ್ಥ ಪುರೋಹಿತ" },
  ml: { title: "പണ്ഡിറ്റ് ജീ AI", subtitle: "ആധികാരിക ഗയാ ജീ തീർത്ഥ പുരോഹിതൻ" },
  or: { title: "ପଣ୍ଡିତ ଜୀ AI", subtitle: "ପ୍ରାମାଣିକ ଗୟା ଜୀ ତୀର୍ଥ ପୁରୋହିତ" },
  ne: { title: "पण्डित जी AI", subtitle: "प्रामाणिक गया जी तीर्थ पुरोहित" }
};
