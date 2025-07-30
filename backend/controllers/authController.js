import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';
import { createNotification } from "./notificationController.js";
import transporter from '../config/nodemailer.js';
import { welcomeEmail, otpEmail, resetOtpEmail } from '../templates/emailTemplates.js'

export const register = async (req, res) => {
    const { name, email, password, username, gitHub, LinkedIn } = req.body;
    if (!name || !email || !password || !username) {
        return res.json({ success: false, message: 'Missing Details' })
    }

    try {

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Check if username is already taken
        const existingUsername = await userModel.findOne({ username });

        if (existingUsername) {
            return res.json({ success: false, message: "Username already taken" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, username, password: hashedPassword, gitHub, LinkedIn })
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Sending Welcome Email
        const mailOptions = {
            from: process.env.SMTPWELCOME_ID,
            to: email,
            subject: welcomeEmail.subject,
            html: welcomeEmail.message.replace("[User's Name]", username)
        }

        await transporter.sendMail(mailOptions);
        await createNotification(user._id, `Welcome ${username}`, `Welcome to the PortXNect ${username}`, "success");
        return res.json({ success: true });
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are requried' })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true });

    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({ success: true, message: "Logged Out" })
    }
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Send verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId, username } = req.body;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            res.json({ success: false, message: "Account Already Verified" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SMTPWELCOME_ID,
            to: user.email,
            subject: otpEmail(otp, username).subject,
            html: otpEmail(otp, username).message
        }
        await transporter.sendMail(mailOptions);

        res.json({
            success: true, message: "Verification OTP is sent on Email"
        })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Verify email using Otp
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        res.json({ success: false, message: 'Missing Details' })
    }
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.verifyOtp == '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid Otp' })
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'Otp Expired' })
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        await createNotification(user._id, "Your email has been verified!", "success");
        return res.json({ success: true, message: 'Email verified successfully' })


    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Check if user is authenticated
export const isAuthenticated = async (req, res) => {

    try {
        return res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Send password reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;


    if (!email) {
        return res.json({ success: false, message: 'Email is required' })
    }
    try {

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SMTPWELCOME_ID,
            to: user.email,
            subject: resetOtpEmail(otp, user.username).subject,
            html: resetOtpEmail(otp, user.username).message
        }
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'OTP sent to your email' });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// Reset User Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Email, OTP and new Password are required' });
    }
    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();
        await createNotification(user._id, "Your password was changed!", "info");
        return res.json({ success: true, message: 'Password has been reset successfully' })

    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    const { userId, name, bio, website, gender, designation, qualifications, gitHub, LinkedIn, technicalSkills, projectLearnings } = req.body;

    if (!userId) {
        return res.json({ success: false, message: 'User ID is required' });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (designation) user.designation = designation;
        if (website) user.website = website;
        if (qualifications) user.qualifications = qualifications;
        if (technicalSkills) user.technicalSkills = technicalSkills;
        if (projectLearnings) user.projectLearnings = projectLearnings;
        if (gitHub) user.gitHub = gitHub;
        if (LinkedIn) user.LinkedIn = LinkedIn;

        await user.save();

        await createNotification(user._id, "Profile Updated!", `Your Profile is been Updated ${user.username}`, "success");
        return res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
