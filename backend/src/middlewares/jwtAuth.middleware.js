import jwt from "jsonwebtoken";

/**
 * Middleware for JWT authentication.
 * Verifies the token and attaches the user ID to the request object.
 */
const jwtAuth = (req, res, next) => {
  // Token creation
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(400).json({ success: false, message: "Unauthorized." });
  }
  // Verification
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = payload.userID;

    // Call next middleware
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Authentication failed." });
  }
};

export default jwtAuth;
