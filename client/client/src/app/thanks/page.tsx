'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SliderComponent from '@/components/card-slider/card-slider';
import { cards, tankyousildercards } from '@/data';
import Container from '@/components/ui/Container';
import Services from '@/components/services/services';
import { LiaCheckCircle } from 'react-icons/lia';
import thankyou from '@icons/thankyou.png';
import Image from 'next/image';
import { products } from '@/data/products';
import Link from 'next/link';

const ThankYouPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDialogOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Container className="py-16">
        <Image src={thankyou} alt="thank you icon" className="mx-auto" />
        <h2 className="font-medium text-3xl xs:text-4xl sm:text-5xl md:text-6xl mt-14 text-center">
          Thank you for your order !
        </h2>
        <p className="text-14 text-[#666666] mt-9 text-center mb-3">
          Your order is complete. Please check your email for the details
        </p>
        <Link
          href={'/'}
          className="min-w-fit px-10 w-1/3 h-16 flex justify-center items-center bg-black text-white hover:text-black hover:bg-white text-sm rounded-md border-2 border-black mx-auto"
        >
          Continue Shopping
        </Link>
        <h3 className="font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-center mt-16 mb-8">
          Your Recently Viewed Products
        </h3>
        <SliderComponent cards={products} isModel={true} />
      </Container>
      <Services />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="bg-white/80" />
        <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
          <div className="pb-4 px-5 xs:px-10 md:px-20 me-4 xs:me-7 mt-6 max-h-[80vh] overflow-y-auto custom-scroll">
            <h2 className="text-center font-bold text-5xl">Get 10% Off</h2>
            <p className="mt-10 text-center">Your Next Purchase/</p>
            <div className="mt-16 flex justify-center">
              <Link
                href={'/'}
                className="w-60 h-16 bg-black text-white hover:text-black hover:bg-white text-sm rounded-md border-2 border-black flex justify-center items-center"
              >
                Shop Now
              </Link>
            </div>
            <div className="mt-16 mb-4">
              {/* <SliderComponent cards={tankyousildercards} isModel={true} /> */}
              <SliderComponent cards={products} isModel={true} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThankYouPage;
