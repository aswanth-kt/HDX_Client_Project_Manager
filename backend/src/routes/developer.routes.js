import { Router } from "express";
import { getDevelopers } from "../controllers/developer.controller.js";


const router = Router();

router.get("/get-developers", getDevelopers);


export default router;