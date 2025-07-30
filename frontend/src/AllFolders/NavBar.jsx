import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Fixed import
import { AppContent } from './context/LoginContent';

const NavBar = () => {
    const navigate = useNavigate();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);


    // User Auth
    const { userData } = useContext(AppContent);

    

    return (
        <nav className={` flex items-center shadow-xs overflow-hidden select-none bg-white z-[1000] lg:flex-row flex-col lg:h-[10vh] top-0 left-0 text-sm  sticky lg:px-8 ${visible ? "!translate-y-0" : "!translate-y-[-100%]"}`}>
            <div className="left flex items-center h-15 justify-between font-medium">
                <NavLink className='logo w-full' to="/"><img className='w-50' src='./assets/LogoLight.webp' alt="Logo" /></NavLink>
            </div>
            <div className="w-[100%] lg:w-[90%] lg:pl-8 py-2 md:px-8 px-4 flex gap-2 justify-between items-center">
                <div className='flex lg:w-[50%] w-[40%] text-lg lg:text-base text-inner-text gap-4 justify-between'>
                    <NavLink to={'/'} className={({ isActive }) => `flex items-center gap-1 ${isActive ? "text-[#7ca9f8]" : ""}`}><i className='fa-solid fa-house '></i> <span className='hidden lg:flex'>Home</span> </NavLink>
                    <NavLink to={'/explore'} className={({ isActive }) => `flex items-center gap-1 ${isActive ? "text-[#7ca9f8]" : ""}`}><i className='fa-solid fa-compass '></i> <span className='hidden lg:flex'>Explore</span> </NavLink>
                    <NavLink to={'/contact'} className={({ isActive }) => `flex items-center gap-1 ${isActive ? "text-[#7ca9f8]" : ""}`}><i className='fa-solid fa-phone '></i> <span className='hidden lg:flex'>Contact</span> </NavLink>
                    <NavLink to={'/features'} className={({ isActive }) => `flex items-center gap-1 ${isActive ? "text-[#7ca9f8]" : ""}`}><i className='fa-solid fa-tools '></i> <span className='hidden lg:flex'>Features</span> </NavLink>
                    <NavLink to={'/AboutUs'} className={({ isActive }) => `flex items-center gap-1 ${isActive ? "text-[#7ca9f8]" : ""}`}><i className='fa-solid fa-info-circle '></i> <span className='hidden lg:flex'>About Us</span> </NavLink>
                </div>
                {
                    userData ?
                        <NavLink to={'/dashboard'} className=' flex lg:w-[14%] justify-center items-center rounded-full hover:cursor-pointer relative group'>
                            <i className="fa-solid fa-user lg:block none mx-2 font-bold"></i>
                            {userData.name.toUpperCase()}
                        </NavLink> :
                        <div className='flex lg:w-[22%] justify-between md:text-sm text-xs items-center'>
                            <NavLink className='SignInNavBar px-[15px] py-[10px] ' to={'/access'}>Sign In</NavLink>
                            <NavLink className='px-[15px] py-[10px] bg-brand text-white rounded-sm' to={'/access'}>Get Started</NavLink>
                        </div>
                }
            </div>
        </nav>
    );
};

export default NavBar;
