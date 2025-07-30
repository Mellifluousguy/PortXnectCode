import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContent } from '../context/LoginContent';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners'; // ⬅️ Import

const Login = ({ setIsResetPassword }) => {
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // ⬅️ Add state
  const navigate = useNavigate();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // ⬅️ Start loading
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password }, {
        withCredentials: true,
        timeout: 20000 // Optional: timeout after 20 sec
      });

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false); // ⬅️ Stop loading
    }
  };

  return (
    <div>
      <form className="text-inner-text grid gap-4 py-4" onSubmit={onsubmitHandler}>
        {/* Email */}
        <div className="grid gap-1">
          <label className="text-heading-black text-sm font-semibold">Email Address</label>
          <div className="grid grid-cols-[auto_1fr] gap-2 items-center border border-[#9CA3AF] p-2">
            <i className="fa-solid fa-envelope px-2"></i>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="text-base w-full"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="grid gap-1">
          <label className="text-heading-black text-sm font-semibold">Password</label>
          <div className="grid grid-cols-[auto_1fr] gap-2 items-center border border-[#9CA3AF] p-2">
            <i className="fa-solid fa-lock px-2"></i>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="text-base w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div
          className="text-text-dark cursor-pointer text-right hover:underline transition-all duration-200"
          onClick={() => setIsResetPassword(true)}
        >
          Forgot Password?
        </div>

        {/* Loader or Button */}
        {loading ? (
          <div className="flex justify-center items-center">
            <RingLoader color="#1B9AF5" size={50} />
          </div>
        ) : (
          <button
            type="submit"
            className="bg-black text-white text-base p-2 cursor-pointer hover:bg-gray-800 transition-all duration-200"
          >
            Sign In
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
