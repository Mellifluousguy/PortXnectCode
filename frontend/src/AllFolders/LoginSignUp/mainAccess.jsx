import React, { useContext, useEffect, useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import ResetPassword from './resetPassword';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/LoginContent';

const MainAccess = () => {

  const { isLoggedin, userData } = useContext(AppContent)
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { isLogin, setIsLogin } = useContext(AppContent);

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedin && userData && navigate('/dashboard')
  }, [isLoggedin, userData])

  return (
    <div className="h-1vh grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="h-screen p-16 grid gap-6 content-center bg-gradient-to-bl from-gradient to-black">
        <img
          src="./assets/tabIconDarkNoBg.webp"
          onClick={() => navigate('/')}
          className="w-30 cursor-pointer"
          alt="PortXNect Logo"
        />
        <h2 className="text-4xl text-white">Welcome to PortXNect</h2>
        <span className="text-muted">
          Connect, collaborate, and grow with developers worldwide. <br /> Join our thriving
          community today.
        </span>
      </div>

      {/* Right Side */}
      <div className="bg-cloud-gray h-screen grid gap-2 content-center justify-center">
        <div className="text-text-gray rounded-md shadow-sm w-sm bg-white grid gap-4 p-8">
          {/* Show Reset Password if active */}
          {isResetPassword ? (
            <ResetPassword setIsResetPassword={setIsResetPassword} />
          ) : (
            <>
              {/* Toggle Navigation */}
              <nav className="w-full grid grid-cols-2 text-lg text-center">
                <span
                  className={`cursor-pointer py-1 transition-all duration-200
                  ${!isLogin ? 'border-b-2 border-black' : 'hover:border-b-2 hover:text-muted border-muted'}`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
                <span
                  className={`cursor-pointer py-1 transition-all duration-200
                  ${isLogin ? 'border-b-2 border-black' : 'hover:border-b-2 hover:text-muted border-muted'}`}
                  onClick={() => setIsLogin(true)}
                >
                  Sign In
                </span>
              </nav>

              {/* Render Login or SignUp */}
              {isLogin ? <Login setIsResetPassword={setIsResetPassword} /> : <SignUp />}

            
              {/* Toggle Message */}
              <p className="text-sm text-muted text-center">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <span className="text-black font-semibold cursor-pointer" onClick={() => setIsLogin(false)}>
                      Sign Up Now
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <span className="text-black font-semibold cursor-pointer" onClick={() => setIsLogin(true)}>
                      Sign In Now
                    </span>
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainAccess;
