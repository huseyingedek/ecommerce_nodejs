import { Router } from 'express';
import OrderController from '../app/controllers/order.controller';
import authMiddleware from '../app/middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, OrderController.createOrder);

export default router;