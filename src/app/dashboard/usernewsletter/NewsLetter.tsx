'use client';

import { useState } from 'react';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import dynamic from 'next/dynamic';
const ViewNewsletter = dynamic(() => import('@components/Dashboard/Tables/ViewNewsletter'))
const Breadcrumb = dynamic(() => import('@components/Dashboard/Breadcrumbs/Breadcrumb'))

interface Product {
  id: string;
  email: string;
}
const NewsLetter = ({ newsLetters }: { newsLetters: Product[] }) => {
  const [products, setProducts] = useState<Product[]>(newsLetters);
  const [selecteMenu, setselecteMenu] = useState<string>('Add All Products');

  let productFlag: boolean = selecteMenu === 'Add All Products';

  return (
    <DefaultLayout>
      <Breadcrumb pageName={productFlag ? 'Newsletter' : 'BroadCast Email'} />
      <ViewNewsletter
        Categories={products}
        setCategory={setProducts}
        setselecteMenu={setselecteMenu}
      />
    </DefaultLayout>
  );
};

export default ProtectedRoute(NewsLetter);
