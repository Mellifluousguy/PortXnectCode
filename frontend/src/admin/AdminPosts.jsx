import React, { useContext, useState, useEffect } from 'react';
import SideBar from '../AllFolders/UserDashBoard/SideBar';
import NavAdmin from './navAdmin';
import NavBar from '../AllFolders/UserDashBoard/NavBar';
import { AdminContent } from '../AllFolders/context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';


const AdminPosts = () => {
    const { backendUrl, postsData, getAdminPosts } = useContext(AdminContent);
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        getAdminPosts(); // ✅ Fetch posts when navigating to this component
    }, []);
    useEffect(() => {
        setPosts(postsData);
    }, [postsData]);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user?.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    const handleDeletePost = async (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const response = await axios.delete(`${backendUrl}/api/admin/project/${postId}`);
                if (response.data.success) {
                    toast.success(response.data.message);
                    setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
                } else {
                    toast.error(response.data.message);
                }
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
                    variants={fadeIn("right", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.1 }}
                    className='text-lg font-semibold bg-white px-4 shadow-sm py-3 rounded-md'>Posts Management</motion.h1>

                <motion.header
                    variants={fadeIn("left", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.1 }} className='bg-white p-4 rounded-md text-sm flex gap-4 items-center'>
                    <div className='border p-2 md:w-1/2 w-100 flex rounded-md gap-4 items-center border-gray-200'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Search posts by title or author..."
                            className='w-full outline-none'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.header>

                <motion.aside
                    variants={fadeIn("right", 0.1)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.1 }}
                    className='p-4 bg-white rounded-md'>
                    <ul className='flex justify-between mb-2 px-2 md:px-0 text-xs md:text-sm font-semibold pb-2'>
                        <li className='w-[10%] text-center'>Sr.No</li>
                        <li className='w-[40%]'>Post Title</li>
                        <li className='w-[25%] text-center'>Author</li>
                        <li className='w-[15%] hidden md:block text-center'>Created Date</li>
                        <li className='w-[10%] text-center'>Actions</li>
                    </ul>

                    <ul className='flex flex-col'>
                        {paginatedPosts.length > 0 ? (
                            paginatedPosts.map((post, index) => (
                                <motion.li
                                    variants={fadeIn("left", 0.1 * index)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    viewport={{ once: false, amount: 0.1 }} key={post._id} className='flex justify-between px-2 text-xs py-2 items-center md:text-sm'>
                                    <span className='w-[10%] text-center'>{startIndex + index + 1}</span>
                                    <span className='w-[40%] font-semibold'>{post.title}</span>
                                    <span className='w-[25%] text-center'>{post.user ? post.user.username : 'user'}</span>
                                    <span className='w-[15%] hidden md:block text-center'>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    <span className='w-[10%] text-center flex gap-2 justify-center'>
                                        <button className='text-red-500' onClick={() => handleDeletePost(post._id)}><i className='fa-solid fa-trash-can'></i></button>
                                    </span>
                                </motion.li>
                            ))
                        ) : (
                            <li className='text-center text-gray-500 py-3'>No posts found.</li>
                        )}
                    </ul>

                    {filteredPosts.length > 0 && (
                        <div className='flex justify-center text-xs md:text-sm gap-4 mt-4'>
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-brand text-white"}`}
                            >
                                <i className="fa-solid fa-chevron-left"></i> Previous
                            </button>
                            <span className='px-3 py-1 bg-gray-100 rounded-md'>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-brand text-white"}`}
                            >
                                Next <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    )}
                </motion.aside>
            </div>
        </div>
    );
};

export default AdminPosts;
