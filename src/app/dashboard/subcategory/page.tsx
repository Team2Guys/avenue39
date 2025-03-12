import { fetchCategories, fetchSubCategories } from '@/config/fetch';
import dynamic from 'next/dynamic';
const SubCategoryComponent = dynamic(() => import('./SubCategory'))

const AddSubCategory = async () => {
  const [cetagories, subCategories] = await Promise.all([
    fetchCategories(),
    fetchSubCategories(),
  ]);
  return (
    <SubCategoryComponent
      subCategories={subCategories}
      cetagories={cetagories}
    />
  );
};

export default AddSubCategory;
