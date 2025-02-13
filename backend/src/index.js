import "./lib/env.js";
import express from "express";
import { connectDB } from "./lib/dbConfig.js";

// Routers
import authRouter from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT;

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
