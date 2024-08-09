'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Button } from '../ui/button';
import { saleitems, slides } from '@/data';
import Salecard from '../ui/sale-card';
import { ISaleItems } from '@/types/types';
import profile1 from '@images/profile/Ellipse 4.png';
import Link from 'next/link';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SimpleSlider: React.FC = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 justify-between">
      <div className="overflow-hidden w-full md::w-8/12">
        <Slider
          {...settings}
          className="hero-slider-wrapper relative min-h-[250px] sm:min-h-[300px] h-full"
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative">
              <Image
                src={slide.image}
                className="min-h-[350px] w-full h-full"
                alt="image"
              />
              <div className="absolute xl:left-32 lg:20 left-10 inset-0 flex flex-col items-start justify-center text-secondary">
                <h3 className="md:text lg:text-xl mb-4">
                  {slide.bannerSubHeading}
                </h3>
                {/* <h2 className="xl:leading-relaxed text-2xl xl:text-5xl mb-4 font-bold w-3/4 sm:w-1/2 lg:w-[480px]">
                  {slide.bannerHeading}
                </h2> */}
                <span className="grid grid-cols-1 xs:flex xs:flex-wrap xs:items-center gap-2 sm:gap-4">
                  <Link
                    href="/products"
                    className="bg-white py-2 px-3 rounded-full text-black hover:bg-black hover:text-white"
                  >
                    {slide.buttonText}
                  </Link>
                  <span className="flex items-center gap-2 sm:gap-4">
                    <span className="flex relative">
                      <span className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
                        <Image
                          src={profile1}
                          alt="profile"
                          className="w-11 h-11"
                        />
                      </span>
                      <span className="bg-white w-12 h-12 rounded-full flex items-center justify-center -ms-3">
                        <Image
                          src={profile1}
                          alt="profile"
                          className="w-11 h-11"
                        />
                      </span>
                      <span className="bg-white w-12 h-12 rounded-full flex items-center justify-center -ms-3">
                        <Image
                          src={profile1}
                          alt="profile"
                          className="w-11 h-11"
                        />
                      </span>
                    </span>
                    <span>
                      <p className="text-white text-xl sm:text-2xl">578M +</p>
                      <p className="text-white text-16 sm:text-21">
                        Clients Happy
                        <br />
                        <span className="font-bold">See Reviews</span>
                      </p>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full md:w-4/12 md:mt-1 bg-lightforeground text-center rounded-e-xl md:rounded-e-none rounded-s-xl py-4 md:p-5 flex flex-col justify-center items-center mx-2 md:mx-0">
        <p className="text-2xl font-semibold mb-5">Pay Your Way</p>
        <div className="flex justify-center gap-4 px-2">
          {saleitems.map((item) => (
            <Salecard key={item.id} cards={item} />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <h2 className="text-3xl md:text-4xl  2xl:text-6xl font-normal">
            MEGA
            <br />
            <span className="font-bold">SALE</span>
          </h2>
          <h2 className="text-red-500 text-6xl md:text-7xl 2xl:text-9xl font-extrabold relative">
            50%
            <span className="absolute -top-1 lg:top-0 right-2 lg:right-5 text-xs font-medium text-black">
              UPTO
            </span>
          </h2>
        </div>
        <Link
          href="/products"
          className="bg-white py-2 px-3 rounded-full text-black hover:bg-black hover:text-white"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default SimpleSlider;
