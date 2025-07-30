import React, { useContext, useEffect, useState } from 'react';
import { AppContent } from '../context/LoginContent';
import axios from 'axios';
import { fadeIn } from '../../variants';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


const LeftPanel = () => {
    const { feedMatches, matchedUsers, fetchSwipeableUsers, deleteConversation, setChatUser, stringToColor, backendUrl, LikedUsers } = useContext(AppContent);
    const [localMatched, setLocalMatched] = useState([]);

    useEffect(() => {
        feedMatches();
    }, []);

    useEffect(() => {
        if (matchedUsers && matchedUsers.length) {
            setLocalMatched(matchedUsers);
        }
    }, [matchedUsers]);

    const dislikeUser = async (id) => {
        // Instantly remove from UI
        setLocalMatched(prev => prev.filter(user => user._id !== id));

        try {
            const res = await axios.post(`${backendUrl}/api/feed/unlike`, {
                targetUserId: id,
            });
            feedMatches(); // Optional re-fetch
            LikedUsers();
            fetchSwipeableUsers();
            deleteConversation(id);
        } catch (error) {
            toast.error('Error while disliking !!!');
        }
    };



    return (
        <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.01 }}
            className='w-70 p-4 hidden lg:block rounded-xl bg-white h-[95%] shadow-lg mx-4'>
            <h1 className='pb-1 text-lg font-semibold border-b border-gray-200 rounded-sm px-1'>
                <i className="fa-solid fa-user px-2 py-1.5 mr-2 rounded-full bg-gray-100 text-brand"></i>
                User's Matched
            </h1>
            <div className='overflow-y-auto'>
                {localMatched.length > 0 ? (
                    localMatched.map((matches) => (
                        <div key={matches._id} className='flex items-center justify-between mb-1 py-2 px-1 border-b border-gray-200 rounded-sm relative my-2'>
                            <span className='h-[35px] w-[35px] flex items-center justify-center mr-2 bg-brand text-white shadow-md rounded-full font-semibold' style={{ background: stringToColor(matches.name) }}>
                                {matches.name.slice(0, 1)}
                            </span>
                            <span className="text-xs flex-1">
                                <span className='font-semibold capitalize text-brand'>{matches.name}</span>
                                <br />
                                {matches.username}
                            </span>
                            <span className='text-lg flex items-center gap-2'>
                                <NavLink to={'/messages'}><i className="fa-regular fa-comment-dots text-brand" onClick={() => { setChatUser(matches._id) }}></i></NavLink>
                                <i className="fa-solid fa-xmark text-red-500 cursor-pointer" onClick={() => dislikeUser(matches._id)}></i>
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-muted py-2">No users matched yet</p>
                )}
            </div>
        </motion.div>
    );
};

export default LeftPanel;
