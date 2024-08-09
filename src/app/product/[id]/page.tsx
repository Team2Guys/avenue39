'use client';
import React, { useState } from 'react';
import { products } from '@/data/products';
import Image from 'next/image';
import CustomPaging from '@/components/image-slider';
import { H1, NormalText, ProductName, ProductPrice } from '@/styles/typo';
import { MdLocalFireDepartment, MdStar, MdStarBorder } from 'react-icons/md';
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
import { IProductDetail, IReview } from '@/types/types';
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
import profileImg from '@icons/avator.png';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '@/config/fetch';
import { calculateRatingsPercentage, formatDate } from '@/config';
import WriteReview from '@/components/write-review';
import { Button } from '@/components/ui/button';

const ProductPage = ({ params }: { params: IProductDetail }) => {
  const productId = Number(params.id);
  const [formData, setFormData] = useState({
    productId: productId,
    name: '',
    email: '',
    review: '',
    star: 0,
  });
  const product = products.find((product) => product.id === productId);

  const [sortOption, setSortOption] = useState<string>('default');
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMoreReviews = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  const {
    data: reviews = [],
    error,
    isLoading,
  } = useQuery<IReview[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  });

  const filteredReviews = reviews.filter(
    (review) => review.productId === productId,
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortOption) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'review':
        return b.star - a.star;
      case 'recent':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });
  const reviewsToDisplay = sortedReviews.slice(0, visibleCount);

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

  const { productReviews, averageRating } =
    calculateRatingsPercentage(filteredReviews);

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
      label: `Review (${filteredReviews.length})`,
      content: (
        <div>
          <div className="px-2 py-6 flex flex-col sm:flex-row items-center gap-6 md:gap-10 max-w-full lg:max-w-[750px]">
            <div className="w-full xs:w-fit flex flex-col gap-4">
              {productReviews.map((item, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <span className="text-nowrap">{item.label}</span>
                  <Progress value={item.ratingValue} className="w-72 md:w-80" />
                  <span className="w-10">{item.ratingValue}%</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-60 sm:w-48 md:w-60 h-36 border-2 rounded-sm flex flex-col justify-center items-center gap-2">
                <span className="text-14 text-lightdark">
                  {filteredReviews.length} Reviews
                </span>
                <h4 className="text-warning text-lg font-semibold">
                  {averageRating}
                </h4>
                <span className="flex">
                  {renderStars({ star: averageRating })}
                </span>
              </div>
              <WriteReview productId={productId} />
            </div>
          </div>
          <div className="w-full px-8 h-20 bg-lightbackground flex items-center justify-between">
            <span className="text-lightdark">
              1 - 2 of {filteredReviews.length} Reviews
            </span>
            <div className="w-fit">
              <Select onValueChange={(value) => setSortOption(value)}>
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
            {error ? (
              <div className="text-red-500">Error: {error.message}</div>
            ) : isLoading ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              <>
                {reviewsToDisplay.map((item) => (
                  <div
                    className="flex items-start gap-4 border-b-2 py-10"
                    key={item.id}
                  >
                    <div>
                      <Image
                        src={
                          item.userProfileImg ? item.userProfileImg : profileImg
                        }
                        alt="profile image"
                        className="rounded-full"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <h5 className="font-semibold">{item.name}</h5>
                        <span className="text-12 text-lightdark font-medium">
                          at {formatDate(item.createdAt)}
                        </span>
                      </div>
                      <div className="flex">
                        {renderStars({ star: item.star })}
                      </div>
                      <p className="pe-4 text-14">{item.review}</p>
                    </div>
                  </div>
                ))}
                {filteredReviews.length > visibleCount && (
                  <div className="flex  mt-4 py-2 px-4 items-center justify-center">
                    <Button
                      onClick={loadMoreReviews}
                      className=" w-24 flex text-white rounded"
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            )}
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
