import { Router } from "express";
import { addClient, getAllClients, updateClient } from "../controllers/client.controller.js";
import { adminOnly } from "../middlewares/adminOnly.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

router.post("/add-client", verifyJWT, adminOnly, addClient);

router.put("/update-client/:clientId", verifyJWT, adminOnly, updateClient);

router.get("/get-clients", verifyJWT, adminOnly, getAllClients);

export default router;