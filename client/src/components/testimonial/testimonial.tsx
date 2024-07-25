'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Container from '../ui/Container'
import TestimonialCard from '../ui/testimonial-card'
import { StaticImageData } from 'next/image';
import CustomNextArrow from '../card-slider/custom-next-arrow';
import CustomPrevArrow from '../card-slider/custom-prev-arrow';


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
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
const Testimonial: React.FC<TestimonialProps> = ({testimonialitems}) => {
  return (
    <section className='bg-lightforeground overflow-hidden'>
        <Container className='py-28 text-center'>
            <p className='text-20 font-normal'>Testimonial</p>
            <h2 className='font-medium text-4xl w-1/2 mx-auto tracking-wide leading-relaxed mt-3'>We Care About Our Customer’s Experience Too</h2>
            <div className="testimonial-card-wrapper mt-16">
            <Slider {...settings} className='mx-4 xs:mx-0 testimonial-slider'>
          {testimonialitems.map((card) => (
            <div key={card.id}>
              <TestimonialCard card={card} />
            </div>
          ))}
        </Slider>
                
            </div>
        </Container>
    </section>
  )
}

export default Testimonial