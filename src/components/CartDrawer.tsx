'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { IconClose, IconTrash, IconPlus, IconMinus, IconWhatsApp, IconSparkles } from '@/components/Icons';

export const CartDrawer = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    totalItems,
    totalPrice,
    generateWhatsAppOrderUrl
  } = useCart();

  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    const url = generateWhatsAppOrderUrl(fulfillmentType, customerName, phone, address);
    window.location.href = url;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-white">
          <div className="flex items-center gap-2">
            <span className="font-serif-heading font-bold text-xl text-[#3a0f1d]">Votre Panier</span>
            <span className="bg-[#e63963] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IconClose />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-3">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-3xl">
                🍹
              </div>
              <p className="font-semibold text-gray-600 text-sm">Votre panier est vide pour l’instant.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-xs text-[#e63963] font-bold underline"
              >
                Parcourir la carte des jus
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm flex items-center gap-4"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-pink-50 flex-shrink-0">
                  <Image src={item.drink.image} alt={item.drink.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-heading font-bold text-sm text-[#3a0f1d] truncate">
                    {item.drink.name}
                  </h4>
                  <span className="text-[11px] text-[#e63963] font-semibold block">
                    Bord du verre: {item.selectedRim}
                  </span>
                  <span className="text-xs font-extrabold text-gray-900 block mt-0.5">
                    {(item.drink.price * item.quantity).toFixed(2)} TND
                  </span>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="p-1 bg-gray-100 rounded-md hover:bg-pink-100 text-gray-700"
                    >
                      <IconMinus />
                    </button>
                    <span className="text-xs font-bold px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="p-1 bg-gray-100 rounded-md hover:bg-pink-100 text-gray-700"
                    >
                      <IconPlus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-gray-400 hover:text-red-500 p-1.5"
                >
                  <IconTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-pink-100 bg-pink-50/50 space-y-4">
            
            {/* Fulfillment Options */}
            <div className="flex gap-2">
              <button
                onClick={() => setFulfillmentType('delivery')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                  fulfillmentType === 'delivery'
                    ? 'bg-[#3a0f1d] text-white border-[#3a0f1d]'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                🚚 Livraison Nabeul
              </button>
              <button
                onClick={() => setFulfillmentType('pickup')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                  fulfillmentType === 'pickup'
                    ? 'bg-[#3a0f1d] text-white border-[#3a0f1d]'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                🏬 Retrait Boutique
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Votre Nom"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white border border-pink-200 rounded-xl p-2.5 text-xs text-gray-800"
              />
              <input
                type="tel"
                placeholder="Numéro de Téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-pink-200 rounded-xl p-2.5 text-xs text-gray-800"
              />
              {fulfillmentType === 'delivery' && (
                <input
                  type="text"
                  placeholder="Adresse de livraison à Nabeul"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white border border-pink-200 rounded-xl p-2.5 text-xs text-gray-800"
                />
              )}
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between pt-2 border-t border-pink-200">
              <span className="text-xs font-bold text-gray-600 uppercase">Total de la commande:</span>
              <span className="text-2xl font-extrabold text-[#e63963]">
                {totalPrice.toFixed(2)} TND
              </span>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <IconWhatsApp className="w-5 h-5 text-white" />
              <span>Envoyer la Commande sur WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
