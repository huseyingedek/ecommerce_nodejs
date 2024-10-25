import { Router } from 'express';
import CategoryController from '../app/controllers/categories.controller';
import { authMiddleware } from '../app/middleware/authMiddleware';

const router = Router();


router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', authMiddleware, CategoryController.createCategory);
router.put('/:id', authMiddleware, CategoryController.updateCategory);
router.delete('/:id', authMiddleware, CategoryController.deleteCategory);


export default router;