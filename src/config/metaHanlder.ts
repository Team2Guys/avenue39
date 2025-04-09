import { re_Calling_products } from "@/data/Re_call_prod";
import { generateSlug } from ".";
import { fetchCategories, fetchProducts, fetchSubCategories } from "./fetch";
import { notFound } from 'next/navigation'

export const Meta_handler = async (categoryName: string, url: string) => {
  const categories = await fetchCategories();

  const findCategory = categories && categories?.find((item: any) => generateSlug(item.custom_url || item.name) === categoryName);
  if (!findCategory) {
    notFound()
  }
  let fullurl = `${url}${findCategory?.custom_url || generateSlug(findCategory.name)}`;

  let images = findCategory.posterImageUrl || 'images';
  let alttext = findCategory.Images_Alt_Text || 'Alternative Text';
  let NewImage = [
    {
      url: images,
      alt: alttext,
    },
  ];

  let title = findCategory?.meta_title || 'Avenue39';
  let description =
    findCategory?.meta_description || 'Welcome to blindsandcurtains';
  let canonical = findCategory?.canonical_tag;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: fullurl,
      images: NewImage,
    },
    twitter: {
      card: title,
      description: description,
      url: fullurl,
      images: NewImage,

    },

    alternates: {
      canonical: canonical || fullurl,
    },
  };
};

export const productsFindHandler = async (
  slug: string[],
  url: string,
  subcategory?: string,
  newparams?:any
) => {
  const productName = slug[2];
  const products = await fetchProducts();

  const findProduct = products.find((item: any) => {
    return (
      generateSlug(item.custom_url || item.name) === (subcategory && subcategory!=="_" ? subcategory : productName)
    );
  });


  if (!findProduct) {
    notFound()
  }
  const { filter, variant, size } = newparams;

// Initialize queryParams array to collect query parameters
let queryParams = [];

// Add filter parameter if it exists
if (filter) {
  queryParams.push(`filter=${filter}`);
}

// Add variant parameter if it exists
if (variant) {
  queryParams.push(`variant=${variant}`);
}

// Add size parameter if it exists (added based on your example URL)
if (size) {
  queryParams.push(`size=${size}`);
}

// Join the query parameters with '&'
let queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

// Initialize the base URL
let fullurl = `${url}${slug[0]}`;

// Handle the subcategory, ensuring it doesn’t include an underscore ("_")
if (subcategory && subcategory !== "_") {
  fullurl = `${url}${slug[0]}/${subcategory}`;
} else {
  fullurl += `/${slug[1]}/${generateSlug(findProduct?.custom_url || findProduct?.name)}`;
}

// Append the query string to the final URL
fullurl += queryString;

  
  let images = findProduct.posterImageUrl || 'images';
  let alttext = findProduct.posterImageAltText || 'Alternative Text';
  let NewImage = [
    {
      url: images,
      alt: alttext,
    },
  ];

  let title = findProduct?.Meta_Title || 'Avenue39';
  let description = findProduct?.Meta_Description || 'Welcome to Avenue39';
  let canonical = findProduct?.Canonical_Tag;
  return {
    metadataBase: new URL(url),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: fullurl,
      images: NewImage,
    },
    twitter: {
      card: title,
      description: description,
      url: fullurl,
      images: NewImage,

    },

    alternates: {
      canonical: canonical || fullurl,
    },
  };
};

export const subCategory = async (slug: string[], url: string,newparams?:any) => {
  let subcategoryName = slug[1];
  let category = slug[0];
  const subCategories = await fetchSubCategories();
  const SubCategoriesFinder = re_Calling_products.find((value) =>
    generateSlug(value.mainCategory).trim().toLocaleLowerCase() === category && generateSlug(value.subCategory).trim().toLocaleLowerCase() == subcategoryName,
  );

  if (SubCategoriesFinder) {
    subcategoryName = generateSlug(SubCategoriesFinder.redirectsubCat.trim().toLocaleLowerCase(),);
    category = generateSlug(
      SubCategoriesFinder.redirect_main_cat.trim().toLocaleLowerCase(),
    );
  }
  const findSubCategory: any = subCategories?.find((item: any) => {
    const isNameMatch = generateSlug(item.custom_url || item.name) === subcategoryName;
    const belongsToCategory = item.categories.some((value: any) =>
      generateSlug(value.custom_url || value.name).trim().toLocaleLowerCase() === category,
    );
    return isNameMatch && belongsToCategory;
  });


  if (!findSubCategory) {
    return productsFindHandler(slug, url, subcategoryName, newparams);
  }


  let fullurl = url+category+"/"+subcategoryName;

  let images = findSubCategory.posterImageUrl || 'images';
  let alttext = findSubCategory.Images_Alt_Text || 'Alternative Text';
  let NewImage = [
    {
      url: images,
      alt: alttext,
    },
  ];

  let title = findSubCategory?.meta_title || 'Avenue39';
  let description =
    findSubCategory?.meta_description || 'Welcome to blindsandcurtains';
  let canonical = findSubCategory?.canonical_tag;

  return {

    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: fullurl,
      images: NewImage,
    },
    twitter: {
      card: title,
      description: description,
      url: fullurl,
      images: NewImage,

    },

    alternates: {
      canonical: canonical || fullurl,
    },
  };
};
