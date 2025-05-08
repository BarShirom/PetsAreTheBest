import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  patchProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", patchProduct);
router.delete("/:id", deleteProduct);

export default router;
