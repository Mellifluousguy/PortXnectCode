import React from 'react';

// Lazy load components
export const AboutUs = React.lazy(() => import("./AboutUs/AboutUs"));
export const Access = React.lazy(() => import("./LoginSignUp/mainAccess"));
export const Contact = React.lazy(() => import("./Contact/Contact"));
export const Explore = React.lazy(() => import("./Explore/Explore"));
export const Features = React.lazy(() => import("./Features/Features"));
export const Home = React.lazy(() => import("./Home/Home"));
export const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
export const MyPost = React.lazy(() => import("./UserDashBoard/myPosts.jsx"));
export const NotFound = React.lazy(() => import("./NotFound/NotFound"));
export const Notification = React.lazy(() => import("./UserDashBoard/notification.jsx"));
export const UserDashboard = React.lazy(() => import("./UserDashBoard/UserDashboard"));
export const OtpVerify = React.lazy(() => import("./LoginSignUp/otpVerification.jsx"));
export const EditProfile = React.lazy(() => import("./UserDashBoard/editProfile.jsx"));
export const Publish = React.lazy(() => import("./UserDashBoard/Publish.jsx"));
export const Feed = React.lazy(() => import("./Feed/feed.jsx"));

export const Chat = React.lazy(() => import("./chat/chat.jsx"))
