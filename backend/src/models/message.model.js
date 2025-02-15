import mongoose from "mongoose";

/**
 * Message schema definition.
 */
const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: String,
    image: String,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;
