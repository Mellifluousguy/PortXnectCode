import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'
const SecondCard = ({ image, heading, interval, description }) => {
  return (
    <motion.div
      variants={fadeIn("up", interval)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.1 }}
      className="w-[300px] bg-white drop-shadow-sm hover:drop-shadow-lg index-1 !px-[20px] !py-[35px] flex items-start flex-col gap-2 h-[200px] rounded-lg">
      <i className={`!p-3 rounded-md text-2xl bg-brand-bg text-brand ${image}`}></i>
      <h4 className='text-xl font-bold capitalize'>{heading}</h4>
      <span className='text-sm text-[#4B5563]'>{description}</span>
    </motion.div>
  )
}

export default SecondCard