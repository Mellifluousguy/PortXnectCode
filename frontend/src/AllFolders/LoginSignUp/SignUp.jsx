import React, { useContext, useState } from 'react';
import { AppContent } from '../context/LoginContent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners'; // ⬅️ Import Loader

const SignUp = () => {
  const { backendUrl, isLoggedin, setIsLogin, setIsLoggedin, getUserData } = useContext(AppContent);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [gitHub, setGitHub] = useState('');
  const [LinkedIn, setLinkedIn] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // ⬅️ Loader state

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const changeUserName = (e) => {
    setUsername(e.target.value);
    setGitHub(`https://github.com/${e.target.value}`);
    setLinkedIn(`https://linkedin.com/in/${e.target.value}`);
  }

  const onsubmitHandler = async (e) => {

    e.preventDefault();

    if (!validatePassword(password)) {
      return toast.error('Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character.');
    }



    setLoading(true); // ⬅️ Start loader

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, username, email, password, gitHub, LinkedIn });

      if (data.success) {
        setIsLoggedin(true);
        toast.success('User registered successfully!');
        setIsLogin(true);
        getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Signup failed');

    } finally {
      setLoading(false); // ⬅️ Stop loader
    }
  };
  return (
    <form className='gap-4 text-inner-text flex flex-col !py-4' onSubmit={onsubmitHandler}>

      {/* Full Name */}
      <div>
        <span className='text-heading-black text-sm font-semibold'>Full Name</span>
        <div className='flex gap-1 text-lg items-center border-1 border-[#9CA3AF] !p-2'>
          <i className='fa-solid fa-user !px-2'></i>
          <input
            type="text"
            name="name"
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder='Enter your name'
            className='text-base'
            minLength={2}
            maxLength={25}
            pattern="^[A-Za-z\s]+$"
            title="Only alphabets and spaces are allowed"
            required />
        </div>
      </div>

      {/* Username */}
      <div>
        <span className='text-heading-black text-sm font-semibold'>Username</span>
        <div className='flex gap-1 text-lg items-center border-1 border-[#9CA3AF] !p-2'>
          <i className='fa-solid fa-at !px-2'></i>
          <input
            type="text"
            onChange={changeUserName}
            value={username}
            name="username"
            placeholder='Choose a username'
            className='text-base placeholder:normal-case lowercase'
            minLength={8}
            maxLength={15}
            pattern="^[a-z0-9]+$"
            title="Only lowercase letters and numbers are allowed"
            required />
        </div>
      </div>

      {/* Email */}
      <div>
        <span className='text-heading-black text-sm font-semibold'>Email Id</span>
        <div className='flex gap-1 text-lg items-center border-1 border-[#9CA3AF] !p-2'>
          <i className='fa-solid fa-envelope !px-2'></i>
          <input
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder='Enter your email'
            className='text-base lowercase'
            required />
        </div>
      </div>

      {/* Password */}
      <div>
        <span className='text-heading-black text-sm font-semibold'>Password</span>
        <div className='flex gap-1 text-lg items-center border-1 border-[#9CA3AF] !p-2'>
          <i className='fa-solid fa-lock !px-2'></i>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            name="password"
            placeholder='Enter your password'
            className='text-base'
            minLength={8}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Must contain 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be at least 8 characters long"
            required />
        </div>
      </div>

      {/* Submit */}
      {loading ? (
        <div className='flex justify-center items-center'>
          <RingLoader color="#5471FE" size={50} />
        </div>
      ) : (
        <button type='submit' className='cursor-pointer bg-black text-white text-base !p-2'>Sign Up</button>
      )}
    </form>
  );
};

export default SignUp;
