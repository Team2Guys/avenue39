import { CartItem } from "@/redux/slices/cart/types";

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