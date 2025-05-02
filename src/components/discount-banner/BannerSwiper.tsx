import chair from '@assets/images/banners/chair.webp';
import Magia from '@assets/images/banners/Magia.webp';
import Moderno from '@assets/images/banners/Moderno.webp';
import sofa from '@assets/images/banners/sofa.webp';
import MobileMagia from '@assets/images/banners/Magia_m.avif';
import MobileModerno from '@assets/images/banners/Moderno_m.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const initialSofaSlides = [
   {
     id: 1,
     slides: [
       {
         backgroundImage: Magia.src,
         mobileImage: MobileMagia.src,
         subtitle: 'Explore our latest luxury pieces now',
         subPara: 'High-Quality Materials',
         link: '/new-arrivals',
         buttonPosition: 'top',
         ImagePosition: 'center',
       },
       {
         backgroundImage: Moderno.src,
         mobileImage: MobileModerno.src,
         subtitle: 'Explore our latest luxury pieces now',
         subPara: 'High-Quality Materials',
         link: '/new-arrivals',
         buttonPosition: 'top',
         ImagePosition: 'center',
       },
     ],
   },
   {
     id: 2,
     slides: [
       {
         backgroundImage: chair.src,
         mobileImage: chair.src,
         subtitle: 'Shop our exclusive sale now',
         subPara: 'Up to 70% discount',
         link: '/sale',
         buttonPosition: 'bottom',
         ImagePosition: 'top',
       },
       {
         backgroundImage: sofa.src,
         mobileImage: sofa.src,
         subtitle: 'Shop our exclusive sale now',
         subPara: 'Up to 70% discount',
         link: '/sale',
         buttonPosition: 'bottom',
         ImagePosition: 'center',
       },
     ],
   },
 ];

const BannerSwiper = () => {
   const [windowWidth, setWindowWidth] = useState<number>(0);

   useEffect(() => {
     const updateWidth = () => setWindowWidth(window.innerWidth);
     updateWidth();
 
     const resizeListener = () => {
       clearTimeout((resizeListener as any)._timer);
       (resizeListener as any)._timer = setTimeout(updateWidth, 100);
     };
 
     window.addEventListener('resize', resizeListener);
     return () => window.removeEventListener('resize', resizeListener);
   }, []);
 
   const isMobile = windowWidth < 700;
  return (
   <div className="sofa_slider2">
   {initialSofaSlides.map((item, i) => (
     <Swiper
       key={i}
       modules={[Pagination]}
       spaceBetween={30}
       slidesPerView={1}
       dir={i === 1 ? 'rtl' : 'ltr'}
       pagination={{ clickable: true }}
       loop
       speed={1500}
       className={i === 1 ? 'mt-5' : ''}
     >
       {item.slides.map((slide, idx) => (
         <SwiperSlide key={idx}>
           <Link
             href={slide.link}
             className="h-40 xsm:h-[200px] xs:h-[290px] block rounded-2xl sofa-slider"
             style={{
               backgroundImage: `url(${isMobile ? slide.mobileImage : slide.backgroundImage})`,
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: isMobile ? 'center' : slide.ImagePosition,
             }}
           >
             <div className="flex justify-center items-center bg-[#0000004d] w-full h-full rounded-2xl">
               <div className="text-center">
                 <h3 className="bg-white py-1 px-3 text-base md:text-3xl rounded-2xl text-black hover:bg-main font-Helveticalight">
                   Shop <span className="text-red-600">{slide.buttonPosition === 'top' ? 'New Arrivals' : 'Sale'}</span>
                 </h3>
                 <h3 className="font-bold text-16 mt-4 text-white">{slide.subtitle}</h3>
                 <p className="text-14 font-bold text-white mt-2">{slide.subPara}</p>
               </div>
             </div>
           </Link>
         </SwiperSlide>
       ))}
     </Swiper>
   ))}
 </div>
  )
}

export default BannerSwiper