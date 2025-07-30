
export const welcomeEmail = {
    subject: "Welcome to PortXNect – Your Developer Hub Awaits! 🚀",
    message: `
       <div style="background-color: #f5f7fa; padding: 20px; text-align: center;">
            <img src='https://res.cloudinary.com/ddn39emb8/image/upload/v1741425910/logo_es3ylv.png' alt="PortXNect Logo" width="150" style="margin-bottom: 20px;">
            <h2 style="color: #5471FE;">Welcome to <b>PortXNect</b>, [User's Name]! 🎉</h2>
            <p style="color: #374151; font-size: 16px;">You're now part of an exclusive network of developers, innovators, and tech enthusiasts! 🚀</p>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <h3 style="color: #1C1E21;">What can you do here? 👇</h3>
                <ul style="text-align: left; display: inline-block; color: #6B7280; font-size: 15px;">
                    <li>✅ Build & showcase your developer profile</li><br/>
                    <li>✅ Share your projects & get feedback</li><br/>
                    <li>✅ Connect with like-minded developers</li><br/>
                    <li>✅ Collaborate & grow your network</li> 
                </ul>
            </div>

            <a href="http://localhost:5173/access" 
                style="display: inline-block; background-color: #5471FE; color: #fff; padding: 12px 20px; 
                       text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px;">
                🚀 Start Exploring Now
            </a>

            <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
                Need help? <a href="mailto:portxnect@gmail.com" style="color: #5471FE; text-decoration: none;">Contact us</a>
            </p>

            <p style="font-size: 12px; color: #9CA3AF;">PortXNect © 2025 | All Rights Reserved</p>
        </div>
    `
};


export const otpEmail = (otp, username) => ({
    subject: "🔐 Verify Your Account – PortXNect OTP",
    message: `
       <div style="background-color: #f5f7fa; padding: 20px; text-align: center;">
            <img src="https://res.cloudinary.com/ddn39emb8/image/upload/v1741425910/logo_es3ylv.png" 
                 alt="PortXNect Logo" width="150" style="margin-bottom: 20px;">
            <h2 style="color: #5471FE;">Your OTP for PortXNect Verification 🔑</h2>
            <p style="color: #374151; font-size: 16px;">
                Hello <b>${username}</b>, <br> Use the OTP below to verify your email and complete your registration.
            </p>

            <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <h1 style="color: #1C1E21; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
                <p style="color: #6B7280; font-size: 14px; margin-top: 10px;">
                    This OTP is valid for **10 minutes**. Do not share it with anyone.
                </p>
            </div>

            <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
                Didn't request this? Ignore this email or 
                <a href="mailto:portxnect@gmail.com" style="color: #5471FE; text-decoration: none;">contact support</a>.
            </p>

            <p style="font-size: 12px; color: #9CA3AF;">PortXNect © 2025 | All Rights Reserved</p>
        </div>
    `
});

export const resetOtpEmail = (otp, username) => ({
    subject: "🔑 Reset Your Password – PortXNect OTP",
    message: `
       <div style="background-color: #f5f7fa; padding: 20px; text-align: center;">
            <img src="https://res.cloudinary.com/ddn39emb8/image/upload/v1741425910/logo_es3ylv.png" 
                 alt="PortXNect Logo" width="150" style="margin-bottom: 20px;">
            <h2 style="color: #F94C10;">Password Reset Request 🔐</h2>
            <p style="color: #374151; font-size: 16px;">
                Hi <b>${username}</b>, <br> We received a request to reset your PortXNect password. 
                Use the OTP below to proceed.
            </p>

            <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <h1 style="color: #F94C10; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
                <p style="color: #6B7280; font-size: 14px; margin-top: 10px;">
                    This OTP is valid for **10 minutes**. Do not share it with anyone.
                </p>
            </div>

            <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
                If you didn’t request this, you can ignore this email or 
                <a href="mailto:portxnect@gmail.com" style="color: #F94C10; text-decoration: none;">contact support</a>.
            </p>

            <p style="font-size: 12px; color: #9CA3AF;">PortXNect © 2025 | All Rights Reserved</p>
        </div>
    `
});

export const accountDeletedEmail = (username) => ({
    subject: "⚠️ Your PortXNect Account Has Been Deleted",
    message: `
       <div style="background-color: #f5f7fa; padding: 20px; text-align: center;">
            <img src="https://res.cloudinary.com/ddn39emb8/image/upload/v1741425910/logo_es3ylv.png" 
                 alt="PortXNect Logo" width="150" style="margin-bottom: 20px;">
            <h2 style="color: #F94C10;">Account Deletion Notice ❌</h2>
            <p style="color: #374151; font-size: 16px;">
                Hi <b>${username}</b>, <br> Your PortXNect account has been deleted due to non-verification or violation of our platform guidelines.
            </p>

            <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <h3 style="color: #1C1E21;">Reason for deletion: 📌</h3>
                <ul style="text-align: left; display: inline-block; color: #6B7280; font-size: 15px;">
                    <li>⚠️ Account remained unverified for more than <b>30 days</b>.</li><br/>
                    <li>⚠️ Violation of our platform guidelines.</li>
                </ul>
            </div>

            <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
                If you believe this was a mistake or have any concerns, please reach out to us at  
                <a href="mailto:portxnect@gmail.com" style="color: #F94C10; text-decoration: none;">Contact Support</a>.
            </p>

            <p style="font-size: 12px; color: #9CA3AF;">PortXNect © 2025 | All Rights Reserved</p>
        </div>
    `
});


export const projectDeletedEmail = (username, projectName) => ({
    subject: "⚠️ Your Project Has Been Deleted – PortXNect",
    message: `
       <div style="background-color: #f5f7fa; padding: 20px; text-align: center;">
            <img src="https://res.cloudinary.com/ddn39emb8/image/upload/v1741425910/logo_es3ylv.png" 
                 alt="PortXNect Logo" width="150" style="margin-bottom: 20px;">
            <h2 style="color: #F94C10;">Project Deletion Notice ❌</h2>
            <p style="color: #374151; font-size: 16px;">
                Hi <b>${username}</b>, <br> Your project <b>${projectName}</b> has been deleted due to one or more of the following reasons.
            </p>

            <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <h3 style="color: #1C1E21;">Reason for deletion: 📌</h3>
                <ul style="text-align: left; display: inline-block; color: #6B7280; font-size: 15px;">
                    <li>⚠️ Project contained incomplete or misleading information.</li><br/>
                    <li>⚠️ Violation of PortXNect’s content guidelines.</li><br/>
                </ul>
            </div>

            <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">
                If you believe this was a mistake or need further assistance, please reach out to us at  
                <a href="mailto:portxnect@gmail.com" style="color: #F94C10; text-decoration: none;">Contact Support</a>.
            </p>

            <p style="font-size: 12px; color: #9CA3AF;">PortXNect © 2025 | All Rights Reserved</p>
        </div>
    `
});
