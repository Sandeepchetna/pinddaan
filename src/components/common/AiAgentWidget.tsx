'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Loader2, 
  MessageCircle, 
  Phone, 
  Calendar, 
  Flame, 
  FileCheck2 
} from 'lucide-react';
import Link from 'next/link';
import VedicDiagnosticModal from '@/components/ai/VedicDiagnosticModal';
import { 
  useAppLanguage, 
  AI_GREETINGS, 
  AI_PLACEHOLDERS, 
  AI_HEADER_TEXT, 
  AppLangCode 
} from '@/lib/useAppLanguage';

// Animated Pandit Ji Divine Avatar Icon
function AnimatedPanditJiIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="32" r="30" fill="#6f1d14" stroke="#F48D08" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="28" fill="url(#haloGrad)" opacity="0.4" />
      {/* Saffron Angavastram / Shawl */}
      <path d="M12 56C12 45 20 38 32 38C44 38 52 45 52 56" fill="#EA580C" />
      <path d="M22 40L32 58L42 40" fill="#F97316" />
      {/* Holy Rudraksha Beads Mala */}
      <path d="M24 45C27 52 37 52 40 45" stroke="#78350F" strokeWidth="2.5" strokeDasharray="1.5 2.5" strokeLinecap="round" />
      {/* Sacred Head & Face */}
      <circle cx="32" cy="27" r="13" fill="#FED7AA" />
      {/* Pandit Ji Beard & Chibuk */}
      <path d="M26 31C26 38 38 38 38 31" fill="#FFFFFF" opacity="0.9" />
      {/* Bright Vaishnava Urdhva Pundra Tilak */}
      <path d="M30 18V28M34 18V28" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M30 28C30 30 34 30 34 28" stroke="#F8FAFC" strokeWidth="1.8" />
      <circle cx="32" cy="26" r="1.3" fill="#DC2626" />
      {/* Gentle Meditative Eyes & Divine Smile */}
      <path d="M26 25C27.5 26.5 29 26 29 25" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35 25C36.5 26.5 38 26 38 25" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 32C31 33.5 33 33.5 34 32" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
      {/* Saffron Pagri / Traditional Turban */}
      <path d="M19 22C19 14 24 10 32 10C40 10 45 14 45 22C41 18 36 17 32 17C28 17 23 18 19 22Z" fill="#F59E0B" />
      <path d="M24 13C28 11 36 11 40 13" stroke="#D97706" strokeWidth="1.5" />
      <circle cx="32" cy="11" r="2" fill="#DC2626" />
      <defs>
        <radialGradient id="haloGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(30)">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#6f1d14" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// 1. Phonetic Vedic Auto-Correction for Speech-to-Text Misrecognitions
function sanitizeVedicSpeechInput(raw: string, lang: AppLangCode): string {
  if (!raw) return '';
  let text = raw.trim();

  const isEnglish = lang === 'en';

  // Pind Daan misrecognitions (speech engines often hear 'print out' or 'pint out')
  text = text.replace(
    /\b(print\s*out|printout|printer|printing|pint\s*out|pintout|point\s*out|pin\s*out|pin\s*down|pindown|pen\s*down|pin\s*dan|pind\s*dan|pind\s*daan|peen\s*daan|peen\s*dan|been\s*done|bean\s*done|paint\s*out|pin\s*don|pindan|pinda|pinddaan|ping\s*daan|pin\s*dam)\b/gi, 
    isEnglish ? 'Pind Daan' : 'पिंडदान'
  );

  // Shradh misrecognitions
  text = text.replace(
    /\b(shard|shrad|shraadh|sharad|shradha|sradh|shraadha)\b/gi, 
    isEnglish ? 'Shradh' : 'श्राद्ध'
  );

  // Gaya Ji misrecognitions
  text = text.replace(
    /\b(gaia|guy a|gaya ji|gayaji|gaaya)\b/gi, 
    isEnglish ? 'Gaya Ji' : 'गया जी'
  );

  // Vishnupad misrecognitions
  text = text.replace(
    /\b(vishnu\s*pad|vishnupad|vishnu\s*feet|vishnu\s*padh|visnu\s*pad)\b/gi, 
    isEnglish ? 'Vishnupad' : 'विष्णुपद'
  );

  // Falgu River misrecognitions
  text = text.replace(
    /\b(falgu|falgoo|phalguna|falgu nadi)\b/gi, 
    isEnglish ? 'Falgu River' : 'फल्गु नदी'
  );

  // Akshayavat misrecognitions
  text = text.replace(
    /\b(akshay\s*vat|akshayvat|akshay\s*bar|akshay\s*bad)\b/gi, 
    isEnglish ? 'Akshayavat' : 'अक्षयवट'
  );

  // Pretshila misrecognitions
  text = text.replace(
    /\b(pret\s*shila|pretshila|plate\s*shila|pret\s*sila|pet\s*shila)\b/gi, 
    isEnglish ? 'Pretshila' : 'प्रेतशिला'
  );

  // Pitru Paksha misrecognitions
  text = text.replace(
    /\b(pitrapaksh|pitru\s*paksha|pitra\s*paksha|petro\s*pack|peter\s*pack)\b/gi, 
    isEnglish ? 'Pitru Paksha' : 'पितृपक्ष'
  );

  // Pitra Dosh misrecognitions
  text = text.replace(
    /\b(pitra\s*dosh|pitru\s*dosh|pitra\s*dosha|peter\s*dosh)\b/gi, 
    isEnglish ? 'Pitru Dosh' : 'पितृ दोष'
  );

  // Gotra misrecognitions
  text = text.replace(
    /\b(gautra|goat\s*ra|gotram|gotar)\b/gi, 
    isEnglish ? 'Gotra' : 'गोत्र'
  );

  // Tarpan misrecognitions
  text = text.replace(
    /\b(torpon|tarpanam|tarpan)\b/gi, 
    isEnglish ? 'Tarpan' : 'तर्पण'
  );

  // Dakshina misrecognitions
  text = text.replace(
    /\b(dokshina|dakshna|dakhina)\b/gi, 
    isEnglish ? 'Dakshina' : 'दक्षिणा'
  );

  return text;
}

