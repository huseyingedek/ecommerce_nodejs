import { Router } from 'express';
import authMiddleware from '../app/middleware/auth.middleware';
import UserController from '../app/controllers/users.controller';

const router = Router();

router.get('/:id', authMiddleware, UserController.getUserById);
router.put('/:id', authMiddleware, UserController.updateUser);

export default router;