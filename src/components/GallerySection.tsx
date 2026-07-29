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
  const [galleryImages, setGalleryImages] = useState<typeof GALLERY_IMAGES>(GALLERY_IMAGES);

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

  const PREVIEW_LIMIT = 3;
  const previewImages = galleryImages.slice(0, PREVIEW_LIMIT);



  const renderPortraitCard = (img: typeof GALLERY_IMAGES[0], i: number) => (
    <div
      key={i}
      className="p-[3px] rounded-[2rem] group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#e63963]/30"
      style={{
        background: 'linear-gradient(135deg, #e63963 0%, #ff8400 50%, #e63963 100%)',
        boxShadow: '0 15px 35px -5px rgba(230, 57, 99, 0.2), 0 8px 16px -6px rgba(0, 0, 0, 0.08)'
      }}
      onClick={() => setActiveImage(img)}
    >
      <div
        className="relative w-60 sm:w-64 overflow-hidden rounded-[1.85rem] bg-gray-900"
        style={{ aspectRatio: '3/5' }}
      >
        <Image
          src={img.src}
          alt={img.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Center zoom icon on hover */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* Dynamic Glassmorphic Bottom Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-[2px] transition-all duration-300">
          <h4 className="font-serif-heading font-bold text-sm text-white leading-snug drop-shadow-md group-hover:text-amber-200 transition-colors">
            {img.title}
          </h4>
          <p className="text-[11px] text-gray-200 mt-1 line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
            {img.desc}
          </p>
        </div>
      </div>
    </div>
  );

  const activeIndex = activeImage ? galleryImages.findIndex((img) => img.src === activeImage.src) : -1;

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIndex !== -1) {
      const nextIdx = (activeIndex + 1) % galleryImages.length;
      setActiveImage(galleryImages[nextIdx]);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeIndex !== -1) {
      const prevIdx = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
      setActiveImage(galleryImages[prevIdx]);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeImage) return;
      if (e.key === 'Escape') setActiveImage(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, activeIndex, galleryImages]);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="font-script text-3xl text-[#e63963] block">Notre Univers Visuel</span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#3a0f1d]">
            Galerie Photos du Juice Bar & Événements
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Découvrez nos créations réelles, nos verres ornés de sucreries et nos installations événementielles à Nabeul.
          </p>
        </div>

        {/* Gallery Grid - Styled Vertical Portrait Preview Cards */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
          {previewImages.map(renderPortraitCard)}
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
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
              <div className="flex flex-wrap justify-center gap-6">
                {galleryImages.map(renderPortraitCard)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-300 select-none"
          onClick={() => setActiveImage(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between w-full max-w-5xl mx-auto z-10 shrink-0">
            <span className="bg-white/10 text-white backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold flex items-center gap-2 shadow-lg">
              <IconSparkles className="w-3.5 h-3.5 text-amber-400" />
              Photo {activeIndex + 1} sur {galleryImages.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(null);
              }}
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-md transition-all border border-white/20 hover:scale-105 active:scale-95 shadow-lg"
              aria-label="Fermer"
            >
              <IconClose className="w-5 h-5" />
            </button>
          </div>

          {/* Main Stage */}
          <div className="relative flex-1 flex items-center justify-center my-4 w-full max-w-5xl mx-auto">
            {/* Prev Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-[#e63963] text-white p-3 sm:p-4 rounded-full backdrop-blur-md border border-white/20 transition-all shadow-2xl hover:scale-110 active:scale-90"
                aria-label="Photo précédente"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Photo Card Container */}
            <div
              className="relative h-[65vh] sm:h-[72vh] w-full max-w-xs sm:max-w-sm rounded-[2.5rem] overflow-hidden border-2 border-white/20 shadow-2xl shadow-[#e63963]/20 bg-gray-950 flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.title}
                fill
                className="object-cover sm:object-contain transition-all duration-300"
                priority
              />
            </div>

            {/* Next Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-[#e63963] text-white p-3 sm:p-4 rounded-full backdrop-blur-md border border-white/20 transition-all shadow-2xl hover:scale-110 active:scale-90"
                aria-label="Photo suivante"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Caption Card */}
          <div
            className="w-full max-w-md mx-auto z-10 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center text-white shadow-2xl space-y-1">
              <h3 className="font-serif-heading text-base sm:text-lg font-bold text-amber-300 leading-snug">
                {activeImage.title}
              </h3>
              {activeImage.desc && (
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
                  {activeImage.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
