'use client';

import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import PageCover from './PageCover';
import { bookData as originalBookData } from '@/data/bookData';
import FlipsPage from './FlipsPage';
import Image from 'next/image';

const DemoBook: React.FC = () => {
  const flipBook = useRef<any>(null);

  const adjustBookData = (data: typeof originalBookData) => {
    if (data.length % 2 !== 0) {
      data.push({
        type: 'page',
        number: data.length,
        content: 'The End',
        image: '/images/catalogue/catelog1.webp',
      });
    }
    return data;
  };
  const bookData = adjustBookData([...originalBookData]);

  return (
    <div className="relative w-full mx-auto">
      <HTMLFlipBook
        width={450}
        height={600}
        size="stretch"
        minWidth={450}
        maxWidth={450}
        minHeight={600}
        maxHeight={600}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="!h-[440px] sm:!h-[600px] object-cover"
        ref={flipBook}
        startPage={0}
        drawShadow={true}
        flippingTime={1000}
        useMouseEvents={true}
        style={{ margin: '0 auto' }}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        showPageCorners={true}
        disableFlipByClick={false}
        swipeDistance={30}
      >
        {bookData.map((page: any, index: number) =>
          page.type === 'cover' ? (
            <PageCover key={index}>
              <Image
                width={800}
                height={600}
                loading='eager'
                src={page.image}
                alt={page.content}
                className="shadow-md object-fill h-[440px] sm:!h-[600px] w-full"
              />
            </PageCover>
          ) : (
            <FlipsPage key={index} number={page.number}>
              <Image
                width={800}
                loading='eager'
                height={800}
                src={page.image}
                alt={page.content}
                className="shadow-md object-fill h-[440px]  sm:!h-[600px] w-full"
              />
            </FlipsPage>
          ),
        )}
      </HTMLFlipBook>
    </div>
  );
};

export default DemoBook;
