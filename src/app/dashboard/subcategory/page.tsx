import { dashboardfetchSubCategories, fetchCategories } from '@/config/fetch';
import dynamic from 'next/dynamic';
const SubCategoryComponent = dynamic(() => import('./SubCategory'))

const AddSubCategory = async () => {
  const [cetagories, subCategories] = await Promise.all([
    fetchCategories(),
    dashboardfetchSubCategories(),
  ]);
  return (
    <SubCategoryComponent
      subCategories={subCategories}
      cetagories={cetagories}
    />
  );
};

export default AddSubCategory;
