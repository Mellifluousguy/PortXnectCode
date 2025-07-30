import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { RingLoader } from 'react-spinners';
import { AppContent } from "../context/LoginContent";

const ResetPassword = ({ setIsResetPassword }) => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // start loader
      const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });
      if (data.success) {
        alert('Please check for the spam section also for the otp trust use we are not fake.');
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // stop loader
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    // Here, you might verify OTP via backend
    if (otp.length === 6) {
      setOtpVerified(true);
      toast.success("OTP Verified");
    } else {
      toast.error("Invalid OTP");
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/reset-password", { email, otp, newPassword });
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // stop loader
    }
  };



  return (
    <div className="grid gap-4">
      <h3 className="text-xl text-center font-semibold">
        {otpVerified ? "Set New Password" : isEmailSent ? "Enter OTP" : "Reset Password"}
      </h3>

      {/* Step 1: Enter Email */}
      {!isEmailSent && !otpVerified && (
        <form className="grid gap-4" onSubmit={submitEmail}>
          <p className="text-sm text-center text-muted">Enter your email to receive an OTP</p>
          <div className="grid gap-1">
            <label className="text-heading-black text-sm font-semibold">Email Address</label>
            <div className="flex items-center border border-[#9CA3AF] p-2">
              <i className="fa-solid fa-envelope px-2"></i>
              <input
                type="email"
                placeholder="Enter your email"
                className="text-base w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <RingLoader color="#1B9AF5" size={50} />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-black text-white text-base p-2 cursor-pointer hover:bg-gray-800 transition-all duration-200"
            >
              Send OTP
            </button>
          )}
        </form>
      )}

      {/* Step 2: Enter OTP */}
      {isEmailSent && !otpVerified && (
        <form className="grid gap-4" onSubmit={submitOtp}>
          <p className="text-sm text-center text-muted">Enter the OTP sent to <b>{email}</b></p>
          <div className="grid gap-1">
            <label className="text-heading-black text-sm font-semibold">OTP</label>
            <div className="flex items-center border border-[#9CA3AF] p-2">
              <i className="fa-solid fa-key px-2"></i>
              <input
                type="text"
                placeholder="Enter OTP"
                className="text-base w-full outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <RingLoader color="#1B9AF5" size={50} />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-black text-white text-base p-2 cursor-pointer hover:bg-gray-800 transition-all duration-200"
            >
              Verify OTP
            </button>
          )}
        </form>
      )}

      {/* Step 3: Set New Password */}
      {otpVerified && (
        <form className="grid gap-4" onSubmit={onSubmitNewPassword}>
          <p className="text-sm text-center text-muted">Enter your new password</p>
          <div className="grid gap-1">
            <label className="text-heading-black text-sm font-semibold">New Password</label>
            <div className="flex items-center border border-[#9CA3AF] p-2">
              <i className="fa-solid fa-lock px-2"></i>
              <input
                type="password"
                placeholder="Enter new password"
                className="text-base w-full outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-1">
            <label className="text-heading-black text-sm font-semibold">Confirm Password</label>
            <div className="flex items-center border border-[#9CA3AF] p-2">
              <i className="fa-solid fa-lock px-2"></i>
              <input
                type="password"
                placeholder="Confirm new password"
                className="text-base w-full outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <RingLoader color="#1B9AF5" size={50} />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-black text-white text-base p-2 cursor-pointer hover:bg-gray-800 transition-all duration-200"
            >
              Reset Password
            </button>
          )}
        </form>
      )}

      {/* Back Button */}
      <p className="text-sm flex justify-between text-muted">
        {otpVerified ? "Go back to login? " : isEmailSent ? "Wrong Email? " : "Remembered password? "}
        <span className="text-black font-semibold cursor-pointer" onClick={() => setIsResetPassword(false)}>
          {otpVerified ? "Back to Login" : isEmailSent ? "Go Back" : "Back to Login"}
        </span>
      </p>
    </div>
  );
};

export default ResetPassword;
