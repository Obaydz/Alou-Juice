import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';
import { ClientLayoutWrapper } from '@/components/ClientLayoutWrapper';
import { BRAND_CONTACT } from '@/data/juiceData';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aloujuice.tn';

export const viewport: Viewport = {
  themeColor: '#EC4899',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Alou Juice | Bar à Jus Artisanal & Cocktail Bar Mobile en Tunisie',
    template: '%s | Alou Juice',
  },
  description:
    'Savourez des jus frais 100% naturels, smoothies gourmands et mocktails aux verres rimés. Louez notre charette mobile Alou Juice pour vos mariages, anniversaires et événements à Nabeul et partout en Tunisie.',
  keywords: [
    'Alou Juice',
    'Alou Juice Nabeul',
    'Bar à jus Tunisie',
    'Cocktail bar mobile Tunisie',
    'Jus frais Nabeul',
    'Jus naturel 100%',
    'Smoothies artisanaux',
    'Location bar mobile mariage',
    'Charette à jus événement',
    'Traiteur boisson mariage Tunisie',
    'Juice bar Tunis',
    'Cocktails sans alcool',
    'Ela Ben Khedher',
    'Verres rimés bonbons',
  ],
  authors: [{ name: BRAND_CONTACT.owner, url: SITE_URL }],
  creator: BRAND_CONTACT.name,
  publisher: BRAND_CONTACT.name,
  category: 'Food & Beverage',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_TN',
    url: SITE_URL,
    siteName: 'Alou Juice',
    title: 'Alou Juice | Bar à Jus Artisanal & Cocktail Bar Mobile en Tunisie',
    description:
      'Jus frais 100% naturels, mocktails d’exception et bar mobile premium pour vos réceptions et événements en Tunisie. Home Made by Ela Ben Khedher.',
    images: [
      {
        url: '/assets/cart-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Charette Mobile Alou Juice Bar',
      },
      {
        url: '/assets/logo.png',
        width: 800,
        height: 800,
        alt: 'Logo Alou Juice',
      },
      {
        url: '/assets/cart-2.jpg',
        width: 1200,
        height: 800,
        alt: 'Alou Juice Bar Nabeul',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alou Juice | Bar à Jus Artisanal & Cocktail Bar Mobile',
    description:
      'Jus 100% naturels & animation de bar mobile d’exception pour mariages et soirées en Tunisie.',
    images: ['/assets/cart-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/logo.png',
  },
};

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdBusiness = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${SITE_URL}/#business`,
    name: 'Alou Juice',
    alternateName: 'Alou Juice Bar',
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.png`,
    image: [
      `${SITE_URL}/assets/cart-1.jpg`,
      `${SITE_URL}/assets/cart-2.jpg`,
      `${SITE_URL}/assets/logo.png`,
    ],
    description:
      'Bar à jus artisanal 100% naturel, mocktails gourmands aux verres rimés et charette mobile événementielle pour mariages, anniversaires et réceptions en Tunisie.',
    founder: {
      '@type': 'Person',
      name: BRAND_CONTACT.owner,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue Hédi Chaker',
      addressLocality: 'Dar Chaabane',
      addressRegion: 'Nabeul',
      addressCountry: 'TN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.468,
      longitude: 10.753,
    },
    telephone: BRAND_CONTACT.phone,
    email: BRAND_CONTACT.email,
    priceRange: '$$',
    servesCuisine: ['Jus Frais', 'Smoothies', 'Mocktails', 'Cocktails Artisanaux'],
    acceptsReservations: 'True',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '48',
      bestRating: '5',
      worstRating: '1',
    },
    hasMenu: {
      '@type': 'Menu',
      name: 'Carte Alou Juice Bar',
      hasMenuSection: [
        {
          '@type': 'MenuSection',
          name: 'Jus Frais & Smoothies Artisanaux',
          hasMenuItem: [
            {
              '@type': 'MenuItem',
              name: 'Jus Frais & Smoothies Artisanaux 100% Naturels',
              description:
                'Jus de fruits frais pressés minute sans conservateurs avec toppings gourmands.',
              offers: {
                '@type': 'Offer',
                price: '8.50',
                priceCurrency: 'TND',
                availability: 'https://schema.org/InStock',
              },
            },
          ],
        },
        {
          '@type': 'MenuSection',
          name: 'Service Bar Événementiel',
          hasMenuItem: [
            {
              '@type': 'MenuItem',
              name: 'Charette Mobile Événementielle (Bar à Jus & Mocktails)',
              description:
                'Location et animation du bar mobile décoré avec verres rimés et boissons artisanales pour mariages, outia, anniversaires et événements d’entreprise.',
              offers: {
                '@type': 'Offer',
                price: '250.00',
                priceCurrency: 'TND',
                availability: 'https://schema.org/InStock',
              },
            },
          ],
        },
      ],
    },
    sameAs: ['https://instagram.com/alou_juice'],
  };

  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Alou Juice',
    description: 'Bar à jus artisanal & Cocktail bar mobile en Tunisie.',
    inLanguage: 'fr-TN',
  };

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="antialiased selection:bg-pink-500 selection:text-white">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
