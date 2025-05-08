import axios from "./axiosConfig";
import { Product } from "../interfaces/interfaces";


export const getAllProducts = async (token: string): Promise<Product[]> => {
  const res = await axios.get("/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const createProduct = async (
  product: Omit<Product, "_id">,
  token: string
): Promise<Product> => {
  const res = await axios.post("/products", product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const patchProduct = async (
  product: Product,
  token: string
): Promise<Product> => {
  const res = await axios.patch(`/products/${product._id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const removeProduct = async (
  _id: string,
  token: string
): Promise<void> => {
  await axios.delete(`/products/${_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const getProductById = async (
  _id: string,
  token: string
): Promise<Product> => {
  const res = await axios.get(`/products/${_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
