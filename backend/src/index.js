// Dependencies
import "./lib/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Local module imports
import { connectDB } from "./lib/dbConfig.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// Launch
app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
