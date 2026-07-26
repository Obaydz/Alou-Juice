import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { DrinkModel } from '@/models/Schemas';
import { seedDatabase } from '@/lib/seed';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    await seedDatabase();
    const drinks = await DrinkModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(drinks);
  } catch (error) {
    console.error('API Error /api/menu:', error);
    return NextResponse.json({ error: 'Failed to fetch drinks' }, { status: 500 });
  }
}
