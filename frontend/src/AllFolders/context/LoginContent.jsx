import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import colorScheme from './colorScheme.json'
import React from "react";
import socket from "../../socket";

export const AppContent = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [projectImages, setProjectImages] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [errorFeed, setErrorFeed] = useState('');
    const [users, setUsers] = useState([]);
    const [remainingCards, setRemainingCards] = useState(0); // Track remaining cards
    const userId = userData?._id
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (!userId) return;

        socket.emit("userConnected", userId);

        socket.on('onlineUsers', (users) => {
            setOnlineUsers(users);
        })
        return () => {
            socket.off('onlineUsers')
        }
    }, [userId])



    const [matchedUsers, setMatchedUsers] = useState([]);;
    const [likeFeed, setLikeFeed] = useState([]);

    const [chatUser, setChatUser] = useState();

    const techColors = colorScheme;
    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-Auth', {
                withCredentials: true
            });

            if (data.success) {
                setIsLoggedin(true);
                getUserData();
            } else {
                setIsLoggedin(false);
                setUserData(false);
            }

        } catch (error) {
            setIsLoggedin(false);
            setUserData(false);
            toast.error("Authentication failed. Please login again.");
        }
    };

    const getNotifications = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/notifications/`);
            setNotifications(data.notifications);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to load notifications");
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data', {
                withCredentials: true
            })
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAuthState();
    }, [])

    const fetchOGImage = async (url, projectId) => {
        if (!url || !projectId) return; // Ensure URL & Project ID exist

        try {
            const response = await fetch(`${backendUrl}/api/screenshot?url=${encodeURIComponent(url)}`, {
                withCredentials: true
            });
            const data = await response.json();

            if (data.ogImage) {
                setProjectImages((prevImages) => ({
                    ...prevImages,
                    [projectId]: data.ogImage, // Store image per project ID
                }));
            }
        } catch (error) {
            toast.error("Failed to fetch OG Image");
            console.error("Fetch OG Image Error:", error);
        }
    };

    useEffect(() => {
        fetchOGImage();
    }, [])

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true
            const { data } = await axios.post(backendUrl + '/api/auth/logout')
            data.success && setIsLoggedin(false)
            data.success && setUserData(false)
            navigate('/')
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    const fetchSwipeableUsers = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/feed/others`);
            setUsers(res.data.users);
            setRemainingCards(res.data.users.length); // Set the initial number of cards
        } catch (error) {
            if (error?.status === 403) {
                setErrorFeed(error.status);
            }
            else {
                toast.error(error.message);
            }
        }

    };

    const deleteConversation = async (receiverId) => {
        try {
            const res = await axios.post(`${backendUrl}/api/chat/delete`,{receiverId})
            console.log(res);
        }
        catch (error) {
            console.log(error);
            
        }
    }

    const feedMatches = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/feed/matches`);
            setMatchedUsers(res.data.matches)

        }
        catch (error) {
            console.log(error);

        }
    }

    const LikedUsers = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/feed/liked`);
            setLikeFeed(res.data.likedUsers);

        }
        catch (error) {
            console.log(error);
        }
    }


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


    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        isLogin, setIsLogin,
        getUserData,
        logout,
        fetchOGImage,
        projectImages,
        techColors,
        getNotifications,
        notifications,
        errorFeed,
        fetchSwipeableUsers,
        setNotifications,
        users,
        setUsers,
        remainingCards,
        setRemainingCards,
        feedMatches,
        matchedUsers,
        LikedUsers,
        likeFeed,
        chatUser,
        setChatUser,
        stringToColor,
        userId,
        onlineUsers,
        deleteConversation
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}