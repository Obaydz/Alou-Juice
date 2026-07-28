import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { EventBookingSection } from '@/components/EventBookingSection';
import { DrinkMixer } from '@/components/DrinkMixer';
import { GallerySection } from '@/components/GallerySection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <>
      <Analytics />
      <Hero />
      <MenuSection />
      <EventBookingSection />
      <DrinkMixer />
      <GallerySection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
