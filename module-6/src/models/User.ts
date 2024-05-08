import { randomUUID } from "crypto";
import mongoose, { Schema, Document } from "mongoose";

export interface UserEntity {
  id: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, default: randomUUID() },
});

export default mongoose.model<UserEntity & Document>("User", UserSchema);
