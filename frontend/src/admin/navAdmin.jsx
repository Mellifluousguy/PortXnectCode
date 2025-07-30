import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn } from '../variants'

const navAdmin = () => {
  return (
    <motion.div
      variants={fadeIn("left", 0.1)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
       className='px-4 md:text-base w-85 md:w-full text-sm shadow-sm bg-white rounded-md flex gap-3 md:gap-8'>
      <NavLink to={'/admin/dashboard'} className=' hover:border-gray-400 py-4 border-transparent border-b-2'>Overview</NavLink>
      <NavLink to={'/admin/dashboard/users'} className=' hover:border-gray-400 py-4 border-transparent border-b-2'>Users</NavLink>
      <NavLink to={'/admin/dashboard/projects'} className=' hover:border-gray-400 py-4 border-transparent border-b-2'>Projects</NavLink>
      <NavLink to={'/admin/dashboard/notification'} className=' hover:border-gray-400 py-4 border-transparent border-b-2'>Notifications</NavLink>
    </motion.div>
  )
}

export default navAdmin