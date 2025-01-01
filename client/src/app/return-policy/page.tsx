import React from 'react';
import TopHero from '@/components/top-hero';
import { TReturnPolicybredcrumbs } from '@/data/data';
import { ReturnPolicy as returnPolicyData } from '@/data'; // Rename the data import to avoid conflict
import Link from 'next/link';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Return Policy Page',
  description: 'Return Policy description',
  openGraph: {
    title: 'Return Policy',
    description: 'Return Policy description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: 'return-policy',
  },
} 

const ReturnPolicyPage: React.FC = () => {
  return (
    <>
      <TopHero title="Return Policy" breadcrumbs={TReturnPolicybredcrumbs} />
      <div>
        <div className="max-w-5xl mx-auto p-4">
          {returnPolicyData.map((section: any, index: number) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <div className=" space-y-4">
                {section.description.map((description: string, lineIndex: number) => {
                  return (
                    <p key={lineIndex} className="text-base w-full text-start">
                      {description
                        .split(/(\[\[PHONE_LINK\]\]|\[\[EMAIL_LINK\]\])/)
                        .map((part, idx) => {
                          if (part === '[[PHONE_LINK]]') {
                            return (
                              <Link key={idx} target="_blank" href="tel:+971505974495" className="text-red-600 hover:underline">
                                 +971 50 597 4495
                              </Link>
                            );
                          } else if (part === '[[EMAIL_LINK]]') {
                            return (
                              <Link key={idx} target="_blank" href="mailto:cs@avenue39.com" className="text-red-600 hover:underline">
                                cs@avenue39.com
                              </Link>
                            );
                          } else {
                            return <span key={idx}>{part}</span>;
                          }
                        })}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReturnPolicyPage;
