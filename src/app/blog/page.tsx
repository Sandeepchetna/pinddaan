import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog & Knowledge Library | Authentic Gaya Ji Pind Daan Guide | PindDaanWale',
  description: 'Authoritative Vedic scriptures, Pind Daan rituals, Pitru Paksha dates, Tithi calculations, and pilgrim travel guides for Gaya Ji.',
};

const db = prisma as any;

export default async function BlogPage() {
  let articles: any[] = [];
  try {
    if (db.article) {
      articles = await db.article.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
      });
    }
  } catch (err) {
    console.error('Error fetching articles:', err);
  }

  // Fallback if DB query fails
  if (!articles || articles.length === 0) {
    articles = [
      {
        slug: 'why-pind-daan-is-performed-only-at-gaya-ji',
        title: 'Why is Pind Daan Performed Only at Gaya Ji? The Story of Gayasur & Vayu Purana',
        category: 'Sacred Scriptures',
        summary: 'Discover the profound story from the Garuda Purana & Vayu Purana explaining why Lord Vishnu granted Gayasur the supreme boon that anyone offering Pind Daan here achieves instant salvation.',
        readTime: '6 min read',
        image: '/images/gaya_vishnupad.jpg',
        createdAt: new Date('2026-08-15')
      },
      {
        slug: 'complete-pitru-paksha-guidelines-for-nris',
        title: 'Complete Pitru Paksha 2026 Guidelines for NRIs: Dates, Tithis & Live Rituals',
        category: 'Pilgrim Guide',
        summary: 'A step-by-step authoritative guide for non-resident Indians living in USA, UK, Canada & Australia planning Pind Daan at Vishnupad Temple or requesting remote live stream rites.',
        readTime: '8 min read',
        image: '/images/hero_cinematic.jpg',
        createdAt: new Date('2026-08-10')
      },
      {
        slug: 'tri-sthali-pind-daan-gaya-kashi-prayag',
        title: 'What is Tri-Sthali Pind Daan? The Holy Pilgrimage Triad of Prayagraj, Kashi & Gaya Ji',
        category: 'Vedic Vidhi',
        summary: 'An authoritative breakdown of the sacred Hindu ancestral pilgrimage triad: why Pind Daan at Gaya Ji completes the spiritual journey initiated at Prayagraj and Varanasi.',
        readTime: '7 min read',
        image: '/images/pind_daan_vidhi.jpg',
        createdAt: new Date('2026-08-05')
      },
      {
        slug: 'akshayavat-and-falgu-river-significance',
        title: 'The Mystery of Falgu River & The Immortal Akshayavat: Mata Sita’s Sacred Blessing',
        category: 'Temple Sanctity',
        summary: 'Explore why Falgu River flows underground as Antahsalila and how the immortal Akshayavat tree stood as the sole truthful witness to Mata Sita’s sand pinda offering to King Dasharatha.',
        readTime: '5 min read',
        image: '/images/akshay_vat.jpg',
        createdAt: new Date('2026-08-01')
      }
    ];
  }

  const featured = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-temple-ivory text-text-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F48D08]">Vedic Knowledge Desk</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#6f1d14]">Gaya Ji Knowledge Centre & Blog</h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
            Authentic ancestral rites guidance grounded directly in the Garuda Purana, Vayu Purana, and traditional Vishnupad Temple lineages.
          </p>
        </div>

        {/* Featured Article */}
        {featured && (
          <div className="bg-white rounded-3xl border border-amber-900/10 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 hover:shadow-xl transition-shadow">
            <div className="h-72 lg:h-auto relative overflow-hidden">
              <img 
                src={featured.image || '/images/gaya_vishnupad.jpg'} 
                alt={featured.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
              <span className="absolute top-4 left-4 bg-[#6f1d14]/90 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Featured Guide
              </span>
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block bg-[#F48D08]/15 text-[#F48D08] border border-[#F48D08]/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                  {featured.category || 'Sacred History'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary leading-tight hover:text-[#F48D08] transition-colors">
                  <Link href={`/blog/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">{featured.summary}</p>
              </div>

              <div className="flex justify-between items-center text-xs text-text-secondary border-t border-gray-100 pt-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#F48D08]" /> {new Date(featured.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#F48D08]" /> {featured.readTime || '6 min read'}</span>
                </div>
                <Link href={`/blog/${featured.slug}`} className="text-[#F48D08] hover:text-[#D97706] font-bold flex items-center gap-1">
                  Read Full Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gridArticles.map((art: any) => (
            <div key={art.slug} className="bg-white rounded-3xl border border-amber-900/10 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img 
                    src={art.image || '/images/hero_cinematic.jpg'} 
                    alt={art.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
                    {art.category || 'Vedic Guidance'}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif font-bold text-lg text-text-primary group-hover:text-[#F48D08] transition-colors line-clamp-2">
                    <Link href={`/blog/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>
                  <p className="text-text-secondary text-xs line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex justify-between items-center text-xs text-text-secondary border-t border-gray-50 mt-4">
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-[#F48D08]" /> {art.readTime || '5 min read'}
                </div>
                <Link href={`/blog/${art.slug}`} className="text-[#F48D08] font-bold flex items-center gap-1 hover:translate-x-0.5 transition-transform">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
