import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCategories,
  createCategory,
  patchCategory,
  removeCategory,
} from "../../api/categoriesApi";
import { Category } from "../../interfaces/interfaces";
import { RootState } from "../../app/store";

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      return await getAllCategories(token);
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch categories");
    }
  }
);

// Add new category
export const addCategory = createAsyncThunk(
  "categories/add",
  async (name: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      return await createCategory(name, token);
    } catch {
      return thunkAPI.rejectWithValue("Failed to add category");
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ _id, name }: Category, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      return await patchCategory(_id, name, token);
    } catch {
      return thunkAPI.rejectWithValue("Failed to update category");
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (_id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      await removeCategory(_id, token);
      return _id;
    } catch {
      return thunkAPI.rejectWithValue("Failed to delete category");
    }
  }
);
