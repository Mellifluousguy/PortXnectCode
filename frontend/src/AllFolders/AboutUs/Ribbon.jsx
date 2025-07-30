import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'

const Ribbon = () => {
    const MotionLInk = motion(Link);
    return (
        <div className='text-center flex gap-8 items-center flex-col !py-8 lg:!p-8 bg-cloud-gray'>
            <motion.h1
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.1 }}
                className='text-2xl font-semibold'>Join Our Growing Community</motion.h1>
            <motion.p
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.1 }}
                className='text-inner-text`'>
                Be part of the next generation of developer networking. Join thousands of <br />
                developers already creating amazing things on PortXNect.
            </motion.p>
            <MotionLInk
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.1 }}
                to={'/access'} className='!p-4 !px-8 text-white font-medium rounded bg-accent'>Join PortXNect Today</MotionLInk>
        </div>
    )
}

export default Ribbon