import React, { useContext } from 'react';
import { AppContent } from '../context/LoginContent';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';


const ExploreCards = ({ image, techUsed, name, description, link, delay }) => {

  const { techColors } = useContext(AppContent);


  return (
    <motion.a

      variants={fadeIn("up", delay)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.2 }}
      href={link} target='_blank' className='w-[300px] shadow-md hover:scale-105 h-[300px] rounded-sm overflow-hidden flex flex-col'>
      <img src={image} loading='lazy' className='h-[180px] 
      bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-[#79ADFF] to-90%
       w-full object-cover' alt={name} />
      <h5 className='font-semibold !px-2'>{name}</h5>
      <p className='text-sm text-inner-text !px-2 h-[20%]'>
        {description.length > 70 ? description.slice(0, 70) + '...' : description}
      </p>
      <div className="flex text-xs gap-1 !px-2">
        {techUsed.slice(0, 2).map((tech, index) => {
          // Remove spaces from the tech name for the className only
          const formattedTechClass = tech.replace(/\s+/g, '');
          return (
            <span
              key={index}
              className={`!px-2 !py-1 rounded ${techColors[formattedTechClass] || "bg-gray-300"}`}
            >
              {tech} {/* Display the original tech name */}
            </span>
          );
        })}
        {techUsed.length > 2 && (
          <span className="!px-2 !py-1 rounded-full bg-gray-400 text-white">
            +{techUsed.length - 2}
          </span>
        )}
      </div>
    </motion.a>
  );
};

export default ExploreCards;
