import React from 'react';

interface SchemaMarkupProps {
  siteSettings?: any;
}

export default function SchemaMarkup({ siteSettings }: SchemaMarkupProps) {
  const companyName = siteSettings?.companyName || 'PindDaanWale';
  const logoUrl = siteSettings?.logoUrl || 'https://www.pinddaanwale.com/Pind-Daan-Wale.svg';
  const phone = siteSettings?.helpdeskPhone || '+91 7463055338';
  const email = siteSettings?.email || 'support@pinddaanwale.com';
  const address = siteSettings?.address || 'Assam Bhawan Yatri Niwash, Gaya, Bihar 823001';
  const latitude = siteSettings?.latitude || '24.7788';
  const longitude = siteSettings?.longitude || '85.0084';

  // 1. Organization & Travel Agency Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'ReligiousOrganization'],
    '@id': 'https://www.pinddaanwale.com/#organization',
    'name': companyName,
    'alternateName': [
      'PindDaanWale Gaya Ji',
      'Pind Daan Wale',
      'गया जी पिंडदान वाले',
      'Gaya Ji Pilgrimage Authority'
    ],
    'url': 'https://www.pinddaanwale.com',
    'logo': logoUrl,
    'image': 'https://www.pinddaanwale.com/images/gaya_vishnupad.jpg',
    'telephone': phone,
    'email': email,
    'priceRange': '₹9449 - ₹21449',
    'currenciesAccepted': 'INR, USD, GBP, EUR, CAD, AUD, SGD',
    'paymentAccepted': 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Assam Bhawan Yatri Niwash',
      'addressLocality': 'Gaya',
      'addressRegion': 'Bihar',
      'postalCode': '823001',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': latitude,
      'longitude': longitude
    },
    'hasMap': 'https://maps.google.com/?q=Vishnupad+Temple+Gaya',
    'areaServed': [
      { '@type': 'Country', 'name': 'India' },
      { '@type': 'Country', 'name': 'United States' },
      { '@type': 'Country', 'name': 'United Kingdom' },
      { '@type': 'Country', 'name': 'Canada' },
      { '@type': 'Country', 'name': 'Australia' },
      { '@type': 'Country', 'name': 'Singapore' },
      { '@type': 'Country', 'name': 'United Arab Emirates' }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '2480',
      'bestRating': '5',
      'worstRating': '1'
    },
    'knowsAbout': [
      'Pind Daan Gaya Ji',
      'Pitru Paksha Mahasangam',
      'Vishnupad Temple Shradh',
      'Falgu River Gotra Tarpan',
      'Akshayavat Pind Daan',
      'Tripindi Shradh',
      'Narayan Bali Puja',
      'Vedic Panchang Muhurat',
      'Garuda Purana Vidhi'
    ],
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '05:00',
      'closes': '21:00'
    },
    'sameAs': [
      'https://www.facebook.com/pinddaanwale',
      'https://www.instagram.com/pinddaan_wale',
      'https://www.youtube.com/@PindDaanWale'
    ]
  };

  // 2. WebSite Schema with Sitelinks Searchbox
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.pinddaanwale.com/#website',
    'url': 'https://www.pinddaanwale.com',
    'name': 'PindDaanWale',
    'description': 'Sacred & Authentic Gaya Ji Pind Daan, Shradh, and Pitru Paksha Pilgrimage Platform',
    'publisher': {
      '@id': 'https://www.pinddaanwale.com/#organization'
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://www.pinddaanwale.com/sacred-places?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    'inLanguage': ['en-IN', 'hi-IN']
  };

  // 3. Sacred Temple Schema (Vishnupad Temple Gaya Ji)
  const sacredTempleSchema = {
    '@context': 'https://schema.org',
    '@type': 'HinduTemple',
    '@id': 'https://www.pinddaanwale.com/#vishnupad-temple',
    'name': 'Vishnupad Temple Gaya Ji',
    'description': 'Ancient holy Hindu temple housing the 40 cm footstep (charan paduka) of Lord Vishnu etched in solid basalt rock, representing the premier sanctuary for ancestral liberation in Sanatana Dharma.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Chand Chaura',
      'addressLocality': 'Gaya',
      'addressRegion': 'Bihar',
      'postalCode': '823001',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '24.7788',
      'longitude': '85.0084'
    },
    'hasMap': 'https://maps.google.com/?q=Vishnupad+Temple+Gaya'
  };

  // 4. Pitru Paksha Mela Event Schema
  const pitruPakshaEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'Pitru Paksha Mahasangam 2026 Gaya Ji',
    'description': 'The sacred 16-day pilgrimage congregation for performing Pind Daan, Shradh, and Gotra Tarpan at Vishnupad Temple, Falgu River, and Akshayavat in Gaya Ji.',
    'startDate': '2026-09-26T05:00:00+05:30',
    'endDate': '2026-10-10T18:00:00+05:30',
    'eventAttendanceMode': 'https://schema.org/MixedEventAttendanceMode',
    'eventStatus': 'https://schema.org/EventScheduled',
    'location': {
      '@type': 'Place',
      'name': 'Vishnupad Temple Compound & Falgu Ghats',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Gaya',
        'addressRegion': 'Bihar',
        'addressCountry': 'IN'
      }
    },
    'organizer': {
      '@id': 'https://www.pinddaanwale.com/#organization'
    },
    'offers': {
      '@type': 'Offer',
      'url': 'https://www.pinddaanwale.com/packages',
      'price': '9449',
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
      'validFrom': '2026-01-01T00:00:00+05:30'
    }
  };

  // 5. Service Schema for Vedic Pind Daan Rituals
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.pinddaanwale.com/#service-pinddaan',
    'name': 'Authentic Vedic Pind Daan & Shradh Rites',
    'serviceType': 'Hindu Ancestral Rites & Pilgrimage',
    'provider': {
      '@id': 'https://www.pinddaanwale.com/#organization'
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': 'Gaya Ji, Bihar, India'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Pind Daan Ritual Packages',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Gaya Ji 1-Day Essential Pind Daan',
            'description': 'Essential single-day ancestral rites at Vishnupad Temple & Falgu River with dedicated Purohit, complete samagri, and transport.'
          },
          'price': '9449',
          'priceCurrency': 'INR'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Gaya Ji Complete 3-Day 45-Vedi Pind Daan',
            'description': 'Complete 45-Vedi sacred trail covering Vishnupad, Falgu River, Akshayavat, Pretshila, and Ramshila with 3-night hotel stay and transport.'
          },
          'price': '21449',
          'priceCurrency': 'INR'
        }
      ]
    }
  };

  // 6. High-Impact FAQPage Schema for Google Rich Snippets
  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'गया जी में पिंडदान का सर्वश्रेष्ठ समय (शुभ मुहूर्त) क्या है? (What is the best time for Pind Daan in Gaya Ji?)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'गरुड़ पुराण एवं धर्मसिंधु के अनुसार पिंडदान के लिए सर्वश्रेष्ठ समय अपराह्न काल (दोपहर 01:12 PM से 03:36 PM) तथा कुतुप व रौहिण मुहूर्त (प्रातः 11:36 AM से 01:12 PM) है। सूर्यास्त के बाद अथवा सायाह्न काल में पिंडदान पूर्णतः वर्जित है।'
        }
      },
      {
        '@type': 'Question',
        'name': 'गया जी में 1-दिवसीय एवं 3-दिवसीय पिंडदान का खर्च कितना है? (What is the cost of Pind Daan in Gaya Ji?)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'PindDaanWale पर 100% निश्चित एवं पारदर्शी दक्षिणा नीति है। 1-दिवसीय पिंडदान पैकेज ₹9,449 (विष्णुपद, फल्गु नदी, अक्षयवट) तथा 3-दिवसीय सम्पूर्ण 45-वेदी महातीर्थ पैकेज ₹21,449 में उपलब्ध है, जिसमें समस्त वैदिक पूजन सामग्री, प्रमाणित गयावाल पुरोहित दक्षिणा एवं स्थानीय वाहन सम्मिलित है।'
        }
      },
      {
        '@type': 'Question',
        'name': 'क्या गया जी में पंडा या बिचौलियों द्वारा अतिरिक्त पैसे मांगे जाते हैं? (Is there any extortion or forced dakshina at Gaya Ji?)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'PindDaanWale की 100% शून्य-बिचौलिया (Zero Extortion) गारंटी है। बुकिंग के समय तय दक्षिणा ही अंतिम होती है। घाट पर किसी भी प्रकार की अनुचित मांग या मोलभाव नहीं होता और श्रद्धालु शांतिपूर्वक अपने पितरों का तर्पण संपन्न कर सकते हैं।'
        }
      },
      {
        '@type': 'Question',
        'name': 'गया रेलवे स्टेशन से विष्णुपद मंदिर का सरकारी ऑटो किराया कितना है? (What is the auto fare from Gaya Station to Vishnupad Temple?)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'गया जिला प्रशासन परिवहन समिति द्वारा निर्धारित मानक दर अनुसार गया जंक्शन से विष्णुपद मंदिर का शेयरिंग ई-रिक्शा किराया ₹25 प्रति सवारी तथा निजी रिज़र्व ऑटो किराया ₹150 है।'
        }
      },
      {
        '@type': 'Question',
        'name': 'क्या विदेश में रहने वाले (NRI) भक्त ऑनलाइन पिंडदान करवा सकते हैं? (Can NRIs perform Pind Daan remotely via live stream?)',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'हाँ, जो श्रद्धालु व्यक्तिगत रूप से गया जी आने में असमर्थ हैं, उनके लिए PindDaanWale 4K लाइव ज़ूम वीडियो स्ट्रीमिंग के माध्यम से गयावाल तीर्थ पुरोहितों द्वारा वैदिक गोत्र संकल्प एवं पिंडदान अनुष्ठान कराता है, तथा पवित्र प्रसाद कूरियर द्वारा भेजा जाता है।'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sacredTempleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pitruPakshaEventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
    </>
  );
}
