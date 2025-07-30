import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContent = createContext();

export const AdminContextProvider = ({ children }) => {
    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // State Management
    const [totalUsers, setTotalUsers] = useState(0);
    const [verifiedUsers, setVerifiedUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [recentSignups, setRecentSignups] = useState([]);
    const [userData, setUserData] = useState([]);
    const [postsData, setPostsData] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Fetch Admin Data
    const getAdminData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/users`,{
                withCredentials: true
              });
            if (data.success) {
                setTotalUsers(data.users.length);
                setVerifiedUsers(data.users.filter(user => user.isAccountVerified).length);
                setUserData(data.users);
            }
        } catch (error) {
            
        }
    }
    

    const getAdminPosts = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/projects`,{
                withCredentials: true
              });
            if (data.success) {
                setTotalPosts(data.projects.length);
                setPostsData(data.projects)
            }
        } catch (error) {
            
        }
    }

    // Value to provide
    const value = {
        backendUrl,
        totalUsers,
        verifiedUsers,
        totalPosts,
        userData,
        postsData,
        getAdminData,
        getAdminPosts,
    };

    return <AdminContent.Provider value={value}>{children}</AdminContent.Provider>;
};
