import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { GalleryModel } from '@/models/Schemas';
import { verifyAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { src, title, desc } = data;

    if (!src || !title || !desc) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const newItem = await GalleryModel.create({
      src,
      title,
      desc,
    });

    return NextResponse.json({ success: true, galleryItem: newItem });
  } catch (error) {
    console.error('API Error /api/admin/gallery:', error);
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
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
      return NextResponse.json({ error: 'Gallery item ID required' }, { status: 400 });
    }

    await dbConnect();
    await GalleryModel.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error DELETE /api/admin/gallery:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
