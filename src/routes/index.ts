import { Router } from 'express';
import authRoutes from './authRoutes';
import productsRoutes from './productsRoutes';
import categoriesRoutes from './categoriesRoutes';
import usersRoutes from './usersRoutes';
import orderRoutes from './orderRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);

export default router;