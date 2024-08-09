'use client';
import React, { useState } from 'react';
import { products } from '@/data/products';
import Image from 'next/image';
import { MdStar, MdStarBorder } from 'react-icons/md';

import DetailTabs from '@/components/detail-tabs/detail-tabs';
import {features } from '@/data';
import Container from '@/components/ui/Container';
import Services from '@/components/services/services';
import { IProductDetail, IReview } from '@/types/types';

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
import TopHero from '@/components/top-hero';
import { cartpagebredcrumbs } from '@/data/data';
import FeatureSlider from '@/components/card-slider/feature-slider';
import { Table } from 'antd';

const ProductPage = ({ params }: { params: IProductDetail }) => {
  const productId = Number(params.id);
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


  const columns = [
    {
      title: 'Keys',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const dataSource = product.additionalInformation.map((info, index) => ({
    key: index,
    ...info,
  }));

  const tabs = [
    {
      label: 'Description',
      content: (
        <div className="p-2 flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="w-full md:w-3/5">
            <p className="text-slate-400 text-17 font-normal leading-7">
              {product.description}
            </p>
          </div>
          <div className="w-full md:w-2/5 border-t-2 md:border-t-0 border-s-0 md:border-s-2 py-4 md:pb-10">
            <h5 className="ps-12 font-bold text-15">DIMENSIONS</h5>
            <ul className="list-disc text-slate-400 text-14 ps-16 mt-4">
              <li>coffee table-0.800*0.800*0.320</li>
              <li>side table-0.600*0.600*0.517</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: `Review (${filteredReviews.length})`,
      content: (
        <div>
          <div className="px-2 py-6 flex flex-col lg:flex-row items-center gap-6 md:gap-10 w-full max-w-full lg:max-w-[750px]">
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
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              bordered
              rowKey="key"
              className="custom-table"
            />
      ),
    },
  ];

  return (
    <div>
      <TopHero breadcrumbs={cartpagebredcrumbs} />
      <Container>
        <ProductDetail
          params={product}
          isZoom={true}
          gap="gap-10 md:gap-40"
          swiperGap="justify-between gap-6 md:gap-14"
          detailsWidth="w-full md:w-1/2 lg:w-1/4"
        />
      </Container>
      <div>
        <DetailTabs tabs={tabs} />
      </div>
      <div className="mt-10 pt-10 mb-20 border-t-2">
      <Container>
        <p className="text-3xl sm:text-4xl md:text-[51px] font-medium text-center mb-4 sm:mb-0">Similar Products</p>
        <FeatureSlider />
      </Container>
      </div>
      <Services />
    </div>
  );
};

export default ProductPage;
