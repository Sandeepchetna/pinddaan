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

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://www.pinddaanwale.com/#organization',
    'name': companyName,
    'alternateName': 'PindDaanWale Gaya Ji Pilgrimage Authority',
    'url': 'https://www.pinddaanwale.com',
    'logo': logoUrl,
    'image': 'https://www.pinddaanwale.com/images/gaya_vishnupad.jpg',
    'telephone': phone,
    'email': email,
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

  const sacredTempleSchema = {
    '@context': 'https://schema.org',
    '@type': 'HinduTemple',
    '@id': 'https://www.pinddaanwale.com/#vishnupad-temple',
    'name': 'Vishnupad Temple Gaya Ji',
    'description': 'Sacred sanctuary housing the 40 cm footstep of Lord Vishnu etched in solid basalt rock.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Gaya',
      'addressRegion': 'Bihar',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': latitude,
      'longitude': longitude
    }
  };

  const pitruPakshaEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'Pitru Paksha Mela 2026 Gaya Ji',
    'description': 'The official 16-day sacred ancestral period for performing Pind Daan, Shradh, and Gotra Tarpan at Vishnupad Gaya Ji.',
    'startDate': '2026-09-26',
    'endDate': '2026-10-10',
    'eventAttendanceMode': 'https://schema.org/MixedEventAttendanceMode',
    'eventStatus': 'https://schema.org/EventScheduled',
    'location': {
      '@type': 'Place',
      'name': 'Vishnupad Temple Compound & Falgu Ghat',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Gaya',
        'addressRegion': 'Bihar',
        'addressCountry': 'IN'
      }
    },
    'organizer': {
      '@type': 'Organization',
      'name': companyName,
      'url': 'https://www.pinddaanwale.com'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sacredTempleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pitruPakshaEventSchema) }}
      />
    </>
  );
}
