import Link from 'next/link';

export default function Logo({ light = false, logoUrl }: { light?: boolean; logoUrl?: string }) {
  const imageSrc = logoUrl || '/Pind-Daan-Wale.svg';

  return (
    <Link href="/" className="flex items-center gap-3.5 group">
      {/* Official PindDaanWale Sacred Emblem - Prominent Size */}
      <div className="relative w-14 h-14 shrink-0 group-hover:scale-105 transition-transform duration-300">
        <img 
          src={imageSrc} 
          alt="PindDaanWale Sacred Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col">
        <span className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight ${light ? 'text-white' : 'text-text-primary'}`}>
          PindDaanWale
        </span>
        <span className="text-[11px] uppercase tracking-widest text-[#F48D08] font-bold -mt-0.5">
          The Gaya Ji Authority
        </span>
      </div>
    </Link>
  );
}
