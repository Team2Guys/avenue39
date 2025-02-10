import TopHero from '@/components/top-hero';
import Link from 'next/link';
import React from 'react';
import { TShippingPolicybredcrumbs } from '@/data/data';
import { ShippingPolicy as shippingPolicyData } from '@/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Fast & Secure Delivery Information',
  description: ' Discover our shipping policy, including delivery times, costs, and international shipping options. Enjoy a hassle-free shopping experience with reliable shipping services.',
  openGraph: {
    title: 'Shipping Policy',
    description: 'Shipping Policy description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: 'shipping-policy',
  },
};

const ShippingPolicy: React.FC = () => {
  return (
    <>
      <TopHero
        title="Shipping Policy"
        breadcrumbs={TShippingPolicybredcrumbs}
      />
      <div>
        <div className="max-w-5xl mx-auto p-4">
          
          <h1 className="text-xl font-semibold mb-2">General Information For Delivery Of Our Products</h1>
          <p className='text-base w-full text-start'>All orders made through the Avenue39 website depend on product availability at the time of purchase. If any item in your order is not available, we will quickly inform you via email or provide updates on the product page.</p>
          {shippingPolicyData.map((section: any, index: number) => (
            <div key={index} className="mb-6 mt-4">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>

              <div className="space-y-4">
                {section.description.map(
                  (description: string, lineIndex: number) => {
                    return (
                      <p
                        key={lineIndex}
                        className="text-base w-full text-start"
                      >
                        {description
                          .split(
                            /(\[\[PHONE_LINK\]\]|\[\[EMAIL_LINK\]\]|\[\[WHATSAPP_LINK\]\])/,
                          )
                          .map((part, idx) => {
                            if (part === '[[PHONE_LINK]]') {
                              return (
                                <Link
                                  key={idx}
                                  href="tel:+971505974495"
                                  target="_blank"
                                  className="text-red-600 hover:underline"
                                >
                                  +971 50 597 4495
                                </Link>
                              );
                            } else if (part === '[[EMAIL_LINK]]') {
                              return (
                                <Link
                                  key={idx}
                                  target="_blank"
                                  href="mailto:cs@avenue39.com"
                                  className="text-red-600 hover:underline"
                                >
                                  cs@avenue39.com
                                </Link>
                              );
                            } else if (part === '[[WHATSAPP_LINK]]') {
                              return (
                                <Link
                                  key={idx}
                                  target="_blank"
                                  href="https://wa.me/971505974495"
                                  className="text-red-600 hover:underline"
                                >
                                  +971 50 597 4495
                                </Link>
                              );
                            } else {
                              return <span key={idx}>{part}</span>;
                            }
                          })}
                      </p>
                    );
                  },
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
