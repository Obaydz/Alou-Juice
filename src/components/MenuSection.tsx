'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SIGNATURE_DRINKS, DrinkItem } from '@/data/juiceData';
import { useCart } from '@/context/CartContext';
import { IconSparkles, IconClose } from '@/components/Icons';

export const MenuSection = () => {
  const { addToCart } = useCart();
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<DrinkItem | null>(null);
  const [drinks, setDrinks] = useState<DrinkItem[]>(SIGNATURE_DRINKS);

  React.useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDrinks(data);
        }
      })
      .catch((err) => console.error('Failed to load menu from MongoDB:', err));
  }, []);

  const PREVIEW_LIMIT = 3;
  const previewDrinks = drinks.slice(0, PREVIEW_LIMIT);

  const renderDrinkCard = (drink: DrinkItem) => (
    <div
      key={drink.id || drink._id}
      onClick={() => setSelectedDrink(drink)}
      className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
    >
      <div>
        {/* Image Box - 100% full frame coverage */}
        <div className="relative h-64 w-full bg-gradient-to-br from-pink-50 to-amber-50 overflow-hidden">
          <Image
            src={drink.image}
            alt={drink.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Popular Tag */}
          {drink.popular && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <IconSparkles className="w-3 h-3" />
              Incontournable
            </span>
          )}

          {/* Hover indicator hint */}
          <span className="absolute bottom-3 right-3 bg-white/90 text-[#3a0f1d] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Voir Détails 🔍
          </span>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2.5">
          <h3 className="font-serif-heading text-lg font-bold text-[#3a0f1d] group-hover:text-[#e63963] transition-colors">
            {drink.name}
          </h3>

          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
            {drink.description}
          </p>

          {/* Ingredients Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {drink.ingredients.slice(0, 3).map((ing, i) => (
              <span
                key={i}
                className="bg-pink-50/80 text-[#e63963] text-[10px] font-semibold px-2.5 py-0.5 rounded-md"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="menu" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="font-script text-3xl text-[#e63963] block">Notre Carte Gourmande</span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#3a0f1d]">
            Jus Pressés, Mocktails & Smoothies Artisanaux
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Chaque boisson est préparée à la commande avec des fruits frais de la région de Nabeul. Cliquez sur une boisson pour découvrir ses détails !
          </p>
        </div>

        {/* Menu Cards Grid - Compact Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewDrinks.map(renderDrinkCard)}
        </div>

        {/* Explore Full Menu Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setIsFullMenuOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-[#3a0f1d] hover:bg-[#521629] text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-sm"
          >
            <span>Explorer Toute La Carte ({drinks.length} Boissons)</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

      </div>

      {/* Drink Detail Modal - Luxury Redesign */}
      {selectedDrink && (
        <div 
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedDrink(null)}
        >
          <div 
            className="bg-gradient-to-b from-white via-[#fffdfa] to-pink-50/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/80 animate-in fade-in zoom-in-95 duration-200 relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Box with Blurred Ambient Mirror Fill + 100% Complete Uncropped Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-pink-950 flex items-center justify-center">
              {/* Layer 1: Blurred Ambient Background matching exact image colors to eliminate empty borders */}
              <div 
                className="absolute inset-0 scale-125 blur-xl opacity-60 pointer-events-none"
                style={{
                  backgroundImage: `url(${selectedDrink.image})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />

              {/* Layer 2: Full Crisp Image completely uncropped and 100% visible */}
              <div className="relative w-full h-full p-4 flex items-center justify-center z-10">
                <Image
                  src={selectedDrink.image}
                  alt={selectedDrink.name}
                  fill
                  priority
                  className="object-contain drop-shadow-2xl rounded-2xl"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-15" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedDrink(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-md transition-all z-20 hover:scale-110 active:scale-95 border border-white/20"
                aria-label="Fermer"
              >
                <IconClose className="w-5 h-5" />
              </button>

              {/* Popular Badge */}
              {selectedDrink.popular && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-amber-500 text-[#3a0f1d] text-xs font-black px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 z-20 border border-amber-300">
                  <IconSparkles className="w-3.5 h-3.5" />
                  Incontournable Alou
                </span>
              )}
            </div>

            {/* Modal Body & Content */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#e63963] bg-pink-100/70 px-3 py-1 rounded-full inline-block">
                  Recette Artisanale Alou Juice
                </span>
                <h3 className="font-serif-heading font-extrabold text-2xl sm:text-3xl text-[#3a0f1d] pt-1">
                  {selectedDrink.name}
                </h3>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                {selectedDrink.description}
              </p>

              {/* Ingredients section */}
              {selectedDrink.ingredients && selectedDrink.ingredients.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-pink-100">
                  <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">
                    Ingrédients & Saveurs:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDrink.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="bg-white text-[#3a0f1d] text-xs font-bold px-3.5 py-1.5 rounded-xl border border-pink-200/80 shadow-sm flex items-center gap-1.5"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#e63963]" />
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-3">
                <button
                  onClick={() => setSelectedDrink(null)}
                  className="w-full bg-gradient-to-r from-[#3a0f1d] to-[#59152c] hover:from-[#4c1326] hover:to-[#6d1b37] text-white font-extrabold py-3.5 rounded-2xl shadow-xl shadow-pink-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span>Fermer la fiche</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Full Menu Modal */}
      {isFullMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-pink-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 via-white to-amber-50 shrink-0">
              <div>
                <span className="font-script text-xl text-[#e63963] block">Menu Complet</span>
                <h3 className="font-serif-heading font-bold text-2xl text-[#3a0f1d]">
                  Toutes Nos Boissons Artisanales
                </h3>
              </div>
              <button
                onClick={() => setIsFullMenuOpen(false)}
                className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fermer"
              >
                <IconClose className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content Scrollable Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {drinks.map(renderDrinkCard)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-pink-100 text-center bg-gray-50 text-xs text-gray-500 font-medium shrink-0">
              💡 Toutes nos boissons sont préparées minute avec des fruits frais de Nabeul.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
