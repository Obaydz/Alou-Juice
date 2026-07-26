'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EVENT_TYPES, BAR_THEMES, BRAND_CONTACT, DrinkItem } from '@/data/juiceData';
import { IconSparkles, IconWhatsApp, IconCalendar, IconCheck } from '@/components/Icons';

export const EventBookingSection = () => {
  const [selectedEventType, setSelectedEventType] = useState(EVENT_TYPES[0]);
  const [selectedTheme, setSelectedTheme] = useState(BAR_THEMES[0]);
  const [guestCount, setGuestCount] = useState<number>(50);
  const [durationHours, setDurationHours] = useState<number>(3);
  const [eventDate, setEventDate] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [locationName, setLocationName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Drinks available for selection (from API + custom created in DrinkMixer via localStorage)
  const [availableDrinks, setAvailableDrinks] = useState<DrinkItem[]>([]);
  const [selectedDrinkIds, setSelectedDrinkIds] = useState<string[]>([]);

  const loadDrinks = async () => {
    try {
      // 1. Fetch menu drinks from MongoDB API
      const res = await fetch('/api/menu');
      let menuDrinks: DrinkItem[] = [];
      if (res.ok) {
        menuDrinks = await res.json();
      }

      // 2. Fetch custom created drinks from localStorage
      let customDrinks: DrinkItem[] = [];
      try {
        const stored = localStorage.getItem('alou_custom_drinks');
        if (stored) {
          customDrinks = JSON.parse(stored);
        }
      } catch (e) {
        console.error(e);
      }

      const all = [...customDrinks, ...menuDrinks];
      setAvailableDrinks(all);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDrinks();

    // Listen for new custom drink creations
    const handleStorageUpdate = () => loadDrinks();
    window.addEventListener('alou_custom_drinks_updated', handleStorageUpdate);
    return () => window.removeEventListener('alou_custom_drinks_updated', handleStorageUpdate);
  }, []);

  const toggleDrinkSelection = (drinkId: string) => {
    if (selectedDrinkIds.includes(drinkId)) {
      setSelectedDrinkIds(selectedDrinkIds.filter((id) => id !== drinkId));
    } else {
      setSelectedDrinkIds([...selectedDrinkIds, drinkId]);
    }
  };

  const EMOJI = {
    sparkle: '\u2728',      // ✨
    phone: '\u{1F4DE}',     // 📞
    person: '\u{1F464}',    // 👤
    party: '\u{1F389}',     // 🎉
    people: '\u{1F465}',    // 👥
    clock: '\u23F0',        // ⏰
    calendar: '\u{1F4C5}',  // 📅
    pin: '\u{1F4CD}',       // 📍
    flower: '\u{1F33A}',    // 🌺
    cup: '\u{1F379}',       // 🍹
    list: '\u{1F4CB}',      // 📋
    ingredient: '\u{1F9EA}',// 🧪
  };

  const handleSendWhatsAppInquiry = () => {
    let msg = `${EMOJI.sparkle} *Demande de Réservation Bar Événementiel - Alou Juice*\n`;
    msg += `-----------------------------------\n`;
    msg += `${EMOJI.person} *Nom:* ${clientName || 'Client'}\n`;
    msg += `${EMOJI.phone} *Téléphone:* ${clientPhone || 'Non spécifié'}\n`;
    msg += `${EMOJI.party} *Type d'événement:* ${selectedEventType.name}\n`;
    msg += `${EMOJI.people} *Nombre d'invités estimé:* ${guestCount} personnes\n`;
    msg += `${EMOJI.clock} *Durée du service:* ${durationHours} heures\n`;
    msg += `${EMOJI.calendar} *Date prévue:* ${eventDate || 'À définir'}\n`;
    msg += `${EMOJI.pin} *Lieu:* ${locationName || 'Nabeul / Cap Bon'}\n`;
    msg += `${EMOJI.flower} *Thème de décoration:* ${selectedTheme.name}\n`;
    
    // Add chosen drinks details
    if (selectedDrinkIds.length > 0) {
      msg += `-----------------------------------\n`;
      msg += `${EMOJI.list} *Boissons Sélectionnées pour l'événement:*\n`;
      
      const chosenDrinks = availableDrinks.filter(d => selectedDrinkIds.includes(d.id || (d as any)._id || ''));
      chosenDrinks.forEach((drink, index) => {
        const isCustom = drink.id?.startsWith('custom-') || drink.tags?.includes('Sur Mesure');
        msg += `\n${index + 1}. *${drink.name}* ${isCustom ? '(Création Sur Mesure 🎨)' : ''}`;
        
        // If it's a custom drink or has ingredients specified, include full ingredients breakdown!
        if (drink.ingredients && drink.ingredients.length > 0) {
          msg += `\n   ${EMOJI.ingredient} *Composition/Ingrédients:* ${drink.ingredients.join(', ')}`;
        }
      });
      msg += `\n`;
    }

    msg += `-----------------------------------\n`;
    msg += `Bonjour Ela, merci de me recontacter pour confirmer la disponibilité de la charette Alou Juice ! ${EMOJI.cup}`;

    const url = `https://api.whatsapp.com/send?phone=${BRAND_CONTACT.rawPhone}&text=${encodeURIComponent(msg)}`;
    window.location.href = url;
    setIsSubmitted(true);
  };

  return (
    <section id="events" className="py-20 bg-[#3a0f1d] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="font-script text-3xl text-[#f59e0b] block">Service Charette Événementielle</span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-white">
            Location du Bar à Jus Mobile pour Vos Événements Privés
          </h2>
          <p className="text-pink-100/80 text-sm sm:text-base">
            Sublimez vos mariages, outias, anniversaires et réceptions avec notre magnifique charette blanche décorée, nos verres aux rebords bonbons & un service jus frais d'exception à Nabeul et partout en Tunisie !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Calculator Form (7 cols) */}
          <div className="lg:col-span-7 bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 space-y-8">

            {/* Step 1: Event Type */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-pink-200 block">
                1. Sélectionnez le type d’événement:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedEventType(type)}
                    className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all flex items-center justify-between ${selectedEventType.id === type.id
                      ? 'border-amber-400 bg-amber-400/20 text-white shadow-lg'
                      : 'border-white/10 bg-black/20 text-pink-100 hover:bg-white/10'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{type.icon}</span>
                      {type.name}
                    </span>
                    {selectedEventType.id === type.id && (
                      <IconCheck className="w-4 h-4 text-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Guests & Duration Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-pink-200">
                  <span>Nombre d'invités:</span>
                  <span className="text-amber-400 font-extrabold text-sm">{guestCount} personnes</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={300}
                  step={10}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-white/20 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-pink-200">
                  <span>Durée du service:</span>
                  <span className="text-amber-400 font-extrabold text-sm">{durationHours} Heures</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={8}
                  step={1}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-white/20 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Step 3: Theme Decor Selection */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-pink-200 block">
                3. Thème de Décoration de la Charette:
              </label>
              <div className="space-y-2">
                {BAR_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`w-full p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${selectedTheme.id === theme.id
                      ? 'border-pink-400 bg-pink-500/20 text-white'
                      : 'border-white/10 bg-black/20 text-pink-100 hover:bg-white/10'
                      }`}
                  >
                    <div>
                      <span className="font-bold text-sm block text-amber-300">{theme.name}</span>
                      <span className="text-xs text-pink-100/70">{theme.desc}</span>
                    </div>
                    {selectedTheme.id === theme.id && <IconCheck className="w-5 h-5 text-pink-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Choose Drinks & Custom Creations */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-extrabold uppercase tracking-wider text-pink-200 block">
                  4. Sélectionnez les boissons au menu pour votre charette:
                </label>
                <span className="text-[11px] bg-amber-400/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {selectedDrinkIds.length} sélectionnée(s)
                </span>
              </div>

              {availableDrinks.length === 0 ? (
                <p className="text-xs text-pink-100/60 italic">Chargement de la carte des jus...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                  {availableDrinks.map((drink) => {
                    const id = drink.id || drink._id || '';
                    const isSelected = selectedDrinkIds.includes(id);
                    const isCustom = id.startsWith('custom-') || drink.tags?.includes('Sur Mesure');

                    return (
                      <div
                        key={id}
                        onClick={() => toggleDrinkSelection(id)}
                        className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400/25 text-white shadow-md'
                            : 'border-white/10 bg-black/20 text-pink-100 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold truncate text-white">{drink.name}</span>
                            {isCustom && (
                              <span className="text-[10px] bg-pink-500/80 text-white font-extrabold px-1.5 py-0.2 rounded-full shrink-0">
                                Sur Mesure 🎨
                              </span>
                            )}
                          </div>
                          {drink.ingredients && drink.ingredients.length > 0 && (
                            <span className="text-[10px] text-pink-200/70 truncate mt-0.5">
                              {drink.ingredients.join(', ')}
                            </span>
                          )}
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-amber-400 border-amber-400 text-black' : 'border-white/30'
                        }`}>
                          {isSelected && <IconCheck className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Client Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <input
                type="text"
                placeholder="Votre Nom Complète"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="bg-black/30 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-pink-200/50 focus:outline-none focus:border-amber-400"
              />
              <input
                type="tel"
                placeholder="Téléphone / WhatsApp"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="bg-black/30 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-pink-200/50 focus:outline-none focus:border-amber-400"
              />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="bg-black/30 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-pink-200/50 focus:outline-none focus:border-amber-400"
              />
              <input
                type="text"
                placeholder="Ville / Lieu de l'événement"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="bg-black/30 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-pink-200/50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Right Quote Summary & Action (5 cols) */}
          <div className="lg:col-span-5 bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400 space-y-6">

            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold text-gray-500 block uppercase">Estimation Instantanée</span>
                <h3 className="font-serif-heading text-xl font-bold text-[#3a0f1d]">Devis Charette Alou Juice</h3>
              </div>
              <IconSparkles className="w-6 h-6 text-amber-500" />
            </div>

            {/* Photo preview of cart */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-pink-200">
              <Image
                src="/assets/cart-3.jpg"
                alt="Charette Alou Juice Setup"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold bg-amber-500/90 px-3 py-1 rounded-full backdrop-blur-sm">
                  {selectedTheme.name}
                </span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 text-xs text-gray-600 border-b pb-4">
              <div className="flex justify-between">
                <span>Événement:</span>
                <strong className="text-gray-900">{selectedEventType.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Nombre de personnes:</span>
                <strong className="text-gray-900">{guestCount} convives</strong>
              </div>
              <div className="flex justify-between">
                <span>Service Barman & Matériel:</span>
                <strong className="text-gray-900">{durationHours} Heures incluses</strong>
              </div>
              <div className="flex justify-between">
                <span>Boissons choisies:</span>
                <strong className="text-[#e63963]">
                  {selectedDrinkIds.length > 0 ? `${selectedDrinkIds.length} sélectionnée(s)` : 'Toutes (selon carte)'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Inclus:</span>
                <strong className="text-emerald-700">Glaçons, Verres Rimés, Fruits Frais</strong>
              </div>
            </div>

            {/* Total Price Estimate Display */}
            {/*<div className="bg-pink-50 p-4 rounded-2xl text-center space-y-1">
              <span className="text-xs text-gray-500 uppercase font-semibold">Montant Estimé du Devis</span>
              <div className="text-3xl font-extrabold text-[#e63963]">
                ~ {estimatedTotal.toFixed(0)} <span className="text-lg">TND</span>
              </div>
              <span className="text-[10px] text-gray-500 block">
                *Tarif indicatif susceptible d'ajustement selon la localisation précise.
              </span>
            </div>*/}

            {/* Action CTA */}
            <button
              onClick={handleSendWhatsAppInquiry}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <IconWhatsApp className="w-5 h-5 text-white" />
              <span>Demander la Réservation via WhatsApp</span>
            </button>

            {isSubmitted && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl text-center">
                ✓ Demande envoyée sur WhatsApp ! Ela vous répondra très rapidement.
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
