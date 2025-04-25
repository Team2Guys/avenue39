import { CartItem } from "@/redux/slices/cart/types";
import { IProduct } from "@/types/prod";
import { generateSlug } from ".";
import { ChangeUrlHandler } from "./fetch";

  export const product_refactor = async (product: CartItem) => {
      const { sizes, filter, ...updatedProduct } = product;
    
      console.log(sizes, filter);
    
      if (updatedProduct.selectedSize) {
        const { price, discountPrice, ...updatedSize } = updatedProduct.selectedSize;
        updatedProduct.selectedSize = updatedSize as any; 
        console.log(price, discountPrice);
      }
    
      if (updatedProduct.selectedfilter) {
        const { price, discountPrice, ...updatedFilter } = updatedProduct.selectedfilter;
        updatedProduct.selectedfilter = updatedFilter as any; 
        console.log(price, discountPrice);
      }
    
      return updatedProduct;
    };

export function formatPrice(price: any) {
  if (!price) return 0;
  return price > 1000 ? price.toLocaleString('en-US') : price;
}


export const filterByCategoryAndTitle = (products: IProduct[], titles: string[]): IProduct[] => {
  const titleIndexMap = new Map(titles.map((title, index) => [title, index]));

  return products
    .filter(product => titleIndexMap.has(product.name))
    .sort((a, b) => (titleIndexMap.get(a.name) ?? 0) - (titleIndexMap.get(b.name) ?? 0));
};

  

export const filterAccessories = (products: IProduct[], titles: string[]) => {
  const titleIndexMap = new Map(titles.map((title, index) => [title, index]));

  const matching: IProduct[] = [];
  const nonMatching: IProduct[] = [];

  for (const product of products) {
    const isAccessory = product.categories?.some(
      (cat) => cat.name.toLowerCase() === 'accessories'
    );
    if (!isAccessory) continue;

    (titleIndexMap.has(product.name) ? matching : nonMatching).push(product);
  }

  matching.sort((a, b) =>
    (titleIndexMap.get(a.name) ?? 0) - (titleIndexMap.get(b.name) ?? 0)
  );

  return [...matching, ...nonMatching].slice(0, 10);
};

export const getCategoryDescription = (categoryName: string, products: IProduct[]) => {
  const matchedCategory = products.flatMap((product) => product.categories || []).find((category) => generateSlug(category.name) === generateSlug(categoryName));
  return matchedCategory?.short_description || '';
};

 export const generateFinalUrl = (itemToAdd: CartItem, card: IProduct, SubcategoryName: any, mainCatgory?: string) => {
   const baseUrl = ChangeUrlHandler(card, SubcategoryName?.name, mainCatgory);
    const params = new URLSearchParams();
  
    if (itemToAdd?.selectedfilter?.name) {
      params.set('variant', generateSlug(itemToAdd.selectedfilter.name));
    }
    if (itemToAdd?.selectedSize?.name) {
      params.set('size', generateSlug(itemToAdd.selectedSize.name));
    }
  
    const query = params.toString();
    return query ? `${baseUrl}?${query}` : baseUrl;
  };