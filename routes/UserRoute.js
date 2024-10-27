import express from "express";
import { register, login } from "../controller/userController.js";

const router = express.Router();

router.post("/register", register); // Route đăng ký người dùng
router.post("/login", login); // Route đăng nhập

export default router;
