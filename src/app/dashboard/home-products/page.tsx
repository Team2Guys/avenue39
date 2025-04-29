import { DashboardfetchProducts, fetchCategories } from '@/config/fetch';
import { convertHomeProductToInitialValues } from '@/config/HelperFunctions';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const Product = dynamic(() => import('./Products'), {
  loading: () => <p>Loading...</p>,
});

const Productspage = async () => {
  const [cetagories, products] = await Promise.all([
    fetchCategories('get-home-products'),
    DashboardfetchProducts(),
  ]);
  console.log(cetagories,'cetagories')

  const initialValues = convertHomeProductToInitialValues(cetagories);

  return <Suspense><Product initialValues={initialValues} productsData={products} /></Suspense>
};

export default Productspage;
