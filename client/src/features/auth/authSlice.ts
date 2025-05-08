import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../interfaces/interfaces";
import { loginThunk, registerThunk } from "./authThunks";

const initialState: AuthState = {
  token: null,
  role: null,
  name: null,
  email: null,
  sub: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.sub = action.payload.sub;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.name = null;
      state.email = null;
      state.sub = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.token = token;
        state.role = user.role || null;
        state.name = user.name || null;
        state.email = user.email || null;
        state.sub = user._id;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.token = token;
        state.role = user.role || null;
        state.name = user.name || null;
        state.email = user.email || null;
        state.sub = user.id;
      });
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
