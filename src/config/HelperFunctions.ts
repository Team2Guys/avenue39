import { CartItem } from "@/redux/slices/cart/types";
import { IProduct } from "@/types/prod";
import { generateSlug } from ".";
import { ChangeUrlHandler } from "./fetch";
import { ICategory } from "@/types/cat";

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

export const convertHomeProductToInitialValues = (categories: any[]) => {
  if(!categories) return
  const structure: any = {
    dining: [[], [], [], []],
    living: [[], [], [], []],
    bedroom: [[], [], []],
  };

  categories.forEach((category) => {
    const name = category.name.toLowerCase();
    if (structure[name]) {
      structure[name] = category.home_product.map((row: any[]) =>
        row.map((product: any) => product.id)
      );
    }
  });

  return structure;
};

export const findCategoryProducts = (categories: ICategory[], CategoryName: string) => {
  const findCat = categories?.find((item) => item.name.toLowerCase() === CategoryName.toLowerCase());
  if (findCat) {
    return findCat
  }
} 