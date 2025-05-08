import { RootState } from "../../app/store";

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersByUserId = (userId: string) => (state: RootState) => {
  return state.orders.orders.filter((order) => order.userId === userId);
};
