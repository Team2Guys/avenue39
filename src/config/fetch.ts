import { re_Calling_products } from '@/data/Re_call_prod';
import { ICategory, IProduct, IReview } from '@/types/types';
import axios from 'axios';
import { generateSlug } from '.';

export const fetchProducts = async () => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-all`,
      {
        next: { tags: ['products'] },
      },
    );
    if (!result.ok) {
      console.log(result, 'result');

      return [];
    }
    const response = await result.json();

    return response;
  } catch (error) {
    console.log(error, 'error');
  }
};

export const fetchCategories = async (): Promise<ICategory[] | any> => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/get-all`,
      {
        next: { tags: ['categories'] },
      },
    );
    const response = await result.json();
    return response;
  } catch (error) {
    console.log(error, 'error');
  }
};

export const fetchSubCategories = async (): Promise<ICategory[]> => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/subcategories/get-all`,
    {
      next: { tags: ['subcategories'] },
    },
  );
  const response = await result.json();
  return response;
};

export const fetchReviews = async (): Promise<IReview[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/get-all`,
  );
  return response.data;
};

export const TrimUrlHandler = (name: string | undefined) => {
  if (!name) return '';

  return name.trim().toLowerCase();
};


export const ChangeUrlHandler = (product: IProduct) => {
  if (!product) return '';
  let url = '';
  const categoryFlag = (product?.subcategories && product?.subcategories?.length > 0) && (product?.categories && product?.categories?.length > 0);

  const filteredProduct = categoryFlag && re_Calling_products.find((prod: any) => {
    const categoriesMatch = product?.categories && product?.categories.some((cat: any) => cat.name.trim().toLowerCase() === prod.mainCategory.trim().toLowerCase());
    const subCategoryMatch = product?.subcategories && product?.subcategories.some((cat: any) => cat.name.trim().toLowerCase() === prod.subCategory.trim().toLowerCase());

    return categoriesMatch && subCategoryMatch;
  });

  if (filteredProduct) {
    const category = generateSlug(filteredProduct.redirect_main_cat).toLowerCase();
    const subCategory = generateSlug(filteredProduct.redirectsubCat).toLowerCase();
    url = `/${category}/${subCategory}/${generateSlug(product.name)}`;
  } else {
    const category = generateSlug(product.categories && product.categories[0]?.name || "").toLowerCase();
    const subCategory = generateSlug(product.subcategories && product.subcategories[0]?.name || "").toLowerCase();
    if (subCategory) {
      url = `/${category}/${subCategory}/${generateSlug(product.name)}`;
    } else {
      url = `/${category}/${generateSlug(product.name)}`;
    }

  }

  return url;
};
