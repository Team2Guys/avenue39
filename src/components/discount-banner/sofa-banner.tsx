'use client';
import Image from 'next/image';
import sofa1 from '@assets/images/banners/ddddd.png';
import { Button } from '../ui/button';
import banner2 from '@assets/images/banners/banner2.png';
import banner3 from '@assets/images/banners/banner3.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SofaBanner: React.FC = () => {
  const router = useRouter();

  const handleBuyNowClick = () => {
    router.push('/checkout');
  };
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 mt-2 gap-4 relative">
      <div className="bg-lightforeground rounded-r-2xl flex items-center ps-5 xs:px-10 sm:ps-20 2xl:ps-32 min-h-[300px]">
        <div className="w-1/2 xs:w-1/3">
          <div className="space-y-3">
            <p className="text-xs sm:text-14 font-normal text-primary-foreground">
              Get Discount Up to 80%
            </p>
            <h3 className="font-semibold text-xl sm:text-2xl mt-1">
              White Minimalist<br></br>Combo Sofa
            </h3>
            <div className="lg:pt-6">
              <Link
                href="/products"
                className="bg-black py-2 px-6  rounded-full text-white hover:bg-white hover:text-black"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 xs:w-2/3 relative">
          <Image src={sofa1} alt="sofa image" className="w-full h-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 min-h-[600px]">
        <div
          className="w-full h-full rounded-2xl flex justify-center items-center"
          style={{
            backgroundImage: `url(${banner2.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-14 font-normal text-primary-foreground text-white">
              Get Discount Up to 80%
            </p>
            <h3 className="font-semibold text-xl sm:text-2xl mt-1 text-white">
              White Minimalist Combo Sofa
            </h3>
            <div className="lg:pt-3">
              <Link
                href="/product/5"
                className="bg-white py-2 px-6 rounded-full text-black hover:bg-black hover:text-white"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div
          className="w-full h-full rounded-2xl flex justify-center items-center"
          style={{
            backgroundImage: `url(${banner3.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-14 font-normal text-primary-foreground text-white">
              Get Discount Up to 80%
            </p>
            <h3 className="font-semibold text-xl sm:text-2xl mt-1 text-white">
              White Minimalist Combo Sofa
            </h3>
            <div className="lg:pt-3">
              <Link
                href="/product/5"
                className="bg-white py-2 px-6 rounded-full text-black hover:bg-black hover:text-white"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SofaBanner;
