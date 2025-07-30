import React, { useContext, useEffect, useState } from 'react';
import SideBar from '../AllFolders/UserDashBoard/SideBar';
import NavAdmin from './navAdmin';
import NavBar from '../AllFolders/UserDashBoard/NavBar';
import { AdminContent } from '../AllFolders/context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';


const AdminUser = () => {
    const { totalUsers, verifiedUsers, backendUrl, userData, getAdminData } = useContext(AdminContent);

    // State for Search & Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [filterVerified, setFilterVerified] = useState('');
    const [filterRole, setFilterRole] = useState('');

    const [editUserId, setEditUserId] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;



    // Filtering & Searching Users
    const filteredUsers = userData.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesVerification = filterVerified === "" ||
            (filterVerified === "verified" && user.isAccountVerified) ||
            (filterVerified === "unverified" && !user.isAccountVerified);

        const matchesRole = filterRole === "" || user.role.toLowerCase() === filterRole.toLowerCase();

        return matchesSearch && matchesVerification && matchesRole;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);


    useEffect(() => {
        getAdminData()
    }, []);

    // Handle Edit Click
    const handleEditClick = (user) => {
        setEditUserId(user._id);
        setNewRole(user.role);
        setIsEditModalOpen(true);
    };


    // Submit Edit
    const handleEditSubmit = async () => {
        try {
            const data = await axios.put(`${backendUrl}/api/admin/edit-user/${editUserId}`, { role: newRole });
            if (data.data) {
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
            setIsEditModalOpen(false);
            getAdminData(); // Refresh user data
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Delete User
    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const data = await axios.delete(`${backendUrl}/api/admin/delete-user/${id}`);
                if (data.success) {
                    toast.success(data.message)
                }
                else {
                    toast.error(data.message)
                }
                getAdminData(); // Refresh user list
            } catch (error) {
                toast.error(error.message);
            }
        }
    };




    return (
        <div>
            <NavBar />
            <SideBar />
            <div className='bg-sky-breeze flex flex-col gap-4 min-h-screen pl-[15%] md:pl-[22%] md:pr-20 pr-1 py-1 md:py-5 '>
                <NavAdmin />
                <motion.h1
                    variants={fadeIn("right", )}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }} className='text-lg font-semibold bg-white px-4 shadow-sm py-3 rounded-md'>User Management</motion.h1>

                {/* Stats Cards */}
                <header className='flex flex-wrap gap-8'>
                    <motion.span
                        variants={fadeIn("right", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.1 }}
                        className='p-4 font-bold w-[250px] flex items-center justify-center gap-4 bg-white rounded-md'>
                        <i className="fa-solid text-xl fa-users text-brand"></i>
                        <div>
                            <h2>Total Users</h2>
                            <span>{totalUsers}</span>
                        </div>
                    </motion.span>
                    <motion.span
                        variants={fadeIn("left", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.1 }} className='p-4 font-bold w-[250px] flex items-center justify-center gap-4 bg-white rounded-md'>
                        <i className="fa-solid text-xl fa-check text-brand"></i>
                        <div>
                            <h2>Total Verified Users</h2>
                            <span>{verifiedUsers}</span>
                        </div>
                    </motion.span>
                </header>

                {/* Search & Filters */}
                <motion.header
                    variants={fadeIn("left", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className='bg-white p-4 rounded-md text-sm justify-between flex gap-4 items-center'>
                    <div className='border p-2 w-full text-xs md:text-sm md:w-1/2 flex rounded-md gap-4 items-center border-gray-200'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Search user by name, username, or email..."
                            className='w-full outline-none'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className='md:block hidden'>
                        <select className='border  border-gray-500 p-2 mr-4 rounded-sm' value={filterVerified} onChange={(e) => setFilterVerified(e.target.value)}>
                            <option value="">All Users</option>
                            <option value="verified">Verified</option>
                            <option value="unverified">Unverified</option>
                        </select>
                        <select className='border border-gray-500 p-2 rounded-sm' value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </motion.header>

                {/* User Table */}
                <motion.aside
                    variants={fadeIn("up", 0.5)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.1 }} className='p-4 text-xs bg-white rounded-md'>
                    <motion.ul
                        variants={fadeIn("up", 0.2)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.1 }} className='flex justify-between mb-2 text-sm font-semibold pb-2'>
                        <li className='w-[10%] text-center'>Sr.No</li>
                        <li className='w-[40%]'>User</li>
                        <li className='w-[15%] text-center'>Role</li>
                        <li className='w-[15%] hidden md:block text-center'>Status</li>
                        <li className='w-[15%] hidden md:block text-center'>Joined</li>
                        <li className='w-[15%] text-center'>Actions</li>
                    </motion.ul>

                    {/* Users List */}
                    <ul className='flex flex-col'>
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user, index) => (
                                <motion.li
                                    variants={fadeIn("left", 0.1 * index)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{ once: true, amount: 0.1 }} key={user._id} className='flex justify-between py-2 items-center text-sm'>
                                    <span className='w-[10%] text-center'>{startIndex + index + 1}</span>
                                    <span className='w-[40%] overflow-hidden text-xs'>
                                        <h4 className='font-semibold'>{user.name} ({user.username})</h4>
                                        <span className='text-xs text-gray-600'>{user.email}</span>
                                    </span>
                                    <span className='w-[15%] text-center'>{user.role}</span>
                                    <span className={`w-[15%] hidden md:block text-center ${user.isAccountVerified ? "text-green-500" : "text-red-500"}`}>
                                        {user.isAccountVerified ? "Verified" : "Unverified"}
                                    </span>
                                    <span className='w-[15%] hidden md:block     text-center'>{new Date(user.createdAt).toLocaleDateString()}</span>
                                    <span className='w-[15%]  text-center flex gap-2 justify-center'>
                                        <button className='text-blue-500' onClick={() => handleEditClick(user)}><i className='fa-solid fa-pen-to-square'></i></button>
                                        <button className='text-red-500' onClick={() => handleDeleteUser(user._id)}><i className='fa-solid fa-trash-can'></i></button>
                                    </span>
                                </motion.li>
                            ))
                        ) : (
                            <li className='text-center text-gray-500 py-3'>No users found.</li>
                        )}
                    </ul>


                    {/* Edit Modal */}
                    {isEditModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
                            <div className="bg-gray-200 p-6 rounded-md text-sm w-96">
                                <h2 className="text-lg font-bold mb-4">Edit User</h2>
                                <label className="block mb-2">Role:</label>
                                <select
                                    className="border p-2 w-full mb-4"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                <div className="flex justify-end gap-2">
                                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleEditSubmit}>Save</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredUsers.length > 0 && (
                        <div className='flex text-xs justify-center md:text-sm gap-4 mt-4'>
                            <motion.button
                                variants={fadeIn("right", 0.1)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.1 }}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 text-xs rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-brand text-white"}`}
                            >
                                <i className="fa-solid fa-chevron-left"></i> Previous
                            </motion.button>
                            <motion.span
                                variants={fadeIn("up", 0.8)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.1 }}
                                className='px-3 py-1 bg-gray-100 rounded-md'>
                                Page {currentPage} of {totalPages}
                            </motion.span>
                            <motion.button
                                variants={fadeIn("left", 0.9)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{ once: true, amount: 0.1 }}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-brand text-white"}`}
                            >
                                Next <i className="fa-solid fa-chevron-right"></i>
                            </motion.button>
                        </div>
                    )}
                </motion.aside>
            </div>
        </div>
    );
};

export default AdminUser;
