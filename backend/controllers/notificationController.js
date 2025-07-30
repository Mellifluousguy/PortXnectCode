import Notification from "../model/notificationModel.js";
import userModel from "../model/userModel.js";

/**
* @desc    Send Notification to a Specific User(Admin Only)
* @route   POST / api / admin / notify - user
* @access  Admin Only
*/
export const sendUserNotification = async (req, res) => {
    try {
        const { username, title, message, type = "info" } = req.body;

        if (!username || !title || !message) {
            return res.status(400).json({ success: false, message: "Username, Title & Message are required" });
        }

        // ✅ Find user by username
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Send notification to found user ID
        const notification = await Notification.create({
            userId: user._id,
            title,
            message,
            type,
        });

        res.status(201).json({ success: true, message: `Notification sent to ${username}`, notification });
    } catch (error) {
        console.error("Send Notification Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

/**
 * @desc    Send Notification to All Users (Admin Only)
 * @route   POST /api/admin/notify-all
 * @access  Admin Only
 */
export const sendGlobalNotification = async (req, res) => {
    try {
        const { title, message, type = "info" } = req.body;

        if (!title || !message) {
            return res.status(400).json({ success: false, message: "Title & Message are required" });
        }

        // ✅ Store a single global notification
        const notification = await Notification.create({
            userId: null,
            title,
            message,
            isRead: "true",
            type,
        });

        res.status(201).json({ success: true, message: "Global Notification sent", notification });
    } catch (error) {
        console.error("Global Notification Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};




/**
 * @desc    Get All Notifications (Admin)
 * @route   GET /api/notifications/
 * @access  Private (Admin)
 */

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .populate("userId", "username") // Populate only username
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch notifications" });
    }
};


/**
 * @desc    Get All Notifications (User)
 * @route   GET /api/notifications
 * @access  Private (User)
 */
export const getUserNotifications = async (req, res) => {
    try {
        const userNotifications = await Notification.find({
            $or: [{ userId: req.user.id }, { userId: null }]
        }).populate("userId", "username"); // Only fetch username

        res.status(200).json({ success: true, notifications: userNotifications });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};



/**
 * @desc    Mark Notification as Read
 * @route   PUT /api/notifications/:id/read
 * @access  Private (User)
 */
export const markNotificationAsRead = async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { isRead: true });

        res.status(200).json({ success: true, message: "Notification marked as read" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

/**
 * @desc    Delete Notification
 * @route   DELETE /api/notifications/:id
 * @access  Private (User)
 */
export const deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


export const createNotification = async (userId, title, message, type) => {
    try {
        const notification = new Notification({ userId, title, message, type });
        await notification.save();
    } catch (error) {
        console.error("Notification Error:", error);    
    }
};