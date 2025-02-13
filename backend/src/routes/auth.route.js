import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();
const authcontroller = new AuthController();

authRouter.post("/signup", (req, res, next) => {
  authcontroller.signup(req, res, next);
});

authRouter.post("/login", (req, res, next) => {
  authcontroller.login(req, res, next);
});

authRouter.post("/logout", (req, res, next) => {
  authcontroller.logout(req, res, next);
});

export default authRouter;
