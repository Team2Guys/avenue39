
// import React, { useCallback, useMemo } from 'react';
// const CatProduct = dynamic(() => import('./CatProduct'));
// const CatProduct1 = dynamic(() => import('./CatProduct1'));
// import { Accessories, Bedroom, Dining, Living } from '@/data/data';
// import { generateSlug } from '@/config';
// import dynamic from 'next/dynamic';
// import { IProduct } from '@/types/prod';
// import { filterAccessories, filterByCategoryAndTitle } from '@/config/HelperFunctions';

// const AllCategory = ({ products }: { products: IProduct[] }) => {

//   const diningProducts = useMemo(() => filterByCategoryAndTitle(products, Dining), [products]);
//   const livingProducts = useMemo(() => filterByCategoryAndTitle(products, Living), [products]);
//   const bedroomProducts = useMemo(() => filterByCategoryAndTitle(products, Bedroom), [products]);
//   const accessoryProducts = useMemo(() => filterAccessories(products, Accessories), [products]);


//   const descriptionMap = useMemo(() => {
//     const map: Record<string, string> = {};
//     products.forEach(product => {
//       product.categories?.forEach(category => {
//         const slug = generateSlug(category.name);
//         if (!map[slug]) map[slug] = category.short_description || '';
//       });
//     });
//     return map;
//   }, [products]);

//   const getCategoryDescription = useCallback(
//     (name: string) => descriptionMap[generateSlug(name)] || '',
//     [descriptionMap]
//   );


//   return (
//     <div className="pt-1">
//       <CatProduct
//         products={diningProducts}
//         CategoryDescription={getCategoryDescription('Dining')}
//         CategoryName="Shop Your Dining"
//         redirect="dining"
//       />
//       <CatProduct
//         products={livingProducts}
//         CategoryDescription={getCategoryDescription('Living')}
//         CategoryName="Shop Your Living"
//         reverse
//         landHeight={'calc(100% - 80px)'}
//         portSpace="px-4 sm:px-8"
//         sofaHeight={'calc(100% - 60px)'}
//         sideTableHeight={'calc(100% - 20px)'}
//         redirect="living"
//       />
//       <CatProduct1
//         products={bedroomProducts}
//         CategoryDescription={getCategoryDescription('Bedroom')}
//         CategoryName="Shop your Bedroom"
//         redirect="bedroom"
//       />
//       <CatProduct1
//         products={accessoryProducts}
//         CategoryDescription={getCategoryDescription('Accessories')}
//         CategoryName="Complement your design with accessories"
//         reverse
//         redirect="accessories"
//         accessoriesSlider={true}
//       />
//     </div>
//   );
// };

// export default AllCategory;




// components/AllCategory.tsx
import dynamic from 'next/dynamic';
import React from 'react';
import { IProduct } from '@/types/prod';

const DiningSection = dynamic(() => import('./AllCategorySections/DiningSection'), {
  ssr: false,
  loading: () => <div>Loading dining…</div>,
});

const LivingSection = dynamic(() => import('./AllCategorySections/LivingSection'), {
  ssr: false,
  loading: () => <div>Loading living…</div>,
});

const BedroomSection = dynamic(() => import('./AllCategorySections/BedroomSection'), {
  ssr: false,
  loading: () => <div>Loading bedroom…</div>,
});

const AccessoriesSection = dynamic(() => import('./AllCategorySections/AccessoriesSection'), {
  ssr: false,
  loading: () => <div>Loading accessories…</div>,
});

const AllCategory = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="pt-1">
      <DiningSection products={products} />
      <LivingSection products={products} />
      <BedroomSection products={products} />
      <AccessoriesSection products={products} />
    </div>
  );
};

export default AllCategory;
