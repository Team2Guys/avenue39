import banner8 from '@images/banners/banner8.png';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import offerIcon from '@icons/pngegg.png';
import Image from 'next/image';

const ProductBanner = () => {
  return (
    <div
      className="w-full h-[437px] px-9 py-12 flex items-center rounded-2xl"
      style={{
        backgroundImage: `url(${banner8.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div>
        <Image src={offerIcon} alt="limited offer" className="w-32" />
        <p className="text-white text-20 font-light tracking-widest mt-4">
          Get Discount Up to 50%
        </p>
        <h1 className="text-white text-4xl font-normal max-w-sm">
          Lincoln{' '}
          <span className="font-bold">
            Leather <span className="font-semibold">Chair</span>
          </span>{' '}
          & Footstool
        </h1>
        <p className="text-white text-md font-light mt-4">
          Dhs150.00{' '}
          <span className="ms-4 line-through text-sm text-white opacity-65">
            Dhs200.00
          </span>
        </p>
        <button className="my-4 px-4 py-3 text-black bg-white border border-white  rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white">
          <HiOutlineShoppingBag />
          <span className="mr-2 text-xs">Add to card</span>
        </button>
      </div>
    </div>
  );
};

export default ProductBanner;
