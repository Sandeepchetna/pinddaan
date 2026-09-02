'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider({ slides }: { slides: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 7 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-black text-white overflow-hidden">
      
      {/* Media Background (Image or Video) */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id || idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {slide.mediaType === 'VIDEO' ? (
            <video 
              src={slide.mediaUrl} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-60" 
            />
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-10000 scale-105 opacity-60"
              style={{ backgroundImage: `url("${slide.mediaUrl}")` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center space-y-6">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-amber-500/20 border border-amber-500/30 text-[#F48D08] text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <span>{currentSlide.badge || 'Official Gaya Ji Destination'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white leading-[1.1]">
            {currentSlide.title}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
            {currentSlide.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href={currentSlide.ctaLink || '/pre-booking'} 
              className="bg-[#F48D08] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-bold text-sm transition-colors shadow-lg flex items-center gap-2"
            >
              <span>{currentSlide.ctaLabel || 'Begin Your Sacred Journey'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {currentSlide.secondaryCtaLabel && (
              <Link 
                href={currentSlide.secondaryCtaLink || '/gaya-ji'} 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-bold text-sm transition-colors backdrop-blur-sm"
              >
                {currentSlide.secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Slider Prev / Next Controls */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-[#F48D08] text-white flex items-center justify-center border border-white/20 transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-[#F48D08] text-white flex items-center justify-center border border-white/20 transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-[#F48D08]' : 'w-2 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}

    </section>
  );
}
