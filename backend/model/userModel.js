import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, default: "" },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },

    // Email Verification
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },

    // Password Reset
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },

    // Role Management
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // Profile Info
    bio: { type: String, default: "" },
    website: { type: String, default: "" },
    gitHub: { type: String, unique: true, sparse: true, default: undefined },
    LinkedIn: { type: String, unique: true, sparse: true, default: undefined },


    // Skills & Learning
    qualifications: { type: [String], default: [] },
    technicalSkills: { type: [String], default: [] },
    projectLearnings: { type: [String], default: [] },

    // Feed Swipes
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    skipped: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Linked Projects
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }]  // Fixed ref

  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
