import React, { useContext, useEffect, useState } from 'react'
import { AppContent } from '../context/LoginContent'
import MiddleChat from './middleChat.jsx';
import RightChat from './rightChat';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants.js';


const chat = () => {

    const navigate = useNavigate();

    const { matchedUsers, setChatUser, chatUser, feedMatches, onlineUsers } = useContext(AppContent);

    const [searchItem, setSearchItem] = useState('');

    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 1100); // lg breakpoint (Tailwind)
        };

        handleResize(); // initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    useEffect(() => {
        feedMatches();
    }, [])

    const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).slice(-2);
        }
        return color;
    };

    const searchUser = (e) => {
        setSearchItem(e.target.value.toLowerCase());
    }

    if (isMobileView) {
        return (
            <div className='flex items-center justify-center flex-col gap-8 h-screen w-full text-center px-4'>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-2 text-red-600">⚠️ Chat Unavailable</h2>
                    <p className="text-gray-700">For using chat kindly use a desktop device.</p>
                </div>
                <button className='bg-brand py-3 px-6 rounded-md text-white' onClick={() => {navigate(-1 )}}> <i className="fa-solid fa-chevron-left" />&nbsp;{`Back`} </button>
            </div>
        );
    }


    return (
        <div className='flex h-screen'>
            <motion.div
                variants={fadeIn("right", 0.1)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.01 }}
                className="flex flex-col w-[22%] relative shadow-md bg-gray-50">
                <button className='self-start m-2 ml-4 text-2xl text-brand absolute cursor-pointer' onClick={() => navigate(-1)}><i className="fa-solid fa-circle-chevron-left"></i></button>
                <div className='flex p-4 gap-2 mt-6 flex-col w-full h-fit '>
                    <h2 className='font-medium text-xl'>Messages</h2>
                    <div className='bg-white text-gray-400 shadow-sm py-2 rounded-full text-sm'>
                        <i className="fa-solid fa-magnifying-glass mx-3"></i>
                        <input type="text" className='text-black' placeholder='Search conversations' onChange={searchUser} />
                    </div>
                </div>
                <section className='flex overflow-y-auto scroll-smooth flex-col'>
                    {
                        matchedUsers
                            .filter(user => user.name.toLowerCase().includes(searchItem))
                            .map((user, key) => (
                                <div className={`flex p-4 gap-2 border-b text-sm border-gray-100 items-center ${chatUser === user._id ? 'bg-blue-50 text-blue-500' : 'bg-white'}`} onClick={() => setChatUser(user._id)} key={user._id} role="button"
                                    tabIndex={0}>
                                    <span className="text-white px-3 py-2 text-base rounded-full" style={{ backgroundColor: stringToColor(user.name) }}>{user.name.slice(0, 1)}</span>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>{user.name.slice(0, 15)} <span className={`text-xs ${onlineUsers.includes(user._id) ? 'text-green-500' : 'text-gray-400'}`}>
                                            {onlineUsers.includes(user._id) ? '● Online' : '● Offline'}
                                        </span></span>

                                        <span className='text-xs'>{user.username}</span>
                                    </div>
                                </div>
                            ))
                    }
                </section>
            </motion.div>
            <div className={`flex col-span-3 w-[53%] bg-gray-00 `}>
                <MiddleChat />
            </div>



            <div className={`flex col-span-2 shadow-sm w-[25%]  ${chatUser === undefined ? 'hidden ' : ''}`}>
                <RightChat />
            </div>
        </div>
    )
}

export default chat