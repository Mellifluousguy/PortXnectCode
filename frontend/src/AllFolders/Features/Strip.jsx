import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'

const Strip = () => {
  const MotionLink = motion(Link);

  return (
    <div className='h-[35vh] flex flex-col justify-center gap-4 !p-4 bg-brand items-center text-center text-white '>
      <motion.h1
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className='lg:text-3xl text-2xl font-semibold'>Ready to Transform Your Development Workflow?</motion.h1>
      <motion.span
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
        className='block'>Join over 100,000 developers who are already using PortXNect</motion.span>
      <MotionLink
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.1 }}
       to={'/access'} className='!p-3 font-medium !px-8 rounded bg-white text-brand'>Let's Start &nbsp;<i className='fa-solid fa-arrow-right'></i></MotionLink>
    </div>
  )
}

export default Strip