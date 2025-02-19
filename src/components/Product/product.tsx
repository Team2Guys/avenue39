'use client';
import React, { useEffect, useState } from 'react';
import DetailTabs from '@/components/detail-tabs/detail-tabs';
import Container from '@/components/ui/Container';
import Services from '@/components/services/services';
import { IProduct, IProductDetail, IReview } from '@/types/types';
import ProductDetail from '@/components/product-detail/product-detail';
import TopHero from '@/components/top-hero';
import FeatureSlider from '@/components/card-slider/feature-slider';
import { Table } from 'antd';
import { Skeleton } from '@/components/ui/skeleton';
import NoProduct from '@/components/ui/no-product';

const Product = ({ params, reviews, similarProducts, product, products, subslug, mainslug, filterParam, sizeParam }: {
  params: IProductDetail;
  reviews: IReview[];
  product: IProduct;
  similarProducts: IProduct[];
  products?: IProduct[];
  subslug?: string;
  mainslug?: string;
  filterParam?: string;
  sizeParam?: string;

}) => {
  const slug = params.name;
  console.log(slug, 'slug', reviews);
  const additional_columns_handler = () => {
    const section = product?.sections;
    if (section && section.length > 0) {
      const dynamicTabs = section.map((sec: any) => ({
        label: sec.heading,
        content: (
          <div className="space-y-2">
            {sec.additionalInformation?.map((item: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <p className="text-black text-17 font-normal leading-7">
                  {item.name}
                </p>
                <p className="text-slate-400 text-17 font-normal leading-7">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        ),
      }));
      setTabs((prevTabs) =>
        [...prevTabs, ...dynamicTabs].filter(
          (tab, index, self) =>
            index === self.findIndex((t) => t.label === tab.label),
        ),
      );
    }
  };

  const dataSource = product?.additionalInformation.map((info, index) => ({
    key: index,
    ...info,
  }));

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    },
  ];

  const [tabs, setTabs] = useState<any[]>([
    {
      label: 'Description',
      content: (
        <div className=" flex flex-col md:flex-row gap-6 md:gap-10 border shadow-sm rounded-2xl   font-helvetica mt-2 ">
          <p className="text-slate-400 text-14 md:text-17 font-normal leading-7 w-full p-2">
            <Skeleton className="text-slate-400 text-17 font-normal leading-7 font-helvetica" />
            {product?.description ? (
              <span className="font-helvetica">{product.description}</span>
            ) : (
              <Skeleton className="text-slate-400 text-17 font-normal leading-7" />
            )}
          </p>
          {product?.spacification && product?.spacification.length > 0 && (
            <div className="w-full md:w-2/5 border-t-2 md:border-t-0 border-s-0 md:border-s-2 py-4 md:pb-10 font-helvetica">
              <h5 className="px-0 md:ps-12 font-bold text-15 uppercase">
                specification
              </h5>
              <ul className="list-disc text-slate-400 text-14 px-4 md:ps-16 mt-4 font-Helveticalight">
                {product?.spacification?.map(({ specsDetails }, index) => (
                  <li key={index}>{specsDetails}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Additional Information",
      content:
        dataSource && dataSource.length > 0 ? (
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
            rowKey="name"
            className="detail font-helvetica"
          />
        ) : null,
    },
  ]);

  const filteredTabs = tabs.filter(
    (tab) =>
      !(
        tab.label === "Additional Information" &&
        (!dataSource || dataSource.length === 0)
      )
  );

  const cartpageBreadcrumbs = [
    { label: "Home", href: "/" },
    { label: product?.name ?? "Product Page" },
  ];

  useEffect(() => {
    additional_columns_handler();
  }, [product]);

  return (
    <div>
      <TopHero breadcrumbs={cartpageBreadcrumbs}
        categoryName={mainslug ? mainslug : subslug}
        subCategorName={subslug}
        productName={product?.name}
      />
      <Container>
        {!product ? (
          <NoProduct
            cardHeight="2xl:h-[488px]"
            iconSize={40}
            title="No Product Found"
            titleClass="font-medium text-2xl md:text-3xl"
          />
        ) : (
          product && (
            <ProductDetail
              params={product}
              isZoom={true}
              gap="lg:gap-20 md:gap-20 sm:gap-10 gap-10"
              swiperGap=" justify-between gap-2 xs:gap-6 md:gap-3"
              detailsWidth="w-full md:w-1/2 lg:w-9/12 2xl:w-2/6"
              products={products}
              filterParam={filterParam}
              sizeParam={sizeParam}
            />
          )
        )}
      </Container>
      {product && (
        <div className="">
          <DetailTabs tabs={filteredTabs} />
        </div>
      )}
      <Container className="w-full relative mt-10">
        <FeatureSlider similarProducts={products?.slice(0, 15) || []} title={true} isBestSeller={true} />
      </Container>
      <div className="mt-10 pt-10 mb-10 border-t-2">
        <Container>
          <FeatureSlider similarProducts={similarProducts} title={true} />
        </Container>
      </div>
      <Services />
    </div>
  );
};

export default Product;
