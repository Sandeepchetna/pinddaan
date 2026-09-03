import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding rich devotee pooja photos & video testimonials...");

  const testimonials = [
    {
      author: 'Rajesh & Chetna Sharma',
      city: 'Bengaluru',
      country: 'India',
      ritual: 'Annual Pitru Paksha Shradh at Vishnupad',
      content: 'We came from Bengaluru with our elderly mother. PindDaanWale arranged airport pickup, wheelchair inside Vishnupad Temple, and our family Panda verified our 4-generation Bahi-Khata records. The feeling of closure and spiritual satisfaction is priceless.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      poojaImage: '/images/pind_daan_vidhi.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      status: 'APPROVED'
    },
    {
      author: 'Sunita & Arvind Mukherjee',
      city: 'San Jose, California',
      country: 'USA',
      ritual: 'Remote Live 4K Pind Daan Stream',
      content: 'Living in the US, we could not travel to Gaya Ji this year. The team set up a private 4K live stream from Falgu Devghat. The Acharya chanted our exact gotra and ancestors names clearly. The sacred prasadam arrived at our California address in pristine condition.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      poojaImage: '/images/akshay_vat.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      status: 'APPROVED'
    },
    {
      author: 'Dr. Vikramaditya Verma & Family',
      city: 'Lucknow',
      country: 'India',
      ritual: '3-Day Complete Tri-Sthali Parikrama',
      content: 'Covered Vishnupad, Falgu, Akshayavat, Pretshila and Ramshila without a minute of confusion or stress. Fixed transparent dakshina, comfortable Innova Crysta throughout, and exceptional sattvic dining. 100% recommended for every devout Hindu family.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      poojaImage: '/images/gaya_vishnupad.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      status: 'APPROVED'
    }
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { author: t.author }
    });

    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: t
      });
      console.log(`Updated testimonial: ${t.author}`);
    } else {
      await prisma.testimonial.create({
        data: t
      });
      console.log(`Created testimonial: ${t.author}`);
    }
  }

  console.log("Testimonials seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding testimonials:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
