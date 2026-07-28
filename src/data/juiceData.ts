export interface DrinkItem {
  id: string;
  _id?: string;
  name: string;
  category: 'signature' | 'juices' | 'smoothies' | 'event';
  description: string;
  price: number; // in TND (Tunisian Dinar)
  image: string;
  tags: string[];
  popular?: boolean;
  accentColor: string;
  ingredients: string[];
  rimOptions?: string[];
}

export const SIGNATURE_DRINKS: DrinkItem[] = [
];

export interface CartItem {
  drink: DrinkItem;
  quantity: number;
  selectedRim: string;
  specialNote?: string;
}

export interface EventBookingDetails {
  eventType: string;
  guestCount: number;
  eventDate: string;
  location: string;
  selectedTheme: string;
  durationHours: number;
  contactName: string;
  phone: string;
  email: string;
  notes?: string;
}

export const EVENT_TYPES = [
  { id: 'wedding', name: 'Mariage / Outia', basePrice: 450, icon: '🎉' },
  { id: 'birthday', name: 'Anniversaire / Birthday Party', basePrice: 250, icon: '🎂' },
  { id: 'corporate', name: 'Événement d’Entreprise / Corporate', basePrice: 350, icon: '💼' },
  { id: 'reception', name: 'Réception Privée / Garden Party', basePrice: 300, icon: '✨' },
  { id: 'beach', name: 'Beach & Pool Party', basePrice: 320, icon: '🏖️' }
];

export const BAR_THEMES = [
  { id: 'floral', name: 'Floral Pastel & Vintage Cart', desc: 'Decorated with watercolor floral arches, lemon trees, and soft pastel colors.' },
  { id: 'tropical', name: 'Tropical Summer Chic', desc: 'Vibrant palms, exotic fruit displays, and bright festive colors.' },
  { id: 'gold', name: 'Elegance & Gold Glam', desc: 'Luxury golden accents, refined glass crystalware, and upscale mocktail station.' }
];

export const BRAND_CONTACT = {
  name: 'Alou Juice Bar',
  owner: 'Ela Ben Khedher',
  phone: '+216 96 079 666',
  rawPhone: '21696079666',
  email: 'contact@aloujuice.tn',
  address: 'Rue Hédi Chaker, Nabeul (FP6R+WRP)',
  city: 'Nabeul, Tunisia',
  googleMapsUrl: 'https://maps.google.com/?q=FP6R+WRP,+Nabeul,+Tunisia',
  instagram: '@alou_juice'
};
