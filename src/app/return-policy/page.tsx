import React from 'react';
import TopHero from '@/components/top-hero';
import { TReturnPolicybredcrumbs } from '@/data/data';
import { ReturnPolicy as returnPolicyData } from '@/data';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return Policy | Easy Returns & Refunds Process',
  description:
    'Read our return policy to understand how to return or exchange items easily. Hassle-free refunds and customer-friendly return guidelines.',
  openGraph: {
    title: 'Return Policy',
    description: 'Return Policy description',
    url: 'fullUrl',
    images: [{url: 'imageUrl',alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: '/return-policy',
  },
};

const ReturnPolicyPage: React.FC = () => {
  return (
    <>
      <TopHero breadcrumbs={TReturnPolicybredcrumbs} />

      <h1 className='text-center text-[36px] font-medium mt-5'>Return - Policy</h1>
      <div className="max-w-5xl mx-auto p-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Return Policy</h2>
          <p className="text-base w-full text-start">
            Avenue39 is a brand that people can trust, as we keep their
            experience with our products beyond their expectations. However, we
            come to terms with the fact that, occasionally, it is just
            impossible to prevent returns. Avenue39 has a fair and logical
            return and refund policy.
          </p>
          <p className="text-base w-full text-start">
            Please read through the following details to learn how we handle
            returns and refunds.
          </p>
        </div>
        {returnPolicyData.map((section: any, index: number) => (
          <div key={index} className="mb-6 mt-5">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <div className=" space-y-4">
              {section.description.map(
                (description: string, lineIndex: number) => {
                  return (
                    <p key={lineIndex} className="text-base w-full text-start">
                      {description
                        .split(/(\[\[PHONE_LINK\]\]|\[\[EMAIL_LINK\]\])/)
                        .map((part, idx) => {
                          if (part === '[[PHONE_LINK]]') {
                            return (
                              <Link
                                key={idx}
                                target="_blank"
                                href="tel:+971505974495"
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
    </>
  );
};

export default ReturnPolicyPage;
