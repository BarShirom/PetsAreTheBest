import { Router } from "express";
import {
  getAllOrders,
  getOrdersByUserId,
  createOrder,
} from "../controllers/orderController";

const router = Router();

router.get("/", getAllOrders); // e.g., /orders/
router.get("/user/:userId", getOrdersByUserId); // e.g., /orders/user/123
router.post("/", createOrder); // e.g., /orders/

export default router;
