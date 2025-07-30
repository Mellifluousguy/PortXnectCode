import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContent } from '../context/LoginContent';

const OtpVerification = () => {
    axios.defaults.withCredentials = true;

    const { backendUrl, getUserData, userData, isLoggedin } = useContext(AppContent);
    const [otp, setOtp] = useState('');
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30); // Countdown timer for Resend OTP
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true); // start loader
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
            if (data.success) {
                toast.success(data.message);
                getUserData();
                navigate('/dashboard');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false); // stop loader
        }
    };

    // 📌 Resend OTP function
    const resendOtpHandler = async () => {
        try {
            if (!userData?.email) {
                toast.error('User email not found!');
                return;
            }

            const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {
                email: userData.email,
            });

            if (data.success) {
                toast.success('OTP has been resent successfully!');
                setIsResendDisabled(true);
                setTimer(30); // Reset timer

                // Start countdown timer
                const interval = setInterval(() => {
                    setTimer((prevTimer) => {
                        if (prevTimer === 1) {
                            clearInterval(interval);
                            setIsResendDisabled(false);
                        }
                        return prevTimer - 1;
                    });
                }, 1000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        isLoggedin && userData && userData && userData.isAccountVerified && navigate('/dashboard')
    }, [isLoggedin, userData])




    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800">Verify OTP</h2>
                <p className="text-sm text-gray-600 text-center mb-4">
                    An OTP has been sent to <span className="font-semibold">{userData?.email}</span>.
                </p>

                <form className="grid gap-4" onSubmit={onSubmitHandler}>
                    {/* OTP Input */}
                    <div>
                        <label className="text-sm font-semibold">Enter OTP</label>
                        <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:border-blue-500">
                            <i className="fa-solid fa-key px-2 text-gray-500"></i>
                            <input
                                type="text"
                                className="w-full p-1 outline-none text-lg"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Verify Button */}
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <RingLoader color="#1B9AF5" size={50} />
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 transition-all"
                        >
                            Verify OTP
                        </button>
                    )}


                    {/* Resend OTP */}
                    <button
                        type="button"
                        className={`text-blue-500 text-sm font-semibold underline cursor-pointer text-center ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={resendOtpHandler}
                        disabled={isResendDisabled}
                    >
                        {isResendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
