import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'


const ExploreHero = () => {
  const MotionLink = motion(Link);

  return (
    <div className='grid !py-8 bg-linear-to-r from-[#4B65E3] to-[#A1DCC9] overflow-hidden lg:grid-cols-2 grid-cols-1'>
      <div className='flex flex-col lg:!px-12 !px-8 gap-4 items-center justify-center'>
        <motion.h1
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.1 }}
          className='lg:text-5xl text-3xl font-bold text-white'>Discover Amazing Developer Projects</motion.h1>
        <motion.p
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.1 }}
          className='text-white font-medium'>Connect with talented developers, explore cutting-edge projects, and showcase your work to the global tech community.</motion.p>
        <div className='flex gap-4 w-full'>
          <MotionLink
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            to={'/access'} className='!py-3 rounded-md !px-2 lg:!px-4 bg-white font-semibold shadow-md cursor-pointer'>Explore Projects</MotionLink>
          <MotionLink
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            to={'/access'} className='!py-3 rounded-md !px-2 lg:!px-4 bg-[rgba(0,0,0,0.3)] shadow-md hover:bg-[rgba(0,0,0,0.5)] cursor-pointer font-semibold text-white'>Share Your Work</MotionLink>
        </div>
      </div>
      <div className='h-[50vh] lg:h-[80vh] flex justify-center items-center overflow-hidden'>
        <motion.img
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.1 }}
          src='/Explore/HeroSectionImage.webp ' className='lg:h-[80%] lg:w-[80%]  w-[90%] animate-wiggle drop-shadow-2xl  object-cover' alt="" />
      </div>
    </div>
  )
}

export default ExploreHero