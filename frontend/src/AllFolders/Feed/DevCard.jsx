import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContent } from '../context/LoginContent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';


const DevCard = ({ user }) => {
    const imgRef = useRef(null);
    const { backendUrl, fetchOGImage, projectImages } = useContext(AppContent);
    const { techColors } = useContext(AppContent);
    const [featuredProject, setFeaturedProject] = useState('');
    const [flipped, setFlipped] = useState(false);

    const avatarUrl = `https://api.dicebear.com/9.x/bottts/webp?seed=${user.name}`;

    const normalizedTechColors = Object.keys(techColors).reduce((acc, key) => {
        acc[key.toLowerCase()] = techColors[key];
        return acc;
    }, {});


    useEffect(() => {
        const fetchFeatured = async () => {
            if (!user.projects?.length) return;

            const latestProjectId = user.projects[user.projects.length - 1]; // ✅ latest

            try {
                const res = await axios.get(`${backendUrl}/api/projects/${latestProjectId}`);
                setFeaturedProject(res.data.project); // store it in state
            } catch (error) {
                if (error.status == 404) {
                    toast.warning('User has not uploaded any project')
                }

                else {
                    toast.error(error.message);
                }
            }
        };

        fetchFeatured();
    }, [user.projects]);

    useEffect(() => {
        if (
            featuredProject &&
            featuredProject.liveDemo &&
            featuredProject._id &&
            !projectImages[featuredProject._id]
        ) {
            fetchOGImage(featuredProject.liveDemo, featuredProject._id);
        }
    }, [featuredProject, fetchOGImage, projectImages]);



    return (
        <motion.div
            variants={fadeIn("", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.01 }}
            className="relative w-[350px] h-[450px] perspective">
            <div className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}>

                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-xl flex flex-col items-center p-4">
                    <button
                        onClick={() => setFlipped(true)}
                        className="absolute top-2 right-2 text-xs px-3 py-1 bg-blue-500 text-white rounded-full"
                    >
                        <i className="fa-solid fa-right-left"></i>
                    </button>

                    <img
                        ref={imgRef}
                        src={avatarUrl}
                        alt="avatar"
                        className="w-24 h-24 p-2 border-white  shadow-md shadow-gray-400 rounded-full border-4 bg-gray-200 mt-4"
                    />

                    <h2 className="text-lg font-semibold mt-3">{user.name}</h2>
                    <p className="text-muted text-sm">@{user.username}</p>

                    {user.bio && <p className="text-justify text-sm mt-2 text-gray-700">{user.bio}</p>}



                    {/* Social Links */}
                    <div className="flex gap-4 mt-4 text-lg">
                        {user.website && <a href={user.website} target="_blank" rel="noreferrer"><i className="fa-solid fa-globe text-green-600"></i></a>}
                        <a href={user.gitHub} target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
                        <a href={user.LinkedIn} target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin text-blue-600"></i></a>
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden  rotate-y-180 bg-white rounded-xl shadow-xl p-4 flex flex-col">
                    <button
                        onClick={() => setFlipped(false)}
                        className="absolute top-2 right-2 text-xs px-3 py-1 bg-red-500 text-white rounded-full"
                    >
                        <i className="fa-solid fa-right-left"></i>
                    </button>

                    {/* Skills */}
                    <h2 className='mt-4 text-center font-semibold'>Skills</h2>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {user.technicalSkills.slice(0, 15).map((skill, idx) => {
                            const colorClass = normalizedTechColors[skill.toLowerCase()] || "bg-gray-200 text-black";
                            return (
                                <span key={idx} className={`px-2 shadow-xs py-1 text-xs rounded-md ${colorClass}`}>
                                    {skill}
                                </span>
                            );
                        })}
                        {user.technicalSkills.length > 15 && (
                            <span className="px-2 shadow-xs py-1 text-xs rounded-md bg-gray-200">+{user.technicalSkills.length - 15} more</span>
                        )}
                    </div>

                    <div className="overflow-y-auto">
                        <h3 className="text-lg font-semibold my-3 text-center">Featured Project</h3>

                        {featuredProject ? (
                            <div className="mb-2 p-2 text-sm bg-gray-100 rounded shadow-sm">
                                <h4 className="font-medium capitalize">{featuredProject.title}</h4>
                                <p className="text-gray-700">{featuredProject.description?.slice(0, 110)}...</p>

                                {featuredProject.techs?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {featuredProject.techs.slice(0, 4).map((tech, idx) => {
                                            const colorClass = normalizedTechColors[tech.toLowerCase()] || "bg-gray-200 text-black";
                                            return (
                                                <span key={idx} className={`px-2 shadow-xs py-1 text-xs rounded-md ${colorClass}`}>
                                                    {tech}
                                                </span>
                                            );
                                        })}
                                        {featuredProject.techs.length > 4 && (
                                            <span className="px-2 shadow-xs py-1 text-xs rounded-md bg-gray-200">+{featuredProject.techs.length - 4} more</span>
                                        )}
                                    </div>
                                )}
                                <a href={featuredProject.liveDemo} target='_blank'>
                                    <img src={projectImages[featuredProject._id]} className='mt-2 hover:brightness-95 max-h-27 w-full object-cover rounded-sm' alt={featuredProject.title} />
                                </a>
                            </div>
                        ) : (
                            <p className="text-center text-gray-600 italic">No project found.</p>
                        )}

                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DevCard;
