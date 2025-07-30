import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const ActionFeatures = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current.currentTime = 0; // Start from the beginning
                    videoRef.current.play(); // Play the video
                } else {
                    videoRef.current.pause(); // Pause when out of view
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the video is in view
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <div className='lg:h-[140vh]  !py-8 justify-center  text-center flex flex-col gap-8'>
            <div>
                <motion.h1
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='lg:text-4xl text-3xl font-bold'>See PortXNect in Action</motion.h1>
                <motion.p
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }} className='lg:text-lg text-balance text-inner-text'>
                    Watch how our platform transforms the way developers collaborate
                </motion.p>
            </div>
            <div className='h-[80%] w-screen grid place-content-center overflow-hidden'>
                <video
                    ref={videoRef}
                    src='/Features/Demo.mp4'
                    muted
                    loop
                    playsInline
                    disablePictureInPicture
                    className='w-screen h-full pointer-events-none select-none'
                    onContextMenu={(e) => e.preventDefault()} // Disable right-click
                    onPlay={(e) => e.preventDefault()} // Prevent manual play/pause
                ></video>
            </div>
        </div>
    );
};

export default ActionFeatures;
