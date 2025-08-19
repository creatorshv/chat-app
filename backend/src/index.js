// Dependencies
import "./lib/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

// Local module imports
import { connectDB } from "./lib/dbConfig.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// Launch
server.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
