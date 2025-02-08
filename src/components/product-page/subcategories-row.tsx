import { generateSlug } from '@/config';
import { MenuItem } from '@/types/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { menuData } from '@/data/menu';
import { re_Calling_products, recallingTypes } from '@/data/Re_call_prod';

const SubCategoriesRow = ({ category }: any) => {
  const path = usePathname();
  const [subCategory, setSubCategory] = useState<MenuItem[]>([]);
  const [Category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const categoryKey = path?.replace('/', '');
    const categoryName = categoryKey === 'lighting' ? 'Lighting' : categoryKey === 'office-furniture' ? 'homeOffice' : categoryKey;
    setCategory(categoryKey);
    const subcategory = menuData[categoryName] || [];
    setSubCategory(subcategory);
  }, [path]);


const changeCategoryHandler = (categoryName:string, subCatgory:string)=>{

  const redirect_urls = re_Calling_products.find((item:recallingTypes)=>{
    if(item.mainCategory.trim().toLowerCase() == categoryName.trim().toLowerCase() && item.subCategory.trim().toLowerCase() === subCatgory.trim().toLowerCase()){
      return item;
    }
  })

  console.log(redirect_urls, "categoryName")

  return `/${generateSlug(redirect_urls ? redirect_urls.redirect_main_cat : categoryName)}/${generateSlug(redirect_urls ? redirect_urls.redirectsubCat :subCatgory)}`

}

  return (
    subCategory.length > 0 && (
      <div
        className={`relative ps-2 sm:ps-8 pe-8 ${subCategory.length === 2
            ? 'w-full md:w-6/12 lg:4/12 xl:2/12'
            : subCategory.length === 4
              ? 'w-full sm:w-6/12'
              : 'w-full sm:w-8/12'
          }`}
      >
        <button
          className="absolute -left-4 sm:left-0 top-1/2 transform -translate-y-1/2 z-10"
          id="swiper-prev"
        >
          <MdOutlineKeyboardArrowLeft size={30} />
        </button>
        <button
          className="absolute -right-4 sm:right-0 top-1/2 transform -translate-y-1/2 z-10"
          id="swiper-next"
        >
          <MdOutlineKeyboardArrowRight size={30} />
        </button>

        <Swiper
          spaceBetween={10}
          modules={[Navigation]}
          navigation={{
            prevEl: '#swiper-prev',
            nextEl: '#swiper-next',
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: {
              slidesPerView: (category && category?.subcategories?.length > 4) || subCategory.length > 4 ? 4 : (category && category?.subcategories?.length) || subCategory.length,
            },
            1024: {
              slidesPerView: (category && category?.subcategories?.length > 6) || subCategory.length > 6 ? 6 : (category && category?.subcategories?.length) || subCategory.length,
            },
          }}
        >
          {(category?.subcategories || subCategory).map((subcat: any, index: any) => (
            <SwiperSlide key={index}>
              <Link
        
                href={
                 
                  changeCategoryHandler(category?.name || Category, ((subcat?.custom_url || subcat?.name) || category.title) )
                
                }
                key={category.categoryId}
                className="w-full text-center whitespace-nowrap bg-[#afa183] rounded-lg py-2 px-2 text-white block"
              >
                <span>{subcat?.name || subcat.title}</span>
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default SubCategoriesRow;
