import React from 'react'
import { delay, motion } from 'framer-motion'
import { fadeIn } from '../../variants'

const CardFeatures = () => {
  return (
    <div className='text-center bg-cloud-gray !py-12 lg:p-0 lg:h-[70vh] justify-evenly gap-12 lg:gap-0 flex flex-col '>
      <div>
        <motion.h1
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.1 }}
          className='lg:text-4xl text-3xl font-bold'>Powerful Features for Modern Developer.</motion.h1>
        <motion.p
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.1 }}
          className='lg:text-lg text-balance text-inner-text'>Everything you need to build, collaborate, and ship faster</motion.p>
      </div>
      <div className='flex flex-wrap gap-12 lg:gap-0 justify-evenly'>
        <Card icon={'fa-solid fa-code'} heading={'Real-time Collaboration'} delay={0.1} content={'Code together in real-time with team members across the globe. Share, edit, and review code seamlessly.'} />
        <Card icon={'fa-solid fa-code-merge'} heading={'Project Management'} delay={0.2} content={'Organize tasks, track progress, and manage your development workflow efficiently.'} />
        <Card icon={'fa-solid fa-cloud-arrow-up'} heading={'Instant Deployment'} delay={0.3} content={'Deploy your projects with one click to any cloud platform of your choice.'} />
      </div>
    </div>
  )
}

export default CardFeatures

const Card = ({ icon, heading, delay, content }) => {
  return (
    <motion.div
      variants={fadeIn("up", delay)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.1 }}
      className='flex w-[350px] hover:shadow-md text-left bg-white h-[200px] gap-3 !p-8 rounded-lg shadow-sm flex-col'>
      <i className={`${icon} text-brand text-4xl`}></i>
      <h3 className='font-semibold'>{heading}</h3>
      <p className='text-sm text-inner-text'>{content}</p>
    </motion.div>
  )
}