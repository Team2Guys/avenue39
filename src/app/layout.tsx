
import React from 'react';
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
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';

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

      <Head>
      <meta name="google-site-verification" content="zWttI0koSPy3RVDUFeuucyAT02aJoEnX5ZTO_BM_0H0" />
        <noscript><Image alt='facebook' height="1" width="1" style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=548519410929159&ev=PageView&noscript=1"
        /></noscript>
        {/* <!-- End Meta Pixel Code --> */}

      </Head>

      {/* Microsoft Clarity Code: */}
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=gtm2";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","mgy3jsx4mu");`
        }}
      />

      {/* Google Tag Manager Script */}
      <Script
        strategy='afterInteractive'
        id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `
                 (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TCNZZ8XP');

            `,
        }}
      /> 

      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-GNDWCH8Z6E"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GNDWCH8Z6E')

        `}
      </Script>

      {/* Meta Pixel */}
      <Script
        id="meta-pixel"
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '548519410929159');
            fbq('track', 'PageView');
            `,
        }}
      />
      <body>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TCNZZ8XP"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        {/* <!-- End Google Tag Manager (noscript) → */}
     {/* NoScript Fallback */}
     <noscript>
        <Image  height="1"  width="1"  style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=548519410929159&ev=PageView&noscript=1" alt="Facebook Pixel" />
      </noscript>

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
