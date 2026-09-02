import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "PindDaanWale | The Official Gaya Ji Digital Destination",
    template: "%s | PindDaanWale Gaya Ji"
  },
  description: "The definitive digital platform for sacred rites, Pind Daan, Shradh, and Pitru Paksha at Vishnupad Temple & Falgu River, Gaya Ji.",
  metadataBase: new URL("https://www.pinddaanwale.com"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "PindDaanWale | The Official Gaya Ji Digital Destination",
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
    title: "PindDaanWale | Official Gaya Ji Pilgrimage",
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
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased`}
    >
      <head>
        <SchemaMarkup siteSettings={siteSettings} />
        {siteSettings?.searchConsoleTag && (
          <meta name="google-site-verification" content={siteSettings.searchConsoleTag.replace(/<meta.*content="|["\/>]/g, '').trim()} />
        )}
      </head>
      <body suppressHydrationWarning className="min-h-full bg-temple-ivory relative">
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
