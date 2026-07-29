'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IconSparkles, IconClose } from '@/components/Icons';

const GALLERY_IMAGES = [
  {
    src: '/assets/cart-1.jpg',
    title: 'Charette Alou Juice & Bar à Bonbons',
    desc: 'Présentation élégante des jus frais et des verres décorés lors des réceptions.'
  },
  {
    src: '/assets/cart-2.jpg',
    title: 'Focus Carte Signature & Arbuste Citron',
    desc: 'Carte des jus aux motifs floraux et décorations faits maison.'
  },
  {
    src: '/assets/cart-3.jpg',
    title: 'Verres Décorés aux Rebords Bonbons',
    desc: 'Bords de verres colorés au sucre et bonbons pour une touche acidulée unique.'
  },
  {
    src: '/assets/menu-card.png',
    title: 'Menu Officiel Alou Juice Bar',
    desc: 'Golden Paradise, Sunset Cream, Sunny Coconut, Passion Sunrise.'
  }
];

export const GallerySection = () => {
  const [activeImage, setActiveImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<typeof GALLERY_IMAGES>([]);

  React.useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryImages(data);
        }
      })
      .catch((err) => console.error('Failed to load gallery from MongoDB:', err));
  }, []);

  const PREVIEW_LIMIT = 2;
  const previewImages = galleryImages.slice(0, PREVIEW_LIMIT);

  const renderGalleryCard = (img: typeof GALLERY_IMAGES[0], i: number) => (
    <div
      key={i}
      onClick={() => setActiveImage(img)}
      className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer shadow-lg border border-pink-100"
    >
      <Image
        src={img.src}
        alt={img.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
        <span className="text-amber-400 text-xs font-bold flex items-center gap-1 mb-1">
          <IconSparkles className="w-3.5 h-3.5" /> Photo Réelle
        </span>
        <h4 className="font-serif-heading font-bold text-lg leading-tight">{img.title}</h4>
        <p className="text-xs text-gray-200 mt-1 line-clamp-2">{img.desc}</p>
      </div>
    </div>
  );

  const renderPhoneCard = (img: typeof GALLERY_IMAGES[0], i: number) => (
    <div key={i} className="flex flex-col items-center gap-4">
      {/* Phone Frame */}
      <div
        onClick={() => setActiveImage(img)}
        className="relative cursor-pointer group"
        style={{ width: 220, height: 440 }}
      >
        {/* Outer bezel */}
        <div
          className="absolute inset-0 rounded-[3rem] shadow-2xl"
          style={{
            background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1c 40%, #111113 100%)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(255,255,255,0.08)'
          }}
        />
        {/* Side volume buttons */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-8 rounded-l-sm" style={{ background: '#222224' }} />
        <div className="absolute -left-[3px] top-36 w-[3px] h-8 rounded-l-sm" style={{ background: '#222224' }} />
        {/* Side power button */}
        <div className="absolute -right-[3px] top-28 w-[3px] h-10 rounded-r-sm" style={{ background: '#222224' }} />
        {/* Screen area */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
            borderRadius: '2.4rem',
            background: '#000'
          }}
        >
          <Image
            src={img.src}
            alt={img.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Screen overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
            <span className="text-amber-400 text-[10px] font-bold flex items-center gap-1 mb-0.5">
              <IconSparkles className="w-3 h-3" /> Photo Réelle
            </span>
            <h4 className="font-serif-heading font-bold text-sm text-white leading-tight">{img.title}</h4>
          </div>
          {/* Top notch */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-10"
            style={{
              width: 72,
              height: 20,
              background: '#000',
              borderRadius: '0 0 1rem 1rem'
            }}
          >
            {/* Speaker */}
            <div className="absolute top-[6px] left-1/2 -translate-x-1/2" style={{ width: 28, height: 4, background: '#1a1a1a', borderRadius: 4 }} />
            {/* Camera dot */}
            <div className="absolute top-[5px] right-2" style={{ width: 6, height: 6, background: '#1a1a1a', borderRadius: '50%' }} />
          </div>
          {/* Home bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2" style={{ width: 60, height: 4, background: 'rgba(255,255,255,0.35)', borderRadius: 4 }} />
        </div>
      </div>
      {/* Caption below phone */}
      <div className="text-center px-2">
        <h4 className="font-serif-heading font-bold text-[#3a0f1d] text-sm leading-tight">{img.title}</h4>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{img.desc}</p>
      </div>
    </div>
  );

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="font-script text-3xl text-[#e63963] block">Notre Univers Visuel</span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#3a0f1d]">
            Galerie Photos du Juice Bar & Événements
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Découvrez nos créations réelles, nos verres ornés de sucreries et nos installations événementielles à Nabeul.
          </p>
        </div>

        {/* Gallery Grid - Phone Frame Preview */}
        <div className="flex flex-wrap justify-center gap-10">
          {previewImages.map(renderPhoneCard)}
        </div>

        {/* Explore Full Gallery Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setIsFullGalleryOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-[#e63963] hover:bg-[#c42850] text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm"
          >
            <span>Voir Toute La Galerie ({galleryImages.length} Photos)</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

      </div>

      {/* Full Gallery Modal */}
      {isFullGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-pink-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 via-white to-amber-50 shrink-0">
              <div>
                <span className="font-script text-xl text-[#e63963] block">Univers Visuel</span>
                <h3 className="font-serif-heading font-bold text-2xl text-[#3a0f1d]">
                  Toutes Nos Photos Réelles
                </h3>
              </div>
              <button
                onClick={() => setIsFullGalleryOpen(false)}
                className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fermer"
              >
                <IconClose className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Grid Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryImages.map(renderGalleryCard)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <IconClose className="w-6 h-6" />
            </button>
            <div className="relative h-[65vh] w-full bg-black">
              <Image
                src={activeImage.src}
                alt={activeImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-white space-y-1">
              <h3 className="font-serif-heading text-xl font-bold text-[#3a0f1d]">{activeImage.title}</h3>
              <p className="text-sm text-gray-600">{activeImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
