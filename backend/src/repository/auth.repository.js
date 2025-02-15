// Dependencies
import bcrypt from "bcryptjs";

// Local module imports
import UserModel from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

/**
 * Repository for handling user-related database operations.
 */
export default class AuthRepository {
  /**
   * Registers a new user, hashes the password, saves them to the database, and generates a token.
   * @param {Object} user - The user data.
   * @param {Object} res - The HTTP response object for setting cookies.
   * @returns {Promise<Object>} The created user document.
   */
  async signup(user, res) {
    const { password } = user;
    try {
      // Password hashing
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;

      // Adding user to DB
      const newUser = new UserModel(user);
      await newUser.save();

      // Token generation
      generateToken(newUser, res);

      // Return created user
      return newUser;
    } catch (error) {
      if (error.name === "ValidationError") {
        // Extract first validation error message
        const errorMessage = Object.values(error.errors)[0].message;
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  /**
   * Logs in a user by verifying credentials and generating a token.
   * @param {Object} user - The user data.
   * @param {Object} res - The HTTP response object for setting cookies.
   * @returns {Promise<Object>} The retrieved user document.
   * @throws {Error} If the user is not found or the password is incorrect.
   */
  async login(user, res) {
    try {
      // Find user
      const retrievedUser = await UserModel.findOne({ email: user.email });
      if (!retrievedUser) throw new Error("User not found.");

      // Validate password
      const comparedPassword = await bcrypt.compare(
        user.password,
        retrievedUser.password
      );
      if (!comparedPassword) throw new Error("Password incorrect.");

      // Generate Jwt token
      generateToken(retrievedUser, res);

      // Return user
      return retrievedUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
