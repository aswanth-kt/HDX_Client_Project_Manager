import { Router } from "express";
import { createProject } from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { adminOnly } from "../middlewares/adminOnly.middlewares.js";


const router = Router();

router.post("/create-project", verifyJWT, adminOnly, createProject);


export default router;