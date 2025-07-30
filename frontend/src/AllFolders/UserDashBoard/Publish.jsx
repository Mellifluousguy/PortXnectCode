import React, { useContext, useState } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { AppContent } from '../context/LoginContent';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';


const Publish = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const [descLength, setDescLength] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveDemo: "",
    techs: [],
    stackType: ""
  });
  const [techInput, setTechInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Tech on Enter
  const handleTechKeyDown = (e) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      if (!formData.techs.includes(techInput.trim())) {
        setFormData({ ...formData, techs: [...formData.techs, techInput.trim()] });
      }
      
      setTechInput("");
    }
  };

  // Remove a Tech
  const removeTech = (tech) => {
    setFormData({ ...formData, techs: formData.techs.filter((t) => t !== tech) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/projects/add`,
        { ...formData, userId: userData?._id }
      );

      toast.success(response.data.message);
      setFormData({
        title: "",
        description: "",
        githubLink: "",
        liveDemo: "",
        techs: [],
        stackType: ""
      });
      setDescLength("");
      setTechInput("");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
      
    }
  };

  return (
    <>
      <NavBar />
      <SideBar />
      <div className='bg-sky-breeze flex flex-col gap-4 min-h-screen pl-[15%] md:pl-[22%] md:pr-20 pr-3 py-2 lg:py-5 '>
        <motion.h2
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className='text-xl shadow-sm font-semibold bg-white rounded-md p-4'>Publish Project</motion.h2>
        <motion.form
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className='bg-white shadow-sm rounded-md text-sm flex flex-col gap-4 p-4' onSubmit={handleSubmit}>

          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className='flex flex-col gap-1 max-w-[550px] md:w-120'>
            <label htmlFor="title">Title of the project:</label>
            <input
              type="text"
              id="title"
              name="title"
              className='border border-gray-300 rounded-md px-2 py-2'
              placeholder='Ex- Portfolio Website'
              onChange={handleChange}
              required
              value={formData.title}
            />
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className='flex flex-col gap-1 max-w-[550px] md:w-120'>
            <label htmlFor="description">Description of the project:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              className='border h-30 resize-none border-gray-300 rounded-md px-2 py-2'
              onChange={(e) => { setDescLength(e.target.value); handleChange(e); }}
              maxLength={200}
              placeholder='A social media platform for developers to showcase projects and collaborate.'
              value={formData.description}
              required
            />
            <span className='text-xs'>{descLength.length} of 200</span>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className='flex flex-col gap-1 max-w-[550px] md:w-120'>
            <label htmlFor="github">Github Link:</label>
            <input
              type="url"
              id="github"
              name="githubLink"
              className='border border-gray-300 rounded-md px-2 py-2'
              placeholder='Ex- https://github.com/abcd'
              onChange={handleChange}
              required
              value={formData.githubLink}
            />
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className='flex flex-col gap-1 max-w-[550px] md:w-120'>
            <label htmlFor="live">Live Link:</label>
            <input
              type="url"
              id="live"
              name="liveDemo"
              className='border border-gray-300 rounded-md px-2 py-2'
              placeholder='Ex- https://abc.xyz.com'
              onChange={handleChange}
              value={formData.liveDemo}
              required
            />
          </motion.div>

          {/* Tech Stack Input */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className='flex flex-col gap-1 max-w-[550px] md:w-120'>
            <label htmlFor="techs">Technologies Used:</label>
            <div className="border border-gray-300 rounded-md p-2 flex flex-wrap gap-2">
              {formData.techs.map((tech, index) => (
                <span key={index} className="bg-blue-100 text-blue-500 px-2 font-semibold uppercase rounded-md text-xs flex items-center">
                  {tech}
                  <button
                    type="button"
                    className="ml-1 text-lg text-red-400"
                    onClick={() => removeTech(tech)}
                  >×</button>
                </span>
              ))}
              <input
                type="text"
                id="techs"
                className="border-none outline-none flex-grow capitalize"
                placeholder="Type and press Enter..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
              />
            </div>
          </motion.div>

          {/* Stack Type Input */}
          <motion.div
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className='flex flex-col gap-1 max-w-[550px] md:w-120'>
            <label htmlFor="stackType">Tech Stack Type:</label>
            <input
              type="text"
              id="stackType"
              name="stackType"
              className='border border-gray-300 rounded-md px-2 py-2'
              placeholder='Ex- Frontend, Backend, Full-Stack'
              onChange={handleChange}
              value={formData.stackType}
              required
            />
          </motion.div>

          <div className='flex gap-4'>
            <motion.button
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.7 }}
              className='bg-gray-200 p-2 rounded' type="reset">Cancel</motion.button>
            <motion.button
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.7 }}
              className='bg-brand p-2 rounded text-white' type="submit">Submit</motion.button>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default Publish;
