import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["info", "warning", "success", "error"], required: true, default: "info" },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: "15d" }
});


export default mongoose.model("Notification", NotificationSchema);
