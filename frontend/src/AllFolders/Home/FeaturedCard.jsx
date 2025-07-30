import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'

const FeaturedCard = ({ heading, description, link, image, likes, delay }) => {
    return (
        <motion.div
            variants={fadeIn("up", delay)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className='md:w-[350px] w-full h-[300px] bg-white drop-shadow-sm  hover:scale-105 text-left rounded-sm overflow-hidden grid grid-rows-2'>
            <img src={image} loading='lazy' className='w-[100%] object-cover max-h-[100%]' alt={heading} />
            <div className='flex flex-col justify-evenly !py-[5px] !px-[15px]'>
                <h4 className='font-semibold'>{heading}</h4>
                <span className='text-text-dark'>{description}</span>
                <div className="flex justify-between">
                    <div className="flex items-center gap-[5px]">
                        <i className="fa-solid fa-heart text-error"></i>
                        <span>{likes}</span>
                    </div>
                    <a href={link} className='text-secondary text-[16px]' target='_blank'>View Project</a>
                </div>
            </div>
        </motion.div>
    )
}

export default FeaturedCard