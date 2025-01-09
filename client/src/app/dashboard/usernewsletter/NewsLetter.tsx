'use client';

import ViewNewsletter from '@components/Dashboard/Tables/ViewNewsletter';
import { useState } from 'react';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import ProtectedRoute from '@/hooks/AuthHookAdmin';

interface Product {
   id: string;
   email: string;
 }
const NewsLetter = ({newsLetters}: {newsLetters: Product[]}) => {
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