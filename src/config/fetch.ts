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

export const ChangeUrlHandler = (product: IProduct, SubcategoryName?: string, mainCatgor?: string) => {
  if (!product) return '';

  console.log(product, "product")

  let url = '';
  const categoryFlag = product?.subcategories && product?.subcategories?.length > 0 && product?.categories && product?.categories?.length > 0;

  const filteredProduct = categoryFlag && re_Calling_products.find((prod: any) => {
    const categoriesMatch = product?.categories && product?.categories.some((cat: any) => cat.name.trim().toLowerCase() === prod.mainCategory.trim().toLowerCase()
  );
    const subCategoryMatch = product?.subcategories && product?.subcategories.some((cat: any) =>(cat.custom_url ||cat.name).trim().toLowerCase() === prod.subCategory.trim().toLowerCase());

    return categoriesMatch && subCategoryMatch;
  });

  if (filteredProduct) {
    const cat = product?.categories && product?.categories.find((cat: any) => (cat.custom_url ||cat.name).trim().toLowerCase() === filteredProduct.redirect_main_cat.trim().toLowerCase());
    const subCat = product?.subcategories && product?.subcategories.find((cat: any) =>(cat.custom_url ||cat.name).trim().toLowerCase() === filteredProduct.redirectsubCat.trim().toLowerCase());


    const category = generateSlug(cat?.custom_url || filteredProduct.redirect_main_cat).toLowerCase();
    const subCategory = generateSlug(subCat?.custom_url || filteredProduct.redirectsubCat).toLowerCase();
    url = `/${category}/${subCategory}/${generateSlug(product.custom_url || product.name)}`;

  } else if (SubcategoryName && mainCatgor) {
    const category = product?.categories?.find((value: ICategory) => (value?.custom_url || generateSlug(value?.name) ).trim().toLowerCase()== mainCatgor.trim().toLowerCase())
    const subCategory = product.subcategories?.find((subcat) => subcat?.custom_url || subcat?.name)

    if (subCategory) {
      url = `/${generateSlug((category?.custom_url || category?.name) || "")}/${generateSlug(subCategory?.custom_url || subCategory?.name)}/${generateSlug(product.custom_url || product.name)}`;
    } else {
      url = `/${generateSlug((category?.custom_url || category?.name) || "")}/${generateSlug(product.custom_url || product.name)}`;
    }
  }
  else {
    const category = generateSlug((product.categories && (product.categories[0]?.custom_url || product.categories[0]?.name)) || '').toLowerCase();
    const subCategory = generateSlug((product.subcategories && (product.subcategories[0]?.custom_url || product.subcategories[0]?.name)) || '').toLowerCase();
    if (subCategory) {
      url = `/${category}/${subCategory}/${generateSlug(product.custom_url || product.name)}`;
    } else {
      url = `/${category}/${generateSlug(product.custom_url || product.name)}`;
    }
  }

  return url;
};

export const get_all_records = async (token: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sales-record/get_all_records`,
      {
        headers: token
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const record = await response.json();
    return record;
  } catch (err) {
    console.error("Error fetching records:", err);
    return null;
  }
};