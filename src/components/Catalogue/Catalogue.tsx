import { bannerData } from '@/data/products';
import React from 'react';
import DemoBook from '../FlipBook/DemoBook';
import Link from 'next/link';

const Catalogue: React.FC = () => {
  const { title, buttonText, fileUrl } = bannerData;

  return (
   <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full bg-[#E2E3E5] h-full lg:pb-0 pb-8">
      <div className=" w-full max-sm:!h-[400px]  overflow-hidden mx-auto content-center items-center sm:col-span-2">
        <DemoBook />
      </div>
      <div className="lg:w-fit flex flex-col items-center justify-center h-full lg:m-0 sm:col-span-1">
        <div className="w-full flex flex-col items-center justify-center h-full">
          <h2 className="text-center text-[#707070] md:text-3xl font-thin text-3xl lg:text-6xl font-Helveticalight lg:mb-7 mb-4 uppercase">
            {title}
          </h2>
          <Link
            href={fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black font-Helveticalight text-white text-opacity-80 font-thin px-8 md:px-10 py-2 rounded-full tracking-[4px] hover:bg-gray-800 transition text-lg md:text-xl uppercase"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
