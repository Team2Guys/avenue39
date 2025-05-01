'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { cities } from '@/data';
import { City } from '@/types/types';
import { SubTotal } from '@/config';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '@/redux/slices/cart';
import { State } from '@/redux/store';
import { BsTruck } from 'react-icons/bs';
import Image from 'next/image';
import { shippingOption } from '@/data/data';
import { Collapse } from 'antd';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const CartOrder: React.FC = () => {
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );

  console.log(filteredCities, 'filteredCities');
  const formik = useFormik({
    initialValues: {
      country: '',
      city: '',
      postalCode: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (formik.values.country) {
      setFilteredCities(
        cities.filter((city) => city.country === formik.values.country),
      );
    } else {
      setFilteredCities([]);
    }
  }, [formik.values.country]);

  const progressBarPercentage =
    totalPrice > 1000 ? 100 : (totalPrice / 1000) * 100;
  const remainingAmount = 1000 - totalPrice;


  const itemsCollapse = shippingOption.map((shipping, index) => ({
    key: index.toString(),
    label: <span className={`font-helvetica 
        font-bold  text-main
        `}>{shipping.name}</span>,
    children: (
      <div className="bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center">
        <Image src={shipping.icon} width={50} height={50} alt="icon" className="size-12 xs:size-16" />
        <div className='font-helvetica'>
          <strong className="text-14 xs:text-18">{shipping.name}</strong>
          <p className="text-11 xs:text-15">{shipping.description}</p>
          <p className="text-11 xs:text-15">
            <span>Delivery Cost: </span>
            {shipping.shippingFee > 0 ? (
              <>
                <span>In Dubai </span><strong><span className="font-currency font-normal"></span> {shipping.shippingFee}</strong>
              </>
            ) : (
              <strong>Free of charge for all orders.</strong>
            )}
            {shipping.otherEmiratesFee && (
              <>, <span>All Other Emirates</span> <strong><span className="font-currency font-normal"></span> {shipping.otherEmiratesFee}</strong>.</>
            )}
            {shipping.freeShippingFee && (
              <div><span>Free shipping for all orders above</span> <strong><span className="font-currency font-normal"></span> {shipping.freeShippingFee}</strong>.</div>
            )}
          </p>
        </div>
      </div>
    ),
  }));
  return (
    <div className="shadow border border-gray-200 rounded-md p-2 md:p-4 w-full space-y-5 mt-5 md:mt-0">
      <p className="text-center text-[26px]">Cart</p>
      <div className="flex justify-between items-center pt-4">
        <p className="text-[#666666] font-bold text-20">Total</p>
        <p className="font-medium text-[26px]">
          <span className="font-currency font-normal"></span>{' '}
          <span>
            <SubTotal />
          </span>
        </p>
      </div>
      <div className="mt-4 space-y-3">
        <div className="bg-gray-200">
          <Collapse
            accordion
            bordered={false}
            defaultActiveKey={'0'}
            expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus size={18} /> : <AiOutlinePlus size={18} />)}
            expandIconPosition="end"
            className="w-full bg-transparent custom-collapse"
            items={itemsCollapse}
          />
        </div>
        {totalPrice >= 1000 ? (
          <div className="relative w-full bg-gray-200 h-10 rounded-full">
            <div
              className="bg-green-500 h-10 rounded-full"
              style={{ width: '100%' }}
            >
              <p className="text-white font-medium absolute inset-0 flex justify-center items-center px-2 text-xs xl:text-14 md:text-sm">
                Congratulations! You&apos;ve got free shipping!{' '}
                <BsTruck className="text-20 ms-2" />
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[#666666] text-xs font-medium">
              <span className="font-currency font-normal"></span> {remainingAmount} away from free delivery
            </p>
            <div className="w-full bg-gray-200 h-10 rounded-full ">
              <div
                className="bg-green-500 h-10 rounded-full flex justify-center items-center w-full"
                style={{ width: `${progressBarPercentage}%` }}
              >
                <p className="text-white font-medium text-center">
                  {Math.round(progressBarPercentage)}%
                </p>
                <BsTruck className="text-20 ms-2 text-white" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="border-t-2">
        <Link
          href={'/checkout'}
          className="text-18 bg-black hover:bg-white border-2 rounded-2xl border-black hover:text-black text-white w-full mt-2 h-[60px] flex justify-center items-center "
          onClick={() => localStorage.removeItem('buyNowProduct')}
        >
          Proceed to Checkout
        </Link>
        <div className="mt-2 md:hidden">
          <Link
            href="/new-arrivals"
            className="bg-main px-6 flex justify-center items-center rounded-2xl text-white h-[60px] hover:border-[#666666] border border-[#F6F6F6] font-helvetica"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartOrder;
