import { Router } from "express";
import { createProject, dashboard, getProjects } from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { adminOnly } from "../middlewares/adminOnly.middlewares.js";


const router = Router();

router.post("/create-project", verifyJWT, adminOnly, createProject);

router.get("/get-project", verifyJWT, getProjects);

router.get("/dashboard", verifyJWT, adminOnly, dashboard);


export default router;