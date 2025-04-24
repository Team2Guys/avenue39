const CatProduct = dynamic(() => import('./CatProduct'));
const CatProduct1 = dynamic(() => import('./CatProduct1'));
import { Accessories, Bedroom, Dining, Living } from '@/data/data';
import { generateSlug } from '@/config';
import dynamic from 'next/dynamic';
import { IProduct } from '@/types/prod';
import { filterAccessories, filterByCategoryAndTitle } from '@/config/HelperFunctions';

const AllCategory = ({ products }: { products: IProduct[] }) => {

  const diningProducts =  filterByCategoryAndTitle(products, Dining);
  const livingProducts =  filterByCategoryAndTitle(products, Living);
  const bedroomProducts = filterByCategoryAndTitle(products, Bedroom);
  const accessoryProducts = filterAccessories(products, Accessories);


  const getCategoryDescription = (categoryName: string) => {
    const matchedCategory = products.flatMap((product) => product.categories || []).find((category) => generateSlug(category.name) === generateSlug(categoryName));
    return matchedCategory?.short_description || '';
  };


  return (
    <>
      <CatProduct
        products={diningProducts}
        CategoryDescription={getCategoryDescription('Dining')}
        CategoryName="Shop Your Dining"
        redirect="dining"
      />
      <CatProduct
        products={livingProducts}
        CategoryDescription={getCategoryDescription('Living')}
        CategoryName="Shop Your Living"
        reverse
        landHeight={'calc(100% - 80px)'}
        portSpace="px-4 sm:px-8"
        sofaHeight={'calc(100% - 60px)'}
        sideTableHeight={'calc(100% - 20px)'}
        redirect="living"
      />
      <CatProduct1
        products={bedroomProducts}
        CategoryDescription={getCategoryDescription('Bedroom')}
        CategoryName="Shop your Bedroom"
        redirect="bedroom"
      />
      <CatProduct1
        products={accessoryProducts}
        CategoryDescription={getCategoryDescription('Accessories')}
        CategoryName="Complement your design with accessories"
        reverse
        redirect="accessories"
        accessoriesSlider={true}
      />
    </>
  );
};

export default AllCategory;
