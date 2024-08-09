'use client';
import ProductPage from '@/components/product-page/product';
import { Fragment, useState } from 'react';
import banner7 from '@images/banners/banner7.png';
import ProductBanner from '@/components/discount-banner/product-banner';

const SingleProduct = () => {
  const [layout, Setlayout] = useState<string>('grid');
  return (
    <Fragment>
      <ProductPage
        sideBanner={banner7}
        productBanner={<ProductBanner />}
        layout={layout}
        Setlayout={Setlayout}
      />
    </Fragment>
  );
};

export default SingleProduct;
