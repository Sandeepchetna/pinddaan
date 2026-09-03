'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider({ slides }: { slides: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto slide every 7 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Touch Swipe Handlers for Mobile Devices
  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    } else if (isRightSwipe) {
      setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    }
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section 
      className="relative w-full h-[78vh] sm:h-[85vh] min-h-[520px] sm:min-h-[620px] bg-black text-white overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
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
              className="w-full h-full object-cover opacity-50 sm:opacity-60" 
            />
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-10000 scale-105 opacity-50 sm:opacity-60"
              style={{ backgroundImage: `url("${slide.mediaUrl}")` }}
            />
          )}
          {/* Subtle responsive gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/95 via-black/75 sm:via-black/60 to-black/40 sm:to-transparent" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-12 sm:pb-0">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 py-1 px-3 sm:py-1.5 sm:px-4 rounded-full bg-amber-500/20 border border-amber-500/30 text-[#F48D08] text-[10px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <span>{currentSlide.badge || 'Official Gaya Ji Destination'}</span>
          </div>

          {/* Title - responsive font sizing so it never overflows or dominates */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.18] sm:leading-[1.12]">
            {currentSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal opacity-90">
            {currentSlide.subtitle}
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-3 sm:pt-4 w-full sm:w-auto">
            <Link 
              href={currentSlide.ctaLink || '/pre-booking'} 
              className="bg-[#F48D08] hover:bg-[#D97706] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
            >
              <span>{currentSlide.ctaLabel || 'Begin Your Sacred Journey'}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>

            {currentSlide.secondaryCtaLabel && (
              <Link 
                href={currentSlide.secondaryCtaLink || '/gaya-ji'} 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm transition-all backdrop-blur-sm text-center active:scale-95"
              >
                {currentSlide.secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Prev / Next Controls (Hidden on Mobile so they never cover text!) */}
      {slides.length > 1 && (
        <>
          <button 
            type="button"
            onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)}
            aria-label="Previous Slide"
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-[#F48D08] text-white items-center justify-center border border-white/20 transition-all backdrop-blur-sm hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button 
            type="button"
            onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
            aria-label="Next Slide"
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-[#F48D08] text-white items-center justify-center border border-white/20 transition-all backdrop-blur-sm hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Indicators with Mobile Navigation Dots & Mini Arrows */}
          <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/40 sm:bg-transparent px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 sm:border-transparent">
            {/* Mobile Mini Prev Arrow */}
            <button
              type="button"
              onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)}
              aria-label="Previous Slide"
              className="md:hidden text-white/70 hover:text-white p-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 sm:w-8 bg-[#F48D08]' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}

            {/* Mobile Mini Next Arrow */}
            <button
              type="button"
              onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
              aria-label="Next Slide"
              className="md:hidden text-white/70 hover:text-white p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

    </section>
  );
}
