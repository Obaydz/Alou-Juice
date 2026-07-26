import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { DrinkModel, GalleryModel, AdminModel } from '@/models/Schemas';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      MONGODB_URI_set: !!process.env.MONGODB_URI,
      MONGODB_URI_preview: process.env.MONGODB_URI?.slice(0, 40) + '...',
      NODE_ENV: process.env.NODE_ENV,
    },
    db: null,
    counts: null,
    drinks_sample: null,
    error: null,
  };

  try {
    await dbConnect();
    result.db = 'connected';

    const mongooseConn = mongoose.connection;
    const rawDb = mongooseConn.db;
    
    if (rawDb) {
      const collections = await rawDb.listCollections().toArray();
      const collectionNames = collections.map(c => c.name);
      
      const countsPerCollection: Record<string, number> = {};
      for (const name of collectionNames) {
        countsPerCollection[name] = await rawDb.collection(name).countDocuments();
      }

      result.collections = collectionNames;
      result.counts_per_collection = countsPerCollection;
    }

    const [drinkCount, galleryCount, adminCount] = await Promise.all([
      DrinkModel.countDocuments(),
      GalleryModel.countDocuments(),
      AdminModel.countDocuments(),
    ]);

    result.counts = { drinks: drinkCount, gallery: galleryCount, admins: adminCount };

    if (drinkCount > 0) {
      const sample = await DrinkModel.findOne().lean();
      result.drinks_sample = sample;
    }
  } catch (err: unknown) {
    result.error = err instanceof Error ? err.message : String(err);
    result.db = 'failed';
  }

  return NextResponse.json(result, { status: 200 });
}
