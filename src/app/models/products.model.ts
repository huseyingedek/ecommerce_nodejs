import mongoose from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
}

const productsSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length >= 1 && v.length <= 4,
      message: 'A product must have between 1 and 4 images',
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const ProductModel = mongoose.model<IProduct>('Product', productsSchema);
export default ProductModel;