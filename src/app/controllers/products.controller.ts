import { Request, Response } from 'express';
import ProductService from '../services/products.services';

class ProductController {
  public async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: (error as Error).message });
    }
  }

  public async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: (error as Error).message });
    }
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: (error as Error).message });
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: (error as Error).message });
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const deletedProduct = await ProductService.deleteProduct(req.params.id);
      if (deletedProduct) {
        res.status(200).json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: (error as Error).message });
    }
  }
}

export default new ProductController();