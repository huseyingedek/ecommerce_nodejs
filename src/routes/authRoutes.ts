import { Router } from 'express';
import UserController from '../app/controllers/auth.controller'
import limiter from '../app/middleware/rateLimiter';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', limiter, UserController.login);
router.post('/token', UserController.refreshAccessToken);
router.post('/check', UserController.check);

export default router;