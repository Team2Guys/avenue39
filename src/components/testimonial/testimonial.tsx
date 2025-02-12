'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from '../ui/Container';
import TestimonialCard from '../ui/testimonial-card';
import { StaticImageData } from 'next/image';
import TestimonialPrevArrow from './testimonial-prev-arrow';
import TestimonialNextArrow from './testimonial-next-arrow';
import { Skeleton } from '../ui/skeleton';

interface TestimonialProps {
  testimonialitems: Array<{
    id: number;
    profile: StaticImageData;
    name: string;
    comment: string;
    reviews: number;
  }>;
}

const settings = {
  arrows: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  speed: 500,
  prevArrow: <TestimonialPrevArrow />,
  nextArrow: <TestimonialNextArrow />,
  responsive: [
    {
      breakpoint: 1350,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const Testimonial: React.FC<TestimonialProps> = ({ testimonialitems }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="bg-lightforeground overflow-hidden"
      id="testimonial-section"
    >
      <Container className="py-5 md:py-20 text-center">
        <p className="text-20 font-medium md:font-normal">Testimonial</p>
        <h2 className="font-medium text-16 xs:text-3xl md:text-4xl w-5/6 xs:w-3/4 lg:w-5/12 mx-auto tracking-wide leading-relaxed md:leading-relaxed mt-3 px-4">
          We Care About Our Customer’s Experience Too
        </h2>
        <div className="testimonial-card-wrapper mt-5 md:mt-16 ">
          {loading ? (
            <Slider
              {...settings}
              className="mx-2 testimonial-slider ml-2 mr-2 pb-20 "
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col">
                  <Skeleton className="h-80 max-w-[380px] w-full rounded-lg mx-auto" />
                  <Skeleton className="h-6 w-3/4 mx-auto mt-3 " />
                  <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
                  <Skeleton className="h-4 w-1/3 mx-auto mt-2" />
                </div>
              ))}
            </Slider>
          ) : (
            <Slider
              {...settings}
              className="mx-2 xs:mx-0 testimonial-slider pb-20"
            >
              {testimonialitems.map((card) => (
                <div key={card.id}>
                  <TestimonialCard card={card} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
