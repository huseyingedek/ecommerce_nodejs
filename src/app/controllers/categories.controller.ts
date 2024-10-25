import { Request, Response } from 'express';
import CategoryService from '../services/categories.services';

class CategoryController {
    public async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await CategoryService.getCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error });
        }
    }

    public async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching category', error });
        }
    }

    public async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const newCategory = await CategoryService.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: 'Error creating category', error });
        }
    }

    public async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const updatedCategory = await CategoryService.updateCategory(req.params.id, req.body);
            if (updatedCategory) {
                res.status(200).json(updatedCategory);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating category', error });
        }
    }

    public async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const deletedCategory = await CategoryService.deleteCategory(req.params.id);
            if (deletedCategory) {
                res.status(200).json(deletedCategory);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting category', error });
        }
    }
}

export default new CategoryController();