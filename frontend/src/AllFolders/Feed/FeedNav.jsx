import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContent } from '../context/LoginContent';

const FeedNav = () => {
    const { notifications, logout } = useContext(AppContent);

    return (
        <nav className='flex justify-between flex-col md:flex-row items-center px-8 shadow-sm bg-white'>
            <NavLink to={'/'} className='flex text-2xl items-center gap-1'>
                <img src="/assets/tabIconLight.webp" className=' object-cover h-15 py-1 w-12' alt="PortXNect Logo" />
                <h1 >PortXNect</h1>
            </NavLink>
            <div className='flex items-center gap-6 text-xs text-center md:text-sm font-medium'>
                <NavLink to="/home" className="text-gray-800  hover:text-black"> <i className='fa-solid fa-house mr-1'></i> Home</NavLink>
                <NavLink to="/messages" className="text-gray-800 hover:text-black"><i className='fa-solid fa-comments mr-1'></i>Messages</NavLink>
                <NavLink to="/dashboard" className="text-gray-800 hover:text-black"><i className='fa-solid fa-chart-line mr-1'></i>Dashboard</NavLink>
                <div className="relative text-gray-800 hover:text-black">
                    <NavLink to="/notifications" className="flex flex-col md:flex-row items-center">
                        <i className='fa-solid fa-bell mr-1'></i> Notifications
                    </NavLink>
                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[8px] font-bold px-1 py-0 rounded-full">
                            {notifications.length > 99 ? '99+' : notifications.length}
                        </span>
                    )}
                </div>

                <button onClick={logout} className='text-red-600'>
                    <i className='fa-solid fa-arrow-right-from-bracket mr-1'></i>Logout
                </button>
            </div>
        </nav>
    );
};

export default FeedNav;
