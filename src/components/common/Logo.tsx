import Link from 'next/link';

export default function Logo({ light = false, logoUrl }: { light?: boolean; logoUrl?: string }) {
  const imageSrc = logoUrl || '/Pind-Daan-Wale.svg';

  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
      {/* Official PindDaanWale Sacred Emblem - Fully Responsive */}
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 group-hover:scale-105 transition-transform duration-300">
        <img 
          src={imageSrc} 
          alt="PindDaanWale Sacred Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col leading-none">
        <span className={`text-lg sm:text-2xl md:text-3xl font-serif font-extrabold tracking-tight ${light ? 'text-white' : 'text-text-primary'}`}>
          PindDaanWale
        </span>
        <span className="text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-wider sm:tracking-widest text-[#F48D08] font-bold mt-0.5">
          The Gaya Ji Authority
        </span>
      </div>
    </Link>
  );
}
