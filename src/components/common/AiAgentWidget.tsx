'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone, Sparkles, X, Send, Flame } from 'lucide-react';
import Link from 'next/link';

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
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'जय श्री विष्णु! जय फल्गु माते! 🙏\nमैं गया जी का प्रामाणिक "पंडित जी AI" हूँ। गोत्र संकल्प, पिंडदान तिथि, विष्णुपद मंदिर व पैकेज से जुड़ा कोई भी प्रश्न पूछें।'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      let reply = 'जय श्री विष्णु! गया जी तीर्थ में पिंडदान से पितरों को मोक्ष प्राप्त होता है। अपने गोत्र संकल्प और तीर्थ पंडा आवंटन के लिए आप हमें सीधे +91 7463055338 पर कॉल कर सकते हैं।';
      const lower = userText.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('rate') || lower.includes('पैकेज')) {
        reply = 'प्रणाम! पिंडदान पैकेज की पूरी पारदर्शिता है:\n• 1-दिवसीय आवश्यक पिंडदान: ₹4,500\n• 3-दिवसीय सम्पूर्ण त्रि-स्थली यात्रा: ₹12,500\n• NRI लाइव स्ट्रीम पिंडदान: ₹8,500\nइनमें पंडा दक्षिणा, सम्पूर्ण सामग्री एवं वंश पंजीयन शामिल है।';
      } else if (lower.includes('reach') || lower.includes('train') || lower.includes('flight') || lower.includes('station') || lower.includes('airport')) {
        reply = 'गया जंक्शन (GAYA) रेलवे स्टेशन या गया/पटना एयरपोर्ट से हमारी एसी कैब आपको होटल और विष्णुपद मंदिर तक ले जाएगी।';
      } else if (lower.includes('vishnupad') || lower.includes('temple') || lower.includes('timing') || lower.includes('विष्णुपद')) {
        reply = 'विष्णुपद मंदिर प्रतिदिन प्रातः 5:00 बजे से रात्रि 9:00 बजे तक खुला रहता है। यहाँ भगवान विष्णु के 40 सेमी पवित्र चरण चिह्न विद्यमान हैं।';
      } else if (lower.includes('vedis') || lower.includes('45') || lower.includes('falgu') || lower.includes('akshayavat') || lower.includes('वेदी')) {
        reply = 'गया जी में कुल 45 पवित्र वेदियाँ हैं। मुख्य 3 वेदियाँ (त्रि-स्थली) हैं: 1. फल्गु नदी, 2. विष्णुपद मंदिर, 3. अक्षयवट वृक्ष।';
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3">
      
      {/* Expanded Quick Action Stack */}
      {isOpen && (
        <div className="flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          <Link
            href="/pre-booking"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#F48D08] text-white font-bold text-xs shadow-xl hover:scale-105 transition-all border border-white/20"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Pre-Book Pind Daan</span>
          </Link>

          <a
            href="tel:+917463055338"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0284C7] text-white font-bold text-xs shadow-xl hover:scale-105 transition-all border border-white/20"
          >
            <Phone className="w-4 h-4" />
            <span>Call +91 7463055338</span>
          </a>

          <a
            href="https://wa.me/917463055338?text=Pranam%21%20I%20want%20to%20know%20about%20Pind%20Daan%20Booking%20at%20Gaya%20Ji"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-xl hover:scale-105 transition-all border border-white/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Instant Chat</span>
          </a>

          <button
            onClick={() => {
              setChatOpen(true);
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#6f1d14] text-white font-bold text-xs shadow-xl hover:scale-105 transition-all border border-amber-400/40"
          >
            <Flame className="w-4 h-4 text-[#F48D08]" />
            <span>पंडित जी AI से पूछें (Ask Pandit Ji)</span>
          </button>

        </div>
      )}

      {/* Main Animated Pandit Ji & Vishnu Sudarshan Chakra Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#6f1d14] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-amber-400 relative group p-1"
        title="पंडित जी AI - Gaya Ji Vedic Teerth Assistant"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
        
        {isOpen ? (
          <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        ) : (
          <div className="flex items-center justify-center">
            <AnimatedPanditJiIcon className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
        )}
      </button>

      {/* Pandit Ji AI Chat Modal Window */}
      {chatOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-96 max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl border border-amber-900/20 overflow-hidden z-50 flex flex-col h-[460px] sm:h-[500px] animate-in fade-in zoom-in-95 duration-200">
          
          <div className="bg-gradient-to-r from-[#6f1d14] to-[#1a1410] text-white p-4 flex justify-between items-center border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100/10 border border-amber-400/40 flex items-center justify-center p-1">
                <AnimatedPanditJiIcon className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-amber-300">पंडित जी AI (Pandit Ji)</h4>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  गया जी तीर्थ गुरु • 24/7 वैदिक परामर्श
                </p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-gray-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF7F2] text-xs">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#F48D08] text-white rounded-tr-none font-medium'
                      : 'bg-white text-text-primary border border-amber-900/10 shadow-sm rounded-tl-none font-serif'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="पंडित जी से पूछें (गोत्र, तिथि, पैकेज)..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-amber-50/50 border border-amber-900/20 rounded-full px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:border-[#F48D08]"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#6f1d14] hover:bg-[#F48D08] text-white flex items-center justify-center shrink-0 shadow transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
