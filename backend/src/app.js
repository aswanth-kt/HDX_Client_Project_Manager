import express from "express";
import cors from "cors";
import "dotenv/config";


const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// import routes
import authRouter from "./routes/auth.routes.js";

app.use("/api/auth", authRouter);


export default app;