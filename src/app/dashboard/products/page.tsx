import { dashboardCategories, DashboardfetchProducts } from '@/config/fetch';
import dynamic from 'next/dynamic';
const Product = dynamic(() => import('./Products'), {
  loading: () => <p>Loading...</p>,
});

const Productspage = async () => {
  const [cetagories, products] = await Promise.all([
    dashboardCategories(),
    DashboardfetchProducts(),
  ]);

  return <Product cetagories={cetagories} productsData={products} />;
};

export default Productspage;
