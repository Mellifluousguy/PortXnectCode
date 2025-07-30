import express from "express";
import {
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification,
    sendUserNotification,
    sendGlobalNotification,
    getAllNotifications
} from "../controllers/notificationController.js";
import userAuth from "../middleware/userAuth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", userAuth, getUserNotifications);
router.put("/:id/read", userAuth, markNotificationAsRead);
router.delete("/:id", userAuth, deleteNotification);
router.get("/admin/all", userAuth, isAdmin, getAllNotifications);
router.post("/admin/notify-user", userAuth, isAdmin, sendUserNotification);  // 🔹 For a single user
router.post("/admin/notify-all", userAuth, isAdmin, sendGlobalNotification); // 🔹 For all users


export default router;
