'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { IconShoppingBag, IconPhone, IconClose, IconSparkles } from '@/components/Icons';
import { BRAND_CONTACT } from '@/data/juiceData';

export const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-pink-100'
            : 'bg-gradient-to-b from-white/90 via-white/60 to-transparent py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 lg:gap-8">
          {/* Brand Logo */}
          <Link href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 overflow-hidden rounded-full border-2 border-pink-300 p-0.5 group-hover:scale-105 transition-transform bg-white shadow-sm">
              <Image
                src="/assets/logo.png"
                alt="Alou Juice Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif-heading text-lg sm:text-xl font-bold tracking-wide text-[#3a0f1d] block leading-none">
                ALOU <span className="text-[#e63963]">juice</span>
              </span>
              <span className="font-script text-xs sm:text-sm text-[#f59e0b] block tracking-wider leading-tight">
                Craft Juice & Event Bar
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Equal Spacing */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="#menu"
              className="text-sm font-semibold text-gray-700 hover:text-[#e63963] transition-colors whitespace-nowrap"
            >
              Nos Jus & Mocktails
            </Link>
            <Link
              href="#events"
              className="text-sm font-semibold text-gray-700 hover:text-[#e63963] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <IconSparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Bar Événementiel</span>
            </Link>
            <Link
              href="#mixer"
              className="text-sm font-semibold text-gray-700 hover:text-[#e63963] transition-colors whitespace-nowrap"
            >
              Créez Votre Jus
            </Link>
            <Link
              href="#gallery"
              className="text-sm font-semibold text-gray-700 hover:text-[#e63963] transition-colors whitespace-nowrap"
            >
              Galerie
            </Link>
            <Link
              href="#contact"
              className="text-sm font-semibold text-gray-700 hover:text-[#e63963] transition-colors whitespace-nowrap"
            >
              Contact & Accès
            </Link>
          </nav>

          {/* Action Buttons - Consistent Gap with Nav */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={`https://wa.me/${BRAND_CONTACT.rawPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs font-bold px-3.5 py-2 rounded-full transition-all shadow-sm"
            >
              <IconPhone className="w-4 h-4 text-emerald-600" />
              {BRAND_CONTACT.phone}
            </a>

            {/* Event Booking CTA Button with original Panier signature pink/rose colors */}
            <a
              href="#events"
              className="relative bg-gradient-to-r from-[#e63963] to-[#f472b6] text-white p-2.5 rounded-full shadow-md shadow-pink-500/25 hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 px-3.5 sm:px-4 text-xs font-bold"
            >
              <IconSparkles className="w-4 h-4 text-amber-200 shrink-0" />
              <span className="hidden sm:inline">Réserver un Bar</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Ouvrir le menu"
              className="md:hidden text-gray-700 p-2 rounded-full bg-pink-50/80 hover:bg-pink-100 transition-colors flex items-center justify-center border border-pink-200/60"
            >
              <svg className="w-6 h-6 text-[#3a0f1d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop & Drawer (rendered outside header tag so position:fixed top/left/right 0 covers full viewport correctly regardless of scroll header transform) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end">
          {/* Dark Overlay Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Slide Panel */}
          <div className="relative w-4/5 max-w-xs bg-white h-full p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full border border-pink-300 overflow-hidden bg-white">
                    <Image src="/assets/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <span className="font-serif-heading font-bold text-base text-[#3a0f1d]">Alou Juice Bar</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <IconClose className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav className="flex flex-col space-y-2 font-semibold text-gray-800">
                <Link
                  href="#menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3.5 rounded-xl hover:bg-pink-50 hover:text-[#e63963] transition-colors flex items-center justify-between"
                >
                  <span>Nos Jus & Mocktails</span>
                  <span className="text-xs text-pink-400">🍹</span>
                </Link>
                <Link
                  href="#events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3.5 rounded-xl hover:bg-pink-50 hover:text-[#e63963] transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <IconSparkles className="w-4 h-4 text-amber-500" />
                    <span>Bar Événementiel</span>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Populaire</span>
                </Link>
                <Link
                  href="#mixer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3.5 rounded-xl hover:bg-pink-50 hover:text-[#e63963] transition-colors flex items-center justify-between"
                >
                  <span>Créez Votre Jus</span>
                  <span className="text-xs text-pink-400">✨</span>
                </Link>
                <Link
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3.5 rounded-xl hover:bg-pink-50 hover:text-[#e63963] transition-colors flex items-center justify-between"
                >
                  <span>Galerie Photos</span>
                  <span className="text-xs text-pink-400">📸</span>
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3.5 rounded-xl hover:bg-pink-50 hover:text-[#e63963] transition-colors flex items-center justify-between"
                >
                  <span>Contact & Accès</span>
                  <span className="text-xs text-pink-400">📍</span>
                </Link>
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="border-t border-pink-100 pt-5 space-y-3">
              <a
                href={`https://api.whatsapp.com/send?phone=${BRAND_CONTACT.rawPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-colors text-sm"
              >
                <IconPhone className="w-4 h-4" />
                Commander sur WhatsApp
              </a>
              <p className="text-[11px] text-center text-gray-500 font-medium">
                Dar Chaabane, Nabeul • Livraisons & Bar Mobile
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

