// Dependencies
import express from "express";

// Local module imports
import MessageController from "../controllers/message.controller.js";
import jwtAuth from "../middlewares/jwtAuth.middleware.js";

const messageRouter = express.Router();
const messageController = new MessageController();

// Routes
messageRouter.get("/users", jwtAuth, (req, res, next) => {
  messageController.getUsers(req, res, next);
});

messageRouter.get("/:id", jwtAuth, (req, res, next) => {
  messageController.getMessages(req, res, next);
});

messageRouter.post("/send/:id", jwtAuth, (req, res, next) => {
  messageController.sendMessage(req, res, next);
});

export default messageRouter;
