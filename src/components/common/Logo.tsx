import Link from 'next/link';

export default function Logo({ light = false, logoUrl }: { light?: boolean; logoUrl?: string }) {
  const imageSrc = logoUrl || '/Pind-Daan-Wale.svg';

  return (
    <Link 
      href="/" 
      className="flex items-center gap-3 sm:gap-3.5 group shrink-0 py-1 overflow-visible notranslate"
      translate="no"
    >
      {/* Official PindDaanWale Sacred Emblem - Prominently Scaled Emblem */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] lg:w-[78px] lg:h-[78px] shrink-0 group-hover:scale-105 transition-transform duration-300">
        <img 
          src={imageSrc} 
          alt="PindDaanWale Sacred Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col justify-center overflow-visible notranslate" translate="no">
        {/* Brand Wordmark - Kept at Previous Classic Size */}
        <div 
          className="flex items-baseline font-display overflow-visible pt-1 pb-0.5 leading-[1.3] notranslate"
          translate="no"
        >
          <span 
            className={`text-2xl sm:text-3xl md:text-[32px] font-semibold tracking-[-0.01em] inline-block py-0.5 notranslate ${
              light
                ? 'text-white'
                : 'bg-gradient-to-r from-[#2B2118] via-[#7B4E13] to-[#C6922E] bg-clip-text text-transparent'
            }`}
            translate="no"
          >
            Pind
          </span>
          <span 
            className={`text-2xl sm:text-3xl md:text-[32px] font-medium tracking-[-0.025em] ml-[0.5px] inline-block py-0.5 notranslate ${
              light
                ? 'bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-[#C6922E] via-[#D8A743] to-[#8B5A19] bg-clip-text text-transparent'
            }`}
            translate="no"
          >
            DaanWale
          </span>
        </div>
        <span 
          className="text-[9px] sm:text-[10.5px] tracking-[0.15em] text-[#C6922E] font-body font-medium leading-normal notranslate"
          translate="no"
        >
          Sacred. Trusted. Complete.
        </span>
      </div>
    </Link>
  );
}
