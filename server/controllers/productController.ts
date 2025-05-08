import { Request, Response } from "express";
import Product from "../models/productModel";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, categoryId } = req.body;
    const product = new Product({ name, price, description, image, categoryId });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Failed to create product" });
  }
};

export const patchProduct = async (req: Request, res: Response) => {
  try {
     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
   await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
