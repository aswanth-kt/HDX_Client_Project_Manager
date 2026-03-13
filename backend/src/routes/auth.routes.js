import { Router } from "express";
import { getMe, login, logout, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js"


const router = Router();

router.post("/register", registerUser);

router.post("/login", login);

router.get("/me", verifyJWT, getMe);

router.post("/logout", logout);


export default router;