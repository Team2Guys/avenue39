import { bannerData } from '@/data/products';
import React from 'react';
import DemoBook from '../FlipBook/DemoBook';
import Link from 'next/link';

const Catalogue: React.FC = () => {
  const { title, buttonText, fileUrl } = bannerData;

  return (

    <section className="  flex items-center lg:justify-start md:justify-start sm:justify-start justify-center gap-4 md:flex-nowrap flex-wrap w-full bg-[#E2E3E5] h-full lg:pb-0 pb-8">
      <div className="lg:w-[65%] md:w-[50%] w-full object-fill overflow-hidden">
        <DemoBook />
      </div>

      <div className="lg:w-fit flex flex-col items-center justify-center h-full md:w-fit w-[50%] lg:m-0 m-auto">
        <div className="w-full flex flex-col items-center justify-center h-full ">
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
