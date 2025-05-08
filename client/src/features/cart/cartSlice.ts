import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductWithQuantity, CartState } from "../../interfaces/interfaces";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductWithQuantity>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        console.log("🟡 Increased quantity", existingItem);
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.items.push(newItem);
        console.log("🟢 Added new item", newItem);
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity < 1) {
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
