import axios from "./axiosConfig";
import { User } from "../interfaces/interfaces";

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  const res = await axios.post("/auth/login", { email, password });

  const { token, user } = res.data; 
  return { token, user };
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/auth/register", { name, email, password });
  const { token, user } = res.data;
  return { token, user };
};