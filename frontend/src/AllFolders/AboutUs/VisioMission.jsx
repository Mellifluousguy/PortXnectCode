import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'

const VisioMission = () => {
    return (
        <div className='text-center flex lg:h-[70vh] !py-12 lg:p-0 !px-4 items-center justify-evenly flex-col gap-4'>
            <div className='flex flex-col gap-4'>
                <motion.h2
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='text-2xl block font-semibold'>Our Vision & Mission</motion.h2>
                <motion.p
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='text-sm text-inner-text'>Building the most inclusive and innovative platform for developers to connect,<br />collaborate, and create the future of technology together.</motion.p>

            </div>
            <div className='flex flex-wrap justify-center gap-8'>
                <Card icon={'fa-solid fa-lightbulb'} delay={0.1} title={'Innovation First'} content={'Pushing the boundaries of developer collaboration through cutting-edge technology and intuitive design.'} />
                <Card icon={'fa-solid fa-user-group'} delay={0.2} title={'Innovation First'} content={'Creating a supportive environment where developers can learn, share, and grow together.'} />
                <Card icon={'fa-solid fa-code'} delay={0.3} title={'Innovation First'} content={'Fostering collaboration and transparency through open source principles and practices.'} />
            </div>
        </div>
    )
}

export default VisioMission



const Card = ({ icon, title, content, delay }) => {
    return (
        <motion.div
            variants={fadeIn("up", delay)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className='flex w-[350px] !p-8 rounded-lg text-left gap-3 hover:shadow-md bg-cloud-gray flex-col'>
            <i className={`${icon} text-xl`}></i>
            <h2 className='text-lg font-semibold'>{title}</h2>
            <p className='text-sm text-inner-text'>{content}</p>
        </motion.div>
    )
}