// Dependencies
import express from "express";

// Local module imports
import AuthController from "../controllers/auth.controller.js";
import jwtAuth from "../middlewares/jwtAuth.middleware.js";

const authRouter = express.Router();
const authcontroller = new AuthController();

// Routes
authRouter.post("/signup", (req, res, next) => {
  authcontroller.signup(req, res, next);
});

authRouter.post("/login", (req, res, next) => {
  authcontroller.login(req, res, next);
});

authRouter.get("/logout", jwtAuth, (req, res, next) => {
  authcontroller.logout(req, res, next);
});

export default authRouter;
