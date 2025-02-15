// Local module imports
import UserModel from "../models/user.model.js";
import MessageModel from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

/**
 * Repository for handling message-related database operations.
 */
export default class MessageRepository {
  /**
   * Retrieves all the registered users except the authenticated user.
   * @param {string} userID - The ID of the authenticated user.
   * @returns {Promise<Array>} List of registered users.
   */
  async getUsers(userID) {
    try {
      const users = await UserModel.find({ _id: { $ne: userID } }).lean();
      return users;
    } catch (error) {
      throw new Error("Failed to retrieve users. Please try again later.");
    }
  }

  /**
   * Retrieves all the messages to and from the user.
   * @param {object} params - The request parameters to fetch the ID of the user to chat with.
   * @param {string} userID - The ID of the authenticated user.
   * @returns {Promise<Array>} List of registered users.
   */
  async getMessages(params, userID) {
    const { id: userToChatID } = params;
    const senderID = userID;
    try {
      // Retrieve messages
      const messages = await MessageModel.find({
        $or: [
          { senderID: senderID, receiverID: userToChatID },
          { senderID: userToChatID, receiverID: senderID },
        ],
      });
      return messages;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sends a message from the authenticated user to another user.
   * @param {Object} messageData - The message object containing text, image, or both.
   * @param {Object} params - The request parameters to fetch the ID of the user to chat with.
   * @param {string} userID - The ID of the authenticated user (sender).
   * @returns {Promise<Document>} The saved message document.
   */
  async sendMessage(messageData, params, userID) {
    const { text, image } = messageData;
    const { id: receiverID } = params;
    const senderID = userID;
    let imageUrl;

    try {
      // Upload image
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      // Create new message
      const newMessage = new MessageModel({
        senderID,
        receiverID,
        text,
        image: imageUrl,
      });

      await newMessage.save();
      return newMessage;
    } catch (error) {
      console.error("Repository Error: \n\n", error);
      throw error;
    }
  }
}
