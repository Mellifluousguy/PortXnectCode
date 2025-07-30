import React, { useContext, useEffect, useState } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContent } from '../context/LoginContent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';


const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { userData, getUserData, backendUrl, techColors, projectImages, fetchOGImage } = useContext(AppContent);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userId = userData?._id;
        if (!userId) return;

        const response = await axios.get(`${backendUrl}/api/projects/user/${userId}`, {
          withCredentials: true
        });
        setProjects(response.data.projects);
      } catch (error) {
        toast.error(error.message)
      }
    };

    fetchProjects();
    getUserData();
  }, [backendUrl, userData]);

  useEffect(() => {
    projects.forEach((project) => {
      if (!projectImages[project._id]) {
        fetchOGImage(project.liveDemo, project._id);
      }
    });
  }, [projects, projectImages]);

  // Convert techColors keys to lowercase (case-insensitive storage)
  const normalizedTechColors = Object.keys(techColors).reduce((acc, key) => {
    acc[key.toLowerCase()] = techColors[key]; // Store all keys in lowercase
    return acc;
  }, {});

  return (
    <>
      <NavBar />
      <SideBar />
      <div className='bg-sky-breeze flex flex-col gap-4 min-h-screen pl-[15%] md:pl-[22%] md:pr-20 pr-3 py-2 lg:py-5 '>
        <motion.h1
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className='text-xl font-semibold shadow-sm bg-white rounded-lg p-5'>Dashboard</motion.h1>
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className='flex bg-white shadow-sm rounded-lg p-5 gap-4 relative flex-col md:flex-row items-center'>
          <NavLink className='px-4 py-2 rounded-md md:absolute self-end right-10 top-5 text-sm text-white bg-brand hover:bg-blue-500' to={'/edit-profile'}>
            <i className="fa-solid fa-pencil mr-2"></i>
            Edit Profile
          </NavLink>
          <img
            src={userData.gender === 'Male' ?
              `https://cdn3d.iconscout.com/3d/premium/thumb/man-3d-icon-download-in-png-blend-fbx-gltf-file-formats--pria-mohawk-jaket-boy-avatar-stylized-pack-people-icons-5823045.png?f=webp`
              : `https://cdn3d.iconscout.com/3d/premium/thumb/female-employee-3d-icon-download-in-png-blend-fbx-gltf-file-formats--business-woman-young-girl-entrepreneur-people-avatar-pack-professionals-icons-4308132.png?f=webp`
            }
            className={`h-40 rounded-full drop-shadow-sm ${userData.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-200'}`}
            alt="Profile Picture"
          />
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-semibold'>{userData.name}</h2>
            <span className='text-sm text-inner-text'>
              {userData.designation || 'Please add designation from the edit profile'}
            </span>
            <p className='text-sm text-justify'>
              {userData.bio || 'Please add bio from the edit profile'}
            </p>

            <div className='flex flex-wrap gap-2'>
              {userData.skills && userData.skills.length > 0 ? (
                userData.skills.map((skill, index) => {
                  const skillKey = skill.toLowerCase(); // Convert skill name to lowercase
                  const colorClasses = normalizedTechColors[skillKey] || 'bg-gray-200 text-black'; // Use normalized keys
                  return (
                    <span key={index} className={`px-4 py-2 rounded-lg text-xs ${colorClasses}`}>
                      {skill}
                    </span>
                  );
                })
              ) : (
                <span className="text-sm">Please add skills from the edit profile</span>
              )}
            </div>

          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.01 }}
          className='flex bg-white shadow-sm rounded-lg p-5 gap-4 flex-col '>
          <h2 className='text-lg font-semibold'>My Posts</h2>
          <div className='flex gap-4 flex-wrap'>
            {projects.length > 0 ? (
              projects.slice(0, 3).map((project, key) => ( // Added slice here
                <motion.div
                  variants={fadeIn("up", key * 0.1)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.7 }}
                  key={project._id} className="bg-white w-75 relative shadow-sm border border-gray-100 hover:shadow-lg rounded-lg overflow-hidden">
                  {/* Live Screenshot */}
                  <img
                    src={projectImages[project._id] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_pfTu5U9eZjL9mfSAdPwLnGsV-6L2IZNMdA&s"}
                    alt={project.title}
                    className="w-full h-50 object-cover"
                    loading='lazy'
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
                            const formattedTech = tech.toLowerCase(); // Convert tech name to lowercase
                            const colorClass = normalizedTechColors[formattedTech] || "bg-gray-200 text-black"; // Use normalized keys

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

                    <div className="flex justify-between mt-4 items-center">
                      {/* Total Likes */}
                      <p className="text-sm text-gray-500">
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
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No projects found.</p>
            )}

          </div>

          {/* ✅ Show More Button (Redirects to MyPosts page) */}
          {projects.length > 3 && (
            <button
              onClick={() => navigate('/my-post')}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-fit self-center"
            >
              Show More Posts
            </button>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default UserDashboard;
