import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getAllOrders } from "../../api/ordersApi";
import { Order } from "../../interfaces/interfaces";
import { RootState } from "../../app/store";

// Fetch all orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No auth token found");
    }

    try {
      return await getAllOrders(token);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      return thunkAPI.rejectWithValue("Failed to fetch orders");
    }
  }
);

// Add an order
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (order: Omit<Order, "_id">, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No auth token found");
    }

    try {
      return await createOrder(order, token);
    } catch (error) {
      console.error("Failed to create order:", error);
      return thunkAPI.rejectWithValue("Failed to create order");
    }
  }
);
