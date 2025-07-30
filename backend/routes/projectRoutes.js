import express from "express";
import { createProject, getAllProjects, getProjectById, deleteProject, likeProject, getUserProjects } from "../controllers/projectControl.js";
import userAuth from "../middleware/userAuth.js"; // Using the same auth middleware

const projectRouter = express.Router();

projectRouter.post("/add", userAuth, createProject);  
projectRouter.delete("/:id", userAuth, deleteProject);  
projectRouter.post("/like/:projectId", userAuth, likeProject);
projectRouter.get("/user/:userId", userAuth, getUserProjects);
projectRouter.get("/", getAllProjects);  

projectRouter.get("/:id", getProjectById);


export default projectRouter;
