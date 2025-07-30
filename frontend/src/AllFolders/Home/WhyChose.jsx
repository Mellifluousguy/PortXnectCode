import React from 'react'
import SecondCard from './SecondCard'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'

const WhyChose = () => {
    return (
        <div className=" lg:h-[80vh] !py-12 lg:p-0 !px-8 flex flex-col justify-evenly lg:gap-0 gap-8 bg-[#1b9af510]">
            <div className="text-center  index-1">
                <motion.h2
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='text-4xl !pb-4 lg:!pb-0 font-bold'>Why Choose PortXNect?</motion.h2>
                <motion.span
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='text-inner-text block text-sm'>Everything you need to showcase your work and connect with developers</motion.span>
            </div>
            <div className="flex justify-evenly flex-wrap w-full lg:gap-0 gap-12">
                <SecondCard
                    image={'fa-solid fa-laptop-code'}
                    heading={'Showcase Your Work'}
                    description={'Upload and share your projects with the community.'}
                    interval={0.1}
                />
                <SecondCard
                    image={'fa-solid fa-user-group'}
                    heading={'Engage & Collaborate'}
                    description={'Follow developers, like, comment, and connect.'}
                    interval={0.2}
                    />
                <SecondCard
                    image={'fa-solid fa-comments'}
                    heading={'Real-time Chat'}
                    description={'Discuss ideas and collaborate with others.'}
                    interval={0.3}
                    />
                <SecondCard
                    image={'fa-solid fa-magnifying-glass'}
                    heading={'Search & Discover'}
                    description={'Find developers and projects based on skills.'}
                    interval={0.4}
                />
            </div>
        </div>
    )
}

export default WhyChose