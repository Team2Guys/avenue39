'use client'
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react'

const ColorText = ({ slide }: any) => {
   const [windowWidth, setWindowWidth] = useState<number>(0);

   useEffect(() => {
      const updateWidth = () => setWindowWidth(window.innerWidth);
      updateWidth();
      const handleResize = () => {
         clearTimeout((handleResize as any)._timer);
         (handleResize as any)._timer = setTimeout(updateWidth, 150);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   //   const isMobile = windowWidth < 770;

   const isWide = useMemo(() => {
      if (windowWidth > 2000) return 270;
      if (windowWidth > 1720) return 1720 - windowWidth * 0.7 - 60;
      if (windowWidth >= 1024) return windowWidth - windowWidth * 0.7 - 60;
      if (windowWidth > 500) return windowWidth - windowWidth * 0.5 - 48;
      return windowWidth - 10;
   }, [windowWidth]);
   return (
      <div className="flex flex-col justify-center items-center lg:w-[30%] w-full pb-2 text-center mx-auto">
         <div style={{ width: isWide ? `${isWide}px` : '250px' }}>
            <div className="font-Helveticalight">
               <h2 className="text-2xl pb-1 uppercase font-semibold">
                  {slide.Heading}
               </h2>
               <p className="text-18 font-extralight h-28 xs:h-[170px] sm:h-32">
                  {slide.Description}
               </p>
            </div>
            <div className="w-fit lg:h-full xl:mt-20 md:mt-10 mt-6 px-2 mx-auto">
               <Image
                  src={slide.imageUrl2}
                  className="w-full h-16 md:h-20"
                  alt="Left Image"
                  width={1200}
                  height={1200}
                  quality={70}
               />
            </div>
         </div>
      </div>
   )
}

export default ColorText