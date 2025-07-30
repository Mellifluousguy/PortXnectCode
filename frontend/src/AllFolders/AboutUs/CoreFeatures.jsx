import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'

const CoreFeatures = () => {
    return (
        <div className='flex flex-col !py-8 bg-cloud-gray gap-8 lg:gap-0 justify-evenly lg:h-[90vh] !p-[32px]'>
            <motion.h1
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.1 }} className='text-center text-4xl font-semibold'>Core Features</motion.h1>
            <div className='flex justify-center gap-8 flex-wrap'>
                <Card image='/AboutUs/CoreProfile.webp' delay={0.2} title={'Profile Showcase'} content={'Create stunning portfolios and showcase your projects with our intuitive profile builder.'} />
                <Card image='/AboutUs/CoreCollab.webp' delay={0.3} title={'Collaboration Hub'} content={'Connect with developers worldwide and find the perfect collaborators for your projects.'} />
            </div>
        </div>
    )
}

export default CoreFeatures

const Card = ({ image, title, delay, content }) => {
    return (
        <motion.div
            variants={fadeIn("up", delay)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className='flex w-[500px] rounded-lg shadow-sm hover:shadow-md overflow-hidden  flex-col gap-2'>
            <img src={image} className='h-[200px] w-full object-cover' alt={title} />
            <div className='!px-4 flex flex-col gap-2 !py-6'>
                <h3 className='text-xl font-semibold'>{title}</h3>
                <span className='text-md text-inner-text'>{content}</span>
            </div>
        </motion.div>
    )
}