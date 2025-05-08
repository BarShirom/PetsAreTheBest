import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/interfaces";
import {
  getAllProducts,
  createProduct,
  patchProduct,
  removeProduct,
  getProductById,
} from "../../api/productsApi";
import { RootState } from "../../app/store";


export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No auth token found");

    try {
      return await getAllProducts(token);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

// Add new product
export const addProduct = createAsyncThunk(
  "products/add",
  async (
    newProduct: { name: string; price: number; categoryId: string, description: string, image: string },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No auth token found");

    try {
      return await createProduct(newProduct, token);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to add product");
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/update",
  async (product: Product, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No auth token found");

    try {
      return await patchProduct(product, token);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to update product");
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (_id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No auth token found");

    try {
      await removeProduct(_id, token);
      return _id;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to delete product");
    }
  }
);


export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (_id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No auth token found");

    try {
      return await getProductById(_id, token);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch product by ID");
    }
  }
);
