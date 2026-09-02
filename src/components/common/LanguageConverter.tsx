'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';

interface LanguageOption {
  code: string;
  native: string;
  english: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', native: 'अंग्रेज़ी', english: 'English' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi' },
  { code: 'bn', native: 'বাংলা', english: 'Bengali' },
  { code: 'mr', native: 'मराठी', english: 'Marathi' },
  { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil' },
  { code: 'te', native: 'తెలుగు', english: 'Telugu' },
  { code: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada' },
  { code: 'ml', native: 'മലയാളം', english: 'Malayalam' },
  { code: 'or', native: 'ଓଡ଼ିଆ', english: 'Odia' },
  { code: 'ne', native: 'नेपाली', english: 'Nepali' }
];

export default function LanguageConverter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read existing cookie if set
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      const found = LANGUAGES.find(l => l.code === match[1]);
      if (found) setSelectedLang(found);
    }

    // Load Google Translate script dynamically
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,mr,gu,pa,ta,te,kn,ml,or,ne',
            autoDisplay: false
          },
          'google_translate_element'
        );
      };
    }

    // Close on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: LanguageOption) => {
    setSelectedLang(lang);
    setIsOpen(false);

    const cookieValue = `/en/${lang.code}`;
    const hostname = window.location.hostname;

    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${hostname};`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${hostname};`;

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Hidden Google Element */}
      <div id="google_translate_element" className="hidden" />

      {/* Language Trigger Button matching User UI */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#421708] hover:bg-[#57200d] text-amber-100 px-3 py-1.5 rounded-lg border border-amber-500/40 text-xs font-semibold shadow-md transition-all focus:outline-none"
        aria-expanded={isOpen}
      >
        <Languages className="w-3.5 h-3.5 text-[#F48D08] shrink-0" />
        <span className="font-medium tracking-wide">
          {selectedLang.native} ({selectedLang.english})
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-amber-300/80 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Language Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-[#2b0e04] border border-[#F48D08]/50 shadow-2xl z-[100] max-h-80 overflow-y-auto py-1.5 divide-y divide-amber-950/40 backdrop-blur-md">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang.code === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-[#7C2D12] text-white font-bold'
                    : 'text-amber-100/90 hover:bg-[#4a1808] hover:text-white'
                }`}
              >
                <span className="font-medium">
                  {lang.native} ({lang.english})
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#F48D08] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
