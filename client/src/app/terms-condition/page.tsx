import TopHero from '@/components/top-hero';
import Link from 'next/link';
import React from 'react';
import { PrivacyPolicybredcrumbs } from '@/data/data';
import { policySections } from '@/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'privacy-policy Page',
  description: 'privacy-policy description',
  openGraph: {
    title: 'privacy-policy',
    description: 'privacy-policy description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: 'privacy-policy',
  },
}

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <TopHero title="Privacy-Policy" breadcrumbs={PrivacyPolicybredcrumbs} />
      <div>
        <div className="max-w-5xl mx-auto p-4">
          <ol className="pl-6 space-y-4 list-none">
            {policySections.map((section: any, index: number) => (
              <li key={index} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  {index + 1}. {section.title}
                </h2>

                <div className="space-y-4">
                  <ul className="list-disc pl-6 space-y-4">
                    {section.description.map((description: string, lineIndex: number) => {
                      const lines = description.split('\n'); 
                      return (
                        <div key={lineIndex}>
                          {lines.map((line, idx) => (
                            <li key={idx} className="text-base">
                              {line
                                .split(/(\[\[PHONE_LINK\]\]|\[\[EMAIL_LINK\]\]|\[\[WHATSAPP_LINK\]\])/)
                                .map((part, idx2) => {
                                  if (part === '[[PHONE_LINK]]') {
                                    return (
                                      <Link key={idx2} href="tel:+971505974495" target="_blank" className="text-red-600 hover:underline">
                                        +971 50 597 4495
                                      </Link>
                                    );
                                  } else if (part === '[[EMAIL_LINK]]') {
                                    return (
                                      <Link key={idx2} target="_blank" href="mailto:cs@avenue39.com" className="text-red-600 hover:underline">
                                        cs@avenue39.com
                                      </Link>
                                    );
                                  } else if (part === '[[WHATSAPP_LINK]]') {
                                    return (
                                      <Link key={idx2} target="_blank" href="https://wa.me/971505974495" className="text-red-600 hover:underline">
                                        +971 50 597 4495
                                      </Link>
                                    );
                                  } else {
                                    return <span key={idx2}>{part}</span>;
                                  }
                                })}
                            </li>
                          ))}
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
