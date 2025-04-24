import Container from '../ui/Container';

const HeroVideo = () => {
  return (
    <div className="relative">
      <video
        className="w-full object-fill xsm:h-full lg:h-[80vh] xl:h-[80vh] 2xl:h-[83vh]"
        loop
        muted
        autoPlay
        playsInline
        preload="auto"
        poster="https://res.cloudinary.com/dckxfl2yn/image/upload/v1741771627/b8tp5qiqyifyp1b8meer_tyxde5.webp"
      >
        <source
          src="https://res.cloudinary.com/dckxfl2yn/video/upload/q_auto,f_auto/v1740735817/A39_Homepage_Final_6_calirp.mp4"
          type="video/mp4"
        />

        Your browser does not support the video tag.
        <track
          kind="captions"
          src="/captions/silent-video.vtt"
          label="English Captions"
          default
        />
      </video>

      <Container className="relative">
        <div className="absolute bottom-2 sm:bottom-8 right-4 sm:right-8 bg-black bg-opacity-40 text-white px-4 py-3 rounded-xl shadow-lg">
          <div className="relative flex flex-nowrap">
            <p className="font-Helveticalight text-[20px] sm:text-[40px] md:text-[50px] lg:text-[53px] leading-tight self-center">
              Discover The Luxury
            </p>
            <p className="font-jadyn text-[30px] sm:text-[90px] md:text-[80px] lg:text-[101px] relative right-3 sm:right-10 lg:right-12 top-2">
              Style
            </p>
          </div>
          <p className="text-[8px] sm:text-[12px] md:text-[15px] relative -top-3 sm:-top-10 sm:tracking-widest">
            Feel Luxury The Moment You Arrive Home
          </p>
        </div>
      </Container>
    </div>
  );
};

export default HeroVideo;
