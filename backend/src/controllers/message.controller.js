// Local module imports
import MessageRepository from "../repository/message.repository.js";

/**
 * Controller for handling messaging-related operations.
 */
export default class MessageController {
  constructor() {
    this.messageRepository = new MessageRepository();
  }

  async getUsers(req, res, next) {
    try {
      const users = await this.messageRepository.getUsers(req.userID);
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getMessages(req, res, next) {
    try {
      const result = await this.messageRepository.getMessages(
        req.params,
        req.userID
      );
      res.status(200).json({ success: true, message: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async sendMessage(req, res, next) {
    if (!req.body.text && !req.files?.image) {
      return res
        .status(400)
        .json({ success: false, message: "Empty message." });
    }

    const messageData = {
      text: req.body.text,
      image: req.files?.image.tempFilePath,
    };

    try {
      const result = await this.messageRepository.sendMessage(
        messageData,
        req.params,
        req.userID
      );
      res.status(200).json({ success: true, message: result });
    } catch (error) {
      console.error("Controller Error: \n\n", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
