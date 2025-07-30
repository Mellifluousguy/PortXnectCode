import React, { useContext, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import {
  AboutUs,
  Access,
  Contact,
  Explore,
  Features,
  Home,
  ProtectedRoute,
  MyPost,
  NotFound,
  Notification,
  UserDashboard,
  OtpVerify,
  EditProfile,
  Publish,
  Feed,
  Chat,
} from './AllFolders/components'
import { ToastContainer } from 'react-toastify';

import './App.css'
import { AdminDashboard, AdminPosts, AdminUsers, AdminNotifications } from './admin/adminComponents';
import { AppContent } from './AllFolders/context/LoginContent';
import { RingLoader } from 'react-spinners';

// Import of Socket.io
import socket from "./socket";

const App = () => {

  // Socket.io code
  useEffect(() => {
    socket.on("connect");
    return () => {
      socket.disconnect();
    };
  }, []);


  const { userData, isLoggedin } = useContext(AppContent);
  const AdminRoute = ({ children }) => {
    const role = userData.role;
    return role === "admin" ? children : <Navigate to="/not-found" />;
  };

  return (
    <>
      <ToastContainer theme="colored" position="bottom-right" />
      <Suspense fallback={
        <div className="absolute h-screen w-screen flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
          <RingLoader color="#1B9AF5" size={50} />
        </div>
      }>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={isLoggedin ? <Feed /> : <Home />} />
          <Route path="/home" element={<Home />} />

          {/* Explore Page */}
          <Route path="/explore" element={<Explore />} />

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />

          {/* Features Page */}
          <Route path="/features" element={<Features />} />

          {/* AboutUs Page */}
          <Route path="/AboutUs" element={<AboutUs />} />

          {/* Not Found Page */}
          <Route path='*' element={<NotFound />} />

          {/* Sign In / Sign Up */}
          <Route path='/access' element={<Access />} />

          {/* Protect Route */}
          <Route element={<ProtectedRoute />}>
            {/* Dashboard */}
            <Route path="/dashboard" element={<UserDashboard />} />

            {/* Edit Profile */}
            <Route path="/edit-profile" element={<EditProfile />} />

            {/* Publish Project */}
            <Route path='/publish' element={<Publish />} />

            {/* My Posts */}
            <Route path='/my-post' element={<MyPost />} />

            {/* Notifications */}
            <Route path='/notifications' element={<Notification />} />

            {/* Chat */}
            <Route path='/messages' element={<Chat />} />


          </Route>

          {/* Verify Otp */}
          <Route path='/email-verify' element={<OtpVerify />} />

          {/* Admin Routes */}
          <Route path='/admin/*' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path='/admin/dashboard/projects' element={<AdminRoute><AdminPosts /></AdminRoute>} />
          <Route path='/admin/dashboard/users' element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path='/admin/dashboard/notification' element={<AdminRoute><AdminNotifications /></AdminRoute>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App