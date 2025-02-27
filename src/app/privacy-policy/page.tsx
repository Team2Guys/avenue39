import TopHero from '@/components/top-hero';
import Link from 'next/link';
import React from 'react';
import { PrivacyPolicybredcrumbs } from '@/data/data';
import { policySections } from '@/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Your Data & Security Protection',
  description: 'Learn how we protect your personal data, ensure security, and handle information responsibly. Read our Privacy Policy for a safe and secure shopping experience.',
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
    canonical: '/privacy-policy',
  },
}

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <TopHero breadcrumbs={PrivacyPolicybredcrumbs} />
      <div>
      <h1 className='text-center text-[36px] font-medium mt-5'>Privacy Policy</h1>
        <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-2">
        Privacy Policy
          </h2>
          <p className='text-base'>When you visit www.avenue39.com (the &apos;Website&apos;), we collect, use, disclose, and secure your information under this Privacy Policy. You agree to the terms and conditions stated in this privacy policy by using or accessing our website. If you disagree with any aspect of this policy, we respect your decision to stop using this website.</p>
          {policySections.map((section: any, index: number) => (
            <div key={index} className="mb-6 mt-5">
              <h2 className="text-xl font-semibold mb-2">
                {index + 1}. {section.title}
              </h2>

              <div className="space-y-4">
                {section.description.map((description: string, lineIndex: number) => {
                  const lines = description.split('\n');
                  return (
                    <div key={lineIndex}>
                      <ul className="list-disc pl-6">
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
                      </ul>
                    </div>
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