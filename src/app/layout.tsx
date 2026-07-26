'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased selection:bg-pink-500 selection:text-white">
        <CartProvider>
          {!isAdminPage && <Header />}
          {!isAdminPage && <CartDrawer />}
          <main>{children}</main>
          {!isAdminPage && <Footer />}
        </CartProvider>
      </body>
    </html>
  );
}
