import express from "express";
import { validateScheme } from "../middlewares/schemaValidator.middleware";
import { newUser, user } from "../schemas/user";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", validateScheme(newUser), authController.registerUser);
router.post("/login", validateScheme(user), authController.loginUser);

export default router;
