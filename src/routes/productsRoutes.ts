import { Router } from "express";
import ProductController from "../app/controllers/products.controller";
import { authMiddleware } from "../app/middleware/authMiddleware";

const router = Router();

router.get('/allproducts', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.post('/addproducts', authMiddleware, ProductController.createProduct);
router.put('/putproducts/:id', authMiddleware, ProductController.updateProduct);
router.delete('/deleteproducts/:id', authMiddleware, ProductController.deleteProduct);

export default router;