import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import AiAgentWidget from "@/components/common/AiAgentWidget";
import SchemaMarkup from "@/components/common/SchemaMarkup";
import ConditionalLayoutWrapper from "@/components/layout/ConditionalLayoutWrapper";
import prisma from "@/lib/prisma";

import Script from 'next/script';

const db = prisma as any;

// Display Font: Cormorant Garamond (500, 600, 700 only)
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// UI & Body Font: Plus Jakarta Sans (400, 500, 600, 700)
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Hindi & Sanskrit Font: Noto Sans Devanagari
const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PindDaanWale | Sacred & Authentic Gaya Ji Pind Daan | Pitru Paksha 2026",
    template: "%s | PindDaanWale Gaya Ji"
  },
  description: "Official pilgrimage authority for authentic Vedic Pind Daan, Shradh, and Gotra Tarpan at Vishnupad Temple & Falgu River in Gaya Ji. 100% fixed dakshina, zero extortion guarantee, verified hereditary Purohits.",
  keywords: [
    "Pind Daan Gaya Ji",
    "Gaya Pind Daan",
    "Pitru Paksha 2026",
    "Vishnupad Temple Gaya",
    "Gaya Ji Shradh Pooja",
    "Pind Daan Cost Gaya",
    "Falgu River Tarpan",
    "Akshayavat Pind Daan",
    "Pretshila Gaya Ji",
    "Tripindi Shradh Gaya",
    "Narayan Bali Gaya Ji",
    "NRI Pind Daan Live",
    "Gaya Panda Contact",
    "Pind Daan Packages",
    "गया जी पिंडदान",
    "पितृपक्ष 2026",
    "विष्णुपद मंदिर श्राद्ध"
  ],
  authors: [{ name: "PindDaanWale Teerth Seva", url: "https://www.pinddaanwale.com" }],
  creator: "PindDaanWale",
  publisher: "PindDaanWale Teerth Authority",
  category: "Religion & Spirituality",
  metadataBase: new URL("https://www.pinddaanwale.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://www.pinddaanwale.com",
      "hi-IN": "https://www.pinddaanwale.com",
      "x-default": "https://www.pinddaanwale.com"
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "PindDaanWale | Sacred & Authentic Gaya Ji Pind Daan",
    description: "Plan authentic Shradh, Tarpan, and Pind Daan rites under hereditary Gaya Purohits at Vishnupad Temple. 100% fixed dakshina & zero middlemen.",
    url: "https://www.pinddaanwale.com",
    siteName: "PindDaanWale",
    images: [
      {
        url: "/images/gaya_vishnupad.jpg",
        width: 1200,
        height: 630,
        alt: "Vishnupad Temple Gaya Ji - Sacred Pind Daan Rituals"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PindDaanWale | Trusted Gaya Ji Pilgrimage",
    description: "Sacred Pind Daan and Shradh rites at Vishnupad Gaya Ji with hereditary Purohits. 100% Fixed Dakshina Guarantee.",
    images: ["/images/gaya_vishnupad.jpg"],
    creator: "@PindDaanWale"
  },
  other: {
    "geo.position": "24.7788;85.0084",
    "geo.placename": "Gaya Ji, Bihar",
    "geo.region": "IN-BR"
  }
};

import { getCachedData } from "@/lib/dbCache";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let packages: any[] = [];
  let sacredPlaces: any[] = [];
  let siteSettings: any = null;

  try {
    packages = db.ritualPackage 
      ? await db.ritualPackage.findMany({ orderBy: { priceINR: 'asc' } }) 
      : [];
    sacredPlaces = db.sacredPlace 
      ? await db.sacredPlace.findMany({ take: 6 }) 
      : [];
    siteSettings = db.siteSettings 
      ? await db.siteSettings.findUnique({ where: { id: 'default' } }) 
      : null;
  } catch (err) {
    // fallback
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${cormorant.variable} ${notoSansDevanagari.variable} h-full antialiased`}
    >
      <head>
        {/* Early Hindi Language Initialization for First-Time Visitors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var cookie = document.cookie;
                  var hasGoogtrans = cookie.indexOf('googtrans=') !== -1;
                  var storedLang = localStorage.getItem('pinddaan_lang');
                  if (!hasGoogtrans && (!storedLang || storedLang === 'hi')) {
                    var domain = window.location.hostname;
                    var path = '; path=/;';
                    document.cookie = 'googtrans=/en/hi' + path;
                    if (domain && domain !== 'localhost' && domain.indexOf('127.0.0.1') === -1) {
                      document.cookie = 'googtrans=/en/hi' + path + ' domain=' + domain + ';';
                      document.cookie = 'googtrans=/en/hi' + path + ' domain=.' + domain + ';';
                      var parts = domain.split('.');
                      if (parts.length > 2) {
                        var root = parts.slice(-2).join('.');
                        document.cookie = 'googtrans=/en/hi' + path + ' domain=.' + root + ';';
                      }
                    }
                    try { localStorage.setItem('pinddaan_lang', 'hi'); } catch(e){}
                  }
                } catch(e) {}
              })();
            `
          }}
        />
        <SchemaMarkup siteSettings={siteSettings} />
        {siteSettings?.searchConsoleTag && (
          <meta name="google-site-verification" content={siteSettings.searchConsoleTag.replace(/<meta.*content="|["\/>]/g, '').trim()} />
        )}
      </head>
      <body suppressHydrationWarning className="min-h-full font-body bg-[#FAF7F2] text-[#5A5148] relative selection:bg-[#C6922E]/20 selection:text-[#2B2118]">
        {(siteSettings?.googleAnalyticsId || 'G-S3CGS7N0MW') && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings?.googleAnalyticsId || 'G-S3CGS7N0MW'}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteSettings?.googleAnalyticsId || 'G-S3CGS7N0MW'}');
              `}
            </Script>
          </>
        )}
        <ConditionalLayoutWrapper
          navbar={<Navbar key="layout-navbar" packages={packages} sacredPlaces={sacredPlaces} />}
          footer={<Footer key="layout-footer" />}
          stickyMobileBar={<StickyMobileBar key="layout-mobilebar" />}
          aiAgentWidget={<AiAgentWidget key="layout-aiwidget" />}
        >
          {children}
        </ConditionalLayoutWrapper>
      </body>
    </html>
  );
}
