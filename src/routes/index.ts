import { Router } from 'express';
import usersRoutes from './usersRoutes';
import productsRoutes from './productsRoutes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

export default router;