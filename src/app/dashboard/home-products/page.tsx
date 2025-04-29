import { DashboardfetchProducts, fetchCategories } from '@/config/fetch';
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

  const convertHomeProductToInitialValues = (categories: any[]) => {
    const structure: any = {
      dining: [[], [], [], []],
      living: [[], [], [], []],
      bedroom: [[], [], []],
    };
  
    categories.forEach((category) => {
      const name = category.name.toLowerCase();
      if (structure[name]) {
        structure[name] = category.home_product.map((row: any[]) =>
          row.map((product: any) => product.id)
        );
      }
    });
  
    return structure;
  };

  const initialValues = convertHomeProductToInitialValues(cetagories);

  return <Suspense><Product initialValues={initialValues} productsData={products} /></Suspense>
};

export default Productspage;
