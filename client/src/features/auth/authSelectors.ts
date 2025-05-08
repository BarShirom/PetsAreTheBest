import { RootState } from "../../app/store";

export const selectToken = (state: RootState) => state.auth.token;
export const selectRole = (state: RootState) => state.auth.role;
export const selectName = (state: RootState) => state.auth.name;
export const selectUserId = (state: RootState) => state.auth.sub;
export const selectEmail = (state: RootState) => state.auth.email