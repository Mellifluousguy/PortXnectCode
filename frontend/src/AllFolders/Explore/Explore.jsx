import React, { useState } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import ExploreCards from './ExploreCards';
import ExploreHero from './ExploreHero';

import techFoundations from './techFoundation.json'

const Explore = () => {
    const [selectedTech, setSelectedTech] = useState("All");


    const handleTechSelection = (techType) => {
        setSelectedTech(techType);
    };

    const [visibleCount, setVisibleCount] = useState(16); // Initial items shown

    const loadMoreData = () => {
        setVisibleCount(prevCount => prevCount + 12); // Load 6 more items
    };

    const filteredTechFoundations = selectedTech === "All"
        ? techFoundations.slice(0, visibleCount)
        : techFoundations.filter(card => card.techType === selectedTech).slice(0, visibleCount);




    return (
        <>
            <NavBar />
            <div className='flex gap-8 flex-col'>
                <ExploreHero />
                <div className='!px-4 flex flex-col'>
                    <nav className='flex overflow-x-auto !pb-4 whitespace-nowrap border-b border-muted'>
                        <span onClick={() => handleTechSelection("All")} className={`!px-4 cursor-pointer !pt-2 text-sm ${selectedTech === "All" ? 'font-medium text-accent' : ''}`}>All</span>
                        {[...new Set(techFoundations.map(card => card.techType))].map((tech, index) => (
                            <span key={index} onClick={() => handleTechSelection(tech)} className={`!px-4 !pt-2  cursor-pointer text-sm   ${selectedTech === tech ? 'font-medium text-accent' : ''}`}>
                                {tech}
                            </span>
                        ))}
                    </nav>


                    {/* Display Tech Cards */}
                    <div className='flex flex-wrap justify-center lg:justify-start gap-8 !py-4'>
                        {filteredTechFoundations.map((card, index) => (
                            <ExploreCards key={index} delay={index * 0.1} image={card.image} techUsed={card.techStack} name={card.title} description={card.description} link={card.link} />
                        ))}
                    </div>

                    {visibleCount < techFoundations.length && (
                        <button onClick={loadMoreData} className="bg-accent text-white !px-8  self-center cursor-pointer !py-2 rounded-md !m-8">
                            Load More
                        </button>
                    )}

                </div>
                <Footer />
            </div>
        </>
    );
};

export default Explore;
