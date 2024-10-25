import CategoryModel, { ICategory } from "../models/categories.model";

class CategoryService {
    public async getCategories(): Promise<ICategory[]> {
        return await CategoryModel.find().exec();
    }

    public async getCategoryById(id: string): Promise<ICategory | null> {
        return await CategoryModel.findById(id).exec();
    }

    public async createCategory(category: ICategory): Promise<ICategory> {
        const newCategory = new CategoryModel(category);
        return await newCategory.save();
    }

    public async updateCategory(id: string, category: ICategory): Promise<ICategory | null> {
        return await CategoryModel.findByIdAndUpdate(id, category, { new: true }).exec();
    }

    public async deleteCategory(id: string): Promise<ICategory | null> {
        return await CategoryModel.findByIdAndDelete(id).exec();
    }
}

export default new CategoryService();