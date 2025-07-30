import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import bgImage from './assets/HeroBg.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { AppContent } from '../context/LoginContent';

const AboutHero = () => {
    const MotionLink = motion(Link);
    const { userData } = useContext(AppContent);

    return (
        <div
            className="h-[70vh] text-center items-center flex flex-col gap-8 justify-center relative bg-cover bg-center"
            style={{ backgroundImage: `url(/AboutUs/HeroBg.webp)` }}
        >
            <div className='h-full w-screen absolute bg-[rgba(0,0,0,0.6)]'></div>
            <motion.h1
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.1 }}
                className='w-[80%] bg-clip-text text-transparent font-bold bg-linear-to-r z-1 from-indigo-400 to-blue-400 h-fit text-5xl'>PortXNect – The Future of Developer Networking</motion.h1>
            <motion.span
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.1 }}
                className='text-white block z-1 text-lg'>Empowering developers to showcase, collaborate, and grow together</motion.span>
            {
                userData ?
                    '' :
                    <MotionLink
                        variants={fadeIn("up", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.1 }}
                        to={'/access'} className='!py-3 !px-8 z-1 font-medium rounded hover:shadow-lg shadow-[rgba(255,255,255,0.2)] bg-white hover:bg-blue-500 hover:text-white'>Get Started</MotionLink>
            }
        </div>
    );
};

export default AboutHero;
