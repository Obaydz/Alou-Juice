'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconSparkles, IconWhatsApp, IconStar } from '@/components/Icons';
import { BRAND_CONTACT } from '@/data/juiceData';

export const Hero = () => {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#fff5f7] via-[#fffdfa] to-white">
      {/* Decorative Animated Floating Fruits & Glow Spheres */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-pink-200 shadow-sm rounded-full px-3.5 py-1.5 backdrop-blur-md max-w-full">
              <span className="flex h-2 w-2 rounded-full bg-[#e63963] animate-ping shrink-0" />
              <IconStar className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold text-gray-700 tracking-wide truncate">
                Home Made by Ela Ben Khedher • Dar Chaabane, Nabeul
              </span>
            </div>

            <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#3a0f1d] leading-tight sm:leading-tight">
              L’Élixir Frais & L’Art du <br className="hidden sm:inline" />
              <span className="font-script text-4xl sm:text-6xl lg:text-7xl text-gradient-pink-gold block font-normal mt-1 sm:mt-2">
                Juice Bar Événementiel
              </span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Savourez nos jus frais artisanaux, nos mocktails signatures aux bords de verres rimés de sucre & bonbons colorés, ou louez notre magnifique <strong className="text-[#3a0f1d]">Charette Mobile Alou Juice</strong> pour mariages, anniversaires et soirées privées.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 pt-1">
              <span className="bg-pink-50 border border-pink-100 text-[#e63963] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                🍹 Bords Sucrés & Candy Rims
              </span>
              <span className="bg-amber-50 border border-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                🌺 Décoration Florale & Mobile Cart
              </span>
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                🍋 Fruits Frais Pressés à la Minute
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href="#menu"
                className="w-full sm:w-auto bg-gradient-to-r from-[#e63963] to-[#f472b6] text-white font-bold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Commandez Vos Jus</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="#events"
                className="w-full sm:w-auto bg-white border-2 border-amber-400 text-[#3a0f1d] font-bold px-6 py-3 sm:px-7 sm:py-3.5 rounded-full hover:bg-amber-50 shadow-md hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <IconSparkles className="w-5 h-5 text-amber-500" />
                <span>Réserver la Charette Mobile</span>
              </Link>
            </div>
          </div>

          {/* Right Visual Image Hero */}
          <div className="lg:col-span-5 relative flex justify-center pt-4 lg:pt-0">
            {/* Visual Glass Frame */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden glass-card p-2.5 sm:p-3 shadow-2xl group border-2 border-pink-200">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/assets/cart-1.jpg"
                  alt="Alou Juice Bar Mobile Cart"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Logo Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl shadow-xl flex items-center gap-2 border border-pink-100">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                    <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <div>
                    <span className="font-serif-heading text-[11px] sm:text-xs font-bold text-[#3a0f1d] block">ALOU JUICE</span>
                    <span className="text-[9px] sm:text-[10px] text-pink-600 font-semibold">Home Made Quality</span>
                  </div>
                </div>

                {/* Floating Signature Menu Overlay Pill */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-pink-100 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium block truncate">Spécialité Signature</span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#3a0f1d] block truncate">Golden Paradise & Sunset</span>
                  </div>
                  <span className="bg-amber-400 text-burgundy text-[11px] sm:text-xs font-extrabold px-2.5 py-1 rounded-full shrink-0">
                    9.50 TND
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
