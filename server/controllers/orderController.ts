import { RequestHandler } from "express";
import Order from "../models/orderModel";

// GET all orders (admin only or for dashboard)
export const getAllOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// GET orders for a specific user
export const getOrdersByUserId: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching user orders" });
  }
};

// POST a new order
export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { userId, items, totalAmount, date } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      date,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(400).json({ message: "Failed to create order" });
  }
};
