'use client';
import ProductPage from '@/components/product-page/product';
import { Fragment, useState } from 'react';
import banner5 from '@images/banners/banner5.png';
import MegaSale from '@/components/discount-banner/mega-sale';

const Products = () => {
  const [layout, Setlayout] = useState<string>('grid');

  return (
    <Fragment>
      <ProductPage
        sideBanner={banner5}
        productBanner={<MegaSale />}
        layout={layout}
        Setlayout={Setlayout}
      />
    </Fragment>
  );
};

export default Products;
