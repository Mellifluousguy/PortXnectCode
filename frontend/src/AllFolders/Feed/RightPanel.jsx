import React, { useContext, useEffect, useState } from 'react';
import { AppContent } from '../context/LoginContent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';


const RightPanel = () => {
    const { LikedUsers, fetchSwipeableUsers, likeFeed, backendUrl, feedMatches, stringToColor } = useContext(AppContent);
    const [localLikes, setLocalLikes] = useState([]);

    useEffect(() => {
        LikedUsers();
    }, []);

    useEffect(() => {
        if (likeFeed && likeFeed.length) {
            setLocalLikes(likeFeed);
        }
    }, [likeFeed]);

    const dislike = async (userId) => {
        // Instantly remove from local UI
        setLocalLikes(prev => prev.filter(user => user._id !== userId));

        try {
            const res = await axios.post(`${backendUrl}/api/feed/unlike`, {
                targetUserId: userId,
            });

            if (res.data.success) {
                feedMatches();
                fetchSwipeableUsers();
                LikedUsers();
            } else {
                toast.error('Failed to remove user');
            }
        } catch (error) {
            toast.error('Error while unliking');
            console.log(error);
        }
    };

    return (
        <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.01 }}
            className='w-70 p-4 hidden lg:block rounded-xl bg-white h-[95%] shadow-lg mx-4'>
            <h1 className='pb-1 text-lg font-semibold border-b border-gray-200 rounded-sm px-1'>
                <i className="fa-solid fa-user px-2 py-1.5 mr-2 rounded-full bg-gray-100 text-brand"></i>
                User's Liked
            </h1>
            <div className='overflow-y-auto'>
                {localLikes.length > 0 ? (
                    localLikes.map((like) => (
                        <div key={like._id} className='flex items-center justify-between  py-2 px-1 border-b border-gray-200 rounded-sm relative my-2'>
                            <span className=' h-[35px] w-[35px] flex items-center justify-center mr-2 text-center text-white shadow-md font-semibold rounded-full' style={{ background: stringToColor(like.name) }}>
                                {like.name.toUpperCase().slice(0, 1)}
                            </span>
                            <span className="text-xs flex-1">
                                <span className='font-semibold capitalize text-brand'>{like.name}</span>
                                <br />
                                {like.username}
                            </span>
                            <button className='text-lg' onClick={() => dislike(like._id)}>
                                <i className="fa-solid fa-xmark ml-2 text-red-600"></i>
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-muted py-2">No users matched yet</p>
                )}
            </div>
        </motion.div>
    );
};

export default RightPanel;
