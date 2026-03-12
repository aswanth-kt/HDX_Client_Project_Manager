import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { adminOnly } from "../middlewares/adminOnly.middlewares.js";


const router = Router();

router.post("/create-project", verifyJWT, adminOnly, createProject);

router.get("/get-project", verifyJWT, getProjects);


export default router;