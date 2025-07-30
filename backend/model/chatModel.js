import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  seen: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now, expires: "7d" }
}, { timestamps: true }); // Adds createdAt & updatedAt automatically

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
export default Chat;
