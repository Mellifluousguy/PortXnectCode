import express from "express";
import { getAllUsers, deleteUser, getAllProjectsAdmin, deleteProjectAdmin, getUserRegistrationStats, getProjectSubmissionStats, editUserRole } from "../controllers/adminController.js";
import userAuth from "../middleware/userAuth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// ✅ Get All Users (Only Admin)
router.get("/users", userAuth, isAdmin, getAllUsers);

// ✅ Edit User (Only Admin)
router.put("/edit-user/:id", userAuth, isAdmin, editUserRole);

// ✅ Get  Users Created at (Only Admin)
router.get("/user-registration-stats", userAuth, isAdmin, getUserRegistrationStats);

// ✅ Delete Any User (Only Admin)
router.delete("/delete-user/:id", userAuth, isAdmin, deleteUser);

// ✅ Get all projects (Admin Only)
router.get("/projects", userAuth, isAdmin, getAllProjectsAdmin);

// ✅ Delete any project (Admin Only)
router.delete("/project/:id", userAuth, isAdmin, deleteProjectAdmin);

// ✅ Get  Users Created at (Only Admin)
router.get("/projectStats", userAuth, isAdmin, getProjectSubmissionStats);

export default router;
