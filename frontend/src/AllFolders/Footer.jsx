import React, { useState } from 'react';
// import logo from './assets/tabIconDark-removebg.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  // State to track which section is open
  const [openSection, setOpenSection] = useState(null);

  // Function to toggle sections
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer>
      {/* Footer Main Content */}
      <div className='h-auto lg:h-[45vh] !px-8 !py-16 bg-[#111827] grid gap-y-12 justify-center grid-cols-1 lg:grid-cols-4 w-full'>
        {/* Brand & Description (Always Visible) */}
        <div className="h-full flex flex-col gap-7 justify-center">
          <div className='flex items-center select-none'>
            <img className='w-[75px] select-none' src='./assets/tabIconDark-removebg.webp' alt="PortXNect Logo" />
            <h1 className='text-white text-4xl font-extralight'>PortXNect</h1>
          </div>
          <span className='text-[#8B93A6]'>Connect, showcase, and collaborate with developers worldwide.</span>
        </div>

        {/* Product Section (Accordion in Mobile) */}
        <div className="!px-8 text-[#8B93A6]">
          <h2
            className='text-white font-semibold !pb-4 cursor-pointer lg:cursor-default flex justify-between items-center'
            onClick={() => toggleSection('product')}
          >
            Product
            {/* Chevron icon (visible only on mobile) */}
            <i className={`fa-solid fa-chevron-down lg:!hidden transition-transform ${openSection === 'product' ? 'rotate-180' : ''}`}></i>
          </h2>
          {/* Content (hidden on mobile when closed, always visible on desktop) */}
          <div className={`flex flex-col gap-1 ${openSection === 'product' ? 'flex' : 'hidden'} lg:flex`}>
            <Link to={'/explore'}>Explore</Link>
            <Link to={'/features'}>Features</Link>
            <Link to={'/AboutUs'}>About Us</Link>
            <Link to={'/contact'}>Contact</Link>
          </div>
        </div>

        {/* Company Section (Accordion in Mobile) */}
        <div className="!px-8  text-[#8B93A6]">
          <h2
            className='text-white font-semibold !pb-4 cursor-pointer lg:cursor-default flex justify-between items-center'
            onClick={() => toggleSection('company')}
          >
            Company
            {/* Chevron icon (visible only on mobile) */}
            <i className={`fa-solid fa-chevron-down lg:!hidden transition-transform ${openSection === 'company' ? 'rotate-180' : ''}`}></i>
          </h2>
          {/* Content (hidden on mobile when closed, always visible on desktop) */}
          <div className={`flex flex-col  gap-1 ${openSection === 'company' ? 'flex' : 'hidden'} lg:flex`}>
            <Link to={'/AboutUs'}>About</Link>
            <span>Blog</span>
            <span>Careers</span>
          </div>
        </div>

        {/* Connect Section (Accordion in Mobile) */}
        <div className="!px-8 text-[#8B93A6]">
          <h2
            className='text-white font-semibold !pb-4 cursor-pointer lg:cursor-default flex justify-between items-center'
            onClick={() => toggleSection('connect')}
          >
            Connect
            {/* Chevron icon (visible only on mobile) */}
            <i className={`fa-solid fa-chevron-down flex lg:!hidden transition-transform ${openSection === 'connect' ? 'rotate-180' : ''}`}></i>
          </h2>
          {/* Content (hidden on mobile when closed, always visible on desktop) */}
          <div className={`flex gap-4 ${openSection === 'connect' ? 'flex' : 'hidden'} lg:flex`}>
            <a href="#"><i className='fa-brands fa-twitter'></i></a>
            <a href="#"><i className='fa-brands fa-instagram'></i></a>
            <a href="#"><i className='fa-brands fa-github'></i></a>
            <a href="#"><i className='fa-brands fa-linkedin'></i></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="text-center flex flex-col text-white w-full bg-[#111827]">
        <hr className='self-center text-[#8B93A6] w-[95%]' />
        <span className='!py-4 w-[300px] self-center'>© 2025 PortXNect. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;