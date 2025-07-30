import React from 'react';
// Admin Components

export const AdminDashboard = React.lazy(() => import("./AdminDashboard"));
export const AdminPosts = React.lazy(() => import("./AdminPosts"));
export const AdminUsers = React.lazy(() => import("./adminUser"));
export const AdminNotifications = React.lazy(() => import("./adminNotification"));