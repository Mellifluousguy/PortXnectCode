import React, { useContext, useState } from 'react';
import Navbar from './NavBar';
import SideBar from './SideBar';
import qualificationOptions from './qualificationArray.json';
import { AppContent } from '../context/LoginContent';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants'; // Adjust path if needed


const EditProfile = () => {
    const { userData, backendUrl, getUserData } = useContext(AppContent);
    const [bioLength, setBioLength] = useState('');
    const [projectLength, setProjectLength] = useState('');
    const [skills, setSkills] = useState(userData?.skills || []);
    const [skillInput, setSkillInput] = useState('');


    const [name, setName] = useState(userData?.name || '');
    const [bio, setBio] = useState(userData?.bio || '');
    const [website, setWebsite] = useState(userData?.website || '');
    const [gender, setGender] = useState(userData?.gender || '');
    const [designation, setDesignation] = useState(userData?.designation || '');
    const [qualifications, setQualifications] = useState(userData?.qualifications || []);
    const [projectLearnings, setProjectLearnings] = useState(userData?.projectLearnings || '');
    const [linkedIn, setLinkedIn] = useState(userData?.LinkedIn || '');
    const [gitHub, setGitHub] = useState(userData?.gitHub || '');




    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const requiredFields = {
            name,
            bio,
            website,
            gender,
            designation,
            gitHub,
            linkedIn
        };

        const missingFields = Object.entries(requiredFields).filter(
            ([key, value]) => !value.trim() && !userData[key]
        );

        if (missingFields.length > 0) {
            const firstMissing = missingFields[0][0];
            toast.error(`${firstMissing} is required`);
            return;
        }
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/edit-profile`, {
                userId: userData._id,
                name,
                bio,
                gender,
                website,
                qualifications,
                technicalSkills: skills,
                projectLearnings,
                designation,
                gitHub,      // ✅ FIXED
                LinkedIn: linkedIn,    // ✅ FIXED
            });


            if (data.success) {
                toast.success('Profile updated successfully');
                getUserData();
            } else {
                toast.error(data.message);
                console.log(data);

            }
        } catch (error) {
            toast.info(error.message);
        }
    };





    // Add Qualification
    const handleAddQualification = (e) => {
        const selectedQual = e.target.value;
        if (selectedQual && !qualifications.includes(selectedQual)) {
            setQualifications((prev) => [...prev, selectedQual]);
        }
        e.target.value = ''; // Reset selection
    };

    // Remove Qualification
    const removeQualification = (index) => {
        setQualifications((prev) => prev.filter((_, i) => i !== index));
    };


    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            setSkills((prev) => [...prev, skillInput.trim()]);
            setSkillInput('');
            e.preventDefault();
        }
    };

    const removeSkill = (index) => {
        setSkills((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            <Navbar />
            <SideBar />

            <form className='bg-sky-breeze flex flex-col gap-4 min-h-screen pl-[15%] md:pl-[22%] md:pr-20 pr-3 py-2 lg:py-5 ' onSubmit={onSubmitHandler}>
                <div className='bg-white shadow-sm rounded-lg p-5'>
                    <motion.h2
                        variants={fadeIn("up", 0.1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className='font-semibold text-xl'>Edit Profile</motion.h2>
                    <motion.p
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className='text-sm text-muted'>Update your profile information and settings</motion.p>
                    <div className='py-8 md:px-4 flex flex-col text-sm gap-4'>
                        <motion.h2
                            variants={fadeIn("up", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='font-semibold'>Personal Information</motion.h2>

                        <motion.div
                            variants={fadeIn("up", 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id='name' name='name' onChange={(e) => { setName(e.target.value) }} placeholder={userData.name || `Ex: Mohit Gupta`} className='border border-gray-300  px-2 rounded-md py-2' />
                        </motion.div>
                        <motion.div
                            variants={fadeIn("up", 0.5)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="username">UserName</label>
                            <input type="text" id='username' name='username' value={userData.username} disabled placeholder='Ex: portxnect' className='border text-muted cursor-not-allowed border-gray-300 rounded-md px-2 py-2' />
                        </motion.div>
                        <motion.div
                            variants={fadeIn("up", 0.6)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="email">Email</label>
                            <input type="text" id='email' name='email' placeholder='Ex: abc@xyz.com' value={userData.email} disabled className='border cursor-not-allowed text-muted border-gray-300 rounded-md px-2 py-2' />
                        </motion.div>
                        <motion.div
                            variants={fadeIn("up", 0.7)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="gender">Gender</label>
                            <select
                                id='gender'
                                name='gender'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className='border border-gray-300 rounded-md px-2 py-2 mt-2 bg-white text-gray-700'
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </motion.div>

                        <motion.div
                            variants={fadeIn("up", 0.8)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.01 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="Bio">Bio</label>
                            <textarea
                                id='bio'
                                name='bio'
                                placeholder={userData.bio || `Ex: Hi, I am ${userData.name}, a passionate Web Developer skilled in React, Node.js, and MongoDB. I love building innovative projects and learning new technologies.`}
                                onChange={(e) => {
                                    setBioLength(e.target.value);
                                    setBio(e.target.value)
                                }
                                }
                                className='resize-none h-[140px] rounded-md border border-gray-300 px-2 py-2'
                                maxLength={300}
                                minLength={50}
                            />
                            <span className='text-xs text-gray-500 mt-1'>{`${bioLength.length}/300 characters`}</span>
                        </motion.div>
                        <motion.div
                            variants={fadeIn("up", 0.1)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="website">Website</label>
                            <input type="url" id='website' onChange={(e) => { setWebsite(e.target.value) }} name='website' placeholder={userData.website || `Ex: www.abcxyz.com`} className='border border-gray-300 rounded-md px-2 py-2' />
                        </motion.div>

                        <motion.div
                            variants={fadeIn("up", 0.2)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="LinkedIn">LinkedIn</label>
                            <input type="url" id='LinkedIn' onChange={(e) => { setLinkedIn(e.target.value) }} name='LinkedIn' placeholder={userData.LinkedIn || `Ex: https://linkedin.com/in/abcxyz`} className='border border-gray-300 rounded-md px-2 py-2' />
                        </motion.div>

                        <motion.div
                            variants={fadeIn("up", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="gitHub">Github</label>
                            <input type="url" id='gitHub' onChange={(e) => { setGitHub(e.target.value) }} name='gitHub' placeholder={userData.gitHub || `Ex: https://github.com/abcxyz`} className='border border-gray-300 rounded-md px-2 py-2' />
                        </motion.div>
                    </div>
                </div>

                {/* Professional Details */}
                <div className='bg-white shadow-sm rounded-lg p-5'>
                    <motion.h2
                        variants={fadeIn("up", 0.1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.7 }}
                        className='font-semibold text-xl'>Professional Details</motion.h2>

                    <div className='md:px-4 py-4 flex flex-col text-sm gap-4'>
                        <motion.div
                            variants={fadeIn("up", 0.2)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="designation">Designation</label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                placeholder={userData.designation || "Ex: Frontend Developer"}
                                onChange={(e) => setDesignation(e.target.value)}
                                className='border border-gray-300 rounded-md px-2 py-2'
                            />
                        </motion.div>
                        <motion.div
                            variants={fadeIn("up", 0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="qualification">Qualifications</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {qualifications.map((qual, index) => (
                                    <span key={index} className="bg-blue-600 text-xs md:text-sm text-white px-3 py-1 rounded-md flex items-center gap-2">
                                        {qual}
                                        <button type="button" onClick={() => removeQualification(index)} className="text-white hover:text-gray-200">
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <select
                                onChange={handleAddQualification}
                                className='border border-gray-300 rounded-md px-2 py-2 mt-2 bg-white text-gray-700'
                                defaultValue=""
                            >
                                <option value="" disabled>Select Qualification</option>
                                {qualificationOptions.map((qual, index) => (
                                    <option key={index} value={qual}>{qual}</option>
                                ))}
                            </select>
                        </motion.div>


                        <motion.div
                            variants={fadeIn("up", 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120 '>
                            <label htmlFor="skills">Skills</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="bg-green-600 text-xs md:text-sm text-white px-3 py-1 rounded-md flex items-center gap-2">
                                        {skill}
                                        <button type="button" onClick={() => removeSkill(index)} className="text-white hover:text-gray-200">
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <input
                                type="text"
                                id="skills"
                                placeholder="Type a skill and press Enter"
                                value={skillInput}  // Make sure the input is controlled
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleAddSkill}
                                className='border border-gray-300 rounded-md px-2 py-2 mt-2 bg-white text-gray-700'
                            />

                        </motion.div>

                        {/* Project Learnings */}
                        <motion.div
                            variants={fadeIn("up", 0.5)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.7 }}
                            className='flex flex-col max-w-[550px] md:w-120'>
                            <label htmlFor="Bio">Project Learnings</label>
                            <textarea
                                id='bio'
                                name='bio'
                                placeholder={userData.projectLearning || `Ex: While working on my Portfolio website, I improved my React.js skills, learned about component structuring, and optimized performance using lazy loading.`}
                                onChange={(e) => {
                                    setProjectLength(e.target.value);
                                    setProjectLearnings(e.target.value)
                                }
                                }
                                className='resize-none h-[140px] rounded-md border border-gray-300 px-2 py-2'
                                maxLength={500}
                            />
                            <span className='text-xs text-gray-500 mt-1'>{`${projectLength.length}/500 characters`}</span>
                        </motion.div>
                        <div className='flex  gap-4'>
                            <motion.button
                                variants={fadeIn("right", 0.6)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.7 }} type="reset" className='bg-gray-200 p-2 rounded '>Cancel</motion.button>
                            <motion.button
                                variants={fadeIn("left", 0.7)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.7 }}
                                type="submit" className='bg-brand p-2 rounded text-white'>Save Changes</motion.button>
                        </div>
                    </div>
                </div>

            </form>
        </>
    );
};

export default EditProfile;
