import React, { useContext, useEffect, useRef, useState } from 'react';
import FeedNav from './FeedNav';
import TinderCard from 'react-tinder-card';
import { AppContent } from '../context/LoginContent';
import axios from 'axios';
import DevCard from './DevCard';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';

const Feed = () => {
    const { backendUrl, fetchSwipeableUsers, remainingCards, setRemainingCards, feedMatches, LikedUsers, errorFeed, users, setUsers, } = useContext(AppContent);
    const [cardBg, setCardBg] = useState();
    const [isMobile, setIsMobile] = useState(false);

    const cardRef = useRef(); // 👈 TinderCard ref

    useEffect(() => {


        fetchSwipeableUsers();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [backendUrl]);

    // 👇 Swipe functions for buttons
    const swipe = async (dir) => {
        if (cardRef.current) {
            await cardRef.current.swipe(dir); // programmatic swipe
        }
    };

    const onSwipe = async (dir, targetUserId) => {
        if (dir === 'right' || dir === 'left') {
            try {
                const res = await axios.post(`${backendUrl}/api/feed/swipe`, {
                    targetUserId,
                    action: dir === 'right' ? 'like' : 'skip'
                });

                if (res.data.success && dir === 'right') {
                    // ✅ Immediately update both panels
                    feedMatches();
                    LikedUsers();
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const onCardLeftScreen = () => {
        setUsers(prev => prev.slice(1));
        setRemainingCards(prev => prev - 1); // Decrease the remaining cards count
    };

    const isProfileComplete = (user) => {
        return user.name && user.bio && user.technicalSkills?.length > 0 && user.projects?.length > 0;
    };

    const completeUsers = users.filter(isProfileComplete);

    const renderDots = () => {
        const visibleDots = Math.min(3, completeUsers.length);
        const extraDots = completeUsers.length - visibleDots;

        const dots = [];
        for (let i = 0; i < visibleDots; i++) {
            dots.push(<span key={i} className="h-3 w-3 bg-gray-700 rounded-full mx-1 inline-block"></span>);
        }

        if (extraDots > 0) {
            dots.push(
                <span key="more" className="ml-2 text-gray-600 text-sm font-medium">+{extraDots}</span>
            );
        }

        return <div className="flex items-center justify-center mb-4">{dots}</div>;
    };


    return (
        <>
            <FeedNav />
            <div className='flex items-center overflow-hidden justify-center lg:justify-between h-[90vh] bg-gray-100'>
                {errorFeed === 403 ? '' : (<LeftPanel />)}
                {/* Display remaining cards count */}
                <div className='flex flex-col items-center '>
                    <div className="font-semibold mb-1">
                        {renderDots()}
                        {remainingCards ? '' : errorFeed === 403 ? <h1 className='text-center w-screen'>Please complete your profile to access the developer feed.</h1> : 'No Cards Left'}
                    </div>

                    {completeUsers.length > 0 ? (
                        <>
                            <TinderCard
                                ref={cardRef}
                                key={completeUsers[0]._id}
                                preventSwipe={isMobile ? ['up', 'down'] : ['up', 'down', 'left', 'right']}
                                onSwipe={(dir) => {
                                    setCardBg(dir);
                                    onSwipe(dir, completeUsers[0]._id); // ✅ Trigger API
                                }}
                                swipeRequirementType="position"
                                onCardLeftScreen={onCardLeftScreen} // Update when card left screen
                            >
                                <DevCard user={completeUsers[0]} bgCard={cardBg} />
                            </TinderCard>

                            {/* ⬅️➡️ Buttons only for desktop */}
                            {!isMobile && (
                                <div className="flex gap-10 text-4xl mt-6">
                                    <button
                                        onClick={() => swipe('left')}
                                        className="bg-red-400 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                    <button
                                        onClick={() => swipe('right')}
                                        className="bg-green-400 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                                    >
                                        <i className="fa-solid fa-heart"></i>
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (<p className='text-center font-semibold'>No Cards Available</p>)}
                </div>

                {errorFeed === 403 ? '' : <RightPanel />}


            </div>
        </>
    );
};

export default Feed;
