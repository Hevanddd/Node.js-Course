import { randomUUID } from "crypto";
import mongoose, { Schema, Document } from "mongoose";

export interface UserEntity {
  id: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema<UserEntity>({
  id: { type: String, required: true, default: randomUUID() },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String },
});

export default mongoose.model<UserEntity & Document>("User", UserSchema);
