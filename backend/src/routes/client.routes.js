import { Router } from "express";
import { addClient, deleteClient, getAllClients, updateClient } from "../controllers/client.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { adminOnly } from "../middlewares/adminOnly.middlewares.js";


const router = Router();

// middleware apply to all this router
router.use(verifyJWT, adminOnly);

router.post("/add-client", addClient);

router.put("/update-client/:clientId", updateClient);

router.get("/get-clients", getAllClients);

router.delete("/delete-client/:clientId", deleteClient);

export default router;