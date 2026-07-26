import { dbConnect } from '@/lib/db';
import { DrinkModel, GalleryModel, AdminModel } from '@/models/Schemas';
import { SIGNATURE_DRINKS } from '@/data/juiceData';
import bcrypt from 'bcryptjs';

const INITIAL_GALLERY = [
  {
    src: '/assets/cart-1.jpg',
    title: 'Charette Alou Juice & Bar à Bonbons',
    desc: 'Présentation élégante des jus frais et des verres décorés lors des réceptions.'
  },
  {
    src: '/assets/cart-2.jpg',
    title: 'Focus Carte Signature & Arbuste Citron',
    desc: 'Carte des jus aux motifs floraux et décorations faits maison.'
  },
  {
    src: '/assets/cart-3.jpg',
    title: 'Verres Décorés aux Rebords Bonbons',
    desc: 'Bords de verres colorés au sucre et bonbons pour une touche acidulée unique.'
  },
  {
    src: '/assets/menu-card.png',
    title: 'Menu Officiel Alou Juice Bar',
    desc: 'Golden Paradise, Sunset Cream, Sunny Coconut, Passion Sunrise.'
  }
];

export async function seedDatabase() {
  await dbConnect();

  // 1. Seed Admin Account if none exists
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const existingAdmin = await AdminModel.findOne({ username: adminUsername });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    await AdminModel.create({
      username: adminUsername,
      passwordHash,
    });
    console.log(`[Seed] Created admin user: ${adminUsername}`);
  }

  // 2. Seed Drinks if empty
  const drinkCount = await DrinkModel.countDocuments();
  if (drinkCount === 0) {
    await DrinkModel.insertMany(SIGNATURE_DRINKS);
    console.log(`[Seed] Seeded ${SIGNATURE_DRINKS.length} drinks into MongoDB`);
  }

  // 3. Seed Gallery if empty
  const galleryCount = await GalleryModel.countDocuments();
  if (galleryCount === 0) {
    await GalleryModel.insertMany(INITIAL_GALLERY);
    console.log(`[Seed] Seeded ${INITIAL_GALLERY.length} gallery items into MongoDB`);
  }
}
