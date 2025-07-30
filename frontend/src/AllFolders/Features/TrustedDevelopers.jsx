import React from 'react'
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const TrustedDevelopers = () => {

    const Comments = [
        {
            image: "https://cdn3d.iconscout.com/3d/premium/thumb/boy-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--boys-male-man-pack-avatars-icons-5187865.png?f=webp",
            name: "Michael Rodriguez",
            position: "Senior Developer at TechCorp",
            content: "PortXNect has revolutionized how our team collaborates. The real-time features and AI suggestions have significantly improved our productivity."
        },
        {
            image: "https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--men-people-male-pack-avatars-icons-5187871.png?f=webp",
            name: "Emma Watson",
            position: "Lead Engineer at StartupX",
            content: "The smart version control and code review features are game-changers. Our team's code quality has improved dramatically."
        },
        {
            image: "https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--profile-character-pack-avatars-icons-5187873.png?f=webp",
            name: "Sarah Chen",
            position: "CTO at DevFlow",
            content: "PortXNect's AI-powered insights have helped us catch bugs early and maintain consistent code quality across our entire organization."
        },

    ];

    return (
        <div className='flex flex-col gap-12 lg:gap-0 lg:h-[70vh] items-center !p-8 justify-around bg-cloud-gray'>
            <div>
                <motion.h1 className='lg:text-4xl text-2xl text-center font-bold'>Powerful Features for Modern Developer.</motion.h1>
                <motion.p className='lg:text-lg text-center text-inner-text'>Everything you need to build, collaborate, and ship faster</motion.p>
            </div>
            <div className='flex gap-10 flex-wrap'>
                {
                    Comments.map((comment, index) => (
                        <Card key={index} delay={0.1 * index} image={comment.image} name={comment.name} position={comment.position} content={comment.content} />
                    ))
                }
            </div>

        </div>
    )
}

export default TrustedDevelopers

const Card = ({ image, name, position, delay, content }) => {
    return (
        <motion.div
            variants={fadeIn("up", delay)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
            className='flex w-[370px] bg-white rounded-lg  !p-8 !px-4 gap-4 flex-col'>
            <div className='flex gap-4'>
                <img src={image} className='bg-blue-300 rounded-full w-[45px] h-[45px] object-cover' alt="" />
                <div>
                    <h3 className='text-lg font-semibold'>{name}</h3>
                    <span className='text-xs text-inner-text'>{position}</span>
                </div>
            </div>
            <div>
                <p className='text-inner-text text-sm'>{`"${content}"`}</p>
            </div>

        </motion.div>
    )
}