import TopHero from '@/components/top-hero';
import Link from 'next/link';
import React from 'react';
import { Tersmandcondition } from '@/data/data';
import { TermsCondition } from '@/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions Page',
  description: 'Terms & Conditions description',
  openGraph: {
    title: 'Terms & Conditions',
    description: 'Terms & Conditions description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: 'terms-condition',
  },
};

const TermsAndConitions: React.FC = () => {
  return (
    <>
      <TopHero title="Terms & Conditions-Avenue39" breadcrumbs={Tersmandcondition} />
      <div>
        <div className="max-w-5xl mx-auto p-4">
          <ol className=" pl-6 space-y-4">
            {TermsCondition.map((section: any, index: number) => (
              <li key={index} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  {index + 1}. {section.title}
                </h2>

                <div className="space-y-4">
                  {section.description.map((description: string, lineIndex: number) => {
                    return (
                      <ol key={lineIndex} className="list-decimal pl-6">
                        <li className=" list-disc text-base">
                          {description
                            .split(/(\[\[PHONE_LINK\]\]|\[\[EMAIL_LINK\]\])/)
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
                              } else {
                                return <span key={idx}>{part}</span>;
                              }
                            })}
                        </li>
                      </ol>
                    );
                  })}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default TermsAndConitions;
