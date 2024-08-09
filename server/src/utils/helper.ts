import { HttpException, HttpStatus } from '@nestjs/common';
import nodemailer from 'nodemailer';
export const customHttpException = (error: string, status: string) => {
  throw new HttpException(error, HttpStatus[status]);
};

export const sendResetEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"Your App" <no-reply@yourapp.com>',
    to: email,
    subject: 'Password Reset',
    text: `Please use the following link to reset your password: ${resetLink}`,
    html: `<p>Please use the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  });
  return resetLink;
};
