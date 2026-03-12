import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

router.post("/register", registerUser);

router.post("/login", login)


export default router;