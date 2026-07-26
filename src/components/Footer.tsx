'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_CONTACT } from '@/data/juiceData';

export const Footer = () => {
  return (
    <footer className="bg-[#230812] text-white pt-16 pb-12 border-t border-pink-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-pink-400 bg-white">
                <Image src="/assets/logo.png" alt="Alou Juice Logo" fill className="object-contain" />
              </div>
              <div>
                <span className="font-serif-heading text-lg font-bold text-white block">ALOU juice</span>
                <span className="font-script text-xs text-amber-400 block">Juice Bar & Event Cart</span>
              </div>
            </div>
            <p className="text-pink-200/70 text-xs leading-relaxed">
              Jus frais artisanaux pressés minute, mocktails gourmands et charette mobile événementielle à Nabeul, Tunisie.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-amber-400 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-pink-100/80">
              <li><Link href="#menu" className="hover:text-amber-300">Notre Carte des Jus</Link></li>
              <li><Link href="#events" className="hover:text-amber-300">Charette Événementielle</Link></li>
              <li><Link href="#mixer" className="hover:text-amber-300">Créez Votre Jus</Link></li>
              <li><Link href="#gallery" className="hover:text-amber-300">Galerie Photos</Link></li>
              <li><Link href="#contact" className="hover:text-amber-300">Contact & Accès</Link></li>
            </ul>
          </div>

          {/* Spécialités */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-amber-400 uppercase tracking-wider">Signatures</h4>
            <ul className="space-y-2 text-xs text-pink-100/80">
              <li>🍹 Golden Paradise</li>
              <li>🍓 Sunset Cream</li>
              <li>🥥 Sunny Coconut</li>
              <li>🌺 Passion Sunrise</li>
              <li>🍋 Mojito Menthe-Citron</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-amber-400 uppercase tracking-wider">Boutique Nabeul</h4>
            <p className="text-xs text-pink-100/80 leading-relaxed">
              {BRAND_CONTACT.address}
            </p>
            <p className="text-xs font-bold text-amber-300">
              Tél: {BRAND_CONTACT.phone}
            </p>
            <p className="text-xs text-pink-100/70">
              Email: {BRAND_CONTACT.email}
            </p>
          </div>
        </div>

        <div className="border-t border-pink-950 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-pink-300/60 gap-4">
          <p>© {new Date().getFullYear()} Alou Juice Bar. Tous droits réservés. Home Made by Ela Ben Khedher.</p>
          <p>Nabeul, Tunisie 🌸</p>
        </div>

      </div>
    </footer>
  );
};
