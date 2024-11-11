import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService set up
import { CreateNewsletterDto } from './dto/newsletter.dto';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class NewslettersService {
  constructor(private prisma: PrismaService) {}
  private transporter = nodemailer.createTransport({
    host: 'mail.blindsandcurtains.ae',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ADMIN_MAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });

  async addEmail(createNewsletterDto: CreateNewsletterDto): Promise<any> {
    const { email } = createNewsletterDto;
    if (!email) {
      return { message: 'Email is required' };
    }

    const user_mail = email.toLowerCase();
    const existingUser = await this.prisma.newsLetters.findUnique({
      where: { email: user_mail },
    });

    if (existingUser) {
      return { message: 'Already subscribed 😋' };
    }

    const newUser = await this.prisma.newsLetters.create({
      data: {
        email: user_mail,
      },
    });

    return { message: 'Newsletter subscribed successfully 🎉', user: newUser };
  }

  async getAllUsers(): Promise<any> {
    const users = await this.prisma.newsLetters.findMany();
    return users;
  }
  async deleteUserById(id: number): Promise<any> {
    const deletedUser = await this.prisma.newsLetters.delete({
      where: { id },
    });

    if (!deletedUser) {
      return { message: 'User not found' };
    }

    return { message: 'User has been deleted', deletedUser };
  }

  async sendPromotionalEmail(emails: string[], subject?: string): Promise<any> {
    if (!emails || emails.length === 0) {
      throw new Error('No emails provided');
    }

    // const htmlFilePath = path.join(
    //   __dirname,
    //   'promotional_email',
    //   'index.html',
    // );
    // const htmlContent = await this.readHtmlTemplate(htmlFilePath);
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>interiorfilm</title>
  </head>
  <body style="margin: 0 auto; max-width: 600px">
    <style>
        @media screen and (max-width: 425px) {
            .discound-heading{
                font-size: 36px !important;
            }
            .product-name{
                font-size: 14px !important;
            }
        }
        @media screen and (max-width: 350px) {
            .discound-heading{
                font-size: 32px !important;
            }
            .product-name{
                font-size: 12px !important;
            }
            .container{
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
        }
    </style>
    <div style="text-align: center; padding: 40px" class="container">
      <img src="https://avenue39.vercel.app/logo.png" alt="logo" style="max-width: 285px" />
    </div>
    <div style="padding: 34px 40px; background-color: #e4e4e4; text-align: center" class="container" >
      <h2 style="font-size: 22px; font-weight: 400; margin: 0 0 10px 0">
        Special Offers
      </h2>
      <h1 style="font-size: 46px; font-weight: 700; margin: 0 0 10px 0" class="discound-heading">
        SAVE 10% OFF
      </h1>
      <p style="font-size: 14px; line-height: 21px; width: 80%; margin: 0 auto">
        Enhance your space with our premium selections! Enjoy a limited-time discount on top-quality designs.
      </p>
      <img
        src="https://interiorfilm.vercel.app/email/images/image-holder.png"
        alt="product image"
        style="width: 100%; margin: 25px 0"
      />
      <a
        href="https://interiorfilm.vercel.app"
        target="_blank"
        style="
          background-color: #252323;
          color: white;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        "
        >Shop Now</a
      >
    </div>
    <div style="padding: 36px 40px; text-align: center" class="container">
      <div style=" display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px; " >
        <div style="border: 1px solid #2523233d">
          <img
            src="https://interiorfilm.vercel.app/email/images/product-image.png"
            alt="product image"
            style="width: 100%"
          />
          
          <div style="padding: 0px 15px; text-align: center">
            <h3 style="font-size: 16px; font-weight: 700; line-height: 24px" class="product-name">
              SONOMA OAK WOOD KS5001
            </h3>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: fit-content;
                margin:auto;
                gap: 10px;
                font-size: 13px;
                font-weight: 500;
                margin-bottom: 10px;
              "
            >
              <span style="color: #fb711d">Dhs32.00</span>&nbsp;&nbsp;
              <span style="text-decoration: line-through; color: #8f8f8f"
                >$58.00</span
              >
            </div>
          </div>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;
        <div style="border: 1px solid #2523233d">
          <img
            src="https://interiorfilm.vercel.app/email/images/product-image.png"
            alt="product image"
            style="width: 100%"
          />
          <div style="padding: 0px 15px; text-align: center">
            <h3 style="font-size: 16px; font-weight: 700; line-height: 24px" class="product-name">
              SONOMA OAK WOOD KS5001
            </h3>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: fit-content;
                margin:auto;
                gap: 10px;
                font-size: 13px;
                font-weight: 500;
                margin-bottom: 10px;
              "
            >
              <span style="color: #fb711d">Dhs32.00</span>&nbsp;&nbsp;
              <span style="text-decoration: line-through; color: #8f8f8f"
                >$58.00</span
              >
            </div>
          </div>
        </div>
     
      </div>
      <div style=" display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 40px; " >
        <div style="border: 1px solid #2523233d">
          <img
            src="https://interiorfilm.vercel.app/email/images/product-image.png"
            alt="product image"
            style="width: 100%"
          />
          <div style="padding: 0px 15px; text-align: center">
            <h3 style="font-size: 16px; font-weight: 700; line-height: 24px" class="product-name">
              SONOMA OAK WOOD KS5001
            </h3>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: fit-content;
                margin:auto;
                gap: 10px;
                font-size: 13px;
                font-weight: 500;
                margin-bottom: 10px;
              "
            >
              <span style="color: #fb711d">Dhs32.00</span> &nbsp;&nbsp;
              <span style="text-decoration: line-through; color: #8f8f8f"
                >$58.00</span
              >
            </div>
          </div>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;
        <div style="border: 1px solid #2523233d">
          <img
            src="https://interiorfilm.vercel.app/email/images/product-image.png"
            alt="product image"
            style="width: 100%"
          />
          <div style="padding: 0px 15px; text-align: center">
            <h3 style="font-size: 16px; font-weight: 700; line-height: 24px" class="product-name">
              SONOMA OAK WOOD KS5001
            </h3>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: fit-content;
                margin:auto;
                gap: 10px;
                font-size: 13px;
                font-weight: 500;
                margin-bottom: 10px;
              "
            >
              <span style="color: #fb711d">Dhs32.00</span>&nbsp;&nbsp;
              <span style="text-decoration: line-through; color: #8f8f8f"
                >$58.00</span
              >
            </div>
          </div>
        </div>
     
      </div>
      <a
        href="https://avenue39.vercel.app"
        target="_blank"
        style="
          background-color: #252323; color: white; padding: 12px 24px; font-size: 14px; font-weight: 500; text-decoration: none;        "
        >See All</a
      >
    </div>
    <div style="max-width: 444px; text-align: center; margin: 0 auto;  padding: 20px 40px;" class="container">
      <div
        style="
          display:flex;margin: auto;max-width: fit-content;align-items: center;gap: 12px;
        "
      >
        <a href="https://www.facebook.com/avenue39home"><img src="https://interiorfilm.vercel.app/email/images/facebook.png" alt="facebook" /></a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://www.instagram.com/avenue39home/"><img src="https://interiorfilm.vercel.app/email/images/instagram.png" alt="instagram" /></a>
      </div>
      <p style="font-size: 14px; line-height: 21px; color: #7a7474; margin-bottom: 30px;">
        Discover exclusive deals and premium quality in every order. We're here to make your shopping experience exceptional. Enjoy!
      </p>
      </p>
      <p style="font-size: 12px; line-height: 16px;">
        <span style="font-weight: 600;">Sent by Avenue39,</span><br>location, Shop No.6 Oud Metha Bldg, Block A - Oud Metha - Dubai, UAE <br> Phone, +971 4 252 2025
      </p>
      <div style="display:flex;max-width: fit-content;margin: auto;gap: 12px;">
        <a href="https://avenue39.vercel.app/contact" target="_blank" style="font-size: 12px; color: black;">Help Center</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://avenue39.vercel.app/privacy-policy" target="_blank" style="font-size: 12px; color: black;">Privacy Policy</a>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://avenue39.vercel.app/terms-condition" target="_blank" style="font-size: 12px; color: black;">Terms of Service</a>
      </div>
    </div>
  </body>
</html>
`;

    for (const email of emails) {
      try {
        await this.sendEmail(email, subject || 'Promotional Mail', htmlContent);
        // return true;
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
      }
    }

    return { message: 'Promotional emails sent successfully' };
  }

  private readHtmlTemplate(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, htmlContent) => {
        if (err) {
          reject(`Error reading HTML template: ${err.message}`);
        } else {
          resolve(htmlContent);
        }
      });
    });
  }

  private sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.MAILER_MAIL,
      to,
      subject,
      html: htmlContent,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(`Error sending email to ${to}: ${error.message}`);
        } else {
          console.log(`Email sent to ${to}: ${info.response}`);
          resolve();
        }
      });
    });
  }
}