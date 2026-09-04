import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { CITY_DATABASE } from '@/data/cityDatabase';

const db = prisma as any;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.pinddaanwale.com';

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/packages`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/packages/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pre-booking`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/pind-daan`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gaya-ji`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/sacred-places`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/knowledge-centre`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/travel-guide`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/faqs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/our-story`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 }
  ];

  // Dynamic city routes (Programmatic Local & Global SEO for 54+ cities)
  const cityRoutes: MetadataRoute.Sitemap = Object.keys(CITY_DATABASE).map(slug => ({
    url: `${baseUrl}/pind-daan/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  // Dynamic Packages routes
  let packageRoutes: MetadataRoute.Sitemap = [];
  try {
    if (db.ritualPackage) {
      const pkgs = await db.ritualPackage.findMany({ select: { slug: true, createdAt: true } });
      packageRoutes = pkgs.map((pkg: any) => ({
        url: `${baseUrl}/packages/${pkg.slug}`,
        lastModified: pkg.createdAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.85
      }));
    }
  } catch (e) {}

  // Dynamic Sacred Places routes (All 49 Sacred Vedis)
  let placeRoutes: MetadataRoute.Sitemap = [];
  try {
    if (db.sacredPlace) {
      const places = await db.sacredPlace.findMany({ select: { slug: true, createdAt: true } });
      if (places && places.length > 0) {
        placeRoutes = places.map((pl: any) => ({
          url: `${baseUrl}/sacred-places/${pl.slug}`,
          lastModified: pl.createdAt || new Date(),
          changeFrequency: 'monthly',
          priority: 0.8
        }));
      }
    }
  } catch (e) {}

  if (placeRoutes.length === 0) {
    const { SACRED_VEDIS_MASTER } = await import('@/data/sacredVedisData');
    placeRoutes = SACRED_VEDIS_MASTER.map((pl) => ({
      url: `${baseUrl}/sacred-places/${pl.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }));
  }

  // Dynamic Blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    if (db.article) {
      const articles = await db.article.findMany({ select: { slug: true, updatedAt: true } });
      blogRoutes = articles.map((art: any) => ({
        url: `${baseUrl}/blog/${art.slug}`,
        lastModified: art.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.75
      }));
    }
  } catch (e) {}

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...packageRoutes,
    ...placeRoutes,
    ...blogRoutes
  ];
}
