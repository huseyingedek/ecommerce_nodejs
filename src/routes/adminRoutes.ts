import { Router } from 'express';
import authMiddleware from '../app/middleware/auth.middleware';
import AdminController from '../app/controllers/admin.controller';
import ProductController from '../app/controllers/products.controller';

const router = Router();

router.get('/users', authMiddleware, AdminController.getAllUsers);
router.post('/users', authMiddleware, AdminController.createUser);
router.put('/users/:id', authMiddleware, AdminController.updateUser);
router.delete('/users/:id', authMiddleware, AdminController.deleteUser);

router.get('/', ProductController.getAllProducts);
router.post('/', authMiddleware, ProductController.createProduct);
router.put('/:id', authMiddleware, ProductController.updateProduct);
router.delete('/:id', authMiddleware, ProductController.deleteProduct);
export default router;