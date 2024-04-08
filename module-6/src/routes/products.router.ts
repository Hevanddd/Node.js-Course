import express from "express";
import productsController from "../controllers/products.controller";

const router = express.Router();

router.get("/", productsController.getProducts);
router.get("/:productId", productsController.getSingleProduct);

export default router;
