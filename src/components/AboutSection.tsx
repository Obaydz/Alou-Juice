'use client';

import React from 'react';
import Image from 'next/image';
import { BRAND_CONTACT } from '@/data/juiceData';
import { IconStar } from '@/components/Icons';

export const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/40 via-white to-pink-50/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Image side */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/assets/WhatsApp Image 2026-07-29 at 5.38.08 PM.jpeg"
                alt="Ela Ben Khedher Alou Juice"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-amber-400 font-script text-2xl">Fondatrice & Passionnée</span>
                <h3 className="font-serif-heading text-2xl font-bold">{BRAND_CONTACT.owner}</h3>
                <p className="text-xs text-gray-200">Artisan Juicière • Home Made Nabeul</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-script text-3xl text-[#e63963] block">Notre Histoire</span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#3a0f1d] leading-tight">
              La Passion du Jus Frais & l'Élégance de la Fête
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Né au cœur de <strong>Nabeul</strong>, la capitale des agrumes et des fleurs de Tunisie, <strong className="text-[#e63963]">Alou Juice</strong> est le fruit de la passion de <em>Ela Ben Khedher</em>. Notre engagement est simple: vous offrir des jus 100% naturels, pressés minute avec amour, et sublimés par une présentation féerique.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-pink-100 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-[#e63963] font-bold text-sm">
                  <IconStar className="w-4 h-4 text-amber-500" />
                  100% Home Made
                </div>
                <p className="text-xs text-gray-500">Pas de conservateurs, uniquement des fruits frais sélectionnés à maturité.</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-pink-100 shadow-sm space-y-1">
                <div className="flex items-center gap-2 text-[#e63963] font-bold text-sm">
                  <IconStar className="w-4 h-4 text-amber-500" />
                  Verres Rimés & Sucreries
                </div>
                <p className="text-xs text-gray-500">Chaque verre est une œuvre d'art gourmande avec bordures de bonbons et fleurs.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
