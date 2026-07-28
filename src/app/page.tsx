import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { EventBookingSection } from '@/components/EventBookingSection';
import { DrinkMixer } from '@/components/DrinkMixer';
import { GallerySection } from '@/components/GallerySection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  return (
    <>
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
