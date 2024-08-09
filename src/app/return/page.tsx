// page.tsx
'use client';

import React from 'react';
import TopHero from '@/components/top-hero';
import { TReturnPolicybredcrumbs } from '@/data/data';
import { ReturnPolicy as returnPolicyData } from '@/data'; // Rename the data import to avoid conflict

const ReturnPolicyPage: React.FC = () => {
  return (
    <>
      <TopHero title="Return Policy" breadcrumbs={TReturnPolicybredcrumbs} />
      <div>
        <div className="max-w-5xl mx-auto p-4">
          {returnPolicyData.map((section: any, index: number) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <div className="space-y-4">
                {section.description.map(
                  (description: string, lineIndex: number) => (
                    <p key={lineIndex} className="text-base w-full text-start">
                      {description}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReturnPolicyPage;
