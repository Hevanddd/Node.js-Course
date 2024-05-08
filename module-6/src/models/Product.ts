import { randomUUID } from "crypto";
import mongoose, { Schema, Document } from "mongoose";

export interface ProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, default: randomUUID, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<ProductEntity & Document>(
  "Product",
  ProductSchema
);
