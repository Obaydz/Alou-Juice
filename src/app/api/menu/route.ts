import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { DrinkModel } from '@/models/Schemas';
import { SIGNATURE_DRINKS } from '@/data/juiceData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const drinks = await DrinkModel.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(drinks);
  } catch (error) {
    console.error('API Error /api/menu:', error);
    return NextResponse.json({ error: 'Failed to fetch drinks' }, { status: 500 });
  }
}
