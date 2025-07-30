import userModel from "../model/userModel.js";
import Project from "../model/projectModel.js";
import transporter from "../config/nodemailer.js";
import { createNotification } from "./notificationController.js";
import { accountDeletedEmail, projectDeletedEmail} from '../templates/emailTemplates.js'


/**
 * @desc    Get All Users
 * @route   GET /api/admin/users
 * @access  Admin Only
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @desc    Delete a User
 * @route   DELETE /api/admin/delete-user/:id
 * @access  Admin Only
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { email, username } = user;

    // Delete all projects of the user
    await Project.deleteMany({ user: id });

    // Send account deletion email
    const emailContent = accountDeletedEmail(username);
    const mailOptions = {
      from: process.env.SMTPWELCOME_ID,
      to: email,
      subject: emailContent.subject,
      html: emailContent.message,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    // Delete user account
    await user.deleteOne();
    
    await createNotification(user._id, "Your account has been deleted by the admin!", "error");

    res.json({ success: true, message: "User, projects deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: `${error} Server Error`, error: error.message });
  }
};



/**
 * @desc    Get all projects (Admin Only)
 * @route   GET /api/admin/projects
 * @access  Private (Admin)
 */
export const getAllProjectsAdmin = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "username email");
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @desc    Delete any project (Admin Only)
 * @route   DELETE /api/admin/project/:id
 * @access  Private (Admin)
 */
export const deleteProjectAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate("user"); // Populate user data

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const user = project.user; // User who owns the project

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate email content
    const emailContent = projectDeletedEmail(user.username, project.title);

    const mailOptions = {
      from: process.env.SMTPWELCOME_ID,
      to: user.email, // Fetch user email
      subject: emailContent.subject,
      html: emailContent.message,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    // Remove project from DB
    await project.deleteOne();

    // Remove project reference from User's projects list
    await userModel.findByIdAndUpdate(user._id, {
      $pull: { projects: id },
    });

    await createNotification(post.userId, "Admin deleted your post!", "warning");
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: `${error} Server Error`, error: error.message });
  }
};



/**
 * @desc    get user created (Admin Only)
 * @route   GET /api/admin/user-registration-stats
 * @access  Private (Admin)
 */

export const getUserRegistrationStats = async (req, res) => {
  try {
    const userStats = await userModel.aggregate([
      {
        $match: { createdAt: { $ne: null } } // Exclude documents with null createdAt
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sorting by date
    ]);

    res.json({ success: true, data: userStats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

/**
 * @desc    get project published (Admin Only)
 * @route   GET /api/admin/projectStats
 * @access  Private (Admin)
 */

export const getProjectSubmissionStats = async (req, res) => {
  try {
    const userStats = await Project.aggregate([
      {
        $match: { createdAt: { $ne: null } } // Exclude documents with null createdAt
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sorting by date
    ]);

    res.json({ success: true, data: userStats });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



/**
 * @desc    Edit User Role (Admin Only)
 * @route   PUT /api/admin/edit-user/:id
 * @access  Admin Only
 */
export const editUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (role) {
      user.role = role;
      await user.save();
    }

    res.status(200).json({ success: true, message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
