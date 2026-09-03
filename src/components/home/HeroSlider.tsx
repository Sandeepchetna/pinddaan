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
              className="w-full h-full object-cover opacity-90 sm:opacity-95" 
            />
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center sm:bg-[center_top] transition-transform duration-10000 scale-105 opacity-90 sm:opacity-95"
              style={{ backgroundImage: `url("${slide.mediaUrl}")` }}
            />
          )}
          
          {/* Smart directional gradient: strong contrast on left for white text, crystal clear sunlight on right */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 via-45% to-transparent pointer-events-none" />
          
          {/* Mobile gradient from bottom to top */}
          <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 pointer-events-none" />
          
          {/* Subtle bottom fade into next section */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-[1400px] mx-auto h-full px-6 sm:px-10 lg:px-12 flex flex-col justify-center pb-12 sm:pb-0">
        <div className="max-w-[760px] space-y-4 sm:space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-black/50 border border-amber-400/30 text-amber-300 text-[11px] sm:text-xs font-body font-semibold tracking-wider backdrop-blur-md shadow-md">
            <span>{currentSlide.badge || 'GAYA JI SACRED PILGRIMAGE • VISHNUPAD TEERTH'}</span>
          </div>

          {/* Hero H1 - Cormorant Garamond with Signature White + Gold Gradient Accent */}
          <h1 className="text-[38px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-display font-bold tracking-[-0.02em] leading-[1.08] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            {(() => {
              const title = currentSlide.title || '';
              const splitKeywords = [' At ', ' at ', ' In ', ' in ', ' & ', ' For ', ' for '];
              for (const kw of splitKeywords) {
                if (title.includes(kw)) {
                  const idx = title.indexOf(kw);
                  const firstPart = title.substring(0, idx + kw.length).trim();
                  const secondPart = title.substring(idx + kw.length).trim();
                  return (
                    <>
                      <span className="block text-white">{firstPart}</span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#F48D08] to-amber-300">
                        {secondPart}
                      </span>
                    </>
                  );
                }
              }
              const words = title.split(' ');
              if (words.length > 3) {
                const mid = Math.ceil(words.length / 2);
                return (
                  <>
                    <span className="block text-white">{words.slice(0, mid).join(' ')}</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#F48D08] to-amber-300">
                      {words.slice(mid).join(' ')}
                    </span>
                  </>
                );
              }
              return (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#F48D08] to-amber-300">
                  {title}
                </span>
              );
            })()}
          </h1>

          {/* Hero Subtitle - Plus Jakarta Sans 22px Desktop, 1.75 Line Height, Max Width 680px */}
          <p className="text-gray-100 text-base sm:text-lg md:text-[22px] font-body font-normal leading-[1.65] max-w-[680px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
            {currentSlide.subtitle}
          </p>

          {/* Call-to-Action Buttons - Flat Luxury, 16px Radius, Plus Jakarta Sans 600 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
            <Link 
              href={currentSlide.ctaLink || '/pre-booking'} 
              className="bg-[#C6922E] hover:bg-[#A97718] text-white px-7 sm:px-9 py-4 rounded-[16px] font-body font-semibold text-base transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <span>{currentSlide.ctaLabel || 'Begin Sacred Journey'}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>

            {currentSlide.secondaryCtaLabel && (
              <Link 
                href={currentSlide.secondaryCtaLink || '/gaya-ji'} 
                className="bg-black/35 hover:bg-black/55 text-white border border-white/30 hover:border-white/50 px-7 sm:px-9 py-4 rounded-[16px] font-body font-semibold text-base transition-all backdrop-blur-md text-center active:scale-95"
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
