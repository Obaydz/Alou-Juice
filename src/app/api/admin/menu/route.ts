import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { DrinkModel } from '@/models/Schemas';
import { verifyAdminToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { name, category, description, price, image, popular, ingredients, rimOptions } = data;

    if (!name || !description || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
    const newDrink = await DrinkModel.create({
      id,
      name,
      category: category || 'signature',
      description,
      price: Number(price) || 0,
      image,
      popular: Boolean(popular),
      ingredients: Array.isArray(ingredients) ? ingredients : (ingredients || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      rimOptions: Array.isArray(rimOptions) ? rimOptions : (rimOptions || '').split(',').map((s: string) => s.trim()).filter(Boolean),
    });

    return NextResponse.json({ success: true, drink: newDrink });
  } catch (error) {
    console.error('API Error /api/admin/menu:', error);
    return NextResponse.json({ error: 'Failed to add drink' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Drink ID required' }, { status: 400 });
    }

    await dbConnect();
    await DrinkModel.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error DELETE /api/admin/menu:', error);
    return NextResponse.json({ error: 'Failed to delete drink' }, { status: 500 });
  }
}
