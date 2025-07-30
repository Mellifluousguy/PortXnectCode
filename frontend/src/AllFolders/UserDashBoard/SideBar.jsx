import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContent } from '../context/LoginContent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const SideBar = () => {
    const navigate = useNavigate();
    const { logout, userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContent);

    const sendVerification = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')

            if (data.success) {
                navigate('/email-verify')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            animate="show"
            viewport={{ once: true, amount: 0.7 }}
            className='w-[50px] top-[8vh] py-4 md:py-0 md:w-[20%] gap-4 text-sm h-lvh fixed items-center md:top-0 left-0 shadow-md bg-white flex flex-col'>
            <NavLink to={`/`} className='md:flex hidden items-center overflow-hidden'>
                <img src='./assets/tabIconLight.webp' className='w-5 mr-2 object-center lg:w-15' alt="" />
                <h1 className='md:text-xl lg:text-3xl py-12'>PortXNect</h1>
            </NavLink>

            {/* Dashboard */}
            <NavLink
                to={`/dashboard`}
                className={({ isActive }) => `w-[90%] py-3 px-4 gap-3 flex items-center rounded-lg ${isActive ? 'text-brand bg-brand-bg' : 'text-inner-text'}`}
            >
                <i className="fa-solid fa-house"></i> <span className='hidden md:block'>Dashboard</span>
            </NavLink>

            {/* My Posts */}
            <NavLink
                to={`/my-post`}
                className={({ isActive }) => `w-[90%] py-3 px-4 gap-3 flex items-center rounded-lg ${isActive ? 'text-brand bg-brand-bg' : 'text-inner-text'}`}
            >
                <i className="fa-solid fa-file-lines"></i> <span className='hidden md:block'>My Posts</span>
            </NavLink>

            {/* Notifications */}
            <NavLink
                to={`/notifications`}
                className={({ isActive }) => `w-[90%] py-3 px-4 gap-3 flex items-center rounded-lg ${isActive ? 'text-brand bg-brand-bg' : 'text-inner-text'}`}
            >
                <i className="fa-solid fa-bell"></i> <span className='hidden md:block'>Notifications</span>
            </NavLink>

            {/* Publish Project */}
            <NavLink
                to={`/publish`}
                className={({ isActive }) => `w-[90%] py-3 px-4 gap-3 flex items-center rounded-lg ${isActive ? 'text-brand bg-brand-bg' : 'text-inner-text'}`}
            >
                <i className="fa-solid fa-circle-plus"></i> <span className='hidden md:block'>Publish Project</span>
            </NavLink>

            {/* Settings */}
            <NavLink
                to={`/edit-profile`}
                className={({ isActive }) => `w-[90%] py-3 px-4 gap-3 flex items-center rounded-lg ${isActive ? 'text-brand bg-brand-bg' : 'text-inner-text'}`}
            >
                <i className="fa-solid fa-user-pen"></i> <span className='hidden md:block'>Edit Profile</span>
            </NavLink>

            <NavLink
                to={`/`}
                className={({ isActive }) => `w-[90%] py-3 px-4 gap-3 flex items-center rounded-lg ${isActive ? 'text-brand bg-brand-bg' : 'text-inner-text'}`}
            >
                <i className="fa-solid fa-circle-user"></i> <span className='hidden md:block'>Feed</span>
            </NavLink>
            {/* Admin page */}
            {userData.role === 'admin' ?
                <NavLink
                    to={`/admin/dashboard`}
                    className={({ isActive }) => `w-[90%] py-3 px-4 gap-3 flex items-center rounded-lg ${isActive ? 'text-brand bg-brand-bg' : 'text-inner-text'}`}
                >
                    <i className="fa-solid fa-user"></i> <span className='hidden md:block'> Admin dashboard</span>
                </NavLink> : ''
            }

            {
                !userData.isAccountVerified ? (
                    <span
                        onClick={sendVerification}
                        className='w-[90%] py-3 px-4 gap-3 flex cursor-pointer items-center rounded-lg hover:text-brand hover:bg-brand-bg text-inner-text'
                    >
                        <i className="fa-solid fa-certificate"></i> <span className='hidden md:block'>Verify Email</span>
                    </span>
                ) : ''
            }
            {/* Logout */}
            <button
                onClick={logout}
                className='w-[90%] py-3 px-4 gap-3 flex cursor-pointer items-center rounded-lg hover:text-brand hover:bg-brand-bg text-inner-text'
            >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> <span className='hidden md:block'>Logout</span>
            </button>
        </motion.div>
    );
}

export default SideBar;
