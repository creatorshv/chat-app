// Local module imports
import AuthRepository from "../repository/auth.repository.js";

export default class AuthController {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signup(req, res, next) {
    if (req.body.password.trim() == "") {
      return res
        .status(400)
        .json({ success: false, message: "Password is required." });
    }
    try {
      const result = await this.authRepository.signup(req.body, res);
      res.status(201).json({ success: true, message: result });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: `SignUp failed: ${error.message}` });
    }
  }

  async login(req, res, next) {
    if (req.body.email.trim() == "") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user email." });
    }
    if (req.body.password.trim() == "") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user password." });
    }

    try {
      const result = await this.authRepository.login(req.body, res);
      res.status(200).json({ success: true, message: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  logout(req, res, next) {
    res
      .status(200)
      .clearCookie("jwt")
      .json({ success: true, message: "Logged out." });
  }
}
