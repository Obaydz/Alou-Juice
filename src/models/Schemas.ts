import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDrink extends Document {
  id: string;
  name: string;
  category: 'signature' | 'juices' | 'smoothies';
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  ingredients: string[];
  rimOptions?: string[];
  createdAt?: Date;
}

const DrinkSchema: Schema = new Schema<IDrink>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, enum: ['signature', 'juices', 'smoothies'], required: false, default: 'signature' },
    description: { type: String, required: true },
    price: { type: Number, required: false, default: 0 },
    image: { type: String, required: true },
    popular: { type: Boolean, default: false },
    ingredients: [{ type: String }],
    rimOptions: [{ type: String }],
  },
  { timestamps: true, id: false }
);

export const DrinkModel: Model<IDrink> =
  mongoose.models.Drink || mongoose.model<IDrink>('Drink', DrinkSchema);

export interface IGalleryItem extends Document {
  src: string;
  title: string;
  desc: string;
  createdAt?: Date;
}

const GallerySchema: Schema = new Schema<IGalleryItem>(
  {
    src: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

export const GalleryModel: Model<IGalleryItem> =
  mongoose.models.GalleryItem || mongoose.model<IGalleryItem>('GalleryItem', GallerySchema);

export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
}

const AdminSchema: Schema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const AdminModel: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
