'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { DrinkItem } from '@/data/juiceData';
import { IconSparkles, IconCheck, IconPlus } from '@/components/Icons';

const BASES = [
  { id: 'orange', name: 'Jus d’Orange Frais Nabeul', color: '#f97316', liquidGradient: 'from-orange-400 to-amber-500' },
  { id: 'mango', name: 'Nectar de Mangue Tropicale', color: '#fbbf24', liquidGradient: 'from-[#f59e0b] to-[#d97706]' },
  { id: 'coconut', name: 'Eau de Coco Bio Fresh', color: '#38bdf8', liquidGradient: 'from-sky-300 to-teal-400' },
  { id: 'mint-lemon', name: 'Citronnade à la Menthe Fraîche', color: '#10b981', liquidGradient: 'from-emerald-400 to-green-500' },
  { id: 'watermelon', name: 'Jus de Pastèque Glacée', color: '#f43f5e', liquidGradient: 'from-rose-500 to-pink-600' }
];

const INFUSIONS = [
  { id: 'passion', name: 'Fruit de la Passion Exotique', accent: '#ec4899' },
  { id: 'hibiscus', name: 'Infusion Hibiscus & Grenade', accent: '#be123c' },
  { id: 'peach', name: 'Sirop d’Pêche Artisanale', accent: '#fb923c' },
  { id: 'vanilla-cream', name: 'Nuage Creamy Vanille', accent: '#fef08a' }
];

const RIMS = [
  { id: 'pink-candy', name: 'Bord Bonbons Rose', style: 'border-[#f472b6] bg-pink-100' },
  { id: 'yellow-citrus', name: 'Sucre Citronné Jaune', style: 'border-amber-400 bg-amber-100' },
  { id: 'coconut-rim', name: 'Flocons de Coco Râpée', style: 'border-slate-300 bg-slate-100' },
  { id: 'golden-glitter', name: 'Paillettes Dorées Comestibles', style: 'border-yellow-500 bg-yellow-100' }
];

