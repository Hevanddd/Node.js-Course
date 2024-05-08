import mongoose, { Schema, Document } from "mongoose";
import { randomUUID } from "crypto";
import CartItem, { CartItemEntity } from "./CartItem";

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

const CartSchema: Schema = new Schema(
  {
    id: { type: String, required: true, default: randomUUID, unique: true },
    userId: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
    items: { type: [CartItem.schema], required: true },
  },
  { versionKey: false }
);

export default mongoose.model<CartEntity & Document>("Cart", CartSchema);
