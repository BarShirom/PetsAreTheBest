import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getUserById, patchUser } from "../../api/usersApi";
import { RootState } from "../../app/store";
import { EditUser, User } from "../../interfaces/interfaces";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      return await getAllUsers(token);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  { userId: string; token: string; updateData: Partial<EditUser> }
>("users/updateUser", async ({ userId, token, updateData }, thunkAPI) => {
  try {
    return await patchUser(userId, token, updateData);
  } catch (error) {
    console.error("Update user error:", error);
    return thunkAPI.rejectWithValue("Failed to update user");
  }
});

export const getUser = createAsyncThunk(
  "users/getUser",
  async (userId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No auth token found");
    }

    try {
      return await getUserById(userId, token);
    } catch (error) {
      console.error("❌ Failed to get user:", error);
      return thunkAPI.rejectWithValue("Failed to get user");
    }
  }
);
