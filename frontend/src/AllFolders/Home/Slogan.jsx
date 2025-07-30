import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'

const Slogan = () => {
  const MotionLink = motion(Link);
  
  return (
    <div className='h-[40vh] flex flex-col text-center  justify-center !px-3 gap-6 w-full bg-[#1b9af520] text-dark-bg'>
      <motion.h1
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className='lg:text-3xl text-2xl font-semibold'>Ready to Build & Connect?</motion.h1>
      <motion.span
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
      >Join PortXNect today and be part of the developer community!</motion.span>
      <MotionLink
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className='!px-8 !py-2 rounded-sm bg-brand self-center text-white' to={'/access'}>Sign Up Now</MotionLink>
    </div>
  )
}

export default Slogan