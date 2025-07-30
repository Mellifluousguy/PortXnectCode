import React, { useRef } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            import.meta.env.VITE_EMAIL_SERVICE,       // Your Service ID
            import.meta.env.VITE_TEMPLATE_KEY,       // Your Template ID (correct one from dashboard)
            form.current,
            import.meta.env.VITE_PUBLIC_KEY            // Your Public Key/User ID from EmailJS
        )
            .then(() => {
                alert('Message sent successfully!');
                e.target.reset();
                
            })
            .catch((error) => {
                console.error('Email send error:', error);
                alert('Failed to send the message, please try again.');
            });
    };

    return (
        <>
            <NavBar />
            <div className='h-auto image flex gap-8 !pb-8 items-center flex-col justify-start'>
                <div className='flex relative justify-center text-white bg-[url(/assets/Banner2.webp)] w-full h-100 bg-cover flex-col text-center gap-2'>
                    <div className="absolute inset-0 bg-[rgba(17,24,50,0.5)]"></div>

                    <div className='relative'>
                        <motion.h1
                            variants={fadeIn('up', 0.1)}
                            initial='hidden'
                            whileInView='show'
                            viewport={{ once: true, amount: 0.1 }}
                            className='lg:text-8xl text-5xl font-semibold'
                        >
                            Get in Touch with Us!
                        </motion.h1>
                        <motion.span
                            variants={fadeIn('up', 0.2)}
                            initial='hidden'
                            whileInView='show'
                            viewport={{ once: true, amount: 0.1 }}
                            className='text-lg block text-[#efefef]'
                        >
                            Have questions? Reach out to us.
                        </motion.span>
                    </div>
                </div>

                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className='flex flex-col bg-[#F9FAFB] rounded-lg !p-8 w-[90%] lg:w-xl drop-shadow-md gap-8'
                >
                    {/* Title Field */}
                    <div className='flex-col gap-1 flex'>
                        <label htmlFor='title' className='text-dark-bg text-sm'>Title</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            className='border-1 text-base !px-2 !py-1 border-[#D1D5DB] rounded-sm'
                            required
                        />
                    </div>

                    {/* Full Name Field */}
                    <div className='flex-col gap-1 flex'>
                        <label htmlFor='from_name' className='text-dark-bg text-sm'>Full Name</label>
                        <input
                            type='text'
                            id='from_name'
                            name='from_name'
                            className='border-1 text-base !px-2 !py-1 border-[#D1D5DB] rounded-sm'
                            required
                        />
                    </div>

                    {/* Email Address Field */}
                    <div className='flex-col gap-1 flex'>
                        <label htmlFor='from_email' className='text-dark-bg text-sm'>Email Address</label>
                        <input
                            type='email'
                            id='from_email'
                            name='from_email'
                            className='border-1 text-base !px-2 !py-1 border-[#D1D5DB] rounded-sm'
                            required
                        />
                    </div>

                    {/* Message Field */}
                    <div className='flex-col gap-1 flex'>
                        <label htmlFor='message' className='text-dark-bg text-sm'>Message</label>
                        <textarea
                            id='message'
                            name='message'
                            className='h-50 resize-none border-1 text-base !px-2 !py-1 border-[#D1D5DB] rounded-sm'
                            required
                        />
                    </div>

                    <input
                        type='submit'
                        value='Send Message'
                        className='bg-brand text-sm font-semibold tracking-wide !py-2 rounded-sm text-white cursor-pointer'
                    />
                </form>

                <div className='flex flex-col gap-2 text-center'>
                    <span>Or reach us directly at</span>
                    <a href='mailto:portxnect@gmail.com' className='text-brand'>
                        <i className='fa-regular fa-envelope'></i>&nbsp; portxnect@gmail.com
                    </a>
                </div>

                <div className='flex gap-2 text-heading-black text-lg'>
                    <a href='#'><i className='fa-brands fa-linkedin'></i></a>
                    <a href='#'><i className='fa-brands fa-twitter'></i></a>
                    <a href='#'><i className='fa-brands fa-github'></i></a>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
