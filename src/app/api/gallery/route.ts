import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { GalleryModel } from '@/models/Schemas';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const items = await GalleryModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error('API Error /api/gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}
