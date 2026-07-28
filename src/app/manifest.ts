import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alou Juice | Bar à Jus Artisanal & Cocktail Bar Mobile',
    short_name: 'Alou Juice',
    description:
      'Bar à jus artisanal 100% naturel & Charette mobile pour événements en Tunisie.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#EC4899',
    icons: [
      {
        src: '/assets/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
