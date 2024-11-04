import ProductModel, { IProduct } from '../models/products.model';
import bucket from '../../config/firebase';

class ProductService {
  public async getProducts(): Promise<IProduct[]> {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error fetching products: ' + error.message);
      } else {
        throw new Error('Unknown error fetching products');
      }
    }
  }

  public async getProductById(productId: string): Promise<IProduct | null> {
    try {
      const product = await ProductModel.findById(productId);
      return product;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error fetching product: ' + error.message);
      } else {
        throw new Error('Unknown error fetching product');
      }
    }
  }

  public async createProduct(productData: IProduct): Promise<IProduct> {
    try {
      const imageUrls = await this.uploadImages(productData.images);
      const product = new ProductModel({ ...productData, images: imageUrls });
      return await product.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error creating product: ' + error.message);
      } else {
        throw new Error('Unknown error creating product');
      }
    }
  }

  public async updateProduct(productId: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    try {
      let product = await ProductModel.findById(productId);
      if (!product) {
        return null;
      }

      if (updateData.images && updateData.images.length > 0) {
        const newImageUrls = await this.uploadImages(updateData.images);
        updateData.images = [...product.images, ...newImageUrls];
      } else {
        updateData.images = product.images;
      }

      product = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
      return product;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error updating product: ' + error.message);
      } else {
        throw new Error('Unknown error updating product');
      }
    }
  }

  public async deleteProduct(productId: string): Promise<IProduct | null> {
    try {
      const product = await ProductModel.findByIdAndDelete(productId);
      return product;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error deleting product: ' + error.message);
      } else {
        throw new Error('Unknown error deleting product');
      }
    }
  }

  private async uploadImages(images: string[]): Promise<string[]> {
    const imageUrls: string[] = [];
    for (const image of images) {
      const buffer = Buffer.from(image, 'base64');
      const fileName = `products/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
      console.log(fileName);
      const file = bucket.file(fileName);
      await file.save(buffer, { contentType: 'image/jpeg', public: true });
      const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      imageUrls.push(url);
    }
    return imageUrls;
  }

  public async deleteImage(productId: string, fileName: string): Promise<void> {
    if (!fileName) {
      throw new Error('No file name provided');
    }
  
    try {
      const filePath = `products/${fileName}`;
      const file = bucket.file(filePath);
      await file.delete();
  
      const product = await ProductModel.findById(productId);
      if (product) {
        product.images = product.images.filter(image => image !== `https://storage.googleapis.com/e-commerce-1a832.appspot.com/${filePath}`);
        await product.save();
      }
    } catch (error) {
      throw new Error('Error deleting image: ' + (error as Error).message);
    }
  }
  

}

export default new ProductService();