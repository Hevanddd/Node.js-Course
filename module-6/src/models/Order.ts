import mongoose, { Schema, Document } from "mongoose";
import { randomUUID } from "crypto";
import CartItem, { CartItemEntity } from "./CartItem";

export enum ORDER_STATUS {
  CREATED = "created",
  COMPLETED = "completed",
}

export interface OrderEntity {
  id: string;
  userId: string;
  cartId: string;
  items: CartItemEntity[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema: Schema = new Schema(
  {
    id: { type: String, required: true, default: randomUUID, unique: true },
    userId: { type: String, required: true },
    cartId: { type: String, required: true },
    items: { type: [CartItem.schema], required: true },
    payment: {
      type: { type: String, required: true },
      address: { type: mongoose.Schema.Types.Mixed, required: false },
      creditCard: { type: mongoose.Schema.Types.Mixed, required: false },
    },
    delivery: {
      type: { type: String, required: true },
      address: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    comments: { type: String, required: true },
    status: { type: Object.values(ORDER_STATUS), required: true },
    total: { type: Number, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<OrderEntity & Document>("Order", OrderSchema);
