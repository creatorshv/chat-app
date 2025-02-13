export default class AuthController {
  signup(req, res, next) {
    res.send("signup route");
  }
  login(req, res, next) {
    res.send("login route");
  }
  logout(req, res, next) {
    res.send("logout route");
  }
}
