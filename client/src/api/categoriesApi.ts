import axios from "./axiosConfig";
import { Category } from "../interfaces/interfaces";

// Get all categories
export const getAllCategories = async (token: string): Promise<Category[]> => {
  const res = await axios.get("/categories", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create a new category
export const createCategory = async (
  name: string,
  token: string
): Promise<Category> => {
  const res = await axios.post(
    "/categories",
    { name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Update a category
export const patchCategory = async (
  _id: string,
  name: string,
  token: string
): Promise<Category> => {
  const res = await axios.patch(
    `/categories/${_id}`,
    { name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Delete a category
export const removeCategory = async (
  _id: string,
  token: string
): Promise<void> => {
  await axios.delete(`/categories/${_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
