'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <CartProvider>
      {!isAdminPage && <Header />}
      {!isAdminPage && <CartDrawer />}
      <main id="main-content">{children}</main>
      {!isAdminPage && <Footer />}
    </CartProvider>
  );
}
