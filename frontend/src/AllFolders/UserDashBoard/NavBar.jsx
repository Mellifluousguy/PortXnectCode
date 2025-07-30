import React, { useContext } from 'react';
import { AppContent } from '../context/LoginContent';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { userData, notifications } = useContext(AppContent);

  return (
    <div className='flex shadow-sm z-1 px-4 justify-between sticky top-0 md:static items-center overflow-hidden bg-snow-white h-[8vh] w-full md:w-[80%]  justify-self-end'>

      <h2 className='font-semibold text-xs md:text-base'>Welcome back, {userData.name}</h2>  {/* Dynamically display the name */}
      <div className=' h-full  flex items-center gap-4 justify-end'>
        <NavLink to={'/notifications'} className="relative"><i className='fa-solid fa-bell'></i> {notifications.length > 0 && (
          <span className="absolute  left-1.5 bg-red-500 text-white text-[8px] font-bold px-1  rounded-full">
            {notifications.length > 99 ? '99+' : notifications.length}
          </span>
        )}</NavLink>
        <NavLink to={'/publish'} className='flex items-center gap-2 text-sm bg-brand text-white cursor-pointer rounded p-2 w-full`'><i className="fa-solid fa-plus"></i><span className="hidden md:block">Publish&nbsp;Project</span></NavLink>
        <span className='flex h-full gap-2 font-medium w-full items-center !px-2 text-sm'>
          <img
            className='h-[70%] hidden md:block !p-1 bg-amber-100 rounded-full object-cover'
            src="https://cdn3d.iconscout.com/3d/premium/thumb/user-3d-icon-download-in-png-blend-fbx-gltf-file-formats--avatar-profile-man-interface-pack-icons-5209354.png?f=webp"
            alt="User Avatar"
          />
          {userData ? userData.name : "User Name"}  {/* Display the name or fallback if not available */}
        </span>
      </div>
    </div>
  );
}

export default NavBar;
