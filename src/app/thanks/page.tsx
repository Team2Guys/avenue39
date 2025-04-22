'use client';
import { useState, useEffect, Fragment, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';

import Container from '@/components/ui/Container';
import thankyou from '@icons/thankyou.png';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Confetti from '@/components/confetti/confetti';
import RedCross from '@assets/icons/remove.webp';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IProduct } from '@/types/prod';
import { fetchProducts } from '@/config/fetch';
import FeatureSlider from '@/components/card-slider/feature-slider';
interface PaymentQueryParams {
  id: string | null;
  amount_cents: string | null;
  paymentStatus: boolean | null;
  integration_id: string | null;
  currency: string | null;
  is_refund: string | null;
  orderId: string | null;
  pending: string | null;
  is_3d_secure: string | null;
  created_at: string | null;
}

const ThankYouPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const hasFetched = useRef(false);


  const { data: products = [] } = useQuery<IProduct[], Error>({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDialogOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const id = searchParams.get('id');
  const amount_cents = searchParams.get('amount_cents');
  const paymentStatus = searchParams.get('success');
  const integration_id = searchParams.get('integration_id');
  const created_at = searchParams.get('created_at');
  const currency = searchParams.get('currency');
  const is_refund = searchParams.get('is_refund');
  const orderId = searchParams.get('order');
  const pending = searchParams.get('pending');
  const is_3d_secure = searchParams.get('is_3d_secure');
  const merchant_order_id = searchParams.get('merchant_order_id');

  let successFlag: boolean = paymentStatus
    ? paymentStatus.toLowerCase() === 'true'
    : false;

  let paymentObject = {
    id,
    paymentStatus: successFlag,
    amount_cents,
    integration_id,
    currency,
    is_refund,
    orderId,
    pending,
    is_3d_secure,
    created_at,
    merchant_order_id,
  };
  const [payementDetails, setpayementDetails] =
    useState<PaymentQueryParams>(paymentObject);
  console.log(setpayementDetails, 'setpayementDetails');
  const dbFunctionHandler = async () => {
    try {
      if (
        !id ||
        !paymentStatus ||
        !amount_cents ||
        !integration_id ||
        !currency ||
        !orderId ||
        !pending ||
        !is_3d_secure ||
        !created_at ||
        !merchant_order_id
      ) {
        throw new Error('Missing required fields in request body');
      }
      if (successFlag) {
        localStorage.removeItem('cart');
      }
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/update-payment-status`,
        payementDetails,
      );
      console.log(response, 'response');
    } catch (error) {
      console.log(error, 'err');
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      dbFunctionHandler();
    }
  }, []);

  
  return (
    <Fragment>
      {successFlag ? (
        <>
          <Confetti />
          <Container className="py-16">
            <Image src={thankyou} alt="thank you icon" className="mx-auto" />
            <h2 className="font-medium text-3xl xs:text-4xl sm:text-5xl md:text-6xl mt-14 text-center">
              Thank you for your order !
            </h2>
            <p className="text-14 text-[#666666] mt-9 text-center mb-3">
              Your order is complete. Please check your email for the details
            </p>
            <Link
              href={'/new-arrivals'}
              className="min-w-fit px-10 w-1/3 h-16 flex justify-center items-center bg-black text-white hover:text-black hover:bg-white text-sm rounded-md border-2 border-black mx-auto"
            >
              Continue Shopping
            </Link>
            {/* <h3 className="font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-center mt-16 mb-8">
              Your Recently Viewed Products
            </h3> */}
            {/* <FeatureSlider /> */}
          </Container>
          {/* <Services /> */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogOverlay className="bg-white/80" />
            <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
              <VisuallyHidden>
                <DialogTitle>Thank You</DialogTitle>
              </VisuallyHidden>
              <div className="pb-4 px-5 xs:px-10 md:px-20 me-4 xs:me-7 mt-6 max-h-[80vh] overflow-y-auto custom-scroll">
                <h2 className="text-center font-bold text-4xl xs:text-5xl">
                  Get 10% Off
                </h2>
                <p className="mt-5 xs:mt-10 text-center">Your Next Purchase/</p>
                <div className="mt-10 xs:mt-16 flex justify-center">
                  <Link
                    href={'/'}
                    className="w-60 h-16 bg-black text-white hover:text-black hover:bg-white text-sm rounded-md border-2 border-black flex justify-center items-center"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="mt-16 mb-4">
                  <FeatureSlider similarProducts={products?.slice(0,15)} title={false} isBestSeller={true} />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="flex justify-center my-20 '">
          <div className="w-full max-w-md">
            <div className="border-b-4 border-red shadow-lg p-12 text-center flex flex-col items-center">
              <Image
                className="flex justify-center"
                src={RedCross}
                alt="remove image"
                height={50}
                width={50}
              />
              <h2 className="text-4xl font-bold mt-2 mb-3">
                Payment Unsuccessful
              </h2>
              <p className="text-lg text-gray-700 font-medium">
                {' '}
                Your payment was not completed. Please try again or contact our
                support team for assistance.
              </p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ThankYouPage;
