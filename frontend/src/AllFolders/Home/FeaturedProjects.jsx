import React, { useState } from 'react';
import FeaturedCard from './FeaturedCard';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const FeaturedProjects = () => {
    const [visibleCards, setVisibleCards] = useState(3); // Initially show 4 cards

    const loadMore = () => {
        setVisibleCards((prev) => prev + 3);
    };

    const featuredCard = [
        {
            heading: 'Analytics Dashboard',
            description: 'A beautiful analytics dashboard built with React and D3.js',
            image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/data_analyticstrendsmin.jpg',
            projectLink: 'https://github.com/mellifluousguy',
            NumberOfLikes: 456,
        },
        {
            heading: 'Social Networking App',
            description: 'Mobile social network built with Flutter and Firebase',
            image: 'https://brand24.com/blog/app/uploads/2016/10/33675533_ml.jpg',
            projectLink: 'https://github.com/mellifluousguy',
            NumberOfLikes: 456,
        },
        {
            heading: '3D Game Engine',
            description: 'A beautiful analytics dashboard built with React and D3.js',
            image: 'https://img.pikbest.com/wp/202405/game-keyboard-modern-desktop-gaming-setup-in-blue-patterned-room-with-white-screen-and-3d-render-illustration_9829253.jpg!sw800',
            projectLink: 'https://github.com/mellifluousguy',
            NumberOfLikes: 456,
        },
        {
            heading: 'Analytics Dashboard',
            description: 'A beautiful analytics dashboard built with React and D3.js',
            image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/data_analyticstrendsmin.jpg',
            projectLink: 'https://github.com/mellifluousguy',
            NumberOfLikes: 456,
        },
        {
            heading: 'Social Networking App',
            description: 'Mobile social network built with Flutter and Firebase',
            image: 'https://brand24.com/blog/app/uploads/2016/10/33675533_ml.jpg',
            projectLink: 'https://github.com/mellifluousguy',
            NumberOfLikes: 456,
        },
        {
            heading: '3D Game Engine',
            description: 'A beautiful analytics dashboard built with React and D3.js',
            image: 'https://img.pikbest.com/wp/202405/game-keyboard-modern-desktop-gaming-setup-in-blue-patterned-room-with-white-screen-and-3d-render-illustration_9829253.jpg!sw800',
            projectLink: 'https://github.com/mellifluousguy',
            NumberOfLikes: 456,
        },
        {
            heading: 'Analytics Dashboard',
            description: 'A beautiful analytics dashboard built with React and D3.js',
            image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/data_analyticstrendsmin.jpg',
            projectLink: 'https://github.com/mellifluousguy',
            NumberOfLikes: 456,
        },
        {
            heading: 'Social Networking App',
            description: 'Mobile social network built with Flutter and Firebase',
            image: 'https://brand24.com/blog/app/uploads/2016/10/33675533_ml.jpg',
            projectLink: 'https://github.com/mellifluousguy',
            NumberOfLikes: 456,
        },
        {
            heading: '3D Game Engine',
            description: 'A beautiful analytics dashboard built with React and D3.js',
            image: 'https://img.pikbest.com/wp/202405/game-keyboard-modern-desktop-gaming-setup-in-blue-patterned-room-with-white-screen-and-3d-render-illustration_9829253.jpg!sw800',
            projectLink: 'https://github.com/mellifluousguy',
            NumberOfLikes: 456,
        },
    ];

    return (
        <div className='min-h-[80vh] p-[45px]  flex flex-col item-center gap-[25px] bg-white text-center'>
            <div className="p-[25px]">
                <motion.h2
                    variants={fadeIn("up", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='text-4xl font-bold'>Featured Projects</motion.h2>
                <motion.span
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='text-sm text-inner-text block'>Discover amazing work from our community</motion.span>
            </div>
            <div className="flex justify-center flex-wrap gap-[45px] md:p-[25px]">
                {featuredCard.slice(0, visibleCards).map((card, index) => (
                    <FeaturedCard
                        key={index}
                        heading={card.heading}
                        description={card.description}
                        link={card.projectLink}
                        image={card.image}
                        likes={card.NumberOfLikes}
                        delay={index * 0.1}
                    />
                ))}
            </div>
            {visibleCards < featuredCard.length && (
                <motion.span
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className="p-[15px] bg-accent hover:shadow-lg self-center cursor-pointer text-white rounded-sm" onClick={loadMore}>Explore More Projects</motion.span>
            )}
        </div>
    );
};

export default FeaturedProjects;
