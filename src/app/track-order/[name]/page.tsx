import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import Container from '@/components/ui/Container';
import { IOrder, IOrderProduct } from '@/types/types';

const ViewOrder = async ({ params }: { params: Promise<{ name: string }> }) => {
  let userDetail: IOrder | null = null;
  let name = (await params).name;

  const formatDate = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const day = date.getDate();
    const daySuffix = (day: number) => {
      if (day > 3 && day < 21) return "th"; // Covers 11th to 20th
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
  
    return `${dayName}, ${day}${daySuffix(day)} ${month}`;
  };

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/trackorder/${name}`,
    );
    userDetail = response.data;
    if (!userDetail || Object.keys(userDetail).length === 0) {
      return (
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
          <div className="col-span-2 text-center">
            <h2 className="text-xl font-semibold">Order Not Found</h2>
            <p className="text-gray-500 mt-2">
              We couldn&apos;t find an order matching the provided details.
              Please double-check your order ID or email.
            </p>
            <Link
              href="/new-arrivals"
              className="bg-black text-white px-4 py-2 mt-4 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      );
    }
  } catch (error) {
    console.error(error);
    return (
      <Container className="text-center py-20">
        <h2 className="text-xl font-semibold">Error Fetching Order</h2>
        <p className="text-gray-500 mt-2">
          There was an issue retrieving your order details. Please try again
          later.
        </p>
      </Container>
    );
  }

  const subTotal = userDetail.products.reduce((total, item) => {
    const productPrice =
      item.productData?.discountPrice > 0
        ? item.productData?.discountPrice
        : item.productData?.price;
    return total + item.quantity * productPrice;
  }, 0);
  const Shipping = 0;
  const Total = subTotal + Shipping;

  const getEstimatedDelivery = () => {
    if (!userDetail?.createdAt) return null;
  
    const createdAtDate = new Date(userDetail.createdAt);
    const deliveryDays = userDetail.address?.includes("Dubai") ? 1 : 2;
    
    const estimatedDate = new Date(createdAtDate);
    estimatedDate.setDate(createdAtDate.getDate() + deliveryDays);
  
    return estimatedDate;
  };
  
  const orderDate = new Date(userDetail.createdAt);
  const estimatedDeliveryDate = getEstimatedDelivery();
  const isDelivered = estimatedDeliveryDate ? new Date() >= estimatedDeliveryDate : false;

  const formattedOrderDate = formatDate(orderDate);
  const formattedEstimatedDeliveryDate = estimatedDeliveryDate ? formatDate(estimatedDeliveryDate as Date) : "N/A";
  
  const steps = [
    { label: "Confirmed", date: formattedOrderDate, completed: true },
    { label: "Ready To Ship", date: formattedOrderDate, completed: true },
    { label: "Delivered", date: `Expected by, ${formattedEstimatedDeliveryDate}`, completed: isDelivered },
  ];
  

  return (
    <>
    <Container className='py-5 md:py-10 space-y-3 sm:space-y-5 lg:space-y-10'>
      <h1 className=' md:text-[30px] 2xl:text-[40px] font-bold leading-10 text-[#344054]'>Order ID: <span>{userDetail.orderId}</span></h1>
      <div className='flex gap-5 items-center'>
        <div className="border-r-2 pr-5">
          <p className="text-10 sm:text-14 md:text-16 2xl:text-[20px] font-semibold text-[#959BA7]">Order Status: <span className='text-black'>{formatDate(new Date(userDetail.createdAt))}</span></p>
        </div>
        <div className='flex gap-2 items-center'>
        <svg viewBox="0 0 42 42" fill="none" className='w-4 h-4 sm:w-7 sm:h-7 2xl:w-[42px] 2xl:h-[42px]' xmlns="http://www.w3.org/2000/svg">
        <path d="M22.7499 25.8125H3.49988C2.78238 25.8125 2.18738 25.2175 2.18738 24.5V13.335C2.18738 12.775 2.53736 12.285 3.04486 12.0925C3.56986 11.9 4.14739 12.0575 4.49739 12.4775C5.56489 13.755 7.22739 14.4725 8.87239 14.42C10.2724 14.385 11.5673 13.86 12.5473 12.9325C13.0023 12.5475 13.3699 12.0925 13.6499 11.585C14.1924 10.6575 14.4549 9.64247 14.4374 8.60997C14.4024 6.99997 13.7024 5.52998 12.5124 4.46248C12.0924 4.09498 11.9524 3.51745 12.1449 3.00995C12.3374 2.50245 12.8274 2.15247 13.3699 2.15247H26.2499C26.9674 2.15247 27.5624 2.74747 27.5624 3.46497V20.965C27.5624 23.66 25.4099 25.8125 22.7499 25.8125ZM4.81238 23.1875H22.7499C23.9574 23.1875 24.9374 22.2075 24.9374 21V4.8125H16.0824C16.6949 5.95 17.0274 7.22753 17.0624 8.55753C17.0974 10.08 16.7124 11.585 15.9424 12.8975C15.5224 13.65 14.9449 14.3675 14.3149 14.8925C12.9149 16.2225 10.9899 17.01 8.94235 17.0625C7.47235 17.115 6.05489 16.7475 4.82989 16.0825V23.1875H4.81238Z" fill="#AFA183"/>
        <path d="M33.2499 36.3125H31.4999C30.7824 36.3125 30.1874 35.7175 30.1874 35C30.1874 33.7925 29.2074 32.8125 27.9999 32.8125C26.7924 32.8125 25.8124 33.7925 25.8124 35C25.8124 35.7175 25.2174 36.3125 24.4999 36.3125H17.4999C16.7824 36.3125 16.1874 35.7175 16.1874 35C16.1874 33.7925 15.2074 32.8125 13.9999 32.8125C12.7924 32.8125 11.8124 33.7925 11.8124 35C11.8124 35.7175 11.2174 36.3125 10.4999 36.3125H8.74988C5.12738 36.3125 2.18738 33.3725 2.18738 29.75V24.5C2.18738 23.7825 2.78238 23.1875 3.49988 23.1875H22.7499C23.9574 23.1875 24.9374 22.2075 24.9374 21V8.75C24.9374 8.0325 25.5324 7.4375 26.2499 7.4375H29.4699C31.2024 7.4375 32.7948 8.36503 33.6523 9.87003L36.6449 15.1025C36.8724 15.505 36.8724 16.0125 36.6449 16.415C36.4174 16.8175 35.9798 17.0625 35.5073 17.0625H33.2499C33.0049 17.0625 32.8124 17.255 32.8124 17.5V22.75C32.8124 22.995 33.0049 23.1875 33.2499 23.1875H38.4999C39.2174 23.1875 39.8124 23.7825 39.8124 24.5V29.75C39.8124 33.3725 36.8724 36.3125 33.2499 36.3125ZM32.6374 33.6875H33.2499C35.4199 33.6875 37.1874 31.92 37.1874 29.75V25.8125H33.2499C31.5699 25.8125 30.1874 24.43 30.1874 22.75V17.5C30.1874 15.82 31.5524 14.4375 33.2499 14.4375L31.3774 11.165C30.9924 10.4825 30.2574 10.0625 29.4699 10.0625H27.5624V21C27.5624 23.66 25.4099 25.8125 22.7499 25.8125H4.81238V29.75C4.81238 31.92 6.57988 33.6875 8.74988 33.6875H9.36234C9.93984 31.675 11.7949 30.1875 13.9999 30.1875C16.2049 30.1875 18.0599 31.675 18.6374 33.6875H23.3799C23.9574 31.675 25.8124 30.1875 28.0174 30.1875C30.2224 30.1875 32.0599 31.675 32.6374 33.6875Z" fill="#AFA183"/>
        <path d="M13.9999 39.8125C11.3399 39.8125 9.18738 37.66 9.18738 35C9.18738 32.34 11.3399 30.1875 13.9999 30.1875C16.6599 30.1875 18.8124 32.34 18.8124 35C18.8124 37.66 16.6599 39.8125 13.9999 39.8125ZM13.9999 32.8125C12.7924 32.8125 11.8124 33.7925 11.8124 35C11.8124 36.2075 12.7924 37.1875 13.9999 37.1875C15.2074 37.1875 16.1874 36.2075 16.1874 35C16.1874 33.7925 15.2074 32.8125 13.9999 32.8125Z" fill="#AFA183"/>
        <path d="M27.9999 39.8125C25.3399 39.8125 23.1874 37.66 23.1874 35C23.1874 32.34 25.3399 30.1875 27.9999 30.1875C30.6599 30.1875 32.8124 32.34 32.8124 35C32.8124 37.66 30.6599 39.8125 27.9999 39.8125ZM27.9999 32.8125C26.7924 32.8125 25.8124 33.7925 25.8124 35C25.8124 36.2075 26.7924 37.1875 27.9999 37.1875C29.2074 37.1875 30.1874 36.2075 30.1874 35C30.1874 33.7925 29.2074 32.8125 27.9999 32.8125Z" fill="#AFA183"/>
        <path d="M38.5 25.8125H33.25C31.57 25.8125 30.1875 24.43 30.1875 22.75V17.5C30.1875 15.82 31.57 14.4375 33.25 14.4375H35.5075C35.98 14.4375 36.4175 14.6825 36.645 15.1025L39.6375 20.3525C39.7425 20.545 39.8125 20.7725 39.8125 21V24.5C39.8125 25.2175 39.2175 25.8125 38.5 25.8125ZM33.25 17.0625C33.005 17.0625 32.8125 17.255 32.8125 17.5V22.75C32.8125 22.995 33.005 23.1875 33.25 23.1875H37.1875V21.35L34.7375 17.0625H33.25Z" fill="#AFA183"/>
        <path d="M8.7328 17.0625C6.3178 17.0625 4.04281 16.0125 2.50281 14.175C2.25781 13.9125 1.99534 13.545 1.76784 13.195C0.945338 11.9525 0.490338 10.4825 0.455338 8.94247C0.385338 6.38747 1.47036 3.98996 3.43036 2.36246C4.91786 1.13746 6.70277 0.4725 8.59277 0.4375C10.6578 0.455 12.7229 1.1375 14.2629 2.52C16.0129 4.06 17.0278 6.21253 17.0803 8.55753C17.1153 10.08 16.7303 11.585 15.9603 12.8975C15.5403 13.65 14.9628 14.3675 14.3328 14.8925C12.9328 16.2225 11.0078 17.01 8.96031 17.0625C8.87281 17.0625 8.8028 17.0625 8.7328 17.0625ZM8.7328 3.0625C8.6978 3.0625 8.66281 3.0625 8.62781 3.0625C7.35031 3.08 6.12527 3.55252 5.09277 4.39252C3.76277 5.49502 3.02782 7.14001 3.06282 8.87251C3.09782 9.92251 3.39534 10.92 3.95534 11.7425C4.11284 11.9875 4.2703 12.215 4.4628 12.425C5.5828 13.755 7.24533 14.455 8.87283 14.42C10.2728 14.385 11.5678 13.86 12.5478 12.9325C13.0028 12.5475 13.3703 12.0925 13.6503 11.585C14.1928 10.6575 14.4553 9.64247 14.4378 8.60997C14.4028 6.99997 13.7029 5.52998 12.5129 4.46248C11.4629 3.56998 10.1328 3.0625 8.7328 3.0625Z" fill="#AFA183"/>
        <path d="M7.78729 11.8124C7.45479 11.8124 7.13975 11.6898 6.87725 11.4448L5.10973 9.7649C4.58473 9.2574 4.56731 8.43491 5.07481 7.9099C5.58231 7.3849 6.4048 7.36737 6.9298 7.87487L7.78729 8.69732L10.5348 6.03739C11.0598 5.52989 11.8823 5.54732 12.3898 6.07232C12.8973 6.59732 12.8798 7.41992 12.3548 7.92742L8.69721 11.4623C8.43471 11.6898 8.10229 11.8124 7.78729 11.8124Z" fill="#AFA183"/>
        </svg>
        <p className="text-10 sm:text-14 md:text-16 2xl:text-[20px] font-semibold text-main">Estimated delivery: <span className='text-black'>{getEstimatedDelivery() ? formatDate(getEstimatedDelivery() as Date) : "N/A"}</span></p>
        </div>
      </div>
      <hr/>
      <div className="w-full mt-5 sm:mt-10">
  <div className="relative flex items-center justify-between mx-auto">
    {/* Line connector */}
    <div className={`absolute top-[32px] sm:top-[38px] md:top-[50px] 2xl:top-[60px] left-1/2 w-full h-[2px] md:h-[4px]  md:max-w-[89%] xl:max-w-[93%] 2xl:max-w-[93%] mx-auto -translate-x-1/2 ${isDelivered ? "bg-main" : "bg-gray-300 "}`}></div>

    {steps.map((step, index) => (
      <div key={index} className={`flex flex-col relative w-full text-center ${
        index === 0 ? "items-start" : index === 1 ? "items-center" : "items-end"
      }`}>
           {/* Step label */}
           <p
          className={`text-12 sm:text-14 md:text-20 2xl:text-[24px] mt-2 ${
            step.completed ? "text-[#9C8B6E] font-semibold" : "text-gray-400"
          }`}
        >
          {step.label}
        </p>
        
        {/* Step indicator */}
        <div
          className={`w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] md:w-[30px] md:h-[30px] 2xl:w-[35px] 2xl:h-[35px] rounded-full  relative z-10  ${
            step.completed ? "bg-[#9C8B6E] " : "bg-gray-300 "
          } ${
            index === 0 ? "md:left-10" : index === 1 ? "" : "md:right-10"
          }`}
        ></div>

    
        {/* Step date */}
        <p className="text-10 sm:text-14 md:text-18 2xl:text-[22px] text-[#95989C] h-[30px]">{step.date}</p>
      </div>
    ))}
  </div>

    <div className='gap-6 mt-3 md:mt-10'>
    {userDetail.products.map((product: IOrderProduct) => (
          <div key={product.id} className="flex items-center gap-4  pb-5">
            {/* Product Image */}
            <div className="w-14 h-14 md:w-24 md:h-24 2xl:w-40 2xl:h-40 relative" >
              <Image
                width={200}
                height={200}
                src={
                  product.productData.posterImageUrl ||
                    product.productData.hoverImageUrl
                  }
                  alt={product.productData.name}
                className="object-cover rounded-lg bg-[#E3E4E6] w-14 h-14 md:w-24 md:h-24 2xl:w-40 2xl:h-40"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h2 className=" max-sm:text-15 md:text-[18px] xl:text-[22px] 2xl:text-[24px]">{product.productData.name}</h2>
              {product?.selectedSize?.[0]?.filterName &&
              <div className="flex items-center gap-2 2xl:gap-6 ">
                <span className="text-[#727272] max-sm:text-12 md:text-[16px] xl:text-[18px] 2xl:text-[22px]">Color:</span>
                <span
                  className="w-3 h-3 sm:w-4 sm:h-4 2xl:w-8 2xl:h-8   border"
                  style={{ backgroundColor: product?.selectedSize?.[0].filterName}}
                ></span>
              </div>
              }
            </div>

            {/* Price & Quantity */}
            <div className="text-right">
              <p className="text-14 md:text-[16px] xl:text-[18px] 2xl:text-[24px] font-bold"> AED{' '}
                  <span>
                    {product.productData?.discountPrice > 0
                      ? product.productData?.discountPrice
                      : product.productData?.price}
                  </span></p>
              <p className="text-14 md:text-[16px] xl:text-[18px] 2xl:text-[20px]">Quantity: {product.quantity}</p>
            </div>
          </div>
        ))}
    </div>
    <hr/>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-0 mt-3 md:mt-5'>
      <div>
        <h3 className='text-[18px] md:text-[20px] 2xl:text-[24px] font-semibold'>Payment</h3>
        <div className='flex gap-2 items-center mt-5  xl:text-[18px] font-semibold'>
          <div className='flex items-center gap-2'>
            <Image width={50} height={50} className='shadow' src={"/images/paymentIcons/visacard-logo.webp"} alt='paymetn'/>
            <p>ending with 1234</p>
          </div> -
          <p>AED <span>{Total}</span></p>
        </div>
      </div>
      <div>
        <h3 className='text-[18px] md:text-[20px] 2xl:text-[24px] font-semibold'>Delivery</h3>
        <div className=' mt-3 md:mt-5  xl:text-[18px] font-medium text-[#999999]'>
          <p className='text-black pb-3 sm:pb-5'>{userDetail.firstName} {userDetail.lastName}</p>
          <p>{userDetail.phoneNumber}</p>
          <p>Address Street: <span>{userDetail.address}</span></p>
        </div>
      </div>
    </div>
  </div>

    </Container>
    </>

  );
};

export default ViewOrder;
