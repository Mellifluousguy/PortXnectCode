import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.VITE_BACKEND_URL, 
});

export default API;

export const registerUser = async (userData) => {
    try {
        const response = await API.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await API.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
