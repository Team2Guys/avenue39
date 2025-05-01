'use client';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { checkout, selectOption, shippingOption } from '@/data/data';
import React, { Fragment, useEffect, useState } from 'react';
import Coupan from '@/components/coupan-code';
import CartItems from '@/components/cart/items';
import { useSelector } from 'react-redux';
import { State } from '@/redux/store';
import { getItemPrice, selectTotalPrice, variationProductImage } from '@/redux/slices/cart';
import { useFormik } from 'formik';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LabelInput } from '@/components/ui/label-input';
import { Label } from '@/components/ui/label';
import Loader from '@/components/Loader/Loader';
import axios from 'axios';
import showToast from '@/components/Toaster/Toaster';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { IoBagOutline } from 'react-icons/io5';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { CartItem } from '@/redux/slices/cart/types';
import Image from 'next/image';
import { ChangeUrlHandler } from '@/config/fetch';
import { ProductPrice } from '@/styles/typo';
import { product_refactor } from '@/config/HelperFunctions';
import { Collapse } from 'antd';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Shipping } from '@/types/prod';


const Checkout = () => {
  const [selectedState, setSelectedState] = useState<string | null>(selectOption[0].title);
  const [shippingfee, setShippingFee] = useState<number>(0);
    const cartPrice = useSelector((state: State) => selectTotalPrice(state.cart));
  const [totalPrice, setTotalPrice] = useState(0)
  const [paymentProcess, setPaymentProcess] = useState(false);
  const [loading, setloading] = useState<boolean>(false);
  const [paymentkey, setPaymentKey] = useState('');
  const cartItems = useSelector((state: State) => state.cart.items);
  const [product, setProduct] = useState<CartItem>()
  const storedProduct = localStorage.getItem('buyNowProduct');
  const [uniqueShipping, setUniqueShipping] = useState<Shipping[] | undefined>([]);

  const [selectedShipping, setSelectedShipping] = useState<Shipping | undefined>();
  const [activeKey, setActiveKey] = useState<string | string[]>('0');
  const [minDate, setMinDate] = useState(new Date().toISOString().split('T')[0]);
  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  useEffect(() => {
    if (storedProduct) {
      const parsedProduct = JSON.parse(storedProduct);
      const price = getItemPrice(parsedProduct);
      setTotalPrice(price);
      setProduct(parsedProduct);
    }
  }, [storedProduct]);



  useEffect(() => {
    if (product) {
      const findShipping =  (product?.shippingOptions && product?.shippingOptions?.length > 0) ?   product?.shippingOptions  :   [shippingOption[0]]  ;

      setUniqueShipping(findShipping ?? undefined);
   
    } else if (cartItems?.length) {
      if (cartItems.length === 1) {
        const singleItemShipping = cartItems[0].shippingOptions;
        setUniqueShipping(singleItemShipping && singleItemShipping.length > 0 ? singleItemShipping : [shippingOption[0]] );
      } else {
        type ShippingOption = {
          name: string;
          [key: string]: any;
        };

        const allShippingArrays: ShippingOption[][] = cartItems.map(
          item => item.shippingOptions || []
        );
        const shippingMethods = cartItems.map(item => item.selectedShipping).filter((value)=>value);

        const normalized = allShippingArrays.map(arr =>
          JSON.stringify(arr.map(opt => opt.name).sort())
        );

        const isAllSame = normalized.every(val => val === normalized[0]);
        if (isAllSame && (shippingMethods.length > 0)) {
          const sameShipping = cartItems[0].shippingOptions || [];
          setUniqueShipping(sameShipping);


        } else {

          const shippingMethods = cartItems.map(item => item.selectedShipping);

          const defaultOption =
            shippingMethods?.find(option => option?.name === "Standard Shipping") ||
            shippingMethods?.find(option => option?.name === "Next-day Shipping") ||
            shippingMethods?.find(option => option?.name === "Lightning Shipping") ||
            shippingOption[0]
          
          setUniqueShipping(defaultOption ? [defaultOption] : []);
        }
      }
    }
  }, [cartItems, product, selectedShipping]);


  const handleCollapseChange = (key: string | string[]) => {
    setActiveKey(key);
    if (Array.isArray(key)) {
      const selected = uniqueShipping?.[Number(key[0])];
      setSelectedShipping(selected);
    } else {
      const selected = uniqueShipping?.[Number(key)];
      setSelectedShipping(selected);
    }
  };


  useEffect(() => {
    if (selectedShipping) {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      if (selectedShipping?.name === 'Next-day Shipping') {
        if (currentHour < 13 || (currentHour === 13 && currentMinutes === 0)) {
          currentTime.setDate(currentTime.getDate() + 1);
          setMinDate(currentTime.toISOString().split('T')[0]);
        } else {
          currentTime.setDate(currentTime.getDate() + 2);
          setMinDate(currentTime.toISOString().split('T')[0]);
        }
      } else if (selectedShipping?.name === 'Lightning Shipping') {
        if (currentHour < 13 || (currentHour === 13 && currentMinutes === 0)) {
          setMinDate(new Date().toISOString().split('T')[0]);
        } else {
          currentTime.setDate(currentTime.getDate() + 1);
          setMinDate(currentTime.toISOString().split('T')[0]);
        }
      } else if (selectedShipping?.name === 'Standard Shipping') {
        const currentDate = new Date();

        // Move forward by 3 days to disable the next 3 days
        for (let i = 0; i < 3; i++) {
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setMinDate(currentDate.toISOString().split('T')[0]); // Set min selectable date

        // Generate next 30 days and filter weekends (Saturday & Sunday)
        const disabled = [];
        for (let i = 0; i < 30; i++) {
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + i);
          const dayOfWeek = futureDate.getDay(); // 0 = Sunday, 6 = Saturday

          if (i < 3 || dayOfWeek === 6 || dayOfWeek === 0) {
            disabled.push(futureDate.toISOString().split('T')[0]); // Store disabled dates
          }
        }

        setDisabledDates(disabled);
      }
    }
  }, [uniqueShipping , selectedShipping]);

  const initialValues = {
    first_name: '',
    last_name: '',
    user_email: '',
    country: 'United Arab Emirates',
    address: '',
    postalCode: '',
    city: 'Dubai',
    phone_number: '',
    note: '',
    shippingDate: '',
    shippingTime: '',
    shipmentMethod: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (
        values.first_name === '' ||
        values.last_name === '' ||
        values.address === '' ||
        values.user_email === '' ||
        values.country === "" ||
        values.city === ""
      ) {
        return showToast('warn', 'Please fill required filds😴');
      }
      const newValues = { ...values, shipmentMethod: selectedShipping }
      const { postalCode, ...submissioValues } = newValues;

      console.log(postalCode, 'values');

      handlePayment(submissioValues);
    },
  });
  const handleCoupon = () => {
    toast.error('coupon is not available.')
  }

  useEffect(() => {
    if (selectedShipping) {
      const option = shippingOption.find((option) => option.name === selectedShipping.name);
      type FeeKey = 'shippingFee' | 'otherEmiratesFee';
      let state: FeeKey = selectedState === "Dubai" ? "shippingFee" : "otherEmiratesFee";
      const onlyAccessoriesInCart = cartItems.flatMap((product) => product.categories || []).every((category) => category.name.toLowerCase().trim() === "accessories");
      const onlyAccessoriesInProduct = product?.categories?.every((category) => category.name.toLowerCase().trim() === "accessories");

      const productPrice = product ? totalPrice : cartPrice;
      let totalPricesFlag = productPrice  > 1000  ?  true : false

      const shippingMethod = selectedShipping.name === "Lightning Shipping" ||  selectedShipping.name === "Next-day Shipping";

      const accessoryFlag = product ? onlyAccessoriesInProduct : onlyAccessoriesInCart;
      setShippingFee(totalPricesFlag ? 0 : accessoryFlag &&  shippingMethod ? 30  : (option ? option[state] ?? 0 : 50));

    }
  }, [selectedShipping, selectedState]);

  let shipingOptionsArray = uniqueShipping?.map((selectedShipping, index) => {
    return ({
      key: index,
      label: <span className="font-bold font-helvetica custom-collapse-active text-main">{selectedShipping?.name || "Select Shipping"}</span>,
      children: (
        <div className="bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center">
          {selectedShipping && (
            <>
              <Image
                src={selectedShipping?.icon || ""}
                width={50}
                height={50}
                alt="icon"
                className="size-12 xs:size-16"
              />
              <div className='font-helvetica'>
                <strong className="text-14 xs:text-18">{selectedShipping.name}</strong>
                <p className="text-11 xs:text-15">{selectedShipping.description}</p>
                <p className="text-11 xs:text-15">
                  <span>Delivery Cost: </span>
                  {selectedShipping.shippingFee > 0 ? (
                    <>
                      <span>In Dubai </span><strong><span className="font-currency font-normal"></span> {selectedShipping.shippingFee}</strong>
                    </>
                  ) : (
                    <strong>Free of charge for all orders.</strong>
                  )}
                  {selectedShipping.otherEmiratesFee && (
                    <>, <span>All Other Emirates</span> <strong><span className="font-currency font-normal"></span> {selectedShipping.otherEmiratesFee}</strong>.</>
                  )}
                  {selectedShipping.freeShippingFee && (
                    <div><span>Free shipping for all orders above</span> <strong><span className="font-currency font-normal"></span> {selectedShipping.freeShippingFee}</strong>.</div>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      ),
    })
  })

  const itemsCollapse = shipingOptionsArray || []


  // [
  //   {
  //     key: '0',
  //     label: <span className="font-bold font-helvetica custom-collapse-active text-main">{selectedShipping?.name || "Select Shipping"}</span>,
  //     children: (
  //       <div className="bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center">
  //         {selectedShipping && (
  //           <>
  //             <Image
  //               src={selectedShipping?.icon || ""}
  //               width={50}
  //               height={50}
  //               alt="icon"
  //               className="size-12 xs:size-16"
  //             />
  //             <div className='font-helvetica'>
  //               <strong className="text-14 xs:text-18">{selectedShipping.name}</strong>
  //               <p className="text-11 xs:text-15">{selectedShipping.description}</p>
  //               <p className="text-11 xs:text-15">
  //                 <span>Delivery Cost: </span>
  //                 {selectedShipping.shippingFee > 0 ? (
  //                   <>
  //                     <span>In Dubai </span><strong>AED {selectedShipping.shippingFee}</strong>
  //                   </>
  //                 ) : (
  //                   <strong>Free of charge for all orders.</strong>
  //                 )}
  //                 {selectedShipping.otherEmiratesFee && (
  //                   <>, <span>All Other Emirates</span> <strong>AED {selectedShipping.otherEmiratesFee}</strong>.</>
  //                 )}
  //                 {selectedShipping.freeShippingFee && (
  //                   <div><span>Free shipping for all orders above</span> <strong>AED {selectedShipping.freeShippingFee}</strong>.</div>
  //                 )}
  //               </p>
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     ),
  //   },
  // ];



  const handlePayment = async (values: any) => {
    if(!selectedShipping){
      toast.error("Please select shipping method")
      return ;
    }

    const cartItems_refactor = await Promise.all(cartItems.map((item) => {
      // Create a shallow copy of the item
      const { sizes, filter, ...updatedItem } = item;

      console.log(sizes, filter)

      // Check for selectedSize and selectedfilter
      if (updatedItem.selectedSize) {
        const { price, discountPrice, ...updatedSize } = updatedItem.selectedSize;
        updatedItem.selectedSize = updatedSize as any; // Keep only the properties you want
        console.log(price, discountPrice)
      }

      if (updatedItem.selectedfilter) {
        const { price, discountPrice, ...updatedFilter } = updatedItem.selectedfilter;
        updatedItem.selectedfilter = updatedFilter as any; // Keep only the properties you want
        console.log(price, discountPrice)
      }

      return updatedItem;
    }));


    const updatedProduct = product && await product_refactor(product);

    try {
      let totalPayment = product ? totalPrice : cartPrice + shippingfee;
      setloading(true);

      try {
        const proceedPayment = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/add_sales`,
          {
            ...values,
            amount: totalPayment,
            orderedProductDetails: updatedProduct ? updatedProduct : cartItems_refactor,
            shippment_Fee: shippingfee,
            phone_number: Number(values.phone_number),
          },
        );

        if (proceedPayment.status === 201) {
          // showToast('success', 'Order Placed Successfully');
          setPaymentKey(
            `https://uae.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${proceedPayment.data.result.client_secret}`,
          );
          setPaymentProcess(true);
        }
      } catch (error: any) {
        showToast(
          'error',
          error.message || error.error || 'Internal server error',
        );
        throw new Error('Something is wrong. Please check the input fields.');
      }
    } catch (error) {
      return error;
    } finally {
      setloading(false);
    }
  };

  return (
    <Fragment>
      <TopHero breadcrumbs={checkout} />
      <div className="">
        {paymentProcess ? (
          <div className=" flex items-center">
            <iframe
              id="paymobIframe"
              className="h-[60vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] xl:h-[105vh]"
              style={{
                width: '100%',
                display: paymentProcess ? 'block' : 'none',
                border: 'none',
                flexGrow: 1,
              }}
              scrolling="no"
              src={paymentkey}
            ></iframe>
          </div>
        ) : (
          <Container>
            {product || cartItems && cartItems.length > 0 ? (
              <form
                onSubmit={formik.handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 xl:gap-10 mb-10 px-2"
              >
                <div>
                  <h2 className="text-[33px]">Checkout</h2>
                  <div className="space-y-5 mt-10">
                    <div className="flex flex-wrap sm:flex-nowrap md:flex-wrap  xl:flex-nowrap gap-5">
                      <LabelInput
                        label="First Name *"
                        id="first_name"
                        name="first_name"
                        type="text"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                      />
                      <LabelInput
                        label="Last Name *"
                        id="last_name"
                        name="last_name"
                        type="text"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                      />
                    </div>

                    <div className=" flex flex-wrap sm:flex-nowrap md:flex-wrap  xl:flex-nowrap gap-4">
                      <LabelInput
                        label="Email Address *"
                        id="user_email"
                        name="user_email"
                        type="email"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.user_email}
                      />

                      <LabelInput
                        label="Phone Number *"
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        required
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            formik.handleChange(e);
                          }
                        }}
                        value={formik.values.phone_number}
                      />
                    </div>

                    <LabelInput
                      label="Street Address *"
                      id="address"
                      name="address"
                      type="text"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                    
                    <div className="flex flex-wrap sm:flex-nowrap md:flex-wrap  xl:flex-nowrap gap-2">
                      <div className="flex-1">
                        <Label
                          htmlFor="country *"
                          className="mb-1 px-2 text-sm font-semibold text-17 text-[#666666]"
                        >
                          Country/Region *
                        </Label>
                        <Select
                          onValueChange={(value: any) => {

                            formik.setFieldValue('country', value)

                          }
                          }
                          defaultValue="United Arab Emirates"
                          required
                        >
                          <SelectTrigger className="flex-grow h-[50px] mt-3 rounded-full border-0 bg-[#F6F6F6] pl-8 pr-10 py-2   focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ">
                            <SelectValue />
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
                          htmlFor="cit"
                          className="mb-1 px-2 text-sm font-semibold text-17 text-[#666666]"
                        >
                          State *
                        </Label>
                        <Select
                          onValueChange={(value: any) => {
                            formik.setFieldValue('city', value);
                            setSelectedState(value);
                          }}
                          defaultValue="Dubai"
                          required
                        >
                          <SelectTrigger className="flex-grow h-[50px]  mt-3 rounded-full border-0 bg-[#F6F6F6] pl-8 pr-10 py-2   focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ">
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

                    <div className=" mt-5 md:mt-10">
                      <Label
                        htmlFor="Notes"
                        className="mb-1 px-2 text-sm font-semibold text-17 text-[#666666] mt-3"
                      >
                        Order Notes
                      </Label>
                      <textarea
                        className="custom-input-bg flex-grow h-32 w-full rounded-3xl bg-[#F6F6F6] mt-2 pt-4 pl-5  pr-4 outline-none py-2 focus:outline-none focus:ring-0 focus:ring-ring text-15 font-medium"
                        id="note"
                        name="note"
                        onChange={formik.handleChange}
                        value={formik.values.note}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[33px] mb-10">Promotional Code</h2>
                  <Coupan label="Have a coupon?" handleCoupon={handleCoupon} />
                  <div className="mt-10 space-y-6">
                    <div className="bg-gray-200 px-4 py-4 space-y-3">
                      <p className="text-center text-2xl font-extrabold">
                        Your Order
                      </p>
                      <div className="mt-5 max-h-48 px-1 overflow-y-scroll custom-scrollbar">
                        {product ?
                          <div
                            className="shadow rounded-md w-full p-2 mt-3 flex flex-wrap md:flex-nowrap justify-between items-center bg-white ">
                            <div className="flex items-center gap-4 w-full">
                              <Link href={ChangeUrlHandler(product as any)}>
                                <div className="w-24 h-24">
                                  <Image
                                    width={50}
                                    height={50}
                                    src={variationProductImage(product)}
                                    alt={product.posterImageAltText || product.name}
                                    className="rounded-md object-cover w-full h-full"
                                  />
                                </div>
                              </Link>
                              <div className="w-full">
                                <div className='flex flex-col gap-1'>
                                  <Link href={ChangeUrlHandler(product as any)}>
                                    <span className="text-16 xl:text-18">{product.name}</span>
                                  </Link>
                                  {(product.selectedfilter || product.selectedSize) &&
                                    <>
                                      <div className='flex items-center gap-1 text-13'>
                                        <span className='capitalize'>{product.filter?.at(0)?.heading}</span>
                                        <span className='capitalize'>{product.selectedfilter?.name}</span>
                                      </div>
                                      <span className='text-13'>{product.selectedSize?.name}</span>
                                    </>
                                  }
                                </div>
                                <div className="flex flex-wrap md:flex-nowrap lg:hidden justify-between items-center gap-2 md:gap-3">
                                  {(product.selectedfilter || product.selectedSize) ?
                                    <ProductPrice className="flex gap-2 flex-wrap !text-[13px] text-nowrap">
                                      <span>
                                      <span className="font-currency font-normal"></span>{' '}
                                        {(
                                          (Number(product.selectedSize?.price) || (Number(product.selectedfilter?.price) === 0) && product.discountPrice ? product.discountPrice : product.price) * product.quantity
                                        ).toLocaleString()}
                                      </span>
                                    </ProductPrice> :
                                    (product.discountPrice !== product.price) && product.discountPrice > 0 ? (
                                      <>
                                        <p className="text-16 xs:text-18 font-bold text-nowrap">
                                        <span className="font-currency font-normal"></span> <span>{product?.discountPrice * product.quantity}</span>
                                        </p>
                                        <p className="text-14 font-normal text-nowrap line-through text-[#A5A5A5] w-16">
                                        <span className="font-currency font-normal"></span> <span>{product?.price * product.quantity}</span>
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-16 xs:text-18 font-bold text-nowrap">
                                        <span className="font-currency font-normal"></span> <span>{product?.price * product.quantity}</span>
                                        </p>
                                        <p className="text-[18px] font-bold w-16"></p>
                                      </>
                                    )}
                                </div>
                              </div>

                              <div className="hidden lg:flex items-center justify-between gap-2 xl:gap-6 w-full">
                                <div className="w-52 xl:w-64 flex gap-2 xl:gap-4 items-center justify-between">
                                  {(product.selectedfilter || product.selectedSize) ?
                                    <ProductPrice className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap w-full text-end">
                                      <span>
                                      <span className="font-currency font-normal"></span>{' '}
                                        {
                                          (
                                            product.selectedSize?.price || product.selectedSize?.discountPrice
                                              ? Number(product.selectedSize?.discountPrice || product.selectedSize.price)
                                              : (product.selectedfilter?.discountPrice || product.selectedfilter?.price)
                                                ? Number(product.selectedfilter?.discountPrice || product.selectedfilter?.price)
                                                : (Number(product.selectedfilter?.price) === 0 && product.discountPrice)
                                                  ? product.discountPrice
                                                  : product.price

                                                  * product.quantity
                                          ).toLocaleString()


                                        }
                                      </span>
                                    </ProductPrice>
                                    : (product.discountPrice !== product.price) && product.discountPrice > 0 ? (
                                      <>
                                        <p className="text-12 xl:text-14 text-nowrap font-normal text-end w-16 line-through text-[#A5A5A5]">
                                        <span className="font-currency font-normal"></span>{' '}
                                          <span>
                                            {(product?.price * product.quantity).toLocaleString()}
                                          </span>
                                        </p>
                                        <p className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap">
                                        <span className="font-currency font-normal"></span>{' '}
                                          <span>
                                            {(
                                              product?.discountPrice * product.quantity
                                            ).toLocaleString()}
                                          </span>
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap w-full text-end">
                                        <span className="font-currency font-normal"></span>{' '}
                                          <span>
                                            {(product?.price * product.quantity).toLocaleString()}
                                          </span>
                                        </p>
                                      </>
                                    )}
                                  <div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          : <CartItems isCartPage={true} isCheckoutPage={true} />}


                      </div>
                      <div className="border-t-4 pt-6 flex justify-between items-center text-[#666666] text-sm">
                        <p>Subtotal</p>
                        <p>
                        <span className="font-currency font-normal"></span> <span>{product ? totalPrice.toLocaleString() : cartPrice.toLocaleString()}</span>
                        </p>
                      </div>
                      <div className="border-t-4 pt-6 flex justify-between items-center text-[#666666] text-sm">
                        <p>Shipping fee</p>
                        <p>
                          <span>
                            {(product ? totalPrice : cartPrice) > 1000 || shippingfee === 0
                              ? 'Free'
                              : <><span className="font-currency font-normal"></span> {shippingfee}</>}
                          </span>
                        </p>
                      </div>
                      <div className="border-t-4 pt-6 flex justify-between items-center text-[#666666] text-18 font-bold">
                        <p>Total</p>
                        <p className="text-black text-[25px]">
                        <span className="font-currency font-bold"></span>{' '}
                          <span>
                            {((product ? totalPrice : cartPrice) > 1000
                              ? product ? totalPrice : cartPrice
                              : (product ? totalPrice : cartPrice) + shippingfee
                            ).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Direct Bank Transfer
                    </label>
                  </div> */}
                    <div className="bg-gray-200 px-4 py-1 space-y-5">
                      <p className="text-12">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        won’t be shipped until the funds have cleared in our
                        account.
                      </p>
                    </div>

                    {uniqueShipping &&
                      <div className="bg-gray-200">

                        <Collapse
                          accordion
                          activeKey={activeKey}
                          onChange={handleCollapseChange}

                          bordered={false}
                          expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus size={18} /> : <AiOutlinePlus size={18} />)}
                          expandIconPosition="end"
                          className="w-full bg-transparent custom-collapse"
                          items={itemsCollapse}
                        />
                      </div>
                    }

                    <div className='flex flex-wrap sm:flex-nowrap md:flex-wrap  xl:flex-nowrap gap-2'>
                      <div className="flex-1">
                        <LabelInput
                          label={`Shipping Date ${selectedShipping?.name !== 'Standard Shipping' ? '*' : ""}`}
                          id="shippingDate"
                          name="shippingDate"
                          type="date"
                          required={selectedShipping?.name !== 'Standard Shipping'}
                          onChange={(e) => {
                            const selectedDate = e.target.value;

                            if (disabledDates.includes(selectedDate)) {
                              const dayOfWeek = new Date(selectedDate).getDay();
                              const errorMessage = dayOfWeek === 6 || dayOfWeek === 0
                                ? "Weekend dates (Saturday & Sunday) are not available. Please choose a weekday."
                                : "Selected date is not available. Please choose another one.";

                              toast.error(errorMessage);
                              formik.setFieldValue("shippingDate", "");
                            } else {
                              formik.handleChange(e);
                            }
                          }}
                          value={formik.values.shippingDate}
                          min={minDate}

                        />
                      </div>
                      <div className="flex-1">
                        <Label
                          htmlFor="country *"
                          className="mb-1 px-2 text-sm font-semibold text-17 text-[#666666]"
                        >
                          Time Slot *
                        </Label>
                        <Select
                          onValueChange={(value: any) => {

                            formik.setFieldValue('shippingTime', value)

                          }
                          }
                          defaultValue=" "
                          required
                        >
                          <SelectTrigger className="flex-grow h-[50px] mt-3 rounded-full border-0 bg-[#F6F6F6] pl-8 pr-10 py-2   focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-3xl">
                            <SelectGroup>
                              <SelectItem
                                value=" "
                                className="rounded-3xl"
                                disabled
                              >
                                Select time slot
                              </SelectItem>
                              <SelectItem
                                value="9 AM  -  12 PM"
                                className="rounded-3xl"
                              >
                                9 AM  -  12 PM
                              </SelectItem>
                              <SelectItem
                                value="12 PM -  3 PM"
                                className="rounded-3xl"
                              >
                                12 PM -  3 PM
                              </SelectItem>
                              <SelectItem
                                value="3 PM  -  6 PM"
                                className="rounded-3xl"
                              >
                                3 PM  -  6 PM
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-4 w-full">
                      {/* <div className="flex gap-4 items-center">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Image width={80} height={80} src={tabby} alt="tabby" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Image
                          width={100}
                          height={100}
                          src={tamara}
                          alt="tabby"
                        />
                      </div>
                    </div> */}
                      <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <RiSecurePaymentFill className="text-2xl" />
                          Secure Payment System
                        </div>
                      </div>
                      <div className="w-full sm:w-auto">
                        <button
                          type="submit"
                          className="bg-black custom-clr-btn !text-white hover:!text-black hover:bg-white text-sm rounded-md border-2 border-black h-[58px] py-5 text-16 px-16 !w-full "
                        >
                          {loading ? <Loader color="#fff" /> : 'NEXT'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex justify-center items-center w-full h-96">
                <div className="flex flex-col gap-4 items-center">
                  <IoBagOutline size={100} className="text-black" />
                  <p className="font-medium text-2xl">No Items In Cart</p>
                  <div className="">
                    <Link
                      href="/new-arrivals"
                      className="bg-[#F6F6F6] px-6 flex justify-center items-center  hover:border-[#666666] border-[#F6F6F6] text-[#666666] h-[73px]"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Container>
        )}
      </div>
    </Fragment>
  );
};

export default Checkout;
