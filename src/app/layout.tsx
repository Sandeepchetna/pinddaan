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
    default: "PindDaanWale | Sacred & Authentic Gaya Ji Pind Daan",
    template: "%s | PindDaanWale Gaya Ji"
  },
  description: "The premier digital pilgrimage platform for authentic Vedic rites, Pind Daan, Shradh, and Pitru Paksha at Vishnupad Temple & Falgu River in Gaya Ji with transparent dakshina.",
  metadataBase: new URL("https://www.pinddaanwale.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "PindDaanWale | Sacred & Authentic Gaya Ji Pind Daan",
    description: "Plan authentic Shradh, Tarpan, and Pind Daan rites under hereditary Gaya Purohits at Vishnupad Temple.",
    url: "https://www.pinddaanwale.com",
    siteName: "PindDaanWale",
    images: [
      {
        url: "/images/gaya_vishnupad.jpg",
        width: 1200,
        height: 630,
        alt: "Vishnupad Temple Gaya Ji - PindDaanWale"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PindDaanWale | Trusted Gaya Ji Pilgrimage",
    description: "Sacred Pind Daan and Shradh rites at Vishnupad Gaya Ji with hereditary Purohits.",
    images: ["/images/gaya_vishnupad.jpg"]
  },
  other: {
    "geo.position": "24.7788;85.0084",
    "geo.placename": "Gaya Ji, Bihar",
    "geo.region": "IN-BR"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let packages: any[] = [];
  let sacredPlaces: any[] = [];
  let siteSettings: any = null;

  try {
    if (db.ritualPackage) {
      packages = await db.ritualPackage.findMany({ orderBy: { createdAt: 'desc' } });
    }
    if (db.sacredPlace) {
      sacredPlaces = await db.sacredPlace.findMany({ orderBy: { createdAt: 'desc' } });
    }
    if (db.siteSettings) {
      siteSettings = await db.siteSettings.findUnique({ where: { id: 'default' } });
    }
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
