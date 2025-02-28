
import React from 'react';
import Container from '../ui/Container';
const HeroVideo: React.FC = () => {
  return (
    <>
      <div className="relative w-full">
        <video
          className="w-full object-cover h-full md:h-[53vh] lg:h-[63vh] xl:h-[73vh] 2xl:h-[83vh]"
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
        >
          <source src="https://res.cloudinary.com/dckxfl2yn/video/upload/v1740735817/A39_Homepage_Final_6_calirp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Container className="relative">
          <div className="absolute bottom-2 sm:bottom-8 right-4 sm:right-8 bg-black bg-opacity-40 text-white px-4 py-3 rounded-xl shadow-lg">
            <div className="relative">
              <p className="drop-shadow-md text-[20px] sm:text-[40px] md:text-[50px] lg:text-[53px] leading-tight font-Helveticalight">
                Discover The Luxury{' '}
                <span className="font-jadyn text-[30px] sm:text-[90px] md:text-[80px] lg:text-[101px] relative right-3 sm:right-10 lg:right-12 top-2">
                  Style
                </span>
              </p>
              <p className=" text-[8px] sm:text-12 md:text-[15px] drop-shadow-md relative -top-2 sm:-top-6 sm:tracking-widest">
                Feel Luxury The Moment You Arrive Home
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HeroVideo;