export const DrinkMixer = () => {
  const { addToCart } = useCart();
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [selectedInfusion, setSelectedInfusion] = useState(INFUSIONS[0]);
  const [selectedRim, setSelectedRim] = useState(RIMS[0]);
  const [customName, setCustomName] = useState('Mon Elixir Personnalisé');

  const [savedStatus, setSavedStatus] = useState<string>('');

  const getCustomDrinkObject = (): DrinkItem => ({
    id: `custom-${Date.now()}`,
    name: customName || 'Jus Sur Mesure',
    category: 'signature',
    description: `Création sur mesure: ${selectedBase.name} infusé au ${selectedInfusion.name}.`,
    price: 11.50,
    image: '/assets/cart-2.jpg',
    tags: ['Sur Mesure', 'Création Unique'],
    accentColor: selectedBase.color,
    ingredients: [selectedBase.name, selectedInfusion.name, selectedRim.name],
    rimOptions: [selectedRim.name]
  });

  const saveToLocalStorage = (customDrink: DrinkItem) => {
    try {
      const existingCustom = JSON.parse(localStorage.getItem('alou_custom_drinks') || '[]');
      const updatedCustom = [customDrink, ...existingCustom.filter((d: any) => d.name !== customDrink.name)];
      localStorage.setItem('alou_custom_drinks', JSON.stringify(updatedCustom));
      window.dispatchEvent(new Event('alou_custom_drinks_updated'));
    } catch (e) {
      console.error('Error saving custom drink to localStorage', e);
    }
  };

  const handleSaveOnly = () => {
    const customDrink = getCustomDrinkObject();
    saveToLocalStorage(customDrink);
    setSavedStatus(`✨ "${customDrink.name}" a été enregistré ! Retrouvez-le dans la section Réservation Événementielle.`);
    setTimeout(() => setSavedStatus(''), 4000);
  };

  const handleAddToCart = () => {
    const customDrink = getCustomDrinkObject();
    saveToLocalStorage(customDrink);
    addToCart(customDrink, selectedRim.name);
    setSavedStatus(`🛒 "${customDrink.name}" ajouté au panier et sauvegardé !`);
    setTimeout(() => setSavedStatus(''), 4000);
  };

  return (
    <section id="mixer" className="py-20 bg-gradient-to-b from-pink-50/50 via-[#fffdfa] to-amber-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="font-script text-3xl text-[#f59e0b] block">Expérience Interactive</span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#3a0f1d]">
            Composez Votre Propre Alou Juice Sur Mesure
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Choisissez la base de jus, l’infusion gourmande et la finition du rebord de votre verre pour une création unique préparée spécialement par Ela !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-2xl">

          {/* Left Customizer Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">

            {/* Step 1: Base Selection */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#3a0f1d] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-100 text-[#e63963] flex items-center justify-center text-xs">1</span>
                Choisissez la Base du Jus:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BASES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBase(b)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all flex items-center justify-between ${selectedBase.id === b.id
                      ? 'border-[#e63963] bg-pink-50 text-[#e63963] shadow-sm'
                      : 'border-gray-200 text-gray-700 hover:border-pink-200'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: b.color }} />
                      {b.name}
                    </span>
                    {selectedBase.id === b.id && <IconCheck className="w-4 h-4 text-[#e63963]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Infusion */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#3a0f1d] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">2</span>
                Ajoutez une Infusion Fruité:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INFUSIONS.map((inf) => (
                  <button
                    key={inf.id}
                    onClick={() => setSelectedInfusion(inf)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all flex items-center justify-between ${selectedInfusion.id === inf.id
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-gray-200 text-gray-700 hover:border-amber-200'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: inf.accent }} />
                      {inf.name}
                    </span>
                    {selectedInfusion.id === inf.id && <IconCheck className="w-4 h-4 text-amber-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Naming Input */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-700 block">
                Donnez un nom à votre création:
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-sm font-semibold text-[#3a0f1d] focus:outline-none focus:border-[#e63963]"
                placeholder="Ex: Cocktail Plage de Nabeul"
              />
            </div>
          </div>

          {/* Right Live Glass Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-50 to-white rounded-3xl border border-pink-100 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#e63963] flex items-center gap-1.5">
              <IconSparkles className="w-4 h-4" /> Visualisation en Direct
            </span>

            {/* Virtual Glass Graphic */}
            <div className="relative w-48 h-64 flex flex-col items-center justify-end">
              {/* Rim Accent Ring */}
              <div className={`w-40 h-5 rounded-t-full border-4 shadow-sm z-20 transition-all duration-500 ${selectedRim.style}`} />

              {/* Glass Bowl Container */}
              <div className="w-36 h-48 border-x-4 border-b-4 border-white/80 rounded-b-3xl relative overflow-hidden backdrop-blur-sm bg-white/40 shadow-inner flex flex-col justify-end p-2">
                {/* Ice Cubes inside glass */}
                <div className="absolute top-8 left-6 w-6 h-6 bg-white/70 rounded-md transform rotate-12 border border-white/90 z-10 animate-float-slow" />
                <div className="absolute top-14 right-6 w-7 h-7 bg-white/70 rounded-md transform -rotate-45 border border-white/90 z-10 animate-float-fast" />

                {/* Infusion Layer Top */}
                <div
                  className="w-full h-12 transition-colors duration-500 opacity-90 rounded-t-xl"
                  style={{ backgroundColor: selectedInfusion.accent }}
                />

                {/* Base Liquid Fill */}
                <div
                  className={`w-full h-28 bg-gradient-to-b ${selectedBase.liquidGradient} transition-all duration-500 rounded-b-2xl`}
                />
              </div>

              {/* Glass Stem & Base */}
              <div className="w-4 h-12 bg-white/60 border-x border-white" />
              <div className="w-24 h-3 bg-white/80 rounded-full border border-white shadow-sm" />
            </div>

            {/* Drink Summary */}
            <div className="text-center space-y-1">
              <h4 className="font-serif-heading font-bold text-lg text-[#3a0f1d]">
                {customName || 'Votre Elixir'}
              </h4>
              <p className="text-xs text-gray-500">
                {selectedBase.name} + {selectedInfusion.name}
              </p>
            </div>

            {/* Status Toast Banner */}
            {savedStatus && (
              <div className="w-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold p-3 rounded-2xl text-center shadow-sm animate-fade-in">
                {savedStatus}
              </div>
            )}

            {/* Action CTA Buttons */}
            <div className="w-full space-y-2.5">
              <button
                onClick={handleSaveOnly}
                className="w-full bg-gradient-to-r from-[#e63963] to-[#f472b6] text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <IconSparkles className="w-4 h-4" />
                <span>Enregistrer dans Mes Créations (Pour Réservation)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
