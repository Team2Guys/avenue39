'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from '../ui/Container';
import TestimonialCard from '../ui/testimonial-card';
import { StaticImageData } from 'next/image';
import TestimonialPrevArrow from './testimonial-prev-arrow';
import TestimonialNextArrow from './testimonial-next-arrow';

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
  slidesToScroll: 1,
  speed: 500,
  prevArrow: <TestimonialPrevArrow />,
  nextArrow: <TestimonialNextArrow />,
  responsive: [
    {
      breakpoint: 1350,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
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
  return (
    <section className="bg-lightforeground overflow-hidden">
      <Container className="pt-28 pb-20 text-center">
        <p className="text-20 font-normal">Testimonial</p>
        <h2 className="font-medium text-2xl xs:text-3xl md:text-4xl w-5/6 xs:w-3/4 lg:w-5/12 mx-auto tracking-wide leading-relaxed md:leading-relaxed mt-3 px-4">
          We Care About Our Customer’s Experience Too
        </h2>
        <div className="testimonial-card-wrapper mt-16">
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
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
