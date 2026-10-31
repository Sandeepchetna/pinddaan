import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Gaya Ji Packages Update ---');

  // 1. Only Pind Daan Packages (Pure Vedic Rituals)
  const onlyPindDaanPackages = [
    {
      slug: 'uttam-pind-daan',
      title: 'Uttam Pind Daan',
      hindiTitle: 'उत्तम पिंडदान (7 कुल उद्धार)',
      duration: '3–3.5 Hours',
      tier: 'PUJA_ONLY',
      priceINR: 11000,
      priceUSD: 140,
      goldPriceINR: 11000,
      goldPriceUSD: 140,
      badge: 'SARVA SHRESTHA VIDHI',
      shortDesc: 'The most comprehensive Vedic ritual featuring Kalash Puja, 7 Kul Ka Pind Daan, and 5 Vastra & Patra Daan at Vishnupad & Falgu River.',
      inclusions: [
        'Kalash Puja',
        '7 Kul Ka Pind Daan',
        '5 Vastra and Patra Daan',
        'Required Puja Samagri Included',
        "Pandit Ji's Charges (Dakshina) Included"
      ].join('\n'),
      goldInclusions: [
        'Kalash Puja',
        '7 Kul Ka Pind Daan',
        '5 Vastra and Patra Daan',
        'Required Puja Samagri Included',
        "Pandit Ji's Charges (Dakshina) Included",
        'Senior Lineage Teerth Purohit (Gaya Panda)'
      ].join('\n'),
      exclusions: [
        'Brahmin Bhojan (Charged Separately)',
        'Additional Brahmin Dakshina (Charged Separately)',
        'Any additional rituals not mentioned in selected package (Charged Separately)',
        'Hotel Stay & Cab Transfers (Pure Ritual Only)'
      ].join('\n'),
      vedisCovered: 'Falgu Devghat, Vishnupad Temple, Akshayavat',
      panditType: 'Verified Gaya Panda',
      foodIncluded: 'Not Included (Brahmin Bhojan Charged Separately)',
      image: '/images/gaya_vishnupad.jpg'
    },
    {
      slug: 'madhyam-pind-daan',
      title: 'Madhyam Pind Daan',
      hindiTitle: 'मध्यम पिंडदान (वैदिक विधि)',
      duration: '2–2.5 Hours',
      tier: 'PUJA_ONLY',
      priceINR: 7500,
      priceUSD: 95,
      goldPriceINR: 7500,
      goldPriceUSD: 95,
      badge: 'MOST POPULAR VIDHI',
      shortDesc: 'Traditional Vedic Gaya Ji Pind Daan with Kalash Puja, complete Pind Daan Vidhi, and 3 Vastra & Patra Daan for ancestral peace.',
      inclusions: [
        'Kalash Puja',
        'Pind Daan Vidhi',
        '3 Vastra and Patra Daan',
        'Required Puja Samagri Included',
        "Pandit Ji's Charges (Dakshina) Included"
      ].join('\n'),
      goldInclusions: [
        'Kalash Puja',
        'Pind Daan Vidhi',
        '3 Vastra and Patra Daan',
        'Required Puja Samagri Included',
        "Pandit Ji's Charges (Dakshina) Included",
        'Senior Lineage Teerth Purohit Guidance'
      ].join('\n'),
      exclusions: [
        'Brahmin Bhojan (Charged Separately)',
        'Additional Brahmin Dakshina (Charged Separately)',
        'Any additional rituals not mentioned in selected package (Charged Separately)',
        'Hotel Stay & Cab Transfers (Pure Ritual Only)'
      ].join('\n'),
      vedisCovered: 'Falgu Devghat, Vishnupad Temple',
      panditType: 'Verified Gaya Panda',
      foodIncluded: 'Not Included (Brahmin Bhojan Charged Separately)',
      image: '/images/pind_daan_vidhi.jpg'
    },
    {
      slug: 'kanishtha-pind-daan',
      title: 'Kanishtha Pind Daan',
      hindiTitle: 'कनिष्ठ पिंडदान (सरल विधि)',
      duration: '2 Hours',
      tier: 'PUJA_ONLY',
      priceINR: 4500,
      priceUSD: 60,
      goldPriceINR: 4500,
      goldPriceUSD: 60,
      badge: 'SARAL VEDIC VIDHI',
      shortDesc: 'Essential Vedic Pind Daan Vidhi with 2 Thali Daan performed under authentic Gaya Panda guidance at Vishnupad & Falgu.',
      inclusions: [
        'Pind Daan Vidhi',
        '2 Thali Daan',
        'Required Puja Samagri Included',
        "Pandit Ji's Charges (Dakshina) Included"
      ].join('\n'),
      goldInclusions: [
        'Pind Daan Vidhi',
        '2 Thali Daan',
        'Required Puja Samagri Included',
        "Pandit Ji's Charges (Dakshina) Included"
      ].join('\n'),
      exclusions: [
        'Brahmin Bhojan (Charged Separately)',
        'Additional Brahmin Dakshina (Charged Separately)',
        'Any additional rituals not mentioned in selected package (Charged Separately)',
        'Hotel Stay & Cab Transfers (Pure Ritual Only)'
      ].join('\n'),
      vedisCovered: 'Falgu Devghat, Vishnupad Temple',
      panditType: 'Verified Gaya Panda',
      foodIncluded: 'Not Included (Brahmin Bhojan Charged Separately)',
      image: '/images/akshay_vat.jpg'
    },
    {
      slug: 'shradh-pind-daan',
      title: 'Shradh Pind Daan',
      hindiTitle: 'श्राद्ध पिंडदान (मूल विधि)',
      duration: '1–1.5 Hours',
      tier: 'PUJA_ONLY',
      priceINR: 3100,
      priceUSD: 40,
      goldPriceINR: 3100,
      goldPriceUSD: 40,
      badge: 'CORE SHRADDHA VIDHI',
      shortDesc: 'Focused Vedic Pind Daan Vidhi only at holy Falgu River and Vishnupad with authentic gotra sankalp.',
      inclusions: [
        'Pind Daan Vidhi Only',
        'Required Puja Samagri Included',
        "Pandit Ji's Charges (Dakshina) Included"
      ].join('\n'),
      goldInclusions: [
        'Pind Daan Vidhi Only',
        'Required Puja Samagri Included',
        "Pandit Ji's Charges (Dakshina) Included"
      ].join('\n'),
      exclusions: [
        'Brahmin Bhojan (Charged Separately)',
        'Additional Brahmin Dakshina (Charged Separately)',
        'Any additional rituals not mentioned in selected package (Charged Separately)',
        'Hotel Stay & Cab Transfers (Pure Ritual Only)'
      ].join('\n'),
      vedisCovered: 'Falgu Devghat, Vishnupad Temple',
      panditType: 'Verified Gaya Panda',
      foodIncluded: 'Not Included (Brahmin Bhojan Charged Separately)',
      image: '/images/gaya_drone.jpg'
    }
  ];

  for (const pkg of onlyPindDaanPackages) {
    const upserted = await prisma.ritualPackage.upsert({
      where: { slug: pkg.slug },
      update: {
        title: pkg.title,
        hindiTitle: pkg.hindiTitle,
        duration: pkg.duration,
        tier: pkg.tier,
        priceINR: pkg.priceINR,
        priceUSD: pkg.priceUSD,
        goldPriceINR: pkg.goldPriceINR,
        goldPriceUSD: pkg.goldPriceUSD,
        badge: pkg.badge,
        shortDesc: pkg.shortDesc,
        inclusions: pkg.inclusions,
        goldInclusions: pkg.goldInclusions,
        exclusions: pkg.exclusions,
        vedisCovered: pkg.vedisCovered,
        panditType: pkg.panditType,
        foodIncluded: pkg.foodIncluded,
        image: pkg.image
      },
      create: {
        slug: pkg.slug,
        title: pkg.title,
        hindiTitle: pkg.hindiTitle,
        duration: pkg.duration,
        tier: pkg.tier,
        priceINR: pkg.priceINR,
        priceUSD: pkg.priceUSD,
        goldPriceINR: pkg.goldPriceINR,
        goldPriceUSD: pkg.goldPriceUSD,
        badge: pkg.badge,
        shortDesc: pkg.shortDesc,
        inclusions: pkg.inclusions,
        goldInclusions: pkg.goldInclusions,
        exclusions: pkg.exclusions,
        vedisCovered: pkg.vedisCovered,
        panditType: pkg.panditType,
        foodIncluded: pkg.foodIncluded,
        image: pkg.image
      }
    });
    console.log(`✅ Upserted Only Pind Daan: ${upserted.title} (₹${upserted.priceINR}) [${upserted.slug}]`);
  }

  // 2. Update Gaya Ji 1-Day Pind Daan (Price reduction: Gold Non-AC 7499, AC 8499, Platinum 12499)
  const oneDayPkg = await prisma.ritualPackage.findFirst({
    where: {
      OR: [
        { slug: 'gaya-ji-1-day-pind-daan' },
        { id: 'cmtk2km8j0014d9g3kfc9n6hf' }
      ]
    }
  });

  if (oneDayPkg) {
    const updatedOneDay = await prisma.ritualPackage.update({
      where: { id: oneDayPkg.id },
      data: {
        priceINR: 7499,
        goldPriceINR: 12499,
        duration: '1 Day (4 to 6 Hours)',
        badge: 'NEW REDUCED RATE',
        shortDesc: 'Single-day layover rites at Falgu River & Vishnupad. Gold Plan: Non-AC Room ₹7,499 / AC Room ₹8,499. Platinum VIP: Deluxe Hotel & AC Cab ₹12,499.',
        inclusions: [
          'Certified Gaya Teerth Purohit',
          'Ritual at Falgu Ghat & Vishnupad Temple',
          'Complete Organic Samagri Kit (Jau, Tila, Ghee)',
          '2-Person Private Room Stay (Non-AC ₹7,499 / AC Room ₹8,499) & Pure Satvik Food',
          'Gaya Ji Railway Station | Airport Pickup & Drop (Auto)',
          'Puja Samagri and Pandit Dakshina Included'
        ].join('\n'),
        goldInclusions: [
          'Certified Senior Gaya Teerth Purohit',
          'Ritual at Falgu Ghat & Vishnupad Temple',
          'Complete Organic Samagri Kit (Jau, Tila, Ghee)',
          'AC Deluxe to 4-Star Hotel & Resort 2-Person Private Room Stay & Pure Satvik Food',
          'Gaya Ji Railway Station | Airport Pickup & Drop (Private AC Cab)',
          'Puja Samagri and Pandit Dakshina Included'
        ].join('\n')
      }
    });
    console.log(`✅ Updated 1-Day Package: ${updatedOneDay.title} -> Gold ₹${updatedOneDay.priceINR} (Non-AC) / ₹8,499 (AC) | Platinum ₹${updatedOneDay.goldPriceINR}`);
  } else {
    console.log('⚠️ 1-Day package not found by slug/id');
  }

  // 3. Keep Tripindi and Narayan Bali same
  console.log('✅ Tripindi Shradh and Narayan Bali preserved unchanged.');

  const allPkgs = await prisma.ritualPackage.findMany({ select: { id: true, slug: true, title: true, priceINR: true, goldPriceINR: true, duration: true } });
  console.log('\n--- Current Database Packages (' + allPkgs.length + ') ---');
  console.table(allPkgs);

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
