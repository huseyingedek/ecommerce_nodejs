import { Request, Response } from 'express';
import OrderService from '../services/order.services';

class OrderController {
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { userId, items, shippingAddress, paymentMethod, transactionId } = req.body;
      const order = await OrderService.createOrder(userId, items, shippingAddress, paymentMethod, transactionId);
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ message: 'Error creating order', error: errorMessage });
    }
  }
}

export default new OrderController();