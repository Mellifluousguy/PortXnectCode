import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../variants'

const MeetCreator = () => {
    return (
        <div className='flex items-center gap-8 !py-8 lg:h-[80vh]  justify-evenly flex-col'>
            <motion.h1
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.1 }}
                className='text-2xl font-semibold'>Meet the Creator</motion.h1>
            <div className='flex flex-col lg:flex-row gap-8 w-[60%]'>
                <motion.img
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    src='/AboutUs/profile.webp' className='h-[350px] rounded-lg w-[300px] object-cover' alt="Mohit Gupta" />
                <div className='flex flex-col justify-center gap-4'>
                    <motion.h2
                        variants={fadeIn("up", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.1 }}
                        className='text-xl font-semibold'>Mohit Gupta</motion.h2>
                    <motion.p
                        variants={fadeIn("up", 0.4)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.1 }} className='text-inner-text'>I’m Mohit Gupta, <b> Founder & CEO of PortXNect </b>. As a passionate web developer specializing frontend development, I created PortXNect to empower developers to showcase their work, collaborate, and grow together. My vision is to build a dynamic and engaging platform where developers can connect, share ideas, and innovate seamlessly. </motion.p>
                    <div className='flex text-lg gap-2'>
                        <motion.a
                            variants={fadeIn("up", 0.5)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.1 }}
                            href="https://github.com/mellifluousguy" target='_blank'>
                            <i className='fa-brands fa-github'></i>
                        </motion.a>
                        <motion.a
                            variants={fadeIn("up", 0.6)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.1 }} href="https://linkedin.com/in/mellifluousguy" target='_blank'>
                            <i className='fa-brands fa-linkedin'></i>
                        </motion.a>
                        <motion.a
                            variants={fadeIn("up", 0.1)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: true, amount: 0.1 }}
                            href="https://instagram.com/mellifluousguy_">
                            <i className='fa-brands fa-instagram'></i>
                        </motion.a>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default MeetCreator