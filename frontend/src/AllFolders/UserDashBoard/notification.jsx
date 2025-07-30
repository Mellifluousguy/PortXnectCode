import React, { useContext, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import NavBar from './NavBar';
import SideBar from './SideBar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/LoginContent';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';


const Notification = () => {
    const { backendUrl, getNotifications, notifications, setNotifications } = useContext(AppContent);



    useEffect(() => {
        getNotifications();
    }, []); // Runs only once when component mounts

    const handleMarkAsRead = async (id) => {
        try {
            await axios.put(`${backendUrl}/api/notifications/${id}/read`);
            setNotifications(notifications.map(n =>
                n._id === id ? { ...n, isRead: true } : n
            ));
        } catch (error) {
            toast.error("Failed to mark notification as read");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/api/notifications/${id}`);
            setNotifications(notifications.filter(n => n._id !== id));
        } catch (error) {
            toast.error("Failed to delete notification");
        }
    };

    return (
        <>
            <NavBar />
            <SideBar />
            <div className='bg-sky-breeze flex flex-col gap-4 min-h-screen pl-[15%] md:pl-[22%] md:pr-20 pr-3 py-2 lg:py-5 ' >
                <motion.h1
                    variants={fadeIn("left", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.7 }}
                    className="text-xl font-semibold shadow-sm bg-white rounded-lg p-5">Notifications</motion.h1>

                {notifications.length > 0 ? (
                    notifications.map((notif, key) => (
                        <NotificationCard
                            key={notif._id}
                            {...notif}
                            onMarkAsRead={() => handleMarkAsRead(notif._id)}
                            onDelete={() => handleDelete(notif._id)}
                            delay={key * 0.1}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No notifications available</p>
                )}
            </div>
        </>
    );
};

const NotificationCard = ({ _id, title, delay, message, type, createdAt, isRead, userId, onMarkAsRead, onDelete }) => {
    const bgColor =
        type === "success" ? "bg-green-800 text-green-200"
            : type === "warning" ? "bg-yellow-800 text-yellow-200"
                : type === "error" ? "bg-red-800 text-red-200"
                    : "bg-blue-800 text-blue-200";

    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return (
        <motion.div
            variants={fadeIn("right", delay)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className={`flex bg-white shadow-sm rounded-lg px-5 py-3 gap-4 items-center ${isRead ? "opacity-60" : ""}`}>
            <i className={`fa-solid fa-${type === "success" ? "circle-check" : type === "warning" ? "circle-exclamation" : type === "error" ? "circle-xmark" : "circle-question"} text-4xl md:mx-4 rounded-full ${bgColor}`}></i>
            <div className="flex-grow">
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm text-gray-800">{message}</p>
                <p className="text-xs text-gray-500">{timeAgo}</p>
            </div>
            <div className="flex gap-3">
                {
                    userId === null ? "" :
                        !isRead && (
                            <button onClick={onMarkAsRead} className="text-green-600 hover:text-green-800 md:*:p-5">
                                <i className="fa-solid fa-check"></i>
                            </button>
                        )}
                <button onClick={onDelete} className="text-red-600 hover:text-red-800 md:p-5">
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </motion.div>
    );
};

export default Notification;
