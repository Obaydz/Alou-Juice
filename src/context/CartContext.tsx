'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DrinkItem, CartItem, BRAND_CONTACT } from '@/data/juiceData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (drink: DrinkItem, rim?: string) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  totalPrice: number;
  generateWhatsAppOrderUrl: (fulfillmentType: 'delivery' | 'pickup', customerName: string, phone: string, address: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('alou_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('alou_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (drink: DrinkItem, rim?: string) => {
    const selectedRim = rim || (drink.rimOptions ? drink.rimOptions[0] : 'Classic Sugar');
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.drink.id === drink.id && item.selectedRim === selectedRim
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { drink, quantity: 1, selectedRim }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.drink.price * item.quantity, 0);

  const generateWhatsAppOrderUrl = (
    fulfillmentType: 'delivery' | 'pickup',
    customerName: string,
    phone: string,
    address: string
  ) => {
    let msg = `🍹 *Nouvelle Commande - Alou Juice Bar*\n`;
    msg += `-----------------------------------\n`;
    msg += `👤 *Nom:* ${customerName || 'Client'}\n`;
    msg += `📞 *Téléphone:* ${phone || 'Non spécifié'}\n`;
    msg += `📍 *Option:* ${fulfillmentType === 'delivery' ? 'Livraison à Nabeul' : 'Retrait en Boutique'}\n`;
    if (fulfillmentType === 'delivery' && address) {
      msg += `🏠 *Adresse:* ${address}\n`;
    }
    msg += `-----------------------------------\n\n`;
    msg += `*Articles Commandés:*\n`;

    cart.forEach((item, i) => {
      msg += `${i + 1}. *${item.drink.name}* (x${item.quantity})\n`;
      msg += `   • Finition bord du verre: ${item.selectedRim}\n`;
      msg += `   • Prix: ${(item.drink.price * item.quantity).toFixed(2)} TND\n\n`;
    });

    msg += `-----------------------------------\n`;
    msg += `💰 *TOTAL COMMANDE: ${totalPrice.toFixed(2)} TND*\n`;
    msg += `-----------------------------------\n`;
    msg += `Merci de me confirmer la prise en charge de ma commande ! 🌸`;

    return `https://api.whatsapp.com/send?phone=${BRAND_CONTACT.rawPhone}&text=${encodeURIComponent(msg)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPrice,
        generateWhatsAppOrderUrl
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
