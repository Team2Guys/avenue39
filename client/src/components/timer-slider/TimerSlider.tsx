'use client';

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { Button } from '../ui/button';
import { timerSliderData } from '@/data';
import { TTimeRemainingArray } from '@/types/types';
import Link from 'next/link';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const TimerSlider: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<TTimeRemainingArray>([]);

  useEffect(() => {
    const updateTimers = () => {
      const now = new Date().getTime();
      const newTimeRemaining: TTimeRemainingArray = timerSliderData.map(
        (slide) => {
          const end = new Date(slide.endDate).getTime();
          const distance = end - now;

          if (distance < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          return { days, hours, minutes, seconds };
        },
      );

      setTimeRemaining(newTimeRemaining);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap lg:flex-nowrap lg:justify-end justify-center lg:gap-4 timer_slider">
      <div className="overflow-hidden lg:w-full sliderTabes__dots">
        <Slider {...settings} className="lg:mb-10">
          {timerSliderData.map((slide, index) => {
            const {
              days = 0,
              hours = 0,
              minutes = 0,
              seconds = 0,
            } = timeRemaining[index] || {};

            return (
              <div className="bg-[#E3E4E6] lg:h-screen" key={index}>
                <div className="relative flex lg:flex-row flex-col justify-between h-full items-center lg:py-0 py-10">
                  <div className="w-full lg:px-28 px-5 text-left lg:flex lg:flex-col text-primary lg:order-1 order-2 lg:pt-0 pt-10">
                    <h3 className="text-black text-12 tracking-[4px] lg:mb-3">
                      {slide.discountText}
                    </h3>
                    <h3 className="lg:text-6xl text-2xl lg:font-bold mb-6 text-[#FF0000]">
                      {slide.dealText}
                    </h3>
                    <h3 className="lg:text-5xl text-2xl lg:font-bold lg:mt-10 mt-6">
                      {slide.price}
                    </h3>
                    <h3 className="lg:text-4xl text-xl lg:mb-10 mb-5 mt-2">
                      {slide.productName}
                    </h3>
                    <div className="text-lg font-semibold mb-4 flex space-x-2 lg:mt-6">
                      <div className="flex flex-col items-center">
                        <span className="lg:text-5xl text-lg font-light">
                          {days}
                          <span className="lg:text-lg text-xs align-sub">
                            <span className="lg:text-3xl text-xs font-light opacity-50">
                              /
                            </span>{' '}
                            Days
                          </span>{' '}
                          :
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="lg:text-5xl text-lg font-light">
                          {hours}
                          <span className="lg:text-lg text-xs align-sub">
                            <span className="lg:text-3xl text-xs font-light opacity-50">
                              /
                            </span>{' '}
                            Hours
                          </span>{' '}
                          :
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="lg:text-5xl text-lg font-light">
                          {minutes}
                          <span className="lg:text-lg text-xs align-sub">
                            <span className="lg:text-3xl text-xs font-light opacity-50">
                              /
                            </span>{' '}
                            Minutes
                          </span>{' '}
                          :
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="lg:text-5xl text-lg font-light">
                          {seconds}
                          <span className="lg:text-lg text-xs align-sub">
                            <span className="lg:text-3xl text-xs font-light opacity-50">
                              /
                            </span>{' '}
                            Seconds
                          </span>
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/cart"
                      className="bg-white py-2 px-3 rounded-full w-32 text-black hover:bg-black hover:text-white"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                  <div className="w-full lg:order-2 order-1 lg:p-16">
                    <Image
                      src={slide.image}
                      className="object-cover"
                      alt="image"
                      width={600}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TimerSlider;
