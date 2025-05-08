import mongoose, { Document, Schema } from "mongoose";

// 1. Define the TypeScript interface
export interface ICategory extends Document {
  name: string;
}

// 2. Create the Mongoose schema
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// 3. Create the model
const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
