import axios from "./axiosConfig";
import { Order } from "../interfaces/interfaces";


export const getAllOrders = async (token: string): Promise<Order[]> => {
  const res = await axios.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createOrder = async (
  order: Omit<Order, "_id">,
  token: string
): Promise<Order> => {
  const res = await axios.post("/orders", order, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};