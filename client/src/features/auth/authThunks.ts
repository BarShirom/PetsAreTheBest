import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/authApi";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      return await loginUser(credentials.email, credentials.password);
    } catch (error) {
      console.error("Login error:", error);
      return thunkAPI.rejectWithValue("Login failed");
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (
    credentials: { name: string; email: string; password: string, role: string },
    thunkAPI
  ) => {
    try {
      return await registerUser(
        credentials.name,
        credentials.email,
        credentials.password
      );
    } catch (error) {
      console.error("Registration error:", error);
      return thunkAPI.rejectWithValue("Registration failed");
    }
  }
);
