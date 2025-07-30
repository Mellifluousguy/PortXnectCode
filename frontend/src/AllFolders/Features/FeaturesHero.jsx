import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'
import { AppContent } from '../context/LoginContent'

const FeaturesHero = () => {
    const MotionLink = motion(Link);
    const { userData } = useContext(AppContent);
    return (
        <div className='grid lg:grid-cols-2 lg:!p-0  !py-12 !pb-20'>
            <div className='w-full flex flex-col gap-8 justify-center !px-8 lg:!px-14'>
                <motion.h1
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='lg:text-6xl text-4xl font-bold'>Connect. Code. <br />
                    <span className='text-brand'> Create Together.</span></motion.h1>
                <motion.p
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='lg:text-xl text-base text-inner-text'>Join the next generation of developer collaboration. Build, share, and grow with a community of passionate developers.</motion.p>
                {
                    userData ?
                        '' :
                        <div className='flex gap-4'>
                            <MotionLink
                                variants={fadeIn("up", 0.3)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.1 }}
                                to={'/access'}
                                className='bg-brand text-white shadow-xs hover:shadow-md !py-3 !px-4 rounded-md'>Get Started</MotionLink>
                            <MotionLink
                                variants={fadeIn("up", 0.4)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.1 }}
                                to={'/access'}
                                className='text-brand bg-cloud-gray shadow-xs hover:shadow-md !py-3 !px-4 rounded-md'>Sign In</MotionLink>
                        </div>
                }
            </div>
            <div className='lg:w-full flex justify-center lg:h-[80vh]'>
                <motion.img
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    src='/Features/FeaturesImage.webp' className='lg:h-[90%]  drop-shadow-xl animate-wiggle w-[90%] object-cover' alt='Hero Image' />
            </div>


        </div>
    )
}

export default FeaturesHero