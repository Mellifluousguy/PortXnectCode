import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "../AllFolders/UserDashBoard/NavBar";
import SideBar from "../AllFolders/UserDashBoard/SideBar";
import NavAdmin from "./navAdmin";
import { AppContent } from "../AllFolders/context/LoginContent";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";


const AdminNotification = () => {
    const { backendUrl } = useContext(AppContent);
    const [notifications, setNotifications] = useState([]);
    const [formData, setFormData] = useState({ username: "", title: "", message: "", type: "info" });
    const [users, setUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    // Fetch users for dropdown
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/admin/users`);
                if (data.success) {
                    setUsers(data.users);
                }
            } catch (error) {
                toast.error("Error fetching users", error);
            }
        };
        fetchUsers();
    }, []);

    // Search username
    const handleSearch = (input) => {
        if (!input) {
            setSearchResults([]);
            return;
        }
        const filteredUsers = users.filter(user =>
            user.username.toLowerCase().includes(input.toLowerCase())
        );
        setSearchResults(filteredUsers);
    };

    // Select a username from dropdown
    const handleSelectUsername = (username) => {
        setFormData({ ...formData, username });
        setSearchResults([]);
    };

    // Fetch Notifications
    const fetchNotifications = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/notifications/admin/all`);
            const uniqueNotifications = data.notifications.filter((notif, index, self) =>
                index === self.findIndex(n => n.title === notif.title && n.message === notif.message)
            );
            setNotifications(uniqueNotifications);
        } catch (error) {
            toast.error("Failed to load notifications");
        }
    };
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Send Notification to User
    const handleSendToUser = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/notifications/admin/notify-user`, formData);
            toast.success(data.message);
            fetchNotifications();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send notification");
        }
    };

    // Send Global Notification
    const handleSendToAll = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/notifications/admin/notify-all`, {
                title: formData.title,
                message: formData.message,
                type: formData.type,
            });
            toast.success(data.message);
            fetchNotifications();
        } catch (error) {
            toast.error("Failed to send notification");
        }
    };

    const handleDeleteNotification = async (id) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/notifications/${id}`);
            toast.success(data.message);
            setNotifications(notifications.filter(notif => notif._id !== id)); // Update UI
        } catch (error) {
            toast.error("Failed to delete notification");
        }
    };


    return (
        <div>
            <NavBar />
            <SideBar />
            <div className="bg-sky-breeze flex flex-col gap-4 min-h-screen pl-[15%] md:pl-[22%] md:pr-20 pr-1 py-1 md:py-5 ">
                <NavAdmin />
                <motion.h1
                    variants={fadeIn("left", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.1 }} className="text-lg font-semibold bg-white px-4 shadow-sm py-3 rounded-md">
                    Admin Notifications
                </motion.h1>

                {/* Send Notification Section */}
                <motion.div
                    variants={fadeIn("left", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.1 }} className="bg-white shadow-sm p-4 rounded-md">
                    <motion.h2
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.1 }} className="font-semibold mb-3">Send Notification</motion.h2>
                    <div className="flex flex-col gap-3 text-sm">
                        {/* Username Search */}
                        <motion.div
                            variants={fadeIn("left", 0.4)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: false, amount: 0.1 }} className="relative">
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                value={formData.username}
                                onChange={(e) => {
                                    setFormData({ ...formData, username: e.target.value });
                                    handleSearch(e.target.value);
                                }}
                                className="border border-gray-300 w-full p-2 rounded-md"
                                autoComplete="off"
                            />
                            {searchResults.length > 0 && (
                                <div className="bg-white shadow-md border border-gray-300 absolute mt-1 top-full w-full rounded-md">
                                    {searchResults.map((user) => (
                                        <div
                                            key={user._id}
                                            className="p-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => handleSelectUsername(user.username)}
                                        >
                                            {user.username}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Inputs */}
                        <motion.input
                            variants={fadeIn("left", 0.5)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: false, amount: 0.1 }} type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border border-gray-300 p-2 rounded-md w-full" />
                        <motion.textarea
                            variants={fadeIn("left", 0.5)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: false, amount: 0.1 }}
                            name="message" placeholder="Message" value={formData.message} onChange={handleChange} className="border border-gray-300 p-2 resize-none rounded-md w-full h-[75px]"></motion.textarea>

                        {/* Notification Type */}
                        <motion.select
                            variants={fadeIn("left", 0.6)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{ once: false, amount: 0.1 }}
                            name="type" value={formData.type} onChange={handleChange} className="border border-gray-300 p-2 rounded-md w-full">
                            <option value="success">Success</option>
                            <option value="warning">Warning</option>
                            <option value="error">Error</option>
                            <option value="info">Info</option>
                        </motion.select>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <motion.button
                                variants={fadeIn("left", 0.1)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: false, amount: 0.1 }} onClick={handleSendToUser} className="bg-brand text-white px-4 py-2 rounded-md">Send to User</motion.button>
                            <motion.button
                                variants={fadeIn("left", 0.8)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: false, amount: 0.1 }} onClick={handleSendToAll} className="bg-green-500 text-white px-4 py-2 rounded-md">Send to All</motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Notification List */}
                <motion.div
                    variants={fadeIn("up", 0.9)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.1 }}
                     className="bg-white shadow-sm p-4 rounded-md mt-5">
                    <motion.h2
                        variants={fadeIn("left", 0.9)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.1 }}
                        className="font-semibold mb-3">Sent Notifications</motion.h2>
                    {notifications.length > 0 ? (
                        notifications.map((notif, index) => (
                            <NotificationCard key={notif._id} delay={index * 0.1} {...notif} onDelete={() => handleDeleteNotification(notif._id)} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No notifications available</p>
                    )}

                </motion.div>
            </div>
        </div>
    );

};


const NotificationCard = ({ _id, title, message, delay, type, createdAt, userId, onDelete }) => {
    const bgColor =
        type === "success" ? "bg-green-800 text-green-200"
            : type === "warning" ? "bg-yellow-800 text-yellow-200"
                : type === "error" ? "bg-red-800 text-red-200"
                    : "bg-blue-800 text-blue-200";

    return (
        <motion.div
            variants={fadeIn("left", delay)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.1 }} className="flex bg-white shadow-sm rounded-lg px-5 py-3 gap-4 items-center">
            <i className={`fa-solid fa-${type === "success" ? "circle-check" : type === "warning" ? "circle-exclamation" : type === "error" ? "circle-xmark" : "circle-question"} text-4xl mx-4 rounded-full ${bgColor}`}></i>
            <div className="flex-grow">
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm text-gray-800">{message}</p>
                {userId?.username ? (
                    <p className="text-sm text-gray-600">To: <span className="font-semibold">{userId.username}</span></p>
                ) : (
                    <p className="text-sm text-gray-600">To: <span className="font-semibold">All</span></p>
                )}
                <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>
            </div>
            <button onClick={onDelete} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
        </motion.div>
    );
};

export default AdminNotification;
