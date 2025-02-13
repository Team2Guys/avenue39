import TopHero from '@/components/top-hero';
import Link from 'next/link';
import React from 'react';
import { Tersmandcondition } from '@/data/data';
import { TermsCondition } from '@/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Shopping Policies & User Agreement',
  description: 'Read our Terms & Conditions to understand your rights and obligations when shopping with us. Learn about payments, warranties, and policies for a seamless experience.',
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
    canonical: '/terms-and-conditions',
  },
};

const TermsAndConitions: React.FC = () => {
  return (
    <>
      <TopHero breadcrumbs={Tersmandcondition} />
      <div>
        <h1 className='text-center text-[36px] font-medium mt-5'>Terms & Conditions-Avenue39</h1>
        <div className="max-w-5xl mx-auto p-4 mt-5 md:mt-10">
          <h2 className="text-xl font-semibold mb-2">
            Terms & Conditions – Avenue39
          </h2>
          <p>Welcome to Avenue39. These terms and conditions describe how to use our website, and how to adhere to them, especially when you make a purchase.</p>
          <ol className=" space-y-4 mt-5">
            {TermsCondition.map((section: any, index: number) => (
              <li key={index} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  {index + 1}. {section.title}
                </h2>

                <div className="space-y-4">
                  {section?.description.map((description: string, lineIndex: number) => {
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

                                console.log(idx, "idx")
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
          <div className='pl-6 space-y-4'>
            <p>Please contact us at:</p>
            <p>Email: <Link className='text-red-600 hover:underline' href={"mailto:cs@avenue39.com"}>cs@avenue39.com</Link></p>
            <p>Phone: <Link href="tel:+971505974495" target="_blank" className="text-red-600 hover:underline"> +971 50 597 4495 </Link></p>
            <p>For questions and concerns about our terms and conditions. You accept these terms and conditions by using Avenue39&apos;s website and services. Thank you for choosing Avenue39.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConitions;
