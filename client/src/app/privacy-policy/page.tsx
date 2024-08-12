'use client';
import TopHero from '@/components/top-hero';
import Link from 'next/link';
import React from 'react';
// import { TPolicySection } from '@/types/types';
import { PrivacyPolicybredcrumbs } from '@/data/data';
import { policySections } from '@/data';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <TopHero title="Privacy-Policy" breadcrumbs={PrivacyPolicybredcrumbs} />
      <div>
        <div className="max-w-5xl mx-auto p-4">
          {policySections.map((section: any, index: number) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>

              <div className=" space-y-4">
                {section.description.map((description: string, lineIndex: number) => {
                  return (
                    <p key={lineIndex} className="text-base w-full text-start">
                    {description
                      .split(/(\[\[PHONE_LINK\]\]|\[\[EMAIL_LINK\]\]|\[\[WHATSAPP_LINK\]\])/)
                      .map((part, idx) => {
                        if (part === '[[PHONE_LINK]]') {
                          return (
                            <Link key={idx} href="tel:+971505974495" target="_blank" className="text-red-600 hover:underline">
                              +971 50 597 4495
                            </Link>
                          );
                        } else if (part === '[[EMAIL_LINK]]') {
                          return (
                            <Link key={idx} target="_blank" href="mailto:cs@avenue39.com" className="text-red-600 hover:underline">
                              cs@avenue39.com
                            </Link>
                          );
                        } else if (part === '[[WHATSAPP_LINK]]') {
                          return (
                            <Link key={idx} target="_blank" href="https://wa.me/971505974495" className="text-red-600 hover:underline">
                              +971 50 597 4495
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

export default PrivacyPolicy;
