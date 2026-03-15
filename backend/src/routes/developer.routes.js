import { Router } from "express";
import { editProjectStatus, getAssignedProjects, getDevelopers } from "../controllers/developer.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

router.get("/get-developers", getDevelopers);

router.get("/assigned-projects", verifyJWT, getAssignedProjects)

router.patch("/change-status/:id", editProjectStatus);


export default router;