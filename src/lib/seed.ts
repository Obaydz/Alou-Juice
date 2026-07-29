import { dbConnect } from '@/lib/db';
import { AdminModel } from '@/models/Schemas';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  await dbConnect();

  // Seed Admin Account if none exists
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
}

