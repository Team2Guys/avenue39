'use client';
import CheckoutForm from '@/components/forms/checkout-form';
import TopHero from '@/components/top-hero';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Container from '@/components/ui/Container';
import { checkout } from '@/data/data';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import tabby from '@assets/icons/tabby-logo.png';
import tamara from '@assets/icons/tamara-logo.png';
import Coupan from '@/components/coupan-code';
import CartItems from '@/components/cart/items';
import { SubTotal } from '@/config';
import { useSelector } from 'react-redux';
import { State } from '@/redux/store';
import { selectTotalPrice } from '@/redux/slices/cart';
import { useFormik } from 'formik';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LabelInput } from '@/components/ui/label-input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
const Checkout = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [shippingfee, setShippingFee] = useState<number>(15);
  const totalPrice = useSelector((state: State) =>
    selectTotalPrice(state.cart),
  );

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    note: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const selectOption = [
    { title: 'Dubai', fee: 15 },
    { title: 'Abu Dhabi', fee: 20 },
    { title: 'Sharjah', fee: 20 },
    { title: 'Ajman', fee: 25 },
    { title: 'Ras Al Khaima', fee: 25 },
    { title: 'Umm Al Quwain', fee: 25 },
    { title: 'Fujairah', fee: 25 },
  ];

  useEffect(() => {
    if (selectedState) {
      const option = selectOption.find(
        (option) => option.title === selectedState,
      );
      setShippingFee(option ? option.fee : 15);
    }
  }, [selectedState]);

  return (
    <Fragment>
      <TopHero breadcrumbs={checkout} />
      <Container className="grid grid-cols-1 md:grid-cols-2 mt-10 md:gap-10 mb-10">
        <div>
          <h2 className="text-[33px]">Checkout</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-5 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <LabelInput
                label="First Name"
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <LabelInput
                label="Last Name"
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </div>
            <LabelInput
              label="Email Address"
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            <div className=" flex gap-5 flex-col md:flex-row">
              <LabelInput
                label="Phone Number"
                id="phone"
                name="phone"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              <LabelInput
                label="Street Address *"
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <Label
                  htmlFor="country"
                  className="mb-1 px-8 text-sm font-semibold text-17 text-[#666666]"
                >
                  Country/Region
                </Label>
                <Select
                  onValueChange={(value: any) =>
                    formik.setFieldValue('country', value)
                  }
                >
                  <SelectTrigger className="flex-grow h-full mt-3 rounded-full border-0 bg-[#F6F6F6] pl-8 pr-12 py-2  focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ">
                    <SelectValue placeholder="Country/Region" className="" />
                  </SelectTrigger>
                  <SelectContent className="rounded-3xl">
                    <SelectGroup>
                      <SelectItem
                        value="United Arab Emirates"
                        className="rounded-3xl"
                      >
                        United Arab Emirates
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 ">
                <Label
                  htmlFor="state"
                  className="mb-1 px-8 text-sm font-semibold text-17 text-[#666666]"
                >
                  State
                </Label>
                <Select
                  onValueChange={(value: any) => {
                    formik.setFieldValue('state', value);
                    setSelectedState(value);
                  }}
                >
                  <SelectTrigger className="flex-grow h-full mt-3 rounded-full border-0 bg-[#F6F6F6] pl-8 pr-10 py-2   focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent className="rounded-3xl">
                    <SelectGroup>
                      {selectOption.map((option, index) => (
                        <SelectItem
                          value={option.title}
                          key={index}
                          className="rounded-3xl"
                        >
                          {option.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <Label
                htmlFor="Notes"
                className="mb-1 px-8 text-sm font-semibold text-17 text-[#666666] mt-3 "
              >
                Order Notes
              </Label>
              <textarea
                className="flex-grow h-32 w-full rounded-3xl bg-[#F6F6F6] mt-2 pt-4 pl-5  pr-4 outline-none py-2 focus:outline-none focus:ring-0 focus:ring-ring text-15 font-medium"
                id="note"
                name="note"
                onChange={formik.handleChange}
                value={formik.values.note}
              />
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-[33px] mb-10">Promotional Code</h2>
          <Coupan label="Have a coupon?" />
          <div className="mt-10 space-y-6">
            <div className="bg-[#EEEEEE] px-4 py-4 space-y-3">
              <p className="text-center text-2xl font-extrabold">Your Order</p>
              <div className="mt-5 max-h-48 px-1 overflow-y-scroll custom-scrollbar">
                <CartItems isCartPage={true} isCheckoutPage={true} />
              </div>
              <div className="border-t-4 pt-6 flex justify-between items-center text-[#666666] text-sm">
                <p>Subtotal</p>
                <p>
                  AED.
                  <span>{totalPrice}</span>
                  .00
                </p>
              </div>
              <div className="border-t-4 pt-6 flex justify-between items-center text-[#666666] text-sm">
                <p>Shipping fee</p>
                <p>
                  <span>
                    {shippingfee == 0 ? 'Free' : ` AED.${shippingfee} .00`}
                  </span>
                </p>
              </div>
              <div className="border-t-4 pt-6 flex justify-between items-center text-[#666666] text-18 font-bold">
                <p>Total</p>
                <p className="text-black text-[25px]">
                  AED.<span>{totalPrice + shippingfee}</span>.00
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Direct Bank Transfer
              </label>
            </div>
            <div className="bg-[#EEEEEE] px-4 py-1 space-y-5">
              <p className="text-12">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order won’t be
                shipped until the funds have cleared in our account.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Image width={80} height={80} src={tabby} alt="tabby" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Image width={100} height={100} src={tamara} alt="tabby" />
                </div>
              </div>
              <div>
                <Link
                  href={'/thanks'}
                  className="bg-black text-white hover:text-black hover:bg-white text-sm rounded-md border-2 border-black h-[58px] py-5 text-16 px-16  "
                >
                  Pay Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Checkout;
