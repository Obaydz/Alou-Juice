'use client';

import React from 'react';
import { BRAND_CONTACT } from '@/data/juiceData';
import { IconMapPin, IconPhone, IconMail, IconWhatsApp } from '@/components/Icons';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Contact Details (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-script text-3xl text-[#f59e0b] block">Retrouvez-Nous</span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-[#3a0f1d]">
              Commandez ou Rendez-Nous Visite à Nabeul
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Que ce soit pour une envie de jus frais dans la journée ou pour planifier la charette mobile de votre mariage, nous sommes à votre disposition !
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 bg-pink-50/60 rounded-2xl border border-pink-100">
                <div className="bg-[#e63963] text-white p-3 rounded-xl shadow-md">
                  <IconMapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#3a0f1d] text-sm">Notre Adresse à Nabeul</h4>
                  <p className="text-xs text-gray-600 font-medium mt-0.5">{BRAND_CONTACT.address}</p>
                  <a
                    href={BRAND_CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#e63963] hover:underline block mt-1"
                  >
                    Ouvrir dans Google Maps (Code Plus: FP6R+WRP) →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-amber-50/60 rounded-2xl border border-amber-100">
                <div className="bg-[#f59e0b] text-white p-3 rounded-xl shadow-md">
                  <IconPhone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#3a0f1d] text-sm">Téléphone & WhatsApp Direct</h4>
                  <p className="text-xs text-gray-600 font-medium mt-0.5">{BRAND_CONTACT.phone}</p>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${BRAND_CONTACT.rawPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-amber-800 hover:underline block mt-1"
                  >
                    Discuter directement sur WhatsApp →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-[#3a0f1d] text-white p-3 rounded-xl shadow-md">
                  <IconMail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#3a0f1d] text-sm">Adresse Courriel</h4>
                  <p className="text-xs text-gray-600 font-medium mt-0.5">{BRAND_CONTACT.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Callout Card (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#3a0f1d] via-[#2a0b15] to-[#4a1426] text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 border-2 border-amber-400">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full inline-block border border-emerald-400/30">
              ● Service Client Disponible
            </span>

            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold leading-tight">
              Une Question ? Une Commande Spéciale ?
            </h3>

            <p className="text-pink-100/80 text-xs sm:text-sm leading-relaxed">
              Discutez directement avec Ela Ben Khedher sur WhatsApp pour personnaliser votre commande quotidienne ou préparer le menu exclusif de votre fête.
            </p>

            <a
              href={`https://api.whatsapp.com/send?phone=${BRAND_CONTACT.rawPhone}&text=${encodeURIComponent('Bonjour Ela! Je souhaite commander des jus chez Alou Juice 🍹')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 text-base"
            >
              <IconWhatsApp className="w-6 h-6 text-white" />
              <span>Ouvrir WhatsApp ({BRAND_CONTACT.phone})</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
