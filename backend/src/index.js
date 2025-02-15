// Dependencies
import "./lib/env.js";
import express from "express";
import cookieParser from "cookie-parser";

// Local module imports
import { connectDB } from "./lib/dbConfig.js";
import authRouter from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);

// Launch
app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
