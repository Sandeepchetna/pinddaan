'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Sparkles, 
  X, 
  Send, 
  Flame, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Loader2,
  FileCheck2
} from 'lucide-react';
import Link from 'next/link';
import VedicDiagnosticModal from '@/components/ai/VedicDiagnosticModal';

// Animated Pandit Ji & Divine Vishnu Sudarshan Chakra Icon
function AnimatedPanditJiIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Divine Vishnu Sudarshan Chakra Rays */}
      <g className="animate-spin" style={{ animationDuration: '20s' }}>
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d="M32 4L34 10H30L32 4Z"
            fill="#FFD700"
            transform={`rotate(${i * 30} 32 32)`}
          />
        ))}
      </g>

      {/* Saffron Aura Circle with Glowing Pulse */}
      <circle cx="32" cy="32" r="24" fill="url(#pandit_saffron_grad)" stroke="#FFD700" strokeWidth="2" className="animate-pulse" />
      
      {/* Sacred Vishnu Urdhva Pundra Tilak */}
      <path d="M26 14C26 22 28 30 32 34C36 30 38 22 38 14" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 18V32" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="32" cy="35" r="2" fill="#E53E3E"/>

      {/* Animated Pandit Ji Traditional Attire & Pagdi */}
      <g className="transition-transform duration-300 hover:scale-105">
        <path d="M18 48C18 41 23 37 32 37C41 37 46 41 46 48V52H18V48Z" fill="#FFF" opacity="0.95"/>
        <path d="M21 44C21 39 25 35 32 35C39 35 43 39 43 44" fill="#F48D08"/>
        <circle cx="32" cy="44" r="2.5" fill="#6f1d14"/>
      </g>

      {/* Gradients */}
      <defs>
        <linearGradient id="pandit_saffron_grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6f1d14"/>
          <stop offset="0.5" stopColor="#F48D08"/>
          <stop offset="1" stopColor="#C6922E"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AiAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'जय श्री विष्णु! जय फल्गु माते! 🙏\nमैं गया जी का प्रामाणिक "पंडित जी AI" हूँ। गोत्र संकल्प, पिंडदान तिथि, विष्णुपद मंदिर व पैकेज से जुड़ा कोई भी प्रश्न पूछें या माइक दबाकर बोलें।'
    }
  ]);

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
      if (typeof window === 'undefined') return;
      const isMobile = window.innerWidth < 640;
      const btnSize = isMobile ? 52 : 58;
      const x = window.innerWidth - btnSize - (isMobile ? 14 : 24);
      const y = window.innerHeight - btnSize - (isMobile ? 85 : 30);
      setPosition({ x, y });
    };

    updateDefaultPos();
    window.addEventListener('resize', updateDefaultPos);
    return () => window.removeEventListener('resize', updateDefaultPos);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatOpen]);

  // Close when clicking anywhere on the website
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN'; // Default to Hindi (India)

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputMessage(transcript);
            submitMessage(transcript);
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
  }, []);

  // Toggle Voice Input
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('आपके ब्राउज़र में वॉइस इनपुट सपोर्ट नहीं है। कृपया गूगल क्रोम या सफारी का उपयोग करें।');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech start error:', err);
      }
    }
  };

  // Text to Speech Readout
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      // Clean special characters and markdown stars
      const cleaned = text.replace(/[*#_~]/g, '').slice(0, 300);
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
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

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - dragRef.current.startX;
      const deltaY = moveEvent.clientY - dragRef.current.startY;

      if (Math.hypot(deltaX, deltaY) > 5) {
        dragRef.current.moved = true;
        setIsDragging(true);
        setIsOpen(false);
      }

      if (dragRef.current.moved) {
        const btnSize = 60;
        const newX = Math.max(10, Math.min(window.innerWidth - btnSize - 10, dragRef.current.originX + deltaX));
        const newY = Math.max(10, Math.min(window.innerHeight - btnSize - 10, dragRef.current.originY + deltaY));
        setPosition({ x: newX, y: newY });
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      setTimeout(() => setIsDragging(false), 50);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  // Live Groq AI / Local Shastra Submission
  const submitMessage = async (textToSend: string) => {
    const userText = textToSend.trim();
    if (!userText || isAILoading) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');
    setIsAILoading(true);

    try {
      const history = chatMessages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: userText }]
        })
      });

      const data = await res.json();
      const aiReply = data.reply || 'जय श्री विष्णु! 🙏 गया जी तीर्थ पुरोहित सहायता हेतु आप हमें सीधे कॉल (+91 7463055338) कर सकते हैं।';

      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      speakText(aiReply);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'जय श्री विष्णु! 🙏\nविष्णुपद मंदिर व पिंडदान पैकेज की त्वरित जानकारी हेतु आप हमें सीधे +91 7463055338 पर WhatsApp या कॉल कर सकते हैं।'
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

  // Intelligent Direction Calculation based on current dragged position
  const isLeftSide = position ? position.x < window.innerWidth / 2 : false;
  const isNearTop = position ? position.y < 350 : false;

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
                touchAction: 'none'
              }
            : undefined
        }
        className={`fixed z-50 transition-shadow ${isDragging ? 'cursor-grabbing opacity-90' : 'cursor-grab'}`}
        onMouseEnter={() => {
          if (!isDragging) {
            setIsOpen(true);
          }
        }}
      >
        <div className="relative">

          {/* 1. Expanded Quick Action Stack (Hover Triggered, Symmetrically Oriented) */}
          {isOpen && !isDragging && (
            <div
              className={`absolute flex flex-col gap-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
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
                <span>AI पितृ दोष जांच (Vedic Diagnostic)</span>
              </button>

              <Link
                href="/pre-booking"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#C6922E] text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all border border-amber-300/40 shrink-0 whitespace-nowrap"
              >
                <FileCheck2 className="w-4 h-4 text-amber-200" />
                <span>Pre-Book Pind Daan</span>
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
                <span>पंडित जी AI से पूछें (Voice & Chat)</span>
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
            title="Drag me anywhere or click for Pandit Ji AI"
            aria-label="Pandit Ji AI & Divine Services Widget"
          >
            {/* Active Online Indicator */}
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
                      <h4 className="font-serif font-bold text-sm text-amber-300">पंडित जी AI (Pandit Ji)</h4>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                        ⚡ Groq LPU 70B
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      गया जी तीर्थ पुरोहित • 24/7 वैदिक मार्गदर्शन
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
                  <span>पितृ दोष जांच (Vedic Calculator)</span>
                </button>

                <button
                  type="button"
                  onClick={() => submitMessage('पिंडदान पैकेज और दक्षिणा की जानकारी दीजिए')}
                  className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white text-[10px] font-medium shrink-0 border border-slate-700/60"
                >
                  पैकेज दक्षिणा
                </button>

                <button
                  type="button"
                  onClick={() => submitMessage('क्या पुत्री या महिला पिंडदान कर सकती है?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white text-[10px] font-medium shrink-0 border border-slate-700/60"
                >
                  महिला अधिकार
                </button>

                <button
                  type="button"
                  onClick={() => submitMessage('गया जी की 45 वेदियों का क्या महत्व है?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white text-[10px] font-medium shrink-0 border border-slate-700/60"
                >
                  45 वेदियाँ
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
                      <span>पंडित जी विचार कर रहे हैं...</span>
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
                  title={isListening ? 'सुन रहे हैं... (Listening)' : 'बोलकर पूछें (Tap to Speak)'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <input
                  type="text"
                  placeholder={isListening ? 'बोलिए, सुन रहे हैं...' : 'पंडित जी से पूछें (गोत्र, तिथि, दक्षिणा)...'}
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
