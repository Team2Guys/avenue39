'use client';
import TopHero from '@/components/top-hero';
import Link from 'next/link';
import React from 'react';
import { PrivacyPolicybredcrumbs } from '@/data/data';
import { TermsCondition } from '@/data';

const TermsAndConitions: React.FC = () => {
  return (
    <>
      <TopHero
        title="Terms & Conditions--Avenue39"
        breadcrumbs={PrivacyPolicybredcrumbs}
      />
      <div>
        <div className="max-w-5xl mx-auto p-4">
          {TermsCondition.map((section: any, index: number) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>

              <div className=" space-y-4">
                {section.description.map(
                  (description: string, lineIndex: number) => {
                    return (
                      <p
                        key={lineIndex}
                        className="text-base w-full text-start"
                      >
                        {description
                          .split(/(\[\[PHONE_LINK\]\]|\[\[EMAIL_LINK\]\])/)
                          .map((part, idx) => {
                            if (part === '[[PHONE_LINK]]') {
                              return (
                                <Link
                                  key={idx}
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
      </div>
    </>
  );
};

export default TermsAndConitions;
