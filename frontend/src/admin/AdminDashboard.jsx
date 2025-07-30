import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../AllFolders/UserDashBoard/NavBar';
import NavAdmin from './navAdmin';
import SideBar from '../AllFolders/UserDashBoard/SideBar';
import { toast } from 'react-toastify';
import UserRegistrationChart from './userRegistrationChart.jsx';
import axios from 'axios';
import { AdminContent } from '../AllFolders/context/AdminContext.jsx';
import { AppContent } from '../AllFolders/context/LoginContent.jsx';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants.js';


const AdminDashboard = () => {
  const { totalUsers, verifiedUsers, totalPosts } = useContext(AdminContent);
  const { backendUrl, onlineUsers } = useContext(AppContent)
  const [userData, setUserData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/user-registration-stats`);
        setUserData(res.data.data);
      } catch (error) {
        toast.error("Failed to load user registration stats");
      }
    };
    fetchUserData();
  }, [backendUrl]);


  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/projectStats`);
        setProjectData(res.data.data);
      } catch (error) {
        toast.error("Failed to load user registration stats");
      }
    };
    fetchProjectData();
  }, [backendUrl]);


  return (
    <>
      <NavBar />
      <SideBar />
      <section className='bg-sky-breeze flex flex-col gap-4 min-h-screen pl-[15%] md:pl-[22%] md:pr-20 pr-1 py-1 md:py-5 '>
        <NavAdmin />

        <header className='flex gap-4 md:justify-between  flex-wrap  md:gap-10'>
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }} className='p-4 rounded-md w-85 md:w-50 flex shadow-sm gap-2 text-center flex-col bg-white'>
            <h2 className='flex justify-between  items-center text-sm font-semibold text-gray-500'>
              Total Users <i className="fa-solid fa-users-line text-lg text-black"></i>
            </h2>
            <h1 className='font-bold text-xl'>{totalUsers}</h1>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }} className='p-4 shadow-sm rounded-md md:w-50 flex w-85 gap-2 flex-col text-center bg-white'>
            <h2 className='flex justify-between items-center text-sm font-semibold text-gray-500'>
              Verified Users <i className="fa-solid fa-check text-lg text-black"></i>
            </h2>
            <h1 className='font-bold text-xl'>{verifiedUsers}</h1>
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className='p-4 rounded-md shadow-sm flex md:w-50 gap-2 w-85 flex-col text-center bg-white'>
            <h2 className='flex justify-between items-center text-sm font-semibold text-gray-500'>
              Total Posts <i className="fa-solid fa-file text-lg text-black"></i>
            </h2>
            <h1 className='font-bold text-xl'>{totalPosts}</h1>
          </motion.div>
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className='p-4 rounded-md shadow-sm flex md:w-50 gap-2 w-85 flex-col text-center bg-white'>
            <h2 className='flex justify-between items-center text-sm font-semibold text-gray-500'>
              User Online <i className="fa-solid fa-users text-lg text-black"></i>
            </h2>
            <h1 className='font-bold text-xl'>{Object.keys(onlineUsers).length}</h1>
          </motion.div>
        </header>
        <div className='flex flex-wrap md:flex-nowrap gap-4'>

          <motion.section
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className={'bg-white rounded-md w-85 md:w-130 shadow-md py-4'}>
            <h1 className='px-15 text-lg font-semibold mb-5'>User Login Chart</h1>
            <UserRegistrationChart data={userData} />
          </motion.section>
          <motion.section
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className={'bg-white rounded-md w-85 md:w-130 shadow-md py-4'}>
            <h1 className='px-15 text-lg font-semibold mb-5'>Projects Chart</h1>
            <UserRegistrationChart data={projectData} />
          </motion.section>
        </div>
      </section >
    </>
  );
};

export default AdminDashboard;
