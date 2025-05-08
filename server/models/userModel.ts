import mongoose, { Document, Schema } from "mongoose";

// 1. Define a TypeScript interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

// 2. Create the Mongoose schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// 3. Create the model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
