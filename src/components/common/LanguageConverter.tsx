'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';

export interface LanguageOption {
  code: string;
  native: string;
  english: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', native: 'English', english: 'English' },
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

// Helper to safely extract language code from googtrans cookie
function getActiveLanguageFromCookie(): LanguageOption {
  if (typeof document === 'undefined') return LANGUAGES[0];
  try {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=(?:\/[a-zA-Z]+)?\/([a-zA-Z-]+)/);
    if (match && match[1]) {
      const code = match[1].toLowerCase();
      const found = LANGUAGES.find(l => l.code.toLowerCase() === code);
      if (found) return found;
    }
  } catch (e) {
    // ignore
  }
  return LANGUAGES[0];
}

// Clear all Google Translate cookies thoroughly
function clearGoogleTranslateCookies() {
  if (typeof document === 'undefined') return;
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  const rootDomain = parts.length > 1 ? parts.slice(-2).join('.') : hostname;

  const domainVariants = [
    '',
    hostname,
    '.' + hostname,
    rootDomain,
    '.' + rootDomain
  ];

  domainVariants.forEach(domain => {
    const dStr = domain ? `; domain=${domain}` : '';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${dStr};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}

// Set Google Translate cookie safely across domains
function setGoogleTranslateCookie(langCode: string) {
  if (typeof document === 'undefined') return;
  const cookieValue = `/en/${langCode}`;
  const hostname = window.location.hostname;

  // Path=/ (always works on localhost & modern browsers)
  document.cookie = `googtrans=${cookieValue}; path=/;`;

  // If on actual domain, also set domain-wide cookie
  if (hostname !== 'localhost' && !hostname.includes('127.0.0.1')) {
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${hostname};`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${hostname};`;
    const parts = hostname.split('.');
    if (parts.length > 2) {
      const root = parts.slice(-2).join('.');
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${root};`;
    }
  }
}

export default function LanguageConverter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Sync state with active cookie
    setSelectedLang(getActiveLanguageFromCookie());

    // 2. Ensure single #google_translate_element exists in body
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    // 3. Define callback on window BEFORE loading script
    const initGoogleTranslate = () => {
      try {
        if ((window as any).google?.translate?.TranslateElement) {
          const el = document.getElementById('google_translate_element');
          if (el && !el.hasChildNodes()) {
            new (window as any).google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,bn,mr,gu,pa,ta,te,kn,ml,or,ne',
                autoDisplay: false
              },
              'google_translate_element'
            );
          }
        }
      } catch (e) {
        // silently handle
      }
    };

    (window as any).googleTranslateElementInit = initGoogleTranslate;

    // 4. If Google script already exists and initialized, trigger init directly
    if ((window as any).google?.translate?.TranslateElement) {
      initGoogleTranslate();
    } else if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // 5. Listen for language changes from other instances (e.g. mobile drawer <-> desktop header)
    const handleSync = (e: CustomEvent<LanguageOption>) => {
      if (e.detail) {
        setSelectedLang(e.detail);
      }
    };

    window.addEventListener('app:language-change' as any, handleSync);

    // 6. Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('app:language-change' as any, handleSync);
    };
  }, []);

  const handleLanguageChange = (lang: LanguageOption) => {
    setSelectedLang(lang);
    setIsOpen(false);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('pinddaan_lang', lang.code);
      } catch (e) {}
      window.dispatchEvent(new CustomEvent('app:language-change', { detail: lang }));
    }

    // CASE A: User selected English (Reset to pristine original source)
    if (lang.code === 'en') {
      clearGoogleTranslateCookies();
      
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = '';
        select.dispatchEvent(new Event('change'));
      }
      
      // Reloading guarantees 100% clean reset without "Surface Daan" double-translation artifacts
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return;
    }

    // CASE B: User selected a non-English language (Hindi, Bengali, etc.)
    setGoogleTranslateCookie(lang.code);

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event('change'));
      
      // Verification fallback: if Google didn't pick up within 400ms, reload to force cookie translation
      setTimeout(() => {
        const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (!combo || combo.value !== lang.code) {
          window.location.reload();
        }
      }, 400);
    } else {
      // If combo not ready in DOM yet, reload with googtrans cookie active
      window.location.reload();
    }
  };

  return (
    <div className="relative inline-block text-left notranslate" translate="no" ref={dropdownRef}>
      {/* Language Trigger Button matching luxury theme */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#421708] hover:bg-[#57200d] text-amber-100 px-3 py-1.5 rounded-lg border border-amber-500/40 text-xs font-semibold shadow-md transition-all focus:outline-none select-none"
        aria-expanded={isOpen}
      >
        <Languages className="w-3.5 h-3.5 text-[#F48D08] shrink-0" />
        <span className="font-medium tracking-wide">
          {selectedLang.native} {selectedLang.code !== 'en' ? `(${selectedLang.english})` : ''}
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
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-[#7C2D12] text-white font-bold'
                    : 'text-amber-100/90 hover:bg-[#4a1808] hover:text-white'
                }`}
              >
                <span className="font-medium">
                  {lang.native} {lang.code !== 'en' ? `(${lang.english})` : ''}
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
