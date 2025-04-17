import { CartItem } from "@/redux/slices/cart/types";
import { IProduct } from "@/types/prod";

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


export const filterByCategoryAndTitle = (products: IProduct[], titles: string[]) => {
    const titleIndexMap = new Map(titles.map((title, index) => [title, index]));
  
    const filteredProducts: IProduct[] = [];
  
    for (const prod of products) {
      if (titleIndexMap.has(prod.name)) {
        filteredProducts.push(prod);
      }
    }
  
    filteredProducts.sort((a, b) => {
      return (titleIndexMap.get(a.name) ?? 0) - (titleIndexMap.get(b.name) ?? 0);
    });
  
    return filteredProducts;
  };
  

  export const filterAccessories = (products: IProduct[], titles: string[]) => {
    const titleIndexMap = new Map(titles.map((title, index) => [title, index]));
  
    const matchingProducts: IProduct[] = [];
    const nonMatchingProducts: IProduct[] = [];
  
    for (const prod of products) {
      const isAccessory = prod.categories?.some(
        (cat) => cat.name.toLowerCase() === 'accessories'
      );
      if (!isAccessory) continue;
  
      if (titleIndexMap.has(prod.name)) {
        matchingProducts.push(prod);
      } else {
        nonMatchingProducts.push(prod);
      }
    }
  
    matchingProducts.sort((a, b) => {
      const aIndex = titleIndexMap.get(a.name)!;
      const bIndex = titleIndexMap.get(b.name)!;
      return aIndex - bIndex;
    });
  
    return [...matchingProducts, ...nonMatchingProducts];
  };