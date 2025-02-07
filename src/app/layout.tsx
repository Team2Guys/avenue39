// src/app/layout.js
import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import '@styles/style.css';
import Providers from '@/redux/provider';
import PathnameWrapper from '@/components/PathnameWrapper';
import { ToastContainer } from 'react-toastify';
import {
  belgium,
  Helvetica,
  Helveticalight,
  jadyn,
} from '@/components/language';
import WhatsIcon from '@/components/Icons/Whatsapp';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Avenue 39',
  description: 'Best ecommerce website',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${Helveticalight.variable} ${Helvetica.variable}  ${belgium.variable} ${jadyn.variable}`}
    >
      <body>
        <Providers>
          <PathnameWrapper>
            {children}
            <WhatsIcon />
            <ToastContainer />
          </PathnameWrapper>
        </Providers>
      </body>
    </html>
  );
}
