import ProductModel, { IProduct } from "../models/products.model";

class ProductService {
    public async getProducts(): Promise<IProduct[]> {
        return await ProductModel.find().exec();
    }

    public async getProductById(id: string): Promise<IProduct | null> {
        return await ProductModel.findById(id).exec();
    }

    public async createProduct(product: IProduct): Promise<IProduct> {
        const newProduct = new ProductModel(product);
        return await newProduct.save();
    }

    public async updateProduct(id: string, product: IProduct): Promise<IProduct | null> {
        return await ProductModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    public async deleteProduct(id: string): Promise<IProduct | null> {
        return await ProductModel.findByIdAndDelete(id).exec();
    }
}

export default new ProductService();
