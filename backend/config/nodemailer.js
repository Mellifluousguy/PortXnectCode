import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTPWELCOME_ID,
        pass: process.env.SMTPWELCOME_PASSWORD,  // Use the 16-character App Password
    }
});

export default transporter;