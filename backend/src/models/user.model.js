import mongoose from "mongoose";

/**
 * User schema definition.
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(document, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
