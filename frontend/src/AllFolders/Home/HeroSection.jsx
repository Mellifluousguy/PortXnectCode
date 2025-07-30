import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import 'tailwindcss'
import { fadeIn } from '../../variants'
import { motion } from 'framer-motion';
import { AppContent } from '../context/LoginContent';


const HeroSection = () => {

  const MotionLink = motion(Link);
  const { userData } = useContext(AppContent);


  return (
    <div className=' bg-[#F57FA] h-80vh md:mt-0 mt-10 lg:h-[90vh] px-[15px] grid grid-cols-1 lg:grid-cols-2'>
      <div className="flex flex-col items-center justify-center md:w-  !px-[30px] gap-[25px]">
        <motion.h1
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className='text-text-dark text-2xl lg:text-6xl font-semibold'>Connect, Showcase & Grow as a Developer</motion.h1>
        <motion.span
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className='text-lg text-muted'>PortXNect is a social platform for developers to showcase projects,
          collaborate with peers, and build a strong tech network. </motion.span>
        <div className="flex w-80 lg:w-full gap-8">
          {
            userData ? '' :
              <MotionLink
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                to={'/access'} className='hover:bg-white hover:border-brand hover:border hover:text-brand border  border-white lg:!px-4 !p-2 lg:!py-2  rounded-sm text-white bg-brand text-semibold'>Get Started &nbsp; <i className='fa-solid fa-arrow-right'></i></MotionLink>
          }
          <MotionLink
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            to={'/explore'} className='lg:!px-4 !p-2 lg:!py-2 rounded-sm text-brand border border-brand font-medium hover:bg-brand hover:text-white  '>Explore Projects</MotionLink>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <motion.img
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          src='/Home/HeroSectionImage2.webp' className='w-[90%] drop-shadow-2xl animate-wiggle' alt="Image of Hero Section" />
      </div>

    </div >
  )
}

export default HeroSection