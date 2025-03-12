import { fetchCategories } from '@/config/fetch';
import dynamic from 'next/dynamic';
const Category = dynamic(() => import('./Category'))

const AddCategory = async () => {
  const cetagories = await fetchCategories();
  return (
    <>
      <Category cetagories={cetagories} />
    </>
  );
};

export default AddCategory;
