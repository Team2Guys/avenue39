import React from 'react'
import tabbyLogo from '@icons/tabby-logo-charcoal.png';
import tamaraLogo from '@icons/EN0-full-logo-black.png';
import {
  tabbyfeature,
  tabbyhowitwork,
  tabbypayicon,
  tamarafeature,
  tamaralist,
  tamarawhy,
} from '@/data';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
  } from '../ui/dialog';
import Image from 'next/image';
import { IProduct } from '@/types/prod';


  interface TabyTamraPROPS{
    productPrice:number
    productDiscPrice:number
    product:IProduct
  }

function TabyTamra({productPrice, productDiscPrice, product}:TabyTamraPROPS) {

    const paymentLabels = ['Today', 'In 1 month', 'In 2 months', 'In 3 months'];

    const installmentAmount =
      productPrice > 0 || productDiscPrice > 0
        ? productDiscPrice > 0
          ? productDiscPrice / 4
          : productPrice / 4
        : (product?.discountPrice ? product?.discountPrice : product?.price) / 4;
  
  return (

    <div className="flex gap-2 mb-2 ">
    <div className="relative w-1/2 border-4 border-[#00FFBC] p-2 py-3 xsm:py-4 rounded-lg shadow">
      <span className="font-helvetica absolute -top-3 left-2 bg-[#00FFBC] text-primary px-2 py-1 rounded-lg text-xs font-extrabold">
        tabby
      </span>
      <p className="text-10 xsm:text-12 font-helvetica">
        Pay 4 interest-free payments of <span className="font-currency font-normal"></span> { }
        {productPrice > 0 || productDiscPrice > 0
          ? productDiscPrice > 0
            ? productDiscPrice / 4
            : productPrice / 4
          :
          (
            (product?.discountPrice
              ? product?.discountPrice
              : product?.price) / 4
          ).toFixed(2)
          }{' '}
        <Dialog>
          <DialogTrigger asChild>
            <span className="text-red-600 underline cursor-pointer">
              Learn more
            </span>
          </DialogTrigger>

          <DialogOverlay className="bg-white/80" />
          <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
            <DialogHeader>
              <DialogTitle className="text-xl xs:text-xl font-helvetica sm:text-2xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                Easy Monthly Installments
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 ps-5 xs:ps-10 md:ps-20 pe-4 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
              <Image src={tabbyLogo} alt="tabby logo" />
              <h2 className="text-2xl xs:text-3xl  font-bold mt-8 leading-10 xs:leading-tight font-helvetica">
                <span className="rounded-full bg-[#3BFFC1] px-4 py-0 text-nowrap">
                  Shop now,
                </span>
                <br />
                <span className="text-[#3BFFC1] text-outline-border text-4xl  tracking-wider">
                  pay over time.
                </span>
              </h2>
              <ul className='mt-5 font-bold font-helvetica text-lg sm:text-xl md:text-2xl list-["–"] list-inside leading-normal md:leading-normal'>
                {tabbyfeature.map((item) => (
                  <li key={item.id}>{item.para}</li>
                ))}
              </ul>
              <div className="mt-5">
                <h3 className="font-bold text-2xl sm:text-4xl font-helvetica">
                  How it works
                </h3>
                <ul className="font-medium text-base xs:text-lg md:text-xl mt-8 md:leading-relaxed">
                  {tabbyhowitwork.map((item) => (
                    <li
                      className="flex items-center gap-2 font-helvetica"
                      key={item.id}
                    >
                      <span className="rounded-full bg-lightbackground min-w-10 h-10 flex items-center justify-center">
                        {item.id}
                      </span>
                      <span className="w-full">{item.para}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end gap-2 mt-10 px-6">
                {tabbypayicon.map((item, index) => (
                  <Image
                    src={item.imageUrl}
                    alt="master"
                    className="w-20 h-20 object-contain"
                    key={index}
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </p>

      <div className="flex flex-wrap  justify-evenly gap-2 lg:gap-1 xl:gap-2 mt-2">
        {paymentLabels.map((label, index) => (
          <div
            key={index}
            className="text-black font-medium 2xl:font-semibold pb-1 text-center border-b-2 border-[#00FFBC]"
          >
            <p className=" text-[7px] xsm:text-[8px] xl:text-10 2xl:text-12"><span className="font-currency font-normal"></span> {installmentAmount}</p>
            <p className="text-[6px] xsm:text-[7px] xltext-[8px] 2xl:text-10 text-nowrap">{label}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="relative w-1/2 border-4 border-[#D47C84] p-2 py-3 xsm:py-4 rounded-lg shadow">
      <span className="font-helvetica absolute -top-3 left-2 bg-gradient-to-r from-blue-300 via-orange-300 to-pink-300 text-primary font-extrabold px-2 py-1 rounded-lg text-xs">
        tamara
      </span>
      <p className="text-10 xsm:text-12 font-helvetica">
        Pay 4 interest-free payments of <span className="font-currency font-normal"></span>{' '}
        {productPrice > 0 || productDiscPrice > 0
          ? productDiscPrice > 0
            ? productDiscPrice / 4
            : productPrice / 4
          : (
            (product?.discountPrice
              ? product?.discountPrice
              : product?.price) / 4
          ).toFixed(2)}{' '}
        <Dialog>
          <DialogTrigger asChild>
            <span className="text-red-600 underline cursor-pointer">
              Learn more
            </span>
          </DialogTrigger>

          <DialogOverlay className="bg-white/80" />
          <DialogContent className="sm:max-w-[80%] lg:max-w-[60%] bg-white px-0 sm:rounded-none border border-black shadow-none gap-0 pb-0">
            <DialogHeader>
              <DialogTitle className="text-xl xs:text-xl sm:text-2xl md:text-3xl font-bold tracking-wide border-b-2 pb-3 sm:ps-5 md:ps-10 pe-10">
                Easy Monthly Installments
              </DialogTitle>
            </DialogHeader>
            <div className="py-8 px-5 xs:px-10 md:px-20 me-4 xs:me-7 max-h-[80vh] overflow-y-auto custom-scroll">
              <div className="text-center">
                <Image
                  src={tamaraLogo}
                  alt="tamara logo"
                  className="mx-auto"
                />
              </div>
              <h2 className="text-center font-bold text-4xl mt-8">
                Pay easier with Tamara
              </h2>
              <div className="px-4 py-2 bg-gradient-to-r from-orange-300 via-blue-300 to-pink-300 mt-8 rounded-[70px]">
                <div className="bg-gradient-to-r from-orange-100 via-blue-100 to-pink-100 pb-4 pt-2 px-8 rounded-[70px] flex flex-col gap-4">
                  <div className="w-10/12 mx-auto">
                    {tamarafeature.map((item) => (
                      <div
                        className="flex justify-between items-center py-2"
                        key={item.id}
                      >
                        <div>
                          <h3 className="font-bold text-xl">
                            {item.title}
                          </h3>
                          <p className="text-md font-light mt-2 text-nowrap">
                            {item.para}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 px-5 xs:px-10 2xl:px-20">
                <h3 className="font-bold text-2xl">Why Tamara?</h3>
                <div className="flex items-center flex-wrap 2xl:flex-nowrap justify-center 2xl:justify-between gap-4 pt-6">
                  {tamarawhy.map((item) => (
                    <div
                      className="w-48 h-9 rounded-2xl bg-primary text-white flex items-center justify-center text-20 font-semibold"
                      key={item.id}
                    >
                      {item.para}
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <ul className="font-16 font-normal">
                    {tamaralist.map((item) => (
                      <li
                        className="flex items-center gap-2"
                        key={item.id}
                      >
                        <span>({item.id})</span>
                        <span>{item.para}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </p>
      <div className="flex flex-wrap  justify-evenly gap-2 lg:gap-1 xl:gap-2 mt-2">
        {paymentLabels.map((label, index) => (
          <div
            key={index}
            className="text-black font-medium 2xl:font-semibold pb-1 text-center border-b-2 border-[#D47C84]"
          >
            <p className=" text-[7px] xsm:text-[8px] xl:text-10 2xl:text-12"><span className="font-currency font-normal"></span> {installmentAmount}</p>
            <p className="text-[6px] xsm:text-[7px] xltext-[8px] 2xl:text-10 text-nowrap">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default TabyTamra