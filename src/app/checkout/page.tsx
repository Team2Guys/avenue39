'use client';
import TopHero from '@/components/top-hero';
import Container from '@/components/ui/Container';
import { checkout } from '@/data/data';
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
const Checkout = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [shippingfee, setShippingFee] = useState<number>(50);
  const cartPrice = useSelector((state: State) => selectTotalPrice(state.cart));
  const [ totalPrice , setTotalPrice ] = useState(0)
  const [paymentProcess, setPaymentProcess] = useState(false);
  const [loading, setloading] = useState<boolean>(false);
  const [paymentkey, setPaymentKey] = useState('');
  const cartItems = useSelector((state: State) => state.cart.items);
  const [product, setProduct] = useState<CartItem>()
  const storedProduct = localStorage.getItem('buyNowProduct');
  // const router = useRouter();


  useEffect(() => {
    if (storedProduct) {
      const parsedProduct = JSON.parse(storedProduct);
      const price = getItemPrice(parsedProduct);
        setTotalPrice(price);
        setProduct(parsedProduct);
    }
  }, [storedProduct]);


  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     localStorage.removeItem('buyNowProduct');
  //   };

  //   // Run the cleanup when the route changes
  //   router.events.on('routeChangeStart', handleRouteChange);

  //   // Cleanup on component unmount
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, [router])


  const initialValues = {
    first_name: '',
    last_name: '',
    user_email: '',
    country: 'United Arab Emirates',
    address: '',
    postalCode: '',
    city: '',
    phone_number: '',
    note: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (
        values.first_name === '' ||
        values.last_name === '' ||
        values.address === '' ||
        values.user_email === '' ||
        values.country ==="" ||
        values.city ==="" 
      ) {
        console.log(values, "submissioValues")
        return showToast('warn', 'Please fill required filds😴');
      }
      const { postalCode, ...submissioValues } = values;

      console.log(submissioValues, 'submissioValues');
      console.log(postalCode, 'values');

      handlePayment(submissioValues);
    },
  });
  const selectOption = [
    { title: 'Dubai', fee: 50 },
    { title: 'Abu Dhabi', fee: 100 },
    { title: 'Sharjah', fee: 100 },
    { title: 'Ajman', fee: 100 },
    { title: 'Ras Al Khaima', fee: 100 },
    { title: 'Umm Al Quwain', fee: 100 },
    { title: 'Fujairah', fee: 100 },
  ];

  const handleCoupon = (coupan: string) => {
    console.log(coupan)
    toast.error('coupon is not available.')
  }

  useEffect(() => {
    if (selectedState) {
      const option = selectOption.find(
        (option) => option.title === selectedState,
      );
      setShippingFee(option ? option.fee : 50);
    }
  }, [selectedState]);


  const handlePayment = async (values: any) => {

    // await cartItems.map((item) => {
    //   if (item.selectedSize) {
    //     if (item.selectedSize.price) {
    //       //@ts-expect-error
    //       delete item.selectedSize.price;
    //     }
    //     if (item.selectedSize.discountPrice) {
    //       delete item.selectedSize.discountPrice;
    //     }
    //   }

    //   if (item.selectedfilter) {
    //     if (item.selectedfilter.price) {
    //       //@ts-expect-error
    //       delete item.selectedfilter.price;
    //     }
    //     if (item.selectedfilter.discountPrice) {
    //       delete item.selectedfilter.discountPrice;
    //     }
    //   }
    //   delete item.sizes;
    //   delete item.filter;
    // });



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
    const product_refactor = async (product: CartItem) => {
      const { sizes, filter, ...updatedProduct } = product;
    
      console.log(sizes, filter);
    
      if (updatedProduct.selectedSize) {
        const { price, discountPrice, ...updatedSize } = updatedProduct.selectedSize;
        updatedProduct.selectedSize = updatedSize as any; 
        console.log(price, discountPrice);
      }
    
      if (updatedProduct.selectedfilter) {
        const { price, discountPrice, ...updatedFilter } = updatedProduct.selectedfilter;
        updatedProduct.selectedfilter = updatedFilter as any; 
        console.log(price, discountPrice);
      }
    
      return updatedProduct;
    };
    
    const updatedProduct = product && await product_refactor(product);
    
    try {
      let totalPayment = product ? totalPrice : cartPrice + shippingfee;
      console.log(updatedProduct ? updatedProduct : cartItems_refactor)
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
        console.log(proceedPayment, 'proceedPayment');

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
      console.error('Payment Error:', error);
    } finally {
      setloading(false);
    }
  };

  console.log(product, "product",cartItems)
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
            {product || cartItems && cartItems.length >0 ? (
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
                          onValueChange={(value: any) =>
                          {
           
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
                    <div className="bg-[#EEEEEE] px-4 py-4 space-y-3">
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
                                        AED{' '}
                                        {(
                                          (Number(product.selectedSize?.price) || (Number(product.selectedfilter?.price) === 0) && product.discountPrice ? product.discountPrice : product.price) * product.quantity
                                        ).toLocaleString()}
                                      </span>
                                    </ProductPrice> :
                                    (product.discountPrice !== product.price) && product.discountPrice > 0 ? (
                                      <>
                                        <p className="text-16 xs:text-18 font-bold text-nowrap">
                                          AED <span>{product?.discountPrice * product.quantity}</span>
                                        </p>
                                        <p className="text-14 font-normal text-nowrap line-through text-[#A5A5A5] w-16">
                                          AED <span>{product?.price * product.quantity}</span>
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-16 xs:text-18 font-bold text-nowrap">
                                          AED <span>{product?.price * product.quantity}</span>
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
                                          AED{' '}
                                          {
                                       (
                                        product.selectedSize?.price || product.selectedSize?.discountPrice 
                                        ? Number(product.selectedSize?.discountPrice || product.selectedSize.price) // Use selectedSize price if it exists
                                        : (Number(product.selectedfilter?.price) === 0 && product.discountPrice)
                                        ? product.discountPrice // Use discountPrice if filter price is 0 and discountPrice exists
                                        : product.price 
                                        
                                        * product.quantity
                                      ).toLocaleString()
                                      
                                          
                                          }
                                        </span>
                                      </ProductPrice>
                                      : (product.discountPrice !== product.price) && product.discountPrice > 0 ? (
                                        <>
                                          <p className="text-12 xl:text-14 text-nowrap font-normal text-end w-16 line-through text-[#A5A5A5]">
                                            AED{' '}
                                            <span>
                                              {(product?.price * product.quantity).toLocaleString()}
                                            </span>
                                          </p>
                                          <p className="text-14 xs:text-16 xl:text-[20px] font-bold text-nowrap">
                                            AED{' '}
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
                                            AED{' '}
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
                          AED <span>{product ? totalPrice.toLocaleString() : cartPrice.toLocaleString()}</span>
                        </p>
                      </div>
                      <div className="border-t-4 pt-6 flex justify-between items-center text-[#666666] text-sm">
                        <p>Shipping fee</p>
                        <p>
                          <span>
                            {(product ? totalPrice : cartPrice) > 1000 || shippingfee === 0
                              ? 'Free'
                              : `AED ${shippingfee}`}
                          </span>
                        </p>
                      </div>
                      <div className="border-t-4 pt-6 flex justify-between items-center text-[#666666] text-18 font-bold">
                        <p>Total</p>
                        <p className="text-black text-[25px]">
                          {' '}
                          AED{' '}
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
                    <div className="bg-[#EEEEEE] px-4 py-1 space-y-5">
                      <p className="text-12">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        won’t be shipped until the funds have cleared in our
                        account.
                      </p>
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
