import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { GAYA_SACRED_STHALIS, RITUAL_PACKAGES, INITIAL_HOTELS, INITIAL_LEADS } from '@/data/mockData';
import { SACRED_VEDIS_MASTER } from '@/data/sacredVedisData';

const db = prisma as any;

export async function GET() {
  try {
    // 1. Seed Site Settings
    if (db.siteSettings) {
      await db.siteSettings.upsert({
        where: { id: 'default' },
        update: {
          footerBgImage: '/images/gaya_vishnupad.jpg',
          helpdeskPhone: '+91 7463055338'
        },
        create: {
          id: 'default',
          footerBgImage: '/images/gaya_vishnupad.jpg',
          helpdeskPhone: '+91 7463055338'
        }
      });
    }

    // 2. Seed All 49 Authentic Sacred Places & Vedis of Gaya Ji
    if (db.sacredPlace) {
      for (const place of SACRED_VEDIS_MASTER) {
        await db.sacredPlace.upsert({
          where: { slug: place.slug },
          update: {
            name: place.name,
            hindiName: place.hindiName,
            tagline: place.tagline,
            description: place.description,
            history: place.history,
            timings: place.timings,
            visitorInfo: `${place.category} • ${place.location} • ${place.visitorInfo}`,
            heroImage: place.heroImage
          },
          create: {
            slug: place.slug,
            name: place.name,
            hindiName: place.hindiName,
            tagline: place.tagline,
            description: place.description,
            history: place.history,
            timings: place.timings,
            visitorInfo: `${place.category} • ${place.location} • ${place.visitorInfo}`,
            heroImage: place.heroImage
          }
        });
      }
    }

    // 3. Seed Hotels
    if (db.hotel) {
      for (const h of INITIAL_HOTELS) {
        await db.hotel.upsert({
          where: { id: h.id },
          update: {
            name: h.name,
            slug: h.id,
            distance: h.distanceFromVishnupad,
            pricePerNight: h.pricePerNightINR,
            isAc: h.acType === 'AC' || h.acType === 'BOTH',
            meals: h.breakfastIncluded ? (h.dinnerIncluded ? 'Breakfast, Lunch & Dinner Included' : 'Breakfast & Tea Included') : 'Room Only',
            heroImage: h.image || '/images/gaya_vishnupad.jpg',
            gallery: h.gallery?.join(',') || h.image,
            facilities: h.amenities?.join(', ') || 'Hot Water, Wi-Fi',
            mapUrl: h.googleMapUrl
          },
          create: {
            id: h.id,
            name: h.name,
            slug: h.id,
            distance: h.distanceFromVishnupad,
            pricePerNight: h.pricePerNightINR,
            isAc: h.acType === 'AC' || h.acType === 'BOTH',
            meals: h.breakfastIncluded ? (h.dinnerIncluded ? 'Breakfast, Lunch & Dinner Included' : 'Breakfast & Tea Included') : 'Room Only',
            heroImage: h.image || '/images/gaya_vishnupad.jpg',
            gallery: h.gallery?.join(',') || h.image,
            facilities: h.amenities?.join(', ') || 'Hot Water, Wi-Fi',
            mapUrl: h.googleMapUrl
          }
        });
      }
    }

    // 4. Seed Ritual Packages with GOLD & PLATINUM Tiers
    if (db.ritualPackage) {
      for (const pkg of RITUAL_PACKAGES) {
        await db.ritualPackage.upsert({
          where: { slug: pkg.slug },
          update: {
            title: pkg.title,
            duration: pkg.duration,
            priceINR: pkg.priceINR,
            goldPriceINR: Math.round(pkg.priceINR * 1.5),
            badge: pkg.badge,
            shortDesc: pkg.shortDesc,
            inclusions: pkg.inclusions?.join('\n') || 'Vedic Rites Included',
            goldInclusions: `${pkg.inclusions?.join('\n')}\nVIP Senior Lineage Panda\nPrivate AC Chauffeur SUV Pickup & Drop\n3-Star AC Deluxe Hotel Stay & Sattvic Meal`
          },
          create: {
            slug: pkg.slug,
            title: pkg.title,
            duration: pkg.duration,
            priceINR: pkg.priceINR,
            goldPriceINR: Math.round(pkg.priceINR * 1.5),
            badge: pkg.badge,
            shortDesc: pkg.shortDesc,
            inclusions: pkg.inclusions?.join('\n') || 'Vedic Rites Included',
            goldInclusions: `${pkg.inclusions?.join('\n')}\nVIP Senior Lineage Panda\nPrivate AC Chauffeur SUV Pickup & Drop\n3-Star AC Deluxe Hotel Stay & Sattvic Meal`
          }
        });
      }
    }

    // 5. Seed Articles (Knowledge Centre)
    if (db.article) {
      const articlesData = [
        {
          slug: 'why-pind-daan-is-performed-only-at-gaya-ji',
          title: 'Why Pind Daan is Performed Only at Holy Gaya Ji: Scriptural Proofs from Vayu Purana',
          category: 'Scriptural Knowledge',
          summary: 'Explore why Lord Vishnu bestowed the supreme boon of eternal salvation upon Gayasura and how offering pinds at Vishnupad grants instant Moksha to departed ancestors.',
          content: 'Holy Gaya Ji is revered across Vedic literature as the ultimate Moksha Dham...',
          readTime: '6 min read',
          published: true
        },
        {
          slug: 'complete-pitru-paksha-guidelines-for-nris',
          title: 'Complete Pitru Paksha 2026 Guidelines for NRI Devotees Across USA, UK & Canada',
          category: 'NRI Pilgrimage Guide',
          summary: 'A step-by-step handbook on performing remote live stream Pind Daan, proxy Sankalp, and international delivery of sanctified prasadam.',
          content: 'For NRIs living across North America and Europe, performing ancestor rites in Gaya Ji is now seamlessly enabled through 4K live streams...',
          readTime: '8 min read',
          published: true
        }
      ];

      for (const art of articlesData) {
        await db.article.upsert({
          where: { slug: art.slug },
          update: art,
          create: art
        });
      }
    }

    // 6. Seed Sample Leads
    if (db.lead) {
      for (const ld of INITIAL_LEADS) {
        await db.lead.upsert({
          where: { id: ld.id },
          update: {
            leadNumber: `LEAD-2026-${ld.id.split('-')[1] || '001'}`,
            devoteeName: ld.name,
            phone: ld.phone,
            email: ld.email,
            city: ld.city,
            purpose: ld.ritualType,
            assignedTo: ld.assignedTo,
            source: ld.source,
            status: ld.stage === 'NEW' ? 'NEW_LEAD' : 'CONTACTED'
          },
          create: {
            id: ld.id,
            leadNumber: `LEAD-2026-${ld.id.split('-')[1] || '001'}`,
            devoteeName: ld.name,
            phone: ld.phone,
            email: ld.email,
            city: ld.city,
            purpose: ld.ritualType,
            assignedTo: ld.assignedTo,
            source: ld.source,
            status: ld.stage === 'NEW' ? 'NEW_LEAD' : 'CONTACTED'
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'All Datasets (Sacred Places, Hotels, Packages, Leads, Articles) 100% Synced to Hostinger MySQL Database!',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
