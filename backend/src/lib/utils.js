import jwt from "jsonwebtoken";

/**
 * Generates a jwt token.
 */
export const generateToken = (user, res) => {
  // Token creation
  const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Passing token in the cookie
  res.status(200).cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
