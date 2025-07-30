import React, { useContext, useEffect, useState } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { AppContent } from '../context/LoginContent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const MyPosts = () => {
    const { backendUrl, userData, techColors, fetchOGImage, projectImages } = useContext(AppContent);
    const [projects, setProjects] = useState([]);

    // Normalize techColors to be case-insensitive
    const normalizedTechColors = Object.keys(techColors).reduce((acc, key) => {
        acc[key.toLowerCase()] = techColors[key]; // Store all keys in lowercase
        return acc;
    }, {});

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const userId = userData?._id;
                if (!userId) return;

                const response = await axios.get(`${backendUrl}/api/projects/user/${userId}`);
                setProjects(response.data.projects);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchProjects();
    }, [backendUrl, userData]);

    // Fetch OG images when projects are loaded
    useEffect(() => {
        projects.forEach((project) => {
            if (!projectImages[project._id]) { // Avoid duplicate fetches
                fetchOGImage(project.liveDemo, project._id);
            }
        });
    }, [projects]);


    const handleDelete = async (projectId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;

        try {
            const data = await axios.delete(`${backendUrl}/api/projects/${projectId}`);
            setProjects((prevProjects) => prevProjects.filter((p) => p._id !== projectId));
            if (data.success) {
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <NavBar />
            <SideBar />
            <div className='bg-sky-breeze flex flex-col gap-4 min-h-screen pl-[15%] md:pl-[22%] md:pr-20 pr-3 py-2 lg:py-5 ' >
                <motion.h2
                    variants={fadeIn("left", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.7 }}
                    className="text-xl p-4 shadow-sm bg-white rounded-md font-semibold">My Projects</motion.h2>

                {/* Project Cards */}
                <motion.div
                    variants={fadeIn("right", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.7 }}
                    className="grid bg-white p-4 rounded-md shadow-sm grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project._id} className="bg-white relative shadow-sm hover:shadow-lg rounded-lg overflow-hidden">
                                {/* OG Image from Context API */}
                                <img
                                    src={projectImages[project._id] || "https://via.placeholder.com/600"}
                                    alt={project.title}
                                    className="w-full h-50 object-cover"
                                    loading="lazy"
                                />

                                {/* Project Details */}
                                <div className='p-4 pt-0'>
                                    <h3 className="text-lg font-semibold mt-3">{project.title}</h3>
                                    <p className="text-gray-600 text-sm h-15 flex items-center">
                                        {project.description.length > 100
                                            ? project.description.slice(0, 100) + "..."
                                            : project.description}
                                    </p>

                                    {/* Tech Stack with Colored Badges */}
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {project.techs?.length > 0 ? (
                                            <>
                                                {project.techs.slice(0, 3).map((tech, index) => {
                                                    const formattedTech = tech.toLowerCase();
                                                    const colorClass = normalizedTechColors[formattedTech] || "bg-gray-200 text-black";

                                                    return (
                                                        <span key={index} className={`px-2 py-1 rounded-lg text-xs ${colorClass}`}>
                                                            {tech}
                                                        </span>
                                                    );
                                                })}
                                                {project.techs.length > 3 && (
                                                    <span className="px-2 py-1 rounded-full bg-gray-400 text-white text-xs">
                                                        +{project.techs.length - 3}
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-sm">No techs specified</span>
                                        )}
                                    </div>

                                    {/* Links & Delete Button */}
                                    <div className="flex justify-between mt-4 items-center">
                                        {/* Total Likes */}
                                        <p className="text-sm text-gray-500 ">
                                            <i className="fa-solid fa-heart text-red-400"></i> {project.likes?.length || 0}
                                        </p>
                                        <div className="flex gap-3 items-center">
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-700 hover:text-black text-lg"
                                                title="GitHub Repository"
                                            >
                                                <i className="fa-brands fa-github"></i>
                                            </a>
                                            <a
                                                href={project.liveDemo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-800 text-lg"
                                                title="Live Demo"
                                            >
                                                <i className="fa-solid fa-globe"></i>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="text-sm text-red-500 font-medium cursor-pointer absolute top-[-2%] right-[-2%] bg-red-100 px-4 py-3 rounded-full hover:bg-red-200"
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No projects found.</p>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default MyPosts;
