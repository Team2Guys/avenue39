import { bannerData } from '@/data/products';
import React from 'react';
import DemoBook from '../FlipBook/DemoBook';
import Link from 'next/link';

const Catalogue: React.FC = () => {
  const { title, buttonText, fileUrl } = bannerData;

  return (
    //     <section
    //   className=" lg:h-screen w-full h-96 flex items-center justify-end bg-cover lg:bg-left bg-center text-white lg:mt-10"
    //   style={{ backgroundImage: `url(${imageUrl})` }}
    // >

    //   <div className=" bg-[#fcfcfc] bg-opacity-10"></div>

    //   <div className="z-10 text-center transform lg:translate-x-[-60%] translate-x-[-10%] max-w-[90%] md:max-w-[70%]">
    //     <h2 className="text-3xl md:text-6xl font-extralight mb-8 text-black tracking-[6px]">{title}</h2>
    //     <a
    //       href={fileUrl}
    //       download
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="bg-black text-white font-extralight px-8 md:px-10 py-3 rounded-full tracking-[6px] hover:bg-gray-800 transition text-lg md:text-2xl"
    //     >
    //       {buttonText}
    //     </a>
    //   </div>

    // </section>

    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full bg-[#E2E3E5] h-full lg:pb-0 pb-8">
      <div className=" w-full max-sm:!h-[400px]  overflow-hidden mx-auto content-center items-center sm:col-span-2">
        <DemoBook />
      </div>
      <div className="lg:w-fit flex flex-col items-center justify-center h-full lg:m-0 sm:col-span-1">
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
