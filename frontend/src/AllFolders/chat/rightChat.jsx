import React, { useContext, useEffect, useState } from 'react'
import { AppContent } from '../context/LoginContent'
import { toast } from 'react-toastify';
import axios from 'axios';

const RightChat = () => {
    const { chatUser, matchedUsers, techColors, userId, projectImages, backendUrl } = useContext(AppContent);
    const [togglePP, setTogglePP] = useState(true);
    const [projects, setProjects] = useState([]);


    const individualUser = (arr, id) => {
        return arr.find(individual => individual._id === id);
    }


    const individual = individualUser(matchedUsers, chatUser);
    const avatarUrl = `https://api.dicebear.com/9.x/bottts/webp?seed=${individual?.name}`;



    // Convert techColors keys to lowercase (case-insensitive storage)
    const normalizedTechColors = Object.keys(techColors).reduce((acc, key) => {
        acc[key.toLowerCase()] = techColors[key]; // Store all keys in lowercase
        return acc;
    }, {});


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const userId = individual?._id;
                if (!userId) return;

                const response = await axios.get(`${backendUrl}/api/projects/user/${userId}`);
                setProjects(response?.data?.projects);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchProjects();
    }, [backendUrl, individual]);

    // Fetch OG images when projects are loaded
    useEffect(() => {
        projects?.forEach((project) => {
            if (!projectImages[project._id]) { // Avoid duplicate fetches
                // fetchOGImage(project.liveDemo, project._id);
            }
        });
    }, [projects]);



    const handleLike = async (projectId) => {
        setProjects((prev) =>
            prev.map((project) => {
                if (project._id === projectId) {
                    const isLiked = project.likes.includes(userId); // ✅ current user
                    const updatedLikes = isLiked
                        ? project.likes.filter((id) => id !== userId)
                        : [...project.likes, userId];
                    return { ...project, likes: updatedLikes };
                }
                return project;
            })
        );

        try {
            await axios.post(`${backendUrl}/api/projects/like/${projectId}`, {}, {
                withCredentials: true,
            });
        } catch (err) {
            toast.error("Like update failed");
        }
    };




    return (
        <div className='flex flex-col w-full'>
            <div className='flex text-gray-500 font-semibold w-full shadow-sm bg'>
                <button onClick={() => setTogglePP(true)} className={`w-full  p-2 border-b-2 ${togglePP ? 'border-blue-500 text-blue-500' : 'border-white'}`} >Profile</button>
                <button onClick={() => setTogglePP(false)} className={`w-full  p-2 border-b-2 ${togglePP ? 'border-white' : 'border-blue-500 text-blue-500'}`}>Projects</button>
            </div>
            {
                togglePP ?
                    <div className='flex flex-col items-center overflow-auto p-4'>
                        <img className='text-4xl mb-4 h-[100px] p-3 font-semibold border-6 shadow-md border-white rounded-full bg-gray-200' src={avatarUrl} />
                        <h2 className='font-semibold text-lg'>{individual?.name}</h2>
                        <h3 className='text-gray-600 text-sm'>{individual?.designation}</h3>
                        <div className='flex gap-3 text-lg'>
                            {individual?.LinkedIn ? <a href={individual?.LinkedIn} className='text-blue-600'><i className="fa-brands fa-linkedin"></i></a> : ''}
                            {individual?.gitHub ? <a href={individual?.gitHub}><i className="fa-brands fa-github"></i></a> : ''}
                            {individual?.website ? <a href={individual?.website} className='text-brand'><i className="fa-solid fa-globe"></i></a> : ''}
                        </div>
                        <h4 className='self-start font-semibold text-gray-700'>About</h4>
                        <p className='text-[13px] text-gray-600 mb-3'>{individual?.bio}</p>

                        <h4 className='self-start font-semibold mb-1 text-gray-700'>Skills</h4>
                        <div className='flex flex-wrap gap-2 mb-3'>
                            {(individual?.technicalSkills || []).map((skill, index) => {
                                const skillKey = skill.toLowerCase(); // Convert skill name to lowercase
                                const colorClasses = normalizedTechColors[skillKey] || 'bg-gray-200 text-black';
                                return (
                                    <span key={index} className={`${colorClasses} py-1 px-2 rounded-sm text-xs`} > {skill}</span>
                                )
                            })}

                        </div>
                        <h4 className='self-start font-semibold mb-1 text-gray-700'>Qualifications</h4>
                        <div className='flex flex-wrap gap-2 mb-3'>
                            {(individual?.qualifications || []).map((qual, index) => {
                                return (
                                    <span key={index} className={`bg-gray-200 text-gray-700 text-xs p-2 rounded-sm `}>{qual}</span>
                                )
                            })}
                        </div>

                    </div>
                    :
                    <div className='m-4'>
                        <h3 className='font-semibold text-gray-700'>Recent Projects</h3>
                        <div className='flex flex-col mt-4'>
                            {projects.map((pro, index) => (
                                <div key={index} className='hover:shadow-lg relative rounded-lg border border-gray-100 overflow-hidden w-full'>
                                    <img src={pro.ogImage} className='h-[150px] w-full object-cover object-top' alt="" />
                                    <div className='m-2'>

                                        <h3 className='text-sm mb-2 capitalize font-semibold text-gray-700'>{pro.title}</h3>
                                        <p className='text-xs mb-4 text-gray-600'>{pro.description}</p>
                                        <div className='my-2 flex flex-wrap gap-2'>
                                            {(pro.techs || []).map((tech, index) => {
                                                const skillKey = tech.toLowerCase(); // Convert skill name to lowercase
                                                const colorClasses = normalizedTechColors[skillKey] || 'bg-gray-200 text-black';
                                                return (
                                                    <span key={index} className={`${colorClasses} py-1 px-2 rounded-sm text-xs`} > {tech}</span>
                                                )
                                            }
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleLike(pro._id)}
                                            className='text-gray-400 hover:text-red-600 flex items-center gap-1 text-sm'
                                        >

                                            <i className={`fa-solid text-lg fa-heart ${pro.likes.includes(userId) ? 'text-red-600' : ''}`}></i>
                                            {pro.likes.length}
                                        </button>
                                        <a className='right-2 font-semibold text-brand absolute bottom-2 text-sm' href={pro.liveDemo} target='_blank'>View Project</a>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
            }
        </div >
    )
}

export default RightChat