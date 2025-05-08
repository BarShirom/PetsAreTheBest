import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState } from "../../interfaces/interfaces";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./productsThunks";

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
        }
      )

      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (p) => p._id === action.payload._id // ✅ correct key
          );
          if (index !== -1) state.products[index] = action.payload;
        }
      )

      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (p) => p._id !== action.payload // ✅ correct key
          );
        }
      );
  },
});

export default productsSlice.reducer;

