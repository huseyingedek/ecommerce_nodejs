import mongoose from "mongoose";

export interface IProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
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
    image: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const ProductModel = mongoose.model<IProduct>('Product', productsSchema);
export default ProductModel;