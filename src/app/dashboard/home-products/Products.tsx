'use client';
import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import { IProduct } from '@/types/prod';
import ProductLayout from '@/components/Dashboard/ProductLayout/ProductLayout';
import { IHomeProductsCategory } from '@/types/cat';

const HomeProducts = ({initialValues,productsData}: {
  initialValues: IHomeProductsCategory;
  productsData: IProduct[];
}) => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Home Products' />
      <ProductLayout productsData={productsData} initialProductsValues={initialValues}  />
    </DefaultLayout>
  );
};

export default ProtectedRoute(HomeProducts);
