'use client';
import React, { useState } from 'react';
import { products } from '@/data/products';
import Image from 'next/image';
import CustomPaging from '@/components/image-slider';
import { H1, NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { MdLocalFireDepartment, MdStar, MdStarBorder } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import { FaCcVisa, FaLock, FaStripe } from 'react-icons/fa';
import { FaCcMastercard, FaCcPaypal } from 'react-icons/fa6';
import MasterCard from '@icons/business.png';
import VisaCard from '@icons/card.png';
import Thumbnail from '@/components/carousel/thumbnail';
import DetailTabs from '@/components/detail-tabs/detail-tabs';
import HotProductSlider from '@/components/card-slider/hot-product-slider';
import {
  bestSellerProducts,
  cards,
  productData,
  tabbyfeature,
  tabbyhowitwork,
  tabbypayicon,
  tamarafeature,
  tamaralist,
  tamarawhy,
} from '@/data';
import SliderComponent from '@/components/card-slider/card-slider';

import Container from '@/components/ui/Container';
import Services from '@/components/services/services';
import SideCard from '@/components/side-card/side-card';
import Card from '@/components/ui/card';
import { IProductDetail } from '@/types/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import tabbyLogo from '@icons/tabby-logo-charcoal.png';
import tamaraLogo from '@icons/EN0-full-logo-black.png';
import masterCard from '@icons/business.png';
import viseCard from '@icons/card.png';
import gPayCard from '@icons/pngwing.png';
import ProductDetail from '@/components/product-detail/product-detail';

const ProductPage = ({ params }: { params: IProductDetail }) => {
  const productId = Number(params.id);
  const product = products.find((product) => product.id === productId);
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= (4) || i <= (0)) {
        stars.push(<MdStar key={i} size={20} className="text-yellow-400" />);
      } else {
        stars.push(
          <MdStarBorder key={i} size={20} className="text-yellow-400" />,
        );
      }
    }
    return stars;
  };
  if (!product) {
    return <div>Product not found</div>;
  }
  const tabs = [
    {
      label: 'Description',
      content: (
        <div className="p-2 flex flex-wrap md:flex-nowrap md:gap-10">
          <div className="w-full">
            <h1>{product.description}</h1>
          </div>
        </div>
      ),
    },
    {
      label: 'Additional Information',
      content: (
        <div className="p-2">
          <ul className="list-disc pl-4">
            {product.additionalInformation.map((info, index) => (
              <li key={index}>
                <strong>{info.key}:</strong> {info.value}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: 'Review',
      content: (
        <div className="p-2 flex flex-wrap md:flex-nowrap md:gap-10">
          <div className="w-full">
            <h1>{product.description}</h1>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Container>
        <ProductDetail params={product} isZoom={true} />
      </Container>
      <div className="w-full ">
        <DetailTabs tabs={tabs} />
      </div>
      <Container className="text-center p-3 flex flex-col md:flex-row gap-10 lg:gap-16">
        <div className="w-full md:w-7/12 lg:w-8/12 2xl:w-9/12">
          <h1 className="text-xl py-3  text-left font-bold">Best Seller</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestSellerProducts.map((card) => (
              <div key={card.id} className="p-2">
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-5/12 lg:w-4/12 2xl:w-3/12">
          <h2 className="text-[28px] font-medium mb-5">Your Recently Viewed</h2>
          <SideCard data={productData} />
        </div>
      </Container>

      <Container className="text-center p-3 ">
        <h1 className="text-3xl py-3 font-bold">Similar Products</h1>
        <SliderComponent cards={products} />
      </Container>
      <Services />
    </div>
  );
};

export default ProductPage;
