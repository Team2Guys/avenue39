import banner6 from '@images/banners/banner6.png';
import CounDown from '@/components/countdown/coundown';

const MegaSale = () => {
  return (
    <div
      className="w-full h-[437px] px-9 py-12 flex items-center rounded-2xl"
      style={{
        backgroundImage: `url(${banner6.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div>
        <p className="text-white text-xs">Get Discount Up to 50%</p>
        <h1 className="text-red-600 text-7xl font-bold">
          Mega <span className="font-medium">Sale</span>
        </h1>
        <p className="text-white text-sm mt-4 max-w-80">
          Get up to 50% off for this weak and get offer. Don&rsquo;t miss this
          chance!
        </p>
        <div className="mt-7">
          <CounDown />
        </div>
        <p className="text-white mt-4 text-17 tracking-widest font-light">
          BUY NOW PAY LATER
        </p>
      </div>
    </div>
  );
};

export default MegaSale;
