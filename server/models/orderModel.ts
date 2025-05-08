import mongoose, { Schema, Document } from "mongoose";

interface ProductWithQuantity {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  categoryId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: ProductWithQuantity[];
  totalAmount: number;
  date: string;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
