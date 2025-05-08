import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  patchCategory,
  deleteCategory,
} from "../controllers/categoryController";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.patch("/:id", patchCategory);
router.delete("/:id", deleteCategory);

export default router;
