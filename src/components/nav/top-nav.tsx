import Container from '../ui/Container';
import SocialLink from '../social-link';
import Link from 'next/link';
import Image from 'next/image';
import ramadan1 from '../../../public/images/lamp.svg';
import ramadan2 from '../../../public/images/moon.svg';

const TopNav = () => {
  return (
    <div className="bg-main text-secondary py-2 hidden md:block z-40">
      <Container className="flex justify-between items-center gap-2">
        <div className="max-lg:hidden lg:w-3/12 min-w-24">
          <div className="w-fit"></div>
        </div>
        <div className="w-full lg:max-w-[48%] xl:max-w-[50%] 2xl:max-w-[43%] max-sm:pl-1 2xl:mr-6">
          <div className=" gap-2 flex items-center">
            <Image src={ramadan2} alt="ramadan1" />
            <p className="uppercase tracking-[0.8px] 2xl:tracking-[1.6px] font-helvetica text-11 2xl:text-13 xl:whitespace-nowrap ml-2">
            <span className="text-shadow">
            This Ramadan elevate your home’s style with the best offers.{' '}</span>
              <Link
                className="text-red-700 border-b border-red-700 hover:text-red-800"
                href={'/sale'}
              >
                SHOP SALE
              </Link>
            </p>
            <Image
              className="transform translate-x-3"
              src={ramadan1}
              alt="ramadan1"
            />
          </div>
        </div>
        <div className="gap-3 lg:gap-3 flex justify-end items-center w-2/12">
          <SocialLink socialSize="text-[30px]" />
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
