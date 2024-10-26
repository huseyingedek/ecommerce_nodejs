import OrderModel, { IOrder } from '../models/order.model';
import ProductModel from '../models/products.model';

class OrderService {
  public async createOrder(
    userId: string,
    items: { productId: string; quantity: number }[],
    shippingAddress: string,
    paymentMethod: string,
    transactionId: string
  ): Promise<IOrder> {
    try {
      let totalAmount = 0;

      for (const item of items) {
        const product = await ProductModel.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        totalAmount += product.price * item.quantity;
      }

      const order = new OrderModel({
        userId,
        items,
        totalAmount,
        orderDate: new Date(),
        status: 'pending',
        shippingAddress,
        paymentMethod,
        transactionId,
      });

      await order.save();
      return order;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error creating order: ' + error.message);
      } else {
        throw new Error('Unknown error creating order');
      }
    }
  }
}

export default new OrderService();