// 2. High-Fidelity Audio Sanitizer for Text-to-Speech (STRICTLY NO EMOJIS, BULLETS OR SPECIAL SYMBOLS READOUT)
function cleanTextForAudioSpeech(raw: string, lang: AppLangCode): string {
  if (!raw) return '';

  let text = raw;
  const isEnglish = lang === 'en';

  // 1. Remove all Unicode Emojis and Pictographs (folded hands, sparkles, icons)
  text = text.replace(/[\p{Extended_Pictographic}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '');

  // 2. Remove accidental accessibility readout text (folded hand, pranam symbol, etc.)
  text = text.replace(/\b(folded\s*hands?|pranam\s*symbol|namaste\s*symbol|folded\s*hand\s*symbol|folded\s*hand|folded\s*hands\s*symbol|emoji)\b/gi, '');

  // 3. Remove Markdown formatting and decorative symbols
  text = text.replace(/[*#_~`>|]/g, '');

  // 4. Remove bullet characters and dashes that are read aloud
  text = text.replace(/^[•\-–—]\s*/gm, '');
  text = text.replace(/[•–—]/g, ' ');

  // 5. Convert Indian Rupee currency symbols to natural spoken words
  if (isEnglish) {
    text = text.replace(/₹\s*([0-9,]+)/g, (_, num) => `${num.replace(/,/g, '')} Rupees`);
    text = text.replace(/\+?91[\s-]?[0-9]{10}/g, 'our helpline number');
    text = text.replace(/\(1\s*Day\)/gi, 'One Day');
    text = text.replace(/\(3\s*Days\)/gi, 'Three Days');
  } else {
    text = text.replace(/₹\s*([0-9,]+)/g, (_, num) => `${num.replace(/,/g, '')} रुपये`);
    text = text.replace(/\+?91[\s-]?[0-9]{10}/g, 'हमारे हेल्पलाइन नंबर');
    text = text.replace(/\(1\s*Day\)/gi, 'एक दिवसीय');
    text = text.replace(/\(3\s*Days\)/gi, 'तीन दिवसीय');
  }

  text = text.replace(/https?:\/\/[^\s]+/g, '');
  text = text.replace(/\([^\)]+\)/g, ''); // strip remaining parenthetical notes

  // 6. Handle punctuation so synthesizers NEVER pronounce "comma" or "period"
  text = text.replace(/[,;:\"\'\/\\\[\]\(\)\{\}]/g, ' ');
  text = text.replace(/\.{2,}/g, isEnglish ? '. ' : '। ');
  if (!isEnglish) {
    text = text.replace(/\./g, '। ');
  }

  // 7. Clean up extra whitespace
  text = text.replace(/\s+/g, ' ').trim();

  // Take first 3 spoken sentences so it's sweet, respectful, concise and doesn't drone on
  const sentenceDelimiter = isEnglish ? /[!\?\.](?:\s|$)/ : /[।!\?](?:\s|$)/;
  const sentences = text.split(sentenceDelimiter).map(s => s.trim()).filter(s => s.length > 4);
  const endPunct = isEnglish ? '. ' : '। ';
  if (sentences.length > 3) {
    text = sentences.slice(0, 3).join(endPunct) + (isEnglish ? '.' : '।');
  } else if (sentences.length > 0) {
    text = sentences.join(endPunct) + (isEnglish ? '.' : '।');
  }

  return text;
}

export default function AiAgentWidget() {
  const { lang, info, isHindi, isEnglish } = useAppLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: AI_GREETINGS[lang] || AI_GREETINGS.en
    }
  ]);

  // Sync greeting when website language changes
  useEffect(() => {
    setChatMessages([
      {
        sender: 'ai',
        text: AI_GREETINGS[lang] || AI_GREETINGS.en
      }
    ]);
  }, [lang]);

  // Speech Recognition Reference
  const recognitionRef = useRef<any>(null);

  // Movable Dragging Position State
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number; moved: boolean }>({
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false
  });

  // Calculate default position on client mount
  useEffect(() => {
    const updateDefaultPos = () => {
      const defaultX = window.innerWidth - 88;
      const defaultY = window.innerHeight - 96;
      setPosition({ x: Math.max(16, defaultX), y: Math.max(16, defaultY) });
    };

    updateDefaultPos();
    window.addEventListener('resize', updateDefaultPos);
    return () => window.removeEventListener('resize', updateDefaultPos);
  }, []);

  // Scroll chat to bottom on new message
  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  // Keyboard accessibility and outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setChatOpen(false);
        setIsDiagnosticOpen(false);
        if (typeof window !== 'undefined') {
          window.speechSynthesis?.cancel();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Preload and cache SpeechSynthesis voices
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          setAvailableVoices(voices);
        }
      } catch (e) {
        console.warn('Voice loading notice:', e);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Initialize Web Speech Recognition with dynamic language locale
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = info.speechLocale || 'en-IN';

        recognition.onresult = (event: any) => {
          const rawTranscript = event.results[0][0].transcript;
          if (rawTranscript) {
            const sanitized = sanitizeVedicSpeechInput(rawTranscript, lang);
            setInputMessage(sanitized);
            submitMessage(sanitized);
          }
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [info.speechLocale, lang]);

  // Toggle Voice Input
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(isHindi ? 'आपके ब्राउज़र में वॉइस इनपुट सपोर्ट नहीं है। कृपया गूगल क्रोम का उपयोग करें।' : 'Voice input is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        if (typeof window !== 'undefined') {
          window.speechSynthesis?.cancel();
        }
        recognitionRef.current.lang = info.speechLocale || 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech start error:', err);
      }
    }
  };

  // High-Quality Text to Speech Readout (Language Matched)
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const cleaned = cleanTextForAudioSpeech(text, lang);
      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
      let selectedVoice: SpeechSynthesisVoice | undefined;

      if (lang === 'hi') {
        selectedVoice = voices.find(v => 
          v.lang === 'hi-IN' || 
          v.lang === 'hi_IN' || 
          v.lang.startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') || 
          v.name.toLowerCase().includes('lekha') || 
          v.name.toLowerCase().includes('neerja')
        );
      } else if (lang === 'en') {
        selectedVoice = voices.find(v => 
          v.lang === 'en-IN' || 
          v.lang === 'en_IN' || 
          v.name.toLowerCase().includes('india') ||
          v.name.toLowerCase().includes('veena') ||
          v.name.toLowerCase().includes('rishi')
        ) || voices.find(v => v.lang.startsWith('en'));
      } else {
        // Regional Indian language (e.g. bn, ta, te, mr, gu)
        selectedVoice = voices.find(v => v.lang.toLowerCase().startsWith(lang));
        if (!selectedVoice) {
          selectedVoice = voices.find(v => v.lang.toLowerCase().includes('in'));
        }
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = info.speechLocale || 'en-IN';
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS error:', e);
    }
  };

  // Pointer Drag Handler (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!position) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
      moved: false
    };

    setIsDragging(true);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - dragRef.current.startX;
      const deltaY = moveEvent.clientY - dragRef.current.startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        dragRef.current.moved = true;
      }

      let newX = dragRef.current.originX + deltaX;
      let newY = dragRef.current.originY + deltaY;

      const minX = 16;
      const maxX = window.innerWidth - 72;
      const minY = 16;
      const maxY = window.innerHeight - 72;

      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Chat message submit
  const submitMessage = async (rawText: string) => {
    if (!rawText.trim() || isAILoading) return;

    const userText = sanitizeVedicSpeechInput(rawText.trim(), lang);
    setInputMessage('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsAILoading(true);

    try {
      const history = chatMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: userText }],
          language: lang
        })
      });

      const data = await res.json();
      const defaultReply = isHindi
        ? 'जय श्री विष्णु! गया जी तीर्थ पुरोहित सहायता हेतु आप हमें सीधे कॉल (+91 7463055338) कर सकते हैं।'
        : 'Jai Shree Vishnu! For Gaya Ji Teerth Purohit guidance, please call us directly at +91 7463055338.';

      const aiReply = data.reply || defaultReply;

      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      speakText(aiReply);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: isHindi
            ? 'जय श्री विष्णु!\nविष्णुपद मंदिर व पिंडदान पैकेज की त्वरित जानकारी हेतु आप हमें सीधे +91 7463055338 पर WhatsApp या कॉल कर सकते हैं।'
            : 'Jai Shree Vishnu!\nFor immediate assistance with Vishnupad Temple rites and Pind Daan packages, please contact us on WhatsApp or call +91 7463055338.'
        }
      ]);
    } finally {
      setIsAILoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(inputMessage);
  };

  const isLeftSide = position ? position.x < window.innerWidth / 2 : false;
  const isNearTop = position ? position.y < 350 : false;

  const headerStrings = AI_HEADER_TEXT[lang] || AI_HEADER_TEXT.en;
  const placeholderText = AI_PLACEHOLDERS[lang] || AI_PLACEHOLDERS.en;

  return (
    <>
      <div
        ref={widgetRef}
        style={
          position
            ? {
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 999
              }
            : {
                position: 'fixed',
                right: '24px',
                bottom: '24px',
                zIndex: 999
              }
        }
        className="touch-none select-none transition-shadow"
      >
        <div className="relative">

          {/* 1. Expandable Floating Quick Menu Options */}
          {isOpen && (
            <div
              className={`absolute flex flex-col gap-2.5 mb-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
                isNearTop ? 'top-16' : 'bottom-16'
              } ${isLeftSide ? 'left-0 items-start' : 'right-0 items-end'}`}
            >
              {/* AI Vedic Diagnostic Launcher Button */}
              <button
                type="button"
                onClick={() => {
                  setIsDiagnosticOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-2xl hover:scale-105 transition-all border border-amber-300/80 shrink-0 whitespace-nowrap animate-pulse"
              >
                <Sparkles className="w-4 h-4 fill-current text-slate-950" />
                <span>{isHindi ? 'AI पितृ दोष जांच (Vedic Diagnostic)' : 'AI Pitru Dosh Assessment'}</span>
              </button>

              <Link
                href="/pre-booking"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#C6922E] text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all border border-amber-300/40 shrink-0 whitespace-nowrap"
              >
                <FileCheck2 className="w-4 h-4 text-amber-200" />
                <span>{isHindi ? 'पिंडदान बुकिंग (Pre-Book)' : 'Pre-Book Pind Daan'}</span>
              </Link>

              <a
                href="tel:+917463055338"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0284C7] text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all border border-sky-300/40 shrink-0 whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 7463055338</span>
              </a>

              <a
                href="https://wa.me/917463055338?text=Pranam%21%20I%20want%20to%20know%20about%20Pind%20Daan%20Booking%20at%20Gaya%20Ji"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all border border-emerald-300/40 shrink-0 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Instant Chat</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setChatOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#6f1d14] text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all border border-amber-400/50 shrink-0 whitespace-nowrap"
              >
                <Flame className="w-4 h-4 text-[#F48D08]" />
                <span>{isHindi ? 'पंडित जी AI से पूछें (Voice & Chat)' : 'Ask Pandit Ji AI (Voice & Chat)'}</span>
              </button>
            </div>
          )}

          {/* 2. Main Animated Movable Button */}
          <button
            type="button"
            onPointerDown={handlePointerDown}
            onClick={() => {
              if (!dragRef.current.moved) {
                setIsOpen(!isOpen);
              }
            }}
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#6f1d14] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(111,29,20,0.35)] hover:shadow-[0_12px_36px_rgba(198,146,46,0.5)] border-2 border-amber-400 relative cursor-grab active:cursor-grabbing transition-transform select-none ${
              isDragging ? 'scale-105' : 'hover:scale-105'
            }`}
            title={isHindi ? 'पंडित जी AI' : 'Pandit Ji AI'}
            aria-label="Pandit Ji AI & Divine Services Widget"
          >
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />

            {isOpen ? (
              <X className="w-6 h-6 text-amber-200" />
            ) : (
              <div className="flex items-center justify-center p-1">
                <AnimatedPanditJiIcon className="w-9 h-9 sm:w-10 sm:h-10 pointer-events-none" />
              </div>
            )}
          </button>

          {/* 3. Pandit Ji AI Chat Modal Window */}
          {chatOpen && (
            <div
              className={`fixed w-[calc(100vw-2rem)] sm:w-[410px] bg-[#0E1626] text-slate-100 rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden z-[60] flex flex-col h-[520px] sm:h-[560px] animate-in fade-in zoom-in-95 duration-200 ${
                isNearTop ? 'top-20' : 'bottom-20'
              } ${isLeftSide ? 'left-4 sm:left-10' : 'right-4 sm:right-10'}`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#6f1d14] via-[#3d120d] to-[#0E1626] text-white p-4 flex justify-between items-center border-b border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100/10 border border-amber-400/40 flex items-center justify-center p-1">
                    <AnimatedPanditJiIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-amber-300">
                        {headerStrings.title}
                      </h4>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                        ⚡ Groq LPU
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {headerStrings.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* TTS Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      if (ttsEnabled && typeof window !== 'undefined') {
                        window.speechSynthesis?.cancel();
                      }
                      setTtsEnabled(!ttsEnabled);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      ttsEnabled ? 'text-amber-300 bg-amber-500/15' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title={ttsEnabled ? 'Mute Voice' : 'Enable Voice'}
                  >
                    {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  {/* Close */}
                  <button
                    type="button"
                    onClick={() => setChatOpen(false)}
                    className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Suggestion Strip */}
              <div className="px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsDiagnosticOpen(true);
                    setChatOpen(false);
                  }}
                  className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold shrink-0 flex items-center gap-1 hover:bg-amber-500/30 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{isHindi ? 'पितृ दोष जांच' : 'Pitru Dosh Assessment'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => submitMessage(isHindi ? 'पिंडदान पैकेज और दक्षिणा की जानकारी दीजिए' : 'What are the Pind Daan packages and transparent dakshina?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white text-[10px] font-medium shrink-0 border border-slate-700/60"
                >
                  {isHindi ? 'पैकेज दक्षिणा' : 'Packages & Rates'}
                </button>

                <button
                  type="button"
                  onClick={() => submitMessage(isHindi ? 'क्या पुत्री या महिला पिंडदान कर सकती है?' : 'Can a daughter or female perform Pind Daan in Gaya Ji?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white text-[10px] font-medium shrink-0 border border-slate-700/60"
                >
                  {isHindi ? 'महिला अधिकार' : 'Women Ritual Rights'}
                </button>

                <button
                  type="button"
                  onClick={() => submitMessage(isHindi ? 'गया जी की 45 वेदियों का क्या महत्व है?' : 'What is the significance of the 45 sacred vedis in Gaya Ji?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white text-[10px] font-medium shrink-0 border border-slate-700/60"
                >
                  {isHindi ? '45 वेदियाँ' : '45 Sacred Vedis'}
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0B0F19] text-xs">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-bold rounded-tr-none shadow-md'
                          : 'bg-[#141C2B] text-slate-200 border border-slate-800 shadow-sm rounded-tl-none font-sans'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isAILoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#141C2B] text-amber-300 border border-slate-800 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs font-semibold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{isHindi ? 'पंडित जी विचार कर रहे हैं...' : 'Pandit Ji is contemplating...'}</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form with Voice Mic */}
              <form onSubmit={handleSendMessage} className="p-3 bg-[#0E1626] border-t border-slate-800 flex items-center gap-2">
                {/* Voice Input Mic Button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isListening 
                      ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/30' 
                      : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                  }`}
                  title={isListening ? (isHindi ? 'सुन रहे हैं...' : 'Listening...') : (isHindi ? 'बोलकर पूछें' : 'Click to Speak')}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <input
                  type="text"
                  placeholder={isListening ? (isHindi ? 'बोलिए, सुन रहे हैं...' : 'Listening, please speak...') : placeholderText}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-[#0B0F19] border border-slate-700/80 rounded-full px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isAILoading}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-slate-950 font-bold flex items-center justify-center shrink-0 shadow transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* Global Interactive Vedic Diagnostic Modal */}
      <VedicDiagnosticModal 
        isOpen={isDiagnosticOpen} 
        onClose={() => setIsDiagnosticOpen(false)} 
      />
    </>
  );
}
