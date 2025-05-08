import { UsersState, User } from "../../interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersThunks";

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;