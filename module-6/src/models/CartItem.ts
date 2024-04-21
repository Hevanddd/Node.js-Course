import mongoose, { Schema, Document } from "mongoose";
import Product, { ProductEntity } from "./Product";

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

const CartItemSchema: Schema = new Schema({
  product: { type: Product.schema, required: true },
  count: { type: Number, required: true },
});

export default mongoose.model<CartItemEntity & Document>(
  "CartItem",
  CartItemSchema
);
