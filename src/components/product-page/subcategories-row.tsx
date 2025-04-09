import { generateSlug } from '@/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { re_Calling_products, recallingTypes } from '@/data/Re_call_prod';
import { usePathname } from 'next/navigation';
import { ICategory } from '@/types/cat';
import { menuData } from '@/data/menu';

const SubCategoriesRow = ({ category }: any) => {
  const [subCategory, setSubCategory] = useState<ICategory[] | undefined>([]);
  const path = usePathname()


  const changeCategoryHandler = (categoryName: string, subCatgory: string) => {

    const redirect_urls = re_Calling_products.find((item: recallingTypes) => {
      if (item.mainCategory.trim().toLowerCase() == categoryName.trim().toLowerCase() && item.subCategory.trim().toLowerCase() === subCatgory.trim().toLowerCase()) {
        return item;
      }
    })


    return `/${generateSlug(redirect_urls ? redirect_urls.redirect_main_cat : categoryName)}/${generateSlug(redirect_urls ? redirect_urls.redirectsubCat : subCatgory)}`

  }

  useEffect(() => {
    if (!category) return;

    const categoryName =
      category.name.toLowerCase() === 'lighting'
        ? 'Lighting'
        : category.name.toLowerCase() === 'home office'
          ? 'homeOffice'
          : category.name.toLowerCase();

    // Get menu items from menuData instead of category
    const menuItems = menuData[categoryName] ?? [];

    const sortedSubcategories = category.subcategories?.sort((a: any, b: any) => {
      const indexA = menuItems.findIndex(
        (item) => item.title.toLowerCase() === a.name.toLowerCase()
      );
      const indexB = menuItems.findIndex(
        (item) => item.title.toLowerCase() === b.name.toLowerCase()
      );

      if (indexA === -1 && indexB === -1) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    setSubCategory(sortedSubcategories);
  }, [category]);


  // const sorted = category?.subcategories.sort((a: any, b: any) => {
  //   const subCatA = a.custom_url || a.name;
  //   const subCatB = b.custom_url || b.name;
  //   const redirectUrlA = re_Calling_products.find((item: recallingTypes) => {
  //     return (
  //       item.mainCategory.trim().toLowerCase() === (category.custom_url || category.name).trim().toLowerCase() &&
  //       item.subCategory.trim().toLowerCase() === subCatA.trim().toLowerCase()
  //     );
  //   });

  //   const redirectUrlB = re_Calling_products.find((item: recallingTypes) => {
  //     return (
  //       item.mainCategory.trim().toLowerCase() === (category.custom_url || category.name).trim().toLowerCase() &&
  //       item.subCategory.trim().toLowerCase() === subCatB.trim().toLowerCase()
  //     );
  //   });

  //   const aContainsRedirect = !!redirectUrlA; // Check if redirectUrlA is found
  //   const bContainsRedirect = !!redirectUrlB; // Check if redirectUrlB is found

  //   if (aContainsRedirect && !bContainsRedirect) {
  //     return 1; // Move 'a' to the last
  //   }
  //   if (!aContainsRedirect && bContainsRedirect) {
  //     return -1; // Move 'b' to the last
  //   }
  //   return 0; // Keep the original order if both or neither match
  // });


  return (
    category && category?.subcategories?.length > 0 && (
      <div
        className={`relative px-2 sm:ps-8 sm:pe-8 ${(category && category?.subcategories?.length === 2)
          ? 'w-full md:w-6/12 lg:4/12 xl:2/12'
          : category && category?.subcategories?.length === 4
            ? 'w-full sm:w-full md:w-6/12 lg:w-6/12 xl:w-6/12'
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
              slidesPerView: (category && category?.subcategories?.length > 4) ? 4 : (category && category?.subcategories?.length)
            },
            1024: {
              slidesPerView: (category && category?.subcategories?.length > 6) ? 6 : (category && category?.subcategories?.length)
            },
          }}
        >
          {(subCategory)?.map((subcat: any, index: any) => (
            <SwiperSlide key={index}>
              <h2>
                <Link

                  href={

                    changeCategoryHandler((category?.custom_url || category?.name), ((subcat?.custom_url || subcat?.name) || category.title))

                  }
                  key={category.categoryId}
                  className={`w-full text-center whitespace-nowrap rounded-lg py-1 sm:py-2 sm:px-2 border text-12 sm:text-16 block ${path === changeCategoryHandler((category?.custom_url || category?.name), ((subcat?.custom_url || subcat?.name) || category.title)) ? 'bg-primary text-white border-primary' : 'bg-transparent hover:bg-main hover:text-white text-main border-main'}`}
                >
                  <span>{subcat?.name || subcat.title}</span>
                </Link>
              </h2>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default SubCategoriesRow;
