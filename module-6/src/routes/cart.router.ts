import express from "express";
import cartController from "../controllers/cart.controller";
import { validateScheme } from "../middlewares/schemaValidator.middleware";

import { userCartPostSchema } from "../schemas/userCartPost";

const router = express.Router();

router.get("/", cartController.getUserCart);
router.put(
  "/",
  validateScheme(userCartPostSchema, "Products are not valid"),
  cartController.updateUserCart
);
router.delete("/", cartController.deleteUserCart);
router.post("/checkout", cartController.createOrder);

export default router;
