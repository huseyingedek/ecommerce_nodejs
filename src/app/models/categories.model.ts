import mongoose, { Document, Schema } from "mongoose";

export interface ISubcategory {
    name: string;
    isActive: boolean;
}

export interface ICategory extends Document {
    name: string;
    isActive: boolean;
    subcategories: ISubcategory[];
}

const subcategorySchema = new Schema<ISubcategory>({
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    subcategories: [subcategorySchema],
}, { timestamps: true });

const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);
export default CategoryModel;
