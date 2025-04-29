'use client';
import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import { ICategory } from '@/types/cat';
import { IProduct } from '@/types/prod';
import ProductLayout from '@/components/Dashboard/ProductLayout/ProductLayout';

const HomeProducts = ({cetagories,productsData}: {
  cetagories: ICategory[];
  productsData: IProduct[];
}) => {
  console.log(cetagories,productsData)
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Home Products' />
      <ProductLayout productsData={productsData} />
    </DefaultLayout>
  );
};

export default ProtectedRoute(HomeProducts);
