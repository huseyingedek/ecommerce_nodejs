import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: { productId: mongoose.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  orderDate: Date;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  transactionId: string;
}

const OrderSchema: Schema<IOrder> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String, required: true },
});

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;