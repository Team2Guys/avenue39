'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import SliderComponent from '@/components/card-slider/card-slider';
import { cards, tankyousildercards } from '@/data';
import Container from '@/components/ui/Container';
import Services from '@/components/services/services';
import { LiaCheckCircle } from 'react-icons/lia';
import thankyou from '@icons/thankyou.png'
import Image from 'next/image';

const ThankYouPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDialogOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Container className="py-16">
          <Image src={thankyou} alt='thank you icon' className='mx-auto' />
          <h2 className="font-medium text-3xl xs:text-4xl sm:text-5xl md:text-6xl mt-14 text-center">
            Thank you for your order !
          </h2>
          <p className="text-14 text-[#666666] mt-9 text-center">
            Your order is complete. Please check your email for the details
          </p>
          <Button className="min-w-fit px-10 w-1/3 h-16 flex justify-center items-center text-secondary text-xl xs:text-2xl font-light rounded-2xl mt-16 mx-auto">
            Continue Shopping
          </Button>
            <h3 className="font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-center mt-16 mb-8">
              Your Recently Viewed Products
            </h3>
      <SliderComponent cards={cards} isModel={true} />
      </Container>
      <Services />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="bg-white/80" />
        <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
          <div className="pb-4 px-5 xs:px-10 md:px-20 me-4 xs:me-7 mt-6 max-h-[80vh] overflow-y-auto custom-scroll">
            <h2 className="text-center font-bold text-5xl">Get 10% Off</h2>
            <p className="mt-10 text-center">Your Next Purchase/</p>
            <div className="mt-16 flex justify-center">
              <Button className="w-60 h-16 flex justify-center items-center text-secondary rounded-2xl text-sm font-light">
                Shop Now
              </Button>
            </div>
            <div className="mt-16 mb-4">
              <SliderComponent cards={tankyousildercards} isModel={true} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ThankYouPage;
