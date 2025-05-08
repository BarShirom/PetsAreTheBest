import axios from "./axiosConfig";
import { User, EditUser } from "../interfaces/interfaces";

export const getAllUsers = async (token: string): Promise<User[]> => {
  const res = await axios.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserById = async (
  userId: string,
  token: string
): Promise<User> => {
  const res = await axios.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const patchUser = async (
  userId: string,
  token: string,
  updateData: Partial<EditUser>
): Promise<User> => {
  const res = await axios.patch(`/users/${userId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
