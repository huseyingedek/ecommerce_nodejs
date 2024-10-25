import { Router } from 'express';
import usersRoutes from './usersRoutes';
import productsRoutes from './productsRoutes';
import categoriesRoutes from './categoriesRoutes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);

export default router;