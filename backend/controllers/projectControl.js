import Project from "../model/projectModel.js";
import User from "../model/userModel.js";

/**
 * @desc    Create a new project
 * @route   POST /api/projects/add
 * @access  Private
 */
export const createProject = async (req, res) => {
  try {
    const { title, description, githubLink, liveDemo, userId, techs, stackType } = req.body;

    if (!title || !description || !liveDemo || !stackType) {
      return res.status(400).json({ message: "Title, description, live demo, and stack type are required" });
    }

    // ✅ Check if GitHub or Live Link already exists
    const existingProject = await Project.findOne({
      $or: [
        { githubLink: githubLink || null },
        { liveDemo: liveDemo }
      ]
    });

    if (existingProject) {
      return res.status(409).json({ message: "Project with same GitHub or Live Demo link already exists" });
    }

    // ✅ Generate OG Image URL from liveDemo link
    const ogImage = `https://image.thum.io/get/${liveDemo}`;

    const newProject = new Project({
      user: userId,
      title,
      description,
      githubLink,
      liveDemo,
      techs: techs || [],
      stackType,
      ogImage,
    });

    const savedProject = await newProject.save();

    await User.findByIdAndUpdate(userId, {
      $push: { projects: savedProject._id },
    });

    res.status(201).json({ message: "Project created successfully", project: savedProject });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};


/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "username");
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get a single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("user", "username")
      .lean();

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ 
      project
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private
 */
export const deleteProject = async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await project.deleteOne();

    await User.findByIdAndUpdate(userId, {
      $pull: { projects: req.params.id },
    });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Like/Unlike a project
 * @route   POST /api/projects/like/:projectId
 * @access  Private
 */
export const likeProject = async (req, res) => {
  try {
    const { userId } = req.body;
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const index = project.likes.indexOf(userId);
    if (index === -1) {
      project.likes.push(userId);
    } else {
      project.likes.splice(index, 1);
    }

    await project.save();
    res.status(200).json({ message: "Like updated", likes: project.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get projects by a specific user
 * @route   GET /api/projects/user/:userId
 * @access  Private
 */
export const getUserProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    const projects = await Project.find({ user: userId }).populate("user", "username");
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
