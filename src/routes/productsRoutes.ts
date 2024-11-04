import { Router } from "express";
import ProductController from "../app/controllers/products.controller";
import authMiddleware from "../app/middleware/auth.middleware";

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', authMiddleware, ProductController.createProduct);
router.put('/:id', authMiddleware, ProductController.updateProduct);
router.delete('/:id', authMiddleware, ProductController.deleteProduct);
router.delete('/:id/image/:fileName', ProductController.deleteImage);

export default router;