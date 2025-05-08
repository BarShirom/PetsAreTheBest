import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrdersState, Order } from "../../interfaces/interfaces";
import { fetchOrders, addOrder } from "./ordersThunks";

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
        }
      )
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
