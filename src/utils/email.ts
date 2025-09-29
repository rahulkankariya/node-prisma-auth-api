import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
 host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



export const sendMail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent:', info.response);
    return { success: true, info };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const sendOTP = async (to: string, code: string) => {
  const subject = 'Your OTP Code';
  const text = `Your OTP code is: ${code}`;
  const html = `<p>Your OTP code is: <strong>${code}</strong></p>`;
  return sendMail(to, subject, text, html);
};