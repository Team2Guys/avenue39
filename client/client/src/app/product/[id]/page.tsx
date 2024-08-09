'use client';
import React, { useState } from 'react';
import { products } from '@/data/products';
import Image from 'next/image';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import DetailTabs from '@/components/detail-tabs/detail-tabs';
import { bestSellerProducts, productData } from '@/data';
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
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import ProductDetail from '@/components/product-detail/product-detail';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import profileImg from '@images/profile/Ellipse 7.png';
import { Rate } from 'antd';

const ProductPage = ({ params }: { params: IProductDetail }) => {
  const productId = Number(params.id);
  console.log('Product ID is ');
  console.log(productId);
  const [formData, setFormData] = useState({
    productId: productId,
    name: '',
    email: '',
    review: '',
    star: 0,
  });
  const product = products.find((product) => product.id === productId);

  const renderStars = ({ star = 0 }: { star?: number }) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      if (i <= star) {
        stars.push(<MdStar key={i} size={20} className="text-warning" />);
      } else {
        stars.push(<MdStarBorder key={i} size={20} className="text-warning" />);
      }
    }
    return stars;
  };

  if (!product) {
    return <div>Product not found</div>;
  }
  const handleStarChange = (value: number) => {
    setFormData({ ...formData, star: value });
  };
  const productReviews = [
    {
      lebal: '5 star',
      ratingValue: 60,
    },
    {
      lebal: '4 star',
      ratingValue: 20,
    },
    {
      lebal: '3 star',
      ratingValue: 10,
    },
    {
      lebal: '2 star',
      ratingValue: 5,
    },
    {
      lebal: '1 star',
      ratingValue: 5,
    },
  ];

  const productReviewers = [
    {
      id: 1,
      profileImg: profileImg,
      name: 'Sam Lane',
      star: 5,
      review:
        'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
      createdAt: 'at 19 Jan 2024',
    },
    {
      id: 2,
      profileImg: profileImg,
      name: 'Sam Lane',
      star: 4,
      review:
        'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
      createdAt: 'at 19 Jan 2024',
    },
  ];
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
      label: 'Review (20)',
      content: (
        <div>
          <div className="px-2 py-6 flex flex-col sm:flex-row items-center gap-6 md:gap-10 max-w-full lg:max-w-[750px]">
            <div className="w-full xs:w-fit flex flex-col gap-4">
              {productReviews.map((item, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <span className="text-nowrap">{item.lebal}</span>
                  <Progress value={item.ratingValue} className="w-72 md:w-80" />
                  <span className="w-10">{item.ratingValue}%</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-60 sm:w-48 md:w-60 h-36 border-2 rounded-sm flex flex-col justify-center items-center gap-2">
                <span className="text-14 text-lightdark">20 Reviews</span>
                <h4 className="text-warning text-lg font-semibold">4.8</h4>
                <span className="flex">{renderStars({ star: 4.8 })}</span>
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button className="bg-warning w-full h-12 rounded-sm font-light">
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Add a Review</DialogTitle>
                  </DialogHeader>
                  <div>
                    <p>Your Email Address Will Not Be Published.</p>
                    <form action="" className="flex flex-col gap-4 mt-4">
                      <Rate onChange={handleStarChange} value={formData.star} />
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          className="border px-2 w-full h-10 rounded-md"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          className="border px-2 w-full h-10 rounded-md"
                        />
                      </div>
                      <div>
                        <textarea
                          name="review"
                          className="border px-2 py-2 w-full rounded-md"
                          rows={4}
                          placeholder="Write a Review"
                          value={formData.review}
                        ></textarea>
                      </div>
                      <Button variant={'default'}>Submit</Button>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="w-full px-8 h-20 bg-lightbackground flex items-center justify-between">
            <span className="text-lightdark">1 - 2 of 20 Reviews</span>
            <div className="w-fit">
              <Select>
                <SelectTrigger className="font-semibold">
                  <SelectValue placeholder="Sort by: Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort Options</SelectLabel>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="review">Rating</SelectItem>
                    <SelectItem value="recent">Recent</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {productReviewers.map((item) => (
              <div
                className="flex items-start gap-4 border-b-2 py-10"
                key={item.id}
              >
                <div>
                  <Image
                    src={item.profileImg}
                    alt="profile image"
                    className="rounded-full"
                    width={90}
                    height={90}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <h5 className="font-semibold">{item.name}</h5>
                    <span className="text-12 text-lightdark font-medium">
                      {item.createdAt}
                    </span>
                  </div>
                  <div className="flex">{renderStars({ star: item.star })}</div>
                  <p className="pe-4 text-14">{item.review}</p>
                </div>
              </div>
            ))}
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
  ];

  return (
    <div>
      <Container>
        <ProductDetail params={product} isZoom={true} />
      </Container>
      <div>
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
