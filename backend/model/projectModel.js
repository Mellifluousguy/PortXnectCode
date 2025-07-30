import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  user: { type: [mongoose.Schema.Types.ObjectId], ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, unique: true },
  liveDemo: { type: String, required: true, unique: true },
  ogImage: { type: String, default: "" },
  techs: { type: [String], default: [] },
  stackType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;